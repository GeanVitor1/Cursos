Plataforma.registrarLicao({
  id: 'git-08',
  trilha: 'git',
  tipo: 'licao',
  titulo: 'stash: guardando trabalho temporário',
  subtitulo: 'Corrigindo erros · Etapa 3',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Guardar mudanças ainda não commitadas com git stash',
    'Recuperar o trabalho guardado com pop e apply',
    'Reconhecer quando o stash ajuda e quando atrapalha'
  ],
  conceitos: ['git.stash', 'git.branch'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Interrompido no meio do trabalho',
      introduz: ['git.stash'],
      blocos: [
        { tipo: 'retoma', conceito: 'git.branch', texto: 'Trocar de branch exige cuidado quando você tem mudanças pela metade na pasta: o Git pode recusar a troca para não misturar o trabalho.' },
        { tipo: 'texto', texto: 'O **stash** resolve essa pausa: ele guarda as mudanças não commitadas em um espaço temporário e devolve a pasta ao estado do último commit. Depois você recupera o trabalho quando voltar.' },
        {
          tipo: 'diagrama',
          arte: 'pasta com mudanças          pasta limpa\n     ●───●───●        ──►       ●───●───●\n        agora                    (stash guardado de lado)\n                                      │\n                                      ▼\n                                git stash pop',
          legenda: 'O stash guarda o trabalho temporário para você trocar de contexto sem perder nada.'
        },
        { tipo: 'conceito', id: 'git.stash', titulo: 'stash', texto: 'Guarda mudanças não commitadas para você trocar de contexto e recuperá-las depois.', exemplo: 'git stash / git stash pop' },
        { tipo: 'nota', tom: 'info', texto: 'O stash não é um commit: ele fica em uma lista separada e só existe na sua máquina. Nada é enviado para o servidor.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git08-a1',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'Para que serve o `git stash` no meio de uma tarefa?',
        opcoes: [
          'Guardar mudanças não commitadas para continuar depois',
          'Enviar as mudanças para o servidor sem commit',
          'Apagar as mudanças de um arquivo para sempre',
          'Criar uma branch nova a partir das mudanças'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O stash é local: nada vai para o servidor.',
          2: 'As mudanças ficam guardadas; o stash não é para apagar.',
          3: 'Criar branch é outro comando: o stash só guarda de lado.'
        },
        dicas: [
          'Pense em uma gaveta para o trabalho pela metade.',
          'O trabalho continua existindo para ser recuperado.'
        ],
        explicacao: 'O stash guarda as mudanças não commitadas em uma lista local e deixa a pasta limpa para você trocar de contexto.',
        conceitos: ['git.stash']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'stash na prática',
      blocos: [
        { tipo: 'texto', texto: 'O `git stash` roda sem argumentos: tudo o que não foi commitado vai para a lista. Para conferir o que está guardado, use a listagem; para recuperar, use o `pop`.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'Guardando e recuperando',
          codigo: 'git stash\n\n# ... troca de branch, resolve algo ...\n\ngit stash list     # lista o que está guardado\ngit stash pop      # devolve o trabalho guardado e remove da lista'
        },
        {
          tipo: 'tabela',
          titulo: 'Comandos do stash',
          colunas: ['Comando', 'O que faz'],
          linhas: [
            ['git stash', 'Guarda as mudanças não commitadas'],
            ['git stash list', 'Lista os trabalhos guardados'],
            ['git stash pop', 'Devolve o trabalho guardado e tira da lista'],
            ['git stash apply', 'Devolve o trabalho guardado e mantém na lista']
          ],
          legenda: 'pop usa e remove; apply usa e mantém uma cópia na lista.'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'O stash guarda mudanças de arquivos que o Git já acompanha. Arquivo novo precisa passar pelo `git add` antes para entrar no stash.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git08-a2',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada comando do stash ao seu resultado.',
        pares: [
          ['git stash', 'Guarda as mudanças não commitadas'],
          ['git stash list', 'Mostra os trabalhos guardados'],
          ['git stash pop', 'Devolve o trabalho e remove da lista'],
          ['git stash apply', 'Devolve o trabalho e mantém na lista']
        ],
        dicas: [
          'pop e apply devolvem; a diferença é o que fica na lista.',
          'list não altera nada.'
        ],
        explicacao: 'Guardar, listar, devolver removendo e devolver mantendo: os quatro comandos cobrem o uso diário do stash.',
        conceitos: ['git.stash']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git08-a3',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete para guardar o trabalho atual e, depois, devolvê-lo removendo da lista.',
        codigo: 'git stash\n\ngit stash {{1}}',
        lacunas: [['pop']],
        dicas: [
          'O comando de devolver e remover é curto.',
          'São três letras.'
        ],
        explicacao: 'O primeiro comando guarda o trabalho de lado; o segundo devolve o trabalho guardado e o remove da lista.',
        conceitos: ['git.stash']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Quando o stash ajuda e quando atrapalha',
      blocos: [
        { tipo: 'lista', itens: [
          '**Ajuda**: interromper o trabalho para uma correção urgente em outra branch.',
          '**Ajuda**: puxar mudanças do servidor quando a pasta tem alterações pela metade.',
          '**Ajuda**: conferir se um erro existe sem as suas mudanças locais.',
          '**Atrapalha**: guardar trabalho por dias sem anotar o que era.',
          '**Atrapalha**: usar stash toda hora em vez de commits pequenos.'
        ] },
        { tipo: 'nota', tom: 'sucesso', texto: 'Use o stash como uma pausa curta, não como gaveta definitiva. Trabalho importante merece commit em uma branch própria.' },
        { tipo: 'trabalho', texto: 'Um chamado urgente no meio da tarefa é o caso clássico: stash no trabalho atual, branch da correção, e depois pop para continuar de onde parou.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git08-a4',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Você está no meio de uma alteração e um chamado urgente exige corrigir a main agora. A sua pasta tem mudanças pela metade que ainda não fazem sentido sozinhas.',
        enunciado: 'Qual é a sequência mais segura?',
        opcoes: [
          'Guardar as mudanças com git stash, corrigir na main e depois devolver com git stash pop',
          'Apagar as mudanças e refazer tudo depois',
          'Commitar as mudanças pela metade em um commit temporário na main',
          'Clonar o projeto de novo em outra pasta para a correção'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Apagar joga fora o trabalho que ainda vai ser terminado.',
          2: 'Commit pela metade na main deixa o histórico e a linha principal pior para todo o time.',
          3: 'Clonar de novo duplica o projeto e não resolve o que fazer com o trabalho atual.'
        },
        dicas: [
          'O trabalho atual precisa continuar existindo.',
          'A correção urgente acontece em outra branch.'
        ],
        explicacao: 'O stash pausa o trabalho com segurança, libera a pasta para a correção e devolve tudo depois.',
        conceitos: ['git.stash', 'git.branch']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git08-a5',
        tipo: 'write-code',
        dimensao: 'construcao',
        enunciado: 'Escreva o comando que guarda de lado as mudanças não commitadas da pasta.',
        placeholder: 'git ...',
        respostasAceitas: [
          'git stash'
        ],
        dicas: [
          'É o próprio nome do recurso.',
          'O comando não precisa de argumentos para guardar tudo.'
        ],
        explicacao: '`git stash` guarda as mudanças não commitadas em uma lista local e deixa a pasta limpa.',
        conceitos: ['git.stash']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Temporary',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras para falar de trabalho temporário:' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['stash', 'guardar de lado'],
            ['temporary', 'temporário']
          ]
        },
        { tipo: 'ingles', frase: 'Stash the temporary changes for later.', traducao: 'Guarde as mudanças temporárias para depois.' },
        { tipo: 'nota', tom: 'info', texto: '**temporary** é o adjetivo do que dura pouco — exatamente o tipo de trabalho que vai para o stash.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git08-a6',
        tipo: 'interpret-code',
        dimensao: 'aplicacao',
        enunciado: 'Stash the temporary changes for later.',
        opcoes: [
          'Guarde as mudanças temporárias para depois',
          'Envie as mudanças temporárias para o servidor',
          'Apague as mudanças temporárias agora',
          'Crie um commit definitivo com as mudanças'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Enviar é push; o stash é local e temporário.',
          2: 'O stash guarda, não apaga.',
          3: 'Commit definitivo é o oposto de um trabalho temporário guardado de lado.'
        },
        dicas: [
          'stash quer dizer guardar de lado.',
          'later quer dizer depois.'
        ],
        explicacao: 'A frase pede para guardar de lado as mudanças temporárias e recuperá-las depois.',
        conceitos: ['git.stash']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git08-a7',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Um dev guardou um trabalho no stash e esqueceu por duas semanas. Agora existem cinco itens na lista, sem nomes, e ele não sabe o que cada um contém.',
        enunciado: 'Qual seria a atitude mais profissional daqui para frente?',
        opcoes: [
          'Commitar o trabalho em uma branch com nome claro em vez de acumular itens sem contexto',
          'Apagar todos os itens do stash para limpar a lista',
          'Continuar usando o stash para tudo, inclusive trabalhos longos',
          'Parar de usar branches e trabalhar sempre na main'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Apagar tudo pode descartar trabalho importante que ninguém mais tem.',
          2: 'Use o stash apenas em pausas curtas: trabalho de dias merece branch e commits.',
          3: 'Trabalhar na main mistura o trabalho de todos.'
        },
        dicas: [
          'Trabalho que dura dias merece um lugar com nome.',
          'A branch conta a história; o stash não.'
        ],
        explicacao: 'O stash é uma pausa curta. Trabalhos longos vão para uma branch com commits, onde o contexto fica registrado e visível para o time.',
        conceitos: ['git.stash', 'git.branch'],
        desafio: true
      }
    }
  ]
});
