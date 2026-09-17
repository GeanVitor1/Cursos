Plataforma.registrarLicao({
  id: 'git-checkpoint-fundamentos',
  trilha: 'git',
  tipo: 'prova',
  titulo: 'Checkpoint — Fundamentos',
  subtitulo: 'Fundamentos · Etapa 3',
  duracaoMin: 30,
  xp: 100,
  objetivos: [
    'Reconhecer o repositório, o clone e a área de preparação',
    'Gravar mudanças com add e commit',
    'Enviar e trazer commits com push e pull no fluxo certo'
  ],
  conceitos: ['git.repositorio', 'git.sincronizacao', 'terminal.git'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova de nível: Fundamentos',
      blocos: [
        { tipo: 'texto', texto: 'São **9 atividades** cobrindo o que você estudou até aqui: repositório, clone, status, add, commit e sincronização com push e pull. Não há nota de bloqueio: o resultado mostra o que já está dominado e o que vale revisar.' },
        {
          tipo: 'lista',
          itens: [
            'Leia cada cenário como se fosse um dia real de trabalho.',
            'Pode usar dicas — o resultado continua contando.',
            'Ao final, você verá seu domínio conceito por conceito.'
          ]
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-f1',
        tipo: 'multiple-choice',
        enunciado: 'Por que o repositório é diferente de uma pasta comum com arquivos?',
        opcoes: [
          'Porque guarda o histórico: cada commit tem autor, data e mensagem',
          'Porque ocupa menos espaço no computador',
          'Porque impede alterações nos arquivos',
          'Porque envia os arquivos automaticamente para o servidor'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O tamanho não define um repositório: o que importa é a história registrada.',
          2: 'As alterações continuam permitidas; elas passam a ser registradas.',
          3: 'O envio é feito com git push, não automaticamente.'
        },
        dicas: [
          'Pense no que permite voltar a uma versão anterior.',
          'Cada gravação tem autor, data e mensagem.'
        ],
        explicacao: 'O repositório é a pasta com memória: o histórico de commits permite entender e desfazer mudanças.',
        conceitos: ['git.repositorio']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-f2',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre trazer o projeto e preparar mudanças.',
        afirmacoes: [
          { texto: 'git clone traz uma cópia do projeto com todo o histórico.', correta: true, explicacao: 'A cópia vem completa: arquivos e commits.' },
          { texto: 'Depois do clone, é preciso configurar o endereço do servidor manualmente.', correta: false, explicacao: 'O clone já configura o servidor com o apelido origin.' },
          { texto: 'git add escolhe quais mudanças entram no próximo commit.', correta: true, explicacao: 'O add coloca as mudanças na área de preparação.' }
        ],
        dicas: [
          'O clone é completo, inclusive na configuração.',
          'O add é a etapa de seleção.'
        ],
        explicacao: 'O clone já deixa o projeto pronto para trabalhar, e o add define a lista do próximo commit.',
        conceitos: ['git.repositorio']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-f3',
        tipo: 'fill-code',
        enunciado: 'Complete para preparar todas as mudanças e gravar o ponto na história.',
        codigo: 'git {{1}} .\ngit {{2}} -m "Valida estoque negativo"',
        lacunas: [['add'], ['commit']],
        dicas: [
          'Preparar vem antes de gravar.',
          'Gravar um ponto na história é o commit.'
        ],
        explicacao: '`git add .` prepara tudo e `git commit -m` grava o ponto na história com a mensagem.',
        conceitos: ['git.repositorio']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-f4',
        tipo: 'predict-output',
        enunciado: 'O que o próximo commit vai gravar?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git add src/Pedido.cs\ngit add src/Cliente.cs' },
          {
            tipo: 'tabela',
            titulo: 'Mudanças no projeto',
            colunas: ['Arquivo', 'Situação'],
            linhas: [
              ['src/Pedido.cs', 'Alterado e preparado'],
              ['src/Cliente.cs', 'Alterado e preparado'],
              ['README.md', 'Alterado, não preparado']
            ]
          }
        ],
        opcoes: [
          'Pedido.cs e Cliente.cs',
          'Os três arquivos',
          'Apenas Pedido.cs',
          'Nenhum arquivo: falta o commit'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O README não foi adicionado à área de preparação.',
          2: 'Cliente.cs também passou pelo add.',
          3: 'Os dois arquivos adicionados entram no commit.'
        },
        dicas: [
          'O que não passou pelo add fica de fora.',
          'Conte os arquivos adicionados.'
        ],
        explicacao: 'A área de preparação tem dois arquivos. O commit grava exatamente essa lista.',
        conceitos: ['git.repositorio']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-f5',
        tipo: 'order-blocks',
        enunciado: 'Ordene o fluxo diário, do primeiro comando até o envio para o servidor.',
        blocos: ['git pull origin main', 'git status', 'git add .', 'git commit -m "Corrige frete"', 'git push origin main'],
        dicas: [
          'Puxar o que o time enviou vem antes de começar a trabalhar.',
          'Gravar vem antes de enviar.'
        ],
        explicacao: 'O fluxo seguro é: puxar, conferir, preparar, gravar e enviar.',
        conceitos: ['git.sincronizacao', 'git.repositorio']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-f6',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada comando ao seu papel no fluxo.',
        pares: [
          ['git status', 'Mostra o que mudou e o que está preparado'],
          ['git add', 'Coloca mudanças na área de preparação'],
          ['git commit', 'Grava um ponto na história local'],
          ['git push', 'Envia os commits para o servidor']
        ],
        dicas: [
          'Quem só informa não altera nada.',
          'O push é o último passo do dia.'
        ],
        explicacao: 'Cada comando tem um papel: informar, preparar, gravar e enviar.',
        conceitos: ['git.repositorio', 'git.sincronizacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-f7',
        tipo: 'find-error',
        enunciado: 'O dev queria enviar a correção para o servidor, mas o comando não faz o que ele espera. Qual é o erro?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git add .\ngit push' }
        ],
        opcoes: [
          'Faltou o commit: o push envia commits, e nenhum foi criado',
          'O push deveria vir antes do add',
          'Faltou o git status antes do push',
          'O push não existe; o correto é git commit --send'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A ordem é add, commit e push: o push precisa de um commit.',
          2: 'O status informa; ele não cria o commit que falta.',
          3: 'O comando de enviar é o git push.'
        },
        dicas: [
          'O push não olha para a pasta de trabalho.',
          'Entre o add e o push existe uma etapa de gravação.'
        ],
        explicacao: 'Sem commit, não há nada para enviar. O push envia pontos da história que já foram gravados.',
        conceitos: ['git.repositorio', 'git.sincronizacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-f8',
        tipo: 'scenario',
        cena: 'Segunda-feira de manhã. O time enviou três commits na sexta e você vai continuar uma tarefa no mesmo arquivo em que o colega mexeu.',
        enunciado: 'Qual é o primeiro comando antes de começar a alterar?',
        opcoes: [
          'git pull origin main, para trabalhar sobre a versão mais recente',
          'git push origin main, para garantir que o servidor está atualizado',
          'git clone do projeto de novo em outra pasta',
          'git commit, para marcar o início do dia'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O push é para enviar; o servidor já tem os commits do colega.',
          2: 'Clonar de novo duplica o trabalho e não traz o que você já tem.',
          3: 'Não há mudanças para gravar ainda.'
        },
        dicas: [
          'Você precisa da versão mais recente do arquivo.',
          'Quem traz os commits dos colegas é o pull.'
        ],
        explicacao: 'Puxar antes de começar evita retrabalho e o susto de descobrir diferenças no fim do dia.',
        conceitos: ['git.sincronizacao']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-git-f9',
        tipo: 'write-code',
        enunciado: 'Escreva os três comandos do fechamento do dia: preparar tudo, gravar a mudança do frete e enviar para a linha principal do servidor.',
        esqueleto: 'git ___\ngit ___ -m "Ajusta cálculo de frete"\ngit ___ origin main',
        respostasAceitas: [
          'git add . git commit -m "ajusta calculo de frete" git push origin main',
          'git add .; git commit -m "ajusta calculo de frete"; git push origin main'
        ],
        dicas: [
          'Preparar, gravar e enviar: nessa ordem.',
          'A mensagem vai entre aspas depois do -m.'
        ],
        explicacao: 'A resposta é preparar tudo, gravar a mudança do frete e enviar para a linha principal. Comandos separados por ponto e vírgula ou um por linha funcionam.',
        conceitos: ['git.repositorio', 'git.sincronizacao']
      }
    }
  ]
});
