window.Plataforma = window.Plataforma || {};

(function (P) {
  const scripts = new Map();
  function carregarScript(src) {
    if (scripts.has(src)) return scripts.get(src);
    const promessa = new Promise(function (resolver, rejeitar) {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = function () { resolver(src); };
      script.onerror = function () { script.remove(); scripts.delete(src); rejeitar(new Error('Não foi possível carregar: ' + src)); };
      document.head.appendChild(script);
    });
    scripts.set(src, promessa);
    return promessa;
  }

  async function carregarTudo() {
    await Promise.all(['../data/manifest.js', '../data/conceitos.js', '../data/conceitos-registry.js', '../data/habilidades.js', '../data/catalogo.js'].map(carregarScript));
    const manifesto = P.interno.manifesto;
    if (!manifesto) throw new Error('Manifesto não encontrado em data/manifest.js');
    const trilhas = manifesto.trilhas || [];
    await Promise.all(trilhas.map(function (t) { return carregarScript(t.arquivo); }));
    const extras = manifesto.arquivos || [];
    await Promise.all(extras.map(carregarScript));
  }

  async function carregarLicao(id) {
    const l = P.interno.licoes[id];
    if (!l || l.disponivel === false) return l;
    if (!l.etapas) await carregarScript(l.arquivo);
    return P.interno.licoes[id];
  }

  function carregarConceitos(ids) {
    return Promise.all(Object.keys(P.interno.licoes).filter(function (id) {
      const l = P.interno.licoes[id];
      return l.disponivel && (l.conceitos || []).some(function (c) { return ids.indexOf(c) !== -1; });
    }).map(carregarLicao));
  }

  P.carregador = { carregarScript: carregarScript, carregarTudo: carregarTudo, carregarLicao: carregarLicao, carregarConceitos: carregarConceitos };
})(window.Plataforma);
