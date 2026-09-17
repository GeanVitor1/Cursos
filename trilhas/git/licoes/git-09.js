Plataforma.registrarLicao({
  id: 'git-09',
  trilha: 'git',
  tipo: 'licao',
  titulo: '.gitignore bem feito',
  subtitulo: 'Corrigindo erros · Etapa 4',
  duracaoMin: 30,
  xp: 30,
  objetivos: [
    'Decidir o que não deve entrar no repositório',
    'Escrever padrões no arquivo .gitignore',
    'Evitar que arquivos gerados e segredos cheguem ao servidor'
  ],
  conceitos: ['git.ignore', 'git.repositorio'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O que não pertence ao repositório',
      introduz: ['git.ignore'],
      blocos: [
        { tipo: 'retoma', conceito: 'git.repositorio', texto: 'O repositório guarda a história do **código**. Mas nem tudo o que aparece na pasta do projeto faz sentido versionar.' },
        { tipo: 'texto', texto: 'O `.gitignore` é o arquivo que lista o que o Git deve ignorar: pastas geradas pela compilação, arquivos de configuração local, registros de execução e, principalmente, segredos.' },
        { tipo: 'lista', itens: [
          'Pastas geradas: `bin/` e `obj/` são recriadas a cada compilação.',
          'Arquivos locais: preferências do editor e arquivos temporários.',
          'Segredos: senhas, chaves de acesso e arquivos de ambiente com dados reais.',
          'Registros: arquivos de log que crescem sozinhos.'
        ] },
        { tipo: 'conceito', id: 'git.ignore', titulo: '.gitignore', texto: 'O arquivo que lista o que o Git deve ignorar: binários, segredos, pastas geradas.', exemplo: 'bin/, obj/, .env' },
        { tipo: 'nota', tom: 'atencao', texto: 'Segredo que foi commitado fica na história para sempre e precisa ser trocado — não basta apagar o arquivo depois. A proteção acontece antes do primeiro commit.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git09-a1',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'Por que uma senha **não** deve entrar no repositório, mesmo em um projeto privado?',
        opcoes: [
          'Porque o histórico guarda tudo: qualquer pessoa com acesso ao repositório vê o segredo',
          'Porque ocupa espaço demais',
          'Porque o Git recusa arquivos com texto secreto',
          'Porque senhas mudam todos os dias'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O tamanho não é o problema: o risco é o conteúdo ficar registrado na história.',
          2: 'O Git não analisa o conteúdo para bloquear segredos.',
          3: 'Mesmo uma senha estável continua sendo um segredo que não pertence ao repositório.'
        },
        dicas: [
          'A história do repositório é compartilhada com o time.',
          'O que foi commitado fica registrado.'
        ],
        explicacao: 'Tudo o que entra em um commit fica no histórico. Um segredo commitado vaza para quem tem acesso ao repositório e continua lá mesmo depois de apagado.',
        conceitos: ['git.ignore']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Padrões do arquivo',
      blocos: [
        { tipo: 'texto', texto: 'Cada linha do `.gitignore` é um padrão. A barra no fim indica pasta, o asterisco representa qualquer nome e a exclamação libera um arquivo que seria ignorado por outra regra.' },
        {
          tipo: 'codigo',
          linguagem: 'git',
          titulo: '.gitignore de um projeto .NET',
          codigo: 'bin/\nobj/\n*.log\n.env\n\n# exceção: este arquivo de exemplo deve ser versionado\n!exemplo.env'
        },
        {
          tipo: 'tabela',
          titulo: 'Lendo os padrões',
          colunas: ['Padrão', 'Ignora'],
          linhas: [
            ['bin/', 'A pasta bin e todo o seu conteúdo'],
            ['obj/', 'A pasta obj, gerada na compilação'],
            ['*.log', 'Qualquer arquivo terminado em .log'],
            ['.env', 'O arquivo de configuração local com segredos'],
            ['!exemplo.env', 'Libera este arquivo, mesmo com regra anterior']
          ],
          legenda: 'Padrões simples cobrem a maior parte dos casos.'
        },
        { tipo: 'nota', tom: 'info', texto: 'Um projeto costuma ter também o arquivo de exemplo, sem valores reais, para o time saber quais configurações existem.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git09-a2',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete o arquivo para ignorar as pastas geradas na compilação.',
        codigo: '{{1}}\n{{2}}\n*.log\n.env',
        lacunas: [['bin/', 'bin', '/bin/'], ['obj/', 'obj', '/obj/']],
        dicas: [
          'As duas pastas nascem da compilação do projeto .NET.',
          'A barra no fim indica pasta.'
        ],
        explicacao: 'As pastas bin e obj são geradas na compilação: elas não devem ser versionadas porque são recriadas a cada build.',
        conceitos: ['git.ignore', 'git.repositorio']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git09-a3',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada padrão do arquivo ao que ele ignora.',
        pares: [
          ['bin/', 'A pasta de saída da compilação'],
          ['*.log', 'Arquivos de registro gerados em execução'],
          ['.env', 'O arquivo com segredos do ambiente local'],
          ['!exemplo.env', 'Uma exceção: este arquivo continua versionado']
        ],
        dicas: [
          'O asterisco representa qualquer nome.',
          'A exclamação cria uma exceção.'
        ],
        explicacao: 'Cada linha é um padrão simples: pasta, tipo de arquivo, arquivo específico e exceção.',
        conceitos: ['git.ignore']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Quando o arquivo já foi commitado',
      blocos: [
        { tipo: 'texto', texto: 'Adicionar um arquivo ao `.gitignore` só funciona enquanto o Git ainda não o acompanha. Se ele já foi commitado, é preciso tirá-lo do acompanhamento também — o arquivo continua na sua pasta, mas deixa de ser versionado.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: 'Parando de acompanhar um arquivo',
          codigo: 'git rm --cached appsettings.Development.json\ngit commit -m "Remove configuração local do versionamento"'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'O `--cached` remove apenas do Git; o arquivo permanece na pasta. Sem essa opção, o `rm` apagaria o arquivo de verdade.' },
        { tipo: 'trabalho', texto: 'Todo projeto profissional começa com um `.gitignore` adequado. É a diferença entre um repositório limpo e uma pasta com milhares de arquivos gerados misturados ao código.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git09-a4',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Um dev commitou por engano um arquivo com a senha do banco local. Ele apagou o arquivo, fez um novo commit e adicionou o nome ao arquivo de ignorados.',
        enunciado: 'Qual é a avaliação correta da situação?',
        opcoes: [
          'O segredo continua na história e precisa ser trocado, mesmo depois de apagado',
          'O problema está resolvido: o arquivo não existe mais',
          'Basta apagar a pasta do projeto e clonar de novo',
          'O arquivo de ignorados apaga automaticamente os commits antigos'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Apagar em um commit novo não remove o conteúdo dos commits anteriores.',
          2: 'Clonar de novo traz o mesmo histórico, com o segredo dentro.',
          3: 'O arquivo de ignorados só afeta arquivos que ainda não são acompanhados.'
        },
        dicas: [
          'A história guarda cada commit.',
          'Segredo exposto precisa ser substituído.'
        ],
        explicacao: 'O segredo fica registrado nos commits antigos do histórico compartilhado. Além de parar de versioná-lo, é preciso trocar a senha.',
        conceitos: ['git.ignore', 'git.repositorio'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Ignore',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras que aparecem no nome e no propósito do arquivo:' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['ignore', 'ignorar'],
            ['secret', 'segredo']
          ]
        },
        { tipo: 'ingles', frase: 'Ignore the secret files.', traducao: 'Ignore os arquivos de segredos.' },
        { tipo: 'nota', tom: 'info', texto: 'O nome do arquivo vem daí: **gitignore** é o "git, ignore isto".' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git09-a5',
        tipo: 'interpret-code',
        dimensao: 'aplicacao',
        enunciado: 'Ignore the secret files.',
        opcoes: [
          'Ignore os arquivos de segredos',
          'Envie os arquivos de segredos',
          'Apague os arquivos de segredos',
          'Copie os arquivos de segredos para o servidor'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Enviar segredos para o servidor é exatamente o que se quer evitar.',
          2: 'Ignorar mantém o arquivo local; a frase não fala de apagar.',
          3: 'Copiar para o servidor é o risco que o arquivo de ignorados previne.'
        },
        dicas: [
          'ignore quer dizer ignorar.',
          'secret files são os arquivos de segredos.'
        ],
        explicacao: 'A frase pede que os arquivos com segredos fiquem de fora do repositório.',
        conceitos: ['git.ignore']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'git09-a6',
        tipo: 'predict-output',
        dimensao: 'aplicacao',
        enunciado: 'Com este arquivo de ignorados, quais arquivos o Git deixa de acompanhar?',
        contexto: [
          { tipo: 'codigo', linguagem: 'git', codigo: 'bin/\nobj/\n*.log\n.env' },
          {
            tipo: 'tabela',
            titulo: 'Arquivos na pasta',
            colunas: ['Arquivo', 'Situação'],
            linhas: [
              ['bin/Debug/app.dll', 'Gerado na compilação'],
              ['src/Pedido.cs', 'Código-fonte do projeto'],
              ['.env', 'Configuração local'],
              ['docs/manual.pdf', 'Documentação do projeto']
            ]
          }
        ],
        opcoes: [
          'bin/Debug/app.dll e o arquivo de configuração local',
          'Apenas o arquivo de configuração local',
          'Todos os arquivos da pasta',
          'Apenas o código-fonte do projeto'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A pasta bin também está na lista de ignorados.',
          2: 'Código-fonte e documentação continuam versionados.',
          3: 'O código-fonte é justamente o que deve ser versionado.'
        },
        dicas: [
          'Conte quantos itens da tabela batem com os padrões.',
          'Código e documentação ficam de fora das regras.'
        ],
        explicacao: 'A pasta bin e o arquivo de ambiente batem com os padrões e ficam fora; o código-fonte e a documentação continuam no repositório.',
        conceitos: ['git.ignore', 'git.repositorio']
      }
    }
  ]
});
