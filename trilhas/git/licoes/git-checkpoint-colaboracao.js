Plataforma.registrarLicao({
  id: 'git-checkpoint-colaboracao',
  trilha: 'git',
  tipo: 'prova',
  titulo: 'Checkpoint — Colaboração',
  subtitulo: 'Colaboração · Etapa 5',
  duracaoMin: 45,
  xp: 100,
  objetivos: [
    'Criar, trocar e encerrar branches com segurança',
    'Unir trabalho com merge e conduzir pull requests',
    'Dar e receber code review e resolver conflitos'
  ],
  conceitos: ['git.branch', 'git.merge', 'git.pr', 'git.review', 'git.conflito', 'git.repositorio', 'git.sincronizacao'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova de nível: Colaboração',
      blocos: [
        { tipo: 'texto', texto: 'São **9 atividades** cobrindo o trabalho em equipe: branches, merge, pull request, code review e resolução de conflitos. Não há nota de bloqueio: o resultado mostra o que já está dominado e o que vale revisar.' },
        {
          tipo: 'lista',
          itens: [
            'Leia cada cenário como uma situação real de time.',
            'Pode usar dicas — o resultado continua contando.',
            'Ao final, você verá seu domínio conceito por conceito.'
          ]
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-c1',
        tipo: 'multiple-choice',
        enunciado: 'Por que o time cria uma branch para cada tarefa em vez de commitar direto na main?',
        opcoes: [
          'Para isolar o trabalho em andamento e manter a main sempre pronta',
          'Para enviar commits mais rápido para o servidor',
          'Porque a main não aceita commits de pessoas diferentes',
          'Para não precisar escrever mensagens de commit'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A branch não acelera o envio: ela organiza o trabalho.',
          2: 'A main aceita commits, mas o time combina recebê-los prontos.',
          3: 'Toda gravação continua precisando de uma mensagem clara.'
        },
        dicas: [
          'Pense no que acontece se um trabalho pela metade entrar na main.',
          'A linha principal precisa estar sempre funcionando.'
        ],
        explicacao: 'A branch isola o trabalho: a `main` fica estável e recebe mudanças prontas.',
        conceitos: ['git.branch']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-c2',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre merge e branches.',
        afirmacoes: [
          { texto: 'O merge deve ser executado na branch que vai receber o trabalho.', correta: true, explicacao: 'Primeiro você entra na main, depois roda o merge da branch.' },
          { texto: 'Depois do merge, a branch precisa continuar existindo para sempre.', correta: false, explicacao: 'Branch já unida pode ser apagada, mantendo a lista limpa.' },
          { texto: 'Quando a main não recebeu commits, o merge apenas avança o ponteiro.', correta: true, explicacao: 'É o chamado fast-forward, sem commit extra.' }
        ],
        dicas: [
          'O merge traz commits para a branch atual.',
          'Branch unida já cumpriu o papel.'
        ],
        explicacao: 'Merge é sempre na branch atual, e a branch de origem pode ser encerrada logo depois.',
        conceitos: ['git.merge', 'git.branch']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-c3',
        tipo: 'order-blocks',
        enunciado: 'Ordene o ciclo completo de uma tarefa: do primeiro comando até a branch encerrada.',
        blocos: ['git switch -c feature/frete', 'git add .', 'git commit -m "Cria cálculo de frete"', 'git push origin feature/frete', 'git switch main', 'git merge feature/frete', 'git branch -d feature/frete'],
        dicas: [
          'A branch nasce antes do primeiro commit dela.',
          'Apagar a branch vem depois do merge.'
        ],
        explicacao: 'Criar, trabalhar, enviar, voltar para a main, unir e apagar: o ciclo completo de uma tarefa.',
        conceitos: ['git.branch', 'git.merge', 'git.repositorio']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-c4',
        tipo: 'predict-output',
        enunciado: 'Depois destes comandos, o que o time vê no pull request?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git switch feature/preco\ngit add .\ngit commit -m "Ajusta arredondamento"\ngit push origin feature/preco' },
          {
            tipo: 'tabela',
            titulo: 'Branch feature/preco',
            colunas: ['Situação', 'Estado'],
            linhas: [
              ['Antes do push', 'Commit apenas local'],
              ['Depois do push', 'Branch publicada no servidor']
            ]
          }
        ],
        opcoes: [
          'A branch publicada com o novo commit, pronta para virar pull request',
          'O merge já concluído na main',
          'Um conflito aberto entre a branch e a main',
          'A branch apagada do servidor'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O merge só acontece depois do PR aprovado; o push apenas publica a branch.',
          2: 'Nenhum conflito foi criado até aqui.',
          3: 'Apagar a branch é o último passo, depois do merge.'
        },
        dicas: [
          'O push publica a branch e os commits dela.',
          'O PR é aberto depois que a branch está no servidor.'
        ],
        explicacao: 'Com a branch publicada, o próximo passo é abrir o pull request propondo a união à `main`.',
        conceitos: ['git.pr', 'git.branch']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-c5',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada etapa do fluxo de colaboração ao seu objetivo.',
        pares: [
          ['Criar a branch da tarefa', 'Isolar o trabalho sem mexer na main'],
          ['Abrir o pull request', 'Propor a união e receber revisão'],
          ['Fazer o code review', 'Ler o código e comentar antes de aprovar'],
          ['Rodar o merge', 'Trazer os commits para a linha principal']
        ],
        dicas: [
          'O PR propõe; o review avalia; o merge une.',
          'A branch isola desde o começo.'
        ],
        explicacao: 'Cada etapa tem um papel claro: isolar, propor, revisar e unir.',
        conceitos: ['git.branch', 'git.pr', 'git.review', 'git.merge']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-c6',
        tipo: 'find-error',
        enunciado: 'O merge foi interrompido com arquivos em conflito. O dev rodou os comandos abaixo, mas o merge não terminou. O que está errado?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git add src/Total.cs\n# arquivos em conflito ainda têm marcadores dentro' }
        ],
        opcoes: [
          'Os marcadores precisam ser resolvidos e apagados antes de preparar o arquivo com add',
          'O add deveria ser rodado antes do merge',
          'Faltou apagar a branch de origem',
          'O conflito só termina com um novo clone do projeto'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O add existe justamente para marcar o arquivo como resolvido depois da edição.',
          2: 'A branch de origem só é apagada depois que o merge termina.',
          3: 'Clonar de novo não resolve o conflito e ainda perde o trabalho local.'
        },
        dicas: [
          'O arquivo precisa sair do estado de conflito antes do add.',
          'Marcadores dentro do arquivo significam decisão pendente.'
        ],
        explicacao: 'Resolver é editar o arquivo, apagar os marcadores e só então marcar como resolvido com `git add` e concluir com `git commit`.',
        conceitos: ['git.conflito', 'git.merge']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-c7',
        tipo: 'code-review',
        dimensao: 'aplicacao',
        autor: 'Bruno',
        ticket: {
          numero: 'PR #208',
          titulo: 'Adiciona validação de estoque',
          corpo: 'Impede que o pedido seja criado com estoque negativo. Ajustei também a mensagem de retorno.'
        },
        diff: [
          '@@ public bool ValidarEstoque(int quantidade) @@',
          '-    return true;',
          '+    if (quantidade <= 0)',
          '+    {',
          '+        return false;',
          '+    }',
          '+    return estoque >= quantidade;'
        ],
        enunciado: 'Qual comentário de review agrega mais a este pull request?',
        opcoes: [
          'Perguntar o que acontece quando a quantidade é zero e sugerir uma mensagem clara para o caso',
          'Aprovar direto, porque a validação ficou melhor que antes',
          'Comentar que a formatação do if está diferente do resto do time',
          'Pedir para reescrever a validação sem if'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Aprovar sem discutir os casos de borda deixa a validação incompleta.',
          2: 'Formatação é detalhe; a regra de negócio é o que precisa de atenção.',
          3: 'Escrever sem if não é objetivo: o ponto é cobrir os casos de borda.'
        },
        dicas: [
          'Pense em quantidade zero e estoque igual à quantidade.',
          'O comentário deve apontar o caso e sugerir um caminho.'
        ],
        explicacao: 'Um review útil testa mentalmente os casos de borda e provoca a discussão certa antes do merge.',
        conceitos: ['git.review', 'git.pr']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-c8',
        tipo: 'scenario',
        cena: 'Um pull request de 30 arquivos chegou para você revisar. A descrição diz apenas "ajustes finais". O prazo é curto e você tem 20 minutos.',
        enunciado: 'Qual é a atitude mais profissional?',
        opcoes: [
          'Comentar pedindo contexto e divisão em partes menores antes de revisar',
          'Aprovar para não atrasar o colega',
          'Revisar por cima e comentar apenas a formatação',
          'Recusar o PR sem explicação'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Aprovar um PR grande sem contexto transfere o risco para quem usar o código.',
          2: 'Revisar só a forma ignora o que o código faz.',
          3: 'Recusar sem explicar não ajuda o colega a melhorar a proposta.'
        },
        dicas: [
          'PRs pequenos são revisados melhor.',
          'Pedir contexto é parte do review.'
        ],
        explicacao: 'Pedir contexto e divisão é o caminho para um review de qualidade. O tamanho do PR é uma decisão que se ajusta antes da revisão.',
        conceitos: ['git.pr', 'git.review']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-c9',
        tipo: 'write-code',
        enunciado: 'Escreva o comando que cria a branch fix/total-pedido e já entra nela.',
        placeholder: 'git ...',
        respostasAceitas: [
          'git switch -c fix/total-pedido',
          'git switch -c fix/total-pedido; '
        ],
        dicas: [
          'Criar e trocar no mesmo comando.',
          'A opção de criar vem de create.'
        ],
        explicacao: '`git switch -c fix/total-pedido` cria a branch a partir do ponto atual e troca para ela.',
        conceitos: ['git.branch']
      }
    }
  ]
});
