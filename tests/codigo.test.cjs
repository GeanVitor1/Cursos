const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const sandbox = { window: { Plataforma: {} } };
vm.runInNewContext(fs.readFileSync('app/js/ui/dom.js', 'utf8'), sandbox);
const normalizar = sandbox.window.Plataforma.dom.normalizarRespostaCodigo;
test('espaços e comentários não mudam a solução', () => {
  assert.equal(normalizar('SELECT Nome FROM Clientes;', false), normalizar('select /* coluna */ Nome\nfrom Clientes', false));
});
test('texto SQL entre aspas não perde espaços, acentos ou maiúsculas', () => {
  for (const wrong of ["SELECT * FROM Clientes WHERE Cidade = 'RiodeJaneiro'", "SELECT * FROM Clientes WHERE Cidade = 'rio de janeiro'"]) {
    assert.notEqual(normalizar("SELECT * FROM Clientes WHERE Cidade = 'Rio de Janeiro'", false), normalizar(wrong, false));
  }
});
test('C# respeita maiúsculas e SQL não une identificadores distintos', () => {
  assert.notEqual(normalizar('produtos.Add(produto)', true), normalizar('produtos.add(produto)', true));
  assert.notEqual(normalizar('SELECTNome FROM Clientes', false), normalizar('SELECT Nome FROM Clientes', false));
});

test('flags de terminal e decremento em C# não são comentários SQL', () => {
  assert.notEqual(normalizar('git reset --soft HEAD~1', true, 'shell'), normalizar('git reset --hard HEAD~1', true, 'shell'));
  assert.notEqual(normalizar('docker run --name api nginx', true, 'shell'), normalizar('docker run', true, 'shell'));
  assert.notEqual(normalizar('contador--;', true), normalizar('contador;', true));
  assert.equal(normalizar('SELECT Nome FROM Clientes -- comentário', false), normalizar('select Nome from Clientes', false));
  assert.equal(normalizar('git status # comentário', true, 'shell'), normalizar('git status', true, 'shell'));
});
