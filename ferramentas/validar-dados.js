const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..');
const APP = path.join(RAIZ, 'app');

const erros = [];
const avisos = [];
const trilhas = {};
const licoes = {};
const conceitos = {};
let manifesto = null;
let certificacoes = [];
let projetos = [];
let entrevistas = [];
let habilidades = null;
let registroConceitos = null;
let nivelamento = null;
let lexicoIngles = null;
let simbolosCodigo = null;
let termosPortugues = null;

function erro(mensagem) { erros.push(mensagem); }
function aviso(mensagem) { avisos.push(mensagem); }

global.Plataforma = {
  registrarManifesto(m) { manifesto = m; },
  registrarTrilha(t) { trilhas[t.id] = t; },
  registrarLicao(l) { licoes[l.id] = l; },
  registrarConceitos(mapa) { Object.assign(conceitos, mapa); },
  registrarCertificacoes(lista) { certificacoes = lista; },
  registrarProjetos(lista) { projetos = lista; },
  registrarEntrevistas(lista) { entrevistas = lista; },
  registrarHabilidades(mapa) { habilidades = mapa; },
  registrarRegistroConceitos(mapa) { registroConceitos = mapa; },
  registrarNivelamento(dados) { nivelamento = dados; },
  registrarLexicoIngles(config) { lexicoIngles = config; },
  registrarSimbolosCodigo(config) { simbolosCodigo = config; },
  registrarTermosPortugues(config) { termosPortugues = config; }
};

function carregar(caminho) {
  const absoluto = path.resolve(APP, caminho);
  if (!fs.existsSync(absoluto)) {
    erro('Arquivo não encontrado: ' + caminho + ' (' + absoluto + ')');
    return false;
  }
  try {
    delete require.cache[require.resolve(absoluto)];
    require(absoluto);
    return true;
  } catch (e) {
    erro('Falha ao executar ' + caminho + ': ' + e.message);
    return false;
  }
}

const TIPOS = ['multiple-choice', 'true-false', 'match-pairs', 'order-blocks', 'fill-code', 'write-code', 'find-error', 'predict-output', 'interpret-code', 'translate', 'reading', 'debug', 'scenario', 'code-review', 'explain', 'visualizer', 'listening', 'choose-image', 'dialogue'];
const DIMENSOES = ['reconhecimento', 'associacao', 'ordenacao', 'preenchimento', 'construcao', 'aplicacao'];
const HABILIDADES = ['vocabulario', 'gramatica', 'listening', 'reading', 'writing', 'compreensao', 'speaking'];
const BLOCOS = ['texto', 'destaque', 'nota', 'lista', 'passos', 'codigo', 'diagrama', 'tabela', 'vocab', 'trabalho', 'glossario', 'ingles', 'conceito', 'retoma', 'futuro'];

function validarConceitos(ids, onde) {
  (ids || []).forEach(function (id) {
    if (!conceitos[id]) erro(onde + ': conceito não registrado em data/conceitos.js -> ' + id);
  });
}

