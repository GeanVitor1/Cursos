Plataforma.registrarLicao({
  id: 'en-a2-01',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Planos e futuro: going to e will',
  subtitulo: 'English A2 Â· Unidade 2',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Falar de planos com going to',
    'Usar will para decisÃµes e previsÃµes',
    'Marcar compromissos com tomorrow e next'
  ],
  conceitos: ['en.futuro'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Tomorrow, next week...',
      introduz: ['en.futuro'],
      blocos: [
        { tipo: 'texto', texto: 'Para o futuro, o inglÃªs usa duas formas muito comuns: **going to** (planos jÃ¡ decididos) e **will** (decisÃµes de Ãºltima hora, promessas e previsÃµes).' },
        { tipo: 'vocab', titulo: 'Futuro em uso', pares: [
          ["I'm going to travel next week.", 'Vou viajar na prÃ³xima semana.'],
          ["She's going to study tonight.", 'Ela vai estudar hoje Ã  noite.'],
          ['I will call you tomorrow.', 'Eu vou te ligar amanhÃ£.'],
          ["It will rain later.", 'Vai chover mais tarde.']
        ] },
        { tipo: 'lista', itens: [
          '`going to` = plano: I am going to + verbo.',
          '`will` = decisÃ£o/promessa/previsÃ£o: I will + verbo.',
          'Marcadores: `tomorrow`, `next week`, `next month`, `tonight`.'
        ] },
        { tipo: 'nota', tom: 'atencao', texto: 'A contraÃ§Ã£o Ã© muito comum na fala: `I\'m going to` â†’ `I\'m gonna`, `I will` â†’ `I\'ll`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-01-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'OuÃ§a o plano e escolha a alternativa correta.',
        audio: "I'm going to travel next week. I will send you photos!",
        opcoes: [
          'Vai viajar na prÃ³xima semana e vai mandar fotos.',
          'Viajou na semana passada e mandou fotos.',
          'Vai trabalhar na prÃ³xima semana e nÃ£o vai mandar fotos.'
        ],
        correta: 0,
        dicas: ['Going to indica plano.', 'Next week Ã© a prÃ³xima semana.'],
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
          ['I will help you.', 'DecisÃ£o na hora / promessa'],
          ["She's going to travel.", 'Plano de outra pessoa'],
          ['It will rain.', 'PrevisÃ£o']
        ],
        dicas: ['Going to costuma indicar algo jÃ¡ planejado.', 'Will aparece em decisÃµes rÃ¡pidas.'],
        explicacao: 'A diferenÃ§a entre going to e will Ã© de intenÃ§Ã£o: plano decidido vs decisÃ£o do momento.',
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
        codigo: 'She {{1}} going to study tonight.\nI {{2}} call you tomorrow. (decisÃ£o na hora)',
        lacunas: [['is'], ['will']],
        dicas: ['She Ã© terceira pessoa do singular do verbo to be.', 'DecisÃ£o de Ãºltima hora usa will.'],
        explicacao: 'She is going to (plano) + I will (decisÃ£o). Cada forma tem seu contexto.',
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
        cena: 'VocÃª e um amigo combinam o fim de semana.',
        interlocutor: 'Leo',
        turnos: [
          { fala: 'What are you going to do this weekend?', opcoes: ["I'm going to visit my parents.", 'I went to the beach.', 'It is twenty dollars.'], correta: 0 },
          { fala: 'Nice! Are you going to travel?', opcoes: ["No, I'm staying in the city.", 'Yes, I am twenty years old.', 'On Monday at nine.'], correta: 0 },
          { fala: "Let's have lunch on Sunday. I will call you.", opcoes: ['Great! See you on Sunday.', 'I usually wake up at seven.', 'My name is Ana.'], correta: 0 }
        ],
        dicas: ['A pergunta Ã© sobre planos futuros.', '"Let\'s" Ã© um convite.'],
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
        enunciado: 'Escreva dois planos para a prÃ³xima semana usando going to.',
        esqueleto: "Next week I'm going to ... . I'm also going to ... .",
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return t.indexOf('next week') !== -1 && t.indexOf('going to') !== -1 && t.split('.').filter(function (f) { return f.trim().length > 4; }).length >= 1;
        },
        respostasAceitas: ["Next week I'm going to study English. I'm also going to work."],
        dicas: ['Use next week.', 'Use I\'m going to + verbo.'],
        explicacao: 'Next week I\'m going to... â€” a forma prÃ¡tica de falar de planos.',
        conceitos: ['en.futuro']
      }
    }
  ]
});
