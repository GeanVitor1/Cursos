window.Plataforma = window.Plataforma || {};

(function (P) {
  const rotas = [];
  let versao = 0;
  let hashProcessado = null;

  function registrar(padrao, handler) {
    rotas.push({ partes: padrao.split('/').filter(Boolean), handler: handler });
  }

  function processar() {
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
        Promise.resolve(rota.handler(params)).catch(function (erro) {
          console.error('[Navegação]', erro);
          P.ui.layout.toast('Não foi possível abrir esta página. Tente novamente.', 'erro');
        });
        return;
      }
    }
    if (P.ui && P.ui.layout && P.ui.layout.naoEncontrado) P.ui.layout.naoEncontrado();
  }

  function ir(hash) {
    P.ui.layout.fecharMenu();
    if (window.location.hash !== hash) window.history.pushState(null, '', hash);
    processar();
  }

  function iniciar() {
    window.addEventListener('hashchange', function () {
      if (window.location.hash !== hashProcessado) processar();
    });
    processar();
  }

  P.roteador = { registrar: registrar, ir: ir, iniciar: iniciar, processar: processar, versao: function () { return versao; } };
})(window.Plataforma);
