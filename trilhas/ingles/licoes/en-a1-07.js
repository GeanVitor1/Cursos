Plataforma.registrarLicao({
  id: 'en-a1-07',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Lugares, direções e transporte',
  subtitulo: 'English A1 · Unidade 8',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Nomear lugares da cidade',
    'Pedir e entender direções simples',
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
          ['hospital / pharmacy', 'hospital / farmácia'],
          ['station / airport', 'estação / aeroporto'],
          ['hotel / restaurant', 'hotel / restaurante']
        ] },
        { tipo: 'vocab', titulo: 'Direções e transporte', pares: [
          ['Where is...?', 'Onde fica...?'],
          ['go straight', 'siga em frente'],
          ['turn left / turn right', 'vire à esquerda / à direita'],
          ['on foot / by bus / by train', 'a pé / de ônibus / de trem'],
          ['next to / near', 'ao lado de / perto de'],
          ['Is it far?', 'É longe?'],
          ['minute / walk', 'minuto / caminhada'],
          ['It costs...', 'Custa...']
        ] },
        { tipo: 'ingles', frase: 'Go straight and turn left. The bank is next to the supermarket.', traducao: 'Siga em frente e vire à esquerda. O banco fica ao lado do supermercado.' },
        { tipo: 'nota', tom: 'info', texto: '`Where is...?` (Onde fica...?) é a pergunta-chave. Responda com `go straight`, `turn left` ou `turn right` e diga o ponto de referência.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-07-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'Ouça a direção e escolha o caminho correto.',
        audio: 'Go straight and turn right. The hotel is next to the bank.',
        opcoes: [
          'Siga em frente, vire à direita; o hotel é ao lado do banco.',
          'Vire à esquerda; o hotel é perto do aeroporto.',
          'Volte e siga em frente; o banco é ao lado do hotel.'
        ],
        correta: 0,
        dicas: ['Turn right é virar à direita.', 'Next to é ao lado de.'],
        explicacao: 'go straight + turn right + next to the bank. O roteiro de direções completo.',
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
          ['pharmacy', 'farmácia'],
          ['station', 'estação'],
          ['supermarket', 'supermercado']
        ],
        dicas: ['Pharmacy lembra "farmácia".', 'Station é onde se pegam trens ou metrô.'],
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
        enunciado: 'Peça informações na rua.',
        cena: 'Você está perdido e pergunta a um morador.',
        interlocutor: 'Local',
        turnos: [
          { fala: 'Hi! Can I help you?', opcoes: ['Yes, where is the train station?', 'I would like a coffee.', 'My name is Ana.'], correta: 0 },
          { fala: 'Go straight and turn left. It is near the hospital.', opcoes: ['Thank you! Is it far?', 'She is my sister.', 'It costs twenty dollars.'], correta: 0 },
          { fala: 'No, it is a five-minute walk.', opcoes: ['Great, thank you!', 'On Monday at nine.', "I'm twenty years old."], correta: 0 }
        ],
        dicas: ['Where is...? pergunta o lugar.', '"Is it far?" pergunta se é longe.'],
        explicacao: 'Perguntar onde fica, entender a direção e agradecer: você consegue se localizar em inglês.',
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
        enunciado: 'Complete as direções.',
        codigo: 'Go {{1}} and turn {{2}}. The bank is {{3}} to the supermarket.',
        lacunas: [['straight'], ['left', 'right'], ['next']],
        dicas: ['Siga em frente = go ___.', 'Vire à esquerda ou à direita.', 'Ao lado de = ___ to.'],
        explicacao: 'go straight, turn left/right, next to. Com essas três estruturas você dá e entende direções.',
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
        enunciado: 'Escreva: pergunte onde fica o aeroporto e diga que vai de ônibus.',
        esqueleto: 'Where is ...? I go ...',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return t.indexOf('where is') !== -1 && (t.indexOf('by bus') !== -1 || t.indexOf('by train') !== -1 || t.indexOf('on foot') !== -1);
        },
        respostasAceitas: ['Where is the airport? I go by bus.'],
        dicas: ['Comece com Where is the...', 'Use by bus, by train ou on foot.'],
        explicacao: 'Where is the airport? I go by bus. — pedir informação e dizer o transporte em duas frases.',
        conceitos: ['en.lugares']
      }
    }
  ]
});
