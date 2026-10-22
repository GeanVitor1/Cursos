const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const crypto = require('node:crypto');
function app(time = '2026-10-22T15:00:00Z', shared = new Map()) {
  let now = Date.parse(time);
  class Clock extends Date { constructor(...args) { super(...(args.length ? args : [now])); } static now() { return now; } }
  const listeners = {};
  const window = { crypto: crypto.webcrypto, addEventListener: (n, cb) => listeners[n] = cb, localStorage: { getItem: k => shared.get(k), setItem: (k, v) => shared.set(k, v) } };
  const context = vm.createContext({ window, Date: Clock, console });
  for (const f of ['registro', 'armazenamento', 'progresso']) vm.runInContext(fs.readFileSync(`app/js/nucleo/${f}.js`, 'utf8'), context);
  return { P: window.Plataforma, listeners, shared, now: () => now, setTime: s => now = Date.parse(s) };
}
test('login e XP isolado não contam como estudo; resposta errada conta sem XP', () => {
  const { P } = app();
  assert.equal(P.dados.estado().streak.atual, 0);
  P.dados.adicionarXp(10);
  assert.equal(P.dados.estado().streak.atual, 0);
  P.dados.registrarAtividade('resposta', 'tentativa1', 'sql-00');
  assert.equal(P.dados.estado().streak.atual, 1);
  assert.equal(P.dados.resumoAtividade().totalDias, 1);
});
test('streak expira, recorde permanece e reabertura não duplica dias', () => {
  const a = app();
  a.P.dados.registrarAtividade('resposta', 'a');
  a.setTime('2026-10-23T15:00:00Z'); a.P.dados.registrarAtividade('resposta', 'b');
  assert.equal(a.P.dados.estado().streak.atual, 2);
  a.setTime('2026-10-25T15:00:00Z');
  assert.equal(a.P.dados.estado().streak.atual, 0);
  assert.equal(a.P.dados.estado().streak.recorde, 2);
  const reaberta = app('2026-10-25T15:00:00Z', a.shared);
  assert.equal(reaberta.P.dados.estado().streak.atual, 0);
  assert.equal(reaberta.P.dados.resumoAtividade().totalDias, 2);
});
test('mescla reconstrói sequência com dias complementares em duas máquinas', () => {
  const a = app('2026-10-21T15:00:00Z'), b = app();
  a.P.dados.registrarAtividade('resposta', 'a'); b.P.dados.registrarAtividade('resposta', 'b');
  const merged = b.P.dados.mesclarEstados(a.P.dados.exportar(), b.P.dados.exportar());
  assert.equal(merged.streak.atual, 2); assert.equal(merged.streak.recorde, 2);
  assert.equal(b.P.dados.mesclarEstados(merged, merged).streak.dias.length, 2);
});
test('virada de dia usa fuso do perfil e separa corretamente tempo ativo', () => {
  const { P } = app('2026-10-23T03:00:05Z');
  const inicio = Date.parse('2026-10-23T02:59:55Z');
  P.dados.registrarTempo(inicio, inicio + 10000);
  const dias = P.dados.resumoAtividade().dias;
  assert.equal(dias[0].dia, '2026-10-22'); assert.equal(dias[0].segundos, 5);
  assert.equal(dias[1].dia, '2026-10-23'); assert.equal(dias[1].segundos, 5);
  assert.equal(P.dados.hojeISO(), '2026-10-23');
});
test('leitura ativa exige 120 segundos; intervalos sobrepostos não duplicam tempo', () => {
  const a = app(), b = app(), inicio = a.now() - 120000;
  for (let i = 0; i < 120; i += 10) a.P.dados.registrarTempo(inicio + i * 1000, inicio + (i + 10) * 1000);
  b.P.dados.registrarTempo(inicio, inicio + 10000);
  a.P.dados.importar(a.P.dados.mesclarEstados(a.P.dados.exportar(), b.P.dados.exportar()), true);
  assert.equal(a.P.dados.resumoAtividade().segundos, 120);
  assert.equal(a.P.dados.estado().streak.atual, 1);
  a.P.dados.registrarTempo(inicio, inicio + 600000);
  assert.equal(a.P.dados.resumoAtividade().segundos, 120);
});
test('histórico legado, XP e conclusões são preservados sem fabricar novas aulas', () => {
  const { P } = app();
  P.dados.importar({ xp: 90, licoes: { a: { status: 'em-andamento' }, b: { status: 'concluida' } }, streak: { dias: ['2026-10-21'], recorde: 3 } });
  P.interno.trilhas.t = { niveis: [{ etapas: [{ licao: 'a' }, { licao: 'b' }] }] };
  assert.equal(P.dados.repararProgresso(), 0);
  assert.equal(P.dados.estaConcluida('a'), false);
  assert.equal(P.dados.estaConcluida('b'), true);
  assert.equal(P.dados.resumoAtividade().totalDias, 1);
  assert.equal(P.dados.estado().xp, 90);
});
test('checkpoint insuficiente não conclui nem premia; nova tentativa suficiente aprova', () => {
  const { P } = app(); P.interno.licoes.exame = { tipo: 'prova', etapas: [] };
  const r = P.dados.concluirLicao('exame', { aproveitamento: 69 });
  assert.equal(r.aprovado, false); assert.equal(P.dados.estaConcluida('exame'), false); assert.equal(P.dados.estado().xp, 0);
  P.dados.concluirLicao('exame', { aproveitamento: 70 });
  assert.equal(P.dados.estaConcluida('exame'), true); assert.equal(P.dados.estado().xp, 100);
  P.dados.concluirLicao('exame', { aproveitamento: 100 }); assert.equal(P.dados.estado().xp, 100);
});
test('acerto confiante também agenda recuperação sem ser tratado como erro hoje', () => {
  const { P } = app();
  P.dados.responderConceito(['x'], true, true, { confianca: 'certeza' });
  assert.equal(P.dados.estado().agenda.x.proximaEm, '2026-10-23');
  assert.equal(P.dados.estado().agenda.x.ultimoErroEm, null);
  assert.equal(P.progresso.conceitosParaRevisar(true).length, 0);
});
test('backup com fuso ou máscara inválidos é rejeitado sem perda', () => {
  const { P } = app(); const original = P.dados.exportar();
  const bad = P.dados.exportar(); bad.atividade.fuso = 'inexistente';
  assert.throws(() => P.dados.importar(bad));
  bad.atividade.fuso = 'America/Sao_Paulo'; bad.atividade.intervalos['123'] = 1024;
  assert.throws(() => P.dados.importar(bad));
  assert.deepEqual(P.dados.exportar(), original);
});
test('domínio inclui conceitos ainda não praticados e conclusão não declara domínio', () => {
  const { P } = app();
  P.interno.licoes.a = { trilha: 't', conceitos: ['a', 'b'], etapas: [{ tipo: 'conteudo' }] };
  P.interno.trilhas.t = { id: 't', niveis: [{ etapas: [{ id: 'a', licao: 'a' }] }] };
  P.interno.habilidades = { competencias: { t: { trilha: 't', conceitosChave: ['a', 'b'] } } };
  P.dados.responderConceito(['a'], true, true, { confianca: 'certeza' });
  assert.equal(P.progresso.dominioTrilha('t'), 50);
  P.dados.concluirLicao('a', { aproveitamento: 100 });
  assert.notEqual(P.progresso.statusHabilidade('t').estado, 'dominada');
});
test('abas persistem união de tempo mesmo sem novos prêmios ou conclusões', () => {
  const shared = new Map(), a = app(undefined, shared), b = app(undefined, shared);
  const inicio = a.now() - 20000;
  a.P.dados.registrarTempo(inicio, inicio + 10000);
  const primeiro = a.P.dados.exportar();
  b.P.dados.registrarTempo(inicio + 10000, inicio + 20000);
  const segundo = b.P.dados.exportar();
  shared.set('trilha-net.estado.v1', JSON.stringify(primeiro));
  b.listeners.storage({ key: 'trilha-net.estado.v1', newValue: JSON.stringify(primeiro) });
  assert.equal(app(undefined, shared).P.dados.resumoAtividade().segundos, 20);
  assert.equal(segundo.atividade.diasLegados.length, 0);
});
test('rastreador ignora dashboard, página oculta, janela sem foco e inatividade', () => {
  let now = 0, runner = false, focus = true, total = 0;
  const listeners = {}, timers = [];
  const P = { dados: { registrarTempo: (a, b) => total += b - a } };
  const document = { visibilityState: 'visible', hasFocus: () => focus, querySelector: s => s === '.runner' && runner, addEventListener: (n, cb) => listeners[n] = cb };
  const window = { Plataforma: P, setInterval: cb => timers.push(cb), addEventListener: (n, cb) => listeners[n] = cb };
  vm.runInNewContext(fs.readFileSync('app/js/nucleo/atividade.js', 'utf8'), { window, document, Date: { now: () => now } });
  const tick = ms => { now += ms; timers[0](); };
  tick(5000); assert.equal(total, 0);
  runner = true; listeners.pointerdown({ isTrusted: true }); tick(5000); assert.equal(total, 5000);
  document.visibilityState = 'hidden'; listeners.visibilitychange(); tick(5000); assert.equal(total, 5000);
  document.visibilityState = 'visible'; focus = false; tick(5000); assert.equal(total, 5000);
  focus = true; tick(70000); assert.equal(total, 5000);
  listeners.keydown({ isTrusted: true }); tick(5000); assert.equal(total, 10000);
});
test('mesmas atividades em ordem diferente não causam ping-pong de storage', () => {
  const a = app(); a.P.dados.registrarAtividade('resposta', 'a'); a.P.dados.registrarAtividade('resposta', 'b');
  const recebido = a.P.dados.exportar(); recebido.atividade.eventos = { b: recebido.atividade.eventos.b, a: recebido.atividade.eventos.a };
  const bruto = JSON.stringify(recebido); a.shared.set('trilha-net.estado.v1', bruto);
  a.listeners.storage({ key: 'trilha-net.estado.v1', newValue: bruto });
  assert.equal(a.shared.get('trilha-net.estado.v1'), bruto);
});
test('revisão de hoje usa o mesmo fuso do calendário após meia-noite UTC', () => {
  const { P } = app('2026-10-23T01:30:00Z');
  P.dados.responderConceito(['conceito'], false, false);
  assert.equal(P.dados.hojeISO(), '2026-10-22');
  assert.equal(P.progresso.conceitosParaRevisar(true).length, 1);
  assert.equal(P.progresso.conceitosParaRevisar(false).length, 0);
});
test('conclusão, atividade, XP e histórico são persistidos numa única gravação', () => {
  const { P, shared } = app(); P.interno.licoes.a = { id: 'a', etapas: [], xp: 30 };
  const gravacoes = [];
  P.dados.aoMudar(() => {
    gravacoes.push(JSON.parse(shared.get('trilha-net.estado.v1')));
  });
  P.dados.concluirLicao('a', { aproveitamento: 100 });
  assert.equal(gravacoes.length, 1);
  const salvo = gravacoes[0];
  assert.equal(salvo.licoes.a.status, 'concluida');
  assert.equal(salvo.xp, 30);
  assert.equal(salvo.sessoes.length, 1);
  assert.equal(salvo.atividade.eventos['conclusao:a'].tipo, 'conclusao');
});
