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
      titulo: 'Talking about yesterday',
      introduz: ['en.passado'],
      blocos: [
        { tipo: 'texto', texto: 'Para contar o que aconteceu, o inglês usa o **passado simples**. Verbos regulares ganham **-ed**; alguns verbos muito comuns são irregulares e têm forma própria.' },
        { tipo: 'vocab', titulo: 'Regulares e irregulares', pares: [
          ['work → worked', 'trabalhar → trabalhei'],
          ['study → studied', 'estudar → estudei'],
          ['go → went', 'ir → fui'],
          ['have → had', 'ter → tive'],
          ['buy → bought', 'comprar → comprei'],
          ['see → saw', 'ver → vi'],
          ['take → took', 'pegar / tirar → peguei / tirei'],
          ['watch → watched', 'assistir → assisti'],
          ['rain → rained', 'chover → choveu'],
          ['stay → stayed', 'ficar → fiquei']
        ] },
        { tipo: 'vocab', titulo: 'O verbo to be no passado', pares: [
          ['I was / he was / she was', 'eu era, eu estava / ele era / ela era'],
          ['you were / we were / they were', 'você era / nós éramos / eles eram']
        ] },
        { tipo: 'vocab', titulo: 'Marcadores de tempo', pares: [
          ['yesterday / today / tomorrow', 'ontem / hoje / amanhã'],
          ['last week / last weekend', 'semana passada / fim de semana passado'],
          ['two days ago', 'dois dias atrás'],
          ['then', 'depois / em seguida']
        ] },
        { tipo: 'vocab', titulo: 'Palavras de um fim de semana', pares: [
          ['the beach', 'a praia'],
          ['photos', 'fotos'],
          ['a lot of', 'muitos / muitas'],
          ['parents', 'pais (pai e mãe)'],
          ['house / home', 'casa / lar'],
          ['together', 'juntos'],
          ['a movie', 'um filme'],
          ['so', 'então / por isso']
        ] },
        { tipo: 'lista', itens: [
          '`I was` / `he was` / `she was` / `it was`',
          '`you were` / `we were` / `they were`',
          'Marcadores: `yesterday`, `last week`, `last weekend`, `two days ago`'
        ] },
        { tipo: 'ingles', frase: 'Yesterday I went to the supermarket and bought some fruit.', traducao: 'Ontem eu fui ao supermercado e comprei frutas.' },
        { tipo: 'ingles', frase: 'Last weekend I was at my parents\' house. On Saturday we watched a movie.', traducao: 'No fim de semana passado eu estava na casa dos meus pais. No sábado nós assistimos a um filme.' },
        { tipo: 'nota', tom: 'info', texto: 'Atenção: `yesterday I go` está errado. Se a frase tem marcador de passado, o verbo também fica no passado.' }
      ]
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
