const { test, expect } = require('@playwright/test');
const { abrir } = require('./curso-helper.cjs');
test.beforeEach(async ({ context }) => {
  await context.route('https://*.supabase.co/**', r => r.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
});
for (const tema of ['claro', 'escuro']) for (const width of [320, 768, 1440]) {
  test(`percursos e meta: ${tema}, ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 }); await abrir(page);
    await page.evaluate(tema => { Plataforma.dados.definirTema(tema); }, tema);
    await expect(page.locator('html')).toHaveAttribute('data-tema', tema);
    const percurso = page.locator('.percurso').nth(1);
    await percurso.locator('summary').click();
    await expect(percurso).toHaveAttribute('open', '');
    await expect(percurso.locator('.percurso-link')).toHaveCount(7);
    await expect(percurso.locator('.percurso-etapa.planejada').first()).toContainText('Em produção');
    const before = await page.evaluate(() => Plataforma.dados.exportar());
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const styles = await page.locator('#meta-diaria').evaluate(el => {
      const style = getComputedStyle(el);
      return { appearance: style.appearance, colorScheme: style.colorScheme, background: style.backgroundColor, color: style.color, height: el.getBoundingClientRect().height };
    });
    expect(styles.appearance).toBe('none');
    expect(styles.colorScheme).toBe(tema === 'escuro' ? 'dark' : 'light');
    expect(styles.background).not.toBe(styles.color);
    expect(styles.height).toBeGreaterThanOrEqual(44);
    if (tema === 'escuro') expect(styles.background).not.toBe('rgb(255, 255, 255)');
    await page.locator('#meta-diaria').selectOption('30');
    await expect(page.locator('#meta-diaria')).toBeFocused();
    await expect(page.getByRole('progressbar', { name: 'Progresso da meta diária' })).toHaveAttribute('aria-valuenow', '0');
    await page.locator('.percurso').nth(1).locator('summary').click();
    await page.mouse.move(0, 0);
    await page.locator('.formacao').screenshot({ path: `.gstack/qa-reports/screenshots/formacao-${tema}-${width}.png`, animations: 'disabled' });
    await page.locator('.atividade-resumo').screenshot({ path: `.gstack/qa-reports/screenshots/meta-${tema}-${width}.png`, animations: 'disabled' });
    const depois = await page.evaluate(() => Plataforma.dados.exportar());
    expect(depois.xp).toBe(before.xp);
    expect(depois.licoes).toEqual(before.licoes);
    const link = page.locator('.percurso').nth(1).locator('.percurso-link').first();
    await link.focus(); await expect(link).toBeFocused();
    await link.press('Enter'); await expect(page).toHaveURL(/#\/trilha\/ciber-fundamentos$/);
  });
}
for (const [tema, width] of [['claro', 1440], ['escuro', 375]]) {
  test(`percurso selecionado com progresso: ${tema}, ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 }); await abrir(page);
    await page.evaluate(tema => {
      const P = Plataforma, estado = P.dados.exportar();
      for (const [id, quantidade] of [['sql', 13], ['csharp', 5], ['terminal', 1], ['logica', 1]]) {
        for (const etapa of P.progresso.daTrilha(id).comLicao.slice(0, quantidade)) estado.licoes[etapa.licao] = { status: 'concluida', concluidaEm: new Date().toISOString() };
      }
      estado.configuracoes.percurso = P.interno.manifesto.percursos[0].nome;
      estado.configuracoes.tema = tema; P.dados.importar(estado, true); P.roteador.processar();
    }, tema);
    const percurso = page.locator('.percurso').first();
    await expect(percurso).toHaveAttribute('open', '');
    await expect(percurso.locator('.percurso-atual')).toHaveText('Seu percurso');
    await expect(percurso.getByRole('button', { name: 'Percurso selecionado' })).toBeDisabled();
    await expect(percurso.locator('.percurso-etapa.concluida')).toHaveCount(2);
    await expect(percurso.getByRole('link').filter({ hasText: 'SQL' }).locator('.percurso-percentual')).toHaveText('28%');
    await expect(percurso.getByRole('link').filter({ hasText: 'C#' }).locator('.percurso-percentual')).toHaveText('50%');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.mouse.move(0, 0);
    await page.locator('.formacao').screenshot({ path: `.gstack/qa-reports/screenshots/percurso-selecionado-${tema}-${width}.png`, animations: 'disabled' });
  });
}
