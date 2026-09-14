Plataforma.registrarLicao({
  id: 'en-a2-02',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Viagem: aeroporto e hotel',
  subtitulo: 'English A2 · Unidade 3',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Usar o vocabulário de aeroporto e hotel',
    'Fazer check-in e pedir informações',
    'Entender avisos simples de viagem'
  ],
  conceitos: ['en.viagem'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Documentos de viagem',
      introduz: ['en.viagem'],
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['passport', 'passaporte'],
          ['boarding pass', 'cartão de embarque']
        ] },
        { tipo: 'ingles', frase: 'This is my passport.', traducao: 'Este é o meu passaporte.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-02-p1',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que é **passport**?',
        opcoes: ['Passaporte', 'Cartão de embarque', 'Bagagem', 'Assento'],
        correta: 0,
        feedbackErro: {
          1: 'Cartão de embarque é **boarding pass**.',
          2: 'Bagagem é **luggage**.',
          3: 'Assento é **seat**.'
        },
        dicas: ['É o documento que você mostra na imigração.', 'Você já viu essa palavra em viagens.'],
        explicacao: 'passport = passaporte; boarding pass = cartão de embarque. Os dois documentos básicos.',
        conceitos: ['en.viagem']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Voo e bagagem',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['luggage / bags', 'bagagem'],
          ['flight', 'voo'],
          ['check-in', 'check-in / despachar']
        ] },
        { tipo: 'ingles', frase: 'The flight is at nine.', traducao: 'O voo é às nove.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-02-p2',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte cada palavra ao significado.',
        pares: [
          ['luggage', 'bagagem'],
          ['flight', 'voo'],
          ['check-in', 'check-in']
        ],
        dicas: ['Luggage são as malas.', 'Flight vem de voar.'],
        explicacao: 'luggage, flight e check-in: o começo de qualquer viagem de avião.',
        conceitos: ['en.viagem']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Embarque',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['gate', 'portão de embarque'],
          ['seat', 'assento'],
          ['boarding / to board', 'embarque / embarcar']
        ] },
        { tipo: 'ingles', frase: 'Now boarding at gate 12.', traducao: 'Embarque agora no portão 12.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-02-p3',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que é **gate** no aeroporto?',
        opcoes: ['Portão de embarque', 'Assento', 'Bagagem', 'Passaporte'],
        correta: 0,
        feedbackErro: {
          1: 'Assento é **seat**.',
          2: 'Bagagem é **luggage**.',
          3: 'Passaporte é **passport**.'
        },
        dicas: ['Gate é o portão por onde você embarca.', 'O número aparece nos avisos e no cartão de embarque.'],
        explicacao: 'gate = portão de embarque; seat = assento. Palavras que aparecem no seu boarding pass.',
        conceitos: ['en.viagem']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Avisos do aeroporto',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['Now boarding / Final call', 'embarque agora / última chamada'],
          ['Perfect.', 'Perfeito.']
        ] },
        { tipo: 'ingles', frase: 'Final call for flight 302!', traducao: 'Última chamada para o voo 302!' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-02-p4',
        tipo: 'multiple-choice',
        habilidade: 'compreensao',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **Final call**?',
        opcoes: ['Última chamada', 'Primeira chamada', 'Voo cancelado', 'Portão fechado'],
        correta: 0,
        feedbackErro: {
          1: 'Primeira chamada não existe neste aviso.',
          2: 'Cancelado seria outra palavra.',
          3: 'Portão fechado não é o que a frase diz.'
        },
        dicas: ['Final é a última.', 'É o aviso que você não pode perder no aeroporto.'],
        explicacao: 'Final call = última chamada. É o aviso antes de o portão fechar.',
        conceitos: ['en.viagem']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Check-in no hotel',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (4)', pares: [
          ['I have a reservation.', 'Tenho uma reserva.'],
          ['a single / double room', 'quarto de solteiro / casal'],
          ['the room key', 'a chave do quarto']
        ] },
        { tipo: 'ingles', frase: 'I have a reservation.', traducao: 'Tenho uma reserva.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-02-p5',
        tipo: 'fill-code',
        habilidade: 'gramatica',
        dimensao: 'preenchimento',
        enunciado: 'Complete a frase do check-in.',
        codigo: 'I have a {{1}}.',
        lacunas: [['reservation']],
        dicas: ['É o que garante o seu quarto.', 'A palavra é parecida com o português.'],
        explicacao: 'I have a reservation. — a primeira frase do check-in em qualquer hotel.',
        conceitos: ['en.viagem']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Bem-vindo ao hotel',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['breakfast is included', 'o café da manhã está incluso'],
          ['Welcome.', 'Bem-vindo(a).'],
          ['under the name', 'no nome de']
        ] },
        { tipo: 'ingles', frase: 'Welcome! Breakfast is included.', traducao: 'Bem-vindo! O café da manhã está incluso.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-02-p6',
        tipo: 'multiple-choice',
        habilidade: 'vocabulario',
        dimensao: 'reconhecimento',
        enunciado: 'O que significa **included**?',
        opcoes: ['Incluso', 'Separado', 'Cancelado', 'Atrasado'],
        correta: 0,
        feedbackErro: {
          1: 'Separado seria o contrário.',
          2: 'Cancelado é outra palavra.',
          3: 'Atrasado é outra palavra.'
        },
        dicas: ['Breakfast is included = o café da manhã está incluído.', 'É uma informação importante no hotel.'],
        explicacao: 'included = incluso. Breakfast is included significa que o café da manhã não é cobrado à parte.',
        conceitos: ['en.viagem']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Pedidos educados no hotel',
      blocos: [
        { tipo: 'vocab', titulo: 'Palavras novas (1)', pares: [
          ['Could I...?', 'Eu poderia...? (pedido educado)'],
          ['What time is breakfast?', 'A que horas é o café da manhã?']
        ] },
        { tipo: 'ingles', frase: 'Could I have the room key, please?', traducao: 'Eu poderia pegar a chave do quarto, por favor?' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-02-p7',
        tipo: 'order-blocks',
        habilidade: 'gramatica',
        dimensao: 'ordenacao',
        enunciado: 'Ordene o pedido educado da chave.',
        blocos: ['Could', 'I', 'have', 'the room key?'],
        dicas: ['Comece com Could.', 'É um pedido educado, não uma ordem.'],
        explicacao: 'Could I have the room key? — o pedido educado que funciona em qualquer hotel.',
        conceitos: ['en.viagem']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-02-l1',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        enunciado: 'Ouça o aviso do aeroporto e escolha a informação correta.',
        audio: 'Flight 302 to London is now boarding at gate 12.',
        opcoes: [
          'O voo 302 para Londres está embarcando no portão 12.',
          'O voo 302 para Lisboa está atrasado no portão 20.',
          'O voo 320 para Londres está cancelado.'
        ],
        correta: 0,
        dicas: ['Board significa embarcar.', 'Gate é o portão.'],
        explicacao: 'boarding at gate 12. Reconhecer voo, destino e portão é o essencial em um aeroporto.',
        conceitos: ['en.viagem']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-02-a2',
        tipo: 'match-pairs',
        habilidade: 'vocabulario',
        dimensao: 'associacao',
        enunciado: 'Conecte o item de viagem ao significado.',
        pares: [
          ['passport', 'passaporte'],
          ['boarding pass', 'cartão de embarque'],
          ['luggage', 'bagagem'],
          ['room key', 'chave do quarto']
        ],
        dicas: ['Passport você mostra na imigração.', 'Boarding pass você mostra no embarque.'],
        explicacao: 'Esse vocabulário resolve aeroporto, hotel e qualquer atendimento de viagem.',
        conceitos: ['en.viagem']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-02-a3',
        tipo: 'dialogue',
        habilidade: 'compreensao',
        dimensao: 'aplicacao',
        enunciado: 'Faça o check-in no hotel.',
        cena: 'Você chegou ao hotel depois de um voo longo.',
        interlocutor: 'Receptionist',
        turnos: [
          { fala: 'Good evening! Welcome. Do you have a reservation?', opcoes: ['Yes, I have a reservation under Silva.', 'I am going to bed.', 'It costs twenty dollars.'], correta: 0 },
          { fala: 'Perfect. Could I see your passport, please?', opcoes: ['Sure, here it is.', 'No, I am twenty years old.', 'On Monday at nine.'], correta: 0 },
          { fala: 'Thank you. Your room is 204. Breakfast is included.', opcoes: ['Great! What time is breakfast?', 'I usually wake up at seven.', 'She is my sister.'], correta: 0 }
        ],
        dicas: ['"Do you have a reservation?" pergunta se há reserva.', '"Could I see...?" é um pedido educado.'],
        explicacao: 'Reserva, passaporte e informações do quarto: o check-in completo em inglês.',
        conceitos: ['en.viagem'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-02-a4',
        tipo: 'reading',
        habilidade: 'reading',
        dimensao: 'reconhecimento',
        titulo: 'Boarding pass',
        enunciado: 'Leia o cartão de embarque e responda.',
        texto: 'BOARDING PASS\nName: A. SILVA\nFlight: 302  London (LHR)\nGate: 12   Seat: 24A\nBoarding: 18:30',
        pergunta: 'Qual é o portão de embarque?',
        opcoes: ['12', '302', '24A', '18:30'],
        correta: 0,
        dicas: ['Procure a palavra Gate.', 'O número ao lado é o portão.'],
        explicacao: 'Gate: 12. Ler um cartão de embarque é uma das leituras mais úteis em viagem.',
        conceitos: ['en.viagem']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en-a2-02-a5',
        tipo: 'write-code',
        habilidade: 'writing',
        dimensao: 'construcao',
        enunciado: 'Escreva duas frases: faça o check-in no hotel (reserva + pedido da chave).',
        esqueleto: 'I have a reservation. Could I have the room key, please?',
        validar: function (valor) {
          const t = String(valor || '').toLowerCase();
          return t.indexOf('reservation') !== -1 && /\bkey\b/.test(t) && t.indexOf('please') !== -1;
        },
        respostasAceitas: ['I have a reservation. Could I have the room key, please?'],
        dicas: ['Use "I have a reservation."', 'Peça com "Could I have... please?"'],
        explicacao: 'I have a reservation. Could I have the room key, please? — check-in educado e direto.',
        conceitos: ['en.viagem']
      }
    }
  ]
});