function validarAtividade(atv, onde) {
  if (!atv.id) erro(onde + ': atividade sem id');
  if (!atv.tipo) { erro(onde + ': atividade sem tipo'); return; }
  if (TIPOS.indexOf(atv.tipo) === -1) erro(onde + ': tipo desconhecido -> ' + atv.tipo);
  if (!atv.conceitos || !atv.conceitos.length) aviso(onde + ': atividade sem conceitos (não entra na revisão)');
  validarConceitos(atv.conceitos, onde);
  if (!atv.dicas || !atv.dicas.length) aviso(onde + ': atividade sem dicas');
  if (!atv.explicacao) aviso(onde + ': atividade sem explicação');
  if (atv.dimensao && DIMENSOES.indexOf(atv.dimensao) === -1) erro(onde + ': dimensão desconhecida -> ' + atv.dimensao);
  if (atv.habilidade && HABILIDADES.indexOf(atv.habilidade) === -1) erro(onde + ': habilidade desconhecida -> ' + atv.habilidade);
  if (atv.tipo === 'listening') {
    if (!atv.audio) erro(onde + ': listening sem audio');
    if (atv.modo === 'escrever' && !atv.resposta) erro(onde + ': listening de escrever sem resposta');
    if (atv.modo !== 'escrever' && (!Array.isArray(atv.opcoes) || atv.opcoes.length < 2)) erro(onde + ': listening sem opções');
  }
  if (atv.tipo === 'choose-image' && (!Array.isArray(atv.opcoes) || atv.opcoes.length < 2)) erro(onde + ': choose-image sem opções');
  if (atv.tipo === 'dialogue') {
    if (!Array.isArray(atv.turnos) || atv.turnos.length < 2) erro(onde + ': dialogue com menos de 2 turnos');
    else atv.turnos.forEach(function (turno, i) {
      if (!Array.isArray(turno.opcoes) || turno.opcoes.length < 2) erro(onde + ': turno ' + (i + 1) + ' sem opções');
      else if (typeof turno.correta !== 'number' || turno.correta < 0 || turno.correta >= turno.opcoes.length) erro(onde + ': turno ' + (i + 1) + ' com resposta correta inválida');
    });
  }
  if (atv.socratico && !Array.isArray(atv.socratico)) erro(onde + ': campo socratico deve ser uma lista');
  if (atv.feedbackErro && typeof atv.feedbackErro === 'object') {
    Object.keys(atv.feedbackErro).forEach(function (chave) {
      if (Array.isArray(atv.opcoes) && (isNaN(Number(chave)) || Number(chave) < 0 || Number(chave) >= atv.opcoes.length)) {
        aviso(onde + ': feedbackErro aponta para opção inexistente -> ' + chave);
      }
    });
  }

  if (atv.tipo === 'multiple-choice' || atv.tipo === 'find-error' || atv.tipo === 'interpret-code' || atv.tipo === 'predict-output' || atv.tipo === 'translate' || atv.tipo === 'reading' || atv.tipo === 'debug' || atv.tipo === 'scenario') {
    if (!Array.isArray(atv.opcoes) || atv.opcoes.length < 2) erro(onde + ': opções insuficientes');
    else if (typeof atv.correta !== 'number' || atv.correta < 0 || atv.correta >= atv.opcoes.length) erro(onde + ': índice da resposta correta inválido');
  }
  if (atv.tipo === 'true-false') {
    if (!Array.isArray(atv.afirmacoes) || !atv.afirmacoes.length) erro(onde + ': afirmações ausentes');
    else atv.afirmacoes.forEach(function (a, i) {
      if (typeof a.correta !== 'boolean') erro(onde + ': afirmação ' + (i + 1) + ' sem valor booleano');
    });
  }
  if (atv.tipo === 'match-pairs') {
    if (!Array.isArray(atv.pares) || atv.pares.length < 2) erro(onde + ': pares insuficientes');
    else atv.pares.forEach(function (par, i) {
      if (!Array.isArray(par) || par.length !== 2) erro(onde + ': par ' + (i + 1) + ' inválido');
    });
  }
  if (atv.tipo === 'order-blocks') {
    if (!Array.isArray(atv.blocos) || atv.blocos.length < 2) erro(onde + ': blocos insuficientes');
  }
  if (atv.tipo === 'fill-code') {
    const marcadores = (String(atv.codigo || '').match(/\{\{\d+\}\}/g) || []).length;
    if (!marcadores) erro(onde + ': código sem marcadores {{n}}');
    if (!Array.isArray(atv.lacunas) || atv.lacunas.length !== marcadores) erro(onde + ': quantidade de lacunas (' + (atv.lacunas || []).length + ') difere dos marcadores (' + marcadores + ')');
    else atv.lacunas.forEach(function (lacuna, i) {
      if (!Array.isArray(lacuna) || !lacuna.length) erro(onde + ': lacuna ' + (i + 1) + ' sem respostas aceitas');
    });
  }
  if (atv.tipo === 'write-code') {
    if (typeof atv.validar !== 'function' && (!Array.isArray(atv.respostasAceitas) || !atv.respostasAceitas.length)) {
      erro(onde + ': write-code sem respostasAceitas nem validar()');
    }
  }
  if (atv.tipo === 'explain') {
    if (!Array.isArray(atv.criterios) || !atv.criterios.length) erro(onde + ': explain sem criterios');
  }
  if (atv.tipo === 'visualizer') {
    const temFiltro = Array.isArray(atv.itens) && atv.itens.length > 1;
    const temJoin = Array.isArray(atv.esquerda) && Array.isArray(atv.direita);
    if (!temFiltro && !temJoin) erro(onde + ': visualizer sem itens nem tabelas');
  }
}

