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
      titulo: 'My daily routine',
      introduz: ['en.rotina'],
      blocos: [
        { tipo: 'texto', texto: 'Para falar do que você faz todos os dias, o inglês usa o **present simple**: uma forma simples do verbo, sem conjugação complicada.' },
        { tipo: 'vocab', titulo: 'Ações da rotina', pares: [
          ['wake up / get up', 'acordar / levantar'],
          ['have breakfast', 'tomar café da manhã'],
          ['go to work / study', 'ir ao trabalho / estudar'],
          ['come home', 'voltar para casa'],
          ['go to bed / sleep', 'ir para a cama / dormir']
        ] },
        { tipo: 'ingles', frase: 'I usually wake up at seven and have breakfast.', traducao: 'Eu geralmente acordo às sete e tomo café da manhã.' },
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
        codigo: 'She {{1}} at a bank. (work)\nThey {{2}} English every day. (study)',
        lacunas: [['works'], ['study']],
        dicas: ['She é terceira pessoa: o verbo muda.', 'They não leva -s.'],
        explicacao: 'She works / They study. A única mudança do present simple é o -s (ou -es) em he/she/it.',
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
