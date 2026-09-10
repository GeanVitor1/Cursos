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
      titulo: 'Tomorrow, next week...',
      introduz: ['en.futuro'],
      blocos: [
        { tipo: 'texto', texto: 'Para o futuro, o inglês usa duas formas muito comuns: **going to** (planos já decididos) e **will** (decisões de última hora, promessas e previsões).' },
        { tipo: 'vocab', titulo: 'Futuro em uso', pares: [
          ["I'm going to travel next week.", 'Vou viajar na próxima semana.'],
          ["She's going to study tonight.", 'Ela vai estudar hoje à noite.'],
          ['I will call you tomorrow.', 'Eu vou te ligar amanhã.'],
          ["It will rain later.", 'Vai chover mais tarde.'],
          ['send → sent', 'enviar → enviei'],
          ['a photo', 'uma foto'],
          ['visit', 'visitar'],
          ['the city', 'a cidade'],
          ["Let's...", 'Vamos... (convite)'],
          ['also', 'também']
        ] },
        { tipo: 'lista', itens: [
          '`going to` = plano: I am going to + verbo.',
          '`will` = decisão/promessa/previsão: I will + verbo.',
          'Marcadores: `tomorrow`, `next week`, `next month`, `tonight`.'
        ] },
        { tipo: 'nota', tom: 'atencao', texto: 'A contração é muito comum na fala: `I am` → `I\'m` e `I will` → `I\'ll`.' }
      ]
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
          return t.indexOf('next week') !== -1 && t.indexOf('going to') !== -1 && t.split('.').filter(function (f) { return f.trim().length > 4; }).length >= 1;
        },
        respostasAceitas: ["Next week I'm going to study English. I'm also going to work."],
        dicas: ['Use next week.', 'Use I\'m going to + verbo.'],
        explicacao: 'Next week I\'m going to... — a forma prática de falar de planos.',
        conceitos: ['en.futuro']
      }
    }
  ]
});
