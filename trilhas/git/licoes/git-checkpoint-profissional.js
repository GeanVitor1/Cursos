Plataforma.registrarLicao({
  id: 'git-checkpoint-profissional',
  trilha: 'git',
  tipo: 'prova',
  titulo: 'Checkpoint final — Git',
  subtitulo: 'Fluxo profissional · Etapa 4',
  duracaoMin: 45,
  xp: 100,
  objetivos: [
    'Consolidar o fluxo diário de sincronização e branches',
    'Aplicar correções, revisão e resolução de conflitos',
    'Demonstrar domínio do fluxo profissional completo'
  ],
  conceitos: ['git.repositorio', 'git.sincronizacao', 'git.branch', 'git.merge', 'git.pr', 'git.review', 'git.conflito', 'git.revert', 'git.reset', 'git.stash', 'git.ignore', 'git.fluxo', 'git.commits', 'git.tags'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova final: Git profissional',
      blocos: [
        { tipo: 'texto', texto: 'São **10 atividades** cobrindo toda a trilha: repositório, sincronização, branches, merge, pull request, code review, conflitos, correções, stash, arquivo de ignorados, fluxos de trabalho, mensagens de commit e versionamento. Não há nota de bloqueio: o resultado mostra o que já está dominado e o que vale revisar.' },
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
        id: 'cp-git-p1',
        tipo: 'multiple-choice',
        enunciado: 'Qual é o fluxo diário completo, do primeiro comando ao envio para o servidor?',
        opcoes: [
          'pull, status, add, commit e push',
          'push, status, add, commit e pull',
          'clone, status, push e commit',
          'add, clone, commit e push'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Enviar antes de trazer o que o time fez costuma resultar em push recusado.',
          2: 'O clone acontece uma vez por projeto, não todos os dias.',
          3: 'O add prepara as mudanças; ele não vem antes de trazer a versão do servidor.'
        },
        dicas: [
          'Traga o que o time enviou antes de trabalhar.',
          'Enviar é sempre o último passo.'
        ],
        explicacao: 'Puxar, conferir, preparar, gravar e enviar: o ciclo diário que mantém a cópia local e o servidor em sincronia.',
        conceitos: ['git.sincronizacao', 'git.repositorio']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-p2',
        tipo: 'order-blocks',
        enunciado: 'Ordene o ciclo de uma tarefa com pull request, do início do trabalho até a branch encerrada.',
        blocos: ['git switch -c feature/cupom', 'git add .', 'git commit -m "Adiciona cupom de desconto"', 'git push origin feature/cupom', 'abrir o pull request', 'code review e ajustes', 'merge na main', 'git branch -d feature/cupom'],
        dicas: [
          'A branch nasce antes do primeiro commit dela.',
          'O review acontece antes do merge.'
        ],
        explicacao: 'Criar a branch, gravar, publicar, abrir o PR, revisar, unir e apagar: o ciclo profissional completo.',
        conceitos: ['git.branch', 'git.pr', 'git.review', 'git.merge', 'git.commits']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-p3',
        tipo: 'predict-output',
        enunciado: 'O que o time vê depois destes comandos?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git switch main\ngit merge feature/cupom\ngit push origin main' },
          {
            tipo: 'tabela',
            titulo: 'Antes dos comandos',
            colunas: ['Branch', 'Estado'],
            linhas: [
              ['feature/cupom', 'Trabalho concluído e enviado'],
              ['main', 'Sem os commits da feature']
            ]
          }
        ],
        opcoes: [
          'A main passa a conter o trabalho e o servidor recebe a versão unida',
          'A feature perde os commits que tinha',
          'O servidor recusa o push porque falta um novo commit',
          'A main continua igual até a branch ser apagada'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O merge não remove commits da branch de origem.',
          2: 'O push da main já unida é o envio normal do fluxo.',
          3: 'Apagar a branch é um passo separado e não afeta o resultado do merge.'
        },
        dicas: [
          'O merge traz os commits para a branch atual.',
          'O push publica o resultado no servidor.'
        ],
        explicacao: 'Depois do merge, a main contém os commits da feature e o push publica essa versão no servidor.',
        conceitos: ['git.merge', 'git.branch', 'git.sincronizacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-p4',
        tipo: 'code-review',
        autor: 'Carla',
        ticket: {
          numero: 'PR #355',
          titulo: 'Ajusta desconto do cupom',
          corpo: 'O cupom fixo agora é somado ao total do pedido. Conferi com um pedido de exemplo.'
        },
        diff: [
          '@@ public decimal CalcularTotal() @@',
          '     decimal total = 0;',
          '+    total = total + pedido.Cupom;',
          '     return total;'
        ],
        enunciado: 'Qual comentário de review é o mais adequado?',
        opcoes: [
          'Perguntar se o cupom representa um valor fixo e sugerir um caso de conferência para cupom maior que o total',
          'Aprovar sem comentários, porque o código ficou curto',
          'Comentar que o time deveria parar de usar desconto',
          'Pedir para remover o cupom do cálculo'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Código curto não significa correto: cupom maior que o total é um caso de borda importante.',
          2: 'Mudar a regra de negócio não é papel do review.',
          3: 'Remover o desconto contradiz o objetivo do pull request.'
        },
        dicas: [
          'Pense em cupom de valor maior que o pedido.',
          'Um bom comentário levanta o caso e pede uma decisão.'
        ],
        explicacao: 'O review levanta um caso de borda real e pede uma conferência, antes que o problema chegue à linha principal.',
        conceitos: ['git.review', 'git.pr']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-p5',
        tipo: 'find-error',
        enunciado: 'O merge foi interrompido por um conflito. O dev rodou os comandos abaixo, mas nada foi concluído. Qual é o erro?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git add src/Total.cs\ngit commit -m "Finaliza merge"' },
          {
            tipo: 'codigo',
            linguagem: 'git',
            codigo: '<<<<<<< HEAD\n    total = total - desconto;\n=======\n    total = total * 0.90;\n>>>>>>> feature/desconto'
          }
        ],
        opcoes: [
          'Os marcadores do conflito continuam no arquivo; é preciso decidir e apagá-los antes do add',
          'O commit deveria vir antes do add',
          'Faltou apagar a branch feature/desconto',
          'O conflito exige um novo clone do projeto'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A ordem correta é editar, apagar os marcadores, rodar add e concluir com commit.',
          2: 'A branch de origem é apagada depois que o merge termina.',
          3: 'Clonar de novo não resolve nada e ainda descarta o trabalho local.'
        },
        dicas: [
          'O arquivo precisa estar limpo, sem marcadores.',
          'Marcadores significam decisão pendente.'
        ],
        explicacao: 'Resolver um conflito é decidir o resultado final, apagar os marcadores e só então preparar o arquivo e concluir o merge.',
        conceitos: ['git.conflito', 'git.merge']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-p6',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre desfazer e guardar mudanças.',
        afirmacoes: [
          { texto: 'git revert cria um commit novo que desfaz um commit anterior.', correta: true, explicacao: 'A história é preservada, com o erro e a correção registrados.' },
          { texto: 'git reset --hard descarta as mudanças do commit alvo.', correta: true, explicacao: 'É o modo mais forte; a pasta volta ao estado do commit alvo.' },
          { texto: 'O stash envia o trabalho temporário para o servidor.', correta: false, explicacao: 'O stash é local: ele guarda as mudanças na sua máquina.' }
        ],
        dicas: [
          'O revert acrescenta um commit; o reset move o ponteiro; o stash guarda o trabalho na máquina.',
          'Cuidado com o modo que descarta.'
        ],
        explicacao: 'Revert preserva a história, reset reescreve a história local conforme o modo e o stash guarda mudanças na máquina.',
        conceitos: ['git.revert', 'git.reset', 'git.stash']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-p7',
        tipo: 'scenario',
        enunciado: 'Antes de trocar de branch para uma correção urgente, você precisa decidir o que fazer com as mudanças pela metade que estão na pasta.',
        cena: 'As mudanças ainda não fazem sentido sozinhas e não foram commitadas. A correção urgente precisa sair agora.',
        opcoes: [
          'Guardar as mudanças com git stash antes de trocar de branch',
          'Commitar as mudanças pela metade com uma mensagem genérica',
          'Descartar as mudanças e refazer o trabalho depois',
          'Pedir para o colega fazer a correção urgente'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Um commit pela metade polui a história e pode quebrar a linha principal.',
          2: 'Descartar joga fora trabalho que ainda vai ser usado.',
          3: 'A correção é sua; o stash libera a pasta sem perder nada.'
        },
        dicas: [
          'A pausa curta é o caso de uso do stash.',
          'Nada de trabalho pode ser perdido.'
        ],
        explicacao: 'O stash guarda o trabalho temporário, libera a pasta para a correção e devolve tudo depois com um pop.',
        conceitos: ['git.stash', 'git.branch']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-p8',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada situação à ferramenta ou prática mais adequada.',
        pares: [
          ['Segredo que nunca pode ser versionado', 'Listar no arquivo .gitignore'],
          ['Commit com defeito já enviado ao servidor', 'revert'],
          ['Commit local com mensagem errada', 'reset com modo cauteloso'],
          ['Trabalho pela metade antes de trocar de branch', 'stash']
        ],
        dicas: [
          'O que já é do time não se reescreve.',
          'Segredos ficam fora do repositório antes do primeiro commit.'
        ],
        explicacao: 'Cada problema tem a ferramenta certa: ignorar segredos, reverter história compartilhada, reescrever história local e guardar pausas.',
        conceitos: ['git.ignore', 'git.revert', 'git.reset', 'git.stash']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-p9',
        tipo: 'scenario',
        enunciado: 'O time entrega toda semana, tem uma única linha principal e usa pull requests pequenos. Um colega sugere adotar o modelo com duas linhas permanentes e branches de preparação de entrega.',
        cena: 'A entrega atual é contínua e o time tem poucas pessoas. As branches costumam durar menos de dois dias.',
        opcoes: [
          'A sugestão adicionaria cerimônia demais para o ritmo e o tamanho do time',
          'A sugestão é sempre melhor porque tem mais controle',
          'O time atual não tem fluxo de trabalho definido',
          'Mais linhas permanentes deixam a entrega contínua mais rápida'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Controle extra tem custo: mais passos para uma entrega que já é rápida.',
          2: 'Linha principal com pull request pequeno é um fluxo definido, sim.',
          3: 'Camadas extras tendem a atrasar entregas frequentes.'
        },
        dicas: [
          'Compare o fluxo sugerido com o ritmo do time.',
          'Entrega semanal combina com branches curtas.'
        ],
        explicacao: 'O fluxo acompanha o contexto: para entregas frequentes e times pequenos, branches curtas na linha principal costumam ser a melhor escolha.',
        conceitos: ['git.fluxo', 'git.branch', 'git.pr']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-p10',
        tipo: 'write-code',
        enunciado: 'A versão atual do projeto é v2.1.3 e uma funcionalidade nova e compatível acabou de ser concluída. Escreva os dois comandos que criam a tag anotada da próxima versão e a enviam para o servidor.',
        esqueleto: 'git tag -a ___ -m "Adiciona relatórios"\ngit push origin ___',
        respostasAceitas: [
          'git tag -a v2.2.0 -m "adiciona relatorios" git push origin v2.2.0',
          'git tag -a v2.2.0 -m "adiciona relatorios"; git push origin v2.2.0'
        ],
        dicas: [
          'Funcionalidade nova sobe o número do meio.',
          'A tag criada localmente precisa ser enviada pelo nome.'
        ],
        explicacao: 'Funcionalidade compatível sobe o MINOR: v2.1.3 vira v2.2.0. A tag anotada é criada com `git tag -a` e enviada com `git push origin v2.2.0`.',
        conceitos: ['git.tags']
      }
    }
  ]
});
