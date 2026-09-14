Plataforma.registrarLicao({
  id: 'en-a2-01',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Planos e futuro: going to e will',
  subtitulo: 'English A2 · Unidade 2',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Falar de planos com going to',
    'Usar will para decisões e previsões',
    'Marcar compromissos com tomorrow e next'
  ],
  conceitos: ['en.futuro'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'going to: planos decididos',
      introduz: ['en.futuro'],
      blocos: [
        { tipo: 'texto', texto: 'Para o futuro, o inglês usa duas formas muito comuns. A primeira é **going to**, para planos já decididos.' },
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ["I'm going to travel next week.", 'Vou viajar na próxima semana.'],
          ["She's going to study tonight.", 'Ela vai estudar hoje à noite.']
        ] },
        { tipo: 'ingles', frase: "I'm going to travel next week.", traducao: 'Vou viajar na próxima semana.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-01-p1',
        tipo: 'order-blocks',
        habilidade: 'gramatica',
        dimensao: 'ordenacao',
        enunciado: 'Ordene o plano no futuro.',
        blocos: ["I'm", 'going to', 'travel', 'next week.'],
        dicas: ['Comece com I\'m.', 'Going to vem antes do verbo principal.'],
        explicacao: "I'm going to travel next week. — plano decidido com going to + verbo.",
        conceitos: ['en.futuro']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'will: decisões e promessas',
      blocos: [
        { tipo: 'texto', texto: 'A segunda forma é **will**, usada em decisões de última hora, promessas e previsões.' },
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['I will call you tomorrow.', 'Eu vou te ligar amanhã.'],
          ['It will rain later.', 'Vai chover mais tarde.']
        ] },
        { tipo: 'ingles', frase: 'I will call you tomorrow.', traducao: 'Eu vou te ligar amanhã.' },
        { tipo: 'nota', tom: 'atencao', texto: 'A contração é muito comum na fala: `I am` → `I\'m` e `I will` → `I\'ll`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-01-p2',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete com a forma de futuro para decisão na hora.',
        codigo: 'I {{1}} call you tomorrow.',
        lacunas: [['will']],
        dicas: ['Decisão de última hora usa will.', 'Going to seria para plano já decidido.'],
        explicacao: 'I will call you tomorrow. — a promessa feita na hora usa will.',
        conceitos: ['en.futuro']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Palavras úteis do futuro (1)',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['send → sent', 'enviar → enviei'],
          ['visit', 'visitar'],
          ['a photo', 'uma foto']
        ] },
        { tipo: 'ingles', frase: 'I will send a photo.', traducao: 'Eu vou enviar uma foto.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-01-p3',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada palavra ao significado.',
        pares: [
          ['send', 'enviar'],
          ['visit', 'visitar'],
          ['photo', 'foto']
        ],
        dicas: ['Send é o que você faz com uma mensagem.', 'Photo aparece em "foto".'],
        explicacao: 'send, visit e photo: palavras que aparecem em planos e mensagens.',
        conceitos: ['en.futuro']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Palavras úteis do futuro (2)',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['the city', 'a cidade'],
          ["Let's...", 'Vamos... (convite)'],
          ['also', 'também']
        ] },
        { tipo: 'ingles', frase: "Let's visit the city!", traducao: 'Vamos visitar a cidade!' },
        { tipo: 'lista', itens: [
          '`going to` = plano: I am going to + verbo.',
          '`will` = decisão/promessa/previsão: I will + verbo.',
          'Marcadores: `tomorrow`, `next week`, `next month`, `tonight`.'
        ] }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-01-p4',
        tipo: 'multiple-choice',
        habilidade: 'compreensao',
        dimensao: 'reconhecimento',
        enunciado: 'O que **Let\'s** indica?',
        opcoes: ['Um convite: "Vamos..."', 'Uma proibição', 'Uma pergunta de preço', 'Uma despedida'],
        correta: 0,
        feedbackErro: {
          1: 'Let\'s não proíbe nada; é um convite.',
          2: 'Preço se pergunta com How much.',
          3: 'Despedida seria outra expressão.'
        },
        dicas: ['Let\'s vem de let us.', 'É usado para propor algo a alguém.'],
        explicacao: "Let's = vamos. Use para convidar: Let's have lunch. Let's visit the city.",
        conceitos: ['en.futuro']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-01-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'Ouça o plano e escolha a alternativa correta.',
        audio: "I'm going to travel next week. I will send you photos!",
        opcoes: [
          'Vai viajar na próxima semana e vai mandar fotos.',
          'Viajou na semana passada e mandou fotos.',
          'Vai trabalhar na próxima semana e não vai mandar fotos.'
        ],
        correta: 0,
        dicas: ['Going to indica plano.', 'Next week é a próxima semana.'],
        explicacao: 'going to travel (plano) + will send (promessa). As duas formas juntas no mesmo relato.',
        conceitos: ['en.futuro']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-01-a2',
        tipo: 'match-pairs',
        habilidade: 'gramatica',
        dimensao: 'associacao',
        enunciado: 'Conecte a estrutura ao uso.',
        pares: [
          ["I'm going to study.", 'Plano decidido'],
          ['I will help you.', 'Decisão na hora / promessa'],
          ["She's going to travel.", 'Plano de outra pessoa'],
          ['It will rain.', 'Previsão']
        ],
        dicas: ['Going to costuma indicar algo já planejado.', 'Will aparece em decisões rápidas.'],
        explicacao: 'A diferença entre going to e will é de intenção: plano decidido vs decisão do momento.',
        conceitos: ['en.futuro']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-01-a3',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete com a forma correta do futuro.',
        codigo: 'She {{1}} going to study tonight.\nI {{2}} call you tomorrow. (decisão na hora)',
        lacunas: [['is'], ['will']],
        dicas: ['She é terceira pessoa do singular do verbo to be.', 'Decisão de última hora usa will.'],
        explicacao: 'She is going to (plano) + I will (decisão). Cada forma tem seu contexto.',
        conceitos: ['en.futuro']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-01-a4',
        tipo: 'dialogue',
        habilidade: 'compreensao',
        dimensao: 'aplicacao',
        enunciado: 'Combine planos com um amigo.',
        cena: 'Você e um amigo combinam o fim de semana.',
        interlocutor: 'Leo',
        turnos: [
          { fala: 'What are you going to do this weekend?', opcoes: ["I'm going to visit my parents.", 'I went to the beach.', 'It is twenty dollars.'], correta: 0 },
          { fala: 'Nice! Are you going to travel?', opcoes: ["No, I'm going to stay in the city.", 'Yes, I am twenty years old.', 'On Monday at nine.'], correta: 0 },
          { fala: "Let's have lunch on Sunday. I will call you.", opcoes: ['Great! See you on Sunday.', 'I usually wake up at seven.', 'My name is Ana.'], correta: 0 }
        ],
        dicas: ['A pergunta é sobre planos futuros.', '"Let\'s" é um convite.'],
        explicacao: 'Falar de planos, responder e combinar: o futuro na conversa real.',
        conceitos: ['en.futuro'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-01-a5',
        tipo: 'write-code',
        habilidade: 'writing',
        dimensao: 'construcao',
        enunciado: 'Escreva dois planos para a próxima semana usando going to.',
        esqueleto: "Next week I'm going to ... . I'm also going to ... .",
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          const planos = (t.match(/going to/g) || []).length;
          const frases = t.split(/[.!?\n]/).filter(function (f) { return f.trim().length > 4; });
          return t.indexOf('next week') !== -1 && planos >= 2 && frases.length >= 2;
        },
        respostasAceitas: ["Next week I'm going to study English. I'm also going to work."],
        dicas: ['Use next week.', 'Use I\'m going to + verbo.'],
        explicacao: 'Next week I\'m going to... — a forma prática de falar de planos.',
        conceitos: ['en.futuro']
      }
    }
  ]
});
