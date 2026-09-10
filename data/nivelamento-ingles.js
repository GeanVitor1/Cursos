Plataforma.registrarNivelamento({
  titulo: 'Teste de nivelamento de inglês',
  descricao: '10 questões curtas e progressivas para estimar seu nível entre A1 e C1. Não vale XP e você pode refazer quando quiser.',
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Como funciona',
      blocos: [
        { tipo: 'texto', texto: 'São **10 questões** que ficam mais difíceis aos poucos. Não se preocupe em errar: o objetivo é descobrir o seu ponto de partida, não dar nota.' },
        { tipo: 'nota', tom: 'info', texto: 'Ao final, a plataforma recomenda um nível. Você pode começar por ele ou mesmo assim escolher começar do A1.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'niv-a1-1',
        tipo: 'multiple-choice',
        nivel: 'A1',
        enunciado: 'Complete: "Hello! ___ name is Ana."',
        opcoes: ['My', 'Your', 'His', 'Their'],
        correta: 0,
        dicas: ['Quem fala usa o possessivo da primeira pessoa.', 'My = meu/minha.'],
        explicacao: 'My name is Ana. (A1) Possessivo básico de apresentação.'
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'niv-a1-2',
        tipo: 'listening',
        nivel: 'A1',
        enunciado: 'Ouça e escolha o número correto.',
        audio: 'I am twenty years old.',
        opcoes: ['20', '12', '30'],
        correta: 0,
        dicas: ['Twenty termina com -ty (dezena).', 'Twelve é 12.'],
        explicacao: 'twenty = 20. (A1) Números e idade.'
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'niv-a2-1',
        tipo: 'fill-code',
        nivel: 'A2',
        enunciado: 'Complete no passado: "Yesterday I ___ to the cinema." (go)',
        codigo: 'Yesterday I {{1}} to the cinema.',
        lacunas: [['went']],
        dicas: ['Go é irregular.', 'O marcador yesterday pede passado.'],
        explicacao: 'went. (A2) Passado simples de go.'
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'niv-a2-2',
        tipo: 'multiple-choice',
        nivel: 'A2',
        enunciado: 'Complete o plano: "Next week I ___ travel to Chile."',
        opcoes: ['am going to', 'went to', 'will be', 'was'],
        correta: 0,
        dicas: ['É um plano já decidido.', 'A estrutura é verbo to be + going to.'],
        explicacao: 'am going to travel. (A2) Planos futuros com going to.'
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'niv-b1-1',
        tipo: 'fill-code',
        nivel: 'B1',
        enunciado: 'Complete com o present perfect: "I ___ never been to London."',
        codigo: 'I {{1}} never been to London.',
        lacunas: [['have']],
        dicas: ['A estrutura é have/has + past participle.', 'I usa have.'],
        explicacao: 'have never been. (B1) Present perfect para experiências de vida.'
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'niv-b1-2',
        tipo: 'reading',
        nivel: 'B1',
        titulo: 'Email',
        enunciado: 'Leia o e-mail e responda.',
        texto: 'Hi! Thanks for inviting me to the meeting, but I am afraid I will not be able to attend. I will be traveling on that day. Could you send me the notes afterwards?',
        pergunta: 'Por que a pessoa não vai à reunião?',
        opcoes: ['Porque estará viajando', 'Porque não recebeu o convite', 'Porque não gosta de reuniões', 'Porque vai chegar atrasada'],
        correta: 0,
        dicas: ['Procure a justificativa após "I will not be able to attend".', 'Traveling indica viagem.'],
        explicacao: 'traveling on that day. (B1) Leitura de e-mail profissional com justificativa.'
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'niv-b2-1',
        tipo: 'multiple-choice',
        nivel: 'B2',
        enunciado: 'Escolha a forma correta: "The report ___ by the team last week."',
        opcoes: ['was written', 'wrote', 'has writing', 'is written'],
        correta: 0,
        dicas: ['O relatório recebe a ação (voz passiva).', 'Passado + particípio: was + written.'],
        explicacao: 'was written. (B2) Voz passiva no passado.'
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'niv-b2-2',
        tipo: 'reading',
        nivel: 'B2',
        titulo: 'Article excerpt',
        enunciado: 'Leia e responda.',
        texto: 'Although remote work has increased productivity for many companies, managers still struggle to maintain team cohesion. Regular video meetings help, but they cannot fully replace informal conversations that happen in an office.',
        pergunta: 'Qual é a ideia central do texto?',
        opcoes: [
          'O trabalho remoto traz ganhos, mas ainda há desafios de convivência e coesão',
          'O trabalho remoto deve ser abandonado',
          'Reuniões por vídeo resolvem todos os problemas',
          'A produtividade sempre cai no trabalho remoto'
        ],
        correta: 0,
        dicas: ['"Although" introduz uma concessão: um lado positivo e outro negativo.', 'O texto não diz que deve ser abandonado.'],
        explicacao: 'Although... still struggle. (B2) Contraste e ideia central em texto argumentativo.'
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'niv-c1-1',
        tipo: 'multiple-choice',
        nivel: 'C1',
        enunciado: 'Escolha o conector mais adequado: "___ the heavy rain, the event went ahead as planned."',
        opcoes: ['Despite', 'Although', 'Because', 'Unless'],
        correta: 0,
        dicas: ['Depois de "although" vem uma oração com sujeito e verbo.', 'Antes de um substantivo ("the heavy rain"), usamos despite/in spite of.'],
        explicacao: 'Despite + substantivo. (C1) Escolha precisa de conector concessivo.'
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'niv-c1-2',
        tipo: 'reading',
        nivel: 'C1',
        titulo: 'Opinion column',
        enunciado: 'Leia e responda.',
        texto: 'The assumption that faster communication necessarily leads to better decisions is, at best, naive. More messages often mean more noise, and teams that mistake volume for alignment tend to revisit the same debates indefinitely.',
        pergunta: 'Qual é a crítica do autor?',
        opcoes: [
          'Confundir quantidade de mensagens com alinhamento real',
          'A lentidão das decisões nas empresas',
          'O excesso de reuniões presenciais',
          'A falta de ferramentas de comunicação'
        ],
        correta: 0,
        dicas: ['"Mistake volume for alignment" é a chave.', 'O autor critica uma suposição, não a velocidade em si.'],
        explicacao: 'mistake volume for alignment. (C1) Inferência e crítica em texto de opinião.'
      }
    }
  ]
});
