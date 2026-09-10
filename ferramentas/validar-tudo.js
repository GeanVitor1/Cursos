const { spawnSync } = require('child_process');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const passos = [
  { nome: 'Estrutura e registro', script: 'validar-dados.js' },
  { nome: 'Conceitos, pré-requisitos e termos em português', script: 'linter-pedagogico.js' },
  { nome: 'Vocabulário de inglês (palavra a palavra)', script: 'linter-ingles.js' },
  { nome: 'Símbolos de código', script: 'linter-simbolos.js' }
];

let falhas = 0;
passos.forEach(function (passo) {
  process.stdout.write('\n=== ' + passo.nome + ' ===\n');
  const resultado = spawnSync(process.execPath, [path.join(__dirname, passo.script)], { cwd: RAIZ, stdio: 'inherit' });
  if (resultado.status !== 0) falhas += 1;
});

process.stdout.write('\n=== Resultado ===\n');
if (falhas) {
  process.stdout.write(falhas + ' validação(ões) com erro.\n');
  process.exit(1);
}
process.stdout.write('Todas as validações passaram.\n');
