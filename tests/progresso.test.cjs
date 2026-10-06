const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const crypto = require('node:crypto');
function app(shared = new Map()) {
  const listeners = {};
  const window = { crypto: crypto.webcrypto, addEventListener: (name, cb) => { listeners[name] = cb; }, localStorage: { getItem: k => shared.get(k) || null, setItem: (k, v) => shared.set(k, v) } };
  const context = vm.createContext({ window, console, Set, Map });
  for (const file of ['registro', 'armazenamento']) vm.runInContext(fs.readFileSync(`app/js/nucleo/${file}.js`, 'utf8'), context);
  const P = window.Plataforma;
  P.interno.licoes.a = { id: 'a', etapas: [{ tipo: 'atividade', atividade: { id: 'a1' } }], xp: 30 };
  return { P, shared, listeners };
}
test('conclusão repetida não altera XP nem duplica histórico', () => {
  const { P } = app();
  P.dados.concluirLicao('a', { aproveitamento: 100 });
  P.dados.concluirLicao('a', { aproveitamento: 100 });
  assert.equal(P.dados.estado().xp, 30);
  assert.equal(P.dados.estado().sessoes.length, 1);
});

test('sincronização sem mudança não notifica nem regrava o progresso', () => {
  const { P, shared } = app();
  P.dados.adicionarXp(10, 'etapa:a:0');
  let avisos = 0;
  P.dados.aoMudar(() => { avisos++; });
  const arquivo = shared.get('trilha-net.estado.v1');
  const anterior = P.dados.exportar();
  P.dados.importar(anterior, true);
  assert.equal(avisos, 0);
  assert.equal(shared.get('trilha-net.estado.v1'), arquivo);
  const outraAba = app().P;
  outraAba.dados.adicionarXp(5, 'etapa:a:1');
  P.dados.importar(P.dados.mesclarEstados(P.dados.exportar(), outraAba.dados.exportar()), true);
  assert.equal(avisos, 1);
  assert.equal(P.dados.estado().xp, 15);
  P.dados.importar(P.dados.exportar());
  assert.equal(avisos, 2, 'importação explícita continua sendo uma substituição');
});
test('prêmio e posição persistem juntos após fechar e abrir', () => {
  const { P, shared } = app();
  P.dados.transacao(() => {
    P.dados.adicionarXp(10, 'etapa:a:0');
    P.dados.marcarEtapaPremiada('a', 0);
    P.dados.atualizarRascunho('a', 0);
  });
  const other = app(shared).P;
  assert.equal(other.dados.estado().xp, 10);
  assert.equal(other.dados.obterEtapasPremiadas('a')[0], true);
  assert.equal(other.dados.obterRascunho('a').indice, 0);
  other.dados.adicionarXp(10, 'etapa:a:0');
  assert.equal(other.dados.estado().xp, 10);
});
test('mescla simultânea une prêmios distintos e deduplica o mesmo prêmio', () => {
  const x = app().P, y = app().P;
  x.dados.adicionarXp(10, 'etapa:a:0');
  y.dados.adicionarXp(10, 'etapa:a:0');
  y.dados.adicionarXp(10, 'etapa:a:1');
  const merged = x.dados.mesclarEstados(x.dados.exportar(), y.dados.exportar());
  assert.equal(merged.xp, 20);
  assert.equal(Object.keys(merged.premios).length, 2);
});
test('aba desatualizada não apaga conclusão da outra aba', () => {
  const shared = new Map();
  const x = app(shared).P, y = app(shared).P;
  x.dados.concluirLicao('a', { aproveitamento: 100 });
  y.dados.adicionarXp(5, 'etapa:b:0');
  assert.equal(y.dados.estaConcluida('a'), true);
  assert.equal(y.dados.estado().xp, 35);
});
test('reset explícito vence dados antigos sem ressuscitar XP', () => {
  const { P } = app();
  P.dados.concluirLicao('a', { aproveitamento: 100 });
  const old = P.dados.exportar();
  P.dados.resetar();
  const merged = P.dados.mesclarEstados(P.dados.exportar(), old);
  assert.equal(merged.xp, 0);
  assert.equal(Object.keys(merged.licoes).length, 0);
});
test('backup inválido preserva o progresso atual', () => {
  const { P } = app();
  P.dados.concluirLicao('a', { aproveitamento: 100 });
  for (const invalid of [[], {}, { xp: -1, licoes: {} }, { xp: 1, licoes: { a: null } }, { xp: 1, licoes: {}, sessoes: {} }, { xp: 1, licoes: {}, streak: { dias: 'inválido' } }, { xp: 1, licoes: {}, premios: { teste: -10 } }]) assert.throws(() => P.dados.importar(invalid));
  assert.equal(P.dados.estado().xp, 30);
});
test('XP legado é preservado sem duplicação na migração', () => {
  const { P } = app();
  P.dados.importar({ xp: 120, licoes: {} }, true);
  P.dados.adicionarXp(10, 'etapa:a:0');
  const current = P.dados.exportar();
  assert.equal(current.xp, 130);
  assert.equal(P.dados.mesclarEstados(current, { xp: 120, licoes: {}, streak: { dias: [] } }).xp, 130);
});
test('mescla de práticas preserva respostas distintas do mesmo conceito', () => {
  const a = app().P, b = app().P;
  const first = { dimensao: 'reconhecimento', confianca: 'certeza', evento: 'questao:1' };
  const second = { dimensao: 'construcao', confianca: 'certeza', evento: 'questao:2' };
  a.dados.responderConceito(['sql.select'], true, true, first);
  b.dados.responderConceito(['sql.select'], true, true, second);
  const merged = a.dados.mesclarEstados(a.dados.exportar(), b.dados.exportar());
  assert.equal(merged.conceitos['sql.select'].acertos, 2);
  assert.equal(Object.keys(merged.conceitos['sql.select'].dimensoes).length, 2);
  a.dados.importar(merged, true);
  a.dados.responderConceito(['sql.select'], true, true, first);
  assert.equal(a.dados.estado().conceitos['sql.select'].acertos, 2);
});
test('mescla de habilidades não perde práticas entre dispositivos', () => {
  const a = app().P, b = app().P;
  a.dados.registrarHabilidade('writing', true, 'questao:1');
  b.dados.registrarHabilidade('writing', false, 'questao:2');
  const merged = a.dados.mesclarEstados(a.dados.exportar(), b.dados.exportar());
  assert.equal(merged.habilidades.writing.acertos, 1);
  assert.equal(merged.habilidades.writing.erros, 1);
});
test('colisão de storage persiste a união para a próxima abertura', () => {
  const shared = new Map();
  const a = app(shared), b = app();
  a.P.dados.adicionarXp(10, 'etapa:a:0');
  b.P.dados.adicionarXp(20, 'etapa:b:0');
  const remote = JSON.stringify(b.P.dados.exportar());
  shared.set('trilha-net.estado.v1', remote);
  a.listeners.storage({ key: 'trilha-net.estado.v1', newValue: remote });
  assert.equal(app(shared).P.dados.estado().xp, 30);
});

