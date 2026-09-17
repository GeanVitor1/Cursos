Plataforma.registrarLicao({
  id: 'git-07',
  trilha: 'git',
  tipo: 'licao',
  titulo: 'reset: entendendo os modos',
  subtitulo: 'Corrigindo erros · Etapa 2',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Explicar o que o reset move e por que ele é local',
    'Diferenciar os modos soft, mixed e hard',
    'Escolher o modo certo antes de mexer em um commit'
  ],
  conceitos: ['git.reset', 'git.repositorio'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Voltando o ponteiro sem apagar o trabalho',
      introduz: ['git.reset'],
      blocos: [
        { tipo: 'retoma', conceito: 'git.revert', texto: 'O `revert` desfaz um commit **já compartilhado**, criando um commit novo. Mas quando o commit ainda está só na sua máquina, existe uma ferramenta mais direta.' },
        { tipo: 'texto', texto: 'Cada branch é um ponteiro para um commit. O **reset** move esse ponteiro para outro ponto da história: você decide se as mudanças que saíram do caminho continuam na sua máquina ou não.' },
        {
          tipo: 'diagrama',
          arte: 'antes:    ●───●───●  ◄─ main\n                  ▲\n               ponteiro\n\ndepois:   ●───●       ◄─ main\n              ▲\n           ponteiro movido\n           (os commits seguem existindo até serem descartados)',
          legenda: 'O reset move o ponteiro da branch; o que acontece com as mudanças depende do modo.'
        },
        { tipo: 'conceito', id: 'git.reset', titulo: 'reset', texto: 'Move a branch para outro commit; os modos soft, mixed e hard decidem o que acontece com as mudanças.', exemplo: 'git reset --soft HEAD~1' },
        { tipo: 'nota', tom: 'atencao', texto: 'Reset mexe na **história local**. Se o commit já foi enviado para o servidor, use `revert` para não deixar a cópia do time diferente da sua.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git07-a1',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'O que o `git reset` move quando é executado?',
        opcoes: [
          'O ponteiro da branch para outro commit da história',
          'Os arquivos da pasta de trabalho para outra pasta',
          'O repositório local para outro servidor',
          'A mensagem do último commit para outro texto'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Os arquivos não mudam de lugar: o reset mexe no ponteiro da história.',
          2: 'Trocar de servidor é assunto de remote, não de reset.',
          3: 'A mensagem de um commit não é editada por reset.'
        },
        dicas: [
          'A branch é um ponteiro para um commit.',
          'O reset reposiciona esse ponteiro.'
        ],
        explicacao: 'O reset move a branch para outro commit. As mudanças que saem do caminho são tratadas conforme o modo escolhido.',
        conceitos: ['git.reset']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Os três modos',
      blocos: [
        { tipo: 'texto', texto: 'O modo escolhido decide onde as mudanças dos commits que saíram do caminho vão parar. O alvo mais comum é `HEAD~1`, que significa um commit antes do atual.' },
        {
          tipo: 'tabela',
          titulo: 'O que cada modo faz',
          colunas: ['Modo', 'Os commits saem do histórico e as mudanças ficam...'],
          linhas: [
            ['--soft', 'Preparadas, prontas para um novo commit'],
            ['--mixed (padrão)', 'Na pasta de trabalho, fora da área de preparação'],
            ['--hard', 'Descartadas: a pasta volta ao estado do commit alvo']
          ],
          legenda: 'Do menos destrutivo para o mais destrutivo: soft, mixed e hard.'
        },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'Desfazendo o último commit',
          codigo: 'git reset --soft HEAD~1     # desfaz o commit e mantém tudo preparado\ngit reset --mixed HEAD~1    # desfaz o commit e mantém as mudanças na pasta\ngit reset --hard HEAD~1     # descarta o commit e as mudanças'
        },
        { tipo: 'nota', tom: 'info', texto: 'Sem indicação de modo, o Git usa o `--mixed`. Ele é o meio-termo: o commit some do histórico, mas nenhum arquivo é alterado.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git07-a2',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada modo ao que acontece com as mudanças.',
        pares: [
          ['--soft', 'As mudanças ficam preparadas para um novo commit'],
          ['--mixed', 'As mudanças voltam para a pasta de trabalho, sem preparo'],
          ['--hard', 'As mudanças são descartadas por completo']
        ],
        dicas: [
          'soft é o mais cauteloso.',
          'hard é o único que descarta arquivos.'
        ],
        explicacao: 'soft mantém preparado, mixed devolve para a pasta e hard descarta. Quanto mais forte o modo, maior o cuidado necessário.',
        conceitos: ['git.reset']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git07-a3',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete para desfazer o último commit mantendo as mudanças preparadas para um novo commit.',
        codigo: 'git reset {{1}} HEAD~1',
        lacunas: [['--soft', '- -soft', '--soft ']],
        dicas: [
          'O modo mais cauteloso mantém tudo preparado.',
          'É o oposto de hard.'
        ],
        explicacao: 'O modo suave desfaz o commit e deixa as mudanças na área de preparação, prontas para um novo commit.',
        conceitos: ['git.reset']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Antes de dar reset, pergunte-se',
      blocos: [
        { tipo: 'lista', itens: [
          'O commit já foi enviado com `git push`? Se sim, use `revert`.',
          'Alguém pode ter puxado esse commit? Se sim, use `revert`.',
          'As mudanças podem ser perdidas? Em caso de dúvida, prefira `--soft` ou `--mixed`.',
          'Você anotou o identificador do commit atual? Ele é o caminho de volta se algo sair errado.'
        ] },
        { tipo: 'nota', tom: 'atencao', texto: 'O `--hard` é o único modo que descarta mudanças de verdade. Ele é seguro para desfazer um experimento local, mas nunca deve ser usado para esconder um commit que o time já conhece.' },
        { tipo: 'trabalho', texto: 'Reset é ferramenta de arrumação antes do push: juntar commits pequenos demais, corrigir uma mensagem ou desfazer um experimento. Depois que o trabalho foi para o servidor, o time usa revert.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git07-a4',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Você fez um commit local com a mensagem errada e quer refazer a mensagem. As mudanças estão corretas e ainda não foram enviadas para o servidor.',
        enunciado: 'Qual é o caminho mais seguro?',
        opcoes: [
          'Desfazer o commit mantendo tudo preparado e gravar de novo com a mensagem certa',
          'Descartar o commit e as mudanças e reescrever o código',
          'Reescrever o histórico no servidor para trocar a mensagem',
          'Pedir para o time apagar o commit nas máquinas'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Descartar as mudanças joga fora trabalho correto: o problema é só a mensagem.',
          2: 'O commit nem chegou ao servidor; mexer lá não é necessário.',
          3: 'O time nem conhece o commit: não há nada para apagar.'
        },
        dicas: [
          'As mudanças boas precisam continuar.',
          'O modo cauteloso mantém tudo preparado.'
        ],
        explicacao: 'Um reset no modo cauteloso remove o commit do histórico e mantém as mudanças preparadas; basta gravar de novo com a mensagem correta.',
        conceitos: ['git.reset']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git07-a5',
        tipo: 'predict-output',
        dimensao: 'aplicacao',
        enunciado: 'Depois deste comando, qual é o estado do projeto?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git reset --soft HEAD~1' },
          {
            tipo: 'tabela',
            titulo: 'Situação',
            colunas: ['Item', 'Estado'],
            linhas: [
              ['Último commit', 'Existia antes do comando'],
              ['Mudanças do commit', 'Corretas e ainda não enviadas']
            ]
          }
        ],
        opcoes: [
          'O commit saiu do histórico e as mudanças ficaram preparadas',
          'O commit continua no histórico e as mudanças foram descartadas',
          'Os arquivos voltaram ao estado de ontem',
          'O commit foi enviado para o servidor'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Esse é o efeito de manter o commit: o soft remove o commit, não as mudanças.',
          2: 'Nenhum arquivo é alterado no modo soft.',
          3: 'Enviar é papel do push, que não foi executado.'
        },
        dicas: [
          'soft mantém as mudanças preparadas.',
          'O commit sai do histórico local.'
        ],
        explicacao: 'No modo suave, o commit sai do histórico e as mudanças continuam na área de preparação, prontas para um novo commit.',
        conceitos: ['git.reset']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Reset',
      blocos: [
        { tipo: 'texto', texto: 'Três palavras do vocabulário de reset:' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (3)',
          pares: [
            ['reset', 'redefinir'],
            ['soft', 'suave'],
            ['safe', 'seguro']
          ]
        },
        { tipo: 'ingles', frase: 'A soft reset is safe for the changes.', traducao: 'Um reset suave é seguro para as mudanças.' },
        { tipo: 'nota', tom: 'info', texto: 'O modo `--hard` também é uma palavra comum: **hard** quer dizer duro, severo. Compare com **soft**, o modo suave.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git07-a6',
        tipo: 'interpret-code',
        dimensao: 'aplicacao',
        enunciado: 'A soft reset is safe for the changes.',
        opcoes: [
          'Um reset suave é seguro para as mudanças',
          'Um reset duro é perigoso para as mudanças',
          'Um commit suave é enviado para o servidor',
          'As mudanças são descartadas por um reset'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A frase fala do modo suave, não do duro.',
          2: 'A frase não fala de enviar commits.',
          3: 'Descartar mudanças é o modo duro; a frase garante o contrário.'
        },
        dicas: [
          'soft quer dizer suave; safe quer dizer seguro.',
          'changes são as mudanças do projeto.'
        ],
        explicacao: 'A frase diz que o reset suave não é perigoso para as mudanças: elas continuam na máquina.',
        conceitos: ['git.reset']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git07-a7',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Um colega rodou um reset no modo descartável em uma branch que já estava no servidor. Agora a cópia dele tem commits diferentes da cópia de todo mundo.',
        enunciado: 'Qual é o problema e o que ele deveria ter usado?',
        opcoes: [
          'O reset reescreveu a história compartilhada; o correto era usar revert',
          'O problema é que faltou rodar git status antes do reset',
          'O correto era apagar a branch e clonar de novo',
          'Não há problema: cada pessoa pode ter a própria história'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O status informa, mas não evita a reescrita da história compartilhada.',
          2: 'Clonar de novo não conserta o histórico que os outros já puxaram.',
          3: 'Histórias diferentes por pessoa fazem o time perder a confiança no repositório.'
        },
        dicas: [
          'Reset mexe na história local.',
          'Commit compartilhado pede outra ferramenta.'
        ],
        explicacao: 'Reset reescreve história. Depois que o commit está no servidor, a ferramenta segura para desfazer é o revert, que preserva a história.',
        conceitos: ['git.reset', 'git.revert'],
        desafio: true
      }
    }
  ]
});
