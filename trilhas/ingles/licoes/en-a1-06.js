Plataforma.registrarLicao({
  id: 'en-a1-06',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Compras: preços e pagamento',
  subtitulo: 'English A1 · Unidade 7',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Perguntar preços com How much',
    'Entender valores em dólar ao ouvir',
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
          ['How many...?', 'Quantos / quantas...?'],
          ["It's twenty dollars.", 'São vinte dólares.'],
          ['expensive / cheap', 'caro / barato'],
          ['cash / credit card', 'dinheiro / cartão de crédito'],
          ['$ = dollar', 'símbolo do dólar']
        ] },
        { tipo: 'vocab', titulo: 'Frases da loja', pares: [
          ['Can I help you?', 'Posso ajudar?'],
          ['Where is...?', 'Onde fica...?'],
          ['Can I pay by card?', 'Posso pagar com cartão?'],
          ['by card', 'com cartão'],
          ['Do you have this in another size?', 'Você tem isto em outro tamanho?'],
          ['try it on', 'experimentar (a roupa)'],
          ['the fitting room', 'o provador'],
          ['over there', 'ali / lá'],
          ['jacket / jeans / hat', 'jaqueta / calça jeans / chapéu'],
          ['sale', 'promoção'],
          ['We accept cash.', 'Nós aceitamos dinheiro.'],
          ['a bag', 'uma bolsa / uma sacola'],
          ['shopping list', 'lista de compras'],
          ['total', 'total']
        ] },
        { tipo: 'ingles', frase: "How much is this T-shirt? — It's twenty dollars.", traducao: 'Quanto custa esta camiseta? — São vinte dólares.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Use **How much** para preço (coisas incontáveis) e **How many** para quantidade (coisas contáveis): How many apples?' },
        { tipo: 'nota', tom: 'info', texto: 'O símbolo `$` significa dólar: `$15` = quinze dólares. Em lojas, `Can I pay by card?` (Posso pagar com cartão?) é muito comum.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-06-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'Ouça a conversa e escolha o preço.',
        audio: 'How much is this T-shirt? It is twenty dollars.',
        opcoes: ['$20', '$12', '$2'],
        correta: 0,
        dicas: ['Twenty é 20.', 'Preste atenção ao final -ty.'],
        explicacao: 'twenty = 20. Números de preço aparecem o tempo todo em viagens e compras online.',
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
        cena: 'Você está em uma loja de roupas em outro país.',
        interlocutor: 'Shop assistant',
        turnos: [
          { fala: 'Hi! Can I help you?', opcoes: ["Yes, how much is this T-shirt?", 'I am twenty years old.', 'I go to bed at ten.'], correta: 0 },
          { fala: 'It is twenty dollars. Do you want to try it on?', opcoes: ['Yes, please. Where is the fitting room?', 'No, I am twenty years old.', 'On Monday at nine.'], correta: 0 },
          { fala: 'It is over there. How would you like to pay?', opcoes: ['By card, please.', 'I usually wake up at seven.', 'My name is Ana.'], correta: 0 }
        ],
        dicas: ['"Can I help you?" pede o que você procura.', '"How would you like to pay?" pergunta a forma de pagamento.'],
        explicacao: 'Perguntar preço, pedir para experimentar e escolher a forma de pagamento: a compra completa em inglês.',
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
        enunciado: 'Complete a pergunta de preço e a forma de pagamento.',
        codigo: 'How {{1}} is this bag? — Can I {{2}} by card?',
        lacunas: [['much'], ['pay']],
        dicas: ['Preço usa much ou many?', 'Pagar em inglês tem 3 letras.'],
        explicacao: 'How much is this? + Can I pay by card? — duas frases que resolvem qualquer compra.',
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
        pergunta: 'Quanto custa a calça jeans?',
        opcoes: ['$40', '$15', '$10', '$50'],
        correta: 0,
        dicas: ['Procure a palavra jeans no texto.', 'O valor vem logo depois dos dois pontos.'],
        explicacao: 'Jeans: $40. Ler placas e etiquetas curtas é uma das primeiras leituras úteis em inglês.',
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
        enunciado: 'Escreva uma pergunta educada perguntando o preço de algo e como pagar por cartão.',
        esqueleto: 'How much is ...? Can I pay by ...?',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return t.indexOf('how much') !== -1 && (t.indexOf('pay by card') !== -1 || t.indexOf('pay by credit card') !== -1);
        },
        respostasAceitas: ['How much is this jacket? Can I pay by card?'],
        dicas: ['Use How much is + item.', 'Use Can I pay by card?'],
        explicacao: 'How much is this jacket? Can I pay by card? — duas perguntas que você vai usar em qualquer loja.',
        conceitos: ['en.compras']
      }
    }
  ]
});
