window.Plataforma = window.Plataforma || {};

(function (P) {
  const CHAVE = 'trilha-net.estado.v1';
  const ouvintes = [];
  let disponivel = true;

  P.dimensoes = {
    reconhecimento: { nome: 'Reconhecimento', descricao: 'Identificar a resposta certa entre opções.' },
    associacao: { nome: 'Associação', descricao: 'Conectar termos e significados.' },
    ordenacao: { nome: 'Ordenação', descricao: 'Colocar peças na ordem correta.' },
    preenchimento: { nome: 'Preenchimento', descricao: 'Completar lacunas de código ou consulta.' },
    construcao: { nome: 'Construção', descricao: 'Escrever a solução com as próprias mãos.' },
    aplicacao: { nome: 'Aplicação real', descricao: 'Resolver um problema sem pistas.' }
  };

  const pesosConfianca = { certeza: 1, acho: 0.75, chute: 0.35 };

  P.habilidades = {
    vocabulario: 'Vocabulário',
    gramatica: 'Gramática',
    listening: 'Listening',
    reading: 'Reading',
    writing: 'Writing',
    compreensao: 'Compreensão',
    speaking: 'Speaking'
  };

  function criaPadrao() {
    return {
      versao: 2,
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
      xp: 0,
      streak: { atual: 0, recorde: 0, ultimoDia: null, dias: [] },
      licoes: {},
      conceitos: {},
      agenda: {},
      habilidades: {},
      sessoes: [],
      revisoes: [],
      configuracoes: { tema: 'claro', nivelIngles: null }
    };
  }

  function normalizarConceito(c) {
    const base = {
      acertos: 0,
      erros: 0,
      sequencia: 0,
      pontos: 0,
      acertosConfiantes: 0,
      chutesCertos: 0,
      dimensoes: {},
      primeiraVez: new Date().toISOString(),
      ultimaVez: null
    };
    const atual = Object.assign(base, c || {});
    atual.dimensoes = atual.dimensoes || {};
    return atual;
  }

  function normalizarEstado(dados) {
    const base = criaPadrao();
    const estado = Object.assign(base, dados || {});
    estado.streak = Object.assign({ atual: 0, recorde: 0, ultimoDia: null, dias: [] }, dados && dados.streak ? dados.streak : {});
    estado.configuracoes = Object.assign({ tema: 'claro', nivelIngles: null }, dados && dados.configuracoes ? dados.configuracoes : {});
    estado.licoes = estado.licoes || {};
    estado.conceitos = estado.conceitos || {};
    estado.agenda = estado.agenda || {};
    estado.habilidades = estado.habilidades || {};
    estado.sessoes = estado.sessoes || [];
    estado.revisoes = estado.revisoes || [];
    estado.xp = estado.xp || 0;
    Object.keys(estado.conceitos).forEach(function (id) {
      estado.conceitos[id] = normalizarConceito(estado.conceitos[id]);
    });
    return estado;
  }

  function carregar() {
    try {
      const bruto = window.localStorage.getItem(CHAVE);
      return bruto ? normalizarEstado(JSON.parse(bruto)) : criaPadrao();
    } catch (e) {
      disponivel = false;
      return criaPadrao();
    }
  }

  let estado = carregar();

  window.addEventListener('storage', function (ev) {
    if (!ev || ev.key !== CHAVE || ev.newValue == null) return;
    try {
      estado = normalizarEstado(JSON.parse(ev.newValue));
      ouvintes.forEach(function (cb) {
        try { cb(estado); } catch (e) { /* ignora */ }
      });
    } catch (e) { /* conteúdo inválido: mantém o estado atual */ }
  });

  function salvar() {
    estado.atualizadoEm = new Date().toISOString();
    if (disponivel) {
      try {
        window.localStorage.setItem(CHAVE, JSON.stringify(estado));
      } catch (e) {
        disponivel = false;
      }
    }
    ouvintes.forEach(function (cb) {
      try { cb(estado); } catch (e) { /* ignora */ }
    });
  }

  function aoMudar(cb) { ouvintes.push(cb); }
  function hojeISO() { return new Date().toLocaleDateString('sv-SE'); }

  function diaISO(deslocamento) {
    const d = new Date();
    d.setDate(d.getDate() + deslocamento);
    return d.toLocaleDateString('sv-SE');
  }

  function registrarDia() {
    const hoje = hojeISO();
    if (estado.streak.ultimoDia === hoje) return;
    estado.streak.atual = estado.streak.ultimoDia === diaISO(-1) ? estado.streak.atual + 1 : 1;
    estado.streak.ultimoDia = hoje;
    if (estado.streak.atual > estado.streak.recorde) estado.streak.recorde = estado.streak.atual;
    if (estado.streak.dias.indexOf(hoje) === -1) estado.streak.dias.push(hoje);
  }

  function limiarNivel(n) { return 100 * (n - 1) * (n - 1); }

  function nivelInfo(xpAlvo) {
    const xp = typeof xpAlvo === 'number' ? xpAlvo : estado.xp;
    let nivel = 1;
    while (xp >= limiarNivel(nivel + 1) && nivel < 200) nivel += 1;
    const base = limiarNivel(nivel);
    const proximo = limiarNivel(nivel + 1);
    return {
      nivel: nivel,
      xp: xp,
      base: base,
      proximo: proximo,
      progresso: proximo > base ? (xp - base) / (proximo - base) : 0
    };
  }

  function adicionarXp(quantidade, motivo) {
    if (!quantidade) return;
    const antes = nivelInfo().nivel;
    estado.xp += quantidade;
    registrarDia();
    salvar();
    const depois = nivelInfo().nivel;
    if (depois > antes && P.ui && P.ui.layout && P.ui.layout.toast) {
      P.ui.layout.toast('Nível ' + depois + ' alcançado', 'sucesso');
    }
    if (P.ui && P.ui.layout && P.ui.layout.atualizarEstatisticas) P.ui.layout.atualizarEstatisticas();
    return quantidade;
  }

  function dimensoesPraticadas(c) {
    return Object.keys(c.dimensoes || {}).filter(function (d) {
      const info = c.dimensoes[d];
      return info && (info.acertos || 0) + (info.erros || 0) > 0;
    });
  }

  function dimensoesComAcerto(c) {
    return Object.keys(c.dimensoes || {}).filter(function (d) {
      const info = c.dimensoes[d];
      return info && (info.acertos || 0) > 0;
    });
  }

  function precisao(c) {
    const tentativas = c.acertos + c.erros;
    if (!tentativas) return 0;
    const pontos = typeof c.pontos === 'number' ? c.pontos : c.acertos;
    return pontos / (pontos + c.erros);
  }

  function calcularEstadoConceito(c) {
    const tentativas = c.acertos + c.erros;
    if (!tentativas) return 'aprendendo';
    if (c.erros > c.acertos) return 'dificuldade';
    if (c.erros > 0) return 'revisar';
    const variedade = dimensoesComAcerto(c).length;
    const forte = precisao(c) >= 0.8;
    if (c.acertos >= 3 && variedade >= 2 && forte) return 'dominado';
    if (c.acertos >= 3 && variedade < 2) return 'revisar';
    return 'aprendendo';
  }

  function calcularDominio(c) {
    const dims = {};
    let pontosTotais = 0;
    let tentativasTotais = 0;
    Object.keys(P.dimensoes).forEach(function (d) {
      const info = (c.dimensoes || {})[d];
      if (!info || (info.acertos || 0) + (info.erros || 0) === 0) {
        dims[d] = { percentual: 0, tentativas: 0 };
        return;
      }
      const acertosPonderados = info.pontos || info.acertos || 0;
      const pct = Math.round((acertosPonderados / (acertosPonderados + (info.erros || 0))) * 100);
      dims[d] = { percentual: Math.max(0, Math.min(100, pct)), tentativas: (info.acertos || 0) + (info.erros || 0) };
      pontosTotais += acertosPonderados;
      tentativasTotais += acertosPonderados + (info.erros || 0);
    });
    const geral = tentativasTotais ? Math.round((pontosTotais / tentativasTotais) * 100) : 0;
    return { geral: geral, dimensoes: dims, medidas: tentativasTotais };
  }

  function agendarErro(id) {
    estado.agenda[id] = {
      nivel: 0,
      proximaEm: diaISO(P.conf.intervalosRevisao[0]),
      ultimoErroEm: new Date().toISOString(),
      acertosSeguidos: 0
    };
  }

  function agendarAcerto(id) {
    const atual = estado.agenda[id];
    if (!atual) return;
    const hoje = hojeISO();
    const devido = !atual.proximaEm || atual.proximaEm <= hoje;
    if (!devido) return;
    const proximoNivel = Math.min((atual.nivel || 0) + 1, P.conf.intervalosRevisao.length - 1);
    estado.agenda[id] = {
      nivel: proximoNivel,
      proximaEm: diaISO(P.conf.intervalosRevisao[proximoNivel]),
      ultimoErroEm: atual.ultimoErroEm || null,
      acertosSeguidos: (atual.acertosSeguidos || 0) + 1
    };
  }

  function responderConceito(ids, correto, primeiraTentativa, info) {
    if (!ids || !ids.length) return;
    info = info || {};
    const dimensao = info.dimensao && P.dimensoes[info.dimensao] ? info.dimensao : 'reconhecimento';
    const confianca = pesosConfianca[info.confianca] != null ? info.confianca : 'acho';
    ids.forEach(function (id) {
      const c = estado.conceitos[id] || normalizarConceito();
      const dim = c.dimensoes[dimensao] || { acertos: 0, erros: 0, pontos: 0, sequencia: 0 };
      if (correto) {
        c.acertos += 1;
        const peso = pesosConfianca[confianca];
        c.pontos = (c.pontos || 0) + peso;
        if (primeiraTentativa) c.sequencia += 1;
        if (confianca === 'certeza') c.acertosConfiantes += 1;
        if (confianca === 'chute') c.chutesCertos += 1;
        dim.acertos += 1;
        dim.pontos = (dim.pontos || 0) + peso;
        if (primeiraTentativa) dim.sequencia = (dim.sequencia || 0) + 1;
        if (info.revisao) agendarAcerto(id);
      } else {
        c.erros += 1;
        c.sequencia = 0;
        dim.erros += 1;
        dim.sequencia = 0;
        agendarErro(id);
      }
      c.dimensoes[dimensao] = dim;
      c.ultimaVez = new Date().toISOString();
      c.estado = calcularEstadoConceito(c);
      c.dominio = calcularDominio(c);
      estado.conceitos[id] = c;
    });
    salvar();
  }

  function estaConcluida(id) {
    const l = estado.licoes[id];
    return !!(l && l.status === 'concluida');
  }

  function assinaturaLicao(id) {
    const licao = P.interno.licoes ? P.interno.licoes[id] : null;
    if (!licao || !licao.etapas) return '0';
    return licao.etapas.length + ':' + licao.etapas.map(function (e, i) {
      if (e.tipo === 'atividade' && e.atividade && e.atividade.id) return e.atividade.id;
      return 'c:' + String(e.titulo || i);
    }).join('|');
  }

  function sincronizarConteudo(id, l) {
    const atual = assinaturaLicao(id);
    if (l.assinatura === atual) return;
    l.assinatura = atual;
    l.etapasPremiadas = {};
    l.rascunho = null;
  }

  function obterRegistroLicao(id) { return estado.licoes[id] || null; }

  function obterRascunho(id) {
    const l = estado.licoes[id];
    if (!l || !l.rascunho) return null;
    if (l.assinatura !== assinaturaLicao(id)) return null;
    return l.rascunho;
  }

  function atualizarRascunho(id, indice) {
    const l = estado.licoes[id] || { status: 'em-andamento', tentativas: 0, melhorAproveitamento: 0 };
    sincronizarConteudo(id, l);
    if (l.status !== 'concluida') l.status = 'em-andamento';
    l.rascunho = { indice: indice, em: new Date().toISOString() };
    estado.licoes[id] = l;
    salvar();
  }

  function limparRascunho(id) {
    const l = estado.licoes[id];
    if (l) {
      l.rascunho = null;
      salvar();
    }
  }

  function obterEtapasPremiadas(id) {
    const l = estado.licoes[id];
    if (!l || !l.etapasPremiadas) return {};
    if (l.assinatura !== assinaturaLicao(id)) return {};
    return l.etapasPremiadas;
  }

  function marcarEtapaPremiada(id, indice) {
    const l = estado.licoes[id] || { status: 'em-andamento', tentativas: 0, melhorAproveitamento: 0 };
    sincronizarConteudo(id, l);
    l.etapasPremiadas = l.etapasPremiadas || {};
    l.etapasPremiadas[indice] = true;
    estado.licoes[id] = l;
    salvar();
  }

  function concluirLicao(id, info) {
    const licao = P.interno.licoes[id] || {};
    const registro = estado.licoes[id] || { tentativas: 0, melhorAproveitamento: 0 };
    const primeiraVez = !registro.concluidaEm;
    const prova = licao.tipo === 'prova';
    registro.status = 'concluida';
    registro.tentativas = (registro.tentativas || 0) + 1;
    registro.concluidaEm = registro.concluidaEm || new Date().toISOString();
    registro.melhorAproveitamento = Math.max(registro.melhorAproveitamento || 0, info.aproveitamento || 0);
    registro.rascunho = null;
    estado.licoes[id] = registro;
    const bonus = primeiraVez
      ? (prova ? P.conf.xpProva : (licao.xp || P.conf.xpAula))
      : (prova ? 25 : 10);
    adicionarXp(bonus, 'conclusao');
    estado.sessoes.push({
      data: new Date().toISOString(),
      tipo: prova ? 'prova' : 'licao',
      id: id,
      minutos: licao.duracaoMin || 30,
      xp: bonus
    });
    salvar();
    return { primeiraVez: primeiraVez, bonus: bonus };
  }

  function registrarRevisao(info) {
    estado.revisoes.push({
      data: new Date().toISOString(),
      conceitos: info.conceitos || [],
      acertos: info.acertos || 0,
      erros: info.erros || 0
    });
    const bonus = P.conf.xpRevisaoBonus;
    estado.sessoes.push({ data: new Date().toISOString(), tipo: 'revisao', minutos: info.minutos || 10, xp: bonus });
    adicionarXp(bonus, 'revisao');
    salvar();
    return bonus;
  }

  function resumoConceitos() {
    return Object.keys(estado.conceitos).map(function (id) {
      const c = estado.conceitos[id];
      return {
        id: id,
        acertos: c.acertos || 0,
        erros: c.erros || 0,
        sequencia: c.sequencia || 0,
        pontos: c.pontos || 0,
        acertosConfiantes: c.acertosConfiantes || 0,
        chutesCertos: c.chutesCertos || 0,
        estado: c.estado || calcularEstadoConceito(c),
        dominio: c.dominio || calcularDominio(c),
        dimensoes: c.dimensoes || {},
        ultimaVez: c.ultimaVez,
        agenda: estado.agenda[id] || null
      };
    });
  }

  function estadoConceito(id) {
    const c = estado.conceitos[id];
    return c ? (c.estado || calcularEstadoConceito(c)) : null;
  }

  function dominioConceito(id) {
    const c = estado.conceitos[id];
    return c ? (c.dominio || calcularDominio(c)) : null;
  }

  function dimensoesConceito(id) {
    const c = estado.conceitos[id];
    return c && c.dimensoes ? c.dimensoes : {};
  }

  function agendaDeRevisao() {
    return Object.keys(estado.agenda).map(function (id) {
      return Object.assign({ id: id }, estado.agenda[id]);
    });
  }

  function registrarHabilidade(nome, correto) {
    if (!nome || !P.habilidades[nome]) return;
    const h = estado.habilidades[nome] || { acertos: 0, erros: 0, pontos: 0 };
    if (correto) {
      h.acertos += 1;
      h.pontos += 1;
    } else {
      h.erros += 1;
    }
    estado.habilidades[nome] = h;
    salvar();
  }

  function resumoHabilidades() {
    return Object.keys(P.habilidades).map(function (nome) {
      const h = estado.habilidades[nome] || { acertos: 0, erros: 0, pontos: 0 };
      const tentativas = h.acertos + h.erros;
      return {
        nome: nome,
        rotulo: P.habilidades[nome],
        acertos: h.acertos,
        erros: h.erros,
        tentativas: tentativas,
        percentual: tentativas ? Math.round((h.pontos / tentativas) * 100) : 0
      };
    });
  }

  function definirNivelIngles(nivel) {
    estado.configuracoes.nivelIngles = nivel || null;
    salvar();
  }

  function obterNivelIngles() {
    return estado.configuracoes.nivelIngles || null;
  }

  function definirTema(tema) {
    estado.configuracoes.tema = tema;
    salvar();
  }

  function tema() { return estado.configuracoes.tema || 'claro'; }
  function exportar() { return JSON.parse(JSON.stringify(estado)); }

  function importar(dados) {
    if (!dados || typeof dados !== 'object') throw new Error('Formato de arquivo inválido.');
    estado = normalizarEstado(dados);
    salvar();
  }

  function resetar() {
    estado = criaPadrao();
    salvar();
  }

  P.dados = {
    estado: function () { return estado; },
    salvar: salvar,
    aoMudar: aoMudar,
    registrarDia: registrarDia,
    adicionarXp: adicionarXp,
    responderConceito: responderConceito,
    estaConcluida: estaConcluida,
    obterRegistroLicao: obterRegistroLicao,
    obterRascunho: obterRascunho,
    atualizarRascunho: atualizarRascunho,
    limparRascunho: limparRascunho,
    obterEtapasPremiadas: obterEtapasPremiadas,
    marcarEtapaPremiada: marcarEtapaPremiada,
    concluirLicao: concluirLicao,
    registrarRevisao: registrarRevisao,
    resumoConceitos: resumoConceitos,
    estadoConceito: estadoConceito,
    dominioConceito: dominioConceito,
    dimensoesConceito: dimensoesConceito,
    agendaDeRevisao: agendaDeRevisao,
    registrarHabilidade: registrarHabilidade,
    resumoHabilidades: resumoHabilidades,
    definirNivelIngles: definirNivelIngles,
    obterNivelIngles: obterNivelIngles,
    nivelInfo: nivelInfo,
    definirTema: definirTema,
    tema: tema,
    exportar: exportar,
    importar: importar,
    resetar: resetar,
    localStorageDisponivel: function () { return disponivel; },
    hojeISO: hojeISO
  };
})(window.Plataforma);
