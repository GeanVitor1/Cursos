Plataforma.registrarLicao({
  id: 'ingles-04',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Saúde, telefone e mensagens',
  subtitulo: 'English A2 · Unidade 6',
  duracaoMin: 35,
  xp: 35,
  objetivos: [
    'Expressar como se sente com tired e headache',
    'Pedir para retornar ligação com call me back',
    'Enviar mensagens rápidas do dia a dia'
  ],
  conceitos: ['en.a2-saude'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Expressando como você se sente',
      introduz: ['en.a2-saude'],
      blocos: [
        { tipo: 'texto', texto: 'Quando você precisa avisar que não está se sentindo bem para uma reunião ou aula, usamos expressões simples de saúde.' },
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['tired', 'cansado / cansada'],
          ['headache', 'dor de cabeça'],
          ['feel', 'sentir']
        ] },
        { tipo: 'ingles', frase: 'I have a headache and I feel tired.', traducao: 'Estou com dor de cabeça e me sinto cansado.' },
        { tipo: 'nota', tom: 'info', texto: 'Em inglês, para dor de cabeça dizemos "I have a headache" (literalmente "eu tenho uma dor de cabeça").' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-04-p1',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada expressão ao significado.',
        pares: [
          ['tired', 'cansado'],
          ['headache', 'dor de cabeça'],
          ['feel', 'sentir']
        ],
        dicas: ['Tired lembra cansaço.', 'Headache junta head (cabeça) e ache (dor).'],
        explicacao: 'tired = cansado; headache = dor de cabeça; feel = sentir.',
        conceitos: ['en.a2-saude']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Ligando e pedindo retorno',
      blocos: [
        { tipo: 'texto', texto: 'Ao telefone, se a pessoa estiver ocupada ou não puder falar no momento, pedimos para ela retornar mais tarde.' },
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['call me back', 'me retorne a ligação'],
          ['later', 'mais tarde']
        ] },
        { tipo: 'ingles', frase: 'Could you call me back later?', traducao: 'Você poderia me ligar de volta mais tarde?' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-04-p2',
        tipo: 'order-blocks',
        habilidade: 'gramatica',
        dimensao: 'ordenacao',
        enunciado: 'Ordene o pedido educado ao telefone.',
        blocos: ['Could you', 'call me back', 'later,', 'please?'],
        dicas: ['Comece com Could you.', 'Call me back é retornar a ligação.', 'Please fica no final.'],
        explicacao: 'Could you call me back later, please? — frase educada e muito comum ao telefone.',
        conceitos: ['en.a2-saude']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Mensagens rápidas e compromissos',
      blocos: [
        { tipo: 'texto', texto: 'Para avisar sobre um compromisso ou enviar um recado rápido por mensagem de texto.' },
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['message', 'mensagem'],
          ['appointment', 'consulta / compromisso'],
          ['doctor', 'médico']
        ] },
        { tipo: 'ingles', frase: 'I have an appointment with the doctor.', traducao: 'Tenho uma consulta com o médico.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-04-p3',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete a mensagem sobre o compromisso médico.',
        codigo: 'I have an {{1}} with the doctor.',
        lacunas: [['appointment']],
        dicas: ['Palavra que significa consulta ou compromisso com hora marcada.', 'Começa com a.'],
        explicacao: 'appointment = compromisso com hora marcada, como uma consulta médica.',
        conceitos: ['en.a2-saude']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-04-p4',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        audio: 'I have an appointment today and I feel very tired.',
        enunciado: 'Ouça o áudio e selecione a tradução correta.',
        opcoes: [
          'Tenho uma consulta hoje e me sinto muito cansado.',
          'Vou ao supermercado comprar frutas e pão.',
          'Meu voo sai às nove da manhã.',
          'O hotel tem um quarto muito confortável.'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A frase não trata de supermercado.',
          2: 'A frase não fala de voo.',
          3: 'A frase não fala de hotel.'
        },
        dicas: ['Appointment é consulta.', 'Tired significa cansado.'],
        explicacao: 'I have an appointment today and I feel very tired. expressa compromisso e estado de saúde.',
        conceitos: ['en.a2-saude']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-04-p5',
        tipo: 'dialogue',
        habilidade: 'compreensao',
        dimensao: 'aplicacao',
        enunciado: 'Converse ao telefone com um colega.',
        cena: 'Chris liga para você no meio da tarde.',
        interlocutor: 'Chris',
        turnos: [
          {
            fala: 'Hi! Are you busy right now?',
            opcoes: [
              'I have a headache. Could you call me back later?',
              'Yesterday I bought some fruit.',
              'The hotel is very quiet.'
            ],
            correta: 0
          },
          {
            fala: 'Sure! Are you going to see a doctor?',
            opcoes: [
              'Yes, I have an appointment at four.',
              'No, my name is Ana.',
              'It is twenty dollars.'
            ],
            correta: 0
          },
          {
            fala: 'I will call you later. See you!',
            opcoes: [
              'Thank you! See you later.',
              'Good morning, nice to meet you.',
              'My room has two beds.'
            ],
            correta: 0
          }
        ],
        dicas: ['Peça para ligar de volta com call me back later.', 'Confirme que tem appointment com o doctor.', 'Agradeça pelo apoio.'],
        explicacao: 'Diálogo realista para gerenciar imprevistos de saúde e chamadas cotidianas.',
        conceitos: ['en.a2-saude'],
        desafio: true
      }
    }
  ]
});
