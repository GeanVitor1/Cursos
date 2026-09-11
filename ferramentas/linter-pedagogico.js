const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const APP = path.join(RAIZ, 'app');
const RELATORIO_JSON = path.join(__dirname, 'relatorio-pedagogico.json');
const MATRIZ_JSON = path.join(__dirname, 'matriz-pedagogica.json');
const RELATORIO_MD = path.join(RAIZ, 'AUDITORIA_SEQUENCIAL.md');
const MANUAL = '<!-- MANUAL -->';

let manifesto = null;
const trilhas = {};
const licoes = {};
const conceitos = {};
let registro = { conceitos: {} };
let termosPortugues = { termos: {} };

global.Plataforma = {
  registrarManifesto(m) { manifesto = m; },
  registrarTrilha(t) { trilhas[t.id] = t; },
  registrarLicao(l) { licoes[l.id] = l; },
  registrarConceitos(mapa) { Object.assign(conceitos, mapa); },
  registrarRegistroConceitos(mapa) { registro = mapa; },
  registrarTermosPortugues(mapa) { termosPortugues = mapa || { termos: {} }; },
  registrarHabilidades() {},
  registrarCertificacoes() {},
  registrarProjetos() {},
  registrarEntrevistas() {}
};

function erro(msg, onde, extra) {
  erros.push(Object.assign({ tipo: 'erro', msg: msg, onde: onde }, extra || {}));
}
function aviso(msg, onde, extra) {
  erros.push(Object.assign({ tipo: 'aviso', msg: msg, onde: onde }, extra || {}));
}

const erros = [];
const LIMITE_CONCEITOS_POR_ETAPA = 2;
const LIMITE_TERMOS_GLOSSARIO_POR_ETAPA = 5;
const TRILHAS_PROGRAMACAO = new Set(['sql', 'csharp', 'logica', 'terminal', 'linq', 'entity-framework', 'aspnet']);

function carregar(rel) {
  const abs = path.resolve(APP, rel);
  if (!fs.existsSync(abs)) { erro('Arquivo não encontrado: ' + rel, 'projeto'); return; }
  delete require.cache[require.resolve(abs)];
  require(abs);
}

carregar('../data/manifest.js');
carregar('../data/conceitos.js');
carregar('../data/conceitos-registry.js');
carregar('../data/termos-portugues.js');
(manifesto && manifesto.trilhas || []).forEach(function (t) {
  carregar(t.arquivo);
  (t.licoes || []).forEach(carregar);
});

const SKIP = new Set(['id', 'tipo', 'trilha', 'licao', 'conceitos', 'dimensao', 'correta', 'desafio',
  'xp', 'duracao', 'duracaoMin', 'tom', 'linguagem', 'nivel', 'nivelNome', 'prerequisitos', 'min',
  'fase', 'sigla', 'curto', 'status', 'transversal', 'observacao', 'rotulo', 'dificuldade', 'peso',
  'exemploLicao', 'introduz', 'pratica', 'avaliacao']);

function norm(s) {
  return String(s == null ? '' : s)
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

function coletarStrings(valor, destino) {
  if (valor == null) return;
  if (typeof valor === 'string') { destino.push(valor); return; }
  if (typeof valor === 'number' || typeof valor === 'boolean') return;
  if (Array.isArray(valor)) {
    valor.forEach(function (v) { coletarStrings(v, destino); });
    return;
  }
  if (typeof valor === 'object') {
    Object.keys(valor).forEach(function (k) {
      if (SKIP.has(k)) return;
      coletarStrings(valor[k], destino);
    });
  }
}

function contemTermo(texto, termo) {
  const bruto = String(texto == null ? '' : texto);
  const escapado = termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (/[A-Z]/.test(termo)) {
    return new RegExp('(^|[^A-Za-z0-9])' + escapado + '([^A-Za-z0-9]|$)').test(bruto);
  }
  const t = norm(bruto);
  const alvo = norm(termo);
  if (!alvo) return false;
  if (/^[a-z0-9]+$/.test(alvo)) {
    return new RegExp('(^|[^a-z0-9])' + alvo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-z0-9]|$)').test(t);
  }
  return t.indexOf(alvo) !== -1;
}

