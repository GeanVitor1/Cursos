window.Plataforma = window.Plataforma || {};

(function (P) {
  const rotas = [];

  function registrar(padrao, handler) {
    rotas.push({ partes: padrao.split('/').filter(Boolean), handler: handler });
  }

  function processar() {
    const bruto = window.location.hash.replace(/^#\/?/, '');
    const partes = bruto.split('/').filter(Boolean).map(decodeURIComponent);
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
        rota.handler(params);
        return;
      }
    }
    if (P.ui && P.ui.layout && P.ui.layout.naoEncontrado) P.ui.layout.naoEncontrado();
  }

  function ir(hash) {
    if (window.location.hash === hash) processar();
    else window.location.hash = hash;
  }

  function iniciar() {
    window.addEventListener('hashchange', processar);
    processar();
  }

  P.roteador = { registrar: registrar, ir: ir, iniciar: iniciar, processar: processar };
})(window.Plataforma);
