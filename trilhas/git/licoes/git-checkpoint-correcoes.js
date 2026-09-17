Plataforma.registrarLicao({
  id: 'git-checkpoint-correcoes',
  trilha: 'git',
  tipo: 'prova',
  titulo: 'Checkpoint — Correções',
  subtitulo: 'Corrigindo erros · Etapa 5',
  duracaoMin: 40,
  xp: 100,
  objetivos: [
    'Escolher entre revert e reset conforme a história',
    'Usar os modos do reset com segurança',
    'Guardar trabalho temporário e manter o repositório limpo'
  ],
  conceitos: ['git.revert', 'git.reset', 'git.stash', 'git.ignore', 'git.repositorio'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova de nível: Correções',
      blocos: [
        { tipo: 'texto', texto: 'São **9 atividades** cobrindo as ferramentas de correção: revert, reset com seus modos, stash e o arquivo de ignorados. Não há nota de bloqueio: o resultado mostra o que já está dominado e o que vale revisar.' },
        {
          tipo: 'lista',
          itens: [
            'Leia cada cenário pensando se o commit já é do conhecimento do time.',
            'Pode usar dicas — o resultado continua contando.',
            'Ao final, você verá seu domínio conceito por conceito.'
          ]
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-r1',
        tipo: 'multiple-choice',
        enunciado: 'Um commit com defeito já foi enviado para a main e o time inteiro o puxou. Qual ferramenta desfaz o efeito dele com segurança?',
        opcoes: [
          'revert, que cria um commit novo desfazendo o anterior',
          'reset no modo descartável, que apaga o commit',
          'stash, que guarda o commit de lado',
          'Um clone novo do projeto'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Reset reescreve a história local e deixa a cópia de cada pessoa diferente.',
          2: 'O stash guarda mudanças não commitadas, não desfaz commits.',
          3: 'Clonar traz o mesmo histórico com o defeito dentro.'
        },
        dicas: [
          'A história foi compartilhada.',
          'Desfazer sem apagar é o ponto principal.'
        ],
        explicacao: 'Em história compartilhada, `revert` é a escolha segura: ele acrescenta um commit que anula o defeito sem reescrever o passado.',
        conceitos: ['git.revert']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-r2',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre desfazer mudanças.',
        afirmacoes: [
          { texto: 'O revert preserva o commit antigo no histórico.', correta: true, explicacao: 'O commit original continua visível, seguido do revert.' },
          { texto: 'O reset é indicado para commits que já foram enviados ao servidor.', correta: false, explicacao: 'Reset reescreve história local; em commits compartilhados use revert.' },
          { texto: 'O modo mixed devolve as mudanças para a pasta de trabalho.', correta: true, explicacao: 'No mixed, o commit sai do histórico e nada é descartado.' }
        ],
        dicas: [
          'Pense em quem já pode ter puxado o commit.',
          'Cada modo decide onde as mudanças param.'
        ],
        explicacao: 'Revert para história compartilhada; reset para arrumação local, com o modo definindo o destino das mudanças.',
        conceitos: ['git.revert', 'git.reset']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-r3',
        tipo: 'fill-code',
        enunciado: 'Complete para guardar o trabalho atual de lado e, depois, desfazer o último commit mantendo tudo preparado.',
        codigo: 'git {{1}}\n\ngit reset {{2}} HEAD~1',
        lacunas: [['stash'], ['--soft']],
        dicas: [
          'Guardar de lado é o stash.',
          'Manter preparado é o modo cauteloso.'
        ],
        explicacao: 'O trabalho temporário fica guardado de lado; o último commit sai do histórico com as mudanças preparadas para um novo ponto.',
        conceitos: ['git.stash', 'git.reset']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-r4',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada situação à ferramenta mais adequada.',
        pares: [
          ['Commit com defeito já enviado ao servidor', 'revert'],
          ['Commit local com mensagem errada', 'reset'],
          ['Mudanças pela metade antes de trocar de branch', 'stash'],
          ['Pasta gerada que não deve ser versionada', 'arquivo de ignorados']
        ],
        dicas: [
          'Já é do conhecimento do time? Não reescreva.',
          'Pausa curta combina com guardar de lado.'
        ],
        explicacao: 'Cada problema tem a ferramenta certa: revert para história compartilhada, reset para história local, stash para pausas e o arquivo de ignorados para o que não pertence ao repositório.',
        conceitos: ['git.revert', 'git.reset', 'git.stash', 'git.ignore']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-r5',
        tipo: 'predict-output',
        enunciado: 'Depois destes comandos, o que existe na pasta e no histórico?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git stash\ngit reset --soft HEAD~1' },
          {
            tipo: 'tabela',
            titulo: 'Antes dos comandos',
            colunas: ['Item', 'Estado'],
            linhas: [
              ['Último commit', 'Existia e ainda não foi enviado'],
              ['Mudanças da pasta', 'Ainda não commitadas']
            ]
          }
        ],
        opcoes: [
          'As mudanças continuam na máquina: parte na lista do stash e parte preparada para novo commit',
          'Nada sobrou: os dois comandos descartam mudanças',
          'O commit foi enviado para o servidor',
          'A pasta ficou vazia e o histórico perdeu todos os commits'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Nenhum dos dois comandos descarta arquivos.',
          2: 'Enviar é papel do push, que não foi executado.',
          3: 'O reset move um ponteiro; ele não apaga a pasta nem a história inteira.'
        },
        dicas: [
          'stash guarda de lado; soft mantém preparado.',
          'Nenhum dos dois é descartável.'
        ],
        explicacao: 'O stash guarda o trabalho não commitado e o reset soft remove o último commit do histórico mantendo as mudanças preparadas. Nada é descartado.',
        conceitos: ['git.stash', 'git.reset']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-r6',
        tipo: 'find-error',
        enunciado: 'O dev queria impedir que a pasta de compilação continuasse versionada, mas a estratégia dele não resolve. Qual é o erro?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git add .gitignore\ngit commit -m "Atualiza arquivo de ignorados"' },
          {
            tipo: 'codigo',
            linguagem: 'git',
            codigo: 'bin/\nobj/'
          }
        ],
        opcoes: [
          'Se a pasta já está versionada, é preciso tirá-la do acompanhamento além de listá-la no arquivo',
          'O arquivo de ignorados deveria estar na pasta bin',
          'Faltou enviar o commit com git push',
          'Padrões de pasta precisam de asterisco'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O arquivo de ignorados fica na raiz do projeto.',
          2: 'O problema é local: o push apenas publicaria a pasta gerada.',
          3: 'A barra no fim já indica que é uma pasta.'
        },
        dicas: [
          'O arquivo de ignorados não afeta o que já é acompanhado.',
          'Existe uma opção que remove do Git sem apagar da pasta.'
        ],
        explicacao: 'Listar uma pasta já versionada não basta: é preciso removê-la do acompanhamento mantendo os arquivos na pasta.',
        conceitos: ['git.ignore']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-r7',
        tipo: 'scenario',
        enunciado: 'Você precisa experimentar uma correção arriscada sem perder o trabalho atual, que está no meio de uma tarefa.',
        cena: 'A tarefa atual tem mudanças pela metade. O experimento pode não dar certo e você quer poder voltar exatamente para onde estava.',
        opcoes: [
          'Guardar as mudanças com git stash e, no fim, devolver com git stash pop',
          'Commitar as mudanças pela metade e seguir na mesma branch',
          'Descartar as mudanças atuais e começar o experimento do zero',
          'Substituir a branch atual por uma nova sem guardar nada'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Um commit pela metade polui a história da tarefa.',
          2: 'Descartar joga fora o trabalho que você ainda vai terminar.',
          3: 'Trocar de branch sem guardar deixa as mudanças presas na pasta.'
        },
        dicas: [
          'O experimento é temporário; o trabalho atual continua.',
          'Guardar de lado libera a pasta sem perder nada.'
        ],
        explicacao: 'O stash protege o trabalho em andamento enquanto você experimenta, e o pop devolve tudo depois.',
        conceitos: ['git.stash']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-r8',
        tipo: 'scenario',
        enunciado: 'O time percebeu que um arquivo de configuração local entrou no repositório há três commits. Qual é o plano de correção?',
        cena: 'O arquivo ainda existe na pasta de todos e continua sendo commitado sem querer.',
        opcoes: [
          'Removê-lo do acompanhamento, incluí-lo na lista de ignorados e trocar as credenciais que estavam nele',
          'Apagar o arquivo da pasta e seguir trabalhando',
          'Pedir para cada pessoa apagar o arquivo na própria máquina',
          'Deixar como está: o arquivo é pequeno'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Apagar da pasta sem ajustar o acompanhamento faz o Git marcar a exclusão sem resolver a origem.',
          2: 'O arquivo volta no próximo commit de quem não fizer o mesmo.',
          3: 'Arquivo de configuração local não pertence ao repositório; o risco é de vazamento.'
        },
        dicas: [
          'Parar de versionar e impedir novos commits.',
          'Segredo exposto precisa ser trocado.'
        ],
        explicacao: 'A correção tem três partes: tirar do acompanhamento, impedir que volte com o arquivo de ignorados e trocar o que estava exposto.',
        conceitos: ['git.ignore', 'git.repositorio']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-r9',
        tipo: 'write-code',
        enunciado: 'Escreva o comando que devolve o trabalho guardado, removendo-o da lista de itens.',
        placeholder: 'git ...',
        respostasAceitas: [
          'git stash pop',
          'git stash pop;'
        ],
        dicas: [
          'O comando principal é o stash, com uma palavra depois.',
          'Essa palavra é curta: três letras.'
        ],
        explicacao: 'A palavra pop devolve o último trabalho guardado e o remove da lista.',
        conceitos: ['git.stash']
      }
    }
  ]
});
