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

  // Mescla dois estados de forma aditiva: nenhuma lição concluída é perdida!
  function mesclarEstados(local, remoto) {
    if (!remoto) return local;
    if (!local) return remoto;

    const base = Object.assign({}, remoto, local);

    // Mescla lições: se estiver concluída em qualquer um dos dois, fica como concluída
    base.licoes = Object.assign({}, remoto.licoes || {}, local.licoes || {});
    const todasLicoes = Object.keys(Object.assign({}, remoto.licoes || {}, local.licoes || {}));
    todasLicoes.forEach(function (id) {
      const rl = (remoto.licoes && remoto.licoes[id]) || null;
      const ll = (local.licoes && local.licoes[id]) || null;
      if (rl && rl.status === 'concluida') {
        base.licoes[id] = Object.assign({}, ll || {}, rl);
      } else if (ll && ll.status === 'concluida') {
        base.licoes[id] = Object.assign({}, rl || {}, ll);
      } else {
        base.licoes[id] = Object.assign({}, rl || {}, ll || {});
      }
    });

    // Mescla XP: fica com o maior valor
    base.xp = Math.max(local.xp || 0, remoto.xp || 0);

    // Mescla Streak
    const streakLocal = local.streak || { atual: 0, recorde: 0, dias: [] };
    const streakRemoto = remoto.streak || { atual: 0, recorde: 0, dias: [] };
    const diasSet = new Set((streakLocal.dias || []).concat(streakRemoto.dias || []));
    base.streak = {
      atual: Math.max(streakLocal.atual || 0, streakRemoto.atual || 0),
      recorde: Math.max(streakLocal.recorde || 0, streakRemoto.recorde || 0),
      ultimoDia: (streakLocal.ultimoDia > (streakRemoto.ultimoDia || '')) ? streakLocal.ultimoDia : (streakRemoto.ultimoDia || streakLocal.ultimoDia),
      dias: Array.from(diasSet)
    };

    // Mescla conceitos
    base.conceitos = Object.assign({}, remoto.conceitos || {}, local.conceitos || {});

    // Mescla habilidades
    base.habilidades = Object.assign({}, remoto.habilidades || {}, local.habilidades || {});

    // Mescla sessões
    const sessoesMap = {};
    (remoto.sessoes || []).concat(local.sessoes || []).forEach(function (s) {
      if (s && s.data) sessoesMap[s.data + '_' + s.id] = s;
    });
    base.sessoes = Object.values(sessoesMap);

    base.configuracoes = Object.assign({}, remoto.configuracoes || {}, local.configuracoes || {});
    base.atualizadoEm = new Date().toISOString();

    return base;
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

        // Mesclagem inteligente: garante que tudo o que estava concluído em qualquer um dos dois prevaleça!
        const mesclado = mesclarEstados(local, remoto);

        P.dados.importar(mesclado, true); // true = não re-enviar imediatamente durante carregamento
        // Salva o mesclado na nuvem caso o local tivesse novidades ou diferenças
        salvarRemoto(mesclado, false);

        notificarStatus('sincronizado', 'Progresso sincronizado com a nuvem');
        return { atualizado: true, dados: mesclado };
      } else {
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
      }, 1000);
      return;
    }

    try {
      sincronizando = true;
      notificarStatus('salvando', 'Salvando na nuvem...');
      const dados = estadoParaSalvar || P.dados.estado();
      const payload = {
        id: REGISTRO_ID,
        dados: dados,
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
