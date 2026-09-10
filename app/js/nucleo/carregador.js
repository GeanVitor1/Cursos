window.Plataforma = window.Plataforma || {};

(function (P) {
  function carregarScript(src) {
    return new Promise(function (resolver, rejeitar) {
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = function () { resolver(src); };
      script.onerror = function () { rejeitar(new Error('Não foi possível carregar: ' + src)); };
      document.head.appendChild(script);
    });
  }

  async function carregarTudo() {
    await carregarScript('../data/manifest.js');
    await carregarScript('../data/conceitos.js');
    await carregarScript('../data/conceitos-registry.js');
    await carregarScript('../data/habilidades.js');
    const manifesto = P.interno.manifesto;
    if (!manifesto) throw new Error('Manifesto não encontrado em data/manifest.js');
    const trilhas = manifesto.trilhas || [];
    for (let t = 0; t < trilhas.length; t += 1) {
      await carregarScript(trilhas[t].arquivo);
      const licoes = trilhas[t].licoes || [];
      for (let l = 0; l < licoes.length; l += 1) {
        await carregarScript(licoes[l]);
      }
    }
    const extras = manifesto.arquivos || [];
    for (let e = 0; e < extras.length; e += 1) {
      await carregarScript(extras[e]);
    }
  }

  P.carregador = { carregarScript: carregarScript, carregarTudo: carregarTudo };
})(window.Plataforma);
