window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;

  function blocoDiff(diff) {
    const linhas = (diff || []).map(function (linha) {
      let classe = 'diff-linha';
      if (linha.indexOf('+') === 0) classe += ' diff-add';
      else if (linha.indexOf('-') === 0) classe += ' diff-del';
      else if (linha.indexOf('@@') === 0) classe += ' diff-hunk';
      return criar('div', { classe: classe, texto: linha });
    });
    return criar('div', { classe: 'codigo-bloco diff-bloco' }, [
      criar('div', { classe: 'codigo-topo' }, [criar('span', { texto: 'diff' })]),
      criar('div', { classe: 'diff-corpo' }, linhas)
    ]);
  }

  P.atividades.registrar('code-review', {
    rotulo: 'Revisão de código',
    render: function (atv, area, api) {
      if (atv.ticket) {
        area.appendChild(criar('div', { classe: 'debug-ticket' }, [
          criar('div', { classe: 'debug-ticket-topo' }, [
            criar('span', { texto: 'Alteração ' + (atv.ticket.numero || '') }),
            criar('span', { texto: atv.ticket.titulo ? '· ' + atv.ticket.titulo : '' })
          ]),
          criar('div', { classe: 'debug-ticket-corpo', texto: atv.ticket.corpo || '' })
        ]));
      }
      if (atv.autor) {
        area.appendChild(criar('div', { classe: 'pequeno fraco', texto: 'Alteração de ' + atv.autor }));
      }
      if (atv.diff) area.appendChild(blocoDiff(atv.diff));
      return P.atividades.montarOpcoes(atv, area, api);
    }
  });

  P.atividades.registrar('visualizer', {
    rotulo: 'Visualizador',
    render: function (atv, area, api) {
      const wrap = criar('div', { classe: 'visualizador' });
      if (atv.codigo) {
        wrap.appendChild(criar('div', { classe: 'codigo-bloco' }, [
          criar('div', { classe: 'codigo-topo' }, [criar('span', { texto: 'csharp' })]),
          criar('pre', {}, [criar('code', { texto: atv.codigo })])
        ]));
      }
      const palco = criar('div', { classe: 'visualizador-palco' });
      const resultado = criar('div', { classe: 'visualizador-resultado', hidden: true });
      const controles = criar('div', { classe: 'visualizador-controles' });
      wrap.appendChild(palco);
      wrap.appendChild(controles);
      wrap.appendChild(resultado);
      area.appendChild(wrap);

      let concluido = false;
      const passos = [];

      function linhaItem(rotulo, detalhe, classe) {
        return criar('div', { classe: 'viz-item' + (classe ? ' ' + classe : '') }, [
          criar('span', { classe: 'viz-rotulo', texto: rotulo }),
          criar('span', { classe: 'viz-detalhe', texto: detalhe || '' }),
          criar('span', { classe: 'viz-marca', texto: '' })
        ]);
      }

      function montarFiltro() {
        palco.appendChild(criar('div', { classe: 'viz-rotulo-tabela', texto: 'Lista original' }));
        const lista = criar('div', { classe: 'viz-lista' });
        (atv.itens || []).forEach(function (item, i) {
          const linha = linhaItem(item.rotulo, item.detalhe);
          lista.appendChild(linha);
          passos.push({
            tipo: 'filtro',
            linha: linha,
            item: item,
            texto: (item.passa ? '✅ mantém' : '❌ remove'),
            classe: item.passa ? 'viz-manter' : 'viz-remover'
          });
        });
        palco.appendChild(lista);
      }

      function montarJoin() {
        const grade = criar('div', { classe: 'viz-join' });
        const esq = criar('div', { classe: 'viz-tabela' });
        const dir = criar('div', { classe: 'viz-tabela' });
        esq.appendChild(criar('div', { classe: 'viz-rotulo-tabela', texto: atv.tabelaEsquerda || 'Esquerda' }));
        dir.appendChild(criar('div', { classe: 'viz-rotulo-tabela', texto: atv.tabelaDireita || 'Direita' }));
        const linhasEsq = (atv.esquerda || []).map(function (item, i) {
          const linha = linhaItem(item.rotulo, item.detalhe);
          linha.dataset.indice = i;
          esq.appendChild(linha);
          return linha;
        });
        const linhasDir = (atv.direita || []).map(function (item, i) {
          const linha = linhaItem(item.rotulo, item.detalhe);
          linha.dataset.indice = i;
          dir.appendChild(linha);
          return linha;
        });
        grade.appendChild(esq);
        grade.appendChild(dir);
        palco.appendChild(grade);
        const relacoes = atv.relacoes || [];
        (atv.esquerda || []).forEach(function (item, i) {
          const pares = relacoes.filter(function (r) { return r[0] === i; });
          if (!pares.length) {
            passos.push({ tipo: 'join', linhas: [linhasEsq[i]], texto: atv.modo === 'left' ? '⭕ sem par (mantém com NULL)' : '❌ descartado (sem par)', classe: atv.modo === 'left' ? 'viz-nulo' : 'viz-remover' });
          } else {
            pares.forEach(function (r) {
              passos.push({ tipo: 'join', linhas: [linhasEsq[i], linhasDir[r[1]]], texto: '🔗 combina', classe: 'viz-manter' });
            });
          }
        });
      }

      if (atv.variacao === 'join') montarJoin();
      else montarFiltro();

      let indice = 0;
      const botao = criar('button', {
        classe: 'btn btn-primario',
        texto: 'Executar passo a passo',
        onclick: function () {
          if (indice >= passos.length) return;
          const passo = passos[indice];
          (passo.linhas || [passo.linha]).forEach(function (linha) {
            linha.classList.add(passo.classe);
            const marca = linha.querySelector('.viz-marca');
            if (marca) marca.textContent = passo.texto;
          });
          indice += 1;
          if (indice === passos.length) {
            concluido = true;
            botao.textContent = 'Execução concluída';
            botao.disabled = true;
            resultado.hidden = false;
            P.dom.limpar(resultado);
            resultado.appendChild(criar('div', { classe: 'viz-rotulo-tabela', texto: 'Resultado' }));
            const linhas = criar('div', { classe: 'viz-lista' });
            (atv.resultado || []).forEach(function (texto) {
              linhas.appendChild(criar('div', { classe: 'viz-resultado-item', texto: texto }));
            });
            linhas.appendChild(criar('div', { classe: 'pequeno muted', texto: atv.resultadoLegenda || '' }));
            resultado.appendChild(linhas);
            api.marcarRespondida(true);
          }
        }
      });
      controles.appendChild(botao);

      return {
        verificar: function () { return { correto: concluido, selecionada: null }; },
        revelar: function () {
          concluido = true;
          botao.disabled = true;
          botao.textContent = 'Execução concluída';
        },
        prepararNovaTentativa: function () {
          api.marcarRespondida(concluido);
        }
      };
    }
  });

  P.atividades.registrar('explain', {
    rotulo: 'Explique com suas palavras',
    render: function (atv, area, api) {
      const wrap = criar('div', { classe: 'write-area' });
      if (atv.pergunta) {
        wrap.appendChild(criar('div', { classe: 'pergunta-aberta', texto: atv.pergunta }));
      }
      const texto = criar('textarea', {
        classe: 'write-codigo explain-texto',
        spellcheck: 'true',
        placeholder: atv.placeholder || 'Explique do seu jeito, sem decorar...'
      });
      wrap.appendChild(texto);

      const criterios = criar('div', { classe: 'criterios', hidden: true });
      const modeloTitulo = criar('div', { classe: 'pequeno fraco', texto: 'Critérios de uma boa resposta' });
      const lista = criar('ul', { classe: 'bloco-lista' }, (atv.criterios || []).map(function (c) {
        return criar('li', { html: P.dom.formatar(c) });
      }));
      const exemplo = criar('div', { classe: 'resposta-esperada', hidden: true });
      const botaoCriterios = criar('button', {
        classe: 'btn-link',
        texto: 'Ver critérios de avaliação',
        onclick: function () {
          criterios.hidden = !criterios.hidden;
          botaoCriterios.textContent = criterios.hidden ? 'Ver critérios de avaliação' : 'Ocultar critérios';
        }
      });
      criterios.appendChild(modeloTitulo);
      criterios.appendChild(lista);
      wrap.appendChild(botaoCriterios);
      wrap.appendChild(criterios);
      wrap.appendChild(exemplo);
      area.appendChild(wrap);

      texto.addEventListener('input', function () {
        api.marcarRespondida(texto.value.trim().length >= (atv.minimoCaracteres || 20));
      });

      function palavrasPresentes() {
        const chaves = atv.palavrasChave || [];
        if (!chaves.length) return null;
        const normalizado = P.dom.normalizar(texto.value);
        const palavras = normalizado.split(/[^a-z0-9#+]+/).filter(function (p) { return p.length >= 3; });
        function casa(alvo) {
          if (!alvo) return false;
          if (normalizado.indexOf(alvo) !== -1) return true;
          return palavras.some(function (p) {
            const tam = Math.min(p.length, alvo.length);
            if (tam < 4) return false;
            return p.indexOf(alvo.slice(0, tam)) === 0 || alvo.indexOf(p.slice(0, tam)) === 0;
          });
        }
        return chaves.filter(function (chave) {
          const alternativas = Array.isArray(chave) ? chave : [chave];
          return alternativas.some(function (alternativa) {
            return casa(P.dom.normalizar(alternativa));
          });
        });
      }

      function limpar() {
        texto.classList.remove('correta', 'errada');
      }

      return {
        verificar: function () {
          const chaves = palavrasPresentes();
          if (chaves === null) return { correto: true, selecionada: null };
          const grupos = atv.palavrasChave || [];
          const minimo = atv.minimoChaves || Math.ceil(grupos.length * 0.6);
          const faltando = grupos.filter(function (grupo) {
            return chaves.indexOf(grupo) === -1;
          });
          if (chaves.length >= minimo) {
            texto.classList.add('correta');
            return { correto: true, selecionada: null };
          }
          texto.classList.add('errada');
          const detalhes = [];
          if (faltando.length) {
            detalhes.push('A resposta ainda não tocou nos pontos: ' + faltando.slice(0, 4).map(function (c) {
              return '**' + (Array.isArray(c) ? c[0] : c) + '**';
            }).join(', ') + '.');
          }
          return { correto: false, selecionada: null, detalhes: detalhes };
        },
        revelar: function () {
          texto.readOnly = true;
          limpar();
          P.dom.limpar(exemplo);
          exemplo.hidden = false;
          exemplo.appendChild(criar('span', { texto: 'Resposta modelo' }));
          exemplo.appendChild(criar('code', { texto: atv.exemplo || '—' }));
        },
        prepararNovaTentativa: function () {
          texto.readOnly = false;
          limpar();
          api.marcarRespondida(texto.value.trim().length >= (atv.minimoCaracteres || 20));
        },
        focar: function () { texto.focus(); }
      };
    }
  });
})(window.Plataforma);
