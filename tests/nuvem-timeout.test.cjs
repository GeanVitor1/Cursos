const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');

// Regression: QA-023 — o prazo da rede terminava antes da leitura do corpo.
// Found by /qa on 2026-10-06. Report: AUDITORIA_QA.md
test('corpo da resposta travado também expira e preserva o progresso local', async () => {
  let limite;
  let iniciouCorpo;
  const corpoIniciado = new Promise(resolve => { iniciouCorpo = resolve; });
  const storage = new Map();
  const window = {
    crypto: crypto.webcrypto, addEventListener() {},
    localStorage: { getItem: k => storage.get(k) || null, setItem: (k, v) => storage.set(k, v) }
  };
  const ctx = vm.createContext({
    window, navigator: {}, AbortController,
    setTimeout(callback, ms) {
      const timer = { callback, ativo: true };
      if (ms === 8000) limite = timer;
      return timer;
    },
    clearTimeout(timer) { timer.ativo = false; },
    fetch: async (_, options) => ({
      ok: true,
      json: () => new Promise((_, reject) => {
        options.signal.addEventListener('abort', () => reject(new DOMException('Prazo excedido', 'AbortError')), { once: true });
        iniciouCorpo();
      })
    }),
    console: { warn() {}, error() {} }, Set, Map
  });
  for (const file of ['registro', 'armazenamento', 'nuvem']) {
    vm.runInContext(fs.readFileSync('app/js/nucleo/' + file + '.js', 'utf8'), ctx);
  }
  const P = window.Plataforma;
  P.dados.adicionarXp(12, 'etapa:timeout:0');
  let status;
  P.nuvem.aoMudarStatus(info => { status = info.status; });
  const leitura = P.nuvem.carregarRemoto();
  await corpoIniciado;
  assert.equal(limite.ativo, true, 'o prazo precisa cobrir o corpo, além dos cabeçalhos');
  limite.callback();
  const resultado = await leitura;
  assert.equal(resultado.erro.name, 'AbortError');
  assert.equal(status, 'offline');
  assert.equal(P.nuvem.estaSincronizando(), false);
  assert.equal(P.dados.estado().xp, 12);
});