function termosDoConceito(id) {
  const info = registro.conceitos[id] || {};
  const lista = [];
  if (conceitos[id]) lista.push(conceitos[id]);
  (info.termos || []).forEach(function (t) { lista.push(t); });
  return lista;
}

const conhecidos = {};
const introduzidoEm = {};
const praticadoEm = {};
const avaliadoEm = {};
const praticasPorConceito = {};
const dimensoesPorConceito = {};
const matrizAtividades = [];
const matrizEnsino = [];
const primeiraUso = {};
let contadorPosicoes = 0;

manifesto = manifesto || { fases: [], trilhas: [] };
const ordemTrilhas = [];
(manifesto.fases || []).forEach(function (f) {
  (f.trilhas || []).forEach(function (id) { ordemTrilhas.push(id); });
});
(manifesto.trilhas || []).forEach(function (t) {
  if (ordemTrilhas.indexOf(t.id) === -1) ordemTrilhas.push(t.id);
});

const etapasTotal = [];
const posicoes = [];
ordemTrilhas.forEach(function (tid) {
  const t = trilhas[tid];
  if (!t) return;
  (t.niveis || []).forEach(function (nivel) {
    (nivel.etapas || []).forEach(function (etapa, iNivel) {
      etapasTotal.push({ trilha: tid, nivel: nivel.nome, etapa: etapa, indice: iNivel });
      if (etapa.licao) {
        const licao = licoes[etapa.licao];
        if (!licao) { erro('Etapa aponta para lição inexistente: ' + etapa.licao, tid); return; }
        posicoes.push({ trilha: tid, etapa: etapa, licao: licao });
      }
    });
  });
});

const licoesReferenciadas = {};
const ordemLicao = {};
posicoes.forEach(function (p, indice) {
  if (licoesReferenciadas[p.licao.id]) erro('Lição referenciada mais de uma vez: ' + p.licao.id, p.trilha);
  licoesReferenciadas[p.licao.id] = true;
  ordemLicao[p.licao.id] = indice;
});
Object.keys(licoes).forEach(function (id) {
  if (!licoesReferenciadas[id]) aviso('Lição carregada mas não usada em nenhuma trilha: ' + id, 'projeto');
});

function marcarIntroducao(id, onde, extra) {
  if (!conceitos[id]) {
    erro('Conceito não registrado em data/conceitos.js: ' + id, onde, extra);
    return;
  }
  if (conhecidos[id]) return;
  const info = registro.conceitos[id] || {};
  (info.prerequisitos || []).forEach(function (pre) {
    if (!conhecidos[pre]) {
      erro('Pré-requisito conceitual não introduzido antes: ' + pre + ' (para ' + id + ')', onde, {
        conceito: id, prerequisito: pre, arquivo: extra && extra.arquivo
      });
    }
  });
  conhecidos[id] = true;
  introduzidoEm[id] = onde;
  if (extra && extra.novos && extra.novos.indexOf(id) === -1) extra.novos.push(id);
  if (extra && extra.licao && extra.novosLicao && extra.novosLicao.indexOf(id) === -1) extra.novosLicao.push(id);
}

function verificarUso(ids, texto, onde, ehAtividade, arquivo) {
  ids.forEach(function (id) {
    if (conhecidos[id]) return;
    const info = registro.conceitos[id] || {};
    const deferido = (info.deferidoEm || []).indexOf(onde.licao) !== -1;
    const registroErro = {
      conceito: id, onde: onde, texto: String(texto).slice(0, 120), arquivo: arquivo
    };
    if (ehAtividade) {
      primeiroErro(id, onde, arquivo);
      erro('Uso antes de ensinar (atividade): ' + id + ' -> "' + String(texto).slice(0, 60) + '"', onde, registroErro);
    } else if (!deferido) {
      primeiroErro(id, onde, arquivo);
      aviso('Menção antes de ensinar (conteúdo): ' + id + ' -> "' + String(texto).slice(0, 60) + '"', onde, registroErro);
    }
  });
}

function primeiroErro(id, onde, arquivo) {
  if (!primeiraUso[id]) primeiraUso[id] = { onde: onde, arquivo: arquivo };
}

