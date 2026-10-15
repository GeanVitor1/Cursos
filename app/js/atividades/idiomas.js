window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;

  const numerosIngles = {
    zero: 0, oh: 0, one: 1, two: 2, three: 3, four: 4, five: 5,
    six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
    eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15,
    sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
    twenty: 20, thirty: 30, forty: 40, fifty: 50,
    sixty: 60, seventy: 70, eighty: 80, ninety: 90, hundred: 100
  };

  function converterTextoParaNumero(texto) {
    const limpo = P.dom.normalizarIngles(texto);
    if (!limpo) return null;
    const palavras = limpo.split(/[\s-]+/).filter(Boolean);
    if (palavras.length === 1 && numerosIngles[palavras[0]] !== undefined) {
      return String(numerosIngles[palavras[0]]);
    }
    if (palavras.length === 2) {
      const d = numerosIngles[palavras[0]], u = numerosIngles[palavras[1]];
      if (d !== undefined && u !== undefined && d >= 20 && d < 100 && u < 10) {
        return String(d + u);
      }
    }
    if (palavras.length > 2 && palavras.every(function (p) { return numerosIngles[p] !== undefined && numerosIngles[p] < 10; })) {
      return palavras.map(function (p) { return numerosIngles[p]; }).join('');
    }
    return null;
  }

  P.atividades.validarAudio = function (atv, valor) {
    const textoBruto = String(valor || '').trim();
    if (!textoBruto) return false;
    const resposta = String(atv.resposta || '').trim();
    const textoNorm = P.dom.normalizarIngles(textoBruto);
    const audioNorm = atv.audio ? P.dom.normalizarIngles(atv.audio) : '';

    if (audioNorm && (textoNorm === audioNorm || audioNorm.indexOf(textoNorm) !== -1 || textoNorm.indexOf(audioNorm) !== -1)) {
      if (textoNorm.length >= 3 && !/^\d+$/.test(textoNorm.replace(/\s+/g, ''))) return true;
    }

    if (/^\d+$/.test(resposta)) {
      const digitos = textoBruto.replace(/[^\d]/g, '');
      const semPontuacao = textoBruto.replace(/[.,\s-]/g, '');
      if (digitos === resposta && digitos === semPontuacao) return true;
      const numeroConvertido = converterTextoParaNumero(textoBruto);
      if (numeroConvertido === resposta) return true;
      return false;
    }

    if (/^\d{1,2}:\d{2}$/.test(resposta)) {
      const horario = textoBruto.match(/^(\d{1,2})\s*:\s*(\d{2})$/);
      if (horario && Number(horario[1]) + ':' + horario[2] === resposta) return true;
      const partesResposta = resposta.split(':');
      const h = Number(partesResposta[0]), m = Number(partesResposta[1]);
      const horaNome = Object.keys(numerosIngles).find(function (k) { return numerosIngles[k] === h; });
      const resto = textoNorm.replace(new RegExp('^' + horaNome + '\\s*'), '');
      if (textoNorm.startsWith(horaNome) && converterTextoParaNumero(resto) === String(m)) return true;
      return false;
    }

    if (textoNorm === P.dom.normalizarIngles(resposta)) return true;

    if (Array.isArray(atv.respostasAceitas) && atv.respostasAceitas.some(function (r) {
      return P.dom.normalizarIngles(textoBruto) === P.dom.normalizarIngles(r);
    })) return true;

    return false;
  };



  function falarIngles(texto, lento) {
    if (!texto || !window.speechSynthesis) return false;
    try {
      const fala = new SpeechSynthesisUtterance(texto);
      fala.lang = 'en-US';
      fala.rate = lento ? 0.7 : 0.92;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(fala);
      return true;
    } catch (e) {
      return false;
    }
  }

  P.atividades.registrar('listening', {
    rotulo: 'Listening',
    render: function (atv, area, api) {
      const wrap = criar('div', { classe: 'listening' });
      const controles = criar('div', { classe: 'listening-controles' });
      const textoOculto = criar('div', { classe: 'listening-texto', hidden: true });
      const suportaAudio = !!window.speechSynthesis;

      const botaoOuvir = criar('button', {
        classe: 'btn btn-primario listening-botao',
        type: 'button',
        texto: '🔊 Ouvir',
        onclick: function () { falarIngles(atv.audio, false); }
      });
      const botaoLento = criar('button', {
        classe: 'btn btn-suave listening-botao',
        type: 'button',
        texto: '🐢 Devagar',
        onclick: function () { falarIngles(atv.audio, true); }
      });
      const botaoTexto = criar('button', {
        classe: 'btn-link',
        type: 'button',
        texto: 'Não consigo ouvir — mostrar texto',
        onclick: function () {
          textoOculto.hidden = !textoOculto.hidden;
          botaoTexto.textContent = textoOculto.hidden ? 'Não consigo ouvir — mostrar texto' : 'Ocultar texto';
        }
      });
      controles.appendChild(botaoOuvir);
      controles.appendChild(botaoLento);
      wrap.appendChild(controles);
      wrap.appendChild(botaoTexto);
      if (atv.audio) textoOculto.appendChild(criar('span', { classe: 'ingles-frase', texto: atv.audio }));
      wrap.appendChild(textoOculto);
      if (!suportaAudio) {
        textoOculto.hidden = false;
        wrap.appendChild(criar('div', { classe: 'bloco-nota info' }, [
          criar('span', { classe: 'nota-marca', texto: 'i' }),
          criar('div', { texto: 'Seu navegador não tem voz em inglês disponível. O texto apareceu para você continuar praticando — tente outro navegador para ouvir a pronúncia.' })
        ]));
      }

      if (atv.modo === 'escrever') {
        const input = criar('input', {
          classe: 'listening-input',
          type: 'text',
          'aria-label': 'Escreva o que você ouviu',
          placeholder: atv.placeholder || 'Escreva o que você ouviu...',
          autocomplete: 'off',
          autocapitalize: 'off',
          spellcheck: 'false'
        });
        wrap.appendChild(input);
        input.addEventListener('input', function () {
          api.marcarRespondida(input.value.trim().length > 0);
        });
        area.appendChild(wrap);
        return {
          verificar: function () {
            const certo = P.atividades.validarAudio(atv, input.value);
            input.classList.add(certo ? 'correta' : 'errada');
            input.readOnly = true;
            return { correto: certo, selecionada: null };
          },
          revelar: function () {
            input.value = atv.resposta;
            input.readOnly = true;
            input.classList.remove('errada');
            input.classList.add('correta');
          },
          prepararNovaTentativa: function () {
            input.classList.remove('correta', 'errada');
            input.readOnly = false;
            api.marcarRespondida(input.value.trim().length > 0);
          },
          focar: function () { input.focus(); }
        };
      }

      const opcoes = atv.opcoes || [];
      const ordem = P.dom.embaralhar(opcoes.map(function (_, i) { return i; }));
      let selecionada = null;
      let travado = false;
      const lista = criar('div', { classe: 'opcoes listening-opcoes' });
      const botoes = ordem.map(function (original, pos) {
        const botao = criar('button', {
          classe: 'opcao',
          type: 'button',
          onclick: function () {
            if (travado) return;
            botoes.forEach(function (b) { b.classList.remove('selecionada'); });
            botao.classList.add('selecionada');
            selecionada = original;
            api.marcarRespondida(true);
          }
        }, [
          criar('span', { classe: 'opcao-marcador', texto: String.fromCharCode(65 + pos) }),
          criar('span', { texto: opcoes[original] })
        ]);
        botao.dataset.indiceOriginal = original;
        lista.appendChild(botao);
        return botao;
      });
      wrap.appendChild(lista);
      area.appendChild(wrap);

      return {
        focar: function () { botaoOuvir.focus(); },
        verificar: function () {
          travado = true;
          botoes.forEach(function (b, pos) {
            b.classList.remove('selecionada');
            if (ordem[pos] === atv.correta) b.classList.add('correta');
          });
          if (selecionada !== atv.correta && selecionada != null) botoes[ordem.indexOf(selecionada)].classList.add('errada');
          return { correto: selecionada === atv.correta, selecionada: selecionada };
        },
        revelar: function () {
          travado = true;
          botoes.forEach(function (b, pos) {
            if (ordem[pos] === atv.correta) b.classList.add('correta');
          });
        },
        prepararNovaTentativa: function () {
          travado = false;
          selecionada = null;
          botoes.forEach(function (b) { b.classList.remove('correta', 'errada', 'selecionada'); });
          api.marcarRespondida(false);
        }
      };
    }
  });

  P.atividades.registrar('choose-image', {
    rotulo: 'Escolher a imagem',
    render: function (atv, area, api) {
      const grid = criar('div', { classe: 'imagem-grid' });
      const opcoes = atv.opcoes || [];
      const ordem = P.dom.embaralhar(opcoes.map(function (_, i) { return i; }));
      let selecionada = null;
      let travado = false;
      if (atv.audio) {
        const ouvir = criar('button', {
          classe: 'btn btn-suave',
          type: 'button',
          texto: '🔊 Ouvir a palavra',
          onclick: function () { falarIngles(atv.audio, false); }
        });
        area.appendChild(criar('div', { classe: 'listening-controles' }, [ouvir]));
      }
      const botoes = ordem.map(function (original) {
        const opcao = opcoes[original];
        const texto = typeof opcao === 'string' ? opcao : opcao.texto;
        const emoji = typeof opcao === 'string' ? '' : opcao.emoji;
        const botao = criar('button', {
          classe: 'imagem-card',
          type: 'button',
          title: texto || '',
          onclick: function () {
            if (travado) return;
            botoes.forEach(function (b) { b.classList.remove('selecionada'); });
            botao.classList.add('selecionada');
            selecionada = original;
            api.marcarRespondida(true);
          }
        }, [
          criar('span', { classe: 'imagem-emoji', texto: emoji }),
          texto ? criar('span', { classe: 'imagem-rotulo', texto: texto }) : null
        ]);
        botao.dataset.indiceOriginal = original;
        grid.appendChild(botao);
        return botao;
      });
      area.appendChild(grid);

      return {
        verificar: function () {
          travado = true;
          botoes.forEach(function (b, pos) {
            b.classList.remove('selecionada');
            if (ordem[pos] === atv.correta) b.classList.add('correta');
          });
          if (selecionada !== atv.correta && selecionada != null) botoes[ordem.indexOf(selecionada)].classList.add('errada');
          return { correto: selecionada === atv.correta, selecionada: selecionada };
        },
        revelar: function () {
          travado = true;
          botoes.forEach(function (b, pos) { if (ordem[pos] === atv.correta) b.classList.add('correta'); });
        },
        prepararNovaTentativa: function () {
          travado = false;
          selecionada = null;
          botoes.forEach(function (b) { b.classList.remove('correta', 'errada', 'selecionada'); });
          api.marcarRespondida(false);
        }
      };
    }
  });

  P.atividades.registrar('dialogue', {
    rotulo: 'Diálogo',
    render: function (atv, area, api) {
      const turnos = atv.turnos || [];
      const conversa = criar('div', { classe: 'dialogo' });
      if (atv.cena) conversa.appendChild(criar('div', { classe: 'dialogo-cena', texto: atv.cena }));
      const linhas = criar('div', { classe: 'dialogo-linhas' });
      const opcoesBox = criar('div', { classe: 'dialogo-opcoes' });
      conversa.appendChild(linhas);
      conversa.appendChild(opcoesBox);
      area.appendChild(conversa);

      let indice = 0;
      let erros = 0;
      let travado = false;
      let timerTurno = null;
      let destruida = false;

      function bolha(quem, texto) {
        return criar('div', { classe: 'dialogo-bolha ' + (quem === 'outro' ? 'outro' : 'jogador') }, [
          criar('span', { classe: 'dialogo-quem', texto: quem === 'outro' ? (atv.interlocutor || 'A') : 'Você' }),
          criar('span', { texto: texto })
        ]);
      }

      function renderTurno() {
        travado = false;
        P.dom.limpar(opcoesBox);
        if (indice >= turnos.length) {
          api.marcarRespondida(true);
          return;
        }
        const turno = turnos[indice];
        linhas.appendChild(bolha('outro', turno.fala));
        if (turno.audio !== false) falarIngles(turno.fala, false);
        const opcoes = turno.opcoes || [];
        const ordem = P.dom.embaralhar(opcoes.map(function (_, i) { return i; }));
        const botoes = ordem.map(function (original, pos) {
          const botao = criar('button', {
            classe: 'opcao dialogo-opcao',
            type: 'button',
            onclick: function () {
              if (travado) return;
              travado = true;
              const certo = original === turno.correta;
              if (!certo) erros += 1;
              botoes.forEach(function (b) {
                if (Number(b.dataset.indiceOriginal) === turno.correta) b.classList.add('correta');
              });
              if (!certo) botao.classList.add('errada');
              linhas.appendChild(bolha('jogador', turno.opcoes[turno.correta]));
              indice += 1;
              timerTurno = window.setTimeout(function () { if (!destruida) renderTurno(); }, certo ? 550 : 900);
            }
          }, [
            criar('span', { classe: 'opcao-marcador', texto: String.fromCharCode(65 + pos) }),
            criar('span', { texto: opcoes[original] })
          ]);
          botao.dataset.indiceOriginal = original;
          opcoesBox.appendChild(botao);
          return botao;
        });
      }

      renderTurno();
      api.marcarRespondida(false);

      return {
        destruir: function () { destruida = true; window.clearTimeout(timerTurno); },
        verificar: function () {
          travado = true;
          return { correto: indice >= turnos.length && erros === 0, selecionada: null };
        },
        revelar: function () {
          travado = true;
          P.dom.limpar(opcoesBox);
          while (indice < turnos.length) {
            linhas.appendChild(bolha('jogador', turnos[indice].opcoes[turnos[indice].correta]));
            indice += 1;
          }
          api.marcarRespondida(true);
        },
        prepararNovaTentativa: function () {
          P.dom.limpar(linhas);
          P.dom.limpar(opcoesBox);
          indice = 0;
          erros = 0;
          renderTurno();
          api.marcarRespondida(false);
        }
      };
    }
  });
})(window.Plataforma);
