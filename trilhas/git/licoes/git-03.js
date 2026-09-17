Plataforma.registrarLicao({
  id: 'git-03',
  trilha: 'git',
  tipo: 'licao',
  titulo: 'Merge',
  subtitulo: 'Colaboração · Etapa 2',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Explicar o que o merge faz com as duas linhas de trabalho',
    'Unir uma branch à main com git merge',
    'Encerrar a branch depois que o trabalho entrou na linha principal'
  ],
  conceitos: ['git.merge', 'git.branch'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Juntando os dois caminhos',
      introduz: ['git.merge'],
      blocos: [
        { tipo: 'retoma', conceito: 'git.branch', texto: 'Você cria uma branch, trabalha nela e a `main` continua estável. Falta o passo que traz o trabalho de volta para a linha principal.' },
        { tipo: 'texto', texto: 'O **merge** une uma branch à outra: os commits da branch passam a fazer parte da linha em que você está. É o momento em que o trabalho isolado entra na versão oficial do projeto.' },
        {
          tipo: 'diagrama',
          arte: 'main      ●───●───●───────────●   (recebe o merge)\n               \\           /\n                ●───●───●    feature/preco',
          legenda: 'Os commits da branch voltam para a linha principal no merge.'
        },
        { tipo: 'conceito', id: 'git.merge', titulo: 'Merge', texto: 'Une o trabalho de uma branch na outra, criando um novo ponto na história.', exemplo: 'git merge feature/preco' },
        { tipo: 'nota', tom: 'info', texto: 'O merge acontece **na branch em que você está**. Para trazer a branch para a `main`, primeiro você entra na `main` e depois roda o merge.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git03-a1',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'Em qual branch o merge deve ser executado para trazer o trabalho de `feature/preco` para a linha principal?',
        opcoes: [
          'Na main: o merge traz a outra branch para a branch atual',
          'Na feature/preco: ela precisa empurrar os próprios commits',
          'Em uma branch nova criada só para o merge',
          'Em qualquer uma: o resultado é sempre igual'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Quem recebe o trabalho precisa estar ativa: entre na main e rode o merge.',
          2: 'Criar uma branch a mais não muda o destino do trabalho.',
          3: 'O merge sempre traz os commits para a branch em que você está.'
        },
        dicas: [
          'O merge traz commits para onde você está.',
          'Quem precisa receber o trabalho é a main.'
        ],
        explicacao: 'Primeiro `git switch main`, depois `git merge feature/preco`: a `main` recebe os commits da branch.',
        conceitos: ['git.merge', 'git.branch']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Merge na prática',
      blocos: [
        { tipo: 'texto', texto: 'O roteiro é: entrar na branch que vai receber, rodar o merge e conferir o resultado.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'Trazendo a branch para a main',
          codigo: 'git switch main\ngit merge feature/preco\n\n# Saída:\n# Updating 3f2a1c9..8b7d4e1\n# Fast-forward\n#  src/Preco.cs | 12 +++++++++---'
        },
        { tipo: 'texto', texto: 'Quando a `main` não recebeu nenhum commit desde que a branch nasceu, o Git apenas **avança o ponteiro** — é o chamado *fast-forward* (avanço rápido). Nenhum commit extra é criado.' },
        { tipo: 'nota', tom: 'sucesso', texto: 'Depois do merge, a branch cumpriu o papel. O próximo passo é apagá-la para não acumular nomes antigos.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git03-a2',
        tipo: 'order-blocks',
        dimensao: 'ordenacao',
        enunciado: 'Ordene os comandos que levam o trabalho da branch para a linha principal.',
        blocos: ['git switch main', 'git merge feature/preco', 'git push origin main', 'git branch -d feature/preco'],
        dicas: [
          'Entre na branch que recebe antes de rodar o merge.',
          'Apagar a branch é o último passo.'
        ],
        explicacao: 'Entrar na `main`, fazer o merge, enviar para o servidor e apagar a branch já unida.',
        conceitos: ['git.merge', 'git.branch']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Quando a main andou no meio do caminho',
      blocos: [
        { tipo: 'texto', texto: 'Se a `main` recebeu commits depois que a sua branch nasceu, o histórico se dividiu em dois. Nesse caso, o Git cria um **commit de merge**: um ponto que reúne as duas linhas.' },
        {
          tipo: 'diagrama',
          arte: 'main      ●───●───●───────●   commit de merge\n               \\         /\n                ●───●───●    feature/preco',
          legenda: 'O commit de merge registra o encontro das duas linhas.'
        },
        { tipo: 'lista', itens: [
          'Histórico linear: a main não andou, então o merge só avança o ponteiro.',
          'Histórico dividido: o merge cria um commit que une as duas linhas.',
          'Nos dois casos, o conteúdo final é a soma do trabalho dos dois lados.'
        ] },
        { tipo: 'nota', tom: 'info', texto: 'Antes de rodar o merge, atualize a sua branch com o que há de novo na `main`. É a mesma ideia do pull antes do push: trabalhar sobre a versão mais recente.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git03-a3',
        tipo: 'predict-output',
        dimensao: 'aplicacao',
        enunciado: 'Depois destes comandos, onde estão os commits da `feature/preco`?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git switch main\ngit merge feature/preco' },
          {
            tipo: 'tabela',
            titulo: 'Antes do merge',
            colunas: ['Branch', 'Tem os commits da feature?'],
            linhas: [
              ['feature/preco', 'Sim'],
              ['main', 'Não']
            ]
          }
        ],
        opcoes: [
          'Na main e na feature/preco: a main recebeu os commits',
          'Apenas na feature/preco: nada mudou',
          'Apenas na main: a branch perdeu os commits',
          'Em nenhuma: falta o push'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O merge traz os commits para a main.',
          2: 'A branch continua com os commits; ela só deixa de ser necessária.',
          3: 'O push apenas publica o resultado; o merge já mudou a main local.'
        },
        dicas: [
          'O merge não apaga nada da branch.',
          'A main passa a apontar para o mesmo trabalho.'
        ],
        explicacao: 'Depois do merge, a `main` contém os commits da branch. A branch continua existindo até ser apagada.',
        conceitos: ['git.merge', 'git.branch']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Encerrando a branch',
      blocos: [
        { tipo: 'texto', texto: 'Branch unida é branch que já cumpriu o papel. Apague com `git branch -d` para o time não se perder em uma lista enorme de nomes antigos.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'Apagando a branch já unida',
          codigo: 'git branch -d feature/preco\n\n# Deleted branch feature/preco (was 8b7d4e1).'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Se a branch ainda tiver commits que não estão na `main`, o Git se recusa a apagá-la. É uma proteção contra perder trabalho.' },
        { tipo: 'trabalho', texto: 'O ciclo completo de uma tarefa é curto: criar a branch, commitar, unir na main, enviar e apagar a branch. Quanto menor o ciclo, menos dor de cabeça no fim do mês.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git03-a4',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete para entrar na linha principal e trazer a branch do frete.',
        codigo: 'git switch {{1}}\ngit {{2}} feature/frete',
        lacunas: [['main'], ['merge']],
        dicas: [
          'Você precisa estar na branch que vai receber.',
          'O comando que une as linhas é o merge.'
        ],
        explicacao: 'Entrar na linha principal e depois rodar o merge da branch é o que traz os commits dela para a main.',
        conceitos: ['git.merge', 'git.branch']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git03-a5',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Um colega comentou que a branch fix/cep já foi unida à main na semana passada, mas ela continua aparecendo na lista do time.',
        enunciado: 'O que faz sentido fazer?',
        opcoes: [
          'Apagar a branch com git branch -d, porque o trabalho dela já está na main',
          'Continuar commitando nela para não perder o histórico',
          'Criar uma branch nova com o mesmo nome',
          'Fazer o merge de novo para garantir'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Trabalho já unido não precisa continuar recebendo commits.',
          2: 'O mesmo nome não resolve: a branch antiga continua na lista.',
          3: 'Unir de novo não muda nada: os commits já estão na main.'
        },
        dicas: [
          'Branch unida já cumpriu o papel.',
          'A lista de branches deve refletir o trabalho em andamento.'
        ],
        explicacao: 'Depois do merge, apagar a branch mantém a lista limpa e evita confusão sobre o que ainda está em aberto.',
        conceitos: ['git.merge', 'git.branch']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Combine',
      blocos: [
        { tipo: 'texto', texto: 'Uma palavra nova para falar de união de trabalho:' },
        {
          tipo: 'vocab',
          titulo: 'Palavra nova (1)',
          pares: [
            ['combine', 'combinar / unir']
          ]
        },
        { tipo: 'ingles', frase: 'Combine the branch with main when it is ready.', traducao: 'Una a branch à main quando ela estiver pronta.' },
        { tipo: 'nota', tom: 'info', texto: 'O comando `git merge` vem de *merge* (fundir), que é quase um sinônimo de **combine** no contexto de unir linhas de trabalho.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git03-a6',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada comando do ciclo de merge ao seu resultado.',
        pares: [
          ['git switch main', 'Entra na branch que vai receber o trabalho'],
          ['git merge feature/frete', 'Traz os commits da branch para a main'],
          ['git push origin main', 'Envia a main atualizada para o servidor'],
          ['git branch -d feature/frete', 'Apaga a branch que já foi unida']
        ],
        dicas: [
          'O merge acontece na branch atual.',
          'Apagar vem depois de unir e enviar.'
        ],
        explicacao: 'Esse é o ciclo completo: entrar, unir, enviar e apagar a branch.',
        conceitos: ['git.merge', 'git.branch']
      }
    }
  ]
});
