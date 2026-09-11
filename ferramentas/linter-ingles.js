const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const APP = path.join(RAIZ, 'app');
const RELATORIO_JSON = path.join(__dirname, 'relatorio-ingles.json');
const MATRIZ_JSON = path.join(__dirname, 'matriz-ingles.json');

let manifesto = null;
const trilhas = {};
const licoes = {};
let lexicoConfig = { nomesProprios: [], expressoes: [], contracoes: {}, palavrasPortuguesas: [], expressoesPortuguesas: [] };

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
  registrarLexicoIngles(config) { lexicoConfig = Object.assign(lexicoConfig, config || {}); }
};

function carregar(rel) {
  const abs = path.resolve(APP, rel);
  if (!fs.existsSync(abs)) { console.error('Arquivo não encontrado: ' + rel); process.exit(1); }
  delete require.cache[require.resolve(abs)];
  require(abs);
}

carregar('../data/manifest.js');
carregar('../data/ingles-lexico.js');

const NOMES = new Set((lexicoConfig.nomesProprios || []).map(function (n) { return n.toLowerCase(); }));
const IDENTIFICADORES = new Set((lexicoConfig.identificadores || []).map(function (n) { return n.toLowerCase(); }));
const CONTRACOES = lexicoConfig.contracoes || {};
const PT_WORDS = new Set((lexicoConfig.palavrasPortuguesas || []).map(function (p) { return p.toLowerCase(); }));
const PT_EXPRESSOES = lexicoConfig.expressoesPortuguesas || [];

const EN_HINTS = new Set(['the', 'a', 'an', 'is', 'are', 'am', 'was', 'were', 'my', 'your', 'his', 'her',
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'this', 'that', 'what', 'where', 'when', 'who', 'how',
  'why', 'to', 'and', 'or', 'not', 'no', 'yes', 'do', 'does', 'can', 'have', 'has', 'from', 'in', 'on',
  'at', 'good', 'fine', 'please', 'thank', 'thanks', 'hello', 'hi', 'sorry']);

const ACENTOS = /[ãõçáéíóúâêôàü]/i;

