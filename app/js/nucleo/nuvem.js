window.Plataforma = window.Plataforma || {};

(function (P) {
  const SUPABASE_URL = 'https://pxhttgocldnrfxtmmpzv.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_e_YewABKK8lN65iuBhXILQ_viPL_oVK';
  const REGISTRO_ID = 'usuario_principal';

  let sincronizando = false;
  let timerDebounce = null;
  const ouvintesStatus = [];

  function notificarStatus(status, mensagem) {
    ouvintesStatus.forEach(function (cb) {
      try { cb({ status: status, mensagem: mensagem }); } catch (e) { /* ignora */ }
    });
  }

  function aoMudarStatus(cb) {
    if (typeof cb === 'function') ouvintesStatus.push(cb);
  }

  async function carregarRemoto() {
    try {
      notificarStatus('carregando', 'Buscando progresso na nuvem...');
      const resposta = await fetch(
        SUPABASE_URL + '/rest/v1/progresso_usuario?id=eq.' + encodeURIComponent(REGISTRO_ID) + '&select=*',
        {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': 'Bearer ' + SUPABASE_KEY
          }
        }
      );

      if (!resposta.ok) {
        throw new Error('HTTP ' + resposta.status);
      }

      const linhas = await resposta.json();
      if (linhas && linhas.length > 0 && linhas[0].dados) {
        const remoto = linhas[0].dados;
        const local = P.dados.estado();

        // Compara timestamps de atualização
        const timeRemoto = remoto.atualizadoEm ? new Date(remoto.atualizadoEm).getTime() : 0;
        const timeLocal = local.atualizadoEm ? new Date(local.atualizadoEm).getTime() : 0;

        // Se o remoto for mais recente ou igual, ou se o local for virgem (sem xp e sem licoes)
        const localVazio = (!local.xp || local.xp === 0) && Object.keys(local.licoes || {}).length === 0;

        if (timeRemoto >= timeLocal || localVazio) {
          P.dados.importar(remoto);
          notificarStatus('sincronizado', 'Progresso carregado da nuvem');
          return { atualizado: true, dados: remoto };
        } else {
          // Local é mais recente que a nuvem, sincroniza o local para a nuvem
          await salvarRemoto(local, true);
          notificarStatus('sincronizado', 'Nuvem atualizada com o progresso mais recente');
          return { atualizado: false, dados: local };
        }
      } else {
        // Se a nuvem ainda não tem registro ou está vazia, envia o local atual
        const local = P.dados.estado();
        const temDadosLocais = (local.xp && local.xp > 0) || Object.keys(local.licoes || {}).length > 0;
        if (temDadosLocais) {
          await salvarRemoto(local, true);
        }
        notificarStatus('sincronizado', 'Conectado à nuvem');
        return { atualizado: false, dados: local };
      }
    } catch (e) {
      console.warn('[Nuvem] Falha ao carregar progresso remoto:', e);
      notificarStatus('offline', 'Modo offline (salvando localmente)');
      return { erro: e };
    }
  }

  async function salvarRemoto(estadoParaSalvar, imediato) {
    if (!imediato) {
      if (timerDebounce) clearTimeout(timerDebounce);
      timerDebounce = setTimeout(function () {
        salvarRemoto(estadoParaSalvar, true);
      }, 1500);
      return;
    }

    try {
      sincronizando = true;
      notificarStatus('salvando', 'Salvando na nuvem...');
      const payload = {
        id: REGISTRO_ID,
        dados: estadoParaSalvar || P.dados.estado(),
        atualizado_em: new Date().toISOString()
      };

      const resposta = await fetch(SUPABASE_URL + '/rest/v1/progresso_usuario', {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(payload)
      });

      if (!resposta.ok) {
        throw new Error('HTTP ' + resposta.status);
      }

      notificarStatus('sincronizado', 'Progresso sincronizado com a nuvem');
    } catch (e) {
      console.warn('[Nuvem] Falha ao sincronizar com a nuvem:', e);
      notificarStatus('erro', 'Erro ao salvar na nuvem (salvo localmente)');
    } finally {
      sincronizando = false;
    }
  }

  P.nuvem = {
    carregarRemoto: carregarRemoto,
    salvarRemoto: salvarRemoto,
    aoMudarStatus: aoMudarStatus,
    estaSincronizando: function () { return sincronizando; }
  };
})(window.Plataforma);
