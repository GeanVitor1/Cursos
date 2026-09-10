Plataforma.registrarLicao({
  id: 'terminal-00',
  trilha: 'terminal',
  tipo: 'licao',
  titulo: 'Os comandos que você usa todos os dias',
  subtitulo: 'Terminal · Etapa 0',
  duracaoMin: 30,
  xp: 30,
  objetivos: [
    'Navegar entre pastas no terminal',
    'Rodar um projeto .NET',
    'Reconhecer os comandos Git e os que virão em Docker e npm'
  ],
  conceitos: ['terminal.comandos', 'terminal.dotnet', 'terminal.git', 'terminal.docker', 'terminal.npm'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Por que o terminal aparece em toda vaga',
      blocos: [
        { tipo: 'texto', texto: 'O terminal é uma forma de conversar com o computador por comandos em vez de cliques. Ele aparece quando você precisa rodar, testar, versionar ou publicar um projeto — e é muito mais rápido que navegar por pastas.' },
        { tipo: 'trabalho', texto: 'Criar projeto, rodar testes, subir os serviços e enviar código: tudo isso acontece no terminal, em qualquer equipe .NET.', fonte: '💼 No trabalho' },
        { tipo: 'nota', tom: 'info', texto: 'No Windows, você pode usar o **PowerShell** (já vem instalado) ou o **Windows Terminal**. Os comandos abaixo funcionam nos dois. No Linux/macOS, use o terminal padrão.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Navegando em pastas',
      introduz: ['terminal.comandos'],
      blocos: [
        { tipo: 'codigo', linguagem: 'texto', codigo: 'pwd              # mostra a pasta atual\nls               # lista o conteúdo (dir no Windows)\ncd Projetos      # entra na pasta Projetos\ncd ..            # volta uma pasta\nmkdir MeuProjeto # cria uma pasta' },
        { tipo: 'glossario', titulo: 'Decifrando os comandos', itens: [
          ['pwd', 'print working directory', 'Mostra onde você está.'],
          ['ls / dir', 'list', 'Lista arquivos e pastas.'],
          ['cd', 'change directory', 'Entra ou sai de pastas.'],
          ['..', 'pasta acima', 'Atalho para voltar um nível.']
        ] }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'term00-a1',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada comando ao que ele faz.',
        pares: [
          ['cd Projetos', 'Entrar na pasta Projetos'],
          ['ls', 'Listar o conteúdo da pasta'],
          ['mkdir MeuProjeto', 'Criar uma pasta'],
          ['cd ..', 'Voltar para a pasta anterior']
        ],
        dicas: ['cd vem de "change directory".', 'mkdir lembra "make directory".'],
        explicacao: 'São os quatro comandos de navegação que você usa 90% do tempo.',
        conceitos: ['terminal.comandos']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Rodando um projeto .NET',
      introduz: ['terminal.dotnet'],
      blocos: [
        { tipo: 'texto', texto: 'O comando `dotnet` é a porta de entrada para projetos .NET. Você não precisa decorar todos agora — comece pelos essenciais:' },
        { tipo: 'tabela', titulo: 'Comandos dotnet mais usados', colunas: ['Comando', 'Para que serve'], linhas: [
          ['dotnet --version', 'Mostra a versão do SDK instalada'],
          ['dotnet new webapi -n MeuProjeto', 'Cria um projeto de serviço web (-n = nome do projeto; webapi = modelo de projeto para um serviço web; você verá APIs na trilha de ASP.NET)'],
          ['dotnet run', 'Compila e executa o projeto atual'],
          ['dotnet build', 'Compila sem executar (confere se o projeto está correto)'],
          ['dotnet test', 'Executa os testes automatizados']
        ] },
        { tipo: 'nota', tom: 'atencao', texto: 'Se `dotnet` não for reconhecido, o SDK (o pacote de ferramentas do .NET) ainda não está instalado. No site oficial da Microsoft você instala em poucos minutos — use a versão LTS (a versão com suporte de longo prazo).' },
        { tipo: 'trabalho', texto: 'O `dotnet test` que aparece em verificações automáticas de um projeto é exatamente o mesmo que você roda na sua máquina. É por isso que ele precisa passar localmente antes de enviar o código.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'term00-a2',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete para compilar e, em seguida, rodar os testes do projeto.',
        codigo: 'dotnet {{1}}\ndotnet {{2}}',
        lacunas: [['build'], ['test']],
        dicas: ['Compilar sem executar é "build".', 'Rodar testes é "test".'],
        explicacao: '`dotnet build` compila e `dotnet test` executa os testes. Esses dois comandos aparecem em toda verificação automática de um projeto.',
        conceitos: ['terminal.dotnet']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Git, Docker e npm: três vizinhos',
      introduz: ['terminal.git', 'terminal.docker', 'terminal.npm'],
      blocos: [
        { tipo: 'codigo', linguagem: 'texto', codigo: 'git status        # ver o que mudou\ngit add .         # preparar tudo o que mudou (. = todos os arquivos)\ngit commit -m "Corrige cálculo do total"   # gravar com uma mensagem (-m = mensagem)\ngit push          # enviar para o servidor' },
        { tipo: 'texto', texto: 'Esses quatro comandos Git você usa dezenas de vezes por semana. Eles são uma **prévia**: a trilha de Git vai aprofundar esse fluxo de colaboração.' },
        { tipo: 'codigo', linguagem: 'texto', codigo: 'docker compose up     # sobe um serviço em um container (Docker = ferramenta de containers; container = pacote pronto com a aplicação e tudo o que ela precisa)\nnpm install           # instala as dependências da parte visual (frontend); npm = gerenciador de pacotes do frontend' },
        { tipo: 'nota', tom: 'info', texto: '`docker compose up` e `npm install` são apenas **preview**: você vai estudá-los nas trilhas de Docker e de Frontend (a parte visual). Anote o significado para reconhecê-los quando virem.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'term00-a3',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Um projeto .NET já está no seu computador. O líder pediu para rodar a aplicação e os testes antes de começar a alterar o código.',
        enunciado: 'Quais comandos você usa?',
        opcoes: [
          'dotnet run para executar e dotnet test para os testes',
          'git push e git commit',
          'docker compose up e npm install',
          'ls e cd'
        ],
        correta: 0,
        feedbackErro: {
          1: 'git commit/push envia código; não executa a aplicação.',
          2: 'docker/npm podem existir no projeto, mas não são os comandos de executar e testar .NET.',
          3: 'ls e cd servem para navegar, não para rodar o projeto.'
        },
        dicas: ['Rodar a aplicação e rodar testes têm comandos próprios do .NET.', 'Ambos começam com dotnet.'],
        explicacao: 'Esse é o fluxo de chegada em qualquer projeto: rodar, testar, e só então alterar. Criar essa rotina evita "consertar" algo que já estava funcionando.',
        conceitos: ['terminal.dotnet'],
        desafio: true
      }
    }
  ]
});
