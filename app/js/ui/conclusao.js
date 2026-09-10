window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;
  const comp = P.ui.componentes;

  const rotulosConceito = { dominado: 'Dominado', revisar: 'Precisa revisar', dificuldade: 'Dificuldade', aprendendo: 'Aprendendo' };
  const simbolosConceito = { dominado: '🟢', revisar: '🟡', dificuldade: '🔴', aprendendo: '🟡' };

  function listaConceitos(ids) {
    const wrap = criar('div', { classe: 'conceitos-resumo' });
    (ids || []).forEach(function (id) {
      const estado = P.dados.estadoConceito(id);
      const dominio = P.dados.dominioConceito(id) || { geral: 0, dimensoes: {} };
      const linha = criar('div', { classe: 'conceito-bloco' });
      linha.appendChild(criar('div', { classe: 'conceito-linha' }, [
        criar('span', { texto: P.progresso.nomeConceito(id) }),
        criar('span', { classe: 'chip', texto: (simbolosConceito[estado] || '⚪') + ' ' + (rotulosConceito[estado] || 'Sem prática') })
      ]));
      const dimensoes = Object.keys(dominio.dimensoes || {}).filter(function (d) {
        return dominio.dimensoes[d].tentativas > 0;
      });
      if (dimensoes.length) {
        const grade = criar('div', { classe: 'dominio-grade' });
        dimensoes.forEach(function (d) {
          grade.appendChild(criar('div', { classe: 'dominio-item' }, [
            criar('span', { classe: 'dominio-nome', texto: P.dimensoes[d] ? P.dimensoes[d].nome : d }),
            comp.barra(dominio.dimensoes[d].percentual, 'fina'),
            criar('span', { classe: 'dominio-pct', texto: dominio.dimensoes[d].percentual + '%' })
          ]));
        });
        linha.appendChild(grade);
      }
      const agenda = P.dados.estado().agenda[id];
      if (agenda && agenda.proximaEm) {
        linha.appendChild(criar('div', { classe: 'pequeno fraco', texto: 'Próxima revisão programada: ' + agenda.proximaEm }));
      }
      wrap.appendChild(linha);
    });
    return wrap;
  }

  function blocoXp(resumo) {
    const total = resumo.xpAtividades + resumo.bonus;
    return criar('div', { classe: 'xp-resumo' }, [
      comp.chip('+' + resumo.xpAtividades + ' XP em atividades', 'primaria'),
      comp.chip('+' + resumo.bonus + ' XP de bônus', 'sucesso'),
      comp.chip(total + ' XP no total')
    ]);
  }

  function avisoDominio() {
    return criar('div', { classe: 'bloco-nota info' }, [
      criar('span', { classe: 'nota-marca', texto: 'i' }),
      criar('div', { html: 'Etapa concluída **não** significa conceito dominado. O quadro abaixo mostra em quais formas de conhecimento você já foi bem (reconhecer, associar, ordenar, preencher, construir, aplicar) e o que volta na revisão.' })
    ]);
  }

  function mostrar(resumo) {
    if (resumo.modo === 'revisao') {
      mostrarRevisao(resumo);
      return;
    }
    mostrarLicao(resumo);
  }

  function mostrarLicao(resumo) {
    const licao = resumo.licao || {};
    const prova = licao.tipo === 'prova';
    const proxima = P.progresso.proximaEtapaDepois(licao.id) || P.progresso.proximaEtapa();
    const pagina = criar('div', { classe: 'conclusao' });

    pagina.appendChild(criar('div', { classe: 'conclusao-icone' + (prova ? ' prova' : ''), texto: '✓' }));
    pagina.appendChild(criar('h1', { texto: prova ? 'Checkpoint concluído' : 'Etapa concluída' }));
    pagina.appendChild(criar('p', { classe: 'muted', texto: licao.titulo || '' }));

    if (prova) {
      pagina.appendChild(criar('div', { classe: 'cartao prova-resultado' }, [
        criar('span', { classe: 'prova-numero', texto: resumo.aproveitamento + '%' }),
        criar('div', {}, [
          criar('strong', { texto: resumo.acertosPrimeira + ' de ' + resumo.totalAtividades + ' atividades corretas na primeira tentativa' }),
          criar('p', { classe: 'muted pequeno', texto: 'O resultado não bloqueia seu avanço. Pontos fracos voltam automaticamente na revisão espaçada.' })
        ])
      ]));
    }

    if (licao.objetivos && licao.objetivos.length) {
      pagina.appendChild(criar('div', { classe: 'cartao' }, [
        criar('h3', { texto: 'Objetivos trabalhados nesta etapa' }),
        criar('ul', { classe: 'objetivos' }, licao.objetivos.map(function (objetivo) {
          return criar('li', { texto: objetivo });
        }))
      ]));
    }

    pagina.appendChild(criar('div', { classe: 'cartao' }, [
      criar('h3', { texto: 'Conquistas desta etapa' }),
      blocoXp(resumo)
    ]));

    if (resumo.conceitos && resumo.conceitos.length) {
      pagina.appendChild(criar('div', { classe: 'cartao' }, [
        criar('h3', { texto: 'Domínio por conceito e por forma de conhecimento' }),
        avisoDominio(),
        listaConceitos(resumo.conceitos)
      ]));
    }

    const acoes = [];
    if (proxima) {
      acoes.push(comp.botao('Próxima etapa', { onclick: function () { P.roteador.ir('#/licao/' + proxima.etapa.licao); } }));
    }
    if (resumo.aproveitamento < 90 || P.progresso.conceitosParaRevisar(true).length) {
      acoes.push(comp.botao('Praticar os pontos fracos agora', {
        tipo: 'suave',
        onclick: function () {
          P.sessao.iniciar(10, 'revisao');
          P.roteador.ir('#/revisao/8/hoje');
        }
      }));
    }
    acoes.push(comp.botao('Voltar para a trilha', {
      tipo: 'fantasma',
      onclick: function () { P.roteador.ir('#/trilha/' + licao.trilha); }
    }));
    pagina.appendChild(criar('div', { classe: 'conclusao-acoes' }, acoes));

    if (P.sessao.ativa() && !P.sessao.info().expirada) {
      const minutos = Math.ceil(P.sessao.info().restanteMs / 60000);
      pagina.appendChild(criar('p', { classe: 'pequeno fraco', texto: 'Sua sessão ainda tem ' + minutos + ' min. Você pode adiantar a próxima etapa ou revisar.' }));
    }

    P.ui.layout.definirConteudo(pagina);
  }

  function mostrarRevisao(resumo) {
    const conceitos = resumo.conceitos || [];
    const dominados = conceitos.filter(function (id) { return P.dados.estadoConceito(id) === 'dominado'; });
    const pagina = criar('div', { classe: 'conclusao' });

    pagina.appendChild(criar('div', { classe: 'conclusao-icone', texto: '↻' }));
    pagina.appendChild(criar('h1', { texto: 'Revisão concluída' }));
    pagina.appendChild(criar('p', { classe: 'muted', texto: resumo.acertosPrimeira + ' de ' + resumo.totalAtividades + ' atividades corretas na primeira tentativa.' }));

    pagina.appendChild(criar('div', { classe: 'cartao' }, [
      criar('h3', { texto: 'Conquistas da revisão' }),
      blocoXp(resumo)
    ]));

    if (conceitos.length) {
      pagina.appendChild(criar('div', { classe: 'cartao' }, [
        criar('h3', { texto: 'Como ficaram os conceitos' }),
        dominados.length ? criar('p', { classe: 'pequeno muted', texto: dominados.length + ' conceito(s) já aparecem como dominados.' }) : null,
        listaConceitos(conceitos)
      ]));
    }

    const proxima = P.progresso.proximaEtapa();
    const acoes = [];
    if (proxima) {
      acoes.push(comp.botao('Continuar: ' + proxima.etapa.titulo, {
        onclick: function () { P.roteador.ir('#/licao/' + proxima.etapa.licao); }
      }));
    }
    acoes.push(comp.botao('Voltar ao início', {
      tipo: 'fantasma',
      onclick: function () { P.roteador.ir('#/'); }
    }));
    pagina.appendChild(criar('div', { classe: 'conclusao-acoes' }, acoes));

    P.ui.layout.definirConteudo(pagina);
  }

  P.ui.conclusao = { mostrar: mostrar };
})(window.Plataforma);
