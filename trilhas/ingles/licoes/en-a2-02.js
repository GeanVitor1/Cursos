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
      titulo: 'At the airport and hotel',
      introduz: ['en.viagem'],
      blocos: [
        { tipo: 'vocab', titulo: 'Aeroporto', pares: [
          ['passport', 'passaporte'],
          ['boarding pass', 'cartão de embarque'],
          ['luggage / bags', 'bagagem'],
          ['flight', 'voo'],
          ['check-in', 'check-in / despachar']
        ] },
        { tipo: 'vocab', titulo: 'Hotel', pares: [
          ['I have a reservation.', 'Tenho uma reserva.'],
          ['a single / double room', 'quarto de solteiro / casal'],
          ['the room key', 'a chave do quarto'],
          ['breakfast is included', 'o café da manhã está incluso']
        ] },
        { tipo: 'ingles', frase: 'I have a reservation. Here is my passport.', traducao: 'Tenho uma reserva. Aqui está meu passaporte.' },
        { tipo: 'nota', tom: 'info', texto: 'Em aeroportos, avisos usam frases curtas: `Now boarding`, `Final call`, `Gate 12`. Reconhecer as palavras-chave evita perder o voo.' }
      ]
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
          return t.indexOf('reservation') !== -1 && (t.indexOf('room key') !== -1 || t.indexOf('room') !== -1) && t.indexOf('please') !== -1;
        },
        respostasAceitas: ['I have a reservation. Could I have the room key, please?'],
        dicas: ['Use "I have a reservation."', 'Peça com "Could I have... please?"'],
        explicacao: 'I have a reservation. Could I have the room key, please? — check-in educado e direto.',
        conceitos: ['en.viagem']
      }
    }
  ]
});
