window.Plataforma = window.Plataforma || {};

(function (P) {
  const rotas = [];
  let versao = 0;
  let hashProcessado = null;

  function registrar(padrao, handler) {
    rotas.push({ partes: padrao.split('/').filter(Boolean), handler: handler });
  }

  function processar() {
    if (window.location.hash !== hashProcessado && hashProcessado !== null && P.ui.runner && P.ui.runner.saidaDescartaRespostas && P.ui.runner.saidaDescartaRespostas()) {
      if (!window.confirm('Sair do teste de nivelamento? Suas respostas serão descartadas.')) {
        window.history.pushState(null, '', hashProcessado);
        return;
      }
    }
    const mudouHash = window.location.hash !== hashProcessado;
    hashProcessado = window.location.hash;
    if (mudouHash) P.ui.layout.fecharMenu();
    versao += 1;
    if (P.ui.runner) P.ui.runner.encerrar();
    const bruto = window.location.hash.replace(/^#\/?/, '');
    let partes;
    try { partes = bruto.split('/').filter(Boolean).map(decodeURIComponent); }
    catch (e) { P.ui.layout.naoEncontrado(); return; }
    for (let i = 0; i < rotas.length; i += 1) {
      const rota = rotas[i];
      if (rota.partes.length !== partes.length) continue;
      const params = {};
      let combina = true;
      for (let j = 0; j < partes.length; j += 1) {
        if (rota.partes[j].charAt(0) === ':') params[rota.partes[j].slice(1)] = partes[j];
        else if (rota.partes[j] !== partes[j]) { combina = false; break; }
      }
      if (combina) {
        if (P.ui && P.ui.layout && P.ui.layout.marcarAtivo) {
          P.ui.layout.marcarAtivo(partes[0] || 'inicio', partes[1] || null);
        }
        const atual = versao;
        function tratarErro(erro) {
          console.error('[Navegação]', erro);
          if (atual !== versao) return;
          P.ui.layout.toast('Não foi possível abrir esta página. Tente novamente.', 'erro');
        }
        try { Promise.resolve(rota.handler(params)).then(function () { if (atual === versao && mudouHash) aposRender(); }).catch(tratarErro); }
        catch (erro) { tratarErro(erro); }
        return;
      }
    }
    if (P.ui && P.ui.layout && P.ui.layout.naoEncontrado) P.ui.layout.naoEncontrado();
  }

  function aposRender() {
    window.requestAnimationFrame(function () {
      const h1 = document.querySelector('#conteudo h1, main h1');
      if (h1) {
        const texto = (h1.textContent || '').trim();
        if (texto) document.title = texto + ' · ' + tituloBase;
        if (!h1.hasAttribute('tabindex')) h1.setAttribute('tabindex', '-1');
        try { h1.focus({ preventScroll: true }); } catch (e) { h1.focus(); }
      } else {
        document.title = tituloBase;
      }
    });
  }
  const tituloBase = document.title || 'Plataforma';

  function ir(hash, opcoes) {
    P.ui.layout.fecharMenu();
    if (window.location.hash !== hash) {
      if (opcoes && opcoes.substituir) window.history.replaceState(null, '', hash);
      else window.history.pushState(null, '', hash);
    }
    processar();
  }

  // Redirecionamento: não deixa a rota de origem no histórico (evita Voltar preso).
  function redirecionar(hash) { ir(hash, { substituir: true }); }

  function iniciar() {
    window.addEventListener('hashchange', function () {
      if (window.location.hash !== hashProcessado) processar();
    });
    processar();
  }

  P.roteador = { registrar: registrar, ir: ir, redirecionar: redirecionar, iniciar: iniciar, processar: processar, versao: function () { return versao; } };
})(window.Plataforma);
