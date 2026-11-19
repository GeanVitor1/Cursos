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
      titulo: 'Palavras de pergunta (1)',
      introduz: ['en.perguntas'],
      blocos: [
        { tipo: 'texto', texto: 'Estas são as palavras que abrem quase toda pergunta em inglês. Vamos em grupos pequenos.' },
        { tipo: 'vocab', titulo: 'Perguntas novas', pares: [
          ['What...?', 'O que...?', '❓', 'perguntando o que é algo na reunião'],
          ['Where...?', 'Onde...?', '📍', 'perguntando onde é a sala'],
          ['When...?', 'Quando...?', '📆', 'perguntando quando é a entrega']
        ] },
        { tipo: 'ingles', frase: 'What? Where? When?', traducao: 'O que? Onde? Quando?' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-08-p1',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte a palavra de pergunta ao significado.',
        pares: [
          ['What', 'O que'],
          ['Where', 'Onde'],
          ['When', 'Quando']
        ],
        dicas: ['Where começa a pergunta de lugar.', 'When lembra tempo.'],
        explicacao: 'What, Where e When: as três palavras de pergunta mais usadas.',
        conceitos: ['en.perguntas']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Palavras de pergunta (2)',
      blocos: [
        { tipo: 'vocab', titulo: 'Perguntas novas', pares: [
          ['Who...?', 'Quem...?', '🧑', 'perguntando quem vai à reunião'],
          ['Why...? / How...?', 'Por que...? / Como...?', '🤔', 'pedindo uma explicação do problema']
        ] },
        { tipo: 'ingles', frase: 'Who? Why?', traducao: 'Quem? Por que?' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-08-p2',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **why**?',
        opcoes: ['Por que', 'Quem', 'Quando', 'Onde'],
        correta: 0,
        feedbackErro: {
          1: 'Quem é **who**.',
          2: 'Quando é **when**.',
          3: 'Onde é **where**.'
        },
        dicas: ['Why pergunta a razão.', 'How pergunta o modo.'],
        explicacao: 'why = por que; how = como. Com who, when e where, você cobre as perguntas essenciais.',
        conceitos: ['en.perguntas']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'De onde você é?',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas', pares: [
          ['Where are you from?', 'De onde você é?', '🌎', 'numa apresentação em evento internacional'],
          ['I am from Brazil.', 'Eu sou do Brasil.', '🇧🇷', 'respondendo de onde você é']
        ] },
        { tipo: 'ingles', frase: 'Where are you from?', traducao: 'De onde você é?' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-08-p3',
        tipo: 'order-blocks',
        habilidade: 'gramatica',
        dimensao: 'ordenacao',
        enunciado: 'Ordene a pergunta: "De onde você é?"',
        blocos: ['Where', 'are', 'you', 'from?'],
        dicas: ['Comece com a palavra de pergunta.', 'O verbo are vem antes de you.'],
        explicacao: 'Where are you from? — pergunta em que o verbo vem antes do sujeito.',
        conceitos: ['en.perguntas']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O que você faz?',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas', pares: [
          ['What do you do?', 'O que você faz (trabalho)?', '💼', 'conversando num evento de networking'],
          ['I am a developer.', 'Eu sou desenvolvedor(a).', '💻', 'dizendo sua profissão'],
          ['Do you like it here?', 'Você gosta daqui?', '🏙️', 'puxando papo com um visitante'],
          ['Yes, I do. / No, I do not.', 'Sim, gosto. / Não, não gosto.', '✅', 'respondendo com simpatia']
        ] },
        { tipo: 'ingles', frase: 'What do you do? I am a developer.', traducao: 'O que você faz? Eu sou desenvolvedor.' },
        { tipo: 'nota', tom: 'info', texto: '`do` é o auxiliar das perguntas no present simple: `Do you like it here?` (você gosta daqui?) e `What do you do?`. A estrutura é **Do + you + verbo**. A resposta curta repete o `do`: `Yes, I do.` ou `No, I do not.`' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-08-p4',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete a pergunta sobre profissão.',
        codigo: 'What {{1}} you do?',
        lacunas: [['do']],
        dicas: ['O auxiliar aparece antes de you.', 'A pergunta é What do you do?'],
        explicacao: 'What do you do? = O que você faz? A resposta usa I am a... + profissão.',
        conceitos: ['en.perguntas']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Tempo e conversa',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['How is the weather?', 'Como está o tempo?', '⛅', 'papo rápido no elevador'],
          ['What about you?', 'E você?', '🔄', 'devolvendo a pergunta ao outro'],
          ['here', 'aqui', '📌', 'falando do lugar onde você está']
        ] },
        { tipo: 'ingles', frase: 'How is the weather?', traducao: 'Como está o tempo?' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-08-p5',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **weather**?',
        opcoes: ['Tempo (clima)', 'Semana', 'Trabalho', 'Aqui'],
        correta: 0,
        feedbackErro: {
          1: 'Semana é **week**, que você verá a seguir.',
          2: 'Trabalho é **work**.',
          3: 'Aqui é **here**.'
        },
        dicas: ['Weather é sobre sol, chuva e frio.', 'Use em conversa informal.'],
        explicacao: 'weather = tempo (clima). Não confunda com time, que é hora.',
        conceitos: ['en.perguntas']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Semana, mês e agora',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas', pares: [
          ['week / month', 'semana / mês', '🗓️', 'falando de prazos do projeto'],
          ['now', 'agora', '⏳', 'falando do que acontece neste momento']
        ] },
        { tipo: 'ingles', frase: 'I study English every week.', traducao: 'Eu estudo inglês toda semana.' },
        { tipo: 'vida-real', emoji: '🌍', titulo: 'Conversando em um evento de tecnologia', texto: 'Você encontra alguém de outro país no coffee break. Perguntas simples mantêm a conversa viva e mostram interesse.', frase: 'Hi! Where are you from? I am from Brazil.', traducao: 'Oi! De onde você é? Eu sou do Brasil.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-08-p6',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada palavra ao significado.',
        pares: [
          ['week', 'semana'],
          ['month', 'mês'],
          ['now', 'agora']
        ],
        dicas: ['Week tem 7 dias.', 'Month é o mês do calendário.'],
        explicacao: 'week, month e now: palavras de tempo que aparecem em qualquer conversa.',
        conceitos: ['en.perguntas']
      }
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
        dicas: ['Where começa a pergunta de lugar.', 'When lembra tempo (quando).'],
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
          const t = String(valor || '').toLowerCase().replace(/\s+/g, ' ');
          if (t.indexOf('?') === -1) return false;
          const wh = /^(?:where|what|who|how|when|why|which)(?: [a-z]+)? (?:is|are|do|does|did|can|will|would|was|were) [a-z]+/;
          const aux = /^(?:do|does|are|is|can|could|would|did|have) (?:you|he|she|they|we|it|this|that|there|your) [a-z]+/;
          const perguntas = t.split('?').slice(0, -1).map(function (p) { return p.split(/[.!]/).pop().trim(); });
          const validas = perguntas.filter(function (p) { return p.split(' ').length >= 3 && (wh.test(p) || aux.test(p)); });
          return validas.length >= 2;
        },
        respostasAceitas: ['Where are you from? What do you do?'],
        dicas: ['Use as palavras de pergunta da unidade.', 'Termine cada pergunta com ponto de interrogação.'],
        explicacao: 'Where are you from? What do you do? — com essas perguntas você começa uma conversa com qualquer pessoa.',
        conceitos: ['en.perguntas']
      }
    }
  ]
});