function validarLicao(licao) {
  const onde = 'lição ' + (licao.id || '?');
  if (!licao.id) { erro('Lição sem id'); return; }
  if (!licao.trilha) erro(onde + ': sem trilha');
  if (!licao.titulo) erro(onde + ': sem título');
  if (!licao.tipo) erro(onde + ': sem tipo (licao ou prova)');
  if (!Array.isArray(licao.etapas) || !licao.etapas.length) erro(onde + ': sem etapas');
  validarConceitos(licao.conceitos, onde);
  let atividades = 0;
  (licao.etapas || []).forEach(function (etapa, i) {
    if (etapa.tipo === 'conteudo') {
      if (!Array.isArray(etapa.blocos) || !etapa.blocos.length) erro(onde + ' etapa ' + (i + 1) + ': conteúdo sem blocos');
      else (etapa.blocos || []).forEach(function (bloco) {
        if (bloco && bloco.tipo && BLOCOS.indexOf(bloco.tipo) === -1) erro(onde + ' etapa ' + (i + 1) + ': bloco desconhecido -> ' + bloco.tipo);
      });
    } else if (etapa.tipo === 'atividade') {
      atividades += 1;
      if (!etapa.atividade) erro(onde + ' etapa ' + (i + 1) + ': atividade ausente');
      else validarAtividade(etapa.atividade, onde + ' atividade ' + (etapa.atividade.id || i + 1));
    } else {
      erro(onde + ' etapa ' + (i + 1) + ': tipo desconhecido -> ' + etapa.tipo);
    }
  });
  if (licao.duracaoMin && licao.duracaoMin > 60) aviso(onde + ': duração de ' + licao.duracaoMin + ' min acima do recomendado (dividir a lição)');
  if (licao.tipo === 'prova' && atividades < 5) aviso(onde + ': prova com menos de 5 atividades');
}

carregar('../data/manifest.js');
carregar('../data/conceitos.js');
carregar('../data/conceitos-registry.js');
carregar('../data/habilidades.js');
carregar('../data/nivelamento-ingles.js');
carregar('../data/ingles-lexico.js');
carregar('../data/simbolos-codigo.js');
carregar('../data/termos-portugues.js');

if (!manifesto) {
  erro('Manifesto não registrado');
} else {
  (manifesto.trilhas || []).forEach(function (t) {
    if (!t.id) erro('Manifesto: trilha sem id');
    if (!t.arquivo) erro('Manifesto: trilha ' + t.id + ' sem arquivo');
    else carregar(t.arquivo);
    (t.licoes || []).forEach(function (caminho) { carregar(caminho); });
  });
  (manifesto.arquivos || []).forEach(function (caminho) { carregar(caminho); });
}

Object.keys(trilhas).forEach(function (id) {
  const t = trilhas[id];
  if (!t.nome) erro('Trilha ' + id + ': sem nome');
  if (typeof t.fase !== 'number') erro('Trilha ' + id + ': sem fase');
  if (!Array.isArray(t.niveis) || !t.niveis.length) erro('Trilha ' + id + ': sem níveis');
  (t.prerequisitos || []).forEach(function (req) {
    if (!req || !req.trilha) {
      erro('Trilha ' + id + ': pré-requisito sem trilha');
      return;
    }
    if (!trilhas[req.trilha]) erro('Trilha ' + id + ': pré-requisito aponta para trilha inexistente -> ' + req.trilha);
    if (req.trilha === id) erro('Trilha ' + id + ': não pode ser pré-requisito de si mesma');
    if (typeof req.min !== 'undefined' && (typeof req.min !== 'number' || req.min < 0 || req.min > 100)) {
      erro('Trilha ' + id + ': min do pré-requisito inválido -> ' + req.min);
    }
  });
  const etapas = [];
  (t.niveis || []).forEach(function (nivel) {
    (nivel.etapas || []).forEach(function (etapa) { etapas.push(etapa); });
  });
  etapas.forEach(function (etapa) {
    if (!etapa.titulo) erro('Trilha ' + id + ': etapa sem título');
    if (etapa.licao) {
      const licao = licoes[etapa.licao];
      if (!licao) erro('Trilha ' + id + ': etapa "' + etapa.titulo + '" aponta para lição inexistente -> ' + etapa.licao);
      else if (licao.trilha !== id) erro('Trilha ' + id + ': lição ' + etapa.licao + ' pertence à trilha ' + licao.trilha);
    }
  });
});

