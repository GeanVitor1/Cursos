window.Plataforma = window.Plataforma || {};
(function (P) {
  const criar = P.dom.criar;
  P.ui.atividade = { render: function () {
    const a = P.dados.resumoAtividade(), hoje = P.dados.hojeISO();
    const card = criar('section', { classe: 'cartao atividade-resumo', 'aria-label': 'Histórico de estudo' });
    card.appendChild(criar('h2', { texto: 'Seu estudo em atividade' }));
    card.appendChild(criar('p', { texto: a.totalDias + ' dias registrados · hoje ' + Math.floor(a.hojeSegundos / 60) + ' / ' + a.metaMinutos + ' min · últimos 7 dias ' + Math.floor(a.semanaSegundos / 60) + ' min' }));
    card.appendChild(P.ui.componentes.barra(Math.min(100, a.hojeSegundos / (a.metaMinutos * 60) * 100), 'fina'));
    card.appendChild(criar('p', { classe: 'pequeno muted', texto: 'Calendário dos últimos 35 dias · verde: estudo registrado' }));
    const calendario = criar('div', { classe: 'atividade-calendario', role: 'list', 'aria-label': 'Últimos 35 dias' });
    for (let i = -34; i <= 0; i += 1) {
      const dia = P.dados.deslocarDia(hoje, i), registro = a.dias.find(function (d) { return d.dia === dia; });
      const rotulo = dia + (registro && registro.valido ? ': estudo registrado' : ': sem estudo válido') + (registro ? ', ' + registro.segundos + ' segundos, ' + registro.respostas + ' respostas, ' + registro.licoes.length + ' aulas concluídas' : '');
      calendario.appendChild(criar('div', { classe: 'atividade-dia' + (registro && registro.valido ? ' estudou' : ''), role: 'listitem', title: rotulo, 'aria-label': rotulo, texto: dia.slice(8) }));
    }
    card.appendChild(calendario);
    card.appendChild(criar('p', { classe: 'pequeno muted', texto: 'Um dia conta ao responder um exercício, concluir uma aula ou acumular 2 minutos de leitura ativa. Tempo medido com a aula visível e interação no último minuto. Fuso: ' + a.fuso + '. Dias antigos são preservados; seu tempo não pode ser reconstruído.' }));
    const label = criar('label', { texto: 'Meta diária de estudo (minutos) ' });
    const meta = criar('select', { 'aria-label': 'Meta diária de estudo' });
    [5, 15, 30, 60].forEach(function (n) { meta.appendChild(criar('option', { value: String(n), texto: String(n), selected: n === a.metaMinutos })); });
    meta.addEventListener('change', function () { P.dados.estado().configuracoes.metaMinutos = Number(meta.value); P.dados.salvar(); P.roteador.processar(); });
    label.appendChild(meta); card.appendChild(label);
    const recentes = a.dias.filter(function (d) { return d.licoes.length; }).slice(-5).reverse();
    if (recentes.length) card.appendChild(criar('ul', {}, recentes.map(function (d) { return criar('li', { texto: d.dia + ': ' + d.licoes.map(function (id) { return (P.interno.licoes[id] || {}).titulo || id; }).join(', ') }); })));
    return card;
  } };
})(window.Plataforma);
