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
      titulo: 'Hello! Vamos nos apresentar',
      introduz: ['en.saudacoes'],
      blocos: [
        { tipo: 'texto', texto: 'Imagine que você entrou em uma turma nova ou em uma reunião de trabalho com pessoas de outros países. A primeira coisa é **cumprimentar e dizer seu nome**.' },
        { tipo: 'vocab', titulo: 'Saudações por horário', pares: [
          ['Good morning', 'Bom dia (até 12h)'],
          ['Good afternoon', 'Boa tarde'],
          ['Good evening', 'Boa noite (ao chegar)'],
          ['Hello / Hi', 'Olá / Oi']
        ] },
        { tipo: 'vocab', titulo: 'Apresentando-se', pares: [
          ['My name is Ana.', 'Meu nome é Ana.'],
          ['I am Ana.', 'Eu sou a Ana.'],
          ['Nice to meet you.', 'Prazer em conhecer você.'],
          ['What is your name?', 'Qual é o seu nome?']
        ] },
        { tipo: 'ingles', frase: 'Hello! My name is Ana. Nice to meet you.', traducao: 'Olá! Meu nome é Ana. Prazer em conhecer você.' },
        { tipo: 'nota', tom: 'info', texto: '`my` = meu/minha; `your` = seu/sua. Repare que o inglês não muda a palavra conforme o gênero.' }
      ]
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
          'Good night, my name is Ana. See you tomorrow.',
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
          { fala: 'Hi! How are you?', opcoes: ["I'm fine, thanks. And you?", 'At seven o\'clock.', 'My name is table.'], correta: 0 },
          { fala: "I'm good! What is your name?", opcoes: ['Yes, please.', 'My name is Ana.', 'Nice to meet you too.'], correta: 1 },
          { fala: 'Nice to meet you, Ana!', opcoes: ['Nice to meet you too.', "I'm going to travel.", 'Twenty dollars.'], correta: 0 }
        ],
        dicas: ['Responda à pergunta feita, sem mudar de assunto.', 'A última fala devolve o cumprimento.'],
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
        enunciado: 'Escreva uma apresentação com o seu nome (use "Hello" e "My name is").',
        esqueleto: 'Hello, my name is ...',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return t.indexOf('hello') !== -1 && t.indexOf('my name is') !== -1 && t.replace(/[^a-z]/g, '').length > 18;
        },
        respostasAceitas: ['Hello, my name is Ana. Nice to meet you.'],
        dicas: ['Comece com Hello', 'Use `My name is` + seu nome.'],
        explicacao: 'Uma apresentação simples: Hello, my name is [nome]. Nice to meet you. Você acabou de produzir sua primeira frase em inglês do zero.',
        conceitos: ['en.saudacoes']
      }
    }
  ]
});
