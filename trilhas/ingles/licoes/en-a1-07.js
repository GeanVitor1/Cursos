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
      titulo: 'Lugares da cidade (1)',
      introduz: ['en.lugares'],
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['bank / supermarket', 'banco / supermercado'],
          ['hospital / pharmacy', 'hospital / farmácia']
        ] },
        { tipo: 'ingles', frase: 'This is the bank.', traducao: 'Este é o banco.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-07-p1',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada lugar ao significado.',
        pares: [
          ['bank', 'banco'],
          ['supermarket', 'supermercado'],
          ['pharmacy', 'farmácia']
        ],
        dicas: ['Pharmacy lembra "farmácia".', 'Bank é onde se guarda dinheiro.'],
        explicacao: 'bank, supermarket e pharmacy: lugares que aparecem em qualquer caminho pela cidade.',
        conceitos: ['en.lugares']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Lugares da cidade (2)',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['station / airport', 'estação / aeroporto'],
          ['hotel / restaurant', 'hotel / restaurante']
        ] },
        { tipo: 'ingles', frase: 'This is the station.', traducao: 'Esta é a estação.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-07-p2',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **airport**?',
        opcoes: ['Aeroporto', 'Estação', 'Hotel', 'Restaurante'],
        correta: 0,
        feedbackErro: {
          1: 'Estação é **station**.',
          2: 'Hotel é **hotel**.',
          3: 'Restaurante é **restaurant**.'
        },
        dicas: ['Air vem de avião.', 'É onde os voos chegam e partem.'],
        explicacao: 'airport = aeroporto; station = estação. Lugares de viagem que você vai usar muito.',
        conceitos: ['en.lugares']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Onde fica?',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['Where is...?', 'Onde fica...?'],
          ['Is it far?', 'É longe?'],
          ['minute / walk', 'minuto / caminhada']
        ] },
        { tipo: 'ingles', frase: 'Where is the hotel?', traducao: 'Onde fica o hotel?' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-07-p3',
        tipo: 'order-blocks',
        habilidade: 'gramatica',
        dimensao: 'ordenacao',
        enunciado: 'Ordene para perguntar onde fica o hotel.',
        blocos: ['Where', 'is', 'the', 'hotel?'],
        dicas: ['Comece com Where.', 'O verbo is vem antes do lugar.'],
        explicacao: 'Where is the hotel? — a pergunta-chave para se localizar em qualquer cidade.',
        conceitos: ['en.lugares']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Direções',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['go straight', 'siga em frente'],
          ['turn left / turn right', 'vire à esquerda / à direita']
        ] },
        { tipo: 'ingles', frase: 'Go straight and turn left.', traducao: 'Siga em frente e vire à esquerda.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-07-p4',
        tipo: 'order-blocks',
        habilidade: 'gramatica',
        dimensao: 'ordenacao',
        enunciado: 'Ordene a direção.',
        blocos: ['Go', 'straight', 'and', 'turn', 'left.'],
        dicas: ['Comece com o verbo Go.', 'Straight vem logo depois.'],
        explicacao: 'Go straight and turn left. — a direção completa em uma frase.',
        conceitos: ['en.lugares']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Ao lado de, perto de',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['next to / near', 'ao lado de / perto de'],
          ['It costs...', 'Custa...']
        ] },
        { tipo: 'ingles', frase: 'The bank is next to the supermarket.', traducao: 'O banco fica ao lado do supermercado.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-07-p5',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **next to**?',
        opcoes: ['Ao lado de', 'Em frente de', 'Longe de', 'Dentro de'],
        correta: 0,
        feedbackErro: {
          1: 'Em frente de é outra posição, que você verá depois.',
          2: 'Longe de é o contrário de perto.',
          3: 'Dentro de é outra posição.'
        },
        dicas: ['Next to indica vizinhança.', 'É uma das respostas mais comuns ao dar direções.'],
        explicacao: 'next to = ao lado de; near = perto de. Use para dar o ponto de referência.',
        conceitos: ['en.lugares']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Transporte',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['on foot / by bus / by train', 'a pé / de ônibus / de trem']
        ] },
        { tipo: 'ingles', frase: 'I go to work on foot.', traducao: 'Eu vou ao trabalho a pé.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-07-p6',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada transporte ao significado.',
        pares: [
          ['on foot', 'a pé'],
          ['by bus', 'de ônibus'],
          ['by train', 'de trem']
        ],
        dicas: ['Foot é o pé.', 'Bus é ônibus; train é trem.'],
        explicacao: 'on foot, by bus e by train: como você se locomove pela cidade.',
        conceitos: ['en.lugares']
      }
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
