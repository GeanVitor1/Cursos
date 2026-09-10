window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;
  const comp = P.ui.componentes;

  let estado = null;
  let botaoPrimario = null;
  let botaoSecundario = null;
  let infoXp = null;
  let salvoEl = null;
  let salvoTimer = null;
  let acaoPrimariaAtual = null;
  let acaoSecundariaAtual = null;
  let tecladoInstalado = false;
  let salvamentoInstalado = false;

  const rotulosConfianca = {
    certeza: 'Tenho certeza',
    acho: 'Acho que sei',
    chute: 'Estou chutando'
  };

  function iniciar(opcoes) {
    const etapas = opcoes.etapas || [];
    let indice = 0;
    let retomado = false;
    let premiadas = {};
    if (opcoes.modo === 'licao' && opcoes.licao) {
      const rascunho = P.dados.obterRascunho(opcoes.licao.id);
      if (rascunho && rascunho.indice > 0 && rascunho.indice < etapas.length) {
        indice = rascunho.indice;
        retomado = true;
      }
      premiadas = Object.assign({}, P.dados.obterEtapasPremiadas(opcoes.licao.id));
    }
    estado = {
      modo: opcoes.modo || 'licao',
      licao: opcoes.licao || null,
      etapas: etapas,
      titulo: opcoes.titulo || (opcoes.licao ? opcoes.licao.titulo : ''),
      subtitulo: opcoes.subtitulo || '',
      indice: indice,
      retomado: retomado,
      tentativas: 0,
      dicasUsadas: 0,
      socraticasUsadas: 0,
      confianca: null,
      verificada: false,
      respondida: false,
      erroRegistrado: false,
      revelado: false,
      errosSeguidos: 0,
      premiadas: premiadas,
      instancia: null,
      semPontuacao: !!opcoes.semPontuacao,
      aoFinalizar: opcoes.aoFinalizar || null,
      respostas: [],
      respostaRegistrada: false,
      xpSessao: 0,
      acertosPrimeira: 0,
      totalAtividades: etapas.filter(function (e) { return e.tipo === 'atividade'; }).length
    };
    instalarTeclado();
    instalarSalvamento();
    focarModo();
    render();
  }

  function instalarTeclado() {
    if (tecladoInstalado) return;
    tecladoInstalado = true;
    document.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Enter') return;
      const alvo = ev.target;
      if (alvo && (alvo.tagName === 'INPUT' || alvo.tagName === 'TEXTAREA' || alvo.tagName === 'BUTTON')) return;
      if (!document.querySelector('.runner')) return;
      if (acaoPrimariaAtual && !acaoPrimariaAtual.desabilitado) {
        ev.preventDefault();
        acaoPrimariaAtual.acao();
      }
    });
  }

  function etapaAtual() { return estado.etapas[estado.indice]; }

  function instalarSalvamento() {
    if (salvamentoInstalado) return;
    salvamentoInstalado = true;
    window.addEventListener('pagehide', salvarPosicao);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') salvarPosicao();
    });
  }

  function focarModo() {
    if (document.body && document.body.classList) document.body.classList.add('modo-foco');
  }

  function liberarModo() {
    if (document.body && document.body.classList) document.body.classList.remove('modo-foco');
  }

  function salvarPosicao() {
    if (estado && estado.modo === 'licao' && estado.licao) {
      P.dados.atualizarRascunho(estado.licao.id, estado.indice);
    }
  }

  function indicarSalvo() {
    if (!salvoEl) return;
    salvoEl.textContent = '✓ Progresso salvo';
    salvoEl.classList.add('visivel');
    if (salvoTimer) window.clearTimeout(salvoTimer);
    salvoTimer = window.setTimeout(function () {
      salvoEl.classList.remove('visivel');
    }, 2200);
  }

  function voltarEtapa() {
    if (!estado || estado.indice === 0) return;
    estado.indice -= 1;
    estado.retomado = false;
    salvarPosicao();
    resetarPasso();
    render();
    indicarSalvo();
  }

  function percentual() {
    if (!estado.etapas.length) return 0;
    return Math.round((estado.indice / estado.etapas.length) * 100);
  }

  function definirAcoes(primaria, secundaria) {
    acaoPrimariaAtual = primaria || null;
    acaoSecundariaAtual = secundaria || null;
    atualizarBotoes();
  }

  function atualizarBotoes() {
    if (!botaoPrimario) return;
    botaoPrimario.textContent = acaoPrimariaAtual ? acaoPrimariaAtual.rotulo : 'Continuar';
    botaoPrimario.disabled = acaoPrimariaAtual ? !!acaoPrimariaAtual.desabilitado : true;
    if (acaoSecundariaAtual) {
      botaoSecundario.hidden = false;
      botaoSecundario.textContent = acaoSecundariaAtual.rotulo;
      botaoSecundario.disabled = !!acaoSecundariaAtual.desabilitado;
    } else {
      botaoSecundario.hidden = true;
    }
  }

  function atualizarXpInfo() {
    if (!infoXp) return;
    let texto = 'XP nesta sessão: +' + estado.xpSessao;
    if (estado.modo === 'licao' && estado.licao) {
      texto += ' · bônus ao concluir: +' + (estado.licao.xp || P.conf.xpAula);
    }
    infoXp.textContent = texto;
  }

  function render() {
    const el = construir();
    P.ui.layout.definirConteudo(el);
  }

  function construir() {
    const preenchimento = criar('div', { classe: 'barra-preenchimento' });
    preenchimento.style.width = percentual() + '%';
    const barra = criar('div', { classe: 'barra barra-fina' }, [preenchimento]);

    const topo = criar('div', { classe: 'runner-topo' }, [
      criar('button', { classe: 'runner-sair', texto: '✕', title: 'Sair da etapa', onclick: sair }),
      criar('button', {
        classe: 'runner-anterior',
        texto: '‹ Anterior',
        title: 'Voltar para a etapa anterior',
        disabled: estado.indice === 0,
        onclick: voltarEtapa
      }),
      barra,
      criar('span', { classe: 'runner-contador', texto: (estado.indice + 1) + '/' + estado.etapas.length })
    ]);

    const corpo = criar('div', { classe: 'runner-corpo' });
    if (estado.retomado && estado.indice > 0) {
      corpo.appendChild(criar('div', { classe: 'aviso-retomada' }, [
        criar('span', { texto: 'Retomando de onde você parou.' }),
        criar('button', { classe: 'btn-link', texto: 'Recomeçar do início', onclick: recomecar })
      ]));
    }

    infoXp = criar('div', { classe: 'runner-xp' });
    salvoEl = criar('span', { classe: 'runner-salvo', texto: '' });
    botaoSecundario = criar('button', {
      classe: 'btn btn-fantasma',
      hidden: true,
      onclick: function () { if (acaoSecundariaAtual) acaoSecundariaAtual.acao(); }
    });
    botaoPrimario = criar('button', {
      classe: 'btn btn-primario',
      onclick: function () { if (acaoPrimariaAtual) acaoPrimariaAtual.acao(); }
    });
    const rodape = criar('div', { classe: 'runner-rodape' }, [
      criar('div', { classe: 'runner-info' }, [infoXp, salvoEl]),
      criar('div', { classe: 'runner-acoes' }, [botaoSecundario, botaoPrimario])
    ]);

    const etapa = etapaAtual();
    if (etapa.tipo === 'conteudo') renderConteudo(etapa, corpo);
    else renderAtividade(etapa, corpo);

    return criar('div', { classe: 'runner' }, [topo, corpo, rodape]);
  }

  function renderConteudo(etapa, corpo) {
    const passo = criar('div', { classe: 'passo passo-conteudo' });
    if (etapa.titulo) passo.appendChild(criar('h2', { classe: 'passo-titulo', texto: etapa.titulo }));
    (etapa.blocos || []).forEach(function (bloco) {
      const el = comp.blocoConteudo(bloco);
      if (el) passo.appendChild(el);
    });
    corpo.appendChild(passo);
    definirAcoes({ rotulo: 'Continuar', acao: avancar });
    atualizarXpInfo();
  }

  function renderAtividade(etapa, corpo) {
    const atv = etapa.atividade || {};
    const def = P.atividades.encontrar(atv.tipo);
    const passo = criar('div', { classe: 'passo passo-atividade' });

    const cabecalho = criar('div', { classe: 'atividade-cabecalho' }, [
      comp.chip(P.atividades.rotulo(atv.tipo), 'tipo'),
      atv.desafio ? comp.chip('Desafio', 'desafio') : null,
      comp.chip(P.dimensoes[P.atividades.dimensao(atv)] ? P.dimensoes[P.atividades.dimensao(atv)].nome : 'Prática', 'dimensao')
    ]);
    (atv.conceitos || []).slice(0, 3).forEach(function (id) {
      cabecalho.appendChild(comp.chipConceito(id));
    });
    passo.appendChild(cabecalho);

    if (atv.enunciado) passo.appendChild(criar('p', { classe: 'atividade-enunciado', html: P.dom.formatar(atv.enunciado) }));
    if (atv.ingles) passo.appendChild(comp.blocoIngles(atv.ingles));
    (atv.contexto || []).forEach(function (bloco) {
      const el = comp.blocoConteudo(bloco);
      if (el) passo.appendChild(el);
    });

    if (!def) {
      passo.appendChild(criar('div', { classe: 'estado-vazio' }, [
        criar('h3', { texto: 'Tipo de atividade desconhecido: ' + atv.tipo })
      ]));
      corpo.appendChild(passo);
      definirAcoes({ rotulo: 'Continuar', acao: avancar });
      return;
    }

    const area = criar('div', { classe: 'atividade-area' });
    passo.appendChild(area);

    const caixaDica = criar('div', { classe: 'dica-caixa', hidden: true });
    const caixaSocratica = criar('div', { classe: 'dica-caixa socratica', hidden: true });
    const botoesAjuda = criar('div', { classe: 'atividade-ajuda' }, [
      (atv.socratico && atv.socratico.length)
        ? criar('button', { classe: 'btn-link btn-dica', texto: 'Me guie com perguntas', onclick: mostrarProximaSocratica })
        : null,
      criar('button', { classe: 'btn-link btn-dica', texto: 'Preciso de uma dica', onclick: mostrarProximaDica })
    ]);
    passo.appendChild(botoesAjuda);
    passo.appendChild(caixaSocratica);
    passo.appendChild(caixaDica);

    const confiancaBox = criar('div', { classe: 'confianca', hidden: true });
    passo.appendChild(confiancaBox);

    const feedback = criar('div', { classe: 'feedback', hidden: true });
    passo.appendChild(feedback);

    corpo.appendChild(passo);

    const api = {
      marcarRespondida: function (valor) {
        estado.respondida = !!valor;
        if (estado.respondida) mostrarConfianca();
        if (!estado.verificada) {
          definirAcoes({ rotulo: 'Verificar', acao: verificar, desabilitado: !estado.respondida });
        }
      }
    };

    function mostrarConfianca() {
      if (!confiancaBox.hidden) return;
      confiancaBox.hidden = false;
      P.dom.limpar(confiancaBox);
      confiancaBox.appendChild(criar('span', { classe: 'confianca-rotulo', texto: 'Como você se sente nesta resposta? (opcional)' }));
      const linha = criar('div', { classe: 'confianca-opcoes' });
      ['certeza', 'acho', 'chute'].forEach(function (valor) {
        const botao = criar('button', {
          classe: 'confianca-botao',
          type: 'button',
          texto: rotulosConfianca[valor],
          onclick: function () {
            estado.confianca = valor;
            linha.querySelectorAll('.confianca-botao').forEach(function (b) { b.classList.remove('ativa'); });
            botao.classList.add('ativa');
          }
        });
        linha.appendChild(botao);
      });
      confiancaBox.appendChild(linha);
    }

    estado.feedbackEl = feedback;
    estado.caixaDica = caixaDica;
    estado.caixaSocratica = caixaSocratica;
    estado.confiancaBox = confiancaBox;
    estado.instancia = def.render(atv, area, api);
    if (estado.instancia && estado.instancia.focar) {
      window.setTimeout(function () { estado.instancia.focar(); }, 120);
    }
    definirAcoes({ rotulo: 'Verificar', acao: verificar, desabilitado: !estado.respondida });
    atualizarXpInfo();
  }

  function mostrarProximaDica() {
    const atv = etapaAtual().atividade;
    const dicas = atv.dicas || [];
    if (!estado.caixaDica || estado.dicasUsadas >= dicas.length) return;
    P.dom.limpar(estado.caixaDica);
    estado.caixaDica.hidden = false;
    estado.caixaDica.appendChild(criar('span', { classe: 'dica-marca', texto: 'Dica' }));
    estado.caixaDica.appendChild(criar('span', { html: P.dom.formatar(dicas[estado.dicasUsadas]) }));
    estado.dicasUsadas += 1;
  }

  function mostrarProximaSocratica() {
    const atv = etapaAtual().atividade;
    const perguntas = atv.socratico || [];
    const caixa = estado.caixaSocratica;
    if (!caixa || estado.socraticasUsadas >= perguntas.length) {
      if (estado.socraticasUsadas >= perguntas.length && caixa) {
        caixa.appendChild(criar('span', { classe: 'socratica-fim', texto: 'Use a dica quando quiser.' }));
      }
      return;
    }
    caixa.hidden = false;
    caixa.appendChild(criar('span', { classe: 'dica-marca', texto: 'Guia' }));
    caixa.appendChild(criar('span', { html: P.dom.formatar(perguntas[estado.socraticasUsadas]) }));
    estado.socraticasUsadas += 1;
  }

  function mostrarFeedback(tipo, titulo, texto, xp) {
    const caixa = estado.feedbackEl;
    if (!caixa) return;
    caixa.hidden = false;
    caixa.className = 'feedback ' + tipo;
    P.dom.limpar(caixa);
    caixa.appendChild(criar('div', { classe: 'feedback-titulo' }, [
      criar('span', { texto: titulo }),
      xp ? criar('span', { classe: 'feedback-xp', texto: xp }) : null
    ]));
    if (texto) caixa.appendChild(criar('div', { classe: 'feedback-texto', html: P.dom.formatar(texto) }));
  }

  function esconderFeedback() {
    if (estado.feedbackEl) {
      estado.feedbackEl.hidden = true;
      estado.feedbackEl.className = 'feedback';
    }
  }

  function feedbackDoErro(atv, resultado) {
    const partes = [];
    if (atv.feedbackErro && resultado.selecionada != null) {
      const texto = Array.isArray(atv.feedbackErro) ? atv.feedbackErro[resultado.selecionada] : atv.feedbackErro[resultado.selecionada];
      if (texto) partes.push(texto);
    }
    if (resultado.detalhes && resultado.detalhes.length) {
      resultado.detalhes.forEach(function (d) { if (d) partes.push(d); });
    }
    return partes.length ? partes.join('\n\n') : null;
  }

  function verificar() {
    const atv = etapaAtual().atividade;
    if (!estado.instancia) return;
    const resultado = estado.instancia.verificar();
    estado.verificada = true;
    estado.tentativas += 1;
    const habilidade = atv.habilidade || (Array.isArray(atv.habilidades) ? atv.habilidades[0] : null);
    const infoConceito = {
      dimensao: P.atividades.dimensao(atv),
      confianca: estado.confianca || 'acho',
      revisao: estado.modo === 'revisao'
    };
    if (estado.semPontuacao && estado.tentativas === 1 && !estado.respostaRegistrada) {
      estado.respostas.push({ id: atv.id, nivel: atv.nivel || null, correto: resultado.correto });
      estado.respostaRegistrada = true;
    }

    if (resultado.correto) {
      const jaContabil = !!estado.premiadas[estado.indice];
      const primeira = estado.tentativas === 1;
      estado.errosSeguidos = 0;
      let ganho = 0;
      if (!jaContabil && !estado.semPontuacao) {
        if (primeira) estado.acertosPrimeira += 1;
        const integro = primeira && estado.dicasUsadas === 0;
        ganho = atv.desafio
          ? (integro ? P.conf.xpDesafio : P.conf.xpDesafioRevisao)
          : (integro ? P.conf.xpAtividade : P.conf.xpAtividadeRevisao);
        estado.xpSessao += ganho;
        P.dados.adicionarXp(ganho, 'atividade');
        P.dados.responderConceito(atv.conceitos, true, primeira, infoConceito);
        estado.premiadas[estado.indice] = true;
        if (estado.modo === 'licao' && estado.licao) {
          P.dados.marcarEtapaPremiada(estado.licao.id, estado.indice);
        }
        if (habilidade) P.dados.registrarHabilidade(habilidade, true);
      }
      let texto = atv.explicacao || '';
      if (jaContabil) {
        texto += '\n\nEsta etapa já havia sido contabilizada. Você pode revisá-la à vontade, sem ganhar XP de novo.';
      } else if (infoConceito.confianca === 'chute') {
        texto += '\n\nVocê marcou que foi **chute**. Acertar sem confiança é sinal de que o conceito ainda precisa voltar — ele entra na fila de revisão.';
      } else if (infoConceito.confianca === 'certeza' && primeira) {
        texto += '\n\nSegurança registrada: isso conta como evidência forte de domínio.';
      }
      mostrarFeedback('correto', primeira ? 'Boa!' : 'Agora sim.', texto, jaContabil ? null : '+' + ganho + ' XP');
      definirAcoes({ rotulo: 'Continuar', acao: avancar });
    } else {
      const jaContabil = !!estado.premiadas[estado.indice];
      estado.errosSeguidos += 1;
      if (!estado.erroRegistrado && !jaContabil && !estado.semPontuacao) {
        P.dados.responderConceito(atv.conceitos, false, false, infoConceito);
        if (habilidade) P.dados.registrarHabilidade(habilidade, false);
      }
      estado.erroRegistrado = true;
      const detalhe = feedbackDoErro(atv, resultado);
      const pressao = estado.errosSeguidos >= P.conf.errosParaAjudaExtra;
      if (estado.tentativas === 1) {
        if (estado.dicasUsadas === 0) mostrarProximaDica();
        else if (estado.caixaDica) estado.caixaDica.hidden = false;
        let mensagem = detalhe || 'Leia a dica com atenção e tente novamente. Errar faz parte do método.';
        if (pressao) mensagem += '\n\nVamos com calma: use a dica abaixo e resolva por partes.';
        mostrarFeedback('errado', pressao ? 'Sem pressa.' : 'Não exatamente.', mensagem, null);
        definirAcoes({ rotulo: 'Tentar novamente', acao: tentarNovamente });
      } else {
        let mensagem = detalhe ? detalhe + '\n\n' : '';
        mensagem += 'Você pode tentar de novo ou ver a resposta — o conceito volta na revisão.';
        mostrarFeedback('errado', 'Ainda não.', mensagem, null);
        definirAcoes(
          { rotulo: 'Tentar novamente', acao: tentarNovamente },
          { rotulo: 'Ver resposta', acao: revelar }
        );
      }
    }
    atualizarXpInfo();
  }

  function tentarNovamente() {
    estado.verificada = false;
    estado.respondida = false;
    estado.confianca = null;
    if (estado.confiancaBox) estado.confiancaBox.hidden = true;
    if (estado.instancia && estado.instancia.prepararNovaTentativa) estado.instancia.prepararNovaTentativa();
    esconderFeedback();
    definirAcoes({ rotulo: 'Verificar', acao: verificar, desabilitado: !estado.respondida });
  }

  function revelar() {
    const atv = etapaAtual().atividade;
    const jaContabil = !!estado.premiadas[estado.indice];
    const habilidade = atv.habilidade || (Array.isArray(atv.habilidades) ? atv.habilidades[0] : null);
    if (estado.semPontuacao && !estado.respostaRegistrada) {
      estado.respostas.push({ id: atv.id, nivel: atv.nivel || null, correto: false });
      estado.respostaRegistrada = true;
    }
    if (estado.instancia && estado.instancia.revelar) estado.instancia.revelar();
    if (!jaContabil && !estado.erroRegistrado && !estado.semPontuacao) {
      P.dados.responderConceito(atv.conceitos, false, false, {
        dimensao: P.atividades.dimensao(atv),
        confianca: estado.confianca || 'acho',
        revisao: estado.modo === 'revisao'
      });
      if (habilidade) P.dados.registrarHabilidade(habilidade, false);
    }
    estado.erroRegistrado = true;
    if (!estado.revelado && !jaContabil && !estado.semPontuacao) {
      estado.revelado = true;
      estado.xpSessao += P.conf.xpRevelado;
      P.dados.adicionarXp(P.conf.xpRevelado, 'esforco');
    }
    mostrarFeedback('revelado', 'Resposta revelada.', atv.explicacao, (jaContabil || estado.semPontuacao) ? null : '+' + P.conf.xpRevelado + ' XP');
    definirAcoes({ rotulo: 'Continuar', acao: avancar });
    atualizarXpInfo();
  }

  function avancar() {
    estado.indice += 1;
    if (estado.indice >= estado.etapas.length) {
      finalizar();
      return;
    }
    salvarPosicao();
    resetarPasso();
    render();
    indicarSalvo();
  }

  function resetarPasso() {
    estado.tentativas = 0;
    estado.dicasUsadas = 0;
    estado.socraticasUsadas = 0;
    estado.confianca = null;
    estado.verificada = false;
    estado.respondida = false;
    estado.erroRegistrado = false;
    estado.revelado = false;
    estado.respostaRegistrada = false;
    estado.instancia = null;
    estado.feedbackEl = null;
    estado.caixaDica = null;
    estado.caixaSocratica = null;
    estado.confiancaBox = null;
  }

  function recomecar() {
    estado.indice = 0;
    estado.retomado = false;
    estado.xpSessao = 0;
    estado.acertosPrimeira = 0;
    estado.errosSeguidos = 0;
    estado.premiadas = (estado.modo === 'licao' && estado.licao)
      ? Object.assign({}, P.dados.obterEtapasPremiadas(estado.licao.id))
      : {};
    if (estado.modo === 'licao' && estado.licao) P.dados.limparRascunho(estado.licao.id);
    resetarPasso();
    render();
  }

  async function sair() {
    const ehNivelamento = estado.modo === 'nivelamento';
    const confirmou = await comp.confirmar({
      titulo: ehNivelamento ? 'Sair do teste de nivelamento?' : 'Sair da etapa?',
      texto: ehNivelamento
        ? 'As respostas do teste não ficam salvas. Você pode refazer quando quiser.'
        : 'Seu avanço fica salvo automaticamente e você pode continuar exatamente daqui depois.',
      rotuloOk: 'Sair',
      rotuloCancelar: ehNivelamento ? 'Continuar o teste' : 'Continuar estudando'
    });
    if (!confirmou) return;
    if (!ehNivelamento) salvarPosicao();
    liberarModo();
    if (estado.modo === 'licao' && estado.licao) {
      P.roteador.ir('#/trilha/' + estado.licao.trilha);
    } else if (ehNivelamento) {
      P.roteador.ir('#/nivelamento');
    } else {
      P.roteador.ir('#/');
    }
  }

  function conceitosDasEtapas() {
    const vistos = {};
    estado.etapas.forEach(function (etapa) {
      if (etapa.tipo !== 'atividade' || !etapa.atividade) return;
      (etapa.atividade.conceitos || []).forEach(function (c) { vistos[c] = true; });
    });
    return Object.keys(vistos);
  }

  function finalizar() {
    liberarModo();
    if (typeof estado.aoFinalizar === 'function') {
      estado.aoFinalizar({
        respostas: estado.respostas,
        totalAtividades: estado.totalAtividades,
        modo: estado.modo
      });
      return;
    }
    const total = estado.totalAtividades || 1;
    const aproveitamento = Math.round((estado.acertosPrimeira / total) * 100);
    const resumo = {
      modo: estado.modo,
      licao: estado.licao,
      titulo: estado.titulo,
      xpAtividades: estado.xpSessao,
      bonus: 0,
      aproveitamento: aproveitamento,
      acertosPrimeira: estado.acertosPrimeira,
      totalAtividades: estado.totalAtividades,
      errosSeguidos: estado.errosSeguidos,
      conceitos: (estado.licao && estado.licao.conceitos) ? estado.licao.conceitos : conceitosDasEtapas()
    };

    if (estado.modo === 'licao' && estado.licao) {
      const resultado = P.dados.concluirLicao(estado.licao.id, { aproveitamento: aproveitamento });
      resumo.bonus = resultado.bonus;
      resumo.primeiraVez = resultado.primeiraVez;
    } else if (estado.modo === 'revisao') {
      resumo.bonus = P.dados.registrarRevisao({
        conceitos: resumo.conceitos,
        acertos: estado.acertosPrimeira,
        erros: Math.max(0, total - estado.acertosPrimeira),
        minutos: Math.max(5, total * 2)
      });
    }

    P.ui.conclusao.mostrar(resumo);
  }

  P.ui.runner = {
    iniciar: iniciar,
    acaoPrimaria: function () {
      if (acaoPrimariaAtual && !acaoPrimariaAtual.desabilitado) acaoPrimariaAtual.acao();
    }
  };
})(window.Plataforma);
