Plataforma.registrarLicao({
  id: 'en-a1-01',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Números, idade e telefone',
  subtitulo: 'English A1 · Unidade 2',
  duracaoMin: 30,
  xp: 30,
  objetivos: [
    'Reconhecer números em inglês ao ouvir',
    'Dizer a sua idade com I am ... years old',
    'Entender e falar números de telefone'
  ],
  conceitos: ['en.numeros'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Numbers: de 0 a 100',
      introduz: ['en.numeros'],
      blocos: [
        { tipo: 'vocab', titulo: 'Números essenciais', pares: [
          ['one, two, three', '1, 2, 3'],
          ['eleven, twelve, thirteen', '11, 12, 13'],
          ['twenty, thirty, forty', '20, 30, 40'],
          ['one hundred', '100']
        ] },
        { tipo: 'ingles', frase: "I'm twenty-five years old.", traducao: 'Eu tenho vinte e cinco anos.' },
        { tipo: 'texto', texto: 'Em inglês, **idade usa o verbo to be**: `I am 25` ou `I am 25 years old` — nunca "I have 25 years", que é o jeito do português.' },
        { tipo: 'ingles', frase: 'My phone number is 555-0134.', traducao: 'Meu telefone é 555-0134.' },
        { tipo: 'nota', tom: 'info', texto: 'Em telefones, o `0` costuma ser lido como "oh" e números repetidos como "double 5".' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-01-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'Ouça e escolha o número que você ouviu.',
        audio: 'I am thirty-seven years old.',
        opcoes: ['37', '73', '27'],
        correta: 0,
        dicas: ['Preste atenção na primeira parte do número.', 'Thirty vem antes de seven nesta idade.'],
        explicacao: 'thirty-seven = 37. Em inglês, dezena + unidade com hífen.',
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
        enunciado: 'Conecte o número à palavra em inglês.',
        pares: [
          ['15', 'fifteen'],
          ['50', 'fifty'],
          ['12', 'twelve'],
          ['100', 'one hundred']
        ],
        dicas: ['Fifteen termina com -teen (adolescente).', 'Fifty termina com -ty.'],
        explicacao: 'A diferença entre -teen (13-19) e -ty (20, 30, 40...) é um dos pontos mais importantes para falar números sem confusão.',
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
        enunciado: 'Ouça e escreva o número de telefone com apenas os dígitos.',
        audio: 'My phone number is five five five, oh one three four.',
        modo: 'escrever',
        resposta: '5550134',
        placeholder: 'Apenas números, ex.: 5550134',
        dicas: ['Oh é o zero.', 'Não use traços na resposta.'],
        explicacao: 'Escutou 555, oh 1 3 4 → 5550134. Praticar números de telefone treina o ouvido para números rápidos.',
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
        dicas: ['Idade em inglês usa o verbo to be.', 'A expressão completa é years ___.'],
        explicacao: 'I am 25 years old. Use `am/is/are` + idade, e não "have".',
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
        dicas: ['Use I am + número + years old.', 'Não use "have".'],
        explicacao: 'I am 30 years old. Agora você consegue falar de idade como um nativo.',
        conceitos: ['en.numeros']
      }
    }
  ]
});
