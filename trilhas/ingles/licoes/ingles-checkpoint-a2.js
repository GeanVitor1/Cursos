Plataforma.registrarLicao({
  id: 'ingles-checkpoint-a2',
  trilha: 'ingles',
  tipo: 'prova',
  titulo: 'Checkpoint A2 — Básico',
  subtitulo: 'English A2 · Prova de nível',
  duracaoMin: 40,
  xp: 100,
  objetivos: [
    'Consolidar passado simples e planos futuros',
    'Avaliar vocabulário de viagem, aeroporto e hotel',
    'Verificar experiências de vida com o present perfect',
    'Avaliar descrições de lugares e comunicação de saúde'
  ],
  conceitos: ['en.passado', 'en.futuro', 'en.viagem', 'en.a2-experiencias', 'en.a2-descricao', 'en.a2-saude'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova de nível A2',
      blocos: [
        { tipo: 'texto', texto: 'Este checkpoint reúne atividades práticas com situações reais do nível A2: passado simples, planos com going to e will, viagens, experiências com have you ever, descrições e mensagens.' },
        { tipo: 'lista', itens: [
          'Ouça os áudios com atenção.',
          'Dicas continuam disponíveis durante a prova.'
        ] }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-cp1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        audio: 'Yesterday I worked and then I stayed home.',
        enunciado: 'Ouça o áudio e selecione a tradução correta.',
        opcoes: [
          'Ontem eu trabalhei e depois fiquei em casa.',
          'Hoje vou trabalhar e ficar em casa.',
          'Amanhã vou viajar para a praia.'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A frase usa yesterday e verbos no passado.',
          2: 'A frase não trata de viagem ou amanhã.'
        },
        dicas: ['Yesterday marca o passado.', 'Worked e stayed têm terminação -ed.'],
        explicacao: 'Yesterday I worked and then I stayed home. relata ações concluídas no passado.',
        conceitos: ['en.passado']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-cp2',
        tipo: 'order-blocks',
        habilidade: 'gramatica',
        dimensao: 'ordenacao',
        enunciado: 'Ordene a frase sobre planos futuros.',
        blocos: ["I'm", 'going to', 'travel', 'next week.'],
        dicas: ['Comece com I\'m.', 'Going to vem antes do verbo travel.'],
        explicacao: "I'm going to travel next week. expressa um plano já decidido.",
        conceitos: ['en.futuro']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-cp3',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'No aeroporto, qual documento é o **boarding pass**?',
        opcoes: [
          'Cartão de embarque',
          'Passaporte',
          'Bagagem',
          'Chave do quarto'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Passaporte é passport.',
          2: 'Bagagem é luggage.',
          3: 'Chave do quarto é room key.'
        },
        dicas: ['Pass de embarque.', 'É o cartão para entrar no avião.'],
        explicacao: 'boarding pass = cartão de embarque; passport = passaporte.',
        conceitos: ['en.viagem']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-cp4',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        audio: 'Have you ever visited Canada?',
        enunciado: 'Ouça e responda: o que foi perguntado?',
        opcoes: [
          'Se você já visitou o Canadá alguma vez',
          'Se você vai morar no Canadá no próximo ano',
          'Se você comprou passagens para viajar hoje'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Have you ever pergunta sobre experiências passadas na vida.',
          2: 'A frase não trata de comprar passagens.'
        },
        dicas: ['Have you ever pergunta por experiências de vida.', 'Canada é o país.'],
        explicacao: 'Have you ever visited Canada? — pergunta clássica sobre experiências de vida.',
        conceitos: ['en.a2-experiencias']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-cp5',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete a frase negativa sobre experiências.',
        codigo: "I haven't visited London {{1}}.",
        lacunas: [['yet']],
        dicas: ['Palavra de 3 letras usada em frases negativas.', 'Começa com y.'],
        explicacao: 'Yet ao fim de sentenças negativas indica que a ação não aconteceu até agora.',
        conceitos: ['en.a2-experiencias']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-cp6',
        tipo: 'order-blocks',
        habilidade: 'gramatica',
        dimensao: 'ordenacao',
        enunciado: 'Ordene a comparação de tamanho.',
        blocos: ['This room', 'is', 'bigger', 'than', 'that room.'],
        dicas: ['This room é o sujeito.', 'Bigger que significa maior.', 'Than introduz o segundo termo.'],
        explicacao: 'This room is bigger than that room. — comparativo direto com -er than.',
        conceitos: ['en.a2-descricao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-cp7',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada palavra ao seu significado.',
        pares: [
          ['quiet', 'tranquilo'],
          ['busy', 'movimentado'],
          ['tired', 'cansado'],
          ['headache', 'dor de cabeça']
        ],
        dicas: ['Quiet é silencioso.', 'Tired indica cansaço.', 'Headache é dor de cabeça.'],
        explicacao: 'Adjetivos de lugares e estados de saúde comuns do dia a dia.',
        conceitos: ['en.a2-descricao', 'en.a2-saude']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-cp8',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        audio: 'Could you call me back later, please?',
        enunciado: 'Ouça o áudio e selecione o significado.',
        opcoes: [
          'Você poderia me ligar de volta mais tarde, por favor?',
          'Você pode me enviar uma foto da cidade?',
          'O voo sai às sete da noite, por favor.'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Call me back é retornar a ligação.',
          2: 'A frase não fala de voo.'
        },
        dicas: ['Call me back é retornar ligação.', 'Later é mais tarde.'],
        explicacao: 'Could you call me back later, please? é o pedido educado de retorno de chamada.',
        conceitos: ['en.a2-saude']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-cp9',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete a mensagem sobre o compromisso médico.',
        codigo: 'I have an {{1}} with the doctor.',
        lacunas: [['appointment']],
        dicas: ['Palavra que significa compromisso ou consulta marcada.', 'Começa com a.'],
        explicacao: 'appointment = compromisso com hora marcada.',
        conceitos: ['en.a2-saude']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-cp10',
        tipo: 'reading',
        habilidade: 'reading',
        dimensao: 'aplicacao',
        titulo: 'Trip message',
        enunciado: 'Leia a mensagem e responda à pergunta.',
        texto: 'Hi! Last week I was in London. The city was busy and the hotel was very comfortable. Tomorrow I will visit my parents.',
        pergunta: 'Como estava a cidade e o que a pessoa fará amanhã?',
        opcoes: [
          'A cidade estava movimentada e amanhã ela visitará os pais',
          'A cidade estava vazia e amanhã ela viajará para a praia',
          'O hotel estava fechado e amanhã ela irá ao médico'
        ],
        correta: 0,
        dicas: ['City was busy.', 'Tomorrow I will visit my parents.'],
        explicacao: 'O texto reúne passado (was), descrição (busy, comfortable) e futuro (tomorrow I will visit).',
        conceitos: ['en.passado', 'en.futuro', 'en.a2-descricao'],
        desafio: true
      }
    }
  ]
});
