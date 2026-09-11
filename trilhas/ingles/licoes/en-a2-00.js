Plataforma.registrarLicao({
  id: 'en-a2-00',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Contando o que aconteceu: passado simples',
  subtitulo: 'English A2 · Unidade 1',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Falar de acontecimentos passados',
    'Reconhecer verbos regulares (-ed) e irregulares comuns',
    'Usar was, were, yesterday e last weekend'
  ],
  conceitos: ['en.passado'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Verbos regulares (-ed)',
      introduz: ['en.passado'],
      blocos: [
        { tipo: 'texto', texto: 'Para contar o que aconteceu, o inglês usa o **passado simples**. Vamos começar pelos verbos regulares: eles ganham **-ed**.' },
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['work → worked', 'trabalhar → trabalhei'],
          ['study → studied', 'estudar → estudei'],
          ['watch → watched', 'assistir → assisti']
        ] },
        { tipo: 'ingles', frase: 'I worked and studied.', traducao: 'Eu trabalhei e estudei.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-00-p1',
        tipo: 'match-pairs',
        habilidade: 'gramatica',
        dimensao: 'associacao',
        enunciado: 'Conecte o verbo no presente ao passado.',
        pares: [
          ['work', 'worked'],
          ['study', 'studied'],
          ['watch', 'watched']
        ],
        dicas: ['Verbos regulares ganham -ed.', 'Study troca o y por i antes de -ed.'],
        explicacao: 'work → worked, study → studied, watch → watched: o padrão regular do passado.',
        conceitos: ['en.passado']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Mais verbos regulares',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['stay → stayed', 'ficar → fiquei'],
          ['rain → rained', 'chover → choveu']
        ] },
        { tipo: 'ingles', frase: 'It rained a lot.', traducao: 'Choveu muito.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-00-p2',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete a frase no passado.',
        codigo: 'It {{1}} in the morning.',
        lacunas: [['rained']],
        dicas: ['O passado de rain é regular.', 'A frase fala do que aconteceu pela manhã.'],
        explicacao: 'It rained in the morning. — o -ed marca o passado.',
        conceitos: ['en.passado']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Irregulares: went, had, saw',
      blocos: [
        { tipo: 'texto', texto: 'Alguns verbos muito comuns são **irregulares**: não usam -ed e têm forma própria. Vamos aos poucos.' },
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['go → went', 'ir → fui'],
          ['have → had', 'ter → tive'],
          ['see → saw', 'ver → vi']
        ] },
        { tipo: 'ingles', frase: 'I went to work.', traducao: 'Eu fui ao trabalho.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-00-p3',
        tipo: 'match-pairs',
        habilidade: 'gramatica',
        dimensao: 'associacao',
        enunciado: 'Conecte o verbo no presente ao passado.',
        pares: [
          ['go', 'went'],
          ['have', 'had'],
          ['see', 'saw']
        ],
        dicas: ['Went é o passado mais famoso do inglês.', 'Had vem de have.'],
        explicacao: 'go → went, have → had, see → saw: três irregulares que aparecem em quase toda história.',
        conceitos: ['en.passado']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Irregulares: bought e took',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (6)', pares: [
          ['buy → bought', 'comprar → comprei'],
          ['take → took', 'pegar / tirar → peguei / tirei'],
          ['some / fruit', 'algum / fruta']
        ] },
        { tipo: 'ingles', frase: 'I bought some fruit.', traducao: 'Eu comprei algumas frutas.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-00-p4',
        tipo: 'multiple-choice',
        habilidade: 'gramatica',
        dimensao: 'reconhecimento',
        enunciado: 'Qual é o passado de **buy**?',
        opcoes: ['bought', 'buyed', 'took', 'went'],
        correta: 0,
        feedbackErro: {
          1: 'Buy é irregular: não usa -ed.',
          2: 'Took é o passado de take.',
          3: 'Went é o passado de go.'
        },
        dicas: ['Buy é irregular.', 'A palavra começa com b.'],
        explicacao: 'buy → bought. Como take → took, é um irregular que você vai ver muito em compras.',
        conceitos: ['en.passado']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O verbo to be no passado',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['I was / he was / she was', 'eu era, eu estava / ele era / ela era'],
          ['you were / we were / they were', 'você era / nós éramos / eles eram']
        ] },
        { tipo: 'lista', itens: [
          '`I was` / `he was` / `she was` / `it was`',
          '`you were` / `we were` / `they were`'
        ] },
        { tipo: 'ingles', frase: 'I was at home.', traducao: 'Eu estava em casa.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-00-p5',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete com a forma correta do verbo to be no passado.',
        codigo: 'I {{1}} at home.',
        lacunas: [['was']],
        dicas: ['Para I, o passado de am é was.', 'Were é usado com you, we e they.'],
        explicacao: 'I was at home. He was / She was; you were / we were / they were.',
        conceitos: ['en.passado']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Marcadores de tempo',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (6)', pares: [
          ['yesterday / today / tomorrow', 'ontem / hoje / amanhã'],
          ['last week / last weekend', 'semana passada / fim de semana passado'],
          ['two days ago', 'dois dias atrás']
        ] },
        { tipo: 'ingles', frase: 'Yesterday I worked.', traducao: 'Ontem eu trabalhei.' },
        { tipo: 'nota', tom: 'info', texto: 'Atenção: `yesterday I go` está errado. Se a frase tem marcador de passado, o verbo também fica no passado.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-00-p6',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **yesterday**?',
        opcoes: ['Ontem', 'Hoje', 'Amanhã', 'Agora'],
        correta: 0,
        feedbackErro: {
          1: 'Hoje é **today**.',
          2: 'Amanhã é **tomorrow**.',
          3: 'Agora é **now**.'
        },
        dicas: ['Yesterday lembra o dia que passou.', 'É o marcador mais comum do passado.'],
        explicacao: 'yesterday = ontem. today = hoje; tomorrow = amanhã.',
        conceitos: ['en.passado']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Palavras de um fim de semana (1)',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['the beach', 'a praia'],
          ['photos', 'fotos'],
          ['a lot of', 'muitos / muitas']
        ] },
        { tipo: 'ingles', frase: 'I took photos at the beach.', traducao: 'Eu tirei fotos na praia.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-00-p7',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada palavra ao significado.',
        pares: [
          ['beach', 'praia'],
          ['photos', 'fotos'],
          ['a lot of', 'muitos']
        ],
        dicas: ['Beach é onde tem areia e mar.', 'Photos vem de photo.'],
        explicacao: 'the beach, photos e a lot of: vocabulário típico de um fim de semana.',
        conceitos: ['en.passado']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Palavras de um fim de semana (2)',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['parents', 'pais (pai e mãe)'],
          ['house / home', 'casa / lar'],
          ['together', 'juntos']
        ] },
        { tipo: 'ingles', frase: 'I was at my parents\' house.', traducao: 'Eu estava na casa dos meus pais.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-00-p8',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **together**?',
        opcoes: ['Juntos', 'Casa', 'Pais', 'Sozinhos'],
        correta: 0,
        feedbackErro: {
          1: 'Casa é **house** ou **home**.',
          2: 'Pais é **parents**.',
          3: 'Sozinhos seria o contrário.'
        },
        dicas: ['Together indica companhia.', 'Use quando fizer algo com outras pessoas.'],
        explicacao: 'together = juntos. house = casa; parents = pais.',
        conceitos: ['en.passado']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Palavras de um fim de semana (3)',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['a movie', 'um filme'],
          ['then', 'depois / em seguida'],
          ['so', 'então / por isso']
        ] },
        { tipo: 'ingles', frase: 'We watched a movie together.', traducao: 'Nós assistimos a um filme juntos.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-00-p9',
        tipo: 'order-blocks',
        habilidade: 'gramatica',
        dimensao: 'ordenacao',
        enunciado: 'Ordene a frase no passado.',
        blocos: ['We', 'watched', 'a movie', 'together.'],
        dicas: ['O sujeito vem primeiro.', 'Watched é o passado de watch.'],
        explicacao: 'We watched a movie together. — sujeito + verbo no passado + complemento.',
        conceitos: ['en.passado']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-00-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'Ouça o relato e escolha o que aconteceu.',
        audio: 'Yesterday I went to the supermarket and bought some fruit.',
        opcoes: [
          'Ontem fui ao supermercado e comprei frutas.',
          'Hoje vou ao supermercado comprar frutas.',
          'Ontem fui à farmácia e comprei remédio.'
        ],
        correta: 0,
        dicas: ['Went é o passado de go.', 'Bought é o passado de buy.'],
        explicacao: 'went + bought. Dois verbos irregulares em uma frase de passado.',
        conceitos: ['en.passado']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-00-a2',
        tipo: 'match-pairs',
        habilidade: 'gramatica',
        dimensao: 'associacao',
        enunciado: 'Conecte o verbo no presente ao passado.',
        pares: [
          ['go', 'went'],
          ['have', 'had'],
          ['buy', 'bought'],
          ['see', 'saw']
        ],
        dicas: ['Went é o passado mais famoso do inglês.', 'Bought não segue a regra -ed.'],
        explicacao: 'Esses quatro irregulares aparecem em quase toda história do dia a dia.',
        conceitos: ['en.passado']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-00-a3',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete o relato no passado.',
        codigo: 'Last weekend I {{1}} to the beach. (go)\nI {{2}} a lot of photos. (take)',
        lacunas: [['went'], ['took']],
        dicas: ['Go é irregular: went.', 'Take é irregular: took.'],
        explicacao: 'went + took. O marcador "last weekend" pede o passado em toda a frase.',
        conceitos: ['en.passado']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-00-a4',
        tipo: 'reading',
        habilidade: 'reading',
        dimensao: 'reconhecimento',
        titulo: 'Weekend message',
        enunciado: 'Leia a mensagem e responda.',
        texto: 'Hi! Last weekend I was at my parents\' house. On Saturday we had lunch together and watched a movie. On Sunday it rained, so we stayed home.',
        pergunta: 'O que eles fizeram no sábado?',
        opcoes: [
          'Almoçaram juntos e assistiram a um filme',
          'Ficaram em casa por causa da chuva',
          'Foram à praia',
          'Trabalharam o fim de semana inteiro'
        ],
        correta: 0,
        dicas: ['Procure "On Saturday".', 'Had lunch e watched a movie.'],
        explicacao: 'had + watched: passado regular e irregular no mesmo relato. A chuva foi no domingo, não no sábado.',
        conceitos: ['en.passado'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-00-a5',
        tipo: 'write-code',
        habilidade: 'writing',
        dimensao: 'construcao',
        enunciado: 'Escreva duas frases sobre o que você fez ontem.',
        esqueleto: 'Yesterday I ... . Then I ... .',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return t.indexOf('yesterday') !== -1 && t.split('.').filter(function (f) { return f.trim().length > 5; }).length >= 2;
        },
        respostasAceitas: ['Yesterday I worked. Then I went home.'],
        dicas: ['Use o marcador yesterday.', 'Use verbos no passado (worked, went, had...).'],
        explicacao: 'Yesterday I worked. Then I went home. — contar o próprio dia é a prática mais natural do passado simples.',
        conceitos: ['en.passado']
      }
    }
  ]
});
