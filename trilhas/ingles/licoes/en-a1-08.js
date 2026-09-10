Plataforma.registrarLicao({
  id: 'en-a1-08',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Perguntas bÃ¡sicas e conversa informal',
  subtitulo: 'English A1 Â· Unidade 9',
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
          ['Where are you from?', 'De onde vocÃª Ã©?'],
          ['What do you do?', 'O que vocÃª faz (trabalho)?'],
          ['How is the weather?', 'Como estÃ¡ o tempo?'],
          ['What about you?', 'E vocÃª?']
        ] },
        { tipo: 'ingles', frase: "Where are you from? â€” I'm from Brazil. What about you?", traducao: 'De onde vocÃª Ã©? â€” Sou do Brasil. E vocÃª?' },
        { tipo: 'nota', tom: 'info', texto: '`What do you do?` pergunta a profissÃ£o â€” nÃ£o confunda com `What are you doing?`, que pergunta o que vocÃª estÃ¡ fazendo agora.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-08-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'OuÃ§a a conversa e escolha a resposta correta.',
        audio: "Where are you from? I'm from Brazil.",
        opcoes: [
          'De onde vocÃª Ã©? Sou do Brasil.',
          'O que vocÃª faz? Sou do Brasil.',
          'Quantos anos vocÃª tem? Sou do Brasil.'
        ],
        correta: 0,
        dicas: ['"Where are you from?" comeÃ§a com onde.', 'Brazil Ã© o paÃ­s citado.'],
        explicacao: 'Where are you from? â€” a pergunta de origem mais comum em conversas.',
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
        dicas: ['Where lembra "warehouse"? NÃ£o! Ã‰ onde.', 'When lembra tempo/when.'],
        explicacao: 'Dominar essas palavras Ã© a base para fazer qualquer pergunta.',
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
        enunciado: 'Ordene para formar a pergunta: "De onde vocÃª Ã©?"',
        blocos: ['Where', 'are', 'you', 'from?'],
        dicas: ['Comece com a palavra de pergunta.', 'O verbo are vem antes de you.'],
        explicacao: 'Where are you from? â€” pergunta em que o verbo vem antes do sujeito.',
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
        cena: 'VocÃª estÃ¡ em uma festa e conhece alguÃ©m novo.',
        interlocutor: 'Chris',
        turnos: [
          { fala: 'Hi! Where are you from?', opcoes: ["I'm from Brazil. And you?", 'I go to bed at ten.', 'It is twenty dollars.'], correta: 0 },
          { fala: "I'm from Canada. What do you do?", opcoes: ["I'm a developer.", 'On Monday at nine.', 'Yes, please.'], correta: 0 },
          { fala: 'Nice! Do you like it here?', opcoes: ['Yes, it is great!', 'My name is Ana.', 'I usually wake up at seven.'], correta: 0 }
        ],
        dicas: ['"What do you do?" pergunta sua profissÃ£o.', '"Do you like it here?" pergunta se vocÃª gosta do lugar.'],
        explicacao: 'Origem, profissÃ£o e opiniÃ£o: o roteiro de uma conversa informal completa.',
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
        texto: 'Hi Ana! I am in SÃ£o Paulo this week. Where are you now? Do you want to have lunch on Friday?',
        pergunta: 'O que a pessoa estÃ¡ convidando vocÃª a fazer?',
        opcoes: ['AlmoÃ§ar na sexta-feira', 'Viajar na segunda-feira', 'Trabalhar no domingo', 'Jantar na quinta-feira'],
        correta: 0,
        dicas: ['"Have lunch" Ã© almoÃ§ar.', '"On Friday" Ã© o dia do convite.'],
        explicacao: 'Ler uma mensagem curta e identificar um convite Ã© uma das leituras mais Ãºteis no dia a dia.',
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
        enunciado: 'Escreva duas perguntas de conversa informal que vocÃª faria a alguÃ©m novo.',
        esqueleto: 'Where ...? What ...?',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return t.split('?').filter(function (p) { return p.trim().length > 3; }).length >= 2;
        },
        respostasAceitas: ['Where are you from? What do you do?'],
        dicas: ['Use as palavras de pergunta da unidade.', 'Termine cada pergunta com ponto de interrogaÃ§Ã£o.'],
        explicacao: 'Where are you from? What do you do? â€” com essas perguntas vocÃª comeÃ§a uma conversa com qualquer pessoa.',
        conceitos: ['en.perguntas']
      }
    }
  ]
});
