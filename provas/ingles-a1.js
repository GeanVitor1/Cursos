Plataforma.registrarLicao({
  id: 'en-a1-checkpoint',
  trilha: 'ingles',
  tipo: 'prova',
  titulo: 'Checkpoint A1 â€” InglÃªs geral',
  subtitulo: 'English A1 Â· Prova de nÃ­vel',
  duracaoMin: 35,
  xp: 100,
  objetivos: [
    'Consolidar apresentaÃ§Ãµes, nÃºmeros, famÃ­lia e rotina',
    'Verificar horas, comida, compras e lugares',
    'Avaliar perguntas bÃ¡sicas em situaÃ§Ãµes reais'
  ],
  conceitos: ['en.saudacoes', 'en.numeros', 'en.familia', 'en.rotina', 'en.horarios', 'en.comida', 'en.compras', 'en.lugares', 'en.perguntas'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova de nÃ­vel A1',
      blocos: [
        { tipo: 'texto', texto: 'SÃ£o **9 atividades** cobrindo tudo o que vocÃª estudou no A1. NÃ£o hÃ¡ nota de bloqueio: o resultado mostra o que jÃ¡ estÃ¡ firme e o que volta na revisÃ£o.' },
        { tipo: 'lista', itens: ['Leia e ouÃ§a com calma, como em uma conversa real.', 'Dicas estÃ£o disponÃ­veis e o resultado continua contando.'] }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-cp1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'OuÃ§a e escolha a frase correta.',
        audio: 'Good morning! My name is Ana. Nice to meet you.',
        opcoes: [
          'Bom dia! Meu nome Ã© Ana. Prazer em conhecer vocÃª.',
          'Boa noite! Meu nome Ã© Ana. AtÃ© amanhÃ£.',
          'Bom dia! Meu nome Ã© Lia. Prazer em conhecer vocÃª.'
        ],
        correta: 0,
        dicas: ['Good morning Ã© bom dia.', 'O nome dito Ã© Ana.'],
        explicacao: 'Cumprimento + nome + Nice to meet you: a apresentaÃ§Ã£o completa.',
        conceitos: ['en.saudacoes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-cp2',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete com my ou her.',
        codigo: 'Hello! {{1}} name is Paulo. This is my sister. {{2}} name is Lia.',
        lacunas: [['my'], ['her']],
        dicas: ['Quem fala usa my.', 'Lia Ã© mulher: use o possessivo dela.'],
        explicacao: 'my (quem fala) + her (dela). Possessivos na apresentaÃ§Ã£o de pessoas.',
        conceitos: ['en.familia']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-cp3',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'preenchimento',
        enunciado: 'OuÃ§a e escreva a idade que a pessoa diz.',
        audio: 'I am forty-two years old.',
        modo: 'escrever',
        resposta: '42',
        placeholder: 'Escreva apenas o nÃºmero',
        dicas: ['Forty Ã© 40.', 'Two Ã© 2.'],
        explicacao: '42. Ouvir e transcrever idades treina nÃºmeros rÃ¡pidos.',
        conceitos: ['en.numeros']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-cp4',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte as aÃ§Ãµes da rotina Ã  traduÃ§Ã£o.',
        pares: [
          ['wake up', 'acordar'],
          ['have breakfast', 'tomar cafÃ© da manhÃ£'],
          ['go to work', 'ir ao trabalho'],
          ['go to bed', 'ir dormir']
        ],
        dicas: ['Breakfast Ã© a primeira refeiÃ§Ã£o.', 'Waking up Ã© o primeiro passo do dia.'],
        explicacao: 'Rotina completa: acordar, tomar cafÃ©, trabalhar, dormir.',
        conceitos: ['en.rotina']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-cp5',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete com on ou at.',
        codigo: 'The class is {{1}} Friday {{2}} 8 o\'clock.',
        lacunas: [['on'], ['at']],
        dicas: ['Dia da semana...', 'Hora...'],
        explicacao: 'on Friday + at 8 o\'clock. Dias usam on; horas usam at.',
        conceitos: ['en.horarios']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-cp6',
        tipo: 'dialogue',
        habilidade: 'compreensao',
        dimensao: 'aplicacao',
        enunciado: 'Resolva o pedido no restaurante.',
        cena: 'AlmoÃ§o em um restaurante.',
        interlocutor: 'Waiter',
        turnos: [
          { fala: 'Good afternoon! Are you ready to order?', opcoes: ["I'd like a chicken sandwich, please.", 'I am from Brazil.', 'It is on Monday.'], correta: 0 },
          { fala: 'Anything to drink?', opcoes: ['A juice, please.', 'I am twenty-five.', 'Nice to meet you.'], correta: 0 },
          { fala: 'Perfect. Here is your food. Enjoy!', opcoes: ['Thank you! Can I have the bill, please?', 'Where are you from?', 'She is my sister.'], correta: 0 }
        ],
        dicas: ['PeÃ§a com I\'d like.', 'No final, peÃ§a a conta: the bill.'],
        explicacao: 'Pedido, bebida e conta: o ciclo completo do restaurante.',
        conceitos: ['en.comida'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-cp7',
        tipo: 'reading',
        habilidade: 'reading',
        dimensao: 'reconhecimento',
        titulo: 'Shopping list',
        enunciado: 'Leia a lista e responda.',
        texto: 'Shopping list: bread ($3), water ($1), apples ($4), coffee ($8). Total: $16.',
        pergunta: 'Quanto custa o cafÃ©?',
        opcoes: ['$8', '$3', '$16', '$4'],
        correta: 0,
        dicas: ['Procure coffee na lista.', 'O valor entre parÃªnteses Ã© o preÃ§o.'],
        explicacao: 'coffee ($8). Ler listas e preÃ§os Ã© uma habilidade prÃ¡tica imediata.',
        conceitos: ['en.compras']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-cp8',
        tipo: 'multiple-choice',
        habilidade: 'compreensao',
        dimensao: 'aplicacao',
        enunciado: 'VocÃª estÃ¡ na rua e precisa ir ao aeroporto. Qual pergunta usar?',
        opcoes: [
          'Where is the airport?',
          'How much is the airport?',
          'What time is the airport?',
          'Who is the airport?'
        ],
        correta: 0,
        dicas: ['VocÃª quer saber o lugar.', 'Use a palavra de pergunta de lugar.'],
        explicacao: 'Where is the airport? Para localizar qualquer lugar, use Where is...?',
        conceitos: ['en.lugares', 'en.perguntas']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-cp9',
        tipo: 'write-code',
        habilidade: 'writing',
        dimensao: 'construcao',
        enunciado: 'Escreva uma mini-apresentaÃ§Ã£o sua com nome, idade e origem.',
        esqueleto: 'Hi! My name is ... . I am ... years old. I am from ... .',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return t.indexOf('my name is') !== -1 && /\bi am\b/.test(t) && /\byears old\b/.test(t) && t.indexOf('from') !== -1;
        },
        respostasAceitas: ['Hi! My name is Ana. I am 30 years old. I am from Brazil.'],
        dicas: ['Use as trÃªs estruturas que vocÃª aprendeu.', 'NÃ£o esqueÃ§a years old.'],
        explicacao: 'Nome + idade + origem: a apresentaÃ§Ã£o pessoal completa, que abre qualquer conversa.',
        conceitos: ['en.saudacoes', 'en.numeros'],
        desafio: true
      }
    }
  ]
});
