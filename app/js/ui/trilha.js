window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;
  const comp = P.ui.componentes;

  function chipStatus(status) {
    const mapa = {
      bloqueada: ['🔒 Bloqueada', null],
      planejada: ['Planejada', null],
      disponivel: ['Disponível', 'primaria'],
      'em-andamento': ['Em andamento', 'aviso'],
      concluida: ['Concluída', 'sucesso']
    };
    const def = mapa[status] || mapa.planejada;
    return comp.chip(def[0], def[1]);
  }

  function abrirEtapa(trilhaId, etapa, status) {
    if (status === 'planejada') {
      P.ui.layout.toast('Etapa planejada — será liberada em uma próxima fase.', 'aviso');
      return;
    }
    if (status === 'bloqueada') {
      P.ui.layout.toast('Conclua a etapa anterior para liberar esta.', 'aviso');
      return;
    }
    P.roteador.ir('#/licao/' + etapa.licao);
  }

  function linhaEtapa(trilhaId, etapa) {
    const status = P.progresso.statusEtapa(trilhaId, etapa);
    const registro = etapa.licao ? P.dados.obterRegistroLicao(etapa.licao) : null;
    const prova = etapa.tipo === 'prova';
    const icones = { concluida: '✓', disponivel: prova ? '★' : '▶', bloqueada: '🔒', planejada: '·' };
    const classeIcone = status === 'concluida' ? 'concluida' : (status === 'disponivel' ? (prova ? 'prova' : 'disponivel') : '');

    let meta = '';
    if (status === 'concluida') {
      meta = 'Concluída';
      if (registro && registro.melhorAproveitamento) meta += ' · melhor resultado: ' + registro.melhorAproveitamento + '%';
    } else if (status === 'disponivel') {
      meta = (etapa.duracao ? etapa.duracao + ' min' : '') + (prova ? ' · prova de nível' : (registro && registro.rascunho ? ' · em andamento' : ''));
    } else if (status === 'bloqueada') {
      meta = 'Bloqueada';
    } else {
      meta = 'Planejada';
    }

    const titulo = criar('div', { classe: 'etapa-titulo' }, [
      criar('span', { texto: etapa.titulo }),
      prova ? comp.chip('Prova', 'aviso') : null
    ]);

    return criar('button', {
      classe: 'etapa ' + status,
      onclick: function () { abrirEtapa(trilhaId, etapa, status); }
    }, [
      criar('span', { classe: 'etapa-icone ' + classeIcone, texto: icones[status] || '·' }),
      criar('div', { classe: 'etapa-conteudo' }, [
        titulo,
        criar('div', { classe: 'etapa-meta', texto: meta })
      ]),
      criar('span', { classe: 'etapa-seta', texto: status === 'disponivel' || status === 'concluida' ? '›' : '' })
    ]);
  }

  function cartaoIngles() {
    const cartao = criar('div', { classe: 'cartao english-painel' });
    const nivelAtual = P.dados.obterNivelIngles ? P.dados.obterNivelIngles() : null;
    cartao.appendChild(criar('div', { classe: 'cartao-titulo' }, [
      criar('h2', { texto: 'Seu inglês' }),
      nivelAtual ? comp.chip('Nível de partida: ' + nivelAtual, 'primaria') : comp.chip('Sem teste de nivelamento', 'aviso')
    ]));

    const rotulos = {
      concluido: ['✅ Concluído', 'sucesso'],
      'em-andamento': ['🟡 Em andamento', 'aviso'],
      disponivel: ['▶ Disponível', 'primaria'],
      planejado: ['🔒 Planejado', null]
    };

    const niveis = P.progresso.niveisIngles();
    const blocoNiveis = criar('div', { classe: 'english-niveis' });
    niveis.forEach(function (n) {
      const rotulo = rotulos[n.status] || rotulos.planejado;
      blocoNiveis.appendChild(criar('div', { classe: 'nivel-ingles-linha' + (n.recomendado ? ' recomendado' : '') }, [
        criar('span', { classe: 'nivel-ingles-nome', texto: n.nome }),
        comp.barra(n.percentual),
        criar('span', { classe: 'pct', texto: n.percentual + '%' }),
        comp.chip(n.recomendado ? '★ Comece aqui' : rotulo[0], n.recomendado ? 'primaria' : rotulo[1])
      ]));
    });
    cartao.appendChild(blocoNiveis);
    if (!nivelAtual) {
      cartao.appendChild(criar('p', { classe: 'pequeno muted', texto: 'Não sabe por onde começar? Faça o teste de nivelamento (10 questões, sem XP). Ele recomenda um nível, mas você continua livre para estudar qualquer unidade.' }));
    }

    cartao.appendChild(criar('h3', { texto: 'Habilidades' }));
    const skills = P.progresso.resumoSkills();
    const grade = criar('div', { classe: 'skills-grade' });
    skills.forEach(function (s) {
      if (s.nome === 'speaking') {
        grade.appendChild(criar('div', { classe: 'skill-item' }, [
          criar('span', { classe: 'skill-nome', texto: s.rotulo }),
          comp.chip('Em breve', null)
        ]));
        return;
      }
      grade.appendChild(criar('div', { classe: 'skill-item' }, [
        criar('span', { classe: 'skill-nome', texto: s.rotulo }),
        comp.barra(s.percentual, 'fina'),
        criar('span', { classe: 'pct', texto: s.percentual + '%' }),
        criar('span', { classe: 'pequeno fraco', texto: s.tentativas ? s.acertos + '/' + s.tentativas : '—' })
      ]));
    });
    cartao.appendChild(grade);

    cartao.appendChild(criar('div', { classe: 'conclusao-acoes' }, [
      comp.botao(nivelAtual ? 'Refazer teste de nivelamento' : 'Fazer teste de nivelamento', {
        onclick: function () { P.roteador.ir('#/nivelamento'); }
      })
    ]));
    return cartao;
  }

  function render(params) {
    const resumo = P.progresso.daTrilha(params.id);
    if (!resumo) {
      P.ui.layout.naoEncontrado();
      return;
    }
    const t = resumo.trilha;
    const duracaoTotal = resumo.comLicao.reduce(function (soma, e) { return soma + (e.duracao || 0); }, 0);
    const pagina = criar('div', { classe: 'pagina' });

    pagina.appendChild(criar('div', { classe: 'trilha-cabecalho' }, [
      criar('h1', {}, [
        t.sigla ? criar('span', { classe: 'trilha-sigla', texto: t.sigla }) : null,
        criar('span', { texto: t.nome })
      ]),
      criar('p', { classe: 'trilha-intro', texto: t.descricao || '' }),
      criar('div', { classe: 'trilha-resumo' }, [
        chipStatus(resumo.status),
        criar('span', {}, [criar('strong', { texto: resumo.concluidas.length + ' de ' + resumo.total }), document.createTextNode(' etapas interativas concluídas')]),
        resumo.planejadas ? criar('span', {}, [criar('strong', { texto: String(resumo.planejadas) }), document.createTextNode(' etapas no roadmap')]) : null,
        duracaoTotal ? criar('span', {}, [criar('strong', { texto: '~' + duracaoTotal + ' min' }), document.createTextNode(' de conteúdo liberado')]) : null
      ]),
      criar('div', { classe: 'continua-barra' }, [
        comp.barra(resumo.percentual),
        criar('span', { classe: 'pct', texto: resumo.percentual + '%' })
      ])
    ]));

    if (t.id === 'ingles') {
      pagina.appendChild(cartaoIngles());
    }

    if (resumo.status === 'bloqueada') {
      const pendentes = resumo.requisitos.filter(function (r) { return !r.atendido; });
      const cartao = criar('div', { classe: 'cartao' });
      cartao.appendChild(criar('h3', { texto: '🔒 Pré-requisitos pendentes' }));
      cartao.appendChild(criar('p', { classe: 'muted pequeno', texto: 'Esta trilha usa conceitos de outras trilhas. Conclua os itens abaixo para estudar na ordem correta e entender tudo com segurança.' }));
      const lista = criar('div', { classe: 'requisitos-lista' });
      pendentes.forEach(function (req) {
        lista.appendChild(criar('div', { classe: 'requisito-linha' }, [
          criar('div', { classe: 'requisito-info' }, [
            criar('strong', { texto: req.nome }),
            criar('span', { classe: 'pequeno fraco', texto: req.percentual + '% de ' + req.min + '% necessário' }),
            comp.barra(req.percentual)
          ]),
          comp.botao('Abrir trilha', { tipo: 'suave', onclick: function () { P.roteador.ir('#/trilha/' + req.trilha); } })
        ]));
      });
      cartao.appendChild(lista);
      pagina.appendChild(cartao);
    } else if (resumo.status === 'planejada') {
      pagina.appendChild(criar('div', { classe: 'bloco-nota info' }, [
        criar('span', { classe: 'nota-marca', texto: 'i' }),
        criar('div', { texto: 'Pré-requisitos já atendidos. Esta trilha está planejada e o roadmap abaixo mostra a ordem prevista das etapas — o conteúdo interativo entra nas próximas fases do projeto.' })
      ]));
    } else {
      const prontidao = P.progresso.checkpointProntidao(t.id);
      const primeira = resumo.comLicao[0];
      const jaComecou = resumo.concluidas.length > 0 || (primeira && P.dados.obterRascunho(primeira.licao));
      if (prontidao && primeira && !jaComecou) {
        const cartao = criar('div', { classe: 'cartao cartao-prontidao' });
        cartao.appendChild(criar('h3', { texto: 'Checkpoint de prontidão' }));
        cartao.appendChild(criar('p', { classe: 'muted pequeno', texto: 'Antes de começar, confira se os conhecimentos que esta trilha reutiliza já estão firmes. Você pode começar mesmo assim — só fica mais difícil sem a base.' }));
        if (prontidao.requisitos.length) {
          const listaReq = criar('div', { classe: 'requisitos' });
          prontidao.requisitos.forEach(function (r) {
            listaReq.appendChild(comp.chip((r.atendido ? '✅ ' : '🟡 ') + r.nome + ' · ' + r.percentual + '%', r.atendido ? 'sucesso' : 'aviso'));
          });
          cartao.appendChild(listaReq);
        }
        if (prontidao.conceitos.length) {
          const grade = criar('div', { classe: 'prontidao-grade' });
          prontidao.conceitos.forEach(function (c) {
            const simbolo = c.estado === 'dominado' ? '✅' : (c.estado === 'sem-pratica' ? '⚪' : '🟡');
            grade.appendChild(criar('div', { classe: 'prontidao-item' }, [
              criar('span', { texto: simbolo + ' ' + c.nome }),
              comp.barra(c.dominio, 'fina'),
              criar('span', { classe: 'dominio-pct', texto: c.dominio + '%' })
            ]));
          });
          cartao.appendChild(grade);
        }
        if (prontidao.recomendacao) {
          cartao.appendChild(criar('div', { classe: 'bloco-nota atencao' }, [
            criar('span', { classe: 'nota-marca', texto: '!' }),
            criar('div', { texto: prontidao.recomendacao })
          ]));
        }
        cartao.appendChild(criar('div', { classe: 'conclusao-acoes' }, [
          comp.botao(prontidao.recomendacao ? 'Começar mesmo assim' : 'Estou pronto — começar', {
            onclick: function () { P.roteador.ir('#/licao/' + primeira.licao); }
          }),
          prontidao.pendentes.length
            ? comp.botao('Revisar antes — 5 min', {
              tipo: 'suave',
              onclick: function () {
                P.sessao.iniciar(5, 'revisao');
                P.roteador.ir('#/revisao/5');
              }
            })
            : null
        ]));
        pagina.appendChild(cartao);
      }
    }

    (t.niveis || []).forEach(function (nivel) {
      const bloco = criar('div', { classe: 'nivel-bloco' });
      bloco.appendChild(criar('div', { classe: 'nivel-titulo' }, [
        criar('h2', { texto: nivel.nome }),
        comp.chip(String((nivel.etapas || []).length) + ' etapas')
      ]));
      const lista = criar('div', { classe: 'lista-etapas' });
      (nivel.etapas || []).forEach(function (etapa) {
        lista.appendChild(linhaEtapa(t.id, Object.assign({}, etapa, { nivelNome: nivel.nome })));
      });
      bloco.appendChild(lista);
      pagina.appendChild(bloco);
    });

    if (t.id !== 'sql' && resumo.status === 'disponivel') {
      pagina.appendChild(criar('p', { classe: 'fraco pequeno', texto: 'Conteúdo desta trilha em produção. O roadmap acima reflete o currículo planejado.' }));
    }

    P.ui.layout.definirConteudo(pagina);
  }

  P.ui.trilha = { render: render };
})(window.Plataforma);
