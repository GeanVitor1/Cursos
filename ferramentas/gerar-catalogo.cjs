const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const sandbox = { window: {} };
vm.createContext(sandbox);
function run(relative) {
  const filename = path.resolve(root, 'app', relative);
  vm.runInContext(fs.readFileSync(filename, 'utf8'), sandbox, { filename });
}
run('js/nucleo/registro.js');
sandbox.Plataforma = sandbox.window.Plataforma;
run('../data/manifest.js');
const P = sandbox.Plataforma;
const catalogo = [];
const definicoes = {};
for (const trilha of P.interno.manifesto.trilhas) {
  for (const arquivo of trilha.licoes) {
    const antes = new Set(Object.keys(P.interno.licoes));
    run(arquivo);
    const id = Object.keys(P.interno.licoes).find(id => !antes.has(id));
    if (!id) throw new Error('Registro de lição ausente ou duplicado: ' + arquivo);
    const l = P.interno.licoes[id];
    const assinatura = l.etapas.length + ':' + l.etapas.map((e, i) => e.tipo === 'atividade' && e.atividade && e.atividade.id ? e.atividade.id : 'c:' + String(e.titulo || i)).join('|');
    const hash = crypto.createHash('sha256').update(fs.readFileSync(path.resolve(root, 'app', arquivo))).digest('hex').slice(0, 16);
    catalogo.push({ id, trilha: l.trilha, tipo: l.tipo, titulo: l.titulo, xp: l.xp, duracaoMin: l.duracaoMin, conceitos: l.conceitos || [], arquivo, disponivel: l.etapas.length > 0, assinaturaConteudo: hash, assinaturaLegada: assinatura });
    l.etapas.forEach(e => (e.blocos || []).forEach(b => {
      if (b.tipo === 'conceito' && !definicoes[b.id]) definicoes[b.id] = { definicao: b.texto, exemplo: b.exemplo, licao: id, titulo: b.titulo };
    }));
  }
}
const output = '// Gerado por node ferramentas/gerar-catalogo.cjs. Não editar manualmente.\nPlataforma.registrarCatalogo(' + JSON.stringify({ licoes: catalogo, definicoes }) + ');\n';
const target = path.join(root, 'data/catalogo.js');
if (process.argv.includes('--check')) {
  if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== output) {
    console.error('Catálogo desatualizado. Execute npm run catalogo.'); process.exit(1);
  }
} else fs.writeFileSync(target, output);
console.log('Catálogo: ' + catalogo.filter(l => l.disponivel).length + ' lições publicadas / ' + catalogo.length + ' registros.');
