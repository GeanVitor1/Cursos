window.Plataforma = window.Plataforma || {};

(function (P) {
  const formatosData = new Map();
  const cacheCalendario = new WeakMap();
  const CHAVE = 'trilha-net.estado.v1';
  const ouvintes = [];
  let disponivel = true;
  let emTransacao = false;
  let ultimoLocal = null;

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
      versao: 3,
      atividade: { fuso: 'America/Sao_Paulo', diasLegados: [], eventos: {}, intervalos: {} },
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
      xp: 0,
      xpBase: 0,
      premios: {},
      eventosPratica: {},
      praticaBase: { conceitos: {}, habilidades: {} },
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
      pontos: c && c.pontos == null ? (c.acertos || 0) : 0,
      acertosConfiantes: 0,
      chutesCertos: 0,
      dimensoes: {},
      primeiraVez: new Date().toISOString(),
      ultimaVez: null
    };
    const atual = Object.assign(base, c || {});
    atual.dimensoes = atual.dimensoes || {};
    Object.keys(atual.dimensoes).forEach(function (id) {
      const dim = atual.dimensoes[id];
      atual.dimensoes[id] = Object.assign({ acertos: 0, erros: 0, pontos: dim.acertos || 0, sequencia: 0 }, dim);
    });
    return atual;
  }

  function normalizarHabilidade(h) {
    return Object.assign({ acertos: 0, erros: 0, pontos: h.acertos || 0 }, h);
  }

  function validarEstado(dados) {
    function objeto(valor) { return valor !== null && typeof valor === 'object' && !Array.isArray(valor); }
    function exigir(condicao, campo) { if (!condicao) throw new Error('Campo de progresso inválido: ' + campo); }
    function contadores(valor, campos) {
      exigir(objeto(valor), 'registro');
      campos.forEach(function (campo) {
        if (valor[campo] != null) exigir(Number.isFinite(valor[campo]) && valor[campo] >= 0, campo);
      });
    }
    function mapa(valor, verificar) {
      exigir(objeto(valor), 'mapa');
      Object.values(valor).forEach(verificar);
    }
    function conceito(c) {
      contadores(c, ['acertos', 'erros', 'pontos', 'sequencia', 'acertosConfiantes', 'chutesCertos']);
      if (c.dimensoes != null) mapa(c.dimensoes, function (dim) { contadores(dim, ['acertos', 'erros', 'pontos', 'sequencia']); });
    }
    exigir(objeto(dados), 'estado');
    // Dados externos não podem alterar protótipos usados pelos mapas do motor.
    JSON.stringify(dados, function (chave, valor) {
      exigir(chave !== '__proto__' && chave !== 'constructor' && chave !== 'prototype', chave);
      return valor;
    });
    contadores(dados, ['xp', 'xpBase']);
    ['licoes', 'conceitos', 'agenda', 'habilidades', 'configuracoes', 'premios', 'eventosPratica', 'praticaBase'].forEach(function (campo) {
      if (dados[campo] != null) exigir(objeto(dados[campo]), campo);
    });
    mapa(dados.licoes || {}, function (l) {
      contadores(l, ['tentativas', 'melhorAproveitamento']);
      if (l.status != null) exigir(['disponivel', 'em-andamento', 'concluida', 'bloqueada', 'planejada'].indexOf(l.status) !== -1, 'status');
      if (l.assinatura != null) exigir(typeof l.assinatura === 'string', 'assinatura');
      if (l.rascunho != null) exigir(objeto(l.rascunho) && Number.isInteger(l.rascunho.indice) && l.rascunho.indice >= 0, 'rascunho');
      if (l.etapasPremiadas != null) mapa(l.etapasPremiadas, function (v) { exigir(typeof v === 'boolean', 'etapa premiada'); });
      if (l.resultadosEtapas != null) mapa(l.resultadosEtapas, function (v) {
        contadores(v, ['dicas']);
        if (v.primeira != null) exigir(typeof v.primeira === 'boolean', 'primeira tentativa');
      });
    });
    mapa(dados.conceitos || {}, conceito);
    mapa(dados.habilidades || {}, function (h) { contadores(h, ['acertos', 'erros', 'pontos']); });
    mapa(dados.agenda || {}, function (a) {
      contadores(a, ['nivel', 'acertosSeguidos']);
      if (a.proximaEm != null) exigir(typeof a.proximaEm === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(a.proximaEm) && Number.isFinite(Date.parse(a.proximaEm)), 'data da revisão');
    });
    mapa(dados.premios || {}, function (v) { exigir(Number.isFinite(v) && v >= 0, 'prêmio'); });
    mapa(dados.eventosPratica || {}, function (ev) {
      exigir(objeto(ev) && typeof ev.correto === 'boolean' && typeof ev.em === 'string' && Number.isFinite(Date.parse(ev.em)), 'evento');
      if (ev.habilidade) exigir(Object.prototype.hasOwnProperty.call(P.habilidades, ev.habilidade), 'habilidade');
      else exigir(Array.isArray(ev.ids) && ev.ids.every(function (id) { return typeof id === 'string' && !['__proto__', 'constructor', 'prototype'].includes(id); }) && Object.prototype.hasOwnProperty.call(P.dimensoes, ev.dimensao) && Object.prototype.hasOwnProperty.call(pesosConfianca, ev.confianca), 'prática');
    });
    if (dados.praticaBase) {
      if (dados.praticaBase.conceitos != null) mapa(dados.praticaBase.conceitos, conceito);
      if (dados.praticaBase.habilidades != null) mapa(dados.praticaBase.habilidades, function (h) { contadores(h, ['acertos', 'erros', 'pontos']); });
    }
    ['sessoes', 'revisoes'].forEach(function (campo) {
      if (dados[campo] == null) return;
      exigir(Array.isArray(dados[campo]), campo);
      dados[campo].forEach(function (s) {
        contadores(s, ['minutos', 'xp', 'acertos', 'erros']);
        if (s.conceitos != null) exigir(Array.isArray(s.conceitos), 'conceitos da revisão');
      });
    });
    if (dados.streak != null) {
      contadores(dados.streak, ['atual', 'recorde']);
      if (dados.streak.dias != null) exigir(Array.isArray(dados.streak.dias) && dados.streak.dias.every(function (d) { return typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d); }), 'dias');
    }
    if (dados.atividade != null) {
      const a = dados.atividade;
      exigir(objeto(a) && typeof a.fuso === 'string', 'atividade');
      try { new Intl.DateTimeFormat('sv-SE', { timeZone: a.fuso }); } catch (e) { exigir(false, 'fuso'); }
      exigir(Array.isArray(a.diasLegados) && a.diasLegados.every(function (d) { return typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(Date.parse(d)); }), 'dias legados');
      exigir(objeto(a.eventos) && objeto(a.intervalos), 'histórico de atividade');
      mapa(a.eventos, function (e) { exigir(objeto(e) && ['resposta', 'conclusao'].includes(e.tipo) && typeof e.em === 'string' && !isNaN(Date.parse(e.em)) && (e.licao == null || typeof e.licao === 'string'), 'evento de atividade'); });
      Object.keys(a.intervalos).forEach(function (k) { exigir(/^\d{1,12}$/.test(k) && Number.isInteger(a.intervalos[k]) && a.intervalos[k] >= 0 && a.intervalos[k] <= 1023, 'intervalo de atividade'); });
    }
    if (dados.configuracoes && dados.configuracoes.metaMinutos != null) exigir([5, 15, 30, 60].includes(dados.configuracoes.metaMinutos), 'meta de estudo');
    if (dados.configuracoes && dados.configuracoes.percurso != null) exigir(typeof dados.configuracoes.percurso === 'string', 'percurso');
    ['atualizadoEm', 'criadoEm', 'reiniciadoEm'].forEach(function (campo) {
      if (dados[campo] != null) exigir(typeof dados[campo] === 'string' && Number.isFinite(Date.parse(dados[campo])), campo);
    });
  }

  function normalizarEstado(dados) {
    if (dados != null) validarEstado(dados);
    dados = dados ? JSON.parse(JSON.stringify(dados)) : null;
    const base = criaPadrao();
    const estado = Object.assign(base, dados || {});
    estado.streak = Object.assign({ atual: 0, recorde: 0, ultimoDia: null, dias: [] }, dados && dados.streak ? dados.streak : {});
    estado.atividade = Object.assign({ fuso: 'America/Sao_Paulo', diasLegados: (estado.streak.dias || []).slice(), eventos: {}, intervalos: {} }, dados && dados.atividade || {});
    estado.configuracoes = Object.assign({ tema: 'claro', nivelIngles: null }, dados && dados.configuracoes ? dados.configuracoes : {});
    estado.licoes = estado.licoes || {};
    estado.conceitos = estado.conceitos || {};
    estado.agenda = estado.agenda || {};
    estado.habilidades = estado.habilidades || {};
    estado.sessoes = estado.sessoes || [];
    estado.revisoes = estado.revisoes || [];
    estado.xp = estado.xp || 0;
    estado.premios = estado.premios || {};
    estado.xpBase = dados && typeof dados.xpBase === 'number' ? dados.xpBase : Math.max(0, estado.xp - Object.values(estado.premios).reduce(function (n, p) { return n + p; }, 0));
    estado.eventosPratica = estado.eventosPratica || {};
    estado.praticaBase = dados && dados.praticaBase ? dados.praticaBase : JSON.parse(JSON.stringify({ conceitos: estado.conceitos, habilidades: estado.habilidades }));
    estado.praticaBase.conceitos = estado.praticaBase.conceitos || {};
    estado.praticaBase.habilidades = estado.praticaBase.habilidades || {};
    Object.keys(estado.praticaBase.conceitos).forEach(function (id) { estado.praticaBase.conceitos[id] = normalizarConceito(estado.praticaBase.conceitos[id]); });
    Object.keys(estado.praticaBase.habilidades).forEach(function (id) { estado.praticaBase.habilidades[id] = normalizarHabilidade(estado.praticaBase.habilidades[id]); });
    Object.keys(estado.conceitos).forEach(function (id) {
      estado.conceitos[id] = normalizarConceito(estado.conceitos[id]);
      estado.conceitos[id].estado = calcularEstadoConceito(estado.conceitos[id]);
      estado.conceitos[id].dominio = calcularDominio(estado.conceitos[id]);
    });
    Object.keys(estado.habilidades).forEach(function (id) {
      estado.habilidades[id] = normalizarHabilidade(estado.habilidades[id]);
    });
    atualizarCalendario(estado);
    return estado;
  }

  function carregar() {
    try {
      const bruto = window.localStorage.getItem(CHAVE);
      const carregado = bruto ? normalizarEstado(JSON.parse(bruto)) : criaPadrao();
      ultimoLocal = bruto;
      return carregado;
    } catch (e) {
      disponivel = false;
      console.error('[Progresso] Não foi possível ler o progresso salvo:', e);
      return criaPadrao();
    }
  }

  let estado = carregar();

  window.addEventListener('storage', function (ev) {
    if (!ev || ev.key !== CHAVE || ev.newValue == null) return;
    try {
      const recebido = normalizarEstado(JSON.parse(ev.newValue));
      estado = mesclarEstados(estado, recebido);
      const faltamEventos = ['premios', 'eventosPratica'].some(function (campo) {
        return Object.keys(estado[campo]).some(function (id) { return !Object.prototype.hasOwnProperty.call(recebido[campo], id); });
      });
      const faltamConclusoes = Object.keys(estado.licoes).some(function (id) {
        return estado.licoes[id].status === 'concluida' && (!recebido.licoes[id] || recebido.licoes[id].status !== 'concluida');
      });
      // Persiste a união só quando há novidade: evita ping-pong de eventos entre abas.
      const atividadeRecebida = recebido.atividade;
      const faltaAtividade = Object.keys(estado.atividade.eventos).some(function (id) { return !Object.prototype.hasOwnProperty.call(atividadeRecebida.eventos, id); }) ||
        Object.keys(estado.atividade.intervalos).some(function (k) { return ((atividadeRecebida.intervalos[k] || 0) | estado.atividade.intervalos[k]) !== (atividadeRecebida.intervalos[k] || 0); }) ||
        estado.atividade.diasLegados.some(function (d) { return atividadeRecebida.diasLegados.indexOf(d) === -1; });
      if (disponivel && (faltamEventos || faltamConclusoes || faltaAtividade)) {
        const bruto = JSON.stringify(estado);
        window.localStorage.setItem(CHAVE, bruto);
        ultimoLocal = bruto;
      }
      ouvintes.forEach(function (cb) {
        try { cb(estado); } catch (e) { console.error('[Progresso] Falha ao atualizar a interface:', e); }
      });
    } catch (e) { console.warn('[Progresso] Alteração de outra aba inválida:', e); }
  });

  function salvar(naoEnviarNuvem) {
    if (emTransacao) return;
    estado.atualizadoEm = new Date().toISOString();
    sincronizarLocal();
    if (disponivel) {
      try {
        const bruto = JSON.stringify(estado);
        window.localStorage.setItem(CHAVE, bruto);
        ultimoLocal = bruto;
      } catch (e) {
        disponivel = false;
        console.error('[Progresso] Não foi possível salvar no navegador:', e);
        if (P.ui && P.ui.layout) P.ui.layout.toast('O progresso não foi salvo no navegador. Exporte um backup em Meu progresso.', 'erro');
      }
    }
    ouvintes.forEach(function (cb) {
      try { cb(estado); } catch (e) { console.error('[Progresso] Falha ao atualizar a interface:', e); }
    });
    if (!naoEnviarNuvem && P.nuvem && P.nuvem.salvarRemoto) {
      P.nuvem.salvarRemoto(estado);
    }
  }

  function aoMudar(cb) { ouvintes.push(cb); }

  function transacao(acao) {
    if (emTransacao) return acao();
    sincronizarLocal();
    emTransacao = true;
    try { return acao(); }
    finally { emTransacao = false; salvar(); }
  }

  function mesclarEstados(a, b) {
    if (!b) return normalizarEstado(a);
    if (!a) return normalizarEstado(b);
    a = normalizarEstado(a);
    b = normalizarEstado(b);
    if (a.reiniciadoEm !== b.reiniciadoEm && (a.reiniciadoEm || b.reiniciadoEm)) {
      return normalizarEstado((a.reiniciadoEm || '') > (b.reiniciadoEm || '') ? a : b);
    }
    const recente = (a.atualizadoEm || '') >= (b.atualizadoEm || '') ? a : b;
    const antigo = recente === a ? b : a;
    const resultado = normalizarEstado(Object.assign({}, antigo, recente));
    resultado.premios = Object.assign({}, a.premios || {}, b.premios || {});
    Object.keys(resultado.premios).forEach(function (id) {
      resultado.premios[id] = Math.max(a.premios[id] || 0, b.premios[id] || 0);
    });
    resultado.xpBase = Math.max(a.xpBase == null ? a.xp || 0 : a.xpBase, b.xpBase == null ? b.xp || 0 : b.xpBase);
    resultado.xp = resultado.xpBase + Object.values(resultado.premios).reduce(function (n, p) { return n + p; }, 0);
    resultado.licoes = Object.assign({}, antigo.licoes || {}, recente.licoes || {});
    Object.keys(resultado.licoes).forEach(function (id) {
      const x = (a.licoes || {})[id];
      const y = (b.licoes || {})[id];
      if (!x || !y) return;
      const l = Object.assign({}, (antigo.licoes || {})[id], (recente.licoes || {})[id]);
      if (x.status === 'concluida' || y.status === 'concluida') {
        l.status = 'concluida';
        l.concluidaEm = x.concluidaEm || y.concluidaEm;
        l.rascunho = null;
      }
      if (x.assinatura === y.assinatura) {
        l.etapasPremiadas = Object.assign({}, x.etapasPremiadas || {}, y.etapasPremiadas || {});
        l.resultadosEtapas = Object.assign({}, (antigo.licoes[id] || {}).resultadosEtapas || {}, (recente.licoes[id] || {}).resultadosEtapas || {});
      }
      l.melhorAproveitamento = Math.max(x.melhorAproveitamento || 0, y.melhorAproveitamento || 0);
      resultado.licoes[id] = l;
    });
    ['conceitos', 'agenda', 'habilidades', 'configuracoes'].forEach(function (campo) {
      resultado[campo] = Object.assign({}, antigo[campo] || {}, recente[campo] || {});
    });
    Object.keys(resultado.agenda).forEach(function (id) {
      const x = a.agenda[id], y = b.agenda[id];
      if (!x || !y) return;
      const tx = x.atualizadaEm || x.ultimoErroEm || '';
      const ty = y.atualizadaEm || y.ultimoErroEm || '';
      if (tx !== ty) resultado.agenda[id] = tx > ty ? x : y;
    });
    resultado.eventosPratica = Object.assign({}, a.eventosPratica || {}, b.eventosPratica || {});
    resultado.praticaBase = { conceitos: {}, habilidades: {} };
    ['conceitos', 'habilidades'].forEach(function (campo) {
      const x = (a.praticaBase || {})[campo] || a[campo] || {};
      const y = (b.praticaBase || {})[campo] || b[campo] || {};
      Object.keys(Object.assign({}, x, y)).forEach(function (id) {
        const base = Object.assign({}, x[id] || {}, y[id] || {});
        ['acertos', 'erros', 'pontos', 'acertosConfiantes', 'chutesCertos'].forEach(function (n) { base[n] = Math.max((x[id] || {})[n] || 0, (y[id] || {})[n] || 0); });
        if (campo === 'conceitos') {
          base.dimensoes = Object.assign({}, (x[id] || {}).dimensoes || {}, (y[id] || {}).dimensoes || {});
          Object.keys(base.dimensoes).forEach(function (d) {
            const dx = ((x[id] || {}).dimensoes || {})[d] || {};
            const dy = ((y[id] || {}).dimensoes || {})[d] || {};
            base.dimensoes[d] = Object.assign({}, dx, dy);
            ['acertos', 'erros', 'pontos', 'sequencia'].forEach(function (n) { base.dimensoes[d][n] = Math.max(dx[n] || 0, dy[n] || 0); });
          });
        }
        resultado.praticaBase[campo][id] = base;
      });
    });
    reconstruirPratica(resultado);
    ['sessoes', 'revisoes'].forEach(function (campo) {
      const unicos = new Map();
      (a[campo] || []).concat(b[campo] || []).forEach(function (item) { unicos.set(JSON.stringify(item), item); });
      resultado[campo] = Array.from(unicos.values());
    });
    resultado.streak.dias = Array.from(new Set((a.streak.dias || []).concat(b.streak.dias || []))).sort();
    resultado.streak.recorde = Math.max(a.streak.recorde || 0, b.streak.recorde || 0);
    resultado.atividade = { fuso: recente.atividade.fuso, diasLegados: Array.from(new Set(a.atividade.diasLegados.concat(b.atividade.diasLegados))).sort(), eventos: Object.assign({}, a.atividade.eventos, b.atividade.eventos), intervalos: Object.assign({}, a.atividade.intervalos) };
    Object.keys(b.atividade.intervalos).forEach(function (k) { resultado.atividade.intervalos[k] = (resultado.atividade.intervalos[k] || 0) | b.atividade.intervalos[k]; });
    atualizarCalendario(resultado);
    return resultado;
  }

  function reconstruirPratica(alvo) {
    alvo.conceitos = JSON.parse(JSON.stringify(alvo.praticaBase.conceitos));
    alvo.habilidades = JSON.parse(JSON.stringify(alvo.praticaBase.habilidades));
    Object.keys(alvo.conceitos).forEach(function (id) {
      const c = normalizarConceito(alvo.conceitos[id]);
      c.estado = calcularEstadoConceito(c);
      c.dominio = calcularDominio(c);
      alvo.conceitos[id] = c;
    });
    Object.keys(alvo.habilidades).forEach(function (id) {
      alvo.habilidades[id] = normalizarHabilidade(alvo.habilidades[id]);
    });
    Object.values(alvo.eventosPratica || {}).sort(function (a, b) { return a.em.localeCompare(b.em); }).forEach(function (ev) {
      if (ev.habilidade) {
        const h = alvo.habilidades[ev.habilidade] || { acertos: 0, erros: 0, pontos: 0 };
        if (ev.correto) { h.acertos += 1; h.pontos += 1; } else h.erros += 1;
        alvo.habilidades[ev.habilidade] = h;
        return;
      }
      (ev.ids || []).forEach(function (id) {
        const c = normalizarConceito(alvo.conceitos[id]);
        const dim = c.dimensoes[ev.dimensao] || { acertos: 0, erros: 0, pontos: 0, sequencia: 0 };
        if (ev.correto) {
          const peso = pesosConfianca[ev.confianca];
          c.acertos += 1; c.pontos += peso; dim.acertos += 1; dim.pontos += peso;
          if (ev.primeira) { c.sequencia += 1; dim.sequencia += 1; }
          if (ev.confianca === 'certeza') c.acertosConfiantes += 1;
          if (ev.confianca === 'chute') c.chutesCertos += 1;
        } else { c.erros += 1; c.sequencia = 0; dim.erros += 1; dim.sequencia = 0; }
        c.dimensoes[ev.dimensao] = dim;
        c.ultimaVez = ev.em;
        c.estado = calcularEstadoConceito(c);
        c.dominio = calcularDominio(c);
        alvo.conceitos[id] = c;
      });
    });
  }

  function sincronizarLocal() {
    if (!disponivel) return;
    try {
      const bruto = window.localStorage.getItem(CHAVE);
      if (bruto && bruto !== ultimoLocal) {
        estado = mesclarEstados(estado, JSON.parse(bruto));
        ultimoLocal = bruto;
      }
    } catch (e) { console.warn('[Progresso] Falha ao ler a versão salva:', e); }
  }
  // Calendário do perfil: o mesmo fuso em todos os dispositivos.
  function dataNoFuso(em, fuso) {
    fuso = fuso || 'America/Sao_Paulo';
    if (!formatosData.has(fuso)) formatosData.set(fuso, new Intl.DateTimeFormat('sv-SE', { timeZone: fuso, year: 'numeric', month: '2-digit', day: '2-digit' }));
    return formatosData.get(fuso).format(new Date(em));
  }
  function hojeISO() { return dataNoFuso(Date.now(), estado.atividade.fuso); }
  function deslocarDia(dia, n) {
    const d = new Date(dia + 'T12:00:00Z');
    d.setUTCDate(d.getUTCDate() + n);
    return d.toISOString().slice(0, 10);
  }
  function diaISO(n) { return deslocarDia(hojeISO(), n); }
  function atualizarCalendario(alvo) {
    const a = alvo.atividade;
    const hoje = dataNoFuso(Date.now(), a.fuso);
    const cache = cacheCalendario.get(a);
    if (cache && cache.hoje === hoje) { alvo.streak = Object.assign({}, cache.streak, { dias: cache.streak.dias.slice() }); return cache.dias; }
    const dias = {};
    function obter(d) { return dias[d] || (dias[d] = { dia: d, segundos: 0, respostas: 0, licoes: [], legado: false }); }
    a.diasLegados.forEach(function (d) { obter(d).legado = true; });
    Object.values(a.eventos).forEach(function (e) {
      const d = obter(dataNoFuso(e.em, a.fuso));
      if (e.tipo === 'resposta') d.respostas += 1;
      if (e.tipo === 'conclusao' && d.licoes.indexOf(e.licao) === -1) d.licoes.push(e.licao);
    });
    Object.keys(a.intervalos).forEach(function (k) {
      const mask = a.intervalos[k], inicio = Number(k) * 10000;
      const primeiro = dataNoFuso(inicio, a.fuso), ultimo = dataNoFuso(inicio + 9000, a.fuso);
      for (let i = 0; i < 10; i += 1) if (mask & (1 << i)) obter(primeiro === ultimo ? primeiro : dataNoFuso(inicio + i * 1000, a.fuso)).segundos += 1;
    });
    const validos = Object.keys(dias).filter(function (d) { const x = dias[d]; return d <= hoje && (x.legado || x.respostas > 0 || x.licoes.length || x.segundos >= 120); }).sort();
    let sequencia = 0, recorde = 0, anterior = null;
    validos.forEach(function (d) { sequencia = anterior && deslocarDia(anterior, 1) === d ? sequencia + 1 : 1; recorde = Math.max(recorde, sequencia); anterior = d; });
    let atual = 0;
    if (anterior === hoje || anterior === deslocarDia(hoje, -1)) atual = sequencia;
    alvo.streak = { atual: atual, recorde: Math.max(recorde, alvo.streak.recorde || 0), ultimoDia: anterior, dias: validos };
    const lista = Object.keys(dias).sort().map(function (d) { return Object.assign(dias[d], { valido: validos.indexOf(d) !== -1 }); });
    cacheCalendario.set(a, { hoje: hoje, dias: lista, streak: alvo.streak });
    return lista;
  }
  function registrarAtividade(tipo, chave, licao) {
    if (!emTransacao) sincronizarLocal();
    const id = chave || window.crypto.randomUUID();
    if (estado.atividade.eventos[id]) return;
    cacheCalendario.delete(estado.atividade);
    estado.atividade.eventos[id] = { em: new Date().toISOString(), tipo: tipo, licao: licao || null };
    atualizarCalendario(estado);
    salvar();
  }
  function registrarTempo(inicio, fim) {
    if (!Number.isFinite(inicio) || !Number.isFinite(fim) || fim <= inicio || fim - inicio > 15000) return;
    sincronizarLocal();
    cacheCalendario.delete(estado.atividade);
    for (let sec = Math.floor(inicio / 1000); sec < Math.floor(fim / 1000); sec += 1) {
      const k = Math.floor(sec / 10);
      estado.atividade.intervalos[k] = (estado.atividade.intervalos[k] || 0) | (1 << (sec % 10));
    }
    atualizarCalendario(estado);
    salvar();
  }
  function resumoAtividade() {
    const dias = atualizarCalendario(estado);
    const hoje = hojeISO(), inicioSemana = deslocarDia(hoje, -6);
    const atual = dias.find(function (d) { return d.dia === hoje; });
    return { dias: dias, fuso: estado.atividade.fuso, totalDias: estado.streak.dias.length,
      segundos: dias.reduce(function (n, d) { return n + d.segundos; }, 0),
      hojeSegundos: atual ? atual.segundos : 0,
      semanaSegundos: dias.filter(function (d) { return d.dia >= inicioSemana && d.dia <= hoje; }).reduce(function (n, d) { return n + d.segundos; }, 0),
      metaMinutos: estado.configuracoes.metaMinutos || 15 };
  }
  function registrarDia() { registrarAtividade('resposta'); }

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
    if (!Number.isFinite(quantidade) || quantidade <= 0) return 0;
    if (!emTransacao) sincronizarLocal();
    const chave = motivo && /^(etapa:|conclusao:)/.test(motivo) ? motivo : 'evento:' + window.crypto.randomUUID();
    if (estado.premios[chave]) return 0;
    const antes = nivelInfo().nivel;
    estado.xp += quantidade;
    estado.premios[chave] = quantidade;
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
    return pontos / tentativas;
  }

  function calcularEstadoConceito(c) {
    const tentativas = c.acertos + c.erros;
    if (!tentativas) return 'aprendendo';
    if (c.erros > c.acertos) return 'dificuldade';
    const variedade = dimensoesComAcerto(c).length;
    const forte = precisao(c) >= 0.8;
    if (c.acertos >= 3 && variedade >= 2 && forte) return 'dominado';
    if (c.erros > 0) return 'revisar';
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
      const acertosPonderados = info.pontos == null ? (info.acertos || 0) : info.pontos;
      const pct = Math.round((acertosPonderados / ((info.acertos || 0) + (info.erros || 0))) * 100);
      dims[d] = { percentual: Math.max(0, Math.min(100, pct)), tentativas: (info.acertos || 0) + (info.erros || 0) };
      pontosTotais += acertosPonderados;
      tentativasTotais += (info.acertos || 0) + (info.erros || 0);
    });
    const geral = tentativasTotais ? Math.round((pontosTotais / tentativasTotais) * 100) : 0;
    return { geral: geral, dimensoes: dims, medidas: tentativasTotais };
  }

  function agendarErro(id) {
    estado.agenda[id] = {
      nivel: 0,
      proximaEm: diaISO(P.conf.intervalosRevisao[0]),
      ultimoErroEm: new Date().toISOString(),
      atualizadaEm: new Date().toISOString(),
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
      atualizadaEm: new Date().toISOString(),
      acertosSeguidos: (atual.acertosSeguidos || 0) + 1
    };
  }

  function responderConceito(ids, correto, primeiraTentativa, info) {
    if (!ids || !ids.length) return;
    info = info || {};
    const dimensao = info.dimensao && P.dimensoes[info.dimensao] ? info.dimensao : 'reconhecimento';
    const confianca = pesosConfianca[info.confianca] != null ? info.confianca : 'acho';
    const evento = (info.evento || window.crypto.randomUUID()) + (correto ? ':acerto' : ':erro');
    if (estado.eventosPratica[evento]) return;
    estado.eventosPratica[evento] = { ids: ids, correto: correto, primeira: primeiraTentativa, dimensao: dimensao, confianca: confianca, em: new Date().toISOString() };
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
        if (!estado.agenda[id]) { agendarErro(id); if (confianca !== 'chute') estado.agenda[id].ultimoErroEm = null; }
        else if (info.revisao) agendarAcerto(id);
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
    if (licao && licao.assinaturaConteudo) return licao.assinaturaConteudo;
    if (!licao || !licao.etapas) return '0';
    return licao.etapas.length + ':' + licao.etapas.map(function (e, i) {
      if (e.tipo === 'atividade' && e.atividade && e.atividade.id) return e.atividade.id;
      return 'c:' + String(e.titulo || i);
    }).join('|');
  }

  function sincronizarConteudo(id, l) {
    const atual = assinaturaLicao(id);
    if (l.assinatura === atual) return;
    const meta = P.interno.licoes[id];
    if (meta && l.assinatura === meta.assinaturaLegada) { l.assinatura = atual; return; }
    l.assinatura = atual;
    l.etapasPremiadas = {};
    l.resultadosEtapas = {};
    l.rascunho = null;
  }

  function obterRegistroLicao(id) { return estado.licoes[id] || null; }

  function obterRascunho(id) {
    const l = estado.licoes[id];
    if (!l || !l.rascunho) return null;
    const meta = P.interno.licoes[id];
    if (l.assinatura !== assinaturaLicao(id) && (!meta || l.assinatura !== meta.assinaturaLegada)) return null;
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
    const meta = P.interno.licoes[id];
    if (l.assinatura !== assinaturaLicao(id) && (!meta || l.assinatura !== meta.assinaturaLegada)) return {};
    return l.etapasPremiadas;
  }

  function obterResultadosEtapas(id) {
    const l = estado.licoes[id];
    const meta = P.interno.licoes[id];
    if (!l || (l.assinatura !== assinaturaLicao(id) && (!meta || l.assinatura !== meta.assinaturaLegada))) return {};
    return l.resultadosEtapas || {};
  }

  function marcarEtapaPremiada(id, indice) {
    const l = estado.licoes[id] || { status: 'em-andamento', tentativas: 0, melhorAproveitamento: 0 };
    sincronizarConteudo(id, l);
    l.etapasPremiadas = l.etapasPremiadas || {};
    l.etapasPremiadas[indice] = true;
    estado.licoes[id] = l;
    salvar();
  }

  function registrarResultadoEtapa(id, indice, resultado) {
    const l = estado.licoes[id] || { status: 'em-andamento', tentativas: 0, melhorAproveitamento: 0 };
    sincronizarConteudo(id, l);
    l.resultadosEtapas = l.resultadosEtapas || {};
    l.resultadosEtapas[indice] = resultado;
    estado.licoes[id] = l;
    salvar();
  }

  function concluirLicao(id, info) {
    sincronizarLocal();
    const licao = P.interno.licoes[id] || {};
    const registro = estado.licoes[id] || { tentativas: 0, melhorAproveitamento: 0 };
    const primeiraVez = registro.status !== 'concluida' && !registro.concluidaEm;
    if (!primeiraVez) {
      registro.rascunho = null;
      registro.melhorAproveitamento = Math.max(registro.melhorAproveitamento || 0, info.aproveitamento || 0);
      salvar();
      return { primeiraVez: false, bonus: 0 };
    }
    const prova = licao.tipo === 'prova';
    if (prova && (info.aproveitamento || 0) < (licao.minimoAprovacao || 70)) {
      registro.tentativas = (registro.tentativas || 0) + 1;
      registro.melhorAproveitamento = Math.max(registro.melhorAproveitamento || 0, info.aproveitamento || 0);
      estado.licoes[id] = registro;
      salvar();
      return { primeiraVez: false, bonus: 0, aprovado: false };
    }
    registro.status = 'concluida';
    registro.tentativas = (registro.tentativas || 0) + 1;
    registro.concluidaEm = registro.concluidaEm || new Date().toISOString();
    registro.melhorAproveitamento = Math.max(registro.melhorAproveitamento || 0, info.aproveitamento || 0);
    registro.rascunho = null;
    estado.licoes[id] = registro;
    emTransacao = true;
    registrarAtividade('conclusao', 'conclusao:' + id, id);
    const bonus = prova ? P.conf.xpProva : (licao.xp || P.conf.xpAula);
    adicionarXp(bonus, 'conclusao:' + id);
    estado.sessoes.push({
      data: new Date().toISOString(),
      tipo: prova ? 'prova' : 'licao',
      id: id,
      minutos: licao.duracaoMin || 30,
      xp: bonus
    });
    emTransacao = false;
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

  function registrarHabilidade(nome, correto, chave) {
    if (!nome || !P.habilidades[nome]) return;
    const evento = (chave || window.crypto.randomUUID()) + ':habilidade:' + nome + ':' + correto;
    if (estado.eventosPratica[evento]) return;
    estado.eventosPratica[evento] = { habilidade: nome, correto: correto, em: new Date().toISOString() };
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

  function importar(dados, naoEnviarNuvem) {
    if (!dados || typeof dados !== 'object' || Array.isArray(dados) || !Number.isFinite(dados.xp) || dados.xp < 0 || !dados.licoes || typeof dados.licoes !== 'object' || Array.isArray(dados.licoes)) throw new Error('Formato de arquivo inválido. Exporte um backup da plataforma.');
    const candidato = normalizarEstado(dados);
    if (!naoEnviarNuvem) candidato.reiniciadoEm = new Date().toISOString();
    if (naoEnviarNuvem && JSON.stringify(candidato) === JSON.stringify(estado)) return;
    estado = candidato;
    salvar(naoEnviarNuvem);
  }

  // A fronteira de acesso já preserva avanços antigos. Não inventar conclusões.
  function repararProgresso() { return 0; }

  function resetar() {
    estado = criaPadrao();
    estado.reiniciadoEm = new Date().toISOString();
    salvar();
  }

  P.dados = {
    estado: function () { atualizarCalendario(estado); return estado; },
    salvar: salvar,
    transacao: transacao,
    mesclarEstados: mesclarEstados,
    aoMudar: aoMudar,
    registrarDia: registrarDia,
    registrarAtividade: registrarAtividade,
    registrarTempo: registrarTempo,
    resumoAtividade: resumoAtividade,
    deslocarDia: deslocarDia,
    dataNoFuso: dataNoFuso,
    adicionarXp: adicionarXp,
    responderConceito: responderConceito,
    estaConcluida: estaConcluida,
    obterRegistroLicao: obterRegistroLicao,
    obterRascunho: obterRascunho,
    atualizarRascunho: atualizarRascunho,
    limparRascunho: limparRascunho,
    obterEtapasPremiadas: obterEtapasPremiadas,
    obterResultadosEtapas: obterResultadosEtapas,
    marcarEtapaPremiada: marcarEtapaPremiada,
    registrarResultadoEtapa: registrarResultadoEtapa,
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
    repararProgresso: repararProgresso,
    resetar: resetar,
    localStorageDisponivel: function () { return disponivel; },
    hojeISO: hojeISO
  };
})(window.Plataforma);
