const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const crypto = require('node:crypto');

const CHAVE = 'trilha-net.estado.v1';

function app(shared = new Map(), extras = []) {
  const window = { crypto: crypto.webcrypto, addEventListener: () => {}, localStorage: { getItem: k => shared.get(k) || null, setItem: (k, v) => shared.set(k, v) } };
  const context = vm.createContext({ window, console: { error() {}, warn() {}, log() {} }, Set, Map });
  for (const file of ['app/js/nucleo/registro.js', 'app/js/nucleo/armazenamento.js', ...extras]) vm.runInContext(fs.readFileSync(file, 'utf8'), context);
  return { P: window.Plataforma, shared };
}

// --- 1. Pré-requisitos sobre o total planejado -------------------------------
function comTrilhas(shared) {
  const { P } = app(shared, ['app/js/nucleo/progresso.js']);
  const licao = (id, extra = {}) => { P.interno.licoes[id] = Object.assign({ id, etapas: [{ tipo: 'atividade', atividade: { id: id + '-a' } }] }, extra); };
  ['b1', 'b2'].forEach(id => licao(id));
  P.interno.trilhas.base = { id: 'base', nome: 'Base', niveis: [{ id: 'n', etapas: [
    { id: 'b1', licao: 'b1' }, { id: 'b2', licao: 'b2' }, { id: 'bcp', licao: 'bcp', tipo: 'prova' }, { id: 'b3', licao: 'b3' }
  ] }] };
  P.interno.trilhas.dep = { id: 'dep', nome: 'Dep', prerequisitos: [{ trilha: 'base', min: 100 }], niveis: [{ id: 'n', etapas: [{ id: 'd1', licao: 'd1' }] }] };
  licao('d1');
  P.interno.manifesto = { trilhas: [{ id: 'base' }, { id: 'dep' }] };
  return { P, licao };
}

test('trilha com stubs a 100% do publicado não libera dependentes sem checkpoint aprovado', () => {
  const { P } = comTrilhas();
  P.dados.concluirLicao('b1', { aproveitamento: 100 });
  P.dados.concluirLicao('b2', { aproveitamento: 100 });
  const base = P.progresso.daTrilha('base');
  assert.equal(base.percentual, 100, 'percentual publicado continua sendo exibido');
  assert.equal(base.percentualPlanejado, 50);
  assert.equal(base.emConstrucao, true);
  assert.equal(P.progresso.daTrilha('dep').status, 'bloqueada');
});

test('checkpoint publicado aprovado libera provisoriamente e publicar lições novas não rebloqueia', () => {
  const shared = new Map();
  const { P, licao } = comTrilhas(shared);
  licao('bcp', { tipo: 'prova' });
  P.dados.concluirLicao('b1', { aproveitamento: 100 });
  P.dados.concluirLicao('b2', { aproveitamento: 100 });
  assert.equal(P.progresso.daTrilha('dep').status, 'bloqueada', 'checkpoint publicado pendente bloqueia');
  P.dados.concluirLicao('bcp', { aproveitamento: 90 });
  const req = P.progresso.daTrilha('dep').requisitos[0];
  assert.equal(req.atendido, true);
  assert.equal(req.provisorio, true);
  // Nova sessão com a lição b3 publicada: o requisito persiste.
  const depois = comTrilhas(shared);
  depois.licao('bcp', { tipo: 'prova' });
  depois.licao('b3');
  assert.equal(depois.P.progresso.daTrilha('base').percentual < 100, true);
  assert.equal(depois.P.progresso.daTrilha('dep').requisitos[0].atendido, true);
  assert.notEqual(depois.P.progresso.daTrilha('dep').status, 'bloqueada');
});

// --- 2 e 3. Checkpoints refeitos --------------------------------------------
test('refazer checkpoint já aprovado com nota baixa não reporta aprovação', () => {
  const { P } = app();
  P.interno.licoes.cp = { id: 'cp', tipo: 'prova', minimoAprovacao: 70, etapas: [] };
  assert.notEqual(P.dados.concluirLicao('cp', { aproveitamento: 80 }).aprovado, false);
  const refeito = P.dados.concluirLicao('cp', { aproveitamento: 20 });
  assert.equal(refeito.aprovado, false);
  assert.equal(P.dados.estaConcluida('cp'), true, 'aprovação anterior continua registrada');
  assert.equal(P.dados.concluirLicao('cp', { aproveitamento: 75 }).aprovado, true);
});

