const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const contexto = vm.createContext({ window: {}, Set, Map });
for (const arquivo of ['app/js/nucleo/registro.js', 'app/js/ui/dom.js', 'app/js/atividades/base.js', 'app/js/atividades/codigo.js', 'app/js/atividades/analise.js', 'app/js/atividades/manipulacao.js']) {
  vm.runInContext(fs.readFileSync(arquivo, 'utf8'), contexto, { filename: arquivo });
}
const P = contexto.window.Plataforma;

test('validarEscrita: com validar e respostasAceitas, qualquer um aprovando basta', () => {
  const atv = { id: 'x1', tipo: 'write-code', conceitos: ['csharp.x'], respostasAceitas: ['return a + b;'], validar: v => /Created\(/.test(v) };
  assert.equal(P.atividades.validarEscrita(atv, 'return a + b;'), true, 'gabarito');
  assert.equal(P.atividades.validarEscrita(atv, 'return Created($"/produtos/{produto.Id}");'), true, 'validar tolerante');
  assert.equal(P.atividades.validarEscrita(atv, 'return 1;'), false);
  const quebra = { id: 'x2', conceitos: ['csharp.x'], respostasAceitas: ['x;'], validar: () => { throw new Error('boom'); } };
  assert.equal(P.atividades.validarEscrita(quebra, 'x;'), true, 'validar com exceção não impede o gabarito');
});

test('explain: palavra inteira ou raiz, nunca substring arbitrária', () => {
  const casa = P.atividades.casaPalavraChave;
  assert.equal(casa('isso causa terror no sistema', 'erro'), false);
  assert.equal(casa('aconteceu um erro grave', 'erro'), true);
  assert.equal(casa('os erros aparecem', 'erro'), true);
  assert.equal(casa('criamos índices na tabela', 'indice'), true);
  assert.equal(casa('a consulta usa o índice composto', 'indice composto'), true);
  assert.equal(casa('composto índice', 'indice composto'), false);
  assert.equal(P.atividades.textoSubstantivo('aaaa aaaa aaaa aaaa aaaa aaaa'), false);
  assert.equal(P.atividades.textoSubstantivo('O cache guarda o resultado da consulta para evitar ir ao banco toda vez'), true);
});

test('SQL: igualdades simétricas em ON/WHERE e TOP (n)', () => {
  const n = P.dom.normalizarSql;
  assert.equal(n('SELECT * FROM A JOIN B ON A.Id = B.AId'), n('select * from a join b on b.aid = a.id'));
  assert.equal(n('SELECT * FROM A WHERE A.x = 1 AND B.y = A.z'), n('SELECT * FROM A WHERE 1 = A.x AND A.z = B.y'));
  assert.equal(n('SELECT TOP (5) Nome FROM Clientes'), n('SELECT TOP 5 Nome FROM Clientes'));
  assert.notEqual(n('SELECT * FROM A WHERE A.x = 1'), n('SELECT * FROM A WHERE A.x = 2'));
  assert.notEqual(n('SELECT * FROM A WHERE x = y + 1'), n('SELECT * FROM A WHERE y = x + 1'), 'expressões compostas não são invertidas');
});

test('order-blocks: ordens alternativas e linhas idênticas', () => {
  const ok = P.atividades.ordemAceita;
  const atv = { blocos: ['a', 'b', 'c'], ordensAceitas: [[1, 0, 2], ['a', 'c', 'b']] };
  assert.equal(ok(atv, [0, 1, 2]), true);
  assert.equal(ok(atv, [1, 0, 2]), true);
  assert.equal(ok(atv, [0, 2, 1]), true);
  assert.equal(ok(atv, [2, 1, 0]), false);
  assert.equal(ok({ blocos: ['}', 'x', '}'] }, [2, 1, 0]), true, 'blocos de texto igual são intercambiáveis');
  assert.equal(ok(atv, [0, 1]), false);
});