function escanear(valor, onde, ehAtividade, arquivo) {
  const textos = [];
  coletarStrings(valor, textos);
  const juntos = textos.join('\n');
  Object.keys(registro.conceitos).forEach(function (id) {
    if (conhecidos[id]) return;
    const info = registro.conceitos[id];
    if (!info.termos || !info.termos.length) return;
    if (info.termos.some(function (t) { return contemTermo(juntos, t); })) {
      verificarUso([id], info.termos[0], onde, ehAtividade, arquivo);
    }
  });
}

function escanearTermos(valor, onde, ehAtividade, arquivo, indiceAtual) {
  const termos = termosPortugues.termos || {};
  const chaves = Object.keys(termos);
  if (!chaves.length) return;
  const textos = [];
  coletarStrings(valor, textos);
  const juntos = textos.join('\n');
  chaves.forEach(function (termo) {
    const info = termos[termo];
    if (info.licao) {
      const idx = ordemLicao[info.licao];
      if (idx === undefined) {
        erro('Termo aponta para lição inexistente: ' + termo + ' -> ' + info.licao, onde, { termo: termo, arquivo: arquivo });
        return;
      }
      if (idx <= indiceAtual) return;
    }
    if (!contemTermo(juntos, termo)) return;
    const extra = { termo: termo, nome: info.nome || termo, introducao: info.licao || 'nunca', arquivo: arquivo };
    if (ehAtividade) {
      erro('Termo antes de ensinar (atividade): ' + termo + ' -> "' + String(juntos).slice(0, 60) + '"', onde, extra);
    } else {
      aviso('Termo antes de ensinar (conteúdo): ' + termo + ' -> "' + String(juntos).slice(0, 60) + '"', onde, extra);
    }
  });
}

function posicaoLegivel(p, indiceEtapa) {
  return p.trilha + ' / ' + p.licao.id + ' / etapa ' + (indiceEtapa + 1);
}

