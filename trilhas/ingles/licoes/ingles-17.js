Plataforma.registrarLicao({
  id: 'ingles-17',
  trilha: 'ingles',
  tipo: 'licao',
  titulo: 'Frases de reunião diária',
  subtitulo: 'English for Developers · Etapa 35',
  duracaoMin: 35,
  xp: 35,
  objetivos: [
    'Relatar o trabalho do dia anterior com Yesterday I worked on...',
    'Apresentar o plano do dia com Today I will...',
    'Avisar sobre impedimentos usando blocker'
  ],
  conceitos: ['ingles.reuniao'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'A estrutura de uma Daily (Standup)',
      introduz: ['ingles.reuniao'],
      blocos: [
        { tipo: 'texto', texto: 'A reunião diária de alinhamento com a equipe segue sempre três perguntas: **o que você fez ontem**, **o que vai fazer hoje** e **se há algum impedimento**.' },
        { tipo: 'vocab', titulo: 'Palavras novas (3)', pares: [
          ['standup', 'reunião diária / daily'],
          ['blocker', 'impedimento / trava'],
          ['task', 'tarefa']
        ] },
        { tipo: 'ingles', frase: 'I have a blocker on this task.', traducao: 'Eu tenho um impedimento nesta tarefa.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en17-p1',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada termo ao significado na rotina de desenvolvimento.',
        pares: [
          ['standup', 'reunião diária'],
          ['blocker', 'impedimento'],
          ['task', 'tarefa']
        ],
        dicas: ['Blocker bloqueia seu progresso.', 'Task é cada item do quadro.'],
        explicacao: 'standup = reunião diária; blocker = impedimento; task = tarefa.',
        conceitos: ['ingles.reuniao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Relatando o que foi feito ontem',
      blocos: [
        { tipo: 'texto', texto: 'Para relatar o dia anterior, usamos o passado simples com **Yesterday I worked on...** (Ontem eu trabalhei em...).' },
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['worked on', 'trabalhou em'],
          ['service', 'serviço']
        ] },
        { tipo: 'ingles', frase: 'Yesterday I worked on the service.', traducao: 'Ontem eu trabalhei no serviço.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en17-p2',
        tipo: 'order-blocks',
        dimensao: 'ordenacao',
        enunciado: 'Ordene a frase de status de ontem.',
        blocos: ['Yesterday', 'I worked on', 'the service.'],
        dicas: ['Comece com o marcador Yesterday.', 'Worked on indica a tarefa em que atuou.'],
        explicacao: 'Yesterday I worked on the service. — frase padrão para abrir o status da daily.',
        conceitos: ['ingles.reuniao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Apresentando o plano de hoje',
      blocos: [
        { tipo: 'texto', texto: 'Para o dia de hoje, usamos o futuro com will ou going to: **Today I will...** (Hoje eu vou...).' },
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['bug', 'defeito / bug'],
          ['tests', 'testes']
        ] },
        { tipo: 'ingles', frase: 'Today I will fix this bug and write tests.', traducao: 'Hoje eu vou corrigir esse bug e escrever testes.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en17-p3',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete o plano de hoje com o verbo que significa corrigir.',
        codigo: 'Today I will {{1}} the bug.',
        lacunas: [['fix']],
        dicas: ['Verbo de 3 letras que você já aprendeu para correção.', 'Começa com f.'],
        explicacao: 'fix the bug = corrigir o defeito.',
        conceitos: ['ingles.reuniao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Sinalizando que não há impedimentos',
      blocos: [
        { tipo: 'texto', texto: 'Se o seu trabalho está fluindo sem travamento, você diz claramente que não tem impedimentos.' },
        { tipo: 'vocab', titulo: 'Palavras novas (2)', pares: [
          ['no blockers', 'sem impedimentos'],
          ['all good', 'tudo certo']
        ] },
        { tipo: 'ingles', frase: 'No blockers, all good.', traducao: 'Sem impedimentos, tudo certo.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en17-p4',
        tipo: 'listening',
        habilidade: 'listening',
        dimensao: 'reconhecimento',
        audio: 'Yesterday I worked on the service. Today I will fix the bug. No blockers.',
        enunciado: 'Ouça o status completo e selecione o resumo correto.',
        opcoes: [
          'Ontem trabalhou no serviço, hoje vai corrigir o bug e não tem impedimentos.',
          'Ontem o servidor caiu e hoje ninguém vai trabalhar.',
          'O banco de dados falhou e há um erro crítico.'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O status indica progresso normal sem impedimentos.',
          2: 'A frase não trata de falha no banco.'
        },
        dicas: ['Worked on the service.', 'Fix the bug.', 'No blockers.'],
        explicacao: 'Yesterday... Today... No blockers: a fórmula perfeita de uma daily internacional.',
        conceitos: ['ingles.reuniao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'en17-p5',
        tipo: 'dialogue',
        habilidade: 'compreensao',
        dimensao: 'aplicacao',
        enunciado: 'Dê o seu status na Daily Meeting com o time.',
        cena: 'Alex, o líder técnico da equipe, abre a reunião e pede seu status.',
        interlocutor: 'Alex',
        turnos: [
          {
            fala: 'Good morning! Who wants to begin the standup?',
            opcoes: [
              'I can! Yesterday I worked on the new task.',
              'I have a reservation at the hotel.',
              'The flight is at nine.'
            ],
            correta: 0
          },
          {
            fala: 'Great! What are you going to do today?',
            opcoes: [
              'Today I will fix the bug and write tests.',
              'Yesterday I bought some fruit.',
              'My room has two beds.'
            ],
            correta: 0
          },
          {
            fala: 'Very good. Do you have any blockers?',
            opcoes: [
              'No blockers for me today. All good!',
              'Yes, my name is Ana.',
              'It costs twenty dollars.'
            ],
            correta: 0
          }
        ],
        dicas: ['Abra o status falando de ontem com worked on.', 'Diga o que fará hoje com Today I will.', 'Confirme que não há impedimentos com No blockers.'],
        explicacao: 'Participação real e segura em uma reunião diária internacional de desenvolvimento.',
        conceitos: ['ingles.reuniao'],
        desafio: true
      }
    }
  ]
});
