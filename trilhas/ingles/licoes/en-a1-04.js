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
      titulo: 'Que horas são?',
      introduz: ['en.horarios'],
      blocos: [
        { tipo: 'texto', texto: 'Para perguntar as horas, o inglês tem uma frase fixa. Vamos aprender primeiro a pergunta e a hora exata.' },
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['What time is it?', 'Que horas são?'],
          ["It's seven o'clock.", 'São sete horas em ponto.']
        ] },
        { tipo: 'ingles', frase: "It's seven o'clock.", traducao: 'São sete horas em ponto.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-04-p1',
        tipo: 'order-blocks',
        habilidade: 'gramatica',
        dimensao: 'ordenacao',
        enunciado: 'Ordene para perguntar as horas.',
        blocos: ['What', 'time', 'is', 'it?'],
        dicas: ['Comece com What.', 'A pergunta termina com it.'],
        explicacao: 'What time is it? — a pergunta mais comum para saber as horas.',
        conceitos: ['en.horarios']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Meia e quinze',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ["It's seven thirty.", 'São sete e trinta.'],
          ["It's half past seven.", 'São sete e meia.'],
          ["It's a quarter to eight.", 'São quinze para as oito.']
        ] },
        { tipo: 'ingles', frase: "It's half past seven.", traducao: 'São sete e meia.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-04-p2',
        tipo: 'multiple-choice',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **half past seven**?',
        opcoes: ['Sete e meia', 'Sete e quinze', 'Sete em ponto', 'Quinze para as sete'],
        correta: 0,
        feedbackErro: {
          1: 'Sete e quinze é **a quarter past seven**.',
          2: 'Sete em ponto é **seven o\'clock**.',
          3: 'Quinze para as sete é **a quarter to seven**.'
        },
        dicas: ['Half é metade.', 'Past indica depois da hora.'],
        explicacao: 'half past seven = sete e meia. quarter = quinze minutos.',
        conceitos: ['en.horarios']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Os três primeiros dias',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['Monday, Tuesday, Wednesday', 'segunda, terça, quarta']
        ] },
        { tipo: 'ingles', frase: 'Monday, Tuesday, Wednesday!', traducao: 'Segunda, terça, quarta!' },
        { tipo: 'nota', tom: 'info', texto: 'Os dias da semana em inglês começam com **letra maiúscula**.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-04-p3',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte o dia da semana à tradução.',
        pares: [
          ['Monday', 'segunda-feira'],
          ['Tuesday', 'terça-feira'],
          ['Wednesday', 'quarta-feira']
        ],
        dicas: ['Monday é o primeiro dia útil.', 'Wednesday é a terceira.'],
        explicacao: 'Monday, Tuesday, Wednesday — os três primeiros dias da semana.',
        conceitos: ['en.horarios']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O resto da semana',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['Thursday, Friday', 'quinta, sexta'],
          ['Saturday, Sunday', 'sábado, domingo']
        ] },
        { tipo: 'ingles', frase: 'Thursday, Friday, Saturday, Sunday!', traducao: 'Quinta, sexta, sábado, domingo!' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-04-p4',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte o dia da semana à tradução.',
        pares: [
          ['Thursday', 'quinta-feira'],
          ['Saturday', 'sábado'],
          ['Sunday', 'domingo']
        ],
        dicas: ['Saturday e Sunday formam o fim de semana.', 'Thursday vem depois de Wednesday.'],
        explicacao: 'Agora você conhece os sete dias da semana em inglês.',
        conceitos: ['en.horarios']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Compromissos',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['the meeting', 'a reunião'],
          ['the class starts', 'a aula começa']
        ] },
        { tipo: 'ingles', frase: 'The meeting is at nine on Monday.', traducao: 'A reunião é às nove na segunda-feira.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-04-p5',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **the meeting**?',
        opcoes: ['A reunião', 'A aula', 'O dia', 'A hora'],
        correta: 0,
        feedbackErro: {
          1: 'A aula é **the class**.',
          2: 'O dia é **the day**.',
          3: 'A hora é **the time**.'
        },
        dicas: ['Meeting é um encontro de trabalho.', 'Você vai usar essa palavra em reuniões.'],
        explicacao: 'the meeting = a reunião; the class = a aula. São compromissos do dia a dia.',
        conceitos: ['en.horarios']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'at e on',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['at', 'às (antes de horas)'],
          ['on', 'na, no (antes de dias)']
        ] },
        { tipo: 'ingles', frase: 'The class starts at six forty-five.', traducao: 'A aula começa às seis e quarenta e cinco.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Use **at** para horas (`at 9 o\'clock`) e **on** para dias (`on Monday`).' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-04-p6',
        tipo: 'multiple-choice',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete: The class starts ___ nine.',
        opcoes: ['at', 'on', 'in'],
        correta: 0,
        feedbackErro: {
          1: '**on** é usado antes de dias, não de horas.',
          2: '**in** é usado em partes do dia, como in the morning.'
        },
        dicas: ['Antes de horas usamos at.', 'Antes de dias usamos on.'],
        explicacao: 'The class starts at nine. Hora pede at; dia pede on.',
        conceitos: ['en.horarios']
      }
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
        codigo: "The meeting is {{1}} Monday {{2}} 3 o'clock.",
        lacunas: [['on'], ['at']],
        dicas: ['Dia da semana pede uma preposição.', 'Hora pede outra.'],
        explicacao: "on Monday (dia) + at 3 o'clock (hora). Ordem natural: dia primeiro, hora depois.",
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
        respostasAceitas: ["I have English class at 7 o'clock on Monday."],
        dicas: ['Ex.: I have a meeting at 9 on Monday.', 'Inclua um dia da semana em inglês.'],
        explicacao: 'I have a meeting at 9 on Monday. A estrutura at + hora e on + dia é uma das mais usadas na vida real.',
        conceitos: ['en.horarios']
      }
    }
  ]
});
