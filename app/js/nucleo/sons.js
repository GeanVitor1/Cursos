window.Plataforma = window.Plataforma || {};
(function (P) {
  // Sons originais sintetizados com Web Audio (sem arquivos externos).
  const CHAVE = 'trilha-net.som';
  let ctx = null;

  function ligado() {
    try { return window.localStorage.getItem(CHAVE) !== 'off'; } catch (e) { return true; }
  }
  function definir(valor) {
    try { window.localStorage.setItem(CHAVE, valor ? 'on' : 'off'); } catch (e) { /* sem storage */ }
  }
  function contexto() {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    if (!ctx) ctx = new Ctor();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function nota(c, freq, inicio, duracao, tipo, volume, freqFinal) {
    const osc = c.createOscillator();
    const ganho = c.createGain();
    osc.type = tipo;
    osc.frequency.setValueAtTime(freq, inicio);
    if (freqFinal) osc.frequency.exponentialRampToValueAtTime(freqFinal, inicio + duracao);
    ganho.gain.setValueAtTime(0.0001, inicio);
    ganho.gain.exponentialRampToValueAtTime(volume, inicio + 0.015);
    ganho.gain.exponentialRampToValueAtTime(0.0001, inicio + duracao);
    osc.connect(ganho).connect(c.destination);
    osc.start(inicio);
    osc.stop(inicio + duracao + 0.02);
  }
  function tocar(tipo) {
    if (!ligado()) return;
    try {
      const c = contexto();
      if (!c) return;
      const t = c.currentTime + 0.01;
      if (tipo === 'acerto') {
        // "Plim" alegre: duas notas ascendentes com brilho.
        nota(c, 880, t, 0.14, 'triangle', 0.22);
        nota(c, 1318.5, t + 0.09, 0.28, 'triangle', 0.22);
        nota(c, 2637, t + 0.09, 0.22, 'sine', 0.05);
      } else if (tipo === 'erro') {
        // "Bum" grave e curto, descendente.
        nota(c, 220, t, 0.16, 'square', 0.07, 180);
        nota(c, 165, t + 0.13, 0.26, 'square', 0.07, 120);
      }
    } catch (e) { /* áudio indisponível: segue sem som */ }
  }

  P.sons = { tocar: tocar, ligado: ligado, definir: definir };
})(window.Plataforma);
