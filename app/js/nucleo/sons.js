window.Plataforma = window.Plataforma || {};
(function (P) {
  // Sons de acerto/erro. Se existirem arquivos em assets/sons/ (acerto.mp3 e erro.mp3),
  // eles são usados; senão, toca um som original sintetizado com Web Audio.
  const CHAVE = 'trilha-net.som';
  const ARQUIVOS = { acerto: '../assets/sons/acerto.mp3', erro: '../assets/sons/erro.mp3' };
  let ctx = null;

  function ligado() {
    try { return window.localStorage.getItem(CHAVE) !== 'off'; } catch (e) { return true; }
  }
  function definir(valor) {
    try { window.localStorage.setItem(CHAVE, valor ? 'on' : 'off'); } catch (e) { /* sem storage */ }
  }

  // Os arquivos são baixados e decodificados com Web Audio: assim toca igual no
  // desktop e no celular (no mobile, <audio> não pré-carrega e caía no sintetizado).
  const buffers = {};
  const brutos = {};
  Object.keys(ARQUIVOS).forEach(function (tipo) {
    if (typeof fetch === 'undefined') return;
    brutos[tipo] = fetch(ARQUIVOS[tipo])
      .then(function (r) { if (!r.ok) throw new Error('sem arquivo'); return r.arrayBuffer(); })
      .catch(function () { return null; });
  });
  function decodificar(c, tipo) {
    if (buffers[tipo] !== undefined || !brutos[tipo]) return Promise.resolve(buffers[tipo] || null);
    return brutos[tipo].then(function (dados) {
      if (!dados) { buffers[tipo] = null; return null; }
      return new Promise(function (ok) {
        // slice: decodeAudioData consome o ArrayBuffer.
        c.decodeAudioData(dados.slice(0), function (buf) { buffers[tipo] = buf; ok(buf); },
          function () { buffers[tipo] = null; ok(null); });
      });
    });
  }

  function contexto() {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) return null;
    if (!ctx) ctx = new Ctor();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  // Destrava o áudio no primeiro toque (exigência do iOS/Android) e já decodifica.
  function destravar() {
    const c = contexto();
    if (!c) return;
    try {
      const b = c.createBuffer(1, 1, 22050);
      const src = c.createBufferSource();
      src.buffer = b; src.connect(c.destination); src.start(0);
    } catch (e) { /* ignora */ }
    Object.keys(ARQUIVOS).forEach(function (t) { decodificar(c, t); });
    ['touchend', 'pointerdown', 'keydown'].forEach(function (ev) { window.removeEventListener(ev, destravar, true); });
  }
  ['touchend', 'pointerdown', 'keydown'].forEach(function (ev) { window.addEventListener(ev, destravar, true); });

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
  function reproduzir(c, buf) {
    const src = c.createBufferSource();
    const ganho = c.createGain();
    ganho.gain.value = 0.8;
    src.buffer = buf;
    src.connect(ganho).connect(c.destination);
    src.start(0);
  }
  function tocar(tipo) {
    if (!ligado()) return;
    try {
      const c = contexto();
      if (!c) return;
      if (buffers[tipo]) { reproduzir(c, buffers[tipo]); return; }
      if (buffers[tipo] === null || !brutos[tipo]) { sintetizar(tipo); return; }
      // Ainda decodificando: espera um pouco em vez de tocar um som diferente.
      decodificar(c, tipo).then(function (buf) { if (buf) reproduzir(c, buf); else sintetizar(tipo); });
    } catch (e) { /* áudio indisponível: segue sem som */ }
  }

  P.sons = { tocar: tocar, ligado: ligado, definir: definir };
})(window.Plataforma);
