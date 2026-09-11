Plataforma.registrarLicao({
  id: 'en-a1-03',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Minha rotina: falando do dia a dia',
  subtitulo: 'English A1 · Unidade 4',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Descrever a rotina com o present simple',
    'Usar verbos de ações do dia a dia',
    'Perceber o -s da terceira pessoa'
  ],
  conceitos: ['en.rotina'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Ações da manhã',
      introduz: ['en.rotina'],
      blocos: [
        { tipo: 'texto', texto: 'Para falar do que você faz todos os dias, o inglês usa uma forma simples do verbo. Vamos começar pelas ações da manhã.' },
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['wake up / get up', 'acordar / levantar'],
          ['have breakfast', 'tomar café da manhã']
        ] },
        { tipo: 'ingles', frase: 'I wake up at seven.', traducao: 'Eu acordo às sete.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-03-p1',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada ação da manhã ao significado.',
        pares: [
          ['wake up', 'acordar'],
          ['get up', 'levantar'],
          ['have breakfast', 'tomar café da manhã']
        ],
        dicas: ['Wake up é abrir os olhos.', 'Get up é sair da cama.'],
        explicacao: 'wake up, get up e have breakfast: as três primeiras ações do dia.',
        conceitos: ['en.rotina']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Trabalho e estudo',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (5)', pares: [
          ['go to work / study', 'ir ao trabalho / estudar'],
          ['come home', 'voltar para casa']
        ] },
        { tipo: 'ingles', frase: 'I go to work at eight.', traducao: 'Eu vou ao trabalho às oito.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-03-p2',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **go to work**?',
        opcoes: ['Ir ao trabalho', 'Voltar para casa', 'Acordar', 'Estudar'],
        correta: 0,
        feedbackErro: {
          1: 'Voltar para casa é **come home**.',
          2: 'Acordar é **wake up**.',
          3: 'Estudar é **study**.'
        },
        dicas: ['Work é trabalho.', 'Go é ir.'],
        explicacao: 'go to work = ir ao trabalho; come home = voltar para casa; study = estudar.',
        conceitos: ['en.rotina']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Fim do dia',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['have lunch', 'almoçar'],
          ['go to bed / sleep', 'ir para a cama / dormir']
        ] },
        { tipo: 'ingles', frase: 'I go to bed at ten.', traducao: 'Eu vou para a cama às dez.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-03-p3',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada ação ao significado.',
        pares: [
          ['have lunch', 'almoçar'],
          ['go to bed', 'ir dormir'],
          ['sleep', 'dormir']
        ],
        dicas: ['Lunch é o almoço.', 'Bed é a cama.'],
        explicacao: 'Com esses verbos + horas você já monta uma rotina inteira.',
        conceitos: ['en.rotina']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'De manhã, de tarde, à noite',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['with', 'com'],
          ['in the morning / in the afternoon', 'de manhã / de tarde'],
          ['in the evening / at night', 'à noite']
        ] },
        { tipo: 'ingles', frase: 'I work in the morning.', traducao: 'Eu trabalho de manhã.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-03-p4',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete a frase sobre a rotina.',
        codigo: 'I go to work {{1}} the morning.',
        lacunas: [['in']],
        dicas: ['De manhã, em inglês, usa uma preposição.', 'A expressão é in the morning.'],
        explicacao: 'I go to work in the morning. — a preposição in acompanha as partes do dia.',
        conceitos: ['en.rotina']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Nós, eles e todos os dias',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['every day', 'todos os dias'],
          ['We / They', 'nós / eles, elas']
        ] },
        { tipo: 'ingles', frase: 'We study every day.', traducao: 'Nós estudamos todos os dias.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-03-p5',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **every day**?',
        opcoes: ['Todos os dias', 'De manhã', 'À noite', 'Nunca'],
        correta: 0,
        feedbackErro: {
          1: 'De manhã é **in the morning**.',
          2: 'À noite é **at night**.',
          3: 'Nunca é **never**, que você verá depois.'
        },
        dicas: ['Every é cada/todos.', 'Day é dia.'],
        explicacao: 'every day = todos os dias. É o marcador mais comum da rotina.',
        conceitos: ['en.rotina']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Usually: a frequência',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['usually', 'geralmente'],
          ['present simple', 'presente simples']
        ] },
        { tipo: 'ingles', frase: 'I usually wake up at seven and have breakfast.', traducao: 'Eu geralmente acordo às sete e tomo café da manhã.' },
        { tipo: 'ingles', frase: 'I usually work in the morning and study at night.', traducao: 'Eu geralmente trabalho de manhã e estudo à noite.' },
        { tipo: 'lista', itens: [
          '`I work` / `I study` — sem mudança no verbo.',
          '`You work` / `We work` / `They work` — também sem mudança.',
          '`He works` / `She works` — atenção: ganha **-s** no final.'
        ] },
        { tipo: 'nota', tom: 'atencao', texto: '`usually` (geralmente) vem antes do verbo: I **usually** work. É uma palavra de frequência muito usada.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-03-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'Ouça a rotina e escolha a alternativa correta.',
        audio: 'I usually wake up at seven and have breakfast with my family.',
        opcoes: [
          'Acordo às sete e tomo café com a família.',
          'Acordo às onze e vou dormir.',
          'Trabalho às sete e estudo à noite.'
        ],
        correta: 0,
        dicas: ['Seven é a hora dita.', 'Breakfast é a refeição da manhã.'],
        explicacao: 'wake up at seven + have breakfast with my family. Você entendeu uma rotina completa.',
        conceitos: ['en.rotina']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-03-a2',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada ação da rotina à tradução.',
        pares: [
          ['wake up', 'acordar'],
          ['have lunch', 'almoçar'],
          ['go to work', 'ir ao trabalho'],
          ['go to bed', 'ir dormir']
        ],
        dicas: ['Lunch é o almoço.', 'Bed é a cama.'],
        explicacao: 'Com esses verbos + horas você já monta uma rotina inteira.',
        conceitos: ['en.rotina']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-03-a3',
        tipo: 'order-blocks',
        habilidade: 'gramatica',
        dimensao: 'ordenacao',
        enunciado: 'Ordene as palavras para formar a frase: "Eu geralmente trabalho de manhã."',
        blocos: ['I', 'usually', 'work', 'in the morning.'],
        dicas: ['O sujeito vem primeiro.', '"Usually" fica entre o sujeito e o verbo.'],
        explicacao: 'I usually work in the morning. Estrutura: sujeito + frequência + verbo + complemento.',
        conceitos: ['en.rotina']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-03-a4',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete com a forma correta do verbo no present simple.',
        codigo: 'She {{1}} in the morning. (work)\nThey {{2}} English every day. (study)',
        lacunas: [['works'], ['study']],
        dicas: ['She é terceira pessoa: o verbo muda.', 'They não leva -s.'],
        explicacao: 'She works / They study. A única mudança do present simple é o -s (ou -es) em he/she.',
        conceitos: ['en.rotina']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-03-a5',
        tipo: 'write-code',
        habilidade: 'writing',
        dimensao: 'construcao',
        enunciado: 'Escreva duas frases sobre a sua rotina, usando I + verbo.',
        esqueleto: 'I usually ... . I ... .',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          const frases = t.split('.').filter(function (f) { return f.trim().length > 0; });
          return /\bi\b/.test(t) && frases.length >= 2;
        },
        respostasAceitas: ['I usually wake up at seven. I go to work at eight.'],
        dicas: ['Use verbos da unidade: wake up, study, work, have breakfast...', 'Duas frases terminadas com ponto.'],
        explicacao: 'Escrever a própria rotina fixa o present simple e o vocabulário de ações, que voltam em toda conversa do dia a dia.',
        conceitos: ['en.rotina'],
        desafio: true
      }
    }
  ]
});
