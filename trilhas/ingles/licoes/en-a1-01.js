Plataforma.registrarLicao({
  id: 'en-a1-01',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'NÃºmeros, idade e telefone',
  subtitulo: 'English A1 Â· Unidade 2',
  duracaoMin: 30,
  xp: 30,
  objetivos: [
    'Reconhecer nÃºmeros em inglÃªs ao ouvir',
    'Dizer a sua idade com I am ... years old',
    'Entender e falar nÃºmeros de telefone'
  ],
  conceitos: ['en.numeros'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Numbers: de 0 a 100',
      introduz: ['en.numeros'],
      blocos: [
        { tipo: 'vocab', titulo: 'NÃºmeros essenciais', pares: [
          ['one, two, three', '1, 2, 3'],
          ['eleven, twelve, thirteen', '11, 12, 13'],
          ['twenty, thirty, forty', '20, 30, 40'],
          ['one hundred', '100']
        ] },
        { tipo: 'ingles', frase: "I'm twenty-five years old.", traducao: 'Eu tenho vinte e cinco anos.' },
        { tipo: 'texto', texto: 'Em inglÃªs, **idade usa o verbo to be**: `I am 25` ou `I am 25 years old` â€” nunca "I have 25 years", que Ã© o jeito do portuguÃªs.' },
        { tipo: 'ingles', frase: 'My phone number is 555-0134.', traducao: 'Meu telefone Ã© 555-0134.' },
        { tipo: 'nota', tom: 'info', texto: 'Em telefones, o `0` costuma ser lido como "oh" e nÃºmeros repetidos como "double 5".' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-01-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'OuÃ§a e escolha o nÃºmero que vocÃª ouviu.',
        audio: 'I am thirty-seven years old.',
        opcoes: ['37', '73', '27'],
        correta: 0,
        dicas: ['Preste atenÃ§Ã£o na primeira parte do nÃºmero.', 'Thirty vem antes de seven nesta idade.'],
        explicacao: 'thirty-seven = 37. Em inglÃªs, dezena + unidade com hÃ­fen.',
        conceitos: ['en.numeros']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-01-a2',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte o nÃºmero Ã  palavra em inglÃªs.',
        pares: [
          ['15', 'fifteen'],
          ['50', 'fifty'],
          ['12', 'twelve'],
          ['100', 'one hundred']
        ],
        dicas: ['Fifteen termina com -teen (adolescente).', 'Fifty termina com -ty.'],
        explicacao: 'A diferenÃ§a entre -teen (13-19) e -ty (20, 30, 40...) Ã© um dos pontos mais importantes para falar nÃºmeros sem confusÃ£o.',
        conceitos: ['en.numeros']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-01-a3',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'preenchimento',
        enunciado: 'OuÃ§a e escreva o nÃºmero de telefone com apenas os dÃ­gitos.',
        audio: 'My phone number is five five five, oh one three four.',
        modo: 'escrever',
        resposta: '5550134',
        placeholder: 'Apenas nÃºmeros, ex.: 5550134',
        dicas: ['Oh Ã© o zero.', 'NÃ£o use traÃ§os na resposta.'],
        explicacao: 'Escutou 555, oh 1 3 4 â†’ 5550134. Praticar nÃºmeros de telefone treina o ouvido para nÃºmeros rÃ¡pidos.',
        conceitos: ['en.numeros']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-01-a4',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete a frase sobre idade.',
        codigo: "I {{1}} twenty-five years {{2}}.",
        lacunas: [['am'], ['old']],
        dicas: ['Idade em inglÃªs usa o verbo to be.', 'A expressÃ£o completa Ã© years ___.'],
        explicacao: 'I am 25 years old. Use `am/is/are` + idade, e nÃ£o "have".',
        conceitos: ['en.numeros']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-01-a5',
        tipo: 'write-code',
        habilidade: 'writing',
        dimensao: 'construcao',
        enunciado: 'Escreva a sua idade em uma frase completa.',
        esqueleto: 'I am ... years old.',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return /\bi am\b/.test(t) && /\byears old\b/.test(t) && /\d/.test(t);
        },
        respostasAceitas: ['I am 30 years old.'],
        dicas: ['Use I am + nÃºmero + years old.', 'NÃ£o use "have".'],
        explicacao: 'I am 30 years old. Agora vocÃª consegue falar de idade como um nativo.',
        conceitos: ['en.numeros']
      }
    }
  ]
});
