Plataforma.registrarLicao({
  id: 'en-a1-00',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'ApresentaÃ§Ãµes: dizendo quem vocÃª Ã©',
  subtitulo: 'English A1 Â· Unidade 1',
  duracaoMin: 30,
  xp: 30,
  objetivos: [
    'Cumprimentar em diferentes momentos do dia',
    'Dizer e perguntar o nome',
    'Usar my e your em apresentaÃ§Ãµes'
  ],
  conceitos: ['en.saudacoes'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Hello! Vamos nos apresentar',
      introduz: ['en.saudacoes'],
      blocos: [
        { tipo: 'texto', texto: 'Imagine que vocÃª entrou em uma turma nova ou em uma reuniÃ£o de trabalho com pessoas de outros paÃ­ses. A primeira coisa Ã© **cumprimentar e dizer seu nome**.' },
        { tipo: 'vocab', titulo: 'SaudaÃ§Ãµes por horÃ¡rio', pares: [
          ['Good morning', 'Bom dia (atÃ© 12h)'],
          ['Good afternoon', 'Boa tarde'],
          ['Good evening', 'Boa noite (ao chegar)'],
          ['Hello / Hi', 'OlÃ¡ / Oi']
        ] },
        { tipo: 'vocab', titulo: 'Apresentando-se', pares: [
          ['My name is Ana.', 'Meu nome Ã© Ana.'],
          ['I am Ana.', 'Eu sou a Ana.'],
          ['Nice to meet you.', 'Prazer em conhecer vocÃª.'],
          ['What is your name?', 'Qual Ã© o seu nome?']
        ] },
        { tipo: 'ingles', frase: 'Hello! My name is Ana. Nice to meet you.', traducao: 'OlÃ¡! Meu nome Ã© Ana. Prazer em conhecer vocÃª.' },
        { tipo: 'nota', tom: 'info', texto: '`my` = meu/minha; `your` = seu/sua. Repare que o inglÃªs nÃ£o muda a palavra conforme o gÃªnero.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-00-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'OuÃ§a a apresentaÃ§Ã£o e escolha a frase correta.',
        audio: 'Hello, my name is Ana. Nice to meet you.',
        opcoes: [
          'Hello, my name is Ana. Nice to meet you.',
          'Good night, my name is Ana. See you tomorrow.',
          'Hello, my name is Lia. Nice to meet you.'
        ],
        correta: 0,
        dicas: ['OuÃ§a quantas vezes precisar.', 'O nome dito no Ã¡udio Ã© Ana ou Lia?'],
        explicacao: 'Hello, my name is Ana. Nice to meet you. â€” a apresentaÃ§Ã£o completa mais comum.',
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
        enunciado: 'Conecte cada expressÃ£o ao significado.',
        pares: [
          ['Good morning', 'Bom dia'],
          ['Good afternoon', 'Boa tarde'],
          ['My name is...', 'Meu nome Ã©...'],
          ['Nice to meet you.', 'Prazer em conhecer vocÃª.']
        ],
        dicas: ['Morning Ã© a parte da manhÃ£.', 'Afternoon vem depois do meio-dia.'],
        explicacao: 'Essas quatro expressÃµes resolvem a abertura de quase toda conversa em inglÃªs.',
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
        enunciado: 'Complete a apresentaÃ§Ã£o.',
        codigo: 'Hi! {{1}} name is Bruno. What is {{2}} name?',
        lacunas: [['my'], ['your']],
        dicas: ['Quem fala usa o possessivo da primeira pessoa.', 'A pergunta Ã© para a outra pessoa.'],
        explicacao: '`My name is...` (eu) e `What is your name?` (vocÃª). my â†” your Ã© um par que vocÃª vai usar sempre.',
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
        enunciado: 'Complete a conversa de apresentaÃ§Ã£o.',
        cena: 'VocÃª chegou a um curso novo e alguÃ©m se aproxima.',
        interlocutor: 'Alex',
        turnos: [
          { fala: 'Hi! How are you?', opcoes: ["I'm fine, thanks. And you?", 'At seven o\'clock.', 'My name is table.'], correta: 0 },
          { fala: "I'm good! What is your name?", opcoes: ['Yes, please.', 'My name is Ana.', 'Nice to meet you too.'], correta: 1 },
          { fala: 'Nice to meet you, Ana!', opcoes: ['Nice to meet you too.', "I'm going to travel.", 'Twenty dollars.'], correta: 0 }
        ],
        dicas: ['Responda Ã  pergunta feita, sem mudar de assunto.', 'A Ãºltima fala devolve o cumprimento.'],
        explicacao: 'How are you? â†’ I\'m fine, thanks. What is your name? â†’ My name is... Nice to meet you â†’ Nice to meet you too. Esse Ã© o roteiro bÃ¡sico de toda apresentaÃ§Ã£o.',
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
        enunciado: 'Escreva uma apresentaÃ§Ã£o com o seu nome (use "Hello" e "My name is").',
        esqueleto: 'Hello, my name is ...',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return t.indexOf('hello') !== -1 && t.indexOf('my name is') !== -1 && t.replace(/[^a-z]/g, '').length > 18;
        },
        respostasAceitas: ['Hello, my name is Ana. Nice to meet you.'],
        dicas: ['Comece com Hello', 'Use `My name is` + seu nome.'],
        explicacao: 'Uma apresentaÃ§Ã£o simples: Hello, my name is [nome]. Nice to meet you. VocÃª acabou de produzir sua primeira frase em inglÃªs do zero.',
        conceitos: ['en.saudacoes']
      }
    }
  ]
});
