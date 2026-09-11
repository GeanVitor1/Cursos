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
      titulo: 'Quanto custa?',
      introduz: ['en.compras'],
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['How much is this?', 'Quanto custa isto?'],
          ["It's twenty dollars.", 'São vinte dólares.'],
          ['expensive / cheap', 'caro / barato']
        ] },
        { tipo: 'ingles', frase: 'How much is this?', traducao: 'Quanto custa isto?' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-06-p1',
        tipo: 'order-blocks',
        habilidade: 'gramatica',
        dimensao: 'ordenacao',
        enunciado: 'Ordene para perguntar o preço.',
        blocos: ['How', 'much', 'is', 'this?'],
        dicas: ['Comece com How.', 'Much acompanha preço.'],
        explicacao: 'How much is this? — a pergunta de preço mais usada em lojas.',
        conceitos: ['en.compras']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Dinheiro e cartão',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['cash / credit card', 'dinheiro / cartão de crédito'],
          ['$ = dollar', 'símbolo do dólar']
        ] },
        { tipo: 'ingles', frase: "It's twenty dollars.", traducao: 'São vinte dólares.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-06-p2',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **cash**?',
        opcoes: ['Dinheiro em espécie', 'Cartão de crédito', 'Preço', 'Troco'],
        correta: 0,
        feedbackErro: {
          1: 'Cartão de crédito é **credit card**.',
          2: 'Preço é **price**, que você verá depois.',
          3: 'Troco é **change**.'
        },
        dicas: ['Cash é o dinheiro em notas e moedas.', 'O contrário de pagar com cartão.'],
        explicacao: 'cash = dinheiro; credit card = cartão de crédito. As duas formas de pagamento mais comuns.',
        conceitos: ['en.compras']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Atendimento na loja',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['Can I help you?', 'Posso ajudar?'],
          ['Can I pay by card?', 'Posso pagar com cartão?'],
          ['by card', 'com cartão']
        ] },
        { tipo: 'ingles', frase: 'Can I pay by card?', traducao: 'Posso pagar com cartão?' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-06-p3',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete a pergunta sobre pagamento.',
        codigo: 'Can I {{1}} by card?',
        lacunas: [['pay']],
        dicas: ['Pagar em inglês tem 3 letras.', 'A forma de pagamento é by card.'],
        explicacao: 'Can I pay by card? = Posso pagar com cartão? — a pergunta que resolve a forma de pagamento.',
        conceitos: ['en.compras']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Experimentando a roupa',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (5)', pares: [
          ['Do you have this in another size?', 'Você tem isto em outro tamanho?'],
          ['try it on', 'experimentar (a roupa)'],
          ['the fitting room', 'o provador']
        ] },
        { tipo: 'ingles', frase: 'Do you have this in another size?', traducao: 'Você tem isto em outro tamanho?' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-06-p4',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que é **the fitting room**?',
        opcoes: ['O provador', 'A caixa', 'A vitrine', 'O estoque'],
        correta: 0,
        feedbackErro: {
          1: 'A caixa fica no final da loja.',
          2: 'Vitrine é a parte da frente da loja.',
          3: 'Estoque é onde ficam as peças guardadas.'
        },
        dicas: ['Fitting vem de "servir/experimentar".', 'É onde você experimenta a roupa na loja.'],
        explicacao: 'the fitting room = o provador. Para experimentar uma roupa, use try it on.',
        conceitos: ['en.compras']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Roupas e promoção',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (5)', pares: [
          ['jacket / jeans / hat', 'jaqueta / calça jeans / chapéu'],
          ['shirt / sale', 'camisa / promoção']
        ] },
        { tipo: 'ingles', frase: 'The shirt is on sale.', traducao: 'A camisa está em promoção.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-06-p5',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada peça de roupa ao significado.',
        pares: [
          ['jacket', 'jaqueta'],
          ['jeans', 'calça jeans'],
          ['hat', 'chapéu']
        ],
        dicas: ['Jacket é a peça de frio.', 'Jeans você veste todos os dias.'],
        explicacao: 'jacket, jeans e hat: peças de roupa que aparecem em qualquer loja.',
        conceitos: ['en.compras']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Ali, lá e a sacola',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['over there', 'ali / lá'],
          ['We accept cash.', 'Nós aceitamos dinheiro.'],
          ['a bag', 'uma bolsa / uma sacola']
        ] },
        { tipo: 'ingles', frase: 'The fitting room is over there.', traducao: 'O provador fica ali.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-06-p6',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **over there**?',
        opcoes: ['Ali / lá', 'Aqui', 'Perto', 'Longe demais'],
        correta: 0,
        feedbackErro: {
          1: 'Aqui é **here**.',
          2: 'Perto é **near**, que você verá na próxima lição.',
          3: 'Longe demais seria outra expressão.'
        },
        dicas: ['Over there aponta para um lugar.', 'É a resposta típica de quem indica onde fica algo.'],
        explicacao: 'over there = ali / lá. Use para apontar um lugar mais distante na loja.',
        conceitos: ['en.compras']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Lista e total',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['shopping list', 'lista de compras'],
          ['total', 'total']
        ] },
        { tipo: 'ingles', frase: 'The total is twenty dollars.', traducao: 'O total é vinte dólares.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-06-p7',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete a frase com a palavra que fecha a compra.',
        codigo: 'The {{1}} is twenty dollars.',
        lacunas: [['total']],
        dicas: ['É o valor final da compra.', 'A palavra é igual em inglês e português.'],
        explicacao: 'The total is twenty dollars. — a frase que resume a compra no caixa.',
        conceitos: ['en.compras']
      }
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
