// Inventário reproduzível: distingue material publicado de registros vazios.
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const tracks = {}, lessons = {};
let manifest;
const P = { registrarManifesto: m => manifest = m, registrarTrilha: t => tracks[t.id] = t, registrarLicao: l => lessons[l.id] = l };
const ctx = vm.createContext({ Plataforma: P });
function load(file) { vm.runInContext(fs.readFileSync(path.resolve(root, 'app', file), 'utf8'), ctx, { filename: file }); }
load('../data/manifest.js');
for (const t of manifest.trilhas) { load(t.arquivo); t.licoes.forEach(load); }
const rows = manifest.trilhas.map(t => {
  const all = Object.values(lessons).filter(l => l.trilha === t.id);
  const published = all.filter(l => l.etapas?.length);
  const activities = published.flatMap(l => l.etapas.filter(e => e.tipo === 'atividade').map(e => e.atividade));
  return { id: t.id, nome: tracks[t.id].nome, publicadas: published.length, planejadas: all.length - published.length,
    atividades: activities.length, decisoesComJustificativa: activities.filter(a => a.justificativa).length,
    explicacoesLivres: activities.filter(a => a.tipo === 'explain').length,
    escritaOuPreenchimento: activities.filter(a => ['write-code', 'fill-code'].includes(a.tipo)).length,
    prerequisitos: tracks[t.id].prerequisitos || [] };
});
const report = { trilhas: rows.length, publicadas: rows.reduce((n, t) => n + t.publicadas, 0), planejadas: rows.reduce((n, t) => n + t.planejadas, 0), inventario: rows };
fs.writeFileSync(path.join(root, 'ferramentas/inventario-curricular.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
