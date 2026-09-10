const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const APP = path.join(RAIZ, 'app');
const RELATORIO_JSON = path.join(__dirname, 'relatorio-simbolos.json');

let manifesto = null;
const trilhas = {};
const licoes = {};
let registro = { simbolos: {} };

global.Plataforma = {
  registrarManifesto(m) { manifesto = m; },
  registrarTrilha(t) { trilhas[t.id] = t; },
  registrarLicao(l) { licoes[l.id] = l; },
  registrarConceitos() {},
  registrarRegistroConceitos() {},
  registrarHabilidades() {},
  registrarCertificacoes() {},
  registrarProjetos() {},
  registrarEntrevistas() {},
  registrarNivelamento() {},
  registrarLexicoIngles() {},
  registrarSimbolosCodigo(r) { registro = r; }
};

function carregar(rel) {
  const abs = path.resolve(APP, rel);
  if (!fs.existsSync(abs)) { console.error('Arquivo não encontrado: ' + rel); process.exit(1); }
  delete require.cache[require.resolve(abs)];
  require(abs);
}

carregar('../data/manifest.js');
carregar('../data/simbolos-codigo.js');

const GRUPO_TRILHA = {
  sql: 'sql',
  csharp: 'csharp',
  linq: 'linq',
  ef: 'entity-framework',
  aspnet: 'aspnet',
  terminal: 'terminal'
};

const DEPENDENCIAS = {
  sql: ['sql'],
  csharp: ['csharp', 'logica', 'terminal', 'sql'],
  logica: ['logica'],
  terminal: ['terminal'],
  ingles: [],
  linq: ['linq', 'csharp', 'sql'],
  'entity-framework': ['ef', 'linq', 'csharp', 'sql'],
  aspnet: ['aspnet', 'ef', 'linq', 'csharp', 'sql'],
  git: ['git', 'terminal'],
  docker: ['terminal'],
  padrao: ['sql', 'csharp', 'linq', 'ef', 'aspnet', 'terminal']
};

const ordemTrilhas = [];
(manifesto.fases || []).forEach(function (f) {
  (f.trilhas || []).forEach(function (id) { ordemTrilhas.push(id); });
});
(manifesto.trilhas || []).forEach(function (t) {
  if (ordemTrilhas.indexOf(t.id) === -1) ordemTrilhas.push(t.id);
});

(manifesto.trilhas || []).forEach(function (t) {
  carregar(t.arquivo);
  (t.licoes || []).forEach(carregar);
});

const posicoesLicao = {};
let contador = 0;
ordemTrilhas.forEach(function (tid) {
  const t = trilhas[tid];
  if (!t) return;
  (t.niveis || []).forEach(function (nivel) {
    (nivel.etapas || []).forEach(function (etapa) {
      if (!etapa.licao) return;
      contador += 1;
      posicoesLicao[etapa.licao] = { trilha: tid, pos: contador };
    });
  });
});

const erros = [];

function textoDeCampo(valor, destino, profundidade) {
  profundidade = profundidade || 0;
  if (valor == null || profundidade > 5) return;
  if (typeof valor === 'string') { destino.push(valor); return; }
  if (typeof valor !== 'object') return;
  if (Array.isArray(valor)) { valor.forEach(function (v) { textoDeCampo(v, destino, profundidade + 1); }); return; }
  Object.keys(valor).forEach(function (k) { textoDeCampo(valor[k], destino, profundidade + 1); });
}

function contem(texto, simbolo) {
  const alvo = simbolo.toLowerCase();
  const minusculo = texto.toLowerCase();
  if (/^[a-z0-9_]+$/.test(alvo)) {
    const escapado = alvo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('(^|[^a-z0-9_])' + escapado + '([^a-z0-9_]|$)').test(minusculo);
  }
  return minusculo.indexOf(alvo) !== -1;
}

function contemNatural(texto, simbolo, grupo) {
  const alvo = simbolo.toLowerCase();
  if (grupo === 'sql' && /^[a-z]+$/.test(alvo)) {
    const escapado = simbolo.toUpperCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('(^|[^A-Z])' + escapado + '([^A-Z]|$)').test(texto);
  }
  return contem(texto, simbolo);
}