Object.keys(licoes).forEach(function (id) { validarLicao(licoes[id]); });

function detectarCiclo(id, caminho) {
  if (caminho.indexOf(id) !== -1) {
    erro('Ciclo de pré-requisitos: ' + caminho.concat(id).join(' -> '));
    return true;
  }
  const t = trilhas[id];
  if (!t) return false;
  return (t.prerequisitos || []).some(function (req) {
    return detectarCiclo(req.trilha, caminho.concat(id));
  });
}
Object.keys(trilhas).forEach(function (id) { detectarCiclo(id, []); });

if (!habilidades) {
  erro('Mapa de habilidades não registrado em data/habilidades.js');
} else {
  const competencias = habilidades.competencias || {};
  Object.keys(competencias).forEach(function (id) {
    const c = competencias[id];
    if (!c.nome) erro('Habilidade ' + id + ': sem nome');
    if (c.trilha && !trilhas[c.trilha]) erro('Habilidade ' + id + ': aponta para trilha inexistente -> ' + c.trilha);
    (c.dependencies || []).forEach(function (dep) {
      if (!competencias[dep]) erro('Habilidade ' + id + ': dependência inexistente -> ' + dep);
      if (dep === id) erro('Habilidade ' + id + ': depende de si mesma');
    });
    (c.conceitosChave || []).forEach(function (conceitoId) {
      if (!conceitos[conceitoId]) erro('Habilidade ' + id + ': conceito-chave não registrado -> ' + conceitoId);
    });
    const naCategoria = (habilidades.categorias || []).some(function (cat) {
      return (cat.itens || []).indexOf(id) !== -1;
    });
    if (!naCategoria) aviso('Habilidade ' + id + ' não aparece em nenhuma categoria do mapa');
  });
  (habilidades.categorias || []).forEach(function (cat) {
    (cat.itens || []).forEach(function (id) {
      if (!competencias[id]) erro('Categoria ' + cat.id + ': item inexistente -> ' + id);
    });
  });
}

const licoesReferenciadas = {};
Object.keys(trilhas).forEach(function (id) {
  (trilhas[id].niveis || []).forEach(function (nivel) {
    (nivel.etapas || []).forEach(function (etapa) {
      if (etapa.licao) licoesReferenciadas[etapa.licao] = true;
    });
  });
});
Object.keys(licoes).forEach(function (id) {
  if (!licoesReferenciadas[id]) aviso('Lição ' + id + ' carregada mas não referenciada em nenhuma trilha');
});

if (!registroConceitos) {
  erro('Registro pedagógico de conceitos não encontrado em data/conceitos-registry.js');
} else {
  const rc = registroConceitos.conceitos || {};
  Object.keys(rc).forEach(function (id) {
    if (!conceitos[id]) erro('Registro pedagógico: conceito não declarado em data/conceitos.js -> ' + id);
    (rc[id].prerequisitos || []).forEach(function (pre) {
      if (!conceitos[pre]) erro('Registro pedagógico: pré-requisito inexistente em ' + id + ' -> ' + pre);
    });
  });
  Object.keys(licoes).forEach(function (lid) {
    (licoes[lid].etapas || []).forEach(function (etapa, i) {
      (etapa.blocos || []).forEach(function (bloco) {
        if (!bloco) return;
        if (bloco.tipo === 'conceito' && !conceitos[bloco.id]) erro('Lição ' + lid + ' etapa ' + (i + 1) + ': bloco conceito sem registro -> ' + bloco.id);
        if (bloco.tipo === 'retoma' && bloco.conceito && !conceitos[bloco.conceito]) erro('Lição ' + lid + ' etapa ' + (i + 1) + ': retoma aponta para conceito inexistente -> ' + bloco.conceito);
        if (bloco.tipo === 'futuro' && bloco.conceitos) bloco.conceitos.forEach(function (id) {
          if (!conceitos[id]) erro('Lição ' + lid + ' etapa ' + (i + 1) + ': futuro aponta para conceito inexistente -> ' + id);
        });
      });
    });
  });
}