posicoes.forEach(function (p, indiceLicao) {
  const licao = p.licao;
  const arquivo = 'trilhas/' + p.trilha + '/licoes/' + licao.id + '.js';
  const ehProva = licao.tipo === 'prova';
  const novosDaLicao = [];
  (licao.etapas || []).forEach(function (etapa, indiceEtapa) {
    contadorPosicoes += 1;
    const onde = { trilha: p.trilha, licao: licao.id, etapa: indiceEtapa + 1, titulo: etapa.titulo || '', pos: contadorPosicoes };
    const novosDaEtapa = [];
    const extraIntro = { arquivo: arquivo, novos: novosDaEtapa, licao: licao.id, novosLicao: novosDaLicao };
    if (etapa.introduz) {
      (etapa.introduz || []).forEach(function (id) { marcarIntroducao(id, onde, extraIntro); });
      if ((etapa.introduz || []).length) {
        matrizEnsino.push({ licao: licao.id, trilha: p.trilha, etapa: indiceEtapa + 1, ensina: etapa.introduz.slice() });
      }
    }
    if (etapa.tipo === 'conteudo') {
      (etapa.blocos || []).forEach(function (bloco) {
        if (bloco && bloco.tipo === 'conceito') {
          marcarIntroducao(bloco.id, onde, extraIntro);
          matrizEnsino.push({ licao: licao.id, trilha: p.trilha, etapa: indiceEtapa + 1, ensina: [bloco.id] });
        }
      });
      if (novosDaEtapa.length > LIMITE_CONCEITOS_POR_ETAPA) {
        erro('Etapa introduz ' + novosDaEtapa.length + ' conceitos novos (máximo ' + LIMITE_CONCEITOS_POR_ETAPA + '): ' + novosDaEtapa.join(', '), onde, {
          conceitos: novosDaEtapa.slice(), arquivo: arquivo,
          sugestao: 'Divida a etapa em etapas menores, com prática entre elas'
        });
      }
      const termosGlossario = [];
      (etapa.blocos || []).forEach(function (bloco) {
        if (!bloco || bloco.tipo !== 'glossario') return;
        (bloco.itens || []).forEach(function (item) {
          if (!Array.isArray(item)) return;
          const termo = norm(item[0]);
          if (termo && termosGlossario.indexOf(termo) === -1) termosGlossario.push(termo);
        });
      });
      if (TRILHAS_PROGRAMACAO.has(p.trilha) && termosGlossario.length > LIMITE_TERMOS_GLOSSARIO_POR_ETAPA) {
        erro('Etapa apresenta ' + termosGlossario.length + ' termos no glossário (máximo ' + LIMITE_TERMOS_GLOSSARIO_POR_ETAPA + '): ' + termosGlossario.join(', '), onde, {
          termos: termosGlossario.slice(), arquivo: arquivo,
          sugestao: 'Divida os termos entre etapas menores'
        });
      }
      (etapa.blocos || []).forEach(function (bloco) {
        if (!bloco) return;
        if (bloco.tipo === 'retoma' && bloco.conceito && !conhecidos[bloco.conceito]) {
          erro('Retomada de conceito ainda não ensinado: ' + bloco.conceito, onde, { conceito: bloco.conceito, arquivo: arquivo });
        }
        if (bloco.tipo === 'futuro' && Array.isArray(bloco.conceitos)) {
          bloco.conceitos.forEach(function (id) {
            if (!registro.conceitos[id]) return;
            registro.conceitos[id].deferidoEm = registro.conceitos[id].deferidoEm || [];
            if (registro.conceitos[id].deferidoEm.indexOf(licao.id) === -1) {
              registro.conceitos[id].deferidoEm.push(licao.id);
            }
          });
        }
        escanear(bloco, onde, false, arquivo);
        escanearTermos(bloco, onde, false, arquivo, indiceLicao);
      });
    } else if (etapa.tipo === 'atividade') {
      const atv = etapa.atividade || {};
      if (!conceitos[atv.tipo] && !atv.tipo) return;
      matrizAtividades.push({
        licao: licao.id,
        trilha: p.trilha,
        etapa: indiceEtapa + 1,
        id: atv.id,
        tipo: atv.tipo,
        dimensao: atv.dimensao || null,
        prova: ehProva,
        desafio: !!atv.desafio,
        exige: (atv.conceitos || []).slice()
      });
      (atv.conceitos || []).forEach(function (id) {
        if (!conhecidos[id]) {
          const info = registro.conceitos[id] || {};
          erro('Conceito avaliado antes de ser ensinado: ' + id, onde, {
            conceito: id, arquivo: arquivo,
            intro: introduzidoEm[id] || 'NÃO ENCONTRADA',
            sugestao: 'Introduza o conceito antes desta atividade'
          });
        }
        if (!praticadoEm[id]) {
          if (atv.desafio) {
            erro('Desafio combina conceito que ainda não foi praticado: ' + id, onde, { conceito: id, arquivo: arquivo });
          } else if (ehProva) {
            erro('Prova cobra conceito ainda não praticado: ' + id, onde, { conceito: id, arquivo: arquivo });
          }
        }
      });
      escanear(atv, onde, true, arquivo);
      escanearTermos(atv, onde, true, arquivo, indiceLicao);
      (atv.conceitos || []).forEach(function (id) {
        if (!praticadoEm[id]) praticadoEm[id] = onde;
        if (!ehProva) {
          praticasPorConceito[id] = (praticasPorConceito[id] || 0) + 1;
          if (atv.dimensao) {
            dimensoesPorConceito[id] = dimensoesPorConceito[id] || {};
            dimensoesPorConceito[id][atv.dimensao] = true;
          }
        }
        if (!avaliadoEm[id] && (atv.desafio || ehProva)) avaliadoEm[id] = onde;
      });
    } else {
      erro('Tipo de etapa desconhecido: ' + etapa.tipo, onde, { arquivo: arquivo });
    }
  });
  novosDaLicao.forEach(function (id) {
    const info = registro.conceitos[id] || {};
    if (info.preview) return;
    if (!praticadoEm[id] || praticadoEm[id].licao !== licao.id) {
      erro('Conceito introduzido e não praticado na mesma lição: ' + id, { trilha: p.trilha, licao: licao.id }, {
        conceito: id, arquivo: arquivo,
        sugestao: 'Adicione uma atividade simples que use o conceito antes de terminar a lição'
      });
    }
  });
});