function gruposPermitidos(trilha) {
  const grupos = DEPENDENCIAS[trilha] || DEPENDENCIAS.padrao;
  return new Set(grupos);
}

Object.keys(posicoesLicao).forEach(function (licaoId) {
  const info = posicoesLicao[licaoId];
  const licao = licoes[licaoId];
  if (!licao) return;
  const permitidos = gruposPermitidos(info.trilha);
  const simbolos = Object.keys(registro.simbolos).filter(function (chave) {
    const grupo = chave.split(':')[0];
    return permitidos.has(grupo);
  });
  if (!simbolos.length) return;

  (licao.etapas || []).forEach(function (etapa, i) {
    const campos = [];
    const onde = { licao: licaoId, trilha: info.trilha, etapa: i + 1 };
    if (etapa.tipo === 'conteudo') {
      (etapa.blocos || []).forEach(function (bloco) {
        if (bloco && bloco.tipo === 'codigo' && bloco.codigo) campos.push({ campo: 'bloco.codigo', texto: String(bloco.codigo), natural: false });
      });
    } else if (etapa.tipo === 'atividade') {
      const atv = etapa.atividade || {};
      onde.atividade = atv.id;
      ['codigo', 'esqueleto', 'respostasAceitas', 'blocos', 'lacunas', 'trecho', 'diff', 'antes', 'depois', 'opcoes', 'afirmacoes', 'cena'].forEach(function (k) {
        if (atv[k] == null) return;
        const destino = [];
        textoDeCampo(atv[k], destino);
        if (destino.length) campos.push({ campo: k, texto: destino.join('\n'), natural: false });
      });
      ['enunciado', 'dicas', 'explicacao', 'feedbackErro', 'socratico', 'titulo', 'texto'].forEach(function (k) {
        if (atv[k] == null) return;
        const destino = [];
        textoDeCampo(atv[k], destino);
        if (destino.length) campos.push({ campo: k, texto: destino.join('\n').replace(/\*\*/g, ''), natural: true });
      });
    }
    campos.forEach(function (campoInfo) {
      simbolos.forEach(function (chave) {
        const infoSimbolo = registro.simbolos[chave];
        const simbolo = chave.split(':').slice(1).join(':');
        if (campoInfo.natural && simbolo.replace(/[a-z0-9_.]/gi, '').length > 0 && simbolo.length === 1) return;
        const grupo = chave.split(':')[0];
        const encontrado = campoInfo.natural ? contemNatural(campoInfo.texto, simbolo, grupo) : contem(campoInfo.texto, simbolo);
        if (!encontrado) return;
        const posIntro = posicoesLicao[infoSimbolo.licao];
        if (!posIntro) {
          erros.push(Object.assign({ simbolo: chave, nome: infoSimbolo.nome, motivo: 'lição de introdução inexistente: ' + infoSimbolo.licao }, onde));
          return;
        }
        if (posIntro.pos > info.pos) {
          erros.push(Object.assign({
            campo: campoInfo.campo,
            simbolo: chave,
            nome: infoSimbolo.nome,
            introducao: infoSimbolo.licao,
            trecho: campoInfo.texto.slice(0, 120)
          }, onde));
        }
      });
    });
  });
});

const resumo = {
  geradoEm: new Date().toISOString(),
  licoesPercorridas: Object.keys(posicoesLicao).length,
  simbolosRegistrados: Object.keys(registro.simbolos).length,
  erros: erros.length,
  detalhes: erros
};
fs.writeFileSync(RELATORIO_JSON, JSON.stringify(resumo, null, 2));

console.log('Linter de símbolos — lições: ' + resumo.licoesPercorridas + ' | símbolos registrados: ' + resumo.simbolosRegistrados);
console.log('Problemas: ' + erros.length);
if (erros.length) {
  erros.forEach(function (e) {
    console.log('  ' + e.licao + ' etapa ' + e.etapa + (e.atividade ? ' [' + e.atividade + ']' : '') + ' ' + e.campo + ': ' + e.nome + ' (' + e.simbolo + ') — introduzido em ' + e.introducao);
  });
}
console.log('\nRelatório: ferramentas/relatorio-simbolos.json');
process.exit(erros.length ? 1 : 0);
