Plataforma.registrarLicao({
  id: 'en-a1-checkpoint',
  trilha: 'ingles',
  tipo: 'prova',
  titulo: 'Checkpoint A1 — Inglês geral',
  subtitulo: 'English A1 · Prova de nível',
  duracaoMin: 35,
  xp: 100,
  objetivos: [
    'Consolidar apresentações, números, família e rotina',
    'Verificar horas, comida, compras e lugares',
    'Avaliar perguntas básicas em situações reais'
  ],
  conceitos: ['en.saudacoes', 'en.numeros', 'en.familia', 'en.rotina', 'en.horarios', 'en.comida', 'en.compras', 'en.lugares', 'en.perguntas'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova de nível A1',
      blocos: [
        { tipo: 'texto', texto: 'São **9 atividades** cobrindo tudo o que você estudou no A1. Não há nota de bloqueio: o resultado mostra o que já está firme e o que volta na revisão.' },
        { tipo: 'lista', itens: ['Leia e ouça com calma, como em uma conversa real.', 'Dicas estão disponíveis e o resultado continua contando.'] }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-cp1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'Ouça e escolha a frase correta.',
        audio: 'Good morning! My name is Ana. Nice to meet you.',
        opcoes: [
          'Bom dia! Meu nome é Ana. Prazer em conhecer você.',
          'Boa noite! Meu nome é Ana. Até amanhã.',
          'Bom dia! Meu nome é Lia. Prazer em conhecer você.'
        ],
        correta: 0,
        dicas: ['Good morning é bom dia.', 'O nome dito é Ana.'],
        explicacao: 'Cumprimento + nome + Nice to meet you: a apresentação completa.',
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
        dicas: ['Quem fala usa my.', 'Lia é mulher: use o possessivo dela.'],
        explicacao: 'my (quem fala) + her (dela). Possessivos na apresentação de pessoas.',
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
        enunciado: 'Ouça e escreva a idade que a pessoa diz.',
        audio: 'I am forty-two years old.',
        modo: 'escrever',
        resposta: '42',
        placeholder: 'Escreva apenas o número',
        dicas: ['Forty é 40.', 'Two é 2.'],
        explicacao: '42. Ouvir e transcrever idades treina números rápidos.',
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
        enunciado: 'Conecte as ações da rotina à tradução.',
        pares: [
          ['wake up', 'acordar'],
          ['have breakfast', 'tomar café da manhã'],
          ['go to work', 'ir ao trabalho'],
          ['go to bed', 'ir dormir']
        ],
        dicas: ['Breakfast é a primeira refeição.', 'Waking up é o primeiro passo do dia.'],
        explicacao: 'Rotina completa: acordar, tomar café, trabalhar, dormir.',
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
        cena: 'Almoço em um restaurante.',
        interlocutor: 'Waiter',
        turnos: [
          { fala: 'Good afternoon! Are you ready to order?', opcoes: ["I'd like a chicken sandwich, please.", 'I am from Brazil.', 'It is on Monday.'], correta: 0 },
          { fala: 'Anything to drink?', opcoes: ['A juice, please.', 'I am twenty-five.', 'Nice to meet you.'], correta: 0 },
          { fala: 'Perfect. Here is your food. Enjoy!', opcoes: ['Thank you! Can I have the bill, please?', 'Where are you from?', 'She is my sister.'], correta: 0 }
        ],
        dicas: ['Peça com I\'d like.', 'No final, peça a conta: the bill.'],
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
        pergunta: 'Quanto custa o café?',
        opcoes: ['$8', '$3', '$16', '$4'],
        correta: 0,
        dicas: ['Procure coffee na lista.', 'O valor entre parênteses é o preço.'],
        explicacao: 'coffee ($8). Ler listas e preços é uma habilidade prática imediata.',
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
        enunciado: 'Você está na rua e precisa ir ao aeroporto. Qual pergunta usar?',
        opcoes: [
          'Where is the airport?',
          'How much is the airport?',
          'What time is the airport?',
          'Who is the airport?'
        ],
        correta: 0,
        dicas: ['Você quer saber o lugar.', 'Use a palavra de pergunta de lugar.'],
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
        enunciado: 'Escreva uma mini-apresentação sua com nome, idade e origem.',
        esqueleto: 'Hi! My name is ... . I am ... years old. I am from ... .',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return t.indexOf('my name is') !== -1 && /\bi am\b/.test(t) && /\byears old\b/.test(t) && t.indexOf('from') !== -1;
        },
        respostasAceitas: ['Hi! My name is Ana. I am 30 years old. I am from Brazil.'],
        dicas: ['Use as três estruturas que você aprendeu.', 'Não esqueça years old.'],
        explicacao: 'Nome + idade + origem: a apresentação pessoal completa, que abre qualquer conversa.',
        conceitos: ['en.saudacoes', 'en.numeros'],
        desafio: true
      }
    }
  ]
});
