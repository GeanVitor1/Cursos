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

  function percentualTrilha(t) {
    const comLicao = etapasDaTrilha(t).filter(function (e) { return !!e.licao; });
    const concluidas = comLicao.filter(function (e) { return P.dados.estaConcluida(e.licao); });
    return {
      comLicao: comLicao,
      concluidas: concluidas,
      percentual: comLicao.length ? Math.round((concluidas.length / comLicao.length) * 100) : 0
    };
  }

  function listaRequisitos(t) {
    return (t.prerequisitos || []).map(function (req) {
      const alvo = trilha(req.trilha);
      const dados = alvo ? percentualTrilha(alvo) : { percentual: 0 };
      const minimo = typeof req.min === 'number' ? req.min : 100;
      return {
        trilha: req.trilha,
        nome: alvo ? (alvo.nome || req.trilha) : req.trilha,
        min: minimo,
        percentual: alvo ? dados.percentual : 0,
        atendido: alvo ? dados.percentual >= minimo : false
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
        if (P.dados.obterRascunho(etapas[i].licao)) {
          escolhida = etapas[i];
          retomada = true;
          break;
        }
      }

      if (!escolhida) {
        let ultimoComRegistro = -1;
        etapas.forEach(function (e, i) {
          if (P.dados.obterRegistroLicao(e.licao)) ultimoComRegistro = i;
        });
        for (let i = ultimoComRegistro + 1; i < etapas.length; i += 1) {
          if (!P.dados.estaConcluida(etapas[i].licao)) { escolhida = etapas[i]; break; }
        }
        if (!escolhida) {
          for (let i = 0; i < etapas.length; i += 1) {
            if (!P.dados.estaConcluida(etapas[i].licao)) { escolhida = etapas[i]; break; }
          }
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
    const lista = (principais.length ? principais : candidatas).slice().sort(function (a, b) {
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
      if (incluirHoje && c.agenda.ultimoErroEm && String(c.agenda.ultimoErroEm).slice(0, 10) === hoje) return true;
      return false;
    }
    return c.erros > 0 || c.estado === 'revisar';
  }

  function conceitosParaRevisar(incluirHoje) {
    return P.dados.resumoConceitos()
      .filter(function (c) {
        if (c.estado === 'dominado') return false;
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

  function atividadesDeRevisao(limite, incluirHoje) {
    const alvoLimite = limite || 8;
    const alvos = conceitosParaRevisar(incluirHoje).slice(0, 8);
    const usados = {};
    const baldes = alvos.map(function (conceito) {
      const encontradas = [];
      Object.keys(P.interno.licoes).forEach(function (id) {
        if (encontradas.length >= P.conf.maxAtividadesPorConceitoRevisao) return;
        const licao = P.interno.licoes[id];
        (licao.etapas || []).forEach(function (etapa) {
          if (encontradas.length >= P.conf.maxAtividadesPorConceitoRevisao) return;
          if (etapa.tipo !== 'atividade' || !etapa.atividade) return;
          const atv = etapa.atividade;
          if (!atv.conceitos || atv.conceitos.indexOf(conceito.id) === -1) return;
          if (usados[atv.id]) return;
          usados[atv.id] = true;
          encontradas.push(atv);
        });
      });
      return P.dom.embaralhar(encontradas);
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
    }).filter(function (v) { return v > 0; });
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
        atendida: dr ? dr.percentual >= 100 : true
      };
    });
    const bloqueada = dependencias.some(function (d) { return !d.atendida; });
    let estado = 'disponivel';
    if (bloqueada) estado = 'bloqueada';
    else if (resumo && resumo.percentual === 100) estado = 'dominada';
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
    const vencidas = conceitosParaRevisar();
    return {
      xp: estado.xp,
      nivel: P.dados.nivelInfo(),
      streak: estado.streak,
      licoesConcluidas: concluidas,
      tempoMinutos: tempo,
      dominados: conceitos.filter(function (c) { return c.estado === 'dominado'; }).length,
      revisar: conceitos.filter(function (c) { return c.estado === 'revisar' || c.estado === 'aprendendo'; }).length,
      dificuldade: conceitos.filter(function (c) { return c.estado === 'dificuldade'; }).length,
      totalConceitos: conceitos.length,
      revisoesVencidas: vencidas.length,
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
      const comLicao = (nivel.etapas || []).filter(function (e) { return e.licao; });
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
