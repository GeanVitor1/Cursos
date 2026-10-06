window.Plataforma = window.Plataforma || {};
(function (P) {
  const URL = 'https://pxhttgocldnrfxtmmpzv.supabase.co/rest/v1/progresso_usuario';
  const KEY = 'sb_publishable_e_YewABKK8lN65iuBhXILQ_viPL_oVK';
  // Perfil pessoal legado. Vários alunos requerem Auth + RLS no servidor.
  const ID = 'usuario_principal';
  const ouvintes = [];
  let statusAtual = { status: 'carregando', mensagem: 'Aguardando sincronização' };
  let leitura = null;
  let escrita = null;
  let pendente = false;
  let timer = null;
  function status(nome, mensagem) {
    statusAtual = { status: nome, mensagem: mensagem };
    ouvintes.forEach(function (cb) { cb(statusAtual); });
  }
  async function requisitar(url, opcoes, lerJson) {
    const controller = new AbortController();
    const limite = setTimeout(function () { controller.abort(); }, 8000);
    try {
      const resposta = await fetch(url, Object.assign({}, opcoes, {
        signal: controller.signal,
        headers: Object.assign({ apikey: KEY, Authorization: 'Bearer ' + KEY }, (opcoes || {}).headers || {})
      }));
      if (!resposta.ok) throw new Error('HTTP ' + resposta.status);
      return lerJson ? await resposta.json() : resposta;
    } finally { clearTimeout(limite); }
  }
  async function ler() {
    const linhas = await requisitar(URL + '?id=eq.' + encodeURIComponent(ID) + '&select=dados&limit=1', null, true);
    if (!Array.isArray(linhas)) throw new Error('Resposta de progresso inválida');
    return linhas.length ? linhas[0].dados : null;
  }
  function comLock(acao) {
    if (navigator.locks) return navigator.locks.request('trilha-net.nuvem', acao);
    return acao();
  }
  async function enviarAtomico() {
    const linhas = await requisitar(URL + '?id=eq.' + encodeURIComponent(ID) + '&select=dados,versao&limit=1', null, true);
    let atual = linhas[0] || { dados: null, versao: 0 };
    for (let tentativa = 0; tentativa < 4; tentativa += 1) {
      const dados = P.dados.mesclarEstados(P.dados.exportar(), atual.dados);
      const resultados = await requisitar(URL.replace('/progresso_usuario', '/rpc/salvar_progresso_atomico'), {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_id: ID, p_dados: dados, p_versao: atual.versao })
      }, true);
      const resultado = resultados[0];
      if (!resultado || typeof resultado.sucesso !== 'boolean') throw new Error('Resposta da sincronização atômica inválida');
      if (resultado.sucesso) return resultado.dados;
      // Outra máquina salvou primeiro: mescla a versão devolvida pelo banco e repete.
      atual = resultado;
    }
    throw new Error('Há alterações concorrentes na nuvem. Tente sincronizar novamente.');
  }
  function carregarRemoto() {
    if (leitura) return leitura;
    leitura = comLock(async function () {
      status('carregando', 'Buscando progresso na nuvem...');
      try {
        const remoto = await ler();
        if (remoto) {
          const mesclado = P.dados.mesclarEstados(P.dados.exportar(), remoto);
          P.dados.importar(mesclado, true);
          if (JSON.stringify(mesclado) !== JSON.stringify(remoto)) salvarRemoto(null, false);
        }
        status('sincronizado', 'Progresso sincronizado com a nuvem');
        return { atualizado: !!remoto };
      } catch (erro) {
        console.warn('[Nuvem] Falha ao carregar progresso:', erro);
        status('offline', 'Sem conexão com a nuvem. O progresso continua salvo neste navegador.');
        return { erro: erro };
      }
    }).finally(function () { leitura = null; });
    return leitura;
  }
  function salvarRemoto(ignorado, imediato) {
    pendente = true;
    if (timer) { clearTimeout(timer); timer = null; }
    if (!imediato) {
      timer = setTimeout(function () { timer = null; enviar(); }, 1000);
      return Promise.resolve();
    }
    return enviar();
  }
  function enviar() {
    if (escrita) return escrita;
    escrita = (async function () {
      if (leitura) await leitura;
      while (pendente) {
        pendente = false;
        const resultado = await comLock(async function () {
          status('salvando', 'Salvando na nuvem...');
          try {
            if (P.conf.sincronizacaoAtomica) {
              const atomico = await enviarAtomico();
              P.dados.importar(P.dados.mesclarEstados(P.dados.exportar(), atomico), true);
              return { salvo: true };
            }
            const remoto = await ler();
            const dados = P.dados.mesclarEstados(P.dados.exportar(), remoto);
            await requisitar(URL + '?on_conflict=id', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates' },
              body: JSON.stringify({ id: ID, dados: dados, atualizado_em: new Date().toISOString() })
            });
            P.dados.importar(P.dados.mesclarEstados(P.dados.exportar(), dados), true);
            return { salvo: true };
          } catch (erro) {
            console.warn('[Nuvem] Falha ao salvar progresso:', erro);
            status('erro', 'Não foi salvo na nuvem. O progresso está neste navegador; tente sincronizar novamente.');
            return { erro: erro };
          }
        });
        if (resultado.erro) { pendente = true; return resultado; }
      }
      status('sincronizado', 'Progresso sincronizado com a nuvem');
      return { salvo: true };
    })().finally(function () { escrita = null; });
    return escrita;
  }
  async function sincronizar() {
    const resultado = await carregarRemoto();
    if (resultado.erro) return resultado;
    if (pendente) return salvarRemoto(null, true);
    return resultado;
  }
  window.addEventListener('online', function () { sincronizar(); });
  P.nuvem = {
    carregarRemoto: carregarRemoto, salvarRemoto: salvarRemoto, sincronizar: sincronizar,
    aoMudarStatus: function (cb) { ouvintes.push(cb); cb(statusAtual); },
    estaSincronizando: function () { return !!(leitura || escrita); }
  };
})(window.Plataforma);