test('nova tentativa de prova reprovada limpa etapas premiadas e resultados antigos', () => {
  const { P } = app();
  P.interno.licoes.cp = { id: 'cp', tipo: 'prova', minimoAprovacao: 70, etapas: [{ tipo: 'atividade', atividade: { id: 'x' } }] };
  P.dados.marcarEtapaPremiada('cp', 0);
  P.dados.registrarResultadoEtapa('cp', 0, { primeira: true });
  assert.equal(P.dados.concluirLicao('cp', { aproveitamento: 10 }).aprovado, false);
  P.dados.limparEtapasPremiadas('cp');
  assert.deepEqual({ ...P.dados.obterEtapasPremiadas('cp') }, {});
  assert.deepEqual({ ...P.dados.obterResultadosEtapas('cp') }, {});
});

test('runner reinicia toda prova e limpa premiadas quando não aprovada', () => {
  const fonte = fs.readFileSync('app/js/ui/runner.js', 'utf8');
  assert.match(fonte, /tipo === 'prova'\) \{[\s\S]{0,900}limparEtapasPremiadas/);
});

// --- 5. Estado corrompido -----------------------------------------------------
test('um registro inválido descarta só esse registro e mantém o resto do progresso', () => {
  const shared = new Map();
  const { P } = app(shared);
  P.interno.licoes.a = { id: 'a', etapas: [], xp: 30 };
  P.dados.concluirLicao('a', { aproveitamento: 100 });
  const salvo = JSON.parse(shared.get(CHAVE));
  salvo.licoes.ruim = { status: 'xyz' };
  salvo.premios.ruim = -5;
  shared.set(CHAVE, JSON.stringify(salvo));
  const outra = app(shared).P;
  assert.equal(outra.dados.localStorageDisponivel(), true);
  assert.equal(outra.dados.estaConcluida('a'), true);
  assert.equal(outra.dados.estado().licoes.ruim, undefined);
  assert.equal(outra.dados.estado().xp, 30);
  assert.ok(shared.get(CHAVE + '.corrompido'), 'original guardado em backup');
});

test('JSON ilegível vai para backup e não desliga a persistência', () => {
  const shared = new Map([[CHAVE, '{quebrado']]);
  const { P } = app(shared);
  assert.equal(P.dados.localStorageDisponivel(), true);
  assert.equal(JSON.parse(shared.get(CHAVE + '.corrompido')).bruto, '{quebrado');
  P.dados.adicionarXp(5, 'x');
  assert.equal(JSON.parse(shared.get(CHAVE)).xp, 5);
});

// --- 4. validarAudio ----------------------------------------------------------
test('validarAudio exige transcrição completa e aceita "seven oh five"', () => {
  const contexto = vm.createContext({ window: {} });
  for (const f of ['app/js/nucleo/registro.js', 'app/js/ui/dom.js', 'app/js/atividades/base.js', 'app/js/atividades/idiomas.js']) vm.runInContext(fs.readFileSync(f, 'utf8'), contexto);
  const P = contexto.window.Plataforma;
  const v = P.atividades.validarAudio;
  const cafe = { audio: 'Coffee', resposta: 'coffee' };
  assert.equal(v(cafe, 'cof'), false);
  assert.equal(v(cafe, 'COFFEE!'), true);
  const frase = { audio: 'I like coffee with milk.', resposta: 'I like coffee with milk' };
  assert.equal(v(frase, 'coffee'), false);
  assert.equal(v(frase, 'i like coffee, with milk'), true);
  const dezessete = { audio: 'Seventeen.', resposta: '17' };
  assert.equal(v(dezessete, 'seven'), false);
  assert.equal(v(dezessete, 'seventeen'), true);
  const hora = { audio: 'It is seven oh five.', resposta: '7:05' };
  assert.equal(v(hora, 'seven oh five'), true);
  assert.equal(v(hora, '7:05'), true);
  assert.equal(v(hora, 'seven'), false);
  assert.equal(v(hora, 'seven oh six'), false);
});