// Conceitos registrados sem introdução em nenhuma lição publicada
Object.keys(conceitos).forEach(function (id) {
  if (!conhecidos[id]) return;
  if (!introduzidoEm[id]) aviso('Conceito usado mas sem marco de introdução: ' + id, 'projeto');
});

const conceitosPublicados = Object.keys(conhecidos);
function estadoDoConceito(id) {
  if (!introduzidoEm[id]) return 'NAO_ENSINADO';
  if (!praticadoEm[id]) return 'INTRODUZIDO';
  const dimensoes = Object.keys(dimensoesPorConceito[id] || {});
  if (dimensoes.length >= 2 || (praticasPorConceito[id] || 0) >= 3) return 'PRONTO_PARA_AVALIACAO';
  return 'PRATICADO';
}
const estadosConteudo = {
  NAO_ENSINADO: 0,
  INTRODUZIDO: 0,
  PRATICADO: 0,
  PRONTO_PARA_AVALIACAO: 0
};
const conceitosMatriz = conceitosPublicados.map(function (id) {
  const estado = estadoDoConceito(id);
  estadosConteudo[estado] += 1;
  return {
    id: id,
    nome: conceitos[id],
    introduzidoEm: introduzidoEm[id] || null,
    praticadoEm: praticadoEm[id] || null,
    avaliadoEm: avaliadoEm[id] || null,
    praticas: praticasPorConceito[id] || 0,
    dimensoes: Object.keys(dimensoesPorConceito[id] || {}),
    estado: estado,
    prerequisitos: (registro.conceitos[id] || {}).prerequisitos || []
  };
});
const resumoRelatorio = {
  geradoEm: new Date().toISOString(),
  trilhas: ordemTrilhas.length,
  licoes: Object.keys(licoes).length,
  etapas: etapasTotal.length,
  atividades: posicoes.reduce(function (soma, p) {
    return soma + (p.licao.etapas || []).filter(function (e) { return e.tipo === 'atividade'; }).length;
  }, 0),
  conceitosRegistrados: Object.keys(conceitos).length,
  conceitosIntroduzidos: conceitosPublicados.length,
  estados: estadosConteudo,
  erros: erros.filter(function (e) { return e.tipo === 'erro'; }),
  avisos: erros.filter(function (e) { return e.tipo === 'aviso'; }),
  conceitos: conceitosMatriz
};

fs.writeFileSync(RELATORIO_JSON, JSON.stringify(resumoRelatorio, null, 2));

const matrizPedagogica = {
  geradoEm: resumoRelatorio.geradoEm,
  regra: 'Estados de conteúdo: NAO_ENSINADO → INTRODUZIDO → PRATICADO → PRONTO_PARA_AVALIACAO. MASTERED é calculado em tempo real pelo motor (confiança + dimensões + revisão espaçada), não pelo conteúdo estático.',
  conceitos: resumoRelatorio.conceitos,
  blocosDeEnsino: matrizEnsino,
  atividades: matrizAtividades
};
fs.writeFileSync(MATRIZ_JSON, JSON.stringify(matrizPedagogica, null, 2));

// ----- Relatório markdown -----
let manual = '';
if (fs.existsSync(RELATORIO_MD)) {
  const atual = fs.readFileSync(RELATORIO_MD, 'utf8');
  const idx = atual.indexOf(MANUAL);
  if (idx !== -1) manual = atual.slice(idx);
}
const linhas = [];
linhas.push('# Auditoria Sequencial — Trilha .NET');
linhas.push('');
linhas.push('> Relatório gerado por `ferramentas/linter-pedagogico.js`. Ele percorre as trilhas na ordem real do aluno e verifica se cada conceito é ensinado antes de ser praticado ou cobrado.');
linhas.push('');
linhas.push('- Trilhas analisadas: **' + resumoRelatorio.trilhas + '**');
linhas.push('- Lições publicadas: **' + resumoRelatorio.licoes + '**');
linhas.push('- Etapas percorridas: **' + resumoRelatorio.etapas + '**');
linhas.push('- Atividades percorridas: **' + resumoRelatorio.atividades + '**');
linhas.push('- Conceitos registrados: **' + resumoRelatorio.conceitosRegistrados + '**');
linhas.push('- Conceitos com introdução marcada: **' + resumoRelatorio.conceitosIntroduzidos + '**');
linhas.push('- Erros: **' + resumoRelatorio.erros.length + '** · Avisos: **' + resumoRelatorio.avisos.length + '**');
linhas.push('');
  linhas.push('## Evidência por conceito (introdução → prática → avaliação)');
  linhas.push('');
  linhas.push('| Conceito | Introdução | Primeira prática | Primeira avaliação | Estado no conteúdo | Pré-requisitos |');
  linhas.push('| --- | --- | --- | --- | --- | --- |');
  resumoRelatorio.conceitos.forEach(function (c) {
    linhas.push('| ' + c.nome + ' (`' + c.id + '`) | ' + (c.introduzidoEm ? 'etapa ' + c.introduzidoEm.etapa + ' · ' + c.introduzidoEm.licao : '—') + ' | ' + (c.praticadoEm ? c.praticadoEm.licao + ' etapa ' + c.praticadoEm.etapa : '—') + ' | ' + (c.avaliadoEm ? c.avaliadoEm.licao + ' etapa ' + c.avaliadoEm.etapa : '—') + ' | ' + c.estado + ' | ' + (c.prerequisitos.join(', ') || '—') + ' |');
  });
