Plataforma.registrarLicao({
  id: 'ingles-02',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Experiências de vida (present perfect)',
  subtitulo: 'English A2 · Unidade 4',
  duracaoMin: 35,
  xp: 35,
  objetivos: [
    'Perguntar sobre experiências com Have you ever...?',
    'Falar de lugares com have visited',
    'Usar already e yet'
  ],
  conceitos: ['en.a2-experiencias'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Como se forma o present perfect',
      introduz: ['en.a2-experiencias'],
      blocos: [
        { tipo: 'texto', texto: 'O **present perfect** fala de uma experiência ou de algo que já aconteceu, sem dizer **quando**. A estrutura é **have / has + particípio passado**.' },
        { tipo: 'lista', itens: [
          '`I / you / we / they` + **have** + particípio: `I have visited Canada.`',
          '`he / she / it` + **has** + particípio: `She has visited Canada.`',
          'Verbos regulares: o particípio é igual ao passado, com a terminação de passado (`visited`, `worked`).',
          'Alguns irregulares: `see → seen`, `be → been`, `do → done`.'
        ] },
        { tipo: 'ingles', frase: 'I have seen that movie. She has visited London. I have been there. We have done it.', traducao: 'Eu já vi aquele filme. Ela já visitou Londres. Eu já estive lá. Nós já fizemos isso.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Se a frase diz o dia ("yesterday", "last year"), use o passado simples: `I visited Canada last year.` O present perfect é para quando a data não importa.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ingles02-p6',
        tipo: 'multiple-choice',
        habilidade: 'gramatica',
        dimensao: 'reconhecimento',
        enunciado: 'Qual frase está correta?',
        opcoes: ['She has visited Canada.', 'She have visited Canada.', 'She has visit Canada.', 'She is visited Canada.'],
        correta: 0,
        feedbackErro: {
          1: 'Com she (ele/ela/it) use **has**, não have.',
          2: 'Depois de has/have o verbo vai para o particípio: visited.',
          3: 'O present perfect usa has/have, não is.'
        },
        dicas: ['She pede has.', 'O verbo vem no particípio (visited).'],
        explicacao: 'She has visited Canada. — has + particípio para he/she/it; have + particípio para I/you/we/they.',
        conceitos: ['en.a2-experiencias']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Perguntando sobre experiências',
      blocos: [
        { tipo: 'texto', texto: 'Quando queremos saber se alguém já viveu uma experiência em qualquer momento da vida, usamos a pergunta com **Have you ever...?**' },
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['ever', 'já / alguma vez', '❔', 'perguntando sobre experiências numa conversa'],
          ['visited', 'visitou / visitado', '🧳', 'contando viagem anterior'],
          ['Canada', 'Canadá', '🍁', 'falando do Canadá']
        ] },
        { tipo: 'ingles', frase: 'Have you ever visited Canada?', traducao: 'Você já visitou o Canadá alguma vez?' },
        { tipo: 'nota', tom: 'info', texto: '`visited` vem do verbo `visit`. Não importa a data, e sim a experiência.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ingles02-p1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        audio: 'Have you ever visited Canada?',
        enunciado: 'Ouça e escolha a opção correspondente.',
        opcoes: [
          'Você já visitou o Canadá alguma vez?',
          'Você vai viajar para o Canadá?',
          'Você mora no Canadá?',
          'Você comprou uma passagem para o Canadá?'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Essa alternativa indica viagem futura.',
          2: 'Essa opção trata de moradia.',
          3: 'Essa opção trata de comprar passagem.'
        },
        dicas: ['Have you ever pergunta por experiências passadas.', 'Canada é o país.'],
        explicacao: 'Have you ever visited Canada? pergunta se você já visitou o país.',
        conceitos: ['en.a2-experiencias']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Respondendo afirmativamente com already',
      blocos: [
        { tipo: 'texto', texto: 'Para responder que você já realizou uma ação, usamos **I have already**.' },
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['already', 'já (afirmativo)', '✔️', 'contando que já fez algo'],
          ['seen', 'visto / viu', '👁️', 'falando de um filme já assistido'],
          ['movie', 'filme', '🎬', 'conversando sobre filmes']
        ] },
        { tipo: 'ingles', frase: 'I have already seen that movie.', traducao: 'Eu já vi aquele filme.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ingles02-p2',
        tipo: 'order-blocks',
        habilidade: 'gramatica',
        dimensao: 'ordenacao',
        enunciado: 'Ordene a frase em inglês.',
        blocos: ['I have', 'already', 'seen', 'that', 'movie.'],
        dicas: ['Comece com I have.', 'Already vem antes do verbo visto.'],
        explicacao: 'I have already seen that movie. — estrutura para dizer que já fez algo.',
        conceitos: ['en.a2-experiencias']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Respondendo negativamente com yet',
      blocos: [
        { tipo: 'texto', texto: 'Quando você ainda não teve a experiência, usamos **yet** no fim da frase negativa.' },
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['yet', 'ainda (com negação)', '⏳', 'falando do que ainda falta fazer'],
          ["haven't", 'não (have not)', '🙅', 'dizendo que ainda não fez algo']
        ] },
        { tipo: 'ingles', frase: "I haven't visited London yet.", traducao: 'Eu ainda não visitei Londres.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ingles02-p3',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete a frase negativa.',
        codigo: "I haven't visited London {{1}}.",
        lacunas: [['yet']],
        dicas: ['Palavra de 3 letras que indica ainda em frases negativas.', 'Começa com y.'],
        explicacao: 'Yet no final de frases negativas indica que a ação ainda não aconteceu.',
        conceitos: ['en.a2-experiencias']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Falando de tempo com for',
      blocos: [
        { tipo: 'texto', texto: 'Para falar de uma ação que começou no passado e continua, usamos **have worked** com **for**.' },
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['for', 'por / durante', '🕰️', 'falando de há quanto tempo algo acontece'],
          ['years', 'anos', '🎂', 'contando por quantos anos fez algo']
        ] },
        { tipo: 'ingles', frase: 'I have worked here for two years.', traducao: 'Eu trabalho aqui há dois anos.' },
        { tipo: 'vida-real', emoji: '✈️', titulo: 'Conversa sobre viagens em uma entrevista', texto: 'O entrevistador quer saber se você já morou ou viajou para fora. O present perfect conta a sua experiência sem dizer a data.', frase: 'Have you ever visited Canada? Yes, I have.', traducao: 'Você já visitou o Canadá? Sim, já.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ingles02-p4',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada termo ao significado.',
        pares: [
          ['ever', 'alguma vez'],
          ['already', 'já (afirmativa)'],
          ['yet', 'ainda (negativa)'],
          ['for two years', 'por dois anos']
        ],
        dicas: ['Ever é usado em perguntas.', 'Already confirma a ação.', 'Yet fica no final negativo.'],
        explicacao: 'Essas palavras conectam experiências e tempo de forma natural.',
        conceitos: ['en.a2-experiencias']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ingles02-p5',
        tipo: 'dialogue',
        habilidade: 'compreensao',
        dimensao: 'aplicacao',
        enunciado: 'Converse sobre viagens.',
        cena: 'Conversando com Alex sobre lugares que vocês já visitaram.',
        interlocutor: 'Alex',
        turnos: [
          {
            fala: 'Have you ever visited Canada?',
            opcoes: [
              "No, I haven't visited Canada yet.",
              'Yesterday I bought some fruit.',
              'The flight is at nine.'
            ],
            correta: 0
          },
          {
            fala: 'And have you visited London?',
            opcoes: [
              'Yes, I have already visited London.',
              'I am going to travel tonight.',
              'It costs twenty dollars.'
            ],
            correta: 0
          },
          {
            fala: 'We can travel together next year!',
            opcoes: [
              "Yes! Let's travel together.",
              'My room has a single bed.',
              'Good morning, my name is Ana.'
            ],
            correta: 0
          }
        ],
        dicas: ['Responda se já visitou.', 'Confirme que já visitou London.', "Aceite o convite com Let's (vamos)."],
        explicacao: 'O diálogo combina perguntas sobre experiências com planos futuros.',
        conceitos: ['en.a2-experiencias'],
        desafio: true
      }
    }
  ]
});
