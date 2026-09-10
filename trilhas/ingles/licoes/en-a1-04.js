Plataforma.registrarLicao({
  id: 'en-a1-04',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Horas, dias e datas',
  subtitulo: 'English A1 Â· Unidade 5',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Perguntar e dizer as horas',
    'Nomear os dias da semana',
    'Usar at e on com horÃ¡rios e dias'
  ],
  conceitos: ['en.horarios'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'What time is it?',
      introduz: ['en.horarios'],
      blocos: [
        { tipo: 'vocab', titulo: 'Dizendo as horas', pares: [
          ["It's seven o'clock.", 'SÃ£o sete horas em ponto.'],
          ["It's seven thirty.", 'SÃ£o sete e trinta.'],
          ["It's half past seven.", 'SÃ£o sete e meia.'],
          ["It's a quarter to eight.", 'SÃ£o quinze para as oito.']
        ] },
        { tipo: 'vocab', titulo: 'Dias da semana', pares: [
          ['Monday, Tuesday, Wednesday', 'segunda, terÃ§a, quarta'],
          ['Thursday, Friday', 'quinta, sexta'],
          ['Saturday, Sunday', 'sÃ¡bado, domingo']
        ] },
        { tipo: 'ingles', frase: 'The meeting is at nine on Monday.', traducao: 'A reuniÃ£o Ã© Ã s nove na segunda-feira.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Use **at** para horas (`at 9 o\'clock`) e **on** para dias (`on Monday`). Datas usam **on**: `on March 10`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-04-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'OuÃ§a e marque o compromisso correto.',
        audio: 'The meeting is at nine thirty on Monday.',
        opcoes: [
          'Segunda-feira, Ã s 9h30',
          'Domingo, Ã s 9h',
          'TerÃ§a-feira, Ã s 10h30'
        ],
        correta: 0,
        dicas: ['Monday Ã© o dia.', 'Nine thirty Ã© o horÃ¡rio.'],
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
        enunciado: 'Conecte o dia da semana Ã  traduÃ§Ã£o.',
        pares: [
          ['Monday', 'segunda-feira'],
          ['Wednesday', 'quarta-feira'],
          ['Friday', 'sexta-feira'],
          ['Sunday', 'domingo']
        ],
        dicas: ['Wednesday Ã© a terceira.', 'Sunday Ã© o fim de semana.'],
        explicacao: 'Dias da semana em inglÃªs comeÃ§am com letra maiÃºscula. Monday, Tuesday, Wednesday sÃ£o os trÃªs primeiros.',
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
        enunciado: 'OuÃ§a e escreva o horÃ¡rio no formato H:MM (ex.: 7:30).',
        audio: 'The class starts at six forty-five.',
        modo: 'escrever',
        resposta: '6:45',
        placeholder: 'ex.: 7:30',
        dicas: ['six = 6.', 'forty-five = 45 minutos.'],
        explicacao: '6:45. VocÃª ouviu um horÃ¡rio e transformou em nÃºmero â€” habilidade essencial para horÃ¡rios de Ã´nibus, voos e reuniÃµes.',
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
        dicas: ['Dia da semana pede uma preposiÃ§Ã£o.', 'Hora pede outra.'],
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
        dicas: ['Ex.: I have a meeting at 9 on Monday.', 'Inclua um dia da semana em inglÃªs.'],
        explicacao: 'I have a meeting at 9 on Monday. A estrutura at + hora e on + dia Ã© uma das mais usadas na vida real.',
        conceitos: ['en.horarios']
      }
    }
  ]
});
