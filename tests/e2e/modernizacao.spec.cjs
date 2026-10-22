const { test, expect } = require('@playwright/test');
const { abrir, fazerLicao, resposta } = require('./curso-helper.cjs');
test.beforeEach(async ({ context }) => {
  await context.route('https://*.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
});
for (const track of ['engenharia-ia', 'ciber-fundamentos']) test('trilha completa: ' + track, async ({ page }) => {
  test.setTimeout(180000);
  await abrir(page);
  for (let i = 0; i < 4; i++) await fazerLicao(page, track + '-0' + i);
  const result = await page.evaluate(track => ({ conclusao: Plataforma.progresso.daTrilha(track).percentual, dias: Plataforma.dados.resumoAtividade().totalDias }), track);
  expect(result.conclusao).toBe(100); expect(result.dias).toBe(1);
  await page.reload(); await expect(page.locator('.runner')).toBeVisible();
  expect(await page.evaluate(track => Plataforma.progresso.daTrilha(track).percentual, track)).toBe(100);
});
test('solução correta com justificativa errada reprova e permite corrigir', async ({ page }) => {
  await abrir(page, '#/licao/engenharia-ia-00');
  while (!(await page.locator('.decisao-solucao').count())) {
    const step = await page.evaluate(() => {
      const index = Number(document.querySelector('.runner-contador').textContent.split('/')[0]) - 1;
      return Plataforma.interno.licoes['engenharia-ia-00'].etapas[index];
    });
    if (step.tipo === 'atividade') {
      await resposta(page, step.atividade);
      await page.locator('.runner-acoes .btn-primario').click();
    }
    await page.locator('.runner-acoes .btn-primario').click();
  }
  const action = page.locator('.runner-acoes .btn-primario');
  await page.locator('.decisao-solucao [data-indice-original="0"]').click();
  await expect(action).toBeDisabled();
  await page.locator('.decisao-motivo [data-indice-original="1"]').click(); await action.click();
  await expect(page.locator('.feedback.errado')).toBeVisible();
  await action.click();
  await page.locator('.decisao-solucao [data-indice-original="0"]').click();
  await page.locator('.decisao-motivo [data-indice-original="0"]').click(); await action.click();
  await expect(page.locator('.feedback.correto')).toBeVisible();
});
test('checkpoint reprovado mantém pendência e nova tentativa aprova', async ({ page }) => {
  await abrir(page);
  await page.evaluate(() => {
    Plataforma.registrarLicao({ id: 'qa-exame', trilha: 'qa', tipo: 'prova', titulo: 'Avaliação de regressão', conceitos: [], etapas: [{ tipo: 'atividade', atividade: { id: 'qa-resposta', tipo: 'multiple-choice', enunciado: 'Qual ação verifica o comportamento?', opcoes: ['Executar o caso e observar o estado', 'Apenas observar a cor do botão'], correta: 0, dicas: ['Observe a evidência'], explicacao: 'É necessário observar comportamento.', conceitos: [] } }] });
    Plataforma.roteador.ir('#/licao/qa-exame');
  });
  const action = page.locator('.runner-acoes .btn-primario');
  for (let i = 0; i < 2; i++) {
    await page.locator('.opcao[data-indice-original="1"]').click(); await action.click();
    if (i === 0) await action.click();
  }
  await page.getByRole('button', { name: 'Ver resposta', exact: true }).click(); await action.click();
  await expect(page.getByRole('heading', { name: 'Checkpoint: vamos revisar' })).toBeVisible();
  expect(await page.evaluate(() => Plataforma.dados.estaConcluida('qa-exame'))).toBe(false);
  await page.getByRole('button', { name: 'Tentar checkpoint novamente' }).click();
  await page.locator('.opcao[data-indice-original="0"]').click(); await action.click(); await action.click();
  await expect(page.getByRole('heading', { name: 'Checkpoint aprovado' })).toBeVisible();
  expect(await page.evaluate(() => Plataforma.dados.estaConcluida('qa-exame'))).toBe(true);
});
test('escolha de percurso recomenda fundamentos corretos e persiste', async ({ page }) => {
  await abrir(page);
  const percurso = page.locator('details').filter({ has: page.locator('summary', { hasText: 'Cibersegurança' }) });
  await percurso.locator('summary').click();
  await percurso.getByRole('button', { name: 'Seguir este percurso' }).click();
  await expect(page.locator('.continua-titulo')).toHaveText('Da rede ao HTTPS: localizar uma falha');
  await page.reload();
  await expect(page.locator('.continua-titulo')).toHaveText('Da rede ao HTTPS: localizar uma falha');
});
for (const width of [320, 768, 1440]) test('dashboard e calendário em ' + width + 'px', async ({ page }) => {
  await page.setViewportSize({ width, height: 900 }); await abrir(page);
  await expect(page.locator('.atividade-dia')).toHaveCount(35);
  expect(await page.evaluate(() => Plataforma.dados.resumoAtividade().totalDias)).toBe(0);
  await page.getByLabel('Meta diária de estudo', { exact: true }).selectOption('30');
  await expect(page.getByLabel('Meta diária de estudo', { exact: true })).toHaveValue('30');
  await page.reload(); await expect(page.getByLabel('Meta diária de estudo', { exact: true })).toHaveValue('30');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: '.gstack/qa-reports/screenshots/atividade-' + width + '.png', fullPage: true });
});
