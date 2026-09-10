Plataforma.registrarLicao({
  id: 'en-a2-00',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Contando o que aconteceu: passado simples',
  subtitulo: 'English A2 Â· Unidade 1',
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
      titulo: 'Talking about yesterday',
      introduz: ['en.passado'],
      blocos: [
        { tipo: 'texto', texto: 'Para contar o que aconteceu, o inglÃªs usa o **passado simples**. Verbos regulares ganham **-ed**; alguns verbos muito comuns sÃ£o irregulares e tÃªm forma prÃ³pria.' },
        { tipo: 'vocab', titulo: 'Regulares e irregulares', pares: [
          ['work â†’ worked', 'trabalhar â†’ trabalhei'],
          ['study â†’ studied', 'estudar â†’ estudei'],
          ['go â†’ went', 'ir â†’ fui'],
          ['have â†’ had', 'ter â†’ tive'],
          ['buy â†’ bought', 'comprar â†’ comprei'],
          ['see â†’ saw', 'ver â†’ vi']
        ] },
        { tipo: 'lista', itens: [
          '`I was` / `he was` / `she was` / `it was`',
          '`you were` / `we were` / `they were`',
          'Marcadores: `yesterday`, `last week`, `last weekend`, `two days ago`'
        ] },
        { tipo: 'ingles', frase: 'Yesterday I went to the supermarket and bought some fruit.', traducao: 'Ontem eu fui ao supermercado e comprei frutas.' },
        { tipo: 'nota', tom: 'info', texto: 'NÃ£o misture: `yesterday I go` estÃ¡ errado. Se a frase tem marcador de passado, o verbo tambÃ©m fica no passado.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-00-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'OuÃ§a o relato e escolha o que aconteceu.',
        audio: 'Yesterday I went to the supermarket and bought some fruit.',
        opcoes: [
          'Ontem fui ao supermercado e comprei frutas.',
          'Hoje vou ao supermercado comprar frutas.',
          'Ontem fui Ã  farmÃ¡cia e comprei remÃ©dio.'
        ],
        correta: 0,
        dicas: ['Went Ã© o passado de go.', 'Bought Ã© o passado de buy.'],
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
        dicas: ['Went Ã© o passado mais famoso do inglÃªs.', 'Bought nÃ£o segue a regra -ed.'],
        explicacao: 'Esses quatro irregulares aparecem em quase toda histÃ³ria do dia a dia.',
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
        dicas: ['Go Ã© irregular: went.', 'Take Ã© irregular: took.'],
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
        pergunta: 'O que eles fizeram no sÃ¡bado?',
        opcoes: [
          'AlmoÃ§aram juntos e assistiram a um filme',
          'Ficaram em casa por causa da chuva',
          'Foram Ã  praia',
          'Trabalharam o fim de semana inteiro'
        ],
        correta: 0,
        dicas: ['Procure "On Saturday".', 'Had lunch e watched a movie.'],
        explicacao: 'had + watched: passado regular e irregular no mesmo relato. A chuva foi no domingo, nÃ£o no sÃ¡bado.',
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
        enunciado: 'Escreva duas frases sobre o que vocÃª fez ontem.',
        esqueleto: 'Yesterday I ... . Then I ... .',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return t.indexOf('yesterday') !== -1 && t.split('.').filter(function (f) { return f.trim().length > 5; }).length >= 2;
        },
        respostasAceitas: ['Yesterday I worked. Then I went home.'],
        dicas: ['Use o marcador yesterday.', 'Use verbos no passado (worked, went, had...).'],
        explicacao: 'Yesterday I worked. Then I went home. â€” contar o prÃ³prio dia Ã© a prÃ¡tica mais natural do passado simples.',
        conceitos: ['en.passado']
      }
    }
  ]
});
