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
      titulo: 'At the restaurant',
      introduz: ['en.comida'],
      blocos: [
        { tipo: 'vocab', titulo: 'Comidas e bebidas', pares: [
          ['breakfast / lunch / dinner', 'café da manhã / almoço / jantar'],
          ['water / coffee / juice', 'água / café / suco'],
          ['bread / rice / chicken', 'pão / arroz / frango'],
          ['the menu / the bill', 'o cardápio / a conta']
        ] },
        { tipo: 'ingles', frase: "I'd like a coffee and a sandwich, please.", traducao: 'Eu gostaria de um café e um sanduíche, por favor.' },
        { tipo: 'lista', itens: [
          "`I'd like...` = I would like... (eu gostaria) — educado e natural.",
          '`Can I have...?` = Posso ter...? — também comum.',
          'Sempre feche o pedido com **please**.'
        ] },
        { tipo: 'nota', tom: 'info', texto: '`I\'d` é a contração de `I would`. Soa mais natural do que "I want", que pode parecer ríspido.' }
      ]
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
