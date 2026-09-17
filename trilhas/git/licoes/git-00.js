Plataforma.registrarLicao({
  id: 'git-00',
  trilha: 'git',
  tipo: 'licao',
  titulo: 'clone, add e commit',
  subtitulo: 'Fundamentos · Etapa 1',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Explicar o que é um repositório e o que ele guarda',
    'Trazer um projeto completo para a sua máquina com git clone',
    'Preparar mudanças com git add e gravar com git commit'
  ],
  conceitos: ['git.repositorio'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Um projeto com memória',
      introduz: ['git.repositorio'],
      blocos: [
        { tipo: 'retoma', conceito: 'terminal.git', texto: 'No terminal você viu uma **prévia** de `git status`, `git add`, `git commit` e `git push`. Agora cada um desses comandos ganha contexto e vira rotina de trabalho.' },
        { tipo: 'texto', texto: 'Um **repositório** é a pasta do projeto com um histórico: cada mudança relevante fica registrada com autor, data e uma mensagem explicando o motivo. Se algo quebrar, dá para voltar ao ponto anterior com segurança.' },
        { tipo: 'conceito', id: 'git.repositorio', titulo: 'Repositório', texto: 'O projeto versionado: clone traz uma cópia, add prepara as mudanças e commit grava um ponto na história.', exemplo: 'git clone, git add, git commit' },
        { tipo: 'destaque', texto: 'Backup guarda o arquivo de hoje. Repositório guarda **a história** do projeto: quem mudou, quando e por quê.' },
        { tipo: 'trabalho', texto: 'Chegar em um time novo e clonar o repositório é o primeiro comando do dia. Todo o resto do trabalho começa a partir dessa cópia local.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git00-a1',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'O que um repositório Git guarda além dos arquivos atuais do projeto?',
        opcoes: [
          'O histórico de mudanças: cada commit com autor, data e mensagem',
          'Apenas uma cópia de segurança dos arquivos de hoje',
          'As senhas e os acessos de cada pessoa do time',
          'Uma lista de tarefas do projeto'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Uma cópia dos arquivos de hoje é só um backup: sem a história, não dá para voltar a um ponto anterior.',
          2: 'Acessos ficam em ferramentas próprias. O repositório guarda o histórico do código.',
          3: 'Tarefas ficam no gerenciador do time. O repositório guarda mudanças de código.'
        },
        dicas: [
          'Pense no que permite voltar a uma versão anterior.',
          'Cada gravação no repositório tem autor, data e mensagem.'
        ],
        explicacao: 'O repositório guarda o histórico completo: cada commit registra o que mudou, quem mudou, quando e por quê.',
        conceitos: ['git.repositorio']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'clone: a cópia completa do projeto',
      blocos: [
        { tipo: 'texto', texto: 'O projeto normalmente fica em um servidor (como o GitHub) e a sua máquina recebe uma cópia completa com o comando `git clone`. A cópia já vem com todo o histórico — não é só o código de hoje.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'Trazer o projeto do servidor',
          codigo: 'git clone https://github.com/mercado-aurora/painel.git\ncd painel'
        },
        {
          tipo: 'tabela',
          titulo: 'Os comandos do dia a dia',
          colunas: ['Comando', 'O que faz'],
          linhas: [
            ['git clone <endereço>', 'Traz uma cópia do projeto com todo o histórico'],
            ['git status', 'Mostra o que mudou desde o último commit'],
            ['git add arquivo', 'Prepara as mudanças escolhidas para o próximo commit'],
            ['git commit -m "mensagem"', 'Grava um ponto na história com uma mensagem']
          ],
          legenda: 'O clone acontece uma vez por projeto; status, add e commit se repetem todos os dias.'
        },
        { tipo: 'nota', tom: 'info', texto: 'O clone já configura o endereço do servidor por trás dos panos: é a chamada `origin`. Você vai usar esse nome na lição de sincronização.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git00-a2',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete o comando que traz para a sua máquina uma cópia completa do projeto do time.',
        codigo: '{{1}} clone https://github.com/mercado-aurora/painel.git',
        lacunas: [['git']],
        dicas: [
          'Todo comando do Git começa com a mesma palavra.',
          'São três letras.'
        ],
        explicacao: '`git clone` cria a pasta do projeto na sua máquina com todo o histórico. Depois é só entrar nela com `cd painel`.',
        conceitos: ['git.repositorio']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'status e add: escolhendo o que gravar',
      blocos: [
        { tipo: 'texto', texto: 'Depois de alterar algo, o primeiro comando é `git status`: ele mostra quais arquivos mudaram e o que está pronto para o próximo commit.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'Vendo e preparando as mudanças',
          codigo: 'git status\ngit add src/Pedido.cs\ngit add .'
        },
        { tipo: 'texto', texto: 'O `git add` coloca as mudanças na **área de preparação** (staging): é a lista do que vai entrar no próximo commit. O ponto (`.`) significa "todos os arquivos da pasta e das subpastas".' },
        { tipo: 'nota', tom: 'atencao', texto: 'Um commit não varre o projeto inteiro sozinho: ele grava exatamente o que está na área de preparação. Sem `git add`, não há o que gravar.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git00-a3',
        tipo: 'predict-output',
        dimensao: 'aplicacao',
        enunciado: 'O que entra no próximo commit depois destes comandos?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git add src/Total.cs' },
          {
            tipo: 'tabela',
            titulo: 'Mudanças no projeto',
            colunas: ['Arquivo', 'Situação'],
            linhas: [
              ['src/Total.cs', 'Alterado'],
              ['README.md', 'Alterado'],
              ['src/Produto.cs', 'Sem mudanças']
            ]
          }
        ],
        opcoes: [
          'Apenas src/Total.cs',
          'src/Total.cs e README.md',
          'Todos os arquivos alterados',
          'Nenhum arquivo: falta o commit'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O README não passou pelo git add: ele fica para um próximo commit.',
          2: 'O Git grava apenas o que foi preparado, não tudo o que mudou.',
          3: 'O commit virá depois, mas o add já definiu o que ele vai gravar.'
        },
        dicas: [
          'O add foi feito apenas para um arquivo.',
          'A área de preparação é a lista do que entra no commit.'
        ],
        explicacao: 'Só o que passa pelo `git add` entra na área de preparação. Como apenas um arquivo foi adicionado, o commit grava só essa mudança.',
        conceitos: ['git.repositorio']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git00-a4',
        tipo: 'order-blocks',
        dimensao: 'ordenacao',
        enunciado: 'Ordene os comandos do primeiro contato com um projeto até a gravação da primeira mudança.',
        blocos: ['git clone https://github.com/mercado-aurora/painel.git', 'cd painel', 'git add .', 'git commit -m "Corrige total do pedido"'],
        dicas: [
          'Primeiro o projeto vem para a máquina; depois você entra na pasta.',
          'O add prepara; o commit grava.'
        ],
        explicacao: 'A sequência é: clonar, entrar na pasta, preparar as mudanças com add e gravar com commit.',
        conceitos: ['git.repositorio']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'commit: um ponto na história',
      blocos: [
        { tipo: 'texto', texto: 'O `git commit` grava um ponto na história com um identificador próprio, o autor, a data e a mensagem que você escreveu. É esse ponto que permite voltar atrás depois.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'Gravando a mudança',
          codigo: 'git commit -m "Corrige total do pedido com cupom"\n\n# -m = message (mensagem)\n# sem -m, o Git abre um editor de texto para você escrever'
        },
        { tipo: 'texto', texto: 'A mensagem é para quem vai ler o histórico meses depois — inclusive você. Escreva o que a mudança resolve, não apenas "ajustes".' },
        { tipo: 'nota', tom: 'sucesso', texto: 'Fluxo completo do dia: `git status` → `git add` → `git commit -m`. Três comandos que se repetem dezenas de vezes por semana.' },
        { tipo: 'trabalho', texto: 'Em uma revisão, o histórico de commits é a primeira coisa que o time lê. Commits pequenos e com mensagens claras contam a história do projeto sem precisar abrir arquivo por arquivo.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git00-a5',
        tipo: 'find-error',
        dimensao: 'aplicacao',
        enunciado: 'O commit abaixo não gravou nada, mesmo com arquivos alterados no projeto. Por quê?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git commit -m "Corrige total do pedido"' }
        ],
        opcoes: [
          'Faltou o `git add`: sem mudanças preparadas, o commit fica vazio',
          'O `git commit` precisa vir antes do `git status`',
          'A mensagem precisa estar em inglês',
          'Falta o `git push` antes do commit'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O status apenas informa o que mudou; ele não prepara nada.',
          2: 'A mensagem pode estar em português: ela descreve a mudança para o time.',
          3: 'O push envia commits que já existem; sem commit, não há o que enviar.'
        },
        dicas: [
          'O commit não varre a pasta sozinho.',
          'Existe uma etapa que escolhe as mudanças antes do commit.'
        ],
        explicacao: 'O `git add` é quem coloca as mudanças na área de preparação. Sem ele, o commit não tem o que gravar.',
        conceitos: ['git.repositorio']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git00-a6',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Você corrigiu dois arquivos do projeto, mas apenas um deles pertence à tarefa atual. O outro é um rascunho que ainda não está pronto.',
        enunciado: 'Qual é o fluxo mais seguro para gravar só a correção?',
        opcoes: [
          'Rodar git status, preparar apenas o arquivo da correção com git add e gravar com git commit',
          'Rodar git add . e gravar tudo com um único commit',
          'Gravar tudo e depois apagar o rascunho com um novo commit',
          'Esperar o rascunho ficar pronto para gravar os dois juntos'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O add com ponto prepara tudo, inclusive o rascunho que não pertence à tarefa.',
          2: 'Dois commits para esconder um erro deixam o histórico confuso.',
          3: 'A correção pode ser gravada agora; o rascunho segue local e entra depois.'
        },
        dicas: [
          'O add aceita um arquivo por vez.',
          'Você escolhe o que entra na área de preparação.'
        ],
        explicacao: 'Preparar apenas o arquivo certo mantém o commit focado e o histórico compreensível. O rascunho continua na sua máquina até estar pronto.',
        conceitos: ['git.repositorio']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Repository',
      blocos: [
        { tipo: 'texto', texto: 'Três palavras que aparecem em toda documentação e em todo projeto novo:' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (3)',
          pares: [
            ['repository', 'repositório'],
            ['history', 'histórico'],
            ['clone', 'clonar']
          ]
        },
        { tipo: 'ingles', frase: 'Clone the repository to see the history.', traducao: 'Clone o repositório para ver o histórico.' },
        { tipo: 'nota', tom: 'info', texto: '**repository** (repositório) é a origem da abreviação `repo`, que você vai encontrar em conversas e ferramentas.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git00-a7',
        tipo: 'write-code',
        dimensao: 'construcao',
        enunciado: 'Clone the repository to see the history.',
        placeholder: 'git ...',
        respostasAceitas: [
          'git clone https://github.com/mercado-aurora/painel.git',
          'git clone https://github.com/mercado-aurora/painel'
        ],
        dicas: [
          'repository = repositório; history = histórico.',
          'O comando que traz uma cópia completa é o clone.'
        ],
        explicacao: 'Traduzindo: "clone the repository to see the history" = clone o repositório para ver o histórico. `git clone <endereço>` traz a cópia completa do projeto.',
        conceitos: ['git.repositorio']
      }
    }
  ]
});
