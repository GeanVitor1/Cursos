const { defineConfig } = require('@playwright/test');
process.env.QA_RUN_ID = process.env.QA_RUN_ID || String(Date.now());
module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 60000,
  workers: 1,
  outputDir: '.gstack/qa-reports/runs/' + process.env.QA_RUN_ID,
  use: { baseURL: 'http://127.0.0.1:8080', trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  webServer: { command: 'node ferramentas/servidor-local.cjs', url: 'http://127.0.0.1:8080', reuseExistingServer: false },
  reporter: [['list'], ['json', { outputFile: '.gstack/qa-reports/runs/' + process.env.QA_RUN_ID + '/results.json' }]]
});
