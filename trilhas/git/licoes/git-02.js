Plataforma.registrarLicao({
  id: 'git-02',
  trilha: 'git',
  tipo: 'licao',
  titulo: 'Branches na prática',
  subtitulo: 'Colaboração · Etapa 1',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Explicar o que é uma branch e por que ela isola o trabalho',
    'Criar e trocar de branch com git switch',
    'Escolher nomes de branch que o time entende'
  ],
  conceitos: ['git.branch', 'git.repositorio'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Uma linha paralela de trabalho',
      introduz: ['git.branch'],
      blocos: [
        { tipo: 'retoma', conceito: 'git.sincronizacao', texto: 'Até aqui, tudo acontecia na linha principal, a `main`. Cada commit entrava direto no mesmo lugar — e é aí que começa o problema quando o time cresce.' },
        { tipo: 'texto', texto: 'Uma **branch** (ramificação) é uma linha paralela de desenvolvimento. Você trabalha nela sem mexer na `main`: se a ideia não der certo, basta abandonar a linha e a versão principal continua intacta.' },
        {
          tipo: 'diagrama',
          arte: 'main      ●───●───●───●───●      sempre pronta\n               \\\n                ●───●   feature/preco   seu trabalho isolado',
          legenda: 'A branch nasce da main, recebe commits próprios e depois pode voltar para a linha principal.'
        },
        { tipo: 'conceito', id: 'git.branch', titulo: 'Branch', texto: 'Uma linha paralela de desenvolvimento que isola um trabalho até ele estar pronto.', exemplo: 'git switch -c feature/preco' },
        { tipo: 'nota', tom: 'info', texto: 'A branch não copia a pasta do projeto: ela é só um ponteiro para um ponto da história. Criar uma branch é instantâneo, mesmo em projetos grandes.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git02-a1',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'Para que serve uma branch no dia a dia do time?',
        opcoes: [
          'Isolar um trabalho em andamento sem alterar a linha principal',
          'Fazer backup dos arquivos em outra pasta',
          'Enviar commits para o servidor mais rapidamente',
          'Dividir o projeto entre pessoas diferentes para sempre'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Backup é outra coisa: a branch compartilha a mesma pasta de trabalho.',
          2: 'Quem envia commits é o push, não a branch.',
          3: 'Branches são temporárias: elas voltam para a linha principal quando o trabalho termina.'
        },
        dicas: [
          'Pense em um rascunho que não estraga a versão boa.',
          'A main continua funcionando enquanto você trabalha.'
        ],
        explicacao: 'A branch isola o trabalho: a `main` segue estável e recebe a mudança só quando ela estiver pronta.',
        conceitos: ['git.branch']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Criando e trocando de branch',
      blocos: [
        { tipo: 'texto', texto: 'Para criar uma branch e já entrar nela, use `git switch -c nomedabranch`. O `-c` vem de *create* (criar). Para voltar à linha principal, `git switch main`.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'Criando a branch da tarefa',
          codigo: 'git switch -c feature/preco\n\n# ... trabalha, faz commits ...\n\ngit switch main'
        },
        { tipo: 'texto', texto: 'O `git branch` sem argumentos **lista** as branches. O asterisco marca onde você está agora.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'Listando as branches',
          codigo: 'git branch\n\n* main\n  feature/preco'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Os commits pertencem à branch em que foram criados. Se você commitar na branch errada, a mudança não aparece na `main`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git02-a2',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete para criar a branch da tarefa e já entrar nela.',
        codigo: 'git switch {{1}} feature/preco',
        lacunas: [['-c', '-c ']],
        dicas: [
          'A opção vem de create (criar).',
          'São duas letras com um traço na frente.'
        ],
        explicacao: 'A opção `-c` cria a branch e troca para ela no mesmo comando: a partir daí, os commits vão para a branch nova.',
        conceitos: ['git.branch']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'A main fica sempre pronta',
      blocos: [
        { tipo: 'texto', texto: 'A regra de ouro da colaboração: **a `main` precisa estar sempre funcionando**. Se cada pessoa trabalhar direto nela, qualquer mudança pela metade quebra o projeto para todo mundo.' },
        { tipo: 'lista', itens: [
          'Cada tarefa ganha a sua própria branch, curta e com um objetivo.',
          'A `main` recebe o trabalho apenas quando ele está pronto.',
          'A branch é apagada depois que o trabalho entra na `main`.'
        ] },
        { tipo: 'trabalho', texto: 'Em times organizados, a primeira checagem de um chamado é criar a branch. O código da correção nunca nasce direto na linha principal.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git02-a3',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Você precisa trocar o cálculo do frete e a mudança vai levar dois dias. Enquanto isso, o time continua enviando correções urgentes para a linha principal.',
        enunciado: 'Qual é a atitude mais segura?',
        opcoes: [
          'Criar uma branch feature/frete, trabalhar nela e voltar para a main quando terminar',
          'Trabalhar direto na main e avisar o time para não mexer no arquivo',
          'Criar uma pasta nova no computador e copiar os arquivos',
          'Esperar dois dias sem alterar nada até o time parar de enviar correções'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A main é compartilhada: o trabalho pela metade entraria no caminho de todos.',
          2: 'Copiar arquivos para fora do repositório deixa de ter histórico e sincronização.',
          3: 'O time não precisa parar: com branch, cada trabalho segue em paralelo.'
        },
        dicas: [
          'O trabalho longo precisa ficar isolado.',
          'A linha principal continua recebendo as correções urgentes.'
        ],
        explicacao: 'A branch isola o trabalho de dois dias. As correções urgentes seguem na `main` e ninguém fica bloqueado.',
        conceitos: ['git.branch']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git02-a4',
        tipo: 'predict-output',
        dimensao: 'aplicacao',
        enunciado: 'Em qual branch este desenvolvedor está e o que acontece com o commit?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git branch\n\ngit switch feature/frete\ngit add .\ngit commit -m "Cria cálculo de frete"' },
          {
            tipo: 'codigo',
            linguagem: 'bash',
            titulo: 'Saída do git branch',
            codigo: '  main\n* feature/frete'
          }
        ],
        opcoes: [
          'O commit entra na branch feature/frete',
          'O commit entra na main, porque ela é a linha principal',
          'O commit entra nas duas branches ao mesmo tempo',
          'O commit é recusado porque falta o push'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A main só recebe esse commit quando a branch for unida a ela.',
          2: 'Cada commit pertence à branch atual, não a todas.',
          3: 'O push envia o commit depois de gravado; ele não interfere na gravação.'
        },
        dicas: [
          'O asterisco mostra a branch atual.',
          'O commit nasce na branch em que você está.'
        ],
        explicacao: 'Depois da troca, a branch atual é a feature/frete. O commit entra nela e só chega à main quando as duas forem unidas.',
        conceitos: ['git.branch']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Nomes de branch que o time entende',
      blocos: [
        { tipo: 'texto', texto: 'O nome da branch é lido pelo time inteiro. Um padrão simples com prefixo ajuda a entender o tipo de trabalho antes de abrir o código:' },
        {
          tipo: 'tabela',
          titulo: 'Prefixos comuns',
          colunas: ['Prefixo', 'Uso', 'Exemplo'],
          linhas: [
            ['feature/', 'Nova funcionalidade', 'feature/preco'],
            ['fix/', 'Correção de defeito', 'fix/total-pedido'],
            ['docs/', 'Documentação', 'docs/instalacao'],
            ['chore/', 'Manutenção e configuração', 'chore/atualiza-sdk']
          ],
          legenda: 'O sufixo curto descreve a tarefa; evite nomes genéricos como "teste" ou o seu nome.'
        },
        { tipo: 'nota', tom: 'info', texto: 'Use hífen ou barra para separar palavras: `fix/total-pedido` é mais legível que `fixTotalPedido`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git02-a5',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada tarefa ao nome de branch mais adequado.',
        pares: [
          ['Corrigir o cálculo do total do pedido', 'fix/total-pedido'],
          ['Criar a tela de preços', 'feature/preco'],
          ['Atualizar o guia de instalação', 'docs/instalacao'],
          ['Trocar a versão do SDK', 'chore/atualiza-sdk']
        ],
        dicas: [
          'O prefixo indica o tipo de trabalho.',
          'fix é para defeito; feature é para funcionalidade nova.'
        ],
        explicacao: 'O padrão de nomes deixa claro, só pelo nome, que tipo de mudança a branch traz.',
        conceitos: ['git.branch']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Switch',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras úteis para falar de branches em inglês:' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['switch', 'trocar'],
            ['feature', 'funcionalidade']
          ]
        },
        { tipo: 'ingles', frase: 'Switch to a new branch for the feature.', traducao: 'Troque para uma branch nova para a funcionalidade.' },
        { tipo: 'nota', tom: 'info', texto: 'O próprio comando usa a palavra: `git switch` = trocar. E **feature** virou o prefixo padrão de branches de funcionalidade.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git02-a6',
        tipo: 'write-code',
        dimensao: 'construcao',
        enunciado: 'Start a new branch for the feature.',
        placeholder: 'git ...',
        respostasAceitas: [
          'git switch -c feature/preco',
          'git switch -c feature/novo'
        ],
        dicas: [
          'start = começar; new branch = branch nova.',
          'Criar e trocar no mesmo comando usa switch -c.'
        ],
        explicacao: 'A frase pede uma branch nova para a funcionalidade. O comando cria a branch e já entra nela.',
        conceitos: ['git.branch']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git02-a7',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Você terminou o trabalho na branch fix/total-pedido, mas descobriu que o apressado commit anterior foi feito na main, misturado com o trabalho de um colega.',
        enunciado: 'O que deveria ter acontecido desde o início?',
        opcoes: [
          'O trabalho deveria ter sido feito em uma branch própria, criada a partir da main',
          'O commit na main é aceitável, desde que o time seja avisado',
          'Cada dev deveria ter o seu próprio repositório no servidor',
          'A main deveria ser bloqueada para todos os commits'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Avisar não desfaz a mistura: o histórico fica confuso para o time.',
          2: 'Um repositório por pessoa acaba com a integração do trabalho.',
          3: 'A main recebe commits, mas de forma controlada, com o trabalho já pronto.'
        },
        dicas: [
          'O isolamento é o ponto principal da branch.',
          'A linha principal recebe trabalho pronto.'
        ],
        explicacao: 'Trabalhar em branch própria desde o começo é o que mantém a `main` estável e o histórico compreensível.',
        conceitos: ['git.branch'],
        desafio: true
      }
    }
  ]
});