test('acerto por chute agenda revisão e revisão vencida mantém conceito dominado', () => {
  const { P } = app();
  P.dados.responderConceito(['sql.select'], true, true, { confianca: 'chute', evento: 'chute:1' });
  assert.ok(P.dados.estado().agenda['sql.select']);
  P.dados.estado().conceitos['sql.select'].estado = 'dominado';
  P.dados.estado().agenda['sql.select'].proximaEm = '2000-01-01';
  vm.runInNewContext(fs.readFileSync('app/js/nucleo/progresso.js', 'utf8'), { window: { Plataforma: P } });
  assert.equal(P.progresso.conceitosParaRevisar().length, 1);
});

test('mesclar não modifica os estados recebidos nem compartilha mapas internos', () => {
  const { P } = app();
  const a = { xp: 0, licoes: {}, conceitos: { x: { acertos: 2 } } };
  const b = P.dados.exportar();
  const antes = JSON.stringify(a);
  const merged = P.dados.mesclarEstados(a, b);
  merged.conceitos.x.dimensoes.reconhecimento = { acertos: 9 };
  assert.equal(JSON.stringify(a), antes);
});

test('backup malformado e chaves de protótipo são rejeitados sem modificar o progresso', () => {
  const { P } = app();
  P.dados.concluirLicao('a', { aproveitamento: 100 });
  const antes = JSON.stringify(P.dados.exportar());
  for (const campo of [
    { conceitos: { x: { dimensoes: 'inválido' } } },
    { habilidades: { writing: { acertos: '10' } } },
    { eventosPratica: [] }, { praticaBase: { conceitos: [] } },
    { sessoes: [null] }, { agenda: { x: { proximaEm: 'amanhã' } } },
    { licoes: { a: { rascunho: { indice: 1.5 } } } },
    JSON.parse('{"licoes":{"__proto__":{"status":"concluida"}}}')
  ]) {
    assert.throws(() => P.dados.importar({ xp: 0, licoes: {}, ...campo }));
    assert.equal(JSON.stringify(P.dados.exportar()), antes);
  }
});

