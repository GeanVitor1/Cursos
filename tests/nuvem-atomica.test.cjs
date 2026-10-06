const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');
function criar(fetch) {
  const storage = new Map();
  const window = { crypto: crypto.webcrypto, addEventListener() {}, localStorage: { getItem: k => storage.get(k) || null, setItem: (k, v) => storage.set(k, v) } };
  const ctx = vm.createContext({ window, navigator: { locks: { request: (_, cb) => Promise.resolve().then(cb) } }, fetch, AbortController, setTimeout, clearTimeout, console: { warn() {}, error() {} }, Set, Map });
  for (const file of ['registro', 'armazenamento', 'nuvem']) vm.runInContext(fs.readFileSync('app/js/nucleo/' + file + '.js', 'utf8'), ctx);
  window.Plataforma.conf.sincronizacaoAtomica = true;
  return window.Plataforma;
}
test('conflito entre máquinas refaz a mescla com a versão atual do banco', async () => {
  let rpcCalls = 0;
  const P = criar(async (url, options) => {
    if (!url.includes('/rpc/')) return new Response(JSON.stringify([{ dados: { xp: 20, licoes: {}, streak: { dias: [] } }, versao: 0 }]));
    const body = JSON.parse(options.body);
    rpcCalls++;
    if (rpcCalls === 1) return new Response(JSON.stringify([{ sucesso: false, dados: { xp: 40, licoes: {}, streak: { dias: [] } }, versao: 1 }]));
    assert.equal(body.p_versao, 1);
    assert.equal(body.p_dados.xp, 50);
    return new Response(JSON.stringify([{ sucesso: true, dados: body.p_dados, versao: 2 }]));
  });
  P.dados.adicionarXp(10, 'etapa:a:0');
  const result = await P.nuvem.salvarRemoto(null, true);
  assert.equal(result.salvo, true);
  assert.equal(rpcCalls, 2);
  assert.equal(P.dados.estado().xp, 50);
});
test('conflitos repetidos são informados e preservam o progresso local', async () => {
  let rpcCalls = 0;
  const P = criar(async url => {
    if (!url.includes('/rpc/')) return new Response(JSON.stringify([]));
    return new Response(JSON.stringify([{ sucesso: false, dados: { xp: 0, licoes: {} }, versao: ++rpcCalls }]));
  });
  P.dados.adicionarXp(10, 'etapa:a:0');
  const result = await P.nuvem.salvarRemoto(null, true);
  assert.match(result.erro.message, /concorrentes/);
  assert.equal(rpcCalls, 4);
  assert.equal(P.dados.estado().xp, 10);
});
