Plataforma.registrarLicao({
  id: 'en-a1-02',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Família e pessoas',
  subtitulo: 'English A1 · Unidade 3',
  duracaoMin: 30,
  xp: 30,
  objetivos: [
    'Nomear membros da família',
    'Usar my, your, his e her',
    'Apresentar pessoas próximas'
  ],
  conceitos: ['en.familia'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Minha família',
      introduz: ['en.familia'],
      blocos: [
        { tipo: 'texto', texto: 'Para apresentar alguém, você vai usar uma estrutura muito simples: **This is...** (Este é... / Esta é...).' },
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['my family', 'minha família'],
          ['This is...', 'Este é... / Esta é...']
        ] },
        { tipo: 'ingles', frase: 'This is my family.', traducao: 'Esta é a minha família.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-02-p1',
        tipo: 'order-blocks',
        habilidade: 'gramatica',
        dimensao: 'ordenacao',
        enunciado: 'Ordene para dizer: "Esta é a minha família."',
        blocos: ['This', 'is', 'my', 'family.'],
        dicas: ['Comece com This.', 'my family = minha família.'],
        explicacao: 'This is my family. — a frase que abre qualquer apresentação de pessoas.',
        conceitos: ['en.familia']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Pai e mãe',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['mother / mom', 'mãe'],
          ['father / dad', 'pai']
        ] },
        { tipo: 'ingles', frase: 'This is my mother.', traducao: 'Esta é a minha mãe.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-02-p2',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **father**?',
        opcoes: ['Pai', 'Mãe', 'Irmão', 'Filho'],
        correta: 0,
        feedbackErro: {
          1: 'Mãe é **mother**.',
          2: 'Irmão é **brother**.',
          3: 'Filho é **son**.'
        },
        dicas: ['Father aparece em "pai".', 'Dad é a forma informal.'],
        explicacao: 'father = pai; mother = mãe. Mom e dad são as formas carinhosas do dia a dia.',
        conceitos: ['en.familia']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Irmãos',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['sister', 'irmã'],
          ['brother', 'irmão']
        ] },
        { tipo: 'ingles', frase: 'This is my brother.', traducao: 'Este é o meu irmão.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-02-p3',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada pessoa ao significado.',
        pares: [
          ['sister', 'irmã'],
          ['brother', 'irmão'],
          ['mother', 'mãe']
        ],
        dicas: ['Sister e brother são os irmãos.', 'Mother é a figura materna.'],
        explicacao: 'sister = irmã; brother = irmão. Com mother e father, você já apresenta a família básica.',
        conceitos: ['en.familia']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Filhos',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['son / daughter', 'filho / filha'],
          ['I have two brothers.', 'Eu tenho dois irmãos.']
        ] },
        { tipo: 'ingles', frase: 'I have two brothers.', traducao: 'Eu tenho dois irmãos.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-02-p4',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete a frase com o verbo correto.',
        codigo: 'I {{1}} two brothers.',
        lacunas: [['have']],
        dicas: ['"Ter" em inglês, para I, é have.', 'A frase fala de dois irmãos.'],
        explicacao: 'I have two brothers. — have = tenho. Aqui a idade continua usando to be, mas posse usa have.',
        conceitos: ['en.familia']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Dele e dela',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['his / her', 'dele / dela']
        ] },
        { tipo: 'nota', tom: 'info', texto: '`my` = meu/minha · `your` = seu/sua · `his` = dele · `her` = dela. Use `her` para falar de uma mulher e `his` para um homem.' },
        { tipo: 'ingles', frase: 'Her name is Lia.', traducao: 'O nome dela é Lia.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-02-p5',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete com o possessivo correto (his ou her).',
        codigo: 'This is Ana. {{1}} name is Ana.',
        lacunas: [['her']],
        dicas: ['Ana é mulher: use o possessivo dela.', 'O possessivo acompanha quem possui.'],
        explicacao: 'her = dela; his = dele. O possessivo acompanha **quem possui**, não o que é possuído.',
        conceitos: ['en.familia']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Quem é esta pessoa?',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['Who is this?', 'Quem é esta pessoa?'],
          ['She is... / He is...', 'Ela é... / Ele é...']
        ] },
        { tipo: 'ingles', frase: 'Who is this? She is my sister.', traducao: 'Quem é esta pessoa? Ela é a minha irmã.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-02-p6',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'Qual pergunta significa "Quem é esta pessoa?"',
        opcoes: ['Who is this?', 'How old is she?', 'What is your name?', 'This is my family.'],
        correta: 0,
        feedbackErro: {
          1: 'How old is she? pergunta a idade.',
          2: 'What is your name? pergunta o nome.',
          3: 'This is my family. é uma apresentação, não uma pergunta.'
        },
        dicas: ['Who pergunta "quem".', 'This aponta para a pessoa.'],
        explicacao: 'Who is this? = Quem é esta pessoa? Responda com She is... ou He is...',
        conceitos: ['en.familia']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Perguntando a idade',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['How old is she?', 'Quantos anos ela tem?'],
          ['Yes. / No.', 'Sim. / Não.'],
          ['too', 'também']
        ] },
        { tipo: 'ingles', frase: 'How old is she? She is ten years old.', traducao: 'Quantos anos ela tem? Ela tem dez anos.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-02-p7',
        tipo: 'multiple-choice',
        habilidade: 'gramatica',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **How old is she?**',
        opcoes: ['Quantos anos ela tem?', 'Quem é ela?', 'Como ela está?', 'Onde ela está?'],
        correta: 0,
        feedbackErro: {
          1: 'Quem é ela usa who, não how old.',
          2: 'Como ela está usa how is, sem old.',
          3: 'Onde ela está é outra pergunta, com outra palavra.'
        },
        dicas: ['Old aparece em idade.', 'She é ela.'],
        explicacao: 'How old is she? = Quantos anos ela tem? A resposta usa She is ... years old.',
        conceitos: ['en.familia']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-02-a1',
        tipo: 'choose-image',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'Quem é a **mother**? Toque na imagem correta.',
        audio: 'mother',
        opcoes: [
          { emoji: '👩', texto: 'mother' },
          { emoji: '👨', texto: 'father' },
          { emoji: '👧', texto: 'sister' },
          { emoji: '👦', texto: 'brother' }
        ],
        correta: 0,
        dicas: ['Mother é a figura materna.', 'Toque na palavra para confirmar.'],
        explicacao: 'mother = mãe. Comparando: father (pai), sister (irmã), brother (irmão).',
        conceitos: ['en.familia']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-02-a2',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'Ouça e escolha a frase correta.',
        audio: 'This is my brother, Tom.',
        opcoes: [
          'This is my brother, Tom.',
          'This is my sister, Tom.',
          'This is my father, Tom.'
        ],
        correta: 0,
        dicas: ['A palavra dita foi brother.', 'Tom é o nome da pessoa apresentada.'],
        explicacao: 'This is my brother, Tom. = Este é meu irmão, Tom.',
        conceitos: ['en.familia']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-02-a3',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete com o possessivo correto (my, his ou her).',
        codigo: 'This is Ana. {{1}} name is Ana. This is Paulo. {{2}} name is Paulo.',
        lacunas: [['her'], ['his']],
        dicas: ['Ana é mulher: use o possessivo dela.', 'Paulo é homem: use o possessivo dele.'],
        explicacao: 'her = dela; his = dele. O possessivo acompanha **quem possui**, não o que é possuído.',
        conceitos: ['en.familia']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-02-a4',
        tipo: 'dialogue',
        habilidade: 'compreensao',
        dimensao: 'aplicacao',
        enunciado: 'Converse sobre a família.',
        cena: 'Um colega mostra uma foto no celular.',
        interlocutor: 'Sara',
        turnos: [
          { fala: 'Who is this?', opcoes: ['She is my sister, Lia.', 'My name is Lia.', 'Nice to meet you.'], correta: 0 },
          { fala: 'How old is she?', opcoes: ['She is ten years old.', 'Her name is Lia.', "I'm fine, thanks."], correta: 0 },
          { fala: 'Is she your sister?', opcoes: ['Yes, she is. And this is my brother, Tom.', 'No, I have two brothers too.', 'My name is Ana.'], correta: 0 }
        ],
        dicas: ['Who is this? pede uma pessoa.', 'How old is she? pede idade.'],
        explicacao: 'Você praticou perguntas sobre pessoas (Who is this?), idade (How old is she?) e respostas com possessivos.',
        conceitos: ['en.familia'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-02-a5',
        tipo: 'write-code',
        habilidade: 'writing',
        dimensao: 'construcao',
        enunciado: 'Apresente uma pessoa da sua família: use This is my... e o possessivo (Her/His).',
        esqueleto: 'This is my ... . Her/His name is ...',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return t.indexOf('this is my') !== -1 &&
            /(her|his) name('s| is)\s+[a-záéíóúâêôãõç]{2,}/.test(t);
        },
        respostasAceitas: ['This is my [parente]. Her/His name is [nome].'],
        dicas: ['Escolha sister ou brother.', 'Use Her name is para mulher e His name is para homem.'],
        explicacao: 'This is my sister. Her name is Lia. — apresentação completa e natural de uma pessoa.',
        conceitos: ['en.familia']
      }
    }
  ]
});