function semAcento(s) {
  return String(s == null ? '' : s).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function normalizarToken(t) {
  return String(t || '').toLowerCase().replace(/[’‘`´]/g, "'").replace(/^'+|'+$/g, '');
}

function expandir(token) {
  const t = normalizarToken(token);
  const partes = [t];
  if (CONTRACOES[t]) {
    CONTRACOES[t].split(' ').forEach(function (p) { partes.push(p); });
  }
  if (t.length > 3 && t.slice(-2) === "'s") {
    partes.push(t.slice(0, -2));
  } else if (t.length > 2 && t.slice(-1) === "'") {
    partes.push(t.slice(0, -1));
  }
  return partes;
}

const lexico = new Set();
const lexicoLicao = {};
const LIMITE_NOVAS_POR_ETAPA = 3;
const LIMITE_PALAVRAS_NOVAS_ETAPA = 6;
const introducoesVocabulario = [];

function tokensDoItem(item) {
  if (!item) return [];
  const texto = typeof item === 'string' ? item : (item.en || '');
  if (!texto) return [];
  const tokens = [];
  (String(texto).match(/[A-Za-zÀ-ÿ]+(?:['’][A-Za-zÀ-ÿ]+)*/g) || []).forEach(function (bruto) {
    expandir(bruto).forEach(function (tok) {
      if (tok && !/^[0-9]+$/.test(tok)) tokens.push(tok);
    });
  });
  return tokens;
}

function registrarItem(item, licao) {
  tokensDoItem(item).forEach(function (tok) {
    if (!lexico.has(tok)) {
      lexico.add(tok);
      if (!lexicoLicao[tok]) lexicoLicao[tok] = licao;
    }
  });
}

function registrarTermoVocab(item, licao, registro) {
  if (registro) {
    const novos = tokensDoItem(item).filter(function (tok) { return !tokenConhecido(tok); });
    if (novos.length) {
      registro.termos += 1;
      novos.forEach(function (tok) { registro.palavras.add(tok); });
    }
  }
  registrarItem(item, licao);
}

function registrarPalavrasNovas(item, licao, registro) {
  if (registro) {
    tokensDoItem(item).forEach(function (tok) {
      if (!tokenConhecido(tok)) registro.palavras.add(tok);
    });
  }
  registrarItem(item, licao);
}

function registrarBloco(bloco, licao, registro) {
  if (!bloco || typeof bloco !== 'object') return;
  if (bloco.tipo === 'vocab') {
    (bloco.pares || []).forEach(function (par) { if (Array.isArray(par)) registrarTermoVocab(par[0], licao, registro); });
  } else if (bloco.tipo === 'ingles') {
    registrarItem(bloco.frase, licao);
  } else if (bloco.tipo === 'glossario') {
    (bloco.itens || []).forEach(function (item) { if (Array.isArray(item)) registrarPalavrasNovas(item[0], licao, registro); });
  }
}

function verificarFraseControlada(frase, licao, etapa, campo) {
  if (typeof frase !== 'string' || !frase.trim()) return;
  tokensDe(frase).forEach(function (t) {
    if (t.nome || t.pt) return;
    if (t.tokens.some(tokenConhecido)) return;
    if (t.tokens.every(function (x) { return EN_HINTS.has(x); })) return;
    erros.push({
      campo: campo,
      trecho: frase.slice(0, 160),
      desconhecidas: [t.bruto],
      licao: licao,
      etapa: etapa,
      regra: 'palavra-nova-na-frase',
      msg: 'A palavra "' + t.bruto + '" é usada antes de ser explicada. Ensine-a em um bloco vocab/glossario antes de cobrá-la.'
    });
  });
}

function tokenizar(str) {
  const matches = [];
  const re = /[A-Za-zÀ-ÿ]+(?:['’][A-Za-zÀ-ÿ]+)*/g;
  let m;
  while ((m = re.exec(str)) !== null) {
    matches.push({ bruto: m[0], index: m.index });
  }
  return matches;
}

function tokenEhNomeProprio(bruto) {
  const normal = normalizarToken(bruto);
  if (IDENTIFICADORES.has(normal)) return true;
  if (NOMES.has(normal)) return true;
  return false;
}

function tokenConhecido(tok) {
  if (!tok) return false;
  if (/^[0-9]+$/.test(tok)) return true;
  if (lexico.has(tok)) return true;
  if (tok.length > 3 && tok.slice(-1) === 's' && lexico.has(tok.slice(0, -1))) return true;
  return false;
}

function tokensDe(str) {
  return tokenizar(str).map(function (m) {
    const bruto = m.bruto;
    const tokens = [];
    expandir(bruto).forEach(function (t) { if (t) tokens.push(t); });
    const ehNome = tokenEhNomeProprio(bruto);
    const normal = normalizarToken(bruto);
    const ehPt = PT_WORDS.has(normal) || (ACENTOS.test(bruto) && !EN_HINTS.has(normal));
    return { bruto: normal, tokens: tokens, nome: ehNome, pt: ehPt };
  });
}

function candidatosDoTrecho(trecho, estrito) {
  const itens = tokensDe(trecho);
  const achados = [];
  let run = [];
  function fecharRun() {
    if (!run.length) return;
    const temHint = run.some(function (t) { return t.tokens.some(function (x) { return EN_HINTS.has(x); }); });
    const conhecidos = run.filter(function (t) { return t.tokens.some(tokenConhecido); }).length;
    const deveVerificar = temHint || conhecidos >= 2 || (estrito && run.length === 1) || run.length >= 3;
    if (deveVerificar) {
      run.forEach(function (t) {
        if (t.nome) return;
        if (t.tokens.some(tokenConhecido)) return;
        if (t.bruto.length === 1 && !t.tokens.some(function (x) { return EN_HINTS.has(x); })) return;
        achados.push(t.bruto);
      });
    }
    run = [];
  }
  itens.forEach(function (t) {
    if (t.pt) fecharRun(); else run.push(t);
  });
  fecharRun();
  return unicas(achados);
}

function fragmentosCitados(str) {
  const achados = [];
  const padroes = [/`([^`]+)`/g, /"([^"]+)"/g, /“([^”]+)”/g];
  padroes.forEach(function (re) {
    let m;
    while ((m = re.exec(str)) !== null) achados.push(m[1]);
  });
  return achados;
}

const erros = [];
const primeiroUso = {};

function marcarUso(str, ctx) {
  if (!ctx || !ctx.atividade) return;
  tokenizar(String(str)).forEach(function (m) {
    expandir(m.bruto).forEach(function (tok) {
      if (!tok || !lexico.has(tok)) return;
      if (!primeiroUso[tok]) primeiroUso[tok] = { licao: ctx.licao, atividade: ctx.atividade, etapa: ctx.etapa };
    });
  });
}

function parecePortugues(str) {
  const itens = tokensDe(str);
  if (!itens.length) return false;
  const pt = itens.filter(function (t) { return t.pt; }).length;
  const en = itens.filter(function (t) { return t.tokens.some(function (x) { return EN_HINTS.has(x); }); }).length;
  if (ACENTOS.test(str) && en === 0 && pt >= 1) return true;
  return pt >= 2 && pt / itens.length >= 0.3;
}

function verificarTexto(str, ctx, estrito, apenasCitados) {
  if (typeof str !== 'string' || !str.trim()) return;
  if (!/[A-Za-zÀ-ÿ]/.test(str)) return;
  marcarUso(str, ctx);
  if (!apenasCitados) {
    const desc = candidatosDoTrecho(str, !!estrito);
    if (desc.length) {
      erros.push(Object.assign({ campo: ctx.campo, trecho: str.slice(0, 220), desconhecidas: desc }, ctx));
      return;
    }
  }
  if (!estrito) {
    const citados = fragmentosCitados(str);
    citados.forEach(function (f) {
      const descFrag = candidatosDoTrecho(f, true);
      if (descFrag.length) {
        erros.push(Object.assign({ campo: ctx.campo + (apenasCitados ? ' (citado)' : ' (citado)'), trecho: f.slice(0, 160), desconhecidas: descFrag }, ctx));
      }
    });
  }
}

function unicas(lista) {
  const vistos = {};
  return lista.filter(function (x) { if (vistos[x]) return false; vistos[x] = true; return true; });
}

const CAMPOS_ESTRITOS = new Set(['audio', 'opcoes', 'blocos', 'pares', 'turnos', 'fala', 'lacunas',
  'esqueleto', 'respostasAceitas', 'termo', 'texto', 'titulo', 'afirmacoes', 'codigo', 'frase']);
const CAMPOS_IGNORADOS = new Set(['validar', 'id', 'tipo', 'correta', 'desafio', 'proficiencia',
  'modo', 'placeholder', 'direcao', 'linguagem', 'habilidade', 'dimensao', 'nivel', 'conceitos',
  'resposta', 'min', 'max']);

function verificarValor(valor, campo, ctx, profundidade) {
  profundidade = profundidade || 0;
  if (valor == null || profundidade > 6) return;
  const chave = String(campo).split(/[.[\]]/).filter(Boolean).pop() || '';
  if (typeof valor === 'string') {
    if (CAMPOS_IGNORADOS.has(chave)) return;
    verificarTexto(valor, Object.assign({ campo: campo }, ctx), CAMPOS_ESTRITOS.has(chave));
    return;
  }
  if (typeof valor === 'number' || typeof valor === 'boolean') return;
  if (Array.isArray(valor)) {
    valor.forEach(function (v, i) { verificarValor(v, campo + '[' + i + ']', ctx, profundidade + 1); });
    return;
  }
  if (typeof valor === 'object') {
    Object.keys(valor).forEach(function (k) {
      if (CAMPOS_IGNORADOS.has(k)) return;
      verificarValor(valor[k], campo + '.' + k, ctx, profundidade + 1);
    });
  }
}

function registrarIntroduzVocab(introduz, licao, registro) {
  (introduz || []).forEach(function (item) { registrarTermoVocab(item, licao, registro); });
}

const ordem = [];
(manifesto.fases || []).forEach(function (f) {
  (f.trilhas || []).forEach(function (id) { ordem.push(id); });
});
(manifesto.trilhas || []).forEach(function (t) {
  if (ordem.indexOf(t.id) === -1) ordem.push(t.id);
});

(manifesto.trilhas || []).forEach(function (t) {
  carregar(t.arquivo);
  (t.licoes || []).forEach(carregar);
});

const posicoes = [];
ordem.forEach(function (tid) {
  const t = trilhas[tid];
  if (!t) return;
  (t.niveis || []).forEach(function (nivel) {
    (nivel.etapas || []).forEach(function (etapa) {
      if (etapa.licao && licoes[etapa.licao]) {
        posicoes.push({ trilha: tid, nivel: nivel.id || nivel.nome, etapa: etapa, licao: licoes[etapa.licao] });
      }
    });
  });
});

let etapasPercorridas = 0;
let atividadesPercorridas = 0;

const CAMPOS_NATURAIS = ['enunciado', 'dicas', 'explicacao', 'feedbackErro', 'socratico', 'audio', 'texto', 'titulo', 'cena'];

function coletarSimples(valor, destino, profundidade) {
  profundidade = profundidade || 0;
  if (valor == null || profundidade > 4) return;
  if (typeof valor === 'string') { destino.push(valor); return; }
  if (typeof valor !== 'object') return;
  if (Array.isArray(valor)) { valor.forEach(function (v) { coletarSimples(v, destino, profundidade + 1); }); return; }
  Object.keys(valor).forEach(function (k) { coletarSimples(valor[k], destino, profundidade + 1); });
}

function pareceIngles(str) {
  const todos = tokensDe(str);
  if (!todos.length) return false;
  const uteis = todos.filter(function (t) { return !t.pt && !t.nome; });
  if (!uteis.length) return false;
  const pt = todos.filter(function (t) { return t.pt; }).length;
  const hints = uteis.filter(function (t) { return t.tokens.some(function (x) { return EN_HINTS.has(x); }); }).length;
  const conhecidos = uteis.filter(function (t) { return t.tokens.some(tokenConhecido); }).length;
  if (pt / todos.length >= 0.5) return false;
  return hints >= 1 || conhecidos >= 2;
}

function verificarAtividadeNatural(atv, ctx) {
  CAMPOS_NATURAIS.forEach(function (k) {
    if (atv[k] == null) return;
    const destino = [];
    coletarSimples(atv[k], destino);
    destino.forEach(function (s) {
      const ingles = k === 'audio' || pareceIngles(s);
      verificarTexto(s, Object.assign({ campo: k }, ctx), k === 'audio', !ingles);
    });
  });
}

posicoes.forEach(function (p) {
  const licao = p.licao;
  if (!licao) return;
  const completo = p.trilha === 'ingles';
  (licao.etapas || []).forEach(function (etapa, i) {
    etapasPercorridas += 1;
    const ctxBase = { trilha: p.trilha, licao: licao.id, nivel: p.nivel, etapa: i + 1 };
    if (etapa.tipo === 'conteudo') {
      const novasDaEtapa = { termos: 0, palavras: new Set() };
      const registroNovas = novasDaEtapa;
      (etapa.blocos || []).forEach(function (bloco) {
        if (!completo && bloco && bloco.tipo === 'ingles') {
          verificarFraseControlada(bloco.frase, licao.id, i + 1, 'bloco.ingles.frase');
        }
        registrarBloco(bloco, licao.id, registroNovas);
      });
      registrarIntroduzVocab(etapa.introduzVocab, licao.id, registroNovas);
      if (novasDaEtapa.termos > LIMITE_NOVAS_POR_ETAPA) {
        erros.push({
          campo: 'vocab',
          trecho: Array.from(novasDaEtapa.palavras).join(', '),
          desconhecidas: Array.from(novasDaEtapa.palavras),
          licao: licao.id,
          etapa: i + 1,
          regra: 'limite-vocabulario-etapa',
          msg: 'Etapa introduz ' + novasDaEtapa.termos + ' termos novos de inglês (máximo ' + LIMITE_NOVAS_POR_ETAPA + '): divida em etapas menores.'
        });
      }
      if (completo && novasDaEtapa.palavras.size > LIMITE_PALAVRAS_NOVAS_ETAPA) {
        erros.push({
          campo: 'vocab',
          trecho: Array.from(novasDaEtapa.palavras).join(', '),
          desconhecidas: Array.from(novasDaEtapa.palavras),
          licao: licao.id,
          etapa: i + 1,
          regra: 'limite-palavras-novas-etapa',
          msg: 'Etapa introduz ' + novasDaEtapa.palavras.size + ' palavras novas de inglês (máximo ' + LIMITE_PALAVRAS_NOVAS_ETAPA + ') contando glossario e vocab: divida em etapas menores.'
        });
      }
      if (novasDaEtapa.termos > 0 || novasDaEtapa.palavras.size > 0) {
        introducoesVocabulario.push({ licao: licao.id, etapa: i + 1, termos: novasDaEtapa.termos, palavras: Array.from(novasDaEtapa.palavras) });
      }
      if (!completo) return;
      (etapa.blocos || []).forEach(function (bloco) {
        if (!bloco) return;
        if (bloco.tipo === 'ingles') {
          verificarFraseControlada(bloco.frase, licao.id, i + 1, 'bloco.ingles.frase');
          return;
        }
        if (bloco.tipo === 'vocab' || bloco.tipo === 'glossario') return;
        if (bloco.tipo === 'codigo') {
          verificarTexto(bloco.codigo, Object.assign({ campo: 'bloco.codigo' }, ctxBase), true);
          return;
        }
        ['texto', 'titulo', 'nota', 'destaque'].forEach(function (campo) {
          if (typeof bloco[campo] === 'string') verificarTexto(bloco[campo], Object.assign({ campo: 'bloco.' + campo }, ctxBase), false);
        });
        (bloco.itens || []).forEach(function (item, j) {
          if (typeof item === 'string') verificarTexto(item, Object.assign({ campo: 'bloco.itens[' + j + ']' }, ctxBase), false);
          else if (Array.isArray(item)) item.forEach(function (sub, k) {
            if (typeof sub === 'string') verificarTexto(sub, Object.assign({ campo: 'bloco.itens[' + j + '][' + k + ']' }, ctxBase), false);
          });
        });
        (bloco.pares || []).forEach(function (par, j) {
          if (Array.isArray(par) && typeof par[1] === 'string') verificarTexto(par[1], Object.assign({ campo: 'bloco.pares[' + j + '][1]' }, ctxBase), false);
        });
      });
    } else if (etapa.tipo === 'atividade') {
      atividadesPercorridas += 1;
      const atv = etapa.atividade || {};
      const ctx = Object.assign({ atividade: atv.id || '?' }, ctxBase);
      if (!completo) {
        verificarAtividadeNatural(atv, ctx);
        if ((atv.conceitos || []).some(function (c) { return /\.ingles$/.test(c); })
          && typeof atv.enunciado === 'string' && pareceIngles(atv.enunciado)) {
          verificarFraseControlada(atv.enunciado, licao.id, i + 1, 'enunciado');
        }
        return;
      }
      Object.keys(atv).forEach(function (campo) {
        if (campo === 'id' || campo === 'tipo' || campo === 'validar' || campo === 'conceitos' || campo === 'habilidade' || campo === 'dimensao' || campo === 'nivel') return;
        verificarValor(atv[campo], campo, ctx, 0);
      });
    }
  });
});

const resumo = {
  geradoEm: new Date().toISOString(),
  licoesPercorridas: posicoes.length,
  etapasPercorridas: etapasPercorridas,
  atividadesPercorridas: atividadesPercorridas,
  palavrasNoLexico: lexico.size,
  limiteNovasPorEtapa: LIMITE_NOVAS_POR_ETAPA,
  limitePalavrasNovasPorEtapaIngles: LIMITE_PALAVRAS_NOVAS_ETAPA,
  introducoesDeVocabulario: introducoesVocabulario,
  erros: erros.length,
  detalhes: erros
};

fs.writeFileSync(RELATORIO_JSON, JSON.stringify(resumo, null, 2));

const matriz = {
  geradoEm: resumo.geradoEm,
  regra: 'Cada palavra entra no léxico na lição em que é ensinada (blocos vocab/ingles/glossario/introduzVocab) e o linter garante que nenhuma atividade a use antes disso, inclusive em distratores, áudio e feedback. Em todas as trilhas, cada etapa ensina no máximo ' + LIMITE_NOVAS_POR_ETAPA + ' termos novos; na trilha de inglês, no máximo ' + LIMITE_PALAVRAS_NOVAS_ETAPA + ' palavras novas por etapa, e as frases de exemplo (bloco ingles) só usam palavras já explicadas.',
  limiteNovasPorEtapa: LIMITE_NOVAS_POR_ETAPA,
  limitePalavrasNovasPorEtapaIngles: LIMITE_PALAVRAS_NOVAS_ETAPA,
  introducoesDeVocabulario: introducoesVocabulario,
  palavras: Array.from(lexico).sort().map(function (tok) {
    return {
      palavra: tok,
      introduzidaEm: lexicoLicao[tok] || null,
      primeiroUsoEmAtividade: primeiroUso[tok] || null
    };
  })
};
fs.writeFileSync(MATRIZ_JSON, JSON.stringify(matriz, null, 2));

console.log('Linter de inglês — lições: ' + posicoes.length + ' | etapas: ' + etapasPercorridas + ' | atividades: ' + atividadesPercorridas);
console.log('Palavras no léxico até o fim do percurso: ' + lexico.size);
console.log('Problemas: ' + erros.length);
if (erros.length) {
  const porLicao = {};
  erros.forEach(function (e) { porLicao[e.licao] = (porLicao[e.licao] || 0) + 1; });
  Object.keys(porLicao).forEach(function (l) { console.log('  - ' + l + ': ' + porLicao[l]); });
  console.log('\nPrimeiros 40 problemas:');
  erros.slice(0, 40).forEach(function (e) {
    console.log('  ' + e.licao + ' etapa ' + e.etapa + (e.atividade ? ' [' + e.atividade + ']' : '') + ' ' + e.campo + ': ' + e.desconhecidas.join(', ') + '  << ' + e.trecho.slice(0, 90));
  });
}
console.log('\nRelatório: ferramentas/relatorio-ingles.json');
process.exit(erros.length ? 1 : 0);
