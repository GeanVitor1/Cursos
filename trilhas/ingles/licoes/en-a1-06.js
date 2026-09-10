Plataforma.registrarLicao({
  id: 'en-a1-06',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Compras: preÃ§os e pagamento',
  subtitulo: 'English A1 Â· Unidade 7',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Perguntar preÃ§os com How much',
    'Entender valores em dÃ³lar ao ouvir',
    'Falar como pagar (cash ou card)'
  ],
  conceitos: ['en.compras'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'How much is it?',
      introduz: ['en.compras'],
      blocos: [
        { tipo: 'vocab', titulo: 'Compras', pares: [
          ['How much is this?', 'Quanto custa isto?'],
          ["It's twenty dollars.", 'SÃ£o vinte dÃ³lares.'],
          ['expensive / cheap', 'caro / barato'],
          ['cash / credit card', 'dinheiro / cartÃ£o de crÃ©dito']
        ] },
        { tipo: 'ingles', frase: "How much is this T-shirt? â€” It's twenty dollars.", traducao: 'Quanto custa esta camiseta? â€” SÃ£o vinte dÃ³lares.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Use **How much** para preÃ§o (coisas incontÃ¡veis) e **How many** para quantidade (coisas contÃ¡veis): How many apples?' },
        { tipo: 'nota', tom: 'info', texto: 'Em lojas, `Can I pay by card?` (Posso pagar com cartÃ£o?) e `Do you have this in another size?` (Tem em outro tamanho?) sÃ£o frases do dia a dia.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-06-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'OuÃ§a a conversa e escolha o preÃ§o.',
        audio: 'How much is this T-shirt? It is twenty dollars.',
        opcoes: ['$20', '$12', '$2'],
        correta: 0,
        dicas: ['Twenty Ã© 20.', 'Preste atenÃ§Ã£o ao final -ty.'],
        explicacao: 'twenty = 20. NÃºmeros de preÃ§o aparecem o tempo todo em viagens e compras online.',
        conceitos: ['en.compras']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-06-a2',
        tipo: 'dialogue',
        habilidade: 'compreensao',
        dimensao: 'aplicacao',
        enunciado: 'Complete a compra na loja.',
        cena: 'VocÃª estÃ¡ em uma loja de roupas em outro paÃ­s.',
        interlocutor: 'Shop assistant',
        turnos: [
          { fala: 'Hi! Can I help you?', opcoes: ["Yes, how much is this T-shirt?", 'I am from Brazil.', 'I go to bed at ten.'], correta: 0 },
          { fala: 'It is twenty dollars. Do you want to try it on?', opcoes: ['Yes, please. Where is the fitting room?', 'No, I am twenty years old.', 'On Monday at nine.'], correta: 0 },
          { fala: 'It is over there. How would you like to pay?', opcoes: ['By card, please.', 'I usually wake up at seven.', 'My name is Ana.'], correta: 0 }
        ],
        dicas: ['"Can I help you?" pede o que vocÃª procura.', '"How would you like to pay?" pergunta a forma de pagamento.'],
        explicacao: 'Perguntar preÃ§o, pedir para experimentar e escolher a forma de pagamento: a compra completa em inglÃªs.',
        conceitos: ['en.compras'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-06-a3',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete a pergunta de preÃ§o e a forma de pagamento.',
        codigo: 'How {{1}} is this bag? â€” Can I {{2}} by card?',
        lacunas: [['much'], ['pay']],
        dicas: ['PreÃ§o usa much ou many?', 'Pagar em inglÃªs tem 3 letras.'],
        explicacao: 'How much is this? + Can I pay by card? â€” duas frases que resolvem qualquer compra.',
        conceitos: ['en.compras']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-06-a4',
        tipo: 'reading',
        habilidade: 'reading',
        dimensao: 'reconhecimento',
        titulo: 'Store sign',
        enunciado: 'Leia a placa da loja e responda.',
        texto: 'SALE! T-shirts: $15. Jeans: $40. Hats: $10. We accept cash and credit cards.',
        pergunta: 'Quanto custa a calÃ§a jeans?',
        opcoes: ['$40', '$15', '$10', '$50'],
        correta: 0,
        dicas: ['Procure a palavra jeans no texto.', 'O valor vem logo depois dos dois pontos.'],
        explicacao: 'Jeans: $40. Ler placas e etiquetas curtas Ã© uma das primeiras leituras Ãºteis em inglÃªs.',
        conceitos: ['en.compras']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-06-a5',
        tipo: 'write-code',
        habilidade: 'writing',
        dimensao: 'construcao',
        enunciado: 'Escreva uma pergunta educada perguntando o preÃ§o de algo e como pagar por cartÃ£o.',
        esqueleto: 'How much is ...? Can I pay by ...?',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return t.indexOf('how much') !== -1 && (t.indexOf('pay by card') !== -1 || t.indexOf('pay by credit card') !== -1);
        },
        respostasAceitas: ['How much is this jacket? Can I pay by card?'],
        dicas: ['Use How much is + item.', 'Use Can I pay by card?'],
        explicacao: 'How much is this jacket? Can I pay by card? â€” duas perguntas que vocÃª vai usar em qualquer loja.',
        conceitos: ['en.compras']
      }
    }
  ]
});