if (nivelamento) {
  if (!Array.isArray(nivelamento.etapas) || !nivelamento.etapas.length) erro('Teste de nivelamento sem etapas');
  else {
    const porNivel = {};
    nivelamento.etapas.forEach(function (e, i) {
      if (e.tipo === 'conteudo') return;
      if (!e.atividade) { erro('Nivelamento etapa ' + (i + 1) + ': atividade ausente'); return; }
      if (TIPOS.indexOf(e.atividade.tipo) === -1) erro('Nivelamento etapa ' + (i + 1) + ': tipo desconhecido -> ' + e.atividade.tipo);
      if (!e.atividade.nivel) erro('Nivelamento etapa ' + (i + 1) + ': sem nível (A1..C1)');
      else porNivel[e.atividade.nivel] = (porNivel[e.atividade.nivel] || 0) + 1;
    });
    ['A1', 'A2', 'B1', 'B2', 'C1'].forEach(function (n) {
      if (!porNivel[n]) erro('Nivelamento sem questões do nível ' + n);
    });
  }
}

if (!lexicoIngles) {
  erro('Léxico de inglês não registrado em data/ingles-lexico.js');
} else {
  ['nomesProprios', 'expressoes', 'palavrasPortuguesas', 'expressoesPortuguesas'].forEach(function (campo) {
    if (!Array.isArray(lexicoIngles[campo])) erro('Léxico de inglês: campo ' + campo + ' deve ser lista');
  });
  if (!lexicoIngles.contracoes || typeof lexicoIngles.contracoes !== 'object') erro('Léxico de inglês: contracoes deve ser objeto');
}

if (!simbolosCodigo) {
  erro('Registro de símbolos não encontrado em data/simbolos-codigo.js');
} else {
  const simbolos = simbolosCodigo.simbolos || {};
  Object.keys(simbolos).forEach(function (chave) {
    if (chave.indexOf(':') === -1) erro('Símbolo sem grupo (formato grupo:simbolo): ' + chave);
    const info = simbolos[chave];
    if (!info.nome) erro('Símbolo sem nome: ' + chave);
    if (!info.licao) erro('Símbolo sem lição de introdução: ' + chave);
    else if (!licoes[info.licao]) erro('Símbolo ' + chave + ' aponta para lição inexistente: ' + info.licao);
  });
}

if (!termosPortugues) {
  erro('Léxico de termos em português não encontrado em data/termos-portugues.js');
} else {
  const termos = termosPortugues.termos || {};
  Object.keys(termos).forEach(function (termo) {
    const info = termos[termo] || {};
    if (!info.nome) erro('Termo sem nome: ' + termo);
    if (info.licao && !licoes[info.licao]) erro('Termo ' + termo + ' aponta para lição inexistente: ' + info.licao);
  });
}

console.log('Trilhas carregadas: ' + Object.keys(trilhas).length + ' de ' + ((manifesto && manifesto.trilhas) || []).length);
console.log('Lições carregadas: ' + Object.keys(licoes).length);
console.log('Conceitos registrados: ' + Object.keys(conceitos).length);
console.log('Certificações: ' + certificacoes.length + ' | Projetos: ' + projetos.length + ' | Áreas de entrevista: ' + entrevistas.length);

if (avisos.length) {
  console.log('\nAvisos (' + avisos.length + '):');
  avisos.forEach(function (a) { console.log('  - ' + a); });
}

if (erros.length) {
  console.log('\nErros (' + erros.length + '):');
  erros.forEach(function (e) { console.log('  - ' + e); });
  process.exit(1);
}

console.log('\nValidação concluída sem erros.');
