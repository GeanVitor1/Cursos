window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;
  const comp = P.ui.componentes;

  function statusCobertura(percentual) {
    if (percentual >= 80) return ['Pronto para simulado', 'sucesso'];
    if (percentual >= 40) return ['Em preparação', 'aviso'];
    if (percentual > 0) return ['Base inicial', 'primaria'];
    return ['Planejada', null];
  }

  function render() {
    const lista = P.interno.certificacoes || [];
    const pagina = criar('div', { classe: 'pagina' });
    pagina.appendChild(criar('div', { classe: 'pagina-cabecalho' }, [
      criar('h1', { texto: 'Certificações' }),
      criar('p', { classe: 'muted', texto: 'Mapeamento entre as trilhas internas e credenciais relevantes do mercado. A plataforma prepara você; as provas oficiais são externas.' })
    ]));

    if (!lista.length) {
      pagina.appendChild(criar('div', { classe: 'cartao estado-vazio' }, [
        criar('h3', { texto: 'Mapa de certificações em construção' })
      ]));
      P.ui.layout.definirConteudo(pagina);
      return;
    }

    const grid = criar('div', { classe: 'cards-grid' });
    lista.forEach(function (cert) {
      const cobertura = P.progresso.coberturaCertificacao(cert);
      const status = statusCobertura(cobertura);
      const trilhas = Object.keys(cert.trilhas || {}).map(function (id) {
        const t = P.progresso.trilha(id);
        const r = P.progresso.daTrilha(id);
        return t ? comp.chip((t.curto || t.nome) + ' · ' + r.percentual + '%') : null;
      });

      grid.appendChild(criar('div', { classe: 'cartao certificado-card' }, [
        criar('span', { classe: 'certificado-emissor', texto: cert.emissor || 'Mercado' }),
        criar('h3', { texto: cert.nome }),
        criar('p', { classe: 'muted pequeno', texto: cert.descricao || '' }),
        criar('div', { classe: 'certificado-progresso' }, [
          comp.barra(cobertura),
          criar('span', { classe: 'pct', texto: cobertura + '%' })
        ]),
        comp.chip(status[0], status[1]),
        criar('div', { classe: 'requisitos' }, (cert.conhecimentos || []).map(function (c) { return comp.chip(c); })),
        criar('div', { classe: 'requisitos' }, trilhas),
        cert.observacao ? criar('p', { classe: 'pequeno fraco', texto: cert.observacao }) : null
      ]));
    });
    pagina.appendChild(grid);

    pagina.appendChild(criar('div', { classe: 'bloco-nota info' }, [
      criar('span', { classe: 'nota-marca', texto: 'i' }),
      criar('div', { texto: 'A porcentagem considera o quanto você concluiu das trilhas que cobrem cada certificação. Quando chegar a 80%, você está pronto para fazer um simulado completo.' })
    ]));

    P.ui.layout.definirConteudo(pagina);
  }

  P.ui.certificacoes = { render: render };
})(window.Plataforma);
