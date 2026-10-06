const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { once } = require('node:events');
const { criarServidor } = require('../ferramentas/servidor-local.cjs');

test('servidor entrega arquivos públicos e bloqueia arquivos internos e caminhos inválidos', async t => {
  const prefix = path.join(os.tmpdir(), 'trilha-net-servidor-');
  const dir = fs.mkdtempSync(prefix);
  t.after(() => { assert.ok(dir.startsWith(prefix)); fs.rmSync(dir, { recursive: true, force: true }); });
  fs.writeFileSync(path.join(dir, 'index.html'), '<h1>Curso</h1>');
  fs.mkdirSync(path.join(dir, '.git'));
  fs.writeFileSync(path.join(dir, '.git', 'config'), 'privado');
  fs.symlinkSync(path.join(dir, '.git'), path.join(dir, 'atalho'), 'junction');
  const server = criarServidor(dir).listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => { server.closeAllConnections(); server.close(); });
  const url = `http://127.0.0.1:${server.address().port}`;
  const resposta = await fetch(url);
  assert.equal(await resposta.text(), '<h1>Curso</h1>');
  assert.equal(resposta.headers.get('x-content-type-options'), 'nosniff');
  assert.equal((await fetch(url, { method: 'HEAD' })).status, 200);
  assert.equal((await fetch(url, { method: 'POST' })).status, 405);
  for (const rota of ['/.git/config', '/atalho/config', '/%2egit/config', '/node_modules/package.json', '/tests/arquivo', '/%2e%2e%5cindex.html']) {
    assert.equal((await fetch(url + rota)).status, 403, rota);
  }
  for (const rota of ['/%', '/index.html%00', '/index.html::$DATA']) assert.equal((await fetch(url + rota)).status, 400, rota);
  assert.equal((await fetch(url + '/ausente')).status, 404);
});
