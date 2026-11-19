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
        blocos: ['My sister', 'is going to', 'visit', 'London', 'tomorrow.'],
        dicas: ['Comece pelo sujeito: My sister.', 'Is going to vem antes do verbo visit.'],
        explicacao: 'My sister is going to visit London tomorrow. expressa um plano já decidido (going to + verbo).',
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
        audio: 'She has already visited Canada twice.',
        enunciado: 'Ouça e responda: o que foi dito?',
        opcoes: [
          'Ela já visitou o Canadá duas vezes',
          'Ela vai visitar o Canadá no próximo ano',
          'Ela ainda não visitou o Canadá'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Has visited indica experiência já vivida, não plano futuro.',
          2: 'A frase tem already (já), não yet com negação.'
        },
        dicas: ['Has + visited é o present perfect.', 'Already significa já.'],
        explicacao: 'She has already visited Canada twice. — has + particípio com already: experiência já vivida.',
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
        enunciado: 'Complete a frase sobre o que ele já fez.',
        codigo: 'He {{1}} already seen that movie.',
        lacunas: [['has']],
        dicas: ['He (ele) usa a forma com s do verbo auxiliar.', 'Has/have + particípio (seen).'],
        explicacao: 'He has already seen that movie. — com he/she/it o present perfect usa has.',
        conceitos: ['en.a2-experiencias']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-cp6',
        tipo: 'multiple-choice',
        habilidade: 'gramatica',
        dimensao: 'reconhecimento',
        enunciado: 'Qual frase compara corretamente os dois hotéis?',
        opcoes: [
          'The hotel is more comfortable than the room.',
          'The hotel is comfortable than the room.',
          'The hotel is more comfortable that the room.',
          'The hotel is more bigger than the room.'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Falta o more antes de comfortable: sem ele, a comparação fica incompleta.',
          2: 'O comparativo usa than, não that.',
          3: 'Não se usa more com bigger: ou bigger ou more + adjetivo longo.'
        },
        dicas: ['Comfortable é um adjetivo longo.', 'O segundo termo vem depois de than.'],
        explicacao: 'more comfortable than: more + comfortable + than e than.',
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
        audio: 'I have a headache. I have an appointment with the doctor at four.',
        enunciado: 'Ouça o áudio e selecione o significado.',
        opcoes: [
          'Estou com dor de cabeça e tenho consulta com o médico às quatro',
          'Estou cansado e vou ao médico amanhã',
          'Tenho uma reunião às quatro com o médico da empresa'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A frase não fala de cansaço nem de amanhã.',
          2: 'Appointment é consulta, não reunião de trabalho.'
        },
        dicas: ['Headache é dor de cabeça.', 'Appointment with the doctor é consulta médica.'],
        explicacao: 'I have a headache. I have an appointment with the doctor at four. — saúde e compromisso.',
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
        enunciado: 'Complete o pedido educado ao telefone.',
        codigo: 'Could you {{1}} me back later, please?',
        lacunas: [['call']],
        dicas: ['Complete: ___ me back.', 'Verbo de 4 letras.'],
        explicacao: 'Could you call me back later, please? — pedido educado de retorno de chamada.',
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
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-cp11',
        tipo: 'write-code',
        habilidade: 'writing',
        dimensao: 'construcao',
        enunciado: 'Escreva duas frases: uma sobre o que você fez no fim de semana passado (passado simples) e outra sobre um plano para amanhã (going to).',
        esqueleto: 'Last weekend I ... . Tomorrow I am going to ... .',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase().replace(/\s+/g, ' ');
          const irregulares = 'was were had went did saw ate got made took came bought drank slept wrote met ran said told felt left found gave knew sat spoke wore woke drove began'.split(' ');
          const naoPassado = ['hundred', 'speed', 'indeed', 'bleed', 'breed', 'proceed', 'succeed', 'exceed', 'sacred', 'naked', 'wicked'];
          const frases = t.split(/[.!?\n]/).map(function (f) { return f.trim(); }).filter(function (f) { return f.length > 5; });
          const passado = frases.some(function (f) {
            return /\b(?:last (?:weekend|week|night)|yesterday)\b/.test(f) && f.split(' ').some(function (w) {
              return irregulares.indexOf(w) !== -1 || (/^[a-z]{3,}ed$/.test(w) && naoPassado.indexOf(w) === -1);
            });
          });
          const presenteErrado = /\b(?:last (?:weekend|week|night)|yesterday) i (?:go|have|see|buy|take|work|study|eat|get|make|come|watch|play|visit|stay)\b/.test(t);
          const plano = /\b(?:am|is|are|'s|'re) going to (?!the\b|a\b|an\b|my\b|school\b|bed\b)[a-z]+/.test(t) && /\b(?:tomorrow|next [a-z]+|tonight)\b/.test(t);
          return frases.length >= 2 && passado && !presenteErrado && plano;
        },
        respostasAceitas: ['Last weekend I went to the beach. Tomorrow I am going to work.', "Last weekend I visited my parents. Tomorrow I'm going to study English."],
        dicas: ['Use last weekend + verbo no passado (went, visited, had...).', 'Use I am going to + verbo para o plano de amanhã.'],
        explicacao: 'Last weekend I went to the beach. Tomorrow I am going to work. — passado simples para o que já aconteceu e going to para o plano.',
        conceitos: ['en.passado', 'en.futuro']
      }
    }
  ]
});