test('mescla conserva dimensões de prática legada dos dois dispositivos', () => {
  const { P } = app();
  const make = dimensoes => ({ xp: 0, licoes: {}, conceitos: { x: { acertos: 1, pontos: 1, dimensoes } } });
  const merged = P.dados.mesclarEstados(
    make({ reconhecimento: { acertos: 1, pontos: 1 } }),
    make({ construcao: { acertos: 1, pontos: 1 } })
  );
  assert.equal(merged.conceitos.x.dimensoes.reconhecimento.acertos, 1);
  assert.equal(merged.conceitos.x.dimensoes.construcao.acertos, 1);
});

test('confiança pondera domínio e erros antigos não impedem recuperar domínio', () => {
  const { P } = app();
  const responder = (id, correto, confianca, i) => P.dados.responderConceito([id], correto, true, { evento: id + i, confianca, dimensao: i % 2 ? 'construcao' : 'reconhecimento' });
  for (let i = 0; i < 3; i++) responder('chutes', true, 'chute', i);
  assert.notEqual(P.dados.estadoConceito('chutes'), 'dominado');
  assert.equal(P.dados.dominioConceito('chutes').geral, 35);
  responder('recuperado', false, 'certeza', 0);
  for (let i = 1; i <= 5; i++) responder('recuperado', true, 'certeza', i);
  assert.equal(P.dados.estadoConceito('recuperado'), 'dominado');
  assert.equal(P.dados.dominioConceito('recuperado').geral, 83);
});

test('agenda recente prevalece sobre configuração alterada em uma aba antiga', () => {
  const { P } = app();
  const a = P.dados.exportar(), b = P.dados.exportar();
  a.atualizadoEm = '2026-10-06T10:00:00Z';
  b.atualizadoEm = '2026-10-06T11:00:00Z';
  a.agenda.x = { nivel: 2, proximaEm: '2026-10-13', atualizadaEm: '2026-10-06T10:00:00Z' };
  b.agenda.x = { nivel: 0, proximaEm: '2026-10-01', ultimoErroEm: '2026-09-30T10:00:00Z' };
  assert.equal(P.dados.mesclarEstados(a, b).agenda.x.nivel, 2);
  assert.equal(P.dados.mesclarEstados(b, a).agenda.x.nivel, 2);
});

test('contadores legados incompletos conservam pontos ao migrar e praticar', () => {
  const { P } = app();
  P.dados.importar({ xp: 0, licoes: {}, conceitos: { x: { acertos: 1, dimensoes: { reconhecimento: { acertos: 1 } } } }, habilidades: { writing: { acertos: 1 } } }, true);
  P.dados.responderConceito(['x'], true, true, { confianca: 'certeza', evento: 'nova-pratica' });
  P.dados.registrarHabilidade('writing', true, 'nova-pratica');
  const merged = P.dados.mesclarEstados(P.dados.exportar(), P.dados.exportar());
  assert.equal(merged.conceitos.x.dominio.geral, 100);
  assert.equal(merged.conceitos.x.acertos, 2);
  assert.equal(merged.habilidades.writing.pontos, 2);
});

test('mescla do mesmo prêmio com valores diferentes conserva o maior XP nas duas ordens', () => {
  const a = app().P, b = app().P;
  a.dados.adicionarXp(10, 'etapa:a:0');
  b.dados.adicionarXp(5, 'etapa:a:0');
  for (const [x, y] of [[a, b], [b, a]]) {
    const merged = a.dados.mesclarEstados(x.dados.exportar(), y.dados.exportar());
    assert.equal(merged.xp, 10);
    assert.equal(Object.keys(merged.premios).length, 1);
  }
});
