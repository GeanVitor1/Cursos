Plataforma.registrarLicao({
  id: 'en-a1-07',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Lugares, direÃ§Ãµes e transporte',
  subtitulo: 'English A1 Â· Unidade 8',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Nomear lugares da cidade',
    'Pedir e entender direÃ§Ãµes simples',
    'Escolher meios de transporte'
  ],
  conceitos: ['en.lugares'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Where is the station?',
      introduz: ['en.lugares'],
      blocos: [
        { tipo: 'vocab', titulo: 'Lugares', pares: [
          ['bank / supermarket', 'banco / supermercado'],
          ['hospital / pharmacy', 'hospital / farmÃ¡cia'],
          ['station / airport', 'estaÃ§Ã£o / aeroporto'],
          ['hotel / restaurant', 'hotel / restaurante']
        ] },
        { tipo: 'vocab', titulo: 'DireÃ§Ãµes e transporte', pares: [
          ['go straight', 'siga em frente'],
          ['turn left / turn right', 'vire Ã  esquerda / Ã  direita'],
          ['on foot / by bus / by train', 'a pÃ© / de Ã´nibus / de trem'],
          ['next to / near', 'ao lado de / perto de']
        ] },
        { tipo: 'ingles', frase: 'Go straight and turn left. The bank is next to the supermarket.', traducao: 'Siga em frente e vire Ã  esquerda. O banco fica ao lado do supermercado.' },
        { tipo: 'nota', tom: 'info', texto: '`Where is...?` (Onde fica...?) Ã© a pergunta-chave. Responda com `go straight`, `turn left` ou `turn right` e diga o ponto de referÃªncia.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-07-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'OuÃ§a a direÃ§Ã£o e escolha o caminho correto.',
        audio: 'Go straight and turn right. The hotel is next to the bank.',
        opcoes: [
          'Siga em frente, vire Ã  direita; o hotel Ã© ao lado do banco.',
          'Vire Ã  esquerda; o hotel Ã© perto do aeroporto.',
          'Volte e siga em frente; o banco Ã© ao lado do hotel.'
        ],
        correta: 0,
        dicas: ['Turn right Ã© virar Ã  direita.', 'Next to Ã© ao lado de.'],
        explicacao: 'go straight + turn right + next to the bank. O roteiro de direÃ§Ãµes completo.',
        conceitos: ['en.lugares']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-07-a2',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte o lugar ao significado.',
        pares: [
          ['airport', 'aeroporto'],
          ['pharmacy', 'farmÃ¡cia'],
          ['station', 'estaÃ§Ã£o'],
          ['supermarket', 'supermercado']
        ],
        dicas: ['Pharmacy lembra "farmÃ¡cia".', 'Station Ã© onde se pegam trens ou metrÃ´.'],
        explicacao: 'Esses lugares aparecem em qualquer mapa ou aplicativo de transporte.',
        conceitos: ['en.lugares']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-07-a3',
        tipo: 'dialogue',
        habilidade: 'compreensao',
        dimensao: 'aplicacao',
        enunciado: 'PeÃ§a informaÃ§Ãµes na rua.',
        cena: 'VocÃª estÃ¡ perdido e pergunta a um morador.',
        interlocutor: 'Local',
        turnos: [
          { fala: 'Hi! Can I help you?', opcoes: ['Yes, where is the train station?', 'I would like a coffee.', 'My name is Ana.'], correta: 0 },
          { fala: 'Go straight and turn left. It is near the hospital.', opcoes: ['Thank you! Is it far?', 'She is my sister.', 'It costs twenty dollars.'], correta: 0 },
          { fala: 'No, it is a five-minute walk.', opcoes: ['Great, thank you very much!', 'On Monday at nine.', "I'm twenty years old."], correta: 0 }
        ],
        dicas: ['Where is...? pergunta o lugar.', '"Is it far?" pergunta se Ã© longe.'],
        explicacao: 'Perguntar onde fica, entender a direÃ§Ã£o e agradecer: vocÃª consegue se localizar em inglÃªs.',
        conceitos: ['en.lugares'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-07-a4',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete as direÃ§Ãµes.',
        codigo: 'Go {{1}} and turn {{2}}. The bank is {{3}} to the supermarket.',
        lacunas: [['straight'], ['left', 'right'], ['next']],
        dicas: ['Siga em frente = go ___.', 'Vire Ã  esquerda ou Ã  direita.', 'Ao lado de = ___ to.'],
        explicacao: 'go straight, turn left/right, next to. Com essas trÃªs estruturas vocÃª dÃ¡ e entende direÃ§Ãµes.',
        conceitos: ['en.lugares']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-07-a5',
        tipo: 'write-code',
        habilidade: 'writing',
        dimensao: 'construcao',
        enunciado: 'Escreva: pergunte onde fica o aeroporto e diga que vai de Ã´nibus.',
        esqueleto: 'Where is ...? I go ...',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return t.indexOf('where is') !== -1 && (t.indexOf('by bus') !== -1 || t.indexOf('by train') !== -1 || t.indexOf('on foot') !== -1);
        },
        respostasAceitas: ['Where is the airport? I go by bus.'],
        dicas: ['Comece com Where is the...', 'Use by bus, by train ou on foot.'],
        explicacao: 'Where is the airport? I go by bus. â€” pedir informaÃ§Ã£o e dizer o transporte em duas frases.',
        conceitos: ['en.lugares']
      }
    }
  ]
});
