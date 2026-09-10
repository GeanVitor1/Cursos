Plataforma.registrarLicao({
  id: 'en-a1-04',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Horas, dias e datas',
  subtitulo: 'English A1 · Unidade 5',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Perguntar e dizer as horas',
    'Nomear os dias da semana',
    'Usar at e on com horários e dias'
  ],
  conceitos: ['en.horarios'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'What time is it?',
      introduz: ['en.horarios'],
      blocos: [
        { tipo: 'vocab', titulo: 'Dizendo as horas', pares: [
          ['What time is it?', 'Que horas são?'],
          ['It\'s seven o\'clock.', 'São sete horas em ponto.'],
          ['It\'s seven thirty.', 'São sete e trinta.'],
          ['It\'s half past seven.', 'São sete e meia.'],
          ['It\'s a quarter to eight.', 'São quinze para as oito.']
        ] },
        { tipo: 'vocab', titulo: 'Dias da semana', pares: [
          ['Monday, Tuesday, Wednesday', 'segunda, terça, quarta'],
          ['Thursday, Friday', 'quinta, sexta'],
          ['Saturday, Sunday', 'sábado, domingo']
        ] },
        { tipo: 'vocab', titulo: 'Compromissos', pares: [
          ['the meeting', 'a reunião'],
          ['the class starts', 'a aula começa'],
          ['at', 'às (antes de horas)'],
          ['on', 'na, no (antes de dias)']
        ] },
        { tipo: 'ingles', frase: 'The meeting is at nine on Monday.', traducao: 'A reunião é às nove na segunda-feira.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Use **at** para horas (`at 9 o\'clock`) e **on** para dias (`on Monday`).' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-04-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'Ouça e marque o compromisso correto.',
        audio: 'The meeting is at nine thirty on Monday.',
        opcoes: [
          'Segunda-feira, às 9h30',
          'Domingo, às 9h',
          'Terça-feira, às 10h30'
        ],
        correta: 0,
        dicas: ['Monday é o dia.', 'Nine thirty é o horário.'],
        explicacao: 'at nine thirty on Monday. `at` + hora, `on` + dia.',
        conceitos: ['en.horarios']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-04-a2',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte o dia da semana à tradução.',
        pares: [
          ['Monday', 'segunda-feira'],
          ['Wednesday', 'quarta-feira'],
          ['Friday', 'sexta-feira'],
          ['Sunday', 'domingo']
        ],
        dicas: ['Wednesday é a terceira.', 'Sunday é o fim de semana.'],
        explicacao: 'Dias da semana em inglês começam com letra maiúscula. Monday, Tuesday, Wednesday são os três primeiros.',
        conceitos: ['en.horarios']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-04-a3',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'preenchimento',
        enunciado: 'Ouça e escreva o horário no formato H:MM (ex.: 7:30).',
        audio: 'The class starts at six forty-five.',
        modo: 'escrever',
        resposta: '6:45',
        placeholder: 'ex.: 7:30',
        dicas: ['six = 6.', 'forty-five = 45 minutos.'],
        explicacao: '6:45. Você ouviu um horário e transformou em número — habilidade essencial para horários de ônibus, voos e reuniões.',
        conceitos: ['en.horarios']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-04-a4',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete com at ou on.',
        codigo: 'The meeting is {{1}} Monday {{2}} 3 o\'clock.',
        lacunas: [['on'], ['at']],
        dicas: ['Dia da semana pede uma preposição.', 'Hora pede outra.'],
        explicacao: 'on Monday (dia) + at 3 o\'clock (hora). Ordem natural: dia primeiro, hora depois.',
        conceitos: ['en.horarios']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-04-a5',
        tipo: 'write-code',
        habilidade: 'writing',
        dimensao: 'construcao',
        enunciado: 'Escreva uma frase com um compromisso seu: use at + hora e on + dia.',
        esqueleto: 'I have ... at ... on ... .',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return /\bat\b/.test(t) && /\bon\b/.test(t) && /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/.test(t);
        },
        respostasAceitas: ['I have English class at 7 o\'clock on Monday.'],
        dicas: ['Ex.: I have a meeting at 9 on Monday.', 'Inclua um dia da semana em inglês.'],
        explicacao: 'I have a meeting at 9 on Monday. A estrutura at + hora e on + dia é uma das mais usadas na vida real.',
        conceitos: ['en.horarios']
      }
    }
  ]
});
