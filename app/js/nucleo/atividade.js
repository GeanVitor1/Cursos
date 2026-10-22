window.Plataforma = window.Plataforma || {};
(function (P) {
  let anterior = Date.now();
  let interacao = anterior;
  function elegivel() {
    return document.visibilityState === 'visible' && document.hasFocus() &&
      !!document.querySelector('.runner') && !document.querySelector('.modal-fundo');
  }
  function pulso() {
    const agora = Date.now();
    if (elegivel() && agora - interacao <= 60000 && agora - anterior <= 15000) P.dados.registrarTempo(anterior, agora);
    anterior = agora;
  }
  ['pointerdown', 'keydown', 'input', 'scroll'].forEach(function (nome) {
    document.addEventListener(nome, function (ev) {
      if (ev.isTrusted && elegivel()) interacao = Date.now();
    }, { passive: true, capture: true });
  });
  document.addEventListener('visibilitychange', function () { anterior = Date.now(); });
  window.addEventListener('blur', function () { anterior = Date.now(); });
  window.addEventListener('focus', function () { anterior = Date.now(); interacao = anterior; });
  window.addEventListener('pagehide', pulso);
  window.setInterval(pulso, 5000);
})(window.Plataforma);
