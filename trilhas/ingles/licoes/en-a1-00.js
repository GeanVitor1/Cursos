Plataforma.registrarLicao({
  id: 'en-a1-00',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Apresentações: dizendo quem você é',
  subtitulo: 'English A1 · Unidade 1',
  duracaoMin: 30,
  xp: 30,
  objetivos: [
    'Cumprimentar em diferentes momentos do dia',
    'Dizer e perguntar o nome',
    'Usar my e your em apresentações'
  ],
  conceitos: ['en.saudacoes'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Primeiros cumprimentos',
      introduz: ['en.saudacoes'],
      blocos: [
        { tipo: 'texto', texto: 'Imagine que você entrou em uma turma nova ou em uma reunião de trabalho com pessoas de outros países. A primeira coisa é **cumprimentar**. Vamos começar com três cumprimentos curtos.' },
        { tipo: 'vocab', titulo: 'Cumprimentos básicos (3)', pares: [
          ['Hello', 'Olá'],
          ['Hi', 'Oi'],
          ['Good morning', 'Bom dia (até 12h)']
        ] },
        { tipo: 'ingles', frase: 'Hello! Good morning!', traducao: 'Olá! Bom dia!' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-00-p1',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada cumprimento ao significado.',
        pares: [
          ['Hello', 'Olá'],
          ['Hi', 'Oi'],
          ['Good morning', 'Bom dia']
        ],
        dicas: ['Hello e Hi são os cumprimentos mais gerais.', 'Morning é a parte da manhã.'],
        explicacao: 'Hello, Hi e Good morning resolvem a abertura de qualquer conversa pela manhã.',
        conceitos: ['en.saudacoes']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Boa tarde e boa noite',
      blocos: [
        { tipo: 'texto', texto: 'Depois do meio-dia, o cumprimento muda. E ao chegar à noite, também. Veja as duas formas que faltam.' },
        { tipo: 'vocab', titulo: 'Outros horários (2)', pares: [
          ['Good afternoon', 'Boa tarde'],
          ['Good evening', 'Boa noite (ao chegar)']
        ] },
        { tipo: 'ingles', frase: 'Good afternoon! Good evening!', traducao: 'Boa tarde! Boa noite!' },
        { tipo: 'nota', tom: 'info', texto: '`Good evening` é usado **ao chegar**. Para se despedir à noite, o inglês usa outra expressão, que você verá mais adiante.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-00-p2',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **Good evening**?',
        opcoes: [
          'Boa noite (ao chegar)',
          'Bom dia',
          'Boa tarde',
          'Olá'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Bom dia é **Good morning**.',
          2: 'Boa tarde é **Good afternoon**.',
          3: 'Olá é **Hello**.'
        },
        dicas: ['Evening é o período da noite.', 'É o cumprimento usado quando você chega à noite.'],
        explicacao: 'Good evening = boa noite (ao chegar). Good afternoon = boa tarde.',
        conceitos: ['en.saudacoes']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Dizendo seu nome',
      blocos: [
        { tipo: 'texto', texto: 'Agora que você já cumprimentou, o próximo passo é dizer quem você é. Há duas formas muito comuns.' },
        { tipo: 'vocab', titulo: 'Seu nome (2)', pares: [
          ['My name is Ana.', 'Meu nome é Ana.'],
          ['I am Ana.', 'Eu sou a Ana.']
        ] },
        { tipo: 'ingles', frase: 'Hi! My name is Ana.', traducao: 'Oi! Meu nome é Ana.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-00-p3',
        tipo: 'order-blocks',
        habilidade: 'gramatica',
        dimensao: 'ordenacao',
        enunciado: 'Ordene as palavras para dizer: "Meu nome é Ana."',
        blocos: ['My', 'name', 'is', 'Ana.'],
        dicas: ['Comece pelo possessivo My.', 'O verbo is vem depois de name.'],
        explicacao: 'My name is Ana. — a estrutura mais comum para dizer o próprio nome.',
        conceitos: ['en.saudacoes']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Perguntando o nome',
      blocos: [
        { tipo: 'vocab', titulo: 'A pergunta (1)', pares: [
          ['What is your name?', 'Qual é o seu nome?']
        ] },
        { tipo: 'nota', tom: 'info', texto: '`my` = meu/minha; `your` = seu/sua. Repare que o inglês não muda a palavra conforme o gênero.' },
        { tipo: 'ingles', frase: 'What is your name?', traducao: 'Qual é o seu nome?' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-00-p4',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete a pergunta com o possessivo correto.',
        codigo: 'What is {{1}} name?',
        lacunas: [['your']],
        dicas: ['A pergunta é para a outra pessoa.', 'O possessivo de "você" é your.'],
        explicacao: '`My name is...` (eu) e `What is your name?` (você). my ↔ your é um par que você vai usar sempre.',
        conceitos: ['en.saudacoes']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Prazer em conhecer',
      blocos: [
        { tipo: 'vocab', titulo: 'Conhecendo alguém (2)', pares: [
          ['Nice to meet you.', 'Prazer em conhecer você.'],
          ['Nice to meet you too.', 'Prazer em conhecer você também.']
        ] },
        { tipo: 'nota', tom: 'info', texto: 'A segunda frase devolve o cumprimento: use **too** (também) quando a outra pessoa fala primeiro.' },
        { tipo: 'ingles', frase: 'Nice to meet you!', traducao: 'Prazer em conhecer você!' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-00-p5',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **Nice to meet you**?',
        opcoes: [
          'Prazer em conhecer você',
          'Boa noite',
          'Qual é o seu nome?',
          'Eu sou a Ana'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Boa noite é **Good evening**.',
          2: 'A pergunta do nome é **What is your name?**.',
          3: 'Eu sou a Ana é **I am Ana**.'
        },
        dicas: ['Meet é conhecer/encontrar.', 'É a frase usada logo depois da apresentação.'],
        explicacao: 'Nice to meet you = prazer em conhecer você. Com too, você devolve o cumprimento.',
        conceitos: ['en.saudacoes']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Como você está?',
      blocos: [
        { tipo: 'vocab', titulo: 'Conversa rápida (3)', pares: [
          ['How are you?', 'Como você está?'],
          ["I'm fine, thanks.", 'Estou bem, obrigado(a).'],
          ['And you?', 'E você?']
        ] },
        { tipo: 'ingles', frase: "How are you? I'm fine, thanks. And you?", traducao: 'Como você está? Estou bem, obrigado. E você?' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-00-p6',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete a resposta.',
        codigo: "I'm {{1}}, thanks. And {{2}}?",
        lacunas: [['fine'], ['you']],
        dicas: ['Estou bem = I am ___.', 'A pergunta de volta é And ___?'],
        explicacao: "I'm fine, thanks. And you? — o par pergunta/resposta mais comum em inglês.",
        conceitos: ['en.saudacoes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-00-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'Ouça a apresentação e escolha a frase correta.',
        audio: 'Hello, my name is Ana. Nice to meet you.',
        opcoes: [
          'Hello, my name is Ana. Nice to meet you.',
          'Hi, my name is Ana. Nice to meet you too.',
          'Hello, my name is Lia. Nice to meet you.'
        ],
        correta: 0,
        dicas: ['Ouça quantas vezes precisar.', 'O nome dito no áudio é Ana ou Lia?'],
        explicacao: 'Hello, my name is Ana. Nice to meet you. — a apresentação completa mais comum.',
        conceitos: ['en.saudacoes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-00-a2',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada expressão ao significado.',
        pares: [
          ['Good morning', 'Bom dia'],
          ['Good afternoon', 'Boa tarde'],
          ['My name is...', 'Meu nome é...'],
          ['Nice to meet you.', 'Prazer em conhecer você.']
        ],
        dicas: ['Morning é a parte da manhã.', 'Afternoon vem depois do meio-dia.'],
        explicacao: 'Essas quatro expressões resolvem a abertura de quase toda conversa em inglês.',
        conceitos: ['en.saudacoes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-00-a3',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete a apresentação.',
        codigo: 'Hi! {{1}} name is Bruno. What is {{2}} name?',
        lacunas: [['my'], ['your']],
        dicas: ['Quem fala usa o possessivo da primeira pessoa.', 'A pergunta é para a outra pessoa.'],
        explicacao: '`My name is...` (eu) e `What is your name?` (você). my ↔ your é um par que você vai usar sempre.',
        conceitos: ['en.saudacoes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-00-a4',
        tipo: 'dialogue',
        habilidade: 'compreensao',
        dimensao: 'aplicacao',
        enunciado: 'Complete a conversa de apresentação.',
        cena: 'Você chegou a um curso novo e alguém se aproxima.',
        interlocutor: 'Alex',
        turnos: [
          { fala: 'Hi! How are you?', opcoes: ["I'm fine, thanks. And you?", 'My name is Ana.', 'Good morning, Ana.'], correta: 0 },
          { fala: "I'm fine too! What is your name?", opcoes: ['My name is Ana.', "I'm fine, thanks. And you?", 'Good evening.'], correta: 0 },
          { fala: 'Nice to meet you, Ana!', opcoes: ['Nice to meet you too.', 'Good morning, Ana.', "I'm fine, thanks."], correta: 0 }
        ],
        dicas: ['Responda à pergunta feita, sem mudar de assunto.', 'A última fala devolve o cumprimento: Nice to meet you too.'],
        explicacao: 'How are you? → I\'m fine, thanks. What is your name? → My name is... Nice to meet you → Nice to meet you too. Esse é o roteiro básico de toda apresentação.',
        conceitos: ['en.saudacoes'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-00-a5',
        tipo: 'write-code',
        habilidade: 'writing',
        dimensao: 'construcao',
        enunciado: 'Escreva uma apresentação com o seu nome (use "Hello", "My name is" e "Nice to meet you").',
        esqueleto: 'Hello, my name is ... Nice to meet you.',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return /\bhello\b/.test(t) &&
            /my name('s| is)\s+[a-záéíóúâêôãõç]{2,}/.test(t) &&
            /\bnice to meet you\b/.test(t);
        },
        respostasAceitas: ['Hello, my name is [seu nome]. Nice to meet you.'],
        dicas: ['Comece com Hello', 'Use `My name is` + seu nome.', 'Feche com Nice to meet you.'],
        explicacao: 'Uma apresentação simples: Hello, my name is [nome]. Nice to meet you. Você acabou de produzir sua primeira frase em inglês do zero.',
        conceitos: ['en.saudacoes']
      }
    }
  ]
});
