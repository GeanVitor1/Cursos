window.Plataforma = window.Plataforma || {};

(function (P) {
  function trilha(id) { return P.interno.trilhas[id] || null; }

  function etapasDaTrilha(t) {
    const lista = [];
    (t.niveis || []).forEach(function (nivel) {
      (nivel.etapas || []).forEach(function (etapa) {
        lista.push(Object.assign({}, etapa, { nivel: nivel.id, nivelNome: nivel.nome }));
      });
    });
    return lista;
  }

  function publicada(id) {
    const l = P.interno.licoes[id];
    return !!l && (l.disponivel === true || (l.etapas && l.etapas.length > 0));
  }

  function ehCheckpoint(e) {
    const l = P.interno.licoes[e.licao];
    return e.tipo === 'prova' || (!!l && l.tipo === 'prova');
  }

  // percentual: sobre as lições publicadas (exibição).
  // percentualPlanejado: sobre o total planejado da trilha, incluindo checkpoints.
  function percentualTrilha(t) {
    const todas = etapasDaTrilha(t).filter(function (e) { return !!e.licao; });
    const comLicao = todas.filter(function (e) { return publicada(e.licao); });
    const concluidas = comLicao.filter(function (e) { return P.dados.estaConcluida(e.licao); });
    const checkpoints = comLicao.filter(ehCheckpoint);
    return {
      comLicao: comLicao,
      concluidas: concluidas,
      percentual: comLicao.length ? Math.round((concluidas.length / comLicao.length) * 100) : 0,
      totalPlanejado: todas.length,
      percentualPlanejado: todas.length ? Math.round((concluidas.length / todas.length) * 100) : 0,
      emConstrucao: todas.length > comLicao.length,
      checkpointsPublicados: checkpoints.length,
      checkpointsAprovados: checkpoints.filter(function (e) { return P.dados.estaConcluida(e.licao); }).length
    };
  }

  // Regra de pré-requisito (decisão documentada):
  // 1. Já cumprido antes (persistido em estado.requisitosCumpridos) => atendido para sempre;
  //    publicar lições novas na trilha não rebloqueia quem já tinha cumprido.
  // 2. Trilha completa: exige min% sobre o total planejado (checkpoints incluídos).
  // 3. Trilha em construção (há etapas não publicadas): libera provisoriamente quando
  //    min% do publicado foi concluído E existe ao menos um checkpoint publicado E todos
  //    os checkpoints publicados foram aprovados. Sem checkpoint publicado não libera,
  //    para que um punhado de lições introdutórias não destrave trilhas dependentes.
  function avaliarRequisito(trilhaId, minimo) {
    const alvo = trilha(trilhaId);
    if (!alvo) return { alvo: null, dados: { percentual: 0, percentualPlanejado: 0 }, atendido: false, provisorio: false };
    const dados = percentualTrilha(alvo);
    const persistido = !!(P.dados.requisitoCumprido && P.dados.requisitoCumprido(trilhaId));
    const completo = dados.totalPlanejado > 0 && dados.percentualPlanejado >= minimo;
    const provisorio = !completo && dados.emConstrucao && dados.comLicao.length > 0 && dados.percentual >= minimo &&
      dados.checkpointsPublicados > 0 && dados.checkpointsAprovados === dados.checkpointsPublicados;
    const atendido = persistido || completo || provisorio;
    if (atendido && !persistido && P.dados.marcarRequisitoCumprido) P.dados.marcarRequisitoCumprido(trilhaId);
    return { alvo: alvo, dados: dados, atendido: atendido, provisorio: !completo && atendido && dados.emConstrucao };
  }

  function listaRequisitos(t) {
    return (t.prerequisitos || []).map(function (req) {
      const minimo = typeof req.min === 'number' ? req.min : 100;
      const r = avaliarRequisito(req.trilha, minimo);
      return {
        trilha: req.trilha,
        nome: r.alvo ? (r.alvo.nome || req.trilha) : req.trilha,
        min: minimo,
        percentual: r.alvo ? r.dados.percentual : 0,
        percentualPlanejado: r.alvo ? r.dados.percentualPlanejado : 0,
        emConstrucao: !!(r.alvo && r.dados.emConstrucao),
        provisorio: r.provisorio,
        atendido: r.atendido
      };
    });
  }

  function daTrilha(id) {
    const t = trilha(id);
    if (!t) return null;
    const etapas = etapasDaTrilha(t);
    const dados = percentualTrilha(t);
    const requisitos = listaRequisitos(t);
    const requisitosAtendidos = requisitos.every(function (r) { return r.atendido; });
    let status;
    if (!requisitosAtendidos) status = 'bloqueada';
    else if (!dados.comLicao.length) status = 'planejada';
    else if (dados.percentual === 100) status = 'concluida';
    else if (dados.concluidas.length > 0) status = 'em-andamento';
    else status = 'disponivel';
    return {
      trilha: t,
      etapas: etapas,
      comLicao: dados.comLicao,
      concluidas: dados.concluidas,
      percentual: dados.percentual,
      total: dados.comLicao.length,
      planejadas: etapas.length - dados.comLicao.length,
      percentualPlanejado: dados.percentualPlanejado,
      emConstrucao: dados.emConstrucao,
      status: status,
      requisitos: requisitos,
      requisitosAtendidos: requisitosAtendidos,
      dominio: dominioTrilha(id)
    };
  }

  function fronteiraLiberada(comLicao) {
    let ultimoConcluido = -1;
    comLicao.forEach(function (e, i) {
      if (P.dados.estaConcluida(e.licao)) ultimoConcluido = i;
    });
    return ultimoConcluido + 1;
  }

  function statusEtapa(trilhaId, etapa) {
    if (!publicada(etapa.licao)) return 'planejada';
    if (etapa.licao && P.dados.estaConcluida(etapa.licao)) return 'concluida';
    const resumo = daTrilha(trilhaId);
    if (!resumo) return 'bloqueada';
    if (resumo.status === 'bloqueada') return 'bloqueada';
    if (!etapa.licao) return 'planejada';
    if (resumo.trilha && resumo.trilha.acessoLivre) return 'disponivel';
    const indice = resumo.comLicao.findIndex(function (e) { return e.id === etapa.id; });
    if (indice === -1) return 'bloqueada';
    if (indice <= fronteiraLiberada(resumo.comLicao)) return 'disponivel';
    return 'bloqueada';
  }

  function statusLicao(licaoId) {
    const ids = idsTrilhas();
    for (let i = 0; i < ids.length; i += 1) {
      const t = trilha(ids[i]);
      if (!t) continue;
      const etapas = etapasDaTrilha(t);
      for (let j = 0; j < etapas.length; j += 1) {
        if (etapas[j].licao === licaoId) {
          return { trilhaId: ids[i], trilha: t, etapa: etapas[j], status: statusEtapa(ids[i], etapas[j]) };
        }
      }
    }
    return null;
  }

  function idsTrilhas() {
    const manifesto = P.interno.manifesto;
    return manifesto && manifesto.trilhas ? manifesto.trilhas.map(function (t) { return t.id; }) : [];
  }

  function trilhas() {
    const manifesto = P.interno.manifesto;
    const entradas = manifesto && manifesto.trilhas ? manifesto.trilhas : [];
    return entradas.map(function (entrada) {
      return Object.assign({}, entrada, P.interno.trilhas[entrada.id] || {});
    });
  }

  function proximaEtapa() {
    const candidatas = [];
    trilhas().forEach(function (t) {
      const resumo = daTrilha(t.id);
      if (!resumo) return;
      if (resumo.status !== 'disponivel' && resumo.status !== 'em-andamento') return;
      const etapas = resumo.comLicao;
      let escolhida = null;
      let retomada = false;

      for (let i = etapas.length - 1; i >= 0; i -= 1) {
        if (P.dados.estaConcluida(etapas[i].licao)) continue;
        if (statusEtapa(t.id, etapas[i]) === 'disponivel' && P.dados.obterRegistroLicao(etapas[i].licao) && P.dados.obterRegistroLicao(etapas[i].licao).status === 'em-andamento') {
          escolhida = etapas[i];
          retomada = true;
          break;
        }
      }

      if (!escolhida) {
        for (let i = 0; i < etapas.length; i += 1) {
          if (!P.dados.estaConcluida(etapas[i].licao) && statusEtapa(t.id, etapas[i]) === 'disponivel') { escolhida = etapas[i]; break; }
        }
      }

      if (!escolhida) return;
      if (statusEtapa(t.id, escolhida) !== 'disponivel') return;
      candidatas.push({
        trilha: resumo.trilha,
        etapa: escolhida,
        nivelNome: escolhida.nivelNome,
        transversal: !!t.transversal,
        retomada: retomada
      });
    });
    const principais = candidatas.filter(function (c) { return !c.transversal; });
    const preferido = ((P.interno.manifesto || {}).percursos || []).find(function (p) { return p.nome === P.dados.estado().configuracoes.percurso; });
    const doPercurso = preferido ? candidatas.filter(function (c) { return preferido.trilhas.indexOf(c.trilha.id) !== -1; }).sort(function (a, b) { return preferido.trilhas.indexOf(a.trilha.id) - preferido.trilhas.indexOf(b.trilha.id); }) : [];
    const lista = (doPercurso.length ? doPercurso : (principais.length ? principais : candidatas)).slice().sort(function (a, b) {
      if (a.retomada === b.retomada) return 0;
      return a.retomada ? -1 : 1;
    });
    return lista.length ? lista[0] : null;
  }

  function proximaEtapaDepois(licaoId) {
    const ids = idsTrilhas();
    for (let t = 0; t < ids.length; t += 1) {
      const resumo = daTrilha(ids[t]);
      if (!resumo) continue;
      const indice = resumo.comLicao.findIndex(function (e) { return e.licao === licaoId; });
      if (indice === -1) continue;
      if (indice + 1 < resumo.comLicao.length) {
        return { trilha: resumo.trilha, etapa: resumo.comLicao[indice + 1] };
      }
      return null;
    }
    return null;
  }

  function revisaoVencida(c, incluirHoje) {
    const hoje = P.dados.hojeISO();
    if (c.agenda && c.agenda.proximaEm) {
      if (c.agenda.proximaEm <= hoje) return true;
      if (incluirHoje && c.agenda.ultimoErroEm && P.dados.dataNoFuso(c.agenda.ultimoErroEm, P.dados.estado().atividade.fuso) === hoje) return true;
      return false;
    }
    return c.erros > 0 || c.estado === 'revisar';
  }

  function conceitosParaRevisar(incluirHoje) {
    return P.dados.resumoConceitos()
      .filter(function (c) {
        if (c.acertos === 0 && c.erros === 0) return false;
        return revisaoVencida(c, incluirHoje);
      })
      .map(function (c) {
        const atraso = c.agenda && c.agenda.proximaEm ? c.agenda.proximaEm : '0000-00-00';
        const peso = c.erros * 2 - c.acertos + (c.estado === 'dificuldade' ? 3 : 0) + (c.chutesCertos || 0);
        return Object.assign({}, c, { peso: peso, atraso: atraso });
      })
      .sort(function (a, b) {
        if (a.atraso === b.atraso) return b.peso - a.peso;
        return a.atraso < b.atraso ? -1 : 1;
      });
  }

  // Índice conceito → atividades, recalculado só quando o conjunto de lições carregadas muda.
  let cacheIndice = null;
  function indiceAtividadesPorConceito() {
    const ids = Object.keys(P.interno.licoes);
    const assinatura = ids.length + ':' + ids.filter(function (id) { return P.interno.licoes[id] && P.interno.licoes[id].etapas; }).length;
    if (cacheIndice && cacheIndice.licoes === P.interno.licoes && cacheIndice.assinatura === assinatura) return cacheIndice.mapa;
    const mapa = new Map();
    ids.forEach(function (id) {
      ((P.interno.licoes[id] || {}).etapas || []).forEach(function (etapa) {
        if (!etapa || etapa.tipo !== 'atividade' || !etapa.atividade) return;
        const atv = etapa.atividade;
        (atv.conceitos || []).forEach(function (cid) {
          if (!mapa.has(cid)) mapa.set(cid, []);
          mapa.get(cid).push({ licao: id, atv: atv });
        });
      });
    });
    cacheIndice = { licoes: P.interno.licoes, assinatura: assinatura, mapa: mapa };
    return mapa;
  }

  function atividadesDeRevisao(limite, incluirHoje) {
    const alvoLimite = limite || 8;
    const alvos = conceitosParaRevisar(incluirHoje).slice(0, 8);
    const usados = {};
    const indice = indiceAtividadesPorConceito();
    const acessoCache = {};
    function acessivel(id) {
      if (!(id in acessoCache)) {
        const acesso = statusLicao(id);
        acessoCache[id] = !(acesso && acesso.status === 'bloqueada' && !P.dados.obterRegistroLicao(id));
      }
      return acessoCache[id];
    }
    const baldes = alvos.map(function (conceito) {
      const encontradas = [];
      (indice.get(conceito.id) || []).forEach(function (ref) {
        if (encontradas.length >= P.conf.maxAtividadesPorConceitoRevisao) return;
        if (!acessivel(ref.licao)) return;
        // IDs de atividade podem se repetir entre lições: a chave é lição + id.
        const chave = ref.licao + '::' + ref.atv.id;
        if (usados[chave]) return;
        usados[chave] = true;
        encontradas.push(ref.atv);
      });
      return encontradas.sort(function (a, b) {
        const pesoTipo = { 'scenario': 3, 'code-review': 3, 'debug': 3, 'interpret-code': 2, 'write-code': 2, 'fill-code': 1, 'explain': 1 };
        const pa = pesoTipo[a.tipo] || 0;
        const pb = pesoTipo[b.tipo] || 0;
        if (pa !== pb) return pb - pa;
        return Math.random() - 0.5;
      });
    }).filter(function (b) { return b.length; });

    const intercaladas = [];
    let temItens = true;
    let rodada = 0;
    while (temItens && intercaladas.length < alvoLimite) {
      temItens = false;
      for (let i = 0; i < baldes.length; i += 1) {
        const atv = baldes[i][rodada];
        if (atv) {
          intercaladas.push(atv);
          temItens = true;
          if (intercaladas.length >= alvoLimite) break;
        }
      }
      rodada += 1;
    }
    return intercaladas;
  }

  // Sessões anteriores à medição por intervalos (versões antigas) só têm minutos estimados.
  function minutosLegados(estado) {
    const intervalos = (estado.atividade && estado.atividade.intervalos) || {};
    let inicio = Infinity;
    Object.keys(intervalos).forEach(function (k) { inicio = Math.min(inicio, Number(k) * 10000); });
    return (estado.sessoes || []).reduce(function (soma, s) {
      const em = Date.parse(s && s.data);
      return (Number.isFinite(em) && em < inicio) ? soma + (Number(s.minutos) || 0) : soma;
    }, 0);
  }

  function dominioTrilha(id) {
    const conceitos = {};
    Object.keys(P.interno.licoes).forEach(function (lid) {
      const licao = P.interno.licoes[lid];
      if (licao.trilha !== id) return;
      (licao.conceitos || []).forEach(function (c) { conceitos[c] = true; });
    });
    const lista = Object.keys(conceitos).map(function (cid) {
      const d = P.dados.dominioConceito(cid);
      return d ? d.geral : 0;
    });
    if (!lista.length) return 0;
    return Math.round(lista.reduce(function (a, b) { return a + b; }, 0) / lista.length);
  }

  function competencia(competenciaId) {
    const mapa = P.interno.habilidades;
    if (!mapa || !mapa.competencias) return null;
    const c = mapa.competencias[competenciaId];
    if (!c) return null;
    return Object.assign({ id: competenciaId }, c);
  }

  function statusHabilidade(competenciaId) {
    const c = competencia(competenciaId);
    if (!c) return { estado: 'desconhecida' };
    const resumo = c.trilha ? daTrilha(c.trilha) : null;
    const dependencias = (c.dependencies || []).map(function (dep) {
      const dc = competencia(dep);
      const dr = dc && dc.trilha ? daTrilha(dc.trilha) : null;
      return {
        id: dep,
        nome: dc ? dc.nome : dep,
        percentual: dr ? dr.percentual : 0,
        dominio: dr ? dr.dominio : 0,
        atendida: dc && dc.trilha ? avaliarRequisito(dc.trilha, 100).atendido : true
      };
    });
    const bloqueada = dependencias.some(function (d) { return !d.atendida; });
    let estado = 'disponivel';
    if (bloqueada) estado = 'bloqueada';
    else if (resumo && resumo.percentual === 100 && resumo.dominio >= 80 && (c.conceitosChave || []).length && c.conceitosChave.every(function (id) { return P.dados.estadoConceito(id) === 'dominado'; })) estado = 'dominada';
    else if (resumo && resumo.concluidas.length > 0) estado = 'estudando';
    else if (!resumo || !resumo.comLicao.length) estado = 'planejada';
    return {
      competencia: c,
      estado: estado,
      percentual: resumo ? resumo.percentual : 0,
      dominio: resumo ? resumo.dominio : 0,
      dependencias: dependencias,
      trilhaResumo: resumo
    };
  }

  function checkpointProntidao(trilhaId) {
    const t = trilha(trilhaId);
    if (!t) return null;
    const mapa = P.interno.habilidades;
    let competenciaAlvo = null;
    if (mapa && mapa.competencias) {
      Object.keys(mapa.competencias).forEach(function (id) {
        if (mapa.competencias[id].trilha === trilhaId) competenciaAlvo = competencia(id);
      });
    }
    const requisitos = listaRequisitos(t);
    const conceitos = competenciaAlvo ? (competenciaAlvo.conceitosChave || []).map(function (id) {
      const d = P.dados.dominioConceito(id);
      return {
        id: id,
        nome: nomeConceito(id),
        estado: P.dados.estadoConceito(id) || 'sem-pratica',
        dominio: d ? d.geral : 0
      };
    }) : [];
    const pendentes = conceitos.filter(function (c) { return c.estado !== 'dominado'; });
    return {
      trilha: t,
      competencia: competenciaAlvo,
      requisitos: requisitos,
      conceitos: conceitos,
      pendentes: pendentes,
      pronto: requisitos.every(function (r) { return r.atendido; }) && pendentes.length === 0,
      recomendacao: pendentes.length ? 'Recomendação: faça uma revisão rápida de ' + pendentes.slice(0, 3).map(function (c) { return c.nome; }).join(', ') + ' antes de começar.' : null
    };
  }

  function resumo() {
    const estado = P.dados.estado();
    const concluidas = Object.keys(estado.licoes).filter(function (id) {
      return P.dados.estaConcluida(id);
    }).length;
    const tempo = estado.sessoes.reduce(function (soma, s) { return soma + (s.minutos || 0); }, 0);
    const conceitos = P.dados.resumoConceitos();
    const legado = minutosLegados(estado);
    const vencidas = conceitosParaRevisar();
    return {
      xp: estado.xp,
      nivel: P.dados.nivelInfo(),
      streak: estado.streak,
      licoesConcluidas: concluidas,
      tempoMinutos: Math.floor(P.dados.resumoAtividade().segundos / 60) + legado,
      tempoEstimadoLegado: tempo,
      dominados: conceitos.filter(function (c) { return c.estado === 'dominado'; }).length,
      revisar: conceitos.filter(function (c) { return c.estado === 'revisar' || c.estado === 'aprendendo'; }).length,
      dificuldade: conceitos.filter(function (c) { return c.estado === 'dificuldade'; }).length,
      totalConceitos: conceitos.length,
      revisoesVencidas: vencidas.length,
      marcos: [
        { nome: 'Primeira aula concluída', obtido: concluidas >= 1 },
        { nome: '7 dias consecutivos', obtido: estado.streak.recorde >= 7 },
        { nome: '3 conceitos com domínio demonstrado', obtido: conceitos.filter(function (c) { return c.estado === 'dominado'; }).length >= 3 },
        { nome: 'Primeira revisão concluída', obtido: estado.revisoes.length >= 1 }
      ],
      dominioMedio: conceitos.length ? Math.round(conceitos.reduce(function (soma, c) {
        return soma + ((c.dominio && c.dominio.geral) || 0);
      }, 0) / conceitos.length) : 0
    };
  }

  function coberturaCertificacao(cert) {
    if (!cert || !cert.trilhas) return 0;
    let soma = 0;
    let pesos = 0;
    Object.keys(cert.trilhas).forEach(function (id) {
      const peso = cert.trilhas[id];
      pesos += peso;
      const resumoTrilha = daTrilha(id);
      if (resumoTrilha) soma += resumoTrilha.percentual * peso;
    });
    return pesos ? Math.round(soma / pesos) : 0;
  }

  function nomeConceito(id) {
    if (P.interno.conceitos[id]) return P.interno.conceitos[id];
    return String(id).split('.').pop().replace(/-/g, ' ').replace(/^\w/, function (l) { return l.toUpperCase(); });
  }

  function niveisIngles() {
    const t = trilha('ingles');
    if (!t) return [];
    const nivelRecomendado = P.dados.obterNivelIngles ? P.dados.obterNivelIngles() : null;
    return (t.niveis || []).map(function (nivel) {
      const comLicao = (nivel.etapas || []).filter(function (e) { return publicada(e.licao); });
      const concluidas = comLicao.filter(function (e) { return P.dados.estaConcluida(e.licao); });
      const percentual = comLicao.length ? Math.round((concluidas.length / comLicao.length) * 100) : 0;
      let status = 'disponivel';
      if (comLicao.length && percentual === 100) status = 'concluido';
      else if (concluidas.length) status = 'em-andamento';
      else if (!comLicao.length) status = 'planejado';
      const recomendado = !!nivelRecomendado && nivel.id === String(nivelRecomendado).toLowerCase();
      return {
        id: nivel.id,
        nome: nivel.nome,
        descricao: nivel.descricao || '',
        percentual: percentual,
        status: status,
        recomendado: recomendado,
        total: comLicao.length,
        concluidas: concluidas.length
      };
    });
  }

  function resumoSkills() {
    return P.dados.resumoHabilidades ? P.dados.resumoHabilidades() : [];
  }

  P.progresso = {
    trilha: trilha,
    trilhas: trilhas,
    etapasDaTrilha: etapasDaTrilha,
    daTrilha: daTrilha,
    statusEtapa: statusEtapa,
    statusLicao: statusLicao,
    proximaEtapa: proximaEtapa,
    proximaEtapaDepois: proximaEtapaDepois,
    conceitosParaRevisar: conceitosParaRevisar,
    atividadesDeRevisao: atividadesDeRevisao,
    dominioTrilha: dominioTrilha,
    competencia: competencia,
    statusHabilidade: statusHabilidade,
    checkpointProntidao: checkpointProntidao,
    resumo: resumo,
    coberturaCertificacao: coberturaCertificacao,
    nomeConceito: nomeConceito,
    niveisIngles: niveisIngles,
    resumoSkills: resumoSkills
  };
})(window.Plataforma);
