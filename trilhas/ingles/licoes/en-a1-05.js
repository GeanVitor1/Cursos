Plataforma.registrarLicao({
  id: 'en-a1-05',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Comida e restaurante',
  subtitulo: 'English A1 Â· Unidade 6',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Nomear comidas e bebidas',
    'Pedir educadamente com I would like',
    'Pedir a conta e entender o garÃ§om'
  ],
  conceitos: ['en.comida'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'At the restaurant',
      introduz: ['en.comida'],
      blocos: [
        { tipo: 'vocab', titulo: 'Comidas e bebidas', pares: [
          ['breakfast / lunch / dinner', 'cafÃ© da manhÃ£ / almoÃ§o / jantar'],
          ['water / coffee / juice', 'Ã¡gua / cafÃ© / suco'],
          ['bread / rice / chicken', 'pÃ£o / arroz / frango'],
          ['the menu / the bill', 'o cardÃ¡pio / a conta']
        ] },
        { tipo: 'ingles', frase: "I'd like a coffee and a sandwich, please.", traducao: 'Eu gostaria de um cafÃ© e um sanduÃ­che, por favor.' },
        { tipo: 'lista', itens: [
          "`I'd like...` = I would like... (eu gostaria) â€” educado e natural.",
          '`Can I have...?` = Posso ter...? â€” tambÃ©m comum.',
          'Sempre feche o pedido com **please**.'
        ] },
        { tipo: 'nota', tom: 'info', texto: '`I\'d` Ã© a contraÃ§Ã£o de `I would`. Soa mais natural do que "I want", que pode parecer rÃ­spido.' }
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
          { emoji: 'â˜•', texto: 'coffee' },
          { emoji: 'ðŸ’§', texto: 'water' },
          { emoji: 'ðŸž', texto: 'bread' },
          { emoji: 'ðŸŽ', texto: 'apple' }
        ],
        correta: 0,
        dicas: ['Coffee Ã© a bebida quente do cafÃ©.', 'Se quiser, toque em "Ouvir a palavra".'],
        explicacao: 'coffee = cafÃ©. water = Ã¡gua, bread = pÃ£o, apple = maÃ§Ã£.',
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
        enunciado: 'OuÃ§a o pedido e escolha o que a pessoa quer.',
        audio: "I'd like a coffee and a sandwich, please.",
        opcoes: [
          'Um cafÃ© e um sanduÃ­che',
          'Uma Ã¡gua e um bolo',
          'Um suco e um pÃ£o'
        ],
        correta: 0,
        dicas: ['Coffee vocÃª jÃ¡ conhece.', 'Sandwich Ã© o sanduÃ­che.'],
        explicacao: "I'd like a coffee and a sandwich. â€” pedido completo com please.",
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
        cena: 'VocÃª estÃ¡ em um restaurante nos Estados Unidos.',
        interlocutor: 'Waiter',
        turnos: [
          { fala: 'Good evening! Are you ready to order?', opcoes: ["Yes. I'd like a sandwich, please.", 'I am fine, thank you.', 'The bill is on the table.'], correta: 0 },
          { fala: 'Sure. Anything to drink?', opcoes: ['A water, please.', 'Yes, I am twenty.', 'On Monday.'], correta: 0 },
          { fala: 'Great. Anything else?', opcoes: ["No, that's all. Thank you.", 'My name is Ana.', 'I go to bed at ten.'], correta: 0 }
        ],
        dicas: ['"Anything to drink?" pergunta se vocÃª quer bebida.', '"Anything else?" pergunta se quer mais alguma coisa.'],
        explicacao: 'Pedir comida, bebida e encerrar o pedido com "That\'s all" Ã© o roteiro completo de um restaurante.',
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
        dicas: ['A forma educada usa o verbo would.', 'A conta em inglÃªs tem 4 letras.'],
        explicacao: "I would like (ou I'd like) + the bill. Essas duas expressÃµes resolvem o restaurante inteiro.",
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
        explicacao: 'I would like a sandwich, please. â€” educado, correto e entendido em qualquer restaurante.',
        conceitos: ['en.comida']
      }
    }
  ]
});
