window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;
  const comp = P.ui.componentes;

  function saudacao() {
    const hora = new Date().getHours();
    if (hora < 12) return 'Bom dia.';
    if (hora < 18) return 'Boa tarde.';
    return 'Boa noite.';
  }

  function formatarTempo(minutos) {
    if (minutos < 60) return minutos + ' min';
    const horas = Math.floor(minutos / 60);
    const resto = minutos % 60;
    return horas + 'h' + (resto ? ' ' + resto + 'min' : '');
  }

  function chipStatus(status) {
    const mapa = {
      bloqueada: ['🔒 Bloqueada', null],
      planejada: ['Planejada', null],
      disponivel: ['Disponível', 'primaria'],
      'em-andamento': ['Em andamento', 'aviso'],
      concluida: ['Concluída', 'sucesso']
    };
    const def = mapa[status] || mapa.disponivel;
    return comp.chip(def[0], def[1]);
  }

  function statCard(valor, rotulo) {
    return criar('div', { classe: 'stat-card' }, [
      criar('span', { classe: 'stat-valor', texto: String(valor) }),
      criar('span', { classe: 'stat-rotulo', texto: rotulo })
    ]);
  }

  function cartaoContinua(proxima) {
    const cartao = criar('div', { classe: 'cartao cartao-continua' });
    if (!proxima) {
      cartao.appendChild(criar('span', { classe: 'continua-trilha', texto: 'Tudo em dia' }));
      cartao.appendChild(criar('h2', { classe: 'continua-titulo', texto: 'Você concluiu todo o conteúdo disponível.' }));
      cartao.appendChild(criar('p', { classe: 'muted', texto: 'As próximas trilhas estão em produção. Aproveite para revisar conceitos ou começar um projeto.' }));
      cartao.appendChild(comp.botao('Ir para revisão', { tipo: 'suave', onclick: function () { P.roteador.ir('#/revisao'); } }));
      return cartao;
    }
    const etapa = proxima.etapa;
    const licao = P.interno.licoes[etapa.licao] || {};
    const rascunho = P.dados.obterRascunho(etapa.licao);
    const resumoTrilha = P.progresso.daTrilha(proxima.trilha.id);
    cartao.appendChild(criar('span', { classe: 'continua-trilha', texto: proxima.trilha.nome + ' · ' + proxima.nivelNome }));
    cartao.appendChild(criar('h2', { classe: 'continua-titulo', texto: etapa.titulo }));
    cartao.appendChild(criar('div', { classe: 'continua-meta' }, [
      comp.chip((licao.duracaoMin || etapa.duracao || 40) + ' min'),
      comp.chip('+' + (licao.xp || P.conf.xpAula) + ' XP'),
      comp.chip(rascunho ? 'Em andamento' : 'Nova etapa', rascunho ? 'primaria' : null)
    ]));
    cartao.appendChild(criar('div', { classe: 'continua-barra' }, [
      comp.barra(resumoTrilha.percentual),
      criar('span', { classe: 'pct', texto: resumoTrilha.percentual + '%' })
    ]));
    cartao.appendChild(comp.botao(rascunho ? 'Continuar etapa' : 'Começar etapa', {
      onclick: function () { P.roteador.ir('#/licao/' + etapa.licao); }
    }));
    return cartao;
  }

  function cartaoSessao() {
    let escolhido = 30;
    const cartao = criar('div', { classe: 'cartao sessoes' });
    cartao.appendChild(criar('div', { classe: 'cartao-titulo' }, [
      criar('h2', { texto: 'Quanto tempo você tem hoje?' }),
      criar('span', { classe: 'pequeno fraco', texto: 'a sessão se adapta ao seu tempo' })
    ]));
    const container = criar('div', { classe: 'sessao-opcoes' });
    const botoes = [];
    const descricoes = {
      5: { rotulo: '⚡ 5 minutos', texto: 'Revisão relâmpago' },
      15: { rotulo: '☕ 15 minutos', texto: 'Alguns exercícios' },
      30: { rotulo: '📚 30 minutos', texto: 'Uma microaula' },
      60: { rotulo: '🧠 60 minutos', texto: 'Aula + prática + desafio' }
    };
    [5, 15, 30, 60].forEach(function (minutos) {
      const def = descricoes[minutos];
      const botao = criar('button', {
        classe: 'sessao-opcao' + (minutos === escolhido ? ' ativa' : ''),
        onclick: function () {
          escolhido = minutos;
          botoes.forEach(function (b) { b.elemento.classList.toggle('ativa', b.minutos === minutos); });
        }
      }, [
        criar('strong', { texto: def.rotulo }),
        criar('span', { texto: def.texto })
      ]);
      botoes.push({ minutos: minutos, elemento: botao });
      container.appendChild(botao);
    });
    cartao.appendChild(container);
    cartao.appendChild(criar('div', { classe: 'plano-sessao' }, [
      criar('p', { texto: 'O cronômetro acompanha no topo. Ao terminar, você decide se continua.' }),
      comp.botao('Iniciar sessão', {
        onclick: function () { iniciarSessao(escolhido); }
      })
    ]));
    return cartao;
  }

  function iniciarSessao(minutos) {
    P.sessao.iniciar(minutos, 'estudo');
    const revisao = P.progresso.conceitosParaRevisar();
    const proxima = P.progresso.proximaEtapa();
    if (minutos <= 5) {
      if (revisao.length) {
        P.roteador.ir('#/revisao/5');
        return;
      }
      P.ui.layout.toast('Nada vencido para revisar. Siga para a próxima etapa quando puder.', 'aviso');
      if (proxima) P.roteador.ir('#/licao/' + proxima.etapa.licao);
      return;
    }
    if (minutos <= 15 && revisao.length) {
      P.roteador.ir('#/revisao/8');
      return;
    }
    if (proxima) {
      P.roteador.ir('#/licao/' + proxima.etapa.licao);
      return;
    }
    if (revisao.length) {
      P.roteador.ir('#/revisao/8');
      return;
    }
    P.ui.layout.toast('Nada pendente agora. Bom trabalho!', 'sucesso');
  }

  function cartaoRevisao(conceitos) {
    const cartao = criar('div', { classe: 'cartao' });
    cartao.appendChild(criar('div', { classe: 'cartao-titulo' }, [
      criar('h2', { texto: 'Revisão rápida' }),
      conceitos.length ? comp.chip(conceitos.length + (conceitos.length === 1 ? ' conceito' : ' conceitos'), 'aviso') : null
    ]));
    if (!conceitos.length) {
      cartao.appendChild(criar('p', { classe: 'muted', texto: 'Nenhum conceito pendente. Os erros que você cometer voltam para cá, por repetição espaçada.' }));
      return cartao;
    }
    cartao.appendChild(criar('p', { classe: 'muted', texto: 'Estes pontos precisam de reforço: ' + conceitos.slice(0, 4).map(function (c) { return P.progresso.nomeConceito(c.id); }).join(', ') + '.' }));
    cartao.appendChild(comp.botao('Revisar por 10 min', {
      tipo: 'suave',
      onclick: function () {
        P.sessao.iniciar(10, 'revisao');
        P.roteador.ir('#/revisao');
      }
    }));
    return cartao;
  }

  function cartaoTrilhas() {
    const cartao = criar('div', { classe: 'cartao' });
    cartao.appendChild(criar('div', { classe: 'cartao-titulo' }, [
      criar('h2', { texto: 'Trilhas' }),
      criar('span', { classe: 'pequeno fraco', texto: 'progresso por assunto' })
    ]));
    const lista = criar('div', { classe: 'tracks-lista' });
    P.progresso.trilhas().forEach(function (t) {
      const resumo = P.progresso.daTrilha(t.id);
      lista.appendChild(criar('button', {
        classe: 'trilha-linha',
        onclick: function () { P.roteador.ir('#/trilha/' + t.id); }
      }, [
        criar('span', { classe: 'trilha-sigla', texto: t.sigla || '•' }),
        criar('div', { classe: 'trilha-linha-info' }, [
          criar('strong', { texto: t.nome }),
          resumo.status === 'bloqueada'
            ? criar('div', { classe: 'pequeno fraco', texto: 'Requer: ' + resumo.requisitos.filter(function (r) { return !r.atendido; }).map(function (r) { return r.nome; }).join(', ') })
            : null,
          comp.barra(resumo.percentual)
        ]),
        criar('div', { classe: 'trilha-linha-meta' }, [
          chipStatus(resumo.status),
          criar('span', { classe: 'pct', texto: resumo.percentual + '%' })
        ])
      ]));
    });
    cartao.appendChild(lista);
    return cartao;
  }

  function cartaoRoadmap() {
    const proxima = P.progresso.proximaEtapa();
    const trilhaAtual = proxima ? P.progresso.trilha(proxima.trilha.id) : null;
    const faseAtual = trilhaAtual ? trilhaAtual.fase : null;
    const cartao = criar('div', { classe: 'cartao' });
    cartao.appendChild(criar('div', { classe: 'cartao-titulo' }, [
      criar('h2', { texto: 'Plano de formação' }),
      criar('span', { classe: 'pequeno fraco', texto: '9 fases até sistemas distribuídos' })
    ]));
    const roadmap = criar('div', { classe: 'roadmap' });
    (P.interno.manifesto.fases || []).forEach(function (fase) {
      const chips = fase.trilhas.map(function (id) {
        const t = P.progresso.trilha(id);
        if (!t) return null;
        const resumo = P.progresso.daTrilha(id);
        const prefixo = resumo && resumo.status === 'bloqueada' ? '🔒 ' : '';
        return comp.chip(prefixo + (t.curto || t.nome), faseAtual === fase.id ? 'primaria' : null);
      });
      roadmap.appendChild(criar('div', { classe: 'fase-linha' + (faseAtual === fase.id ? ' atual' : '') }, [
        criar('div', { classe: 'fase-numero', texto: fase.id }),
        criar('div', { classe: 'fase-info' }, [
          criar('strong', { texto: fase.nome }),
          criar('p', { texto: fase.descricao }),
          criar('div', { classe: 'fase-trilhas' }, chips)
        ])
      ]));
    });
    cartao.appendChild(roadmap);
    return cartao;
  }

  function render() {
    const resumo = P.progresso.resumo();
    const proxima = P.progresso.proximaEtapa();
    const conceitos = P.progresso.conceitosParaRevisar();
    const pagina = criar('div', { classe: 'home' });

    pagina.appendChild(criar('div', { classe: 'saudacao' }, [
      criar('h1', { texto: saudacao() }),
      criar('p', { texto: 'Vamos avançar sua formação Full Stack .NET — uma etapa por vez.' })
    ]));

    const stats = criar('div', { classe: 'home-stats' }, [
      statCard('🔥 ' + resumo.streak.atual, resumo.streak.atual === 1 ? 'dia estudando' : 'dias estudando'),
      statCard('Nível ' + resumo.nivel.nivel, resumo.nivel.xp + ' XP · faltam ' + Math.max(0, resumo.nivel.proximo - resumo.nivel.xp) + ' para subir'),
      statCard(resumo.licoesConcluidas, 'etapas concluídas'),
      statCard(formatarTempo(resumo.tempoMinutos), 'tempo estimado de estudo')
    ]);

    pagina.appendChild(criar('div', { classe: 'home-grid' }, [cartaoContinua(proxima), stats]));
    pagina.appendChild(cartaoSessao());
    pagina.appendChild(cartaoRevisao(conceitos));
    pagina.appendChild(cartaoTrilhas());
    pagina.appendChild(cartaoRoadmap());

    P.ui.layout.definirConteudo(pagina);
  }

  P.ui.inicio = { render: render };
})(window.Plataforma);