linhas.push('');
if (resumoRelatorio.erros.length) {
  linhas.push('## ❌ Erros encontrados');
  linhas.push('');
  resumoRelatorio.erros.forEach(function (e) {
    linhas.push('- **' + (e.onde && e.onde.licao ? e.onde.licao + ' / etapa ' + e.onde.etapa : 'projeto') + '** — ' + e.msg + (e.sugestao ? ' _(' + e.sugestao + ')_' : ''));
  });
  linhas.push('');
}
if (resumoRelatorio.avisos.length) {
  linhas.push('## ⚠️ Avisos (menções antes da introdução)');
  linhas.push('');
  resumoRelatorio.avisos.slice(0, 200).forEach(function (e) {
    linhas.push('- **' + (e.onde && e.onde.licao ? e.onde.licao + ' / etapa ' + e.onde.etapa : 'projeto') + '** — ' + e.msg);
  });
  if (resumoRelatorio.avisos.length > 200) linhas.push('- _(+ ' + (resumoRelatorio.avisos.length - 200) + ' avisos)_');
  linhas.push('');
}
linhas.push(MANUAL);
if (manual) linhas.push(manual.slice(MANUAL.length).trim());
fs.writeFileSync(RELATORIO_MD, linhas.join('\n'));

console.log('Trilhas: ' + resumoRelatorio.trilhas + ' | Lições: ' + resumoRelatorio.licoes + ' | Etapas: ' + resumoRelatorio.etapas + ' | Atividades: ' + resumoRelatorio.atividades);
console.log('Conceitos com introdução marcada: ' + resumoRelatorio.conceitosIntroduzidos + ' de ' + resumoRelatorio.conceitosRegistrados);
console.log('Estados: ' + Object.keys(estadosConteudo).map(function (k) { return k + '=' + estadosConteudo[k]; }).join(' | '));
console.log('Erros: ' + resumoRelatorio.erros.length + ' | Avisos: ' + resumoRelatorio.avisos.length);
if (resumoRelatorio.erros.length) {
  console.log('\n❌ ERROS:');
  resumoRelatorio.erros.slice(0, 100).forEach(function (e) {
    console.log('  - ' + (e.onde && e.onde.licao ? e.onde.licao + ' etapa ' + e.onde.etapa : 'projeto') + ': ' + e.msg);
  });
}
if (resumoRelatorio.avisos.length) {
  console.log('\n⚠️  AVISOS:');
  resumoRelatorio.avisos.slice(0, 60).forEach(function (e) {
    console.log('  - ' + (e.onde && e.onde.licao ? e.onde.licao + ' etapa ' + e.onde.etapa : 'projeto') + ': ' + e.msg);
  });
  if (resumoRelatorio.avisos.length > 60) console.log('  ... e mais ' + (resumoRelatorio.avisos.length - 60));
}
console.log('\nRelatórios: AUDITORIA_SEQUENCIAL.md e ferramentas/relatorio-pedagogico.json');
process.exit(resumoRelatorio.erros.length ? 1 : 0);
