window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;
  const comp = P.ui.componentes;

  const chipEstado = {
    dominada: ['✅ Dominada', 'sucesso'],
    estudando: ['🟡 Estudando', 'aviso'],
    disponivel: ['▶ Disponível', 'primaria'],
    planejada: ['Planejada', null],
    bloqueada: ['🔒 Bloqueada', null]
  };

  function cartaoCompetencia(id) {
    const info = P.progresso.statusHabilidade(id);
    if (!info.competencia) return null;
    const c = info.competencia;
    const chip = chipEstado[info.estado] || chipEstado.planejada;
    const cartao = criar('div', { classe: 'mapa-card' });
    cartao.appendChild(criar('div', { classe: 'mapa-card-topo' }, [
      criar('strong', { texto: c.nome }),
      comp.chip(chip[0], chip[1])
    ]));
    cartao.appendChild(criar('div', { classe: 'mapa-card-meta' }, [
      comp.chip('Trilha ' + info.percentual + '%'),
      comp.chip('Domínio ' + info.dominio + '%')
    ]));
    cartao.appendChild(comp.barra(info.dominio || info.percentual));
    if (c.trabalho) {
      cartao.appendChild(criar('p', { classe: 'pequeno fraco', texto: c.trabalho }));
    }
    const skills = criar('div', { classe: 'requisitos' }, (c.skills || []).slice(0, 8).map(function (s) {
      return comp.chip(s.replace(/-/g, ' '));
    }));
    cartao.appendChild(skills);
    if (info.dependencias.length) {
      cartao.appendChild(criar('div', { classe: 'mapa-deps' }, [
        criar('span', { classe: 'pequeno fraco', texto: 'Depende de: ' }),
        criar('span', { classe: 'pequeno', texto: info.dependencias.map(function (d) {
          return (d.atendida ? '✅ ' : '🔒 ') + d.nome;
        }).join(' · ') })
      ]));
    }
    if (info.estado !== 'bloqueada' && info.estado !== 'planejada' && c.trilha) {
      cartao.appendChild(comp.botao('Abrir trilha', {
        tipo: 'suave',
        onclick: function () { P.roteador.ir('#/trilha/' + c.trilha); }
      }));
    } else if (info.estado === 'bloqueada' && info.dependencias.length) {
      const primeira = info.dependencias.filter(function (d) { return !d.atendida; })[0];
      if (primeira) {
        const alvo = P.progresso.competencia(primeira.id);
        if (alvo && alvo.trilha) {
          cartao.appendChild(comp.botao('Estudar ' + alvo.nome, {
            tipo: 'suave',
            onclick: function () { P.roteador.ir('#/trilha/' + alvo.trilha); }
          }));
        }
      }
    }
    return cartao;
  }

  function render() {
    const mapa = P.interno.habilidades;
    const pagina = criar('div', { classe: 'pagina' });
    pagina.appendChild(criar('div', { classe: 'pagina-cabecalho' }, [
      criar('h1', { texto: 'Mapa de carreira — Full Stack .NET' }),
      criar('p', { classe: 'muted', texto: 'O que já está dominado (✅), o que está em estudo (🟡) e o que ainda está bloqueado (🔒). A ordem respeita as dependências reais do trabalho.' })
    ]));

    const legenda = criar('div', { classe: 'mapa-legenda' }, [
      comp.chip('✅ Dominada', 'sucesso'),
      comp.chip('🟡 Estudando', 'aviso'),
      comp.chip('▶ Disponível', 'primaria'),
      comp.chip('🔒 Bloqueada')
    ]);
    pagina.appendChild(legenda);

    if (!mapa || !mapa.competencias) {
      pagina.appendChild(criar('div', { classe: 'estado-vazio' }, [
        criar('h3', { texto: 'Mapa de competências não carregado' })
      ]));
      P.ui.layout.definirConteudo(pagina);
      return;
    }

    (mapa.categorias || []).forEach(function (categoria) {
      const bloco = criar('div', { classe: 'mapa-categoria' });
      bloco.appendChild(criar('div', { classe: 'nivel-titulo' }, [
        criar('h2', { texto: categoria.nome }),
        comp.chip(categoria.itens.length + ' competências')
      ]));
      const grid = criar('div', { classe: 'mapa-grid' });
      categoria.itens.forEach(function (id) {
        const cartao = cartaoCompetencia(id);
        if (cartao) grid.appendChild(cartao);
      });
      bloco.appendChild(grid);
      pagina.appendChild(bloco);
    });

    pagina.appendChild(criar('div', { classe: 'bloco-nota info' }, [
      criar('span', { classe: 'nota-marca', texto: 'i' }),
      criar('div', { texto: 'Domínio não é a mesma coisa que concluir a aula. O percentual de domínio considera as formas de conhecimento praticadas e a segurança que você registrou nas respostas.' })
    ]));

    P.ui.layout.definirConteudo(pagina);
  }

  P.ui.mapa = { render: render };
})(window.Plataforma);
