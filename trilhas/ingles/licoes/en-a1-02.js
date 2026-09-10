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
      titulo: 'My family',
      introduz: ['en.familia'],
      blocos: [
        { tipo: 'vocab', titulo: 'Família', pares: [
          ['mother / mom', 'mãe'],
          ['father / dad', 'pai'],
          ['sister', 'irmã'],
          ['brother', 'irmão'],
          ['son / daughter', 'filho / filha']
        ] },
        { tipo: 'ingles', frase: 'This is my sister. Her name is Lia.', traducao: 'Esta é a minha irmã. O nome dela é Lia.' },
        { tipo: 'nota', tom: 'info', texto: '`my` = meu/minha · `your` = seu/sua · `his` = dele · `her` = dela. Use `her` para falar de uma mulher e `his` para um homem.' }
      ]
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
          { fala: 'Who is this in the photo?', opcoes: ['She is my sister, Lia.', 'It is on Monday.', 'I am twenty years old.'], correta: 0 },
          { fala: 'How old is she?', opcoes: ['She is ten years old.', 'Her name is Lia.', 'Nice to meet you.'], correta: 0 },
          { fala: 'She is cute! Is she your only sister?', opcoes: ['No, I have two brothers too.', 'Yes, she is my mother.', 'It costs ten dollars.'], correta: 0 }
        ],
        dicas: ['Who is this? pede uma pessoa.', 'How old is she? pede idade.'],
        explicacao: 'Você praticou perguntas sobre pessoas (Who is this?), idade (How old) e respostas com possessivos.',
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
        enunciado: 'Apresente uma pessoa da sua família: use This is my... e the name.',
        esqueleto: 'This is my ... . Her/His name is ...',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return t.indexOf('this is my') !== -1 && (t.indexOf('her name is') !== -1 || t.indexOf('his name is') !== -1);
        },
        respostasAceitas: ['This is my sister. Her name is Lia.'],
        dicas: ['Escolha sister ou brother.', 'Use Her name is para mulher e His name is para homem.'],
        explicacao: 'This is my sister. Her name is Lia. — apresentação completa e natural de uma pessoa.',
        conceitos: ['en.familia']
      }
    }
  ]
});
