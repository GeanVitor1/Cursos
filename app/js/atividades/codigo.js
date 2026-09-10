window.Plataforma = window.Plataforma || {};

(function (P) {
  const criar = P.dom.criar;

  P.atividades.registrar('fill-code', {
    rotulo: 'Completar código',
    render: function (atv, area, api) {
      let travado = false;
      const container = criar('div', { classe: 'codigo-interativo' });
      const inputs = [];
      const partes = String(atv.codigo || '').split(/(\{\{\d+\}\})/g);

      partes.forEach(function (parte) {
        const marca = parte.match(/^\{\{(\d+)\}\}$/);
        if (marca) {
          const indice = Number(marca[1]) - 1;
          const exemplo = (atv.lacunas && atv.lacunas[indice] && atv.lacunas[indice][0]) || '';
          const input = criar('input', {
            classe: 'lacuna',
            type: 'text',
            autocomplete: 'off',
            spellcheck: 'false'
          });
          input.style.width = Math.max(8, exemplo.length + 3) + 'ch';
          input.addEventListener('input', function () { checar(); });
          input.addEventListener('keydown', function (ev) {
            if (ev.key !== 'Enter') return;
            ev.preventDefault();
            const proximo = inputs[indice + 1];
            if (proximo && !travado) proximo.focus();
            else if (P.ui.runner && P.ui.runner.acaoPrimaria) P.ui.runner.acaoPrimaria();
          });
          inputs[indice] = input;
          container.appendChild(input);
        } else {
          container.appendChild(document.createTextNode(parte));
        }
      });

      area.appendChild(container);

      function checar() {
        if (travado) return;
        const completo = inputs.every(function (input) { return input && input.value.trim().length > 0; });
        api.marcarRespondida(completo);
      }

      function aceita(indice, valor) {
        const aceitos = (atv.lacunas && atv.lacunas[indice]) || [];
        const normalizado = P.dom.normalizarCodigo(valor);
        return aceitos.some(function (a) { return P.dom.normalizarCodigo(a) === normalizado; });
      }

      return {
        verificar: function () {
          travado = true;
          let correto = true;
          inputs.forEach(function (input, i) {
            const ok = aceita(i, input.value);
            if (!ok) correto = false;
            input.classList.toggle('correta', ok);
            input.classList.toggle('errada', !ok);
            input.disabled = true;
          });
          return { correto: correto };
        },
        revelar: function () {
          travado = true;
          inputs.forEach(function (input, i) {
            input.value = (atv.lacunas[i] && atv.lacunas[i][0]) || '';
            input.classList.remove('errada');
            input.classList.add('correta');
            input.disabled = true;
          });
        },
        prepararNovaTentativa: function () {
          travado = false;
          inputs.forEach(function (input) {
            input.classList.remove('correta', 'errada');
            input.disabled = false;
          });
          checar();
        },
        focar: function () {
          if (inputs[0]) inputs[0].focus();
        }
      };
    }
  });

  P.atividades.registrar('write-code', {
    rotulo: 'Escrever código',
    render: function (atv, area, api) {
      const wrap = criar('div', { classe: 'write-area' });
      if (atv.esqueleto) {
        wrap.appendChild(criar('div', { classe: 'pequeno fraco', texto: 'Estrutura sugerida' }));
        wrap.appendChild(criar('pre', { classe: 'diagrama', texto: atv.esqueleto }));
      }
      const texto = criar('textarea', {
        classe: 'write-codigo',
        spellcheck: 'false',
        placeholder: atv.placeholder || 'Escreva sua resposta aqui...'
      });
      wrap.appendChild(texto);
      const esperada = criar('div', { classe: 'resposta-esperada', hidden: true });
      wrap.appendChild(esperada);
      area.appendChild(wrap);

      texto.addEventListener('input', function () {
        api.marcarRespondida(texto.value.trim().length > 0);
      });
      texto.addEventListener('keydown', function (ev) {
        if ((ev.ctrlKey || ev.metaKey) && ev.key === 'Enter') {
          ev.preventDefault();
          if (P.ui.runner && P.ui.runner.acaoPrimaria) P.ui.runner.acaoPrimaria();
        }
      });

      function validar(valor) {
        if (typeof atv.validar === 'function') return !!atv.validar(valor);
        const normalizada = P.dom.normalizarCodigo(valor);
        return (atv.respostasAceitas || []).some(function (a) {
          return P.dom.normalizarCodigo(a) === normalizada;
        });
      }

      return {
        verificar: function () {
          const ok = validar(texto.value);
          texto.classList.toggle('correta', ok);
          texto.classList.toggle('errada', !ok);
          texto.readOnly = true;
          return { correto: ok };
        },
        revelar: function () {
          texto.readOnly = true;
          texto.classList.remove('errada');
          P.dom.limpar(esperada);
          esperada.hidden = false;
          esperada.appendChild(criar('span', { texto: 'Resposta esperada' }));
          esperada.appendChild(criar('code', { texto: (atv.respostasAceitas && atv.respostasAceitas[0]) || '—' }));
        },
        prepararNovaTentativa: function () {
          texto.readOnly = false;
          texto.classList.remove('correta', 'errada');
          api.marcarRespondida(texto.value.trim().length > 0);
        },
        focar: function () { texto.focus(); }
      };
    }
  });

  ['find-error', 'interpret-code', 'predict-output'].forEach(function (tipo) {
    const rotulos = {
      'find-error': 'Encontrar o erro',
      'interpret-code': 'Interpretar código',
      'predict-output': 'Prever resultado'
    };
    P.atividades.registrar(tipo, {
      rotulo: rotulos[tipo],
      render: function (atv, area, api) {
        return P.atividades.montarOpcoes(atv, area, api);
      }
    });
  });
})(window.Plataforma);
