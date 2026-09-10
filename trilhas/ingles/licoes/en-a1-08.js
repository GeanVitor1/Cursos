Plataforma.registrarLicao({
  id: 'en-a1-08',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Perguntas básicas e conversa informal',
  subtitulo: 'English A1 · Unidade 9',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Usar as palavras de pergunta (what, where, when, who, how)',
    'Fazer e responder perguntas simples',
    'Manter uma conversa informal curta'
  ],
  conceitos: ['en.perguntas'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Everyday questions',
      introduz: ['en.perguntas'],
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras de pergunta', pares: [
          ['What...?', 'O que...?'],
          ['Where...?', 'Onde...?'],
          ['When...?', 'Quando...?'],
          ['Who...?', 'Quem...?'],
          ['Why...? / How...?', 'Por que...? / Como...?']
        ] },
        { tipo: 'vocab', titulo: 'Perguntas de conversa', pares: [
          ['Where are you from?', 'De onde você é?'],
          ['What do you do?', 'O que você faz (trabalho)?'],
          ['How is the weather?', 'Como está o tempo?'],
          ['What about you?', 'E você?']
        ] },
        { tipo: 'ingles', frase: "Where are you from? — I'm from Brazil. What about you?", traducao: 'De onde você é? — Sou do Brasil. E você?' },
        { tipo: 'nota', tom: 'info', texto: '`What do you do?` pergunta a profissão — não confunda com `What are you doing?`, que pergunta o que você está fazendo agora.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-08-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'Ouça a conversa e escolha a resposta correta.',
        audio: "Where are you from? I'm from Brazil.",
        opcoes: [
          'De onde você é? Sou do Brasil.',
          'O que você faz? Sou do Brasil.',
          'Quantos anos você tem? Sou do Brasil.'
        ],
        correta: 0,
        dicas: ['"Where are you from?" começa com onde.', 'Brazil é o país citado.'],
        explicacao: 'Where are you from? — a pergunta de origem mais comum em conversas.',
        conceitos: ['en.perguntas']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-08-a2',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte a palavra de pergunta ao significado.',
        pares: [
          ['What', 'O que'],
          ['Where', 'Onde'],
          ['When', 'Quando'],
          ['Who', 'Quem']
        ],
        dicas: ['Where lembra "warehouse"? Não! É onde.', 'When lembra tempo/when.'],
        explicacao: 'Dominar essas palavras é a base para fazer qualquer pergunta.',
        conceitos: ['en.perguntas']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-08-a3',
        tipo: 'order-blocks',
        habilidade: 'gramatica',
        dimensao: 'ordenacao',
        enunciado: 'Ordene para formar a pergunta: "De onde você é?"',
        blocos: ['Where', 'are', 'you', 'from?'],
        dicas: ['Comece com a palavra de pergunta.', 'O verbo are vem antes de you.'],
        explicacao: 'Where are you from? — pergunta em que o verbo vem antes do sujeito.',
        conceitos: ['en.perguntas']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-08-a4',
        tipo: 'dialogue',
        habilidade: 'compreensao',
        dimensao: 'aplicacao',
        enunciado: 'Pratique uma conversa informal.',
        cena: 'Você está em uma festa e conhece alguém novo.',
        interlocutor: 'Chris',
        turnos: [
          { fala: 'Hi! Where are you from?', opcoes: ["I'm from Brazil. And you?", 'I go to bed at ten.', 'It is twenty dollars.'], correta: 0 },
          { fala: "I'm from Canada. What do you do?", opcoes: ["I'm a developer.", 'On Monday at nine.', 'Yes, please.'], correta: 0 },
          { fala: 'Nice! Do you like it here?', opcoes: ['Yes, it is great!', 'My name is Ana.', 'I usually wake up at seven.'], correta: 0 }
        ],
        dicas: ['"What do you do?" pergunta sua profissão.', '"Do you like it here?" pergunta se você gosta do lugar.'],
        explicacao: 'Origem, profissão e opinião: o roteiro de uma conversa informal completa.',
        conceitos: ['en.perguntas'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-08-a5',
        tipo: 'reading',
        habilidade: 'reading',
        dimensao: 'reconhecimento',
        titulo: 'Chat message',
        enunciado: 'Leia a mensagem e responda.',
        texto: 'Hi Ana! I am in São Paulo this week. Where are you now? Do you want to have lunch on Friday?',
        pergunta: 'O que a pessoa está convidando você a fazer?',
        opcoes: ['Almoçar na sexta-feira', 'Viajar na segunda-feira', 'Trabalhar no domingo', 'Jantar na quinta-feira'],
        correta: 0,
        dicas: ['"Have lunch" é almoçar.', '"On Friday" é o dia do convite.'],
        explicacao: 'Ler uma mensagem curta e identificar um convite é uma das leituras mais úteis no dia a dia.',
        conceitos: ['en.perguntas']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-08-a6',
        tipo: 'write-code',
        habilidade: 'writing',
        dimensao: 'construcao',
        enunciado: 'Escreva duas perguntas de conversa informal que você faria a alguém novo.',
        esqueleto: 'Where ...? What ...?',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return t.split('?').filter(function (p) { return p.trim().length > 3; }).length >= 2;
        },
        respostasAceitas: ['Where are you from? What do you do?'],
        dicas: ['Use as palavras de pergunta da unidade.', 'Termine cada pergunta com ponto de interrogação.'],
        explicacao: 'Where are you from? What do you do? — com essas perguntas você começa uma conversa com qualquer pessoa.',
        conceitos: ['en.perguntas']
      }
    }
  ]
});
