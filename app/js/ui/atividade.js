window.Plataforma = window.Plataforma || {};
(function (P) {
  const criar = P.dom.criar;
  function indicador(valor, rotulo) {
    return criar('div', { classe: 'atividade-indicador' }, [criar('strong', { texto: String(valor) }), criar('span', { texto: rotulo })]);
  }
  P.ui.atividade = { render: function () {
    const a = P.dados.resumoAtividade(), hoje = P.dados.hojeISO();
    const card = criar('section', { classe: 'cartao atividade-resumo', 'aria-label': 'Histórico de estudo' });
    card.appendChild(criar('div', { classe: 'atividade-resumo-cabecalho' }, [
      criar('div', {}, [criar('h2', { texto: 'Seu estudo em atividade' }), criar('p', { classe: 'atividade-subtitulo', texto: 'Pequenos avanços, acompanhados ao longo do tempo.' })]),
      criar('span', { classe: 'atividade-periodo', texto: 'Últimos 35 dias' })
    ]));
    const grade = criar('div', { classe: 'atividade-grade' });
    const historico = criar('div', { classe: 'atividade-historico' });
    historico.appendChild(criar('div', { classe: 'atividade-indicadores' }, [
      indicador(a.totalDias, 'dias de estudo'), indicador(Math.floor(a.hojeSegundos / 60) + ' min', 'de estudo hoje'), indicador(Math.floor(a.semanaSegundos / 60) + ' min', 'nos últimos 7 dias')
    ]));
    const semana = criar('div', { classe: 'atividade-semana', 'aria-hidden': 'true' });
    const inicio = P.dados.deslocarDia(hoje, -34);
    for (let i = 0; i < 7; i += 1) {
      const dia = new Date(P.dados.deslocarDia(inicio, i) + 'T12:00:00Z');
      semana.appendChild(criar('span', { texto: new Intl.DateTimeFormat('pt-BR', { weekday: 'short', timeZone: 'UTC' }).format(dia).replace('.', '') }));
    }
    historico.appendChild(semana);
    const calendario = criar('div', { classe: 'atividade-calendario', role: 'list', 'aria-label': 'Últimos 35 dias' });
    for (let i = -34; i <= 0; i += 1) {
      const dia = P.dados.deslocarDia(hoje, i), registro = a.dias.find(function (d) { return d.dia === dia; });
      const rotulo = dia + (registro && registro.valido ? ': estudo registrado' : ': sem estudo válido') + (registro ? ', ' + registro.segundos + ' segundos, ' + registro.respostas + ' respostas, ' + registro.licoes.length + ' aulas concluídas' : '');
      calendario.appendChild(criar('div', { classe: 'atividade-dia' + (registro && registro.valido ? ' estudou' : '') + (dia === hoje ? ' hoje' : ''), role: 'listitem', title: rotulo, 'aria-label': rotulo, 'aria-current': dia === hoje ? 'date' : null, texto: dia.slice(8) }));
    }
    historico.appendChild(calendario);
    historico.appendChild(criar('div', { classe: 'atividade-legenda' }, [criar('span', { classe: 'atividade-legenda-estudo', texto: 'Estudo registrado' }), criar('span', { texto: 'Contorno indica hoje' })]));
    grade.appendChild(historico);
    const metaBox = criar('div', { classe: 'atividade-meta' });
    metaBox.appendChild(criar('h3', { texto: 'Sua meta diária' }));
    metaBox.appendChild(criar('p', { texto: 'Defina um tempo que caiba na sua rotina.' }));
    metaBox.appendChild(criar('label', { for: 'meta-diaria', texto: 'Tempo de estudo' }));
    const campo = criar('div', { classe: 'atividade-select' });
    const meta = criar('select', { id: 'meta-diaria', 'aria-label': 'Meta diária de estudo', 'aria-describedby': 'meta-diaria-progresso' });
    [5, 15, 30, 60].forEach(function (n) { meta.appendChild(criar('option', { value: String(n), texto: n + ' minutos por dia', selected: n === a.metaMinutos })); });
    meta.addEventListener('change', function () {
      P.dados.estado().configuracoes.metaMinutos = Number(meta.value);
      P.dados.salvar(); P.roteador.processar();
      queueMicrotask(function () { const atual = document.getElementById('meta-diaria'); if (atual) atual.focus(); });
    });
    campo.appendChild(meta); metaBox.appendChild(campo);
    metaBox.appendChild(criar('p', { id: 'meta-diaria-progresso', classe: 'atividade-meta-progresso', texto: Math.floor(a.hojeSegundos / 60) + ' de ' + a.metaMinutos + ' min hoje' }));
    const percentual = Math.min(100, a.hojeSegundos / (a.metaMinutos * 60) * 100);
    const barra = P.ui.componentes.barra(percentual, 'fina');
    barra.setAttribute('role', 'progressbar'); barra.setAttribute('aria-label', 'Progresso da meta diária');
    barra.setAttribute('aria-valuenow', Math.floor(percentual)); barra.setAttribute('aria-valuemin', '0'); barra.setAttribute('aria-valuemax', '100');
    metaBox.appendChild(barra);
    metaBox.appendChild(criar('span', { classe: 'atividade-meta-nota', texto: 'Sua meta é salva automaticamente.' }));
    grade.appendChild(metaBox); card.appendChild(grade);
    const regras = criar('details', { classe: 'painel-expansivel atividade-regras' });
    regras.appendChild(criar('summary', { texto: 'Como os dias e o tempo são registrados?' }));
    regras.appendChild(criar('p', { texto: 'Um dia conta ao responder um exercício, concluir uma aula ou acumular 2 minutos de leitura ativa. O tempo é medido com a aula visível e interação no último minuto. Fuso: ' + a.fuso + '. Dias antigos são preservados; seu tempo não pode ser reconstruído.' }));
    card.appendChild(regras);
    const recentes = a.dias.filter(function (d) { return d.licoes.length; }).slice(-5).reverse();
    if (recentes.length) {
      const lista = criar('ul', { classe: 'atividade-recentes' });
      recentes.forEach(function (d) { lista.appendChild(criar('li', {}, [
        criar('time', { datetime: d.dia, texto: d.dia.split('-').reverse().join('/') }),
        criar('span', { texto: d.licoes.map(function (id) { return (P.interno.licoes[id] || {}).titulo || id; }).join(', ') })
      ])); });
      card.appendChild(criar('h3', { classe: 'atividade-recentes-titulo', texto: 'Aulas concluídas recentemente' })); card.appendChild(lista);
    }
    return card;
  } };
})(window.Plataforma);
