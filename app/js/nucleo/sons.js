window.Plataforma = window.Plataforma || {};
(function (P) {
  // Sons de acerto/erro. Se existirem arquivos em assets/sons/ (acerto.mp3 e erro.mp3),
  // eles são usados; senão, toca um som original sintetizado com Web Audio.
  const CHAVE = 'trilha-net.som';
  const ARQUIVOS = { acerto: '../assets/sons/acerto.mp3', erro: '../assets/sons/erro.mp3' };
  const audios = {};
  let ctx = null;

  function ligado() {
    try { return window.localStorage.getItem(CHAVE) !== 'off'; } catch (e) { return true; }
  }
  function definir(valor) {
    try { window.localStorage.setItem(CHAVE, valor ? 'on' : 'off'); } catch (e) { /* sem storage */ }
  }

  // Pré-carrega os arquivos; se algum não existir, marca para usar o sintetizado.
  Object.keys(ARQUIVOS).forEach(function (tipo) {
    if (typeof Audio === 'undefined') return;
    const a = new Audio();
    a.preload = 'auto';
    a.addEventListener('canplaythrough', function () { audios[tipo] = a; }, { once: true });
    a.addEventListener('error', function () { audios[tipo] = null; }, { once: true });
    a.src = ARQUIVOS[tipo];
  });

  function contexto() {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    if (!ctx) ctx = new Ctor();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function nota(c, saida, freq, inicio, duracao, tipo, volume, freqFinal) {
    const osc = c.createOscillator();
    const ganho = c.createGain();
    osc.type = tipo;
    osc.frequency.setValueAtTime(freq, inicio);
    if (freqFinal) osc.frequency.exponentialRampToValueAtTime(freqFinal, inicio + duracao);
    ganho.gain.setValueAtTime(0.0001, inicio);
    ganho.gain.exponentialRampToValueAtTime(volume, inicio + 0.008);
    ganho.gain.exponentialRampToValueAtTime(0.0001, inicio + duracao);
    osc.connect(ganho).connect(saida);
    osc.start(inicio);
    osc.stop(inicio + duracao + 0.03);
  }
  function sintetizar(tipo) {
    const c = contexto();
    if (!c) return;
    const t = c.currentTime + 0.01;
    const mestre = c.createGain();
    mestre.gain.value = 0.9;
    mestre.connect(c.destination);
    if (tipo === 'acerto') {
      // Arpejo maior rápido e brilhante (dó-mi-sol) com timbre de sino.
      [1046.5, 1318.5, 1568].forEach(function (f, i) {
        const ini = t + i * 0.065;
        const dur = i === 2 ? 0.45 : 0.22;
        nota(c, mestre, f, ini, dur, 'sine', 0.28);
        nota(c, mestre, f * 2, ini, dur * 0.6, 'sine', 0.07);
        nota(c, mestre, f * 3, ini, dur * 0.3, 'triangle', 0.025);
      });
    } else {
      // "Tum-tum" grave, macio e descendente.
      nota(c, mestre, 311, t, 0.14, 'triangle', 0.32, 277);
      nota(c, mestre, 233, t + 0.12, 0.32, 'triangle', 0.32, 185);
      nota(c, mestre, 117, t + 0.12, 0.3, 'sine', 0.2, 92);
    }
  }
  function tocar(tipo) {
    if (!ligado()) return;
    try {
      const arquivo = audios[tipo];
      if (arquivo) {
        const a = arquivo.cloneNode();
        a.volume = 0.8;
        a.play().catch(function () { sintetizar(tipo); });
        return;
      }
      sintetizar(tipo);
    } catch (e) { /* áudio indisponível: segue sem som */ }
  }

  P.sons = { tocar: tocar, ligado: ligado, definir: definir };
})(window.Plataforma);
