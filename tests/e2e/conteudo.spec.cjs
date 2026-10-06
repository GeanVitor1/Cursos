const { test, expect } = require('@playwright/test');
test('todos os gabaritos, alternativas embaralhadas e respostas inválidas', async ({ page, context }) => {
  test.setTimeout(120000);
  await context.route('https://*.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  await page.goto('/app/');
  await expect(page.locator('.home')).toBeVisible();
  await page.evaluate(async () => { await Promise.all(Object.values(Plataforma.interno.licoes).filter(l => l.disponivel).map(l => Plataforma.carregador.carregarLicao(l.id))); });
  const result = await page.evaluate(() => {
    const P = Plataforma;
    const failures = [], counts = {};
    const choices = ['multiple-choice', 'find-error', 'interpret-code', 'predict-output', 'translate', 'reading', 'debug', 'scenario', 'code-review', 'choose-image', 'listening'];
    for (const l of Object.values(P.interno.licoes)) for (const e of l.etapas || []) {
      if (e.tipo !== 'atividade') continue;
      const a = e.atividade;
      counts[a.tipo] = (counts[a.tipo] || 0) + 1;
      const def = P.atividades.encontrar(a.tipo);
      if (!def) { failures.push(a.id + ': render ausente'); continue; }
      const cases = choices.includes(a.tipo) && !(a.tipo === 'listening' && a.modo === 'escrever') ? a.opcoes.map((_, i) => i) : ['model', 'invalid'];
      if (['dialogue', 'visualizer'].includes(a.tipo)) continue; // Covered by complete lesson runs.
      for (const input of cases) {
        const area = document.createElement('div'); document.body.appendChild(area);
        let ready = false;
        try {
          const instance = def.render(a, area, { marcarRespondida: v => { ready = v; } });
          const valid = input === 'model';
          if (typeof input === 'number') area.querySelector(`[data-indice-original="${input}"]`).click();
          else if (a.tipo === 'fill-code') area.querySelectorAll('input').forEach((el, i) => { el.value = valid ? a.lacunas[i][0] : 'ZZZ_INVALIDO_987'; el.dispatchEvent(new Event('input')); });
          else if (a.tipo === 'write-code' || a.tipo === 'explain') {
            const el = area.querySelector('textarea');
            el.value = valid ? (a.respostasAceitas?.[0] || a.exemplo || '').replace(/\[(seu nome|nome)\]/g, 'Ana').replace(/\[sua idade\]/g, 'twenty') : 'ZZZ_INVALIDO_987 ZZZ_INVALIDO_987';
            el.dispatchEvent(new Event('input'));
          } else if (a.tipo === 'listening') { const el = area.querySelector('input'); el.value = valid ? a.resposta : 'ZZZ_INVALIDO_987'; el.dispatchEvent(new Event('input')); }
          else if (a.tipo === 'true-false') area.querySelectorAll('.tf-afirmacao').forEach((el, i) => el.querySelectorAll('button')[(valid ? a.afirmacoes[i].correta : !a.afirmacoes[i].correta) ? 0 : 1].click());
          else if (a.tipo === 'order-blocks') for (const text of (valid ? a.blocos : a.blocos.slice().reverse())) [...area.querySelectorAll('.ordenar-pool button')].find(el => el.textContent === text).click();
          else if (a.tipo === 'match-pairs') { for (let i = 0; i < a.pares.length; i++) { area.querySelectorAll('.match-coluna')[0].querySelector(`[data-indice="${i}"]`).click(); area.querySelectorAll('.match-coluna')[1].querySelector(`[data-indice="${valid ? i : (i + 1) % a.pares.length}"]`).click(); } }
          const actual = instance.verificar().correto;
          const expected = typeof input === 'number' ? input === a.correta : valid;
          if (actual !== expected) failures.push(`${l.id}/${a.id}: ${input} esperado=${expected} recebido=${actual}`);
          if (expected && !ready) failures.push(`${a.id}: resposta válida não habilita verificar`);
          if (instance.destruir) instance.destruir();
        } catch (error) { failures.push(`${a.id}: ${error.message}`); }
        finally { area.remove(); }
      }
    }
    return { failures, counts };
  });
  console.log('Cobertura de atividades:', result.counts);
  expect(result.failures).toEqual([]);
});
