Plataforma.registrarLicao({
  id: 'en-a1-03',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Minha rotina: falando do dia a dia',
  subtitulo: 'English A1 Â· Unidade 4',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Descrever a rotina com o present simple',
    'Usar verbos de aÃ§Ãµes do dia a dia',
    'Perceber o -s da terceira pessoa'
  ],
  conceitos: ['en.rotina'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'My daily routine',
      introduz: ['en.rotina'],
      blocos: [
        { tipo: 'texto', texto: 'Para falar do que vocÃª faz todos os dias, o inglÃªs usa o **present simple**: uma forma simples do verbo, sem conjugaÃ§Ã£o complicada.' },
        { tipo: 'vocab', titulo: 'AÃ§Ãµes da rotina', pares: [
          ['wake up / get up', 'acordar / levantar'],
          ['have breakfast', 'tomar cafÃ© da manhÃ£'],
          ['go to work / study', 'ir ao trabalho / estudar'],
          ['come home', 'voltar para casa'],
          ['go to bed / sleep', 'ir para a cama / dormir']
        ] },
        { tipo: 'ingles', frase: 'I usually wake up at seven and have breakfast.', traducao: 'Eu geralmente acordo Ã s sete e tomo cafÃ© da manhÃ£.' },
        { tipo: 'lista', itens: [
          '`I work` / `I study` â€” sem mudanÃ§a no verbo.',
          '`You work` / `We work` / `They work` â€” tambÃ©m sem mudanÃ§a.',
          '`He works` / `She works` â€” atenÃ§Ã£o: ganha **-s** no final.'
        ] },
        { tipo: 'nota', tom: 'atencao', texto: '`usually` (geralmente) vem antes do verbo: I **usually** work. Ã‰ uma palavra de frequÃªncia muito usada.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a1-03-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'OuÃ§a a rotina e escolha a alternativa correta.',
        audio: 'I usually wake up at seven and have breakfast with my family.',
        opcoes: [
          'Acordo Ã s sete e tomo cafÃ© com a famÃ­lia.',
          'Acordo Ã s onze e vou dormir.',
          'Trabalho Ã s sete e estudo Ã  noite.'
        ],
        correta: 0,
        dicas: ['Seven Ã© a hora dita.', 'Breakfast Ã© a refeiÃ§Ã£o da manhÃ£.'],
        explicacao: 'wake up at seven + have breakfast with my family. VocÃª entendeu uma rotina completa.',
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
        enunciado: 'Conecte cada aÃ§Ã£o da rotina Ã  traduÃ§Ã£o.',
        pares: [
          ['wake up', 'acordar'],
          ['have lunch', 'almoÃ§ar'],
          ['go to work', 'ir ao trabalho'],
          ['go to bed', 'ir dormir']
        ],
        dicas: ['Lunch Ã© o almoÃ§o.', 'Bed Ã© a cama.'],
        explicacao: 'Com esses verbos + horas vocÃª jÃ¡ monta uma rotina inteira.',
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
        enunciado: 'Ordene as palavras para formar a frase: "Eu geralmente trabalho de manhÃ£."',
        blocos: ['I', 'usually', 'work', 'in the morning.'],
        dicas: ['O sujeito vem primeiro.', '"Usually" fica entre o sujeito e o verbo.'],
        explicacao: 'I usually work in the morning. Estrutura: sujeito + frequÃªncia + verbo + complemento.',
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
        dicas: ['She Ã© terceira pessoa: o verbo muda.', 'They nÃ£o leva -s.'],
        explicacao: 'She works / They study. A Ãºnica mudanÃ§a do present simple Ã© o -s (ou -es) em he/she/it.',
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
        explicacao: 'Escrever a prÃ³pria rotina fixa o present simple e o vocabulÃ¡rio de aÃ§Ãµes, que voltam em toda conversa do dia a dia.',
        conceitos: ['en.rotina'],
        desafio: true
      }
    }
  ]
});
