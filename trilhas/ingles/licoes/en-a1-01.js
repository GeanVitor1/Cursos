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
      titulo: 'Números de 1 a 6',
      introduz: ['en.numeros'],
      blocos: [
        { tipo: 'texto', texto: 'Vamos aprender os números **aos poucos**: primeiro de 1 a 6, com prática antes de continuar.' },
        { tipo: 'vocab', titulo: 'Palavras novas (6)', pares: [
          ['one, two, three', '1, 2, 3'],
          ['four, five, six', '4, 5, 6']
        ] },
        { tipo: 'ingles', frase: 'One, two, three!', traducao: 'Um, dois, três!' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-01-p1',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte a palavra ao número.',
        pares: [
          ['three', '3'],
          ['five', '5'],
          ['six', '6']
        ],
        dicas: ['Conte nos dedos se precisar.', 'Five é o número da mão completa.'],
        explicacao: 'one, two, three, four, five, six — os números que você mais vai usar no dia a dia.',
        conceitos: ['en.numeros']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Números de 7 a 10',
      blocos: [
        { tipo: 'vocab', titulo: 'Mais quatro números (6)', pares: [
          ['seven, eight, nine, ten', '7, 8, 9, 10'],
          ['zero / oh', '0 (oh é usado em telefones)']
        ] },
        { tipo: 'ingles', frase: 'Seven, eight, nine, ten!', traducao: 'Sete, oito, nove, dez!' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-01-p2',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'Qual número é **seven**?',
        opcoes: ['7', '8', '9', '10'],
        correta: 0,
        feedbackErro: {
          1: 'Oito é **eight**.',
          2: 'Nove é **nine**.',
          3: 'Dez é **ten**.'
        },
        dicas: ['Seven lembra o número 7 em português.', 'É o número que vem antes de eight.'],
        explicacao: 'seven = 7. Repare que eight (8), nine (9) e ten (10) completam a dezena.',
        conceitos: ['en.numeros']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Números de 11 a 16',
      blocos: [
        { tipo: 'texto', texto: 'Agora a faixa de 11 a 16. Repare que todos terminam com o mesmo som.' },
        { tipo: 'vocab', titulo: 'Palavras novas (6)', pares: [
          ['eleven, twelve, thirteen', '11, 12, 13'],
          ['fourteen, fifteen, sixteen', '14, 15, 16']
        ] },
        { tipo: 'ingles', frase: 'Eleven, twelve, thirteen!', traducao: 'Onze, doze, treze!' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-01-p3',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte a palavra ao número.',
        pares: [
          ['twelve', '12'],
          ['fourteen', '14'],
          ['fifteen', '15']
        ],
        dicas: ['Twelve é o único que não segue o padrão da faixa.', 'Fifteen é o 15.'],
        explicacao: 'Eleven, twelve, thirteen, fourteen, fifteen e sixteen: a primeira faixa dos números maiores.',
        conceitos: ['en.numeros']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Números de 17 a 20',
      blocos: [
        { tipo: 'vocab', titulo: 'Fechando a faixa (1)', pares: [
          ['seventeen, eighteen, nineteen, twenty', '17, 18, 19, 20']
        ] },
        { tipo: 'ingles', frase: 'Seventeen, eighteen, nineteen, twenty!', traducao: 'Dezessete, dezoito, dezenove, vinte!' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-01-p4',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'preenchimento',
        enunciado: 'Ouça e escreva o número com apenas os dígitos.',
        audio: 'Seventeen.',
        modo: 'escrever',
        resposta: '17',
        placeholder: 'ex.: 12',
        dicas: ['Seventeen é 17.', 'Preste atenção na terminação -teen.'],
        explicacao: 'Você ouviu seventeen = 17. A partir de twenty, os números passam a usar outra terminação.',
        conceitos: ['en.numeros']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Dezenas: 30 a 60',
      blocos: [
        { tipo: 'texto', texto: 'As dezenas fechadas têm terminação **-ty**. Vamos em blocos: primeiro 30, 40, 50 e 60.' },
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['thirty, forty, fifty', '30, 40, 50'],
          ['sixty', '60']
        ] },
        { tipo: 'ingles', frase: 'Thirty, forty, fifty, sixty!', traducao: 'Trinta, quarenta, cinquenta, sessenta!' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-01-p5',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **forty**?',
        opcoes: ['40', '14', '4', '50'],
        correta: 0,
        feedbackErro: {
          1: 'Quatorze é **fourteen**.',
          2: 'Quatro é **four**.',
          3: 'Cinquenta é **fifty**.'
        },
        dicas: ['Forty é a dezena do quatro.', 'Cuidado: forty não tem a letra u.'],
        explicacao: 'forty = 40. Compare: four (4) e fourteen (14). A dezena terminada em -ty é diferente do -teen.',
        conceitos: ['en.numeros']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Dezenas: 70 a 100',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['seventy, eighty, ninety', '70, 80, 90'],
          ['one hundred', '100']
        ] },
        { tipo: 'ingles', frase: 'Seventy, eighty, ninety, one hundred!', traducao: 'Setenta, oitenta, noventa, cem!' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-01-p6',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'preenchimento',
        enunciado: 'Ouça e escreva o número com apenas os dígitos.',
        audio: 'Eighty.',
        modo: 'escrever',
        resposta: '80',
        placeholder: 'ex.: 40',
        dicas: ['Eighty é 80.', 'É a dezena do eight (8).'],
        explicacao: 'eighty = 80. Agora você já cobre os números de 1 a 100.',
        conceitos: ['en.numeros']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Falando de idade',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['years old', 'anos de idade'],
          ['to be (am / is / are)', 'ser / estar (eu sou, ele é, eles são)']
        ] },
        { tipo: 'ingles', frase: "I'm twenty-five years old.", traducao: 'Eu tenho vinte e cinco anos.' },
        { tipo: 'texto', texto: 'Em inglês, **idade usa o verbo to be**: `I am 25` ou `I am 25 years old` — diferente do português, que usaria o verbo "ter".' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Número de telefone',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['my phone number', 'meu número de telefone'],
          ['double five', 'cinco repetido (55)']
        ] },
        { tipo: 'ingles', frase: 'My phone number is 555-0134.', traducao: 'Meu telefone é 555-0134.' },
        { tipo: 'nota', tom: 'info', texto: 'Em telefones, o `0` costuma ser lido como "oh" e números repetidos como "double 5" (em vez de "five five").' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-01-p8',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **phone number**?',
        opcoes: ['Número de telefone', 'Idade', 'Nome', 'Número da casa'],
        correta: 0,
        feedbackErro: {
          1: 'Idade se diz com years old.',
          2: 'Nome é name.',
          3: 'Não existe "número da casa" nesta lição.'
        },
        dicas: ['Phone é telefone.', 'É o que você pede para ligar para alguém.'],
        explicacao: 'phone number = número de telefone. Para perguntar, use What is your phone number?',
        conceitos: ['en.numeros']
      }
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
        dicas: ['Idade em inglês usa o verbo to be (am / is / are).', 'A expressão completa é years ___.'],
        explicacao: 'I am 25 years old. Use `am/is/are` + idade, e não o verbo "ter".',
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
        enunciado: 'Escreva a sua idade em uma frase completa (use a sua idade, qualquer uma).',
        esqueleto: 'I am ... years old.',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          const temVerbo = /\bi am\b/.test(t) || /\bi'm\b/.test(t);
          const temIdade = /\d/.test(t) ||
            /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred)\b/.test(t);
          return temVerbo && /\byears? old\b/.test(t) && temIdade;
        },
        respostasAceitas: ['I am [sua idade] years old.'],
        dicas: ['Use I am + número + years old.', 'Nada do verbo "ter" nesta frase.', 'Escreva a sua idade — qualquer valor é aceito.'],
        explicacao: 'I am [sua idade] years old. Agora você consegue falar de idade como um nativo.',
        conceitos: ['en.numeros']
      }
    }
  ]
});
