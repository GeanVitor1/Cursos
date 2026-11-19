Plataforma.registrarLicao({
  id: 'ingles-03',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Descrevendo pessoas e lugares',
  subtitulo: 'English A2 · Unidade 5',
  duracaoMin: 35,
  xp: 35,
  objetivos: [
    'Descrever lugares com quiet e busy',
    'Comparar lugares com bigger e more comfortable',
    'Descrever pessoas com friendly e very'
  ],
  conceitos: ['en.a2-descricao'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Descrevendo o ambiente',
      introduz: ['en.a2-descricao'],
      blocos: [
        { tipo: 'texto', texto: 'No dia a dia, precisamos descrever se um lugar é agitado, calmo ou confortável. Vamos ver dois adjetivos essenciais.' },
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['quiet', 'tranquilo / silencioso', '🤫', 'descrevendo um café tranquilo'],
          ['busy', 'movimentado / ocupado', '🏙️', 'descrevendo o centro da cidade'],
          ['place', 'lugar', '📍', 'falando de um lugar']
        ] },
        { tipo: 'ingles', frase: 'This is a quiet place.', traducao: 'Este é um lugar tranquilo.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-03-p1',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada palavra ao significado.',
        pares: [
          ['quiet', 'tranquilo'],
          ['busy', 'movimentado'],
          ['place', 'lugar']
        ],
        dicas: ['Quiet lembra quietude.', 'Busy serve para pessoas ocupadas e lugares cheios.'],
        explicacao: 'quiet = tranquilo; busy = movimentado ou ocupado; place = lugar.',
        conceitos: ['en.a2-descricao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Comparando dois lugares',
      blocos: [
        { tipo: 'texto', texto: 'Para dizer que algo é **maior que** outro, o inglês acrescenta **-er** e usa a palavra **than**.' },
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['bigger', 'maior', '⬆️', 'comparando dois apartamentos'],
          ['than', 'do que / que', '⚖️', 'comparando duas coisas'],
          ['room', 'quarto / sala', '🛋️', 'descrevendo um quarto de hotel']
        ] },
        { tipo: 'ingles', frase: 'This room is bigger than that room.', traducao: 'Este quarto é maior do que aquele quarto.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-03-p2',
        tipo: 'order-blocks',
        habilidade: 'gramatica',
        dimensao: 'ordenacao',
        enunciado: 'Ordene a comparação entre os dois quartos.',
        blocos: ['This room', 'is', 'bigger', 'than', 'that room.'],
        dicas: ['Comece com This room.', 'O adjetivo comparativo vem antes de than.'],
        explicacao: 'This room is bigger than that room. — comparativo direto com -er than.',
        conceitos: ['en.a2-descricao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Adjetivos longos: more comfortable',
      blocos: [
        { tipo: 'texto', texto: 'Com adjetivos mais longos, usamos **more** antes da palavra, em vez de colocar -er no final.' },
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['comfortable', 'confortável', '🛏️', 'descrevendo uma cama de hotel'],
          ['more', 'mais', '➕', 'comparando duas opções']
        ] },
        { tipo: 'ingles', frase: 'The hotel is more comfortable.', traducao: 'O hotel é mais confortável.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-03-p3',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete com a palavra que indica "mais".',
        codigo: 'The hotel is {{1}} comfortable.',
        lacunas: [['more']],
        dicas: ['Palavra de 4 letras que significa "mais" com adjetivos longos.', 'Começa com m.'],
        explicacao: 'more comfortable = mais confortável. Adjetivos longos recebem more.',
        conceitos: ['en.a2-descricao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Descrevendo pessoas: amigável e simpático',
      blocos: [
        { tipo: 'texto', texto: 'Ao falar das pessoas ou de amigos, descrevemos como eles são.' },
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['friendly', 'amigável / simpático', '😄', 'descrevendo um colega'],
          ['very', 'muito', '💯', 'dando ênfase a uma opinião'],
          ['people', 'pessoas', '👥', 'falando de gente de uma cidade']
        ] },
        { tipo: 'ingles', frase: 'The people are very friendly.', traducao: 'As pessoas são muito simpáticas.' },
        { tipo: 'vida-real', emoji: '🏨', titulo: 'Comparando dois hotéis', texto: 'Você escolhe onde se hospedar e compara as opções com um amigo. Os comparativos mostram qual lugar é maior, mais calmo ou mais confortável.', frase: 'This place is quiet. The people are very friendly.', traducao: 'Este lugar é tranquilo. As pessoas são muito simpáticas.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-03-p4',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        audio: 'This city is busy and the people are very friendly.',
        enunciado: 'Ouça a frase e selecione a tradução correta.',
        opcoes: [
          'Esta cidade é movimentada e as pessoas são muito simpáticas.',
          'Esta cidade é silenciosa e não tem pessoas.',
          'O voo foi cancelado ontem à noite.',
          'Nós vamos almoçar juntos na praia.'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A frase diz que a cidade é movimentada.',
          2: 'A frase não trata de voo.',
          3: 'A frase não trata de almoço.'
        },
        dicas: ['Busy significa movimentada.', 'Friendly significa simpáticas ou amigáveis.'],
        explicacao: 'This city is busy and the people are very friendly. combina a descrição da cidade e das pessoas.',
        conceitos: ['en.a2-descricao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-03-p5',
        tipo: 'dialogue',
        habilidade: 'compreensao',
        dimensao: 'aplicacao',
        enunciado: 'Descreva o hotel e a cidade com um colega.',
        cena: 'Conversando com Sara sobre o hotel onde você está hospedado.',
        interlocutor: 'Sara',
        turnos: [
          {
            fala: 'How is the hotel?',
            opcoes: [
              'It is very comfortable and quiet.',
              'I bought some fruit yesterday.',
              'My flight is at gate ten.'
            ],
            correta: 0
          },
          {
            fala: 'Is your room bigger now?',
            opcoes: [
              'Yes, it is bigger than my room at home.',
              'No, I have not visited Canada.',
              'I am twenty-five years old.'
            ],
            correta: 0
          },
          {
            fala: 'And how are the people in the city?',
            opcoes: [
              'They are very friendly!',
              'I usually wake up at seven.',
              'It costs one hundred dollars.'
            ],
            correta: 0
          }
        ],
        dicas: ['Diga que o hotel é confortável e tranquilo.', 'Use bigger than para falar do tamanho.', 'Diga que eles são simpáticos com friendly.'],
        explicacao: 'Esse diálogo reúne adjetivos de lugar, comparativos e descrições de pessoas.',
        conceitos: ['en.a2-descricao'],
        desafio: true
      }
    }
  ]
});
