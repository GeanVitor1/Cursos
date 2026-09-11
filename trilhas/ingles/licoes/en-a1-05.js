Plataforma.registrarLicao({
  id: 'en-a1-05',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Comida e restaurante',
  subtitulo: 'English A1 · Unidade 6',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Nomear comidas e bebidas',
    'Pedir educadamente com I would like',
    'Pedir a conta e entender o garçom'
  ],
  conceitos: ['en.comida'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Refeições e bebidas',
      introduz: ['en.comida'],
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['breakfast / lunch / dinner', 'café da manhã / almoço / jantar'],
          ['water / coffee / juice', 'água / café / suco']
        ] },
        { tipo: 'ingles', frase: 'I have coffee with breakfast.', traducao: 'Eu tomo café com o café da manhã.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-05-p1',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada bebida ao significado.',
        pares: [
          ['water', 'água'],
          ['coffee', 'café'],
          ['juice', 'suco']
        ],
        dicas: ['Water é a bebida mais básica.', 'Coffee é a bebida quente.'],
        explicacao: 'water, coffee e juice: as três bebidas mais pedidas em qualquer lugar.',
        conceitos: ['en.comida']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Comidas',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (5)', pares: [
          ['bread / rice / chicken', 'pão / arroz / frango'],
          ['sandwich / apple', 'sanduíche / maçã']
        ] },
        { tipo: 'ingles', frase: 'Bread, rice, chicken!', traducao: 'Pão, arroz, frango!' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-05-p2',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **apple**?',
        opcoes: ['Maçã', 'Pão', 'Arroz', 'Frango'],
        correta: 0,
        feedbackErro: {
          1: 'Pão é **bread**.',
          2: 'Arroz é **rice**.',
          3: 'Frango é **chicken**.'
        },
        dicas: ['Apple é uma fruta.', 'Aparece em muitas expressões em inglês.'],
        explicacao: 'apple = maçã; bread = pão; rice = arroz; chicken = frango.',
        conceitos: ['en.comida']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'No restaurante',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['the menu / the bill', 'o cardápio / a conta'],
          ['the table', 'a mesa'],
          ['Perfect.', 'Perfeito.']
        ] },
        { tipo: 'ingles', frase: 'This is the menu.', traducao: 'Este é o cardápio.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-05-p3',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada palavra do restaurante ao significado.',
        pares: [
          ['menu', 'cardápio'],
          ['bill', 'conta'],
          ['table', 'mesa']
        ],
        dicas: ['O menu você lê antes de pedir.', 'A bill você pede no final.'],
        explicacao: 'menu, bill e table: o vocabulário básico para se sentar e pedir.',
        conceitos: ['en.comida']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Pedindo educadamente',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (5)', pares: [
          ['I would like... / I want...', 'Eu gostaria... / Eu quero...'],
          ['Can I have...?', 'Posso ter...?'],
          ['please', 'por favor']
        ] },
        { tipo: 'ingles', frase: "I'd like a coffee, please.", traducao: 'Eu gostaria de um café, por favor.' },
        { tipo: 'lista', itens: [
          "`I'd like...` = I would like... (eu gostaria) — educado e natural.",
          '`Can I have...?` = Posso ter...? — também comum.',
          'Sempre feche o pedido com **please**.'
        ] },
        { tipo: 'nota', tom: 'info', texto: '`I\'d` é a contração de `I would`. Soa mais natural do que `I want`, que pode parecer ríspido.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-05-p4',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete o pedido educado.',
        codigo: 'I {{1}} like a coffee, please.',
        lacunas: [['would']],
        dicas: ['A forma educada usa o verbo would.', 'A contração de I would é I\'d.'],
        explicacao: 'I would like (ou I\'d like) + o que você quer + please. O pedido educado completo.',
        conceitos: ['en.comida']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O que o garçom pergunta',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (5)', pares: [
          ['Are you ready to order?', 'Você está pronto para fazer o pedido?'],
          ['Anything to drink?', 'Algo para beber?'],
          ['Anything else?', 'Mais alguma coisa?']
        ] },
        { tipo: 'ingles', frase: 'Are you ready to order?', traducao: 'Você está pronto para fazer o pedido?' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-05-p5',
        tipo: 'multiple-choice',
        habilidade: 'compreensao',
        dimensao: 'reconhecimento',
        enunciado: 'O que o garçom quer saber com **Anything to drink?**',
        opcoes: ['Se você quer alguma bebida', 'Se você quer a conta', 'Se você gostou da comida', 'Se você quer mais comida'],
        correta: 0,
        feedbackErro: {
          1: 'A conta se pede com **the bill**.',
          2: 'Essa pergunta não é sobre gostar.',
          3: 'Para mais comida, ele pergunta **Anything else?**.'
        },
        dicas: ['Drink é bebida.', 'É uma pergunta feita logo depois do pedido principal.'],
        explicacao: 'Anything to drink? = Algo para beber? Responda com A water, please ou apenas No.',
        conceitos: ['en.comida']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Respondendo e agradecendo',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['Sure.', 'Claro.'],
          ["No, that's all.", 'Não, é só isso.'],
          ['Thank you.', 'Obrigado(a).']
        ] },
        { tipo: 'ingles', frase: "No, that's all. Thank you.", traducao: 'Não, é só isso. Obrigado.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-05-p6',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **No, that\'s all**?',
        opcoes: ['Não, é só isso', 'Não, obrigado', 'Sim, por favor', 'Claro, pode ser'],
        correta: 0,
        feedbackErro: {
          1: 'Não, obrigado é **No, thank you**.',
          2: 'Sim, por favor é **Yes, please**.',
          3: 'Claro, pode ser é **Sure**.'
        },
        dicas: ['All é tudo.', 'É a frase que encerra um pedido.'],
        explicacao: "No, that's all = não, é só isso. Encerra o pedido de forma educada.",
        conceitos: ['en.comida']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'A comida chegou',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['Here is your food.', 'Aqui está sua comida.'],
          ['Enjoy!', 'Bom apetite! / Aproveite!'],
          ['Great!', 'Ótimo!']
        ] },
        { tipo: 'ingles', frase: 'Here is your food. Enjoy!', traducao: 'Aqui está sua comida. Bom apetite!' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-05-p7',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que o garçom deseja quando diz **Enjoy!**?',
        opcoes: ['Bom apetite / aproveite', 'Boa sorte', 'Boa viagem', 'Bom trabalho'],
        correta: 0,
        feedbackErro: {
          1: 'Enjoy é usado quando a comida chega.',
          2: 'Enjoy não significa boa viagem.',
          3: 'Enjoy não significa bom trabalho.'
        },
        dicas: ['Enjoy é aproveitar.', 'É a frase dita quando a comida chega.'],
        explicacao: 'Enjoy! = bom apetite! É o que o garçom diz ao trazer a comida.',
        conceitos: ['en.comida']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-05-a1',
        tipo: 'choose-image',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'Toque na imagem que representa **coffee**.',
        audio: 'coffee',
        opcoes: [
          { emoji: '☕', texto: 'coffee' },
          { emoji: '💧', texto: 'water' },
          { emoji: '🍞', texto: 'bread' },
          { emoji: '🍎', texto: 'apple' }
        ],
        correta: 0,
        dicas: ['Coffee é a bebida quente do café.', 'Se quiser, toque em "Ouvir a palavra".'],
        explicacao: 'coffee = café. water = água, bread = pão, apple = maçã.',
        conceitos: ['en.comida']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-05-a2',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'Ouça o pedido e escolha o que a pessoa quer.',
        audio: "I'd like a coffee and a sandwich, please.",
        opcoes: [
          'Um café e um sanduíche',
          'Uma água e um bolo',
          'Um suco e um pão'
        ],
        correta: 0,
        dicas: ['Coffee você já conhece.', 'Sandwich é o sanduíche.'],
        explicacao: "I'd like a coffee and a sandwich. — pedido completo com please.",
        conceitos: ['en.comida']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-05-a3',
        tipo: 'dialogue',
        habilidade: 'compreensao',
        dimensao: 'aplicacao',
        enunciado: 'Complete o pedido no restaurante.',
        cena: 'Você está em um restaurante nos Estados Unidos.',
        interlocutor: 'Waiter',
        turnos: [
          { fala: 'Good evening! Are you ready to order?', opcoes: ["Yes. I'd like a sandwich, please.", 'I am fine, thank you.', 'The bill is on the table.'], correta: 0 },
          { fala: 'Sure. Anything to drink?', opcoes: ['A water, please.', 'Yes, I am twenty.', 'On Monday.'], correta: 0 },
          { fala: 'Great. Anything else?', opcoes: ["No, that's all. Thank you.", 'My name is Ana.', 'I go to bed at ten.'], correta: 0 }
        ],
        dicas: ['"Anything to drink?" pergunta se você quer bebida.', '"Anything else?" pergunta se quer mais alguma coisa.'],
        explicacao: 'Pedir comida, bebida e encerrar o pedido com "That\'s all" é o roteiro completo de um restaurante.',
        conceitos: ['en.comida'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-05-a4',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete o pedido e a conta.',
        codigo: "I {{1}} like a coffee, please. Can I have the {{2}}, please?",
        lacunas: [['would', "'d"], ['bill']],
        dicas: ['A forma educada usa o verbo would.', 'A conta em inglês tem 4 letras.'],
        explicacao: "I would like (ou I'd like) + the bill. Essas duas expressões resolvem o restaurante inteiro.",
        conceitos: ['en.comida']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-05-a5',
        tipo: 'write-code',
        habilidade: 'writing',
        dimensao: 'construcao',
        enunciado: 'Escreva um pedido educado: use I would like + uma comida + please.',
        esqueleto: "I would like ... , please.",
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return t.indexOf('i would like') !== -1 && t.indexOf('please') !== -1 && t.split(' ').length >= 4;
        },
        respostasAceitas: ['I would like a sandwich, please.'],
        dicas: ['Comece com I would like.', 'Termine com please.'],
        explicacao: 'I would like a sandwich, please. — educado, correto e entendido em qualquer restaurante.',
        conceitos: ['en.comida']
      }
    }
  ]
});
