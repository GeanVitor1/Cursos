Plataforma.registrarLicao({
  id: 'docker-08',
  trilha: 'docker',
  tipo: 'licao',
  titulo: '.NET + SQL Server com compose',
  subtitulo: 'Docker Compose · Etapa 11',
  duracaoMin: 60,
  xp: 30,
  objetivos: [
    'Descrever a API e o SQL Server como serviços de um arquivo compose',
    'Configurar o banco por variáveis de ambiente e volume',
    'Explicar por que a subida do banco exige cuidado com a ordem',
    'Montar a string de conexão usando o nome do serviço'
  ],
  conceitos: ['docker.compose', 'docker.variaveis', 'docker.volumes', 'docker.networks'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O cenário: API .NET + SQL Server',
      blocos: [
        { tipo: 'retoma', conceito: 'docker.compose', texto: 'Um arquivo descreve os serviços e um comando sobe tudo. Agora o cenário é o de um projeto .NET real: a API e o banco de dados juntos.' },
        { tipo: 'texto', texto: 'Cada peça vira um serviço no arquivo. O banco usa uma imagem pronta do SQL Server; a API usa a imagem construída a partir do Dockerfile dela.' },
        {
          tipo: 'diagrama',
          titulo: 'Dois serviços, uma rede',
          arte: [
            '  docker compose up',
            '        |',
            '        v',
            '  +-----------------------------+',
            '  |  rede do projeto            |',
            '  |   +---------+   +---------+ |',
            '  |   |   api   |-->|  banco  | |',
            '  |   |  :8080  |   |  :1433  | |',
            '  |   +---------+   +---------+ |',
            '  +-----------------------------+',
            '        volume no serviço banco'
          ].join('\n'),
          legenda: 'A API encontra o banco pelo nome do serviço, dentro da rede criada pelo compose.'
        },
        {
          tipo: 'lista',
          itens: [
            'Serviço **api**: imagem própria, porta 8080 publicada e configuração por variáveis',
            'Serviço **banco**: imagem do SQL Server, credenciais por variáveis e volume para os dados'
          ]
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker08-a1',
        tipo: 'multiple-choice',
        enunciado: 'No arquivo compose da API com banco, o que representa a chave **services**?',
        opcoes: [
          'Cada parte do projeto que o compose deve criar e executar',
          'As portas publicadas na máquina',
          'Os volumes que sobrevivem ao container',
          'As variáveis de ambiente do projeto'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Portas ficam dentro de cada serviço, na chave ports.',
          2: 'Volumes aparecem dentro do serviço que os usa, na chave volumes.',
          3: 'Variáveis ficam na chave environment de cada serviço.'
        },
        dicas: [
          'services é a lista de partes do projeto.',
          'API e banco são dois serviços.'
        ],
        explicacao: 'Cada serviço é um container do projeto: a API, o banco, e outros que o projeto venha a ter.',
        conceitos: ['docker.compose']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O serviço do banco',
      blocos: [
        { tipo: 'texto', texto: 'A imagem do SQL Server aceita configuração por variáveis de ambiente. Duas são obrigatórias: aceitar o contrato de uso e definir a senha do usuário administrador.' },
        {
          tipo: 'codigo',
          linguagem: 'yaml',
          titulo: 'docker-compose.yml',
          codigo: 'services:\n  banco:\n    image: mcr.microsoft.com/mssql/server:2022-latest\n    environment:\n      - ACCEPT_EULA=Y\n      - MSSQL_SA_PASSWORD=SenhaForte123\n    volumes:\n      - dados:/var/opt/mssql',
          legenda: 'Credenciais no bloco environment e dados no volume.'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'A senha do SQL Server precisa atender aos requisitos de complexidade, senão o container sobe e para em seguida.' },
        { tipo: 'texto', texto: 'O volume `dados` aponta para a pasta em que o SQL Server grava os arquivos do banco. Sem ele, cada `docker compose down` apagaria os dados.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker08-a2',
        tipo: 'fill-code',
        enunciado: 'Complete a variável que define a senha do administrador do SQL Server.',
        codigo: 'environment:\n  - {{1}}=SenhaForte123',
        lacunas: [['MSSQL_SA_PASSWORD']],
        dicas: [
          'SA é o usuário administrador do SQL Server.',
          'A variável começa com MSSQL_.'
        ],
        explicacao: 'A variável define a senha do usuário administrador do banco. Em um projeto de verdade, esse valor vem de fora do arquivo versionado.',
        conceitos: ['docker.variaveis', 'docker.compose']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker08-a3',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre o serviço do banco.',
        afirmacoes: [
          { texto: 'O volume montado na pasta do SQL Server mantém os dados entre execuções.', correta: true, explicacao: 'Os arquivos do banco ficam no volume, fora do container.' },
          { texto: 'A senha do banco deve ser gravada no Dockerfile da API.', correta: false, explicacao: 'Senha é configuração e chega por variável de ambiente.' },
          { texto: 'O SQL Server pode ser configurado por variáveis definidas no arquivo compose.', correta: true, explicacao: 'É assim que o contrato de uso e a senha são entregues.' }
        ],
        dicas: [
          'Persistência é volume; segredo é variável.',
          'O Dockerfile constrói a imagem, não guarda senha.'
        ],
        explicacao: 'O banco em container usa volume para os dados e variáveis de ambiente para credenciais e configuração.',
        conceitos: ['docker.volumes', 'docker.variaveis', 'docker.compose']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Ordem de subida e espera',
      blocos: [
        { tipo: 'texto', texto: 'O banco leva alguns segundos para aceitar conexões. Se a API subir na frente e tentar conectar na mesma hora, ela falha antes de o banco estar pronto.' },
        { tipo: 'texto', texto: 'Para organizar isso, o compose tem duas ferramentas: a lista de dependências e a verificação de saúde do serviço.' },
        {
          tipo: 'codigo',
          linguagem: 'yaml',
          titulo: 'docker-compose.yml',
          codigo: '  api:\n    build: .\n    ports:\n      - "8080:80"\n    depends_on:\n      banco:\n        condition: service_healthy\n  banco:\n    image: mcr.microsoft.com/mssql/server:2022-latest\n    healthcheck:\n      test: ["CMD-SHELL", "/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P SenhaForte123 -Q \\"SELECT 1\\""]\n      interval: 10s\n      retries: 10',
          legenda: 'A API só sobe quando o banco responde à verificação de saúde.'
        },
        { tipo: 'nota', tom: 'info', texto: 'A verificação de saúde é um comando que o Docker executa de tempos em tempos. Enquanto ele falhar, o serviço é considerado iniciando.' },
        { tipo: 'nota', tom: 'atencao', texto: 'A dependência organiza a ordem de subida, mas não faz a aplicação tentar de novo. Uma API resiliente trata a primeira falha de conexão e tenta outra vez.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker08-a4',
        tipo: 'predict-output',
        enunciado: 'A API está configurada para conectar no endereço `localhost`. O que acontece quando o projeto sobe com o compose?',
        contexto: [
          { tipo: 'codigo', linguagem: 'yaml', codigo: '  api:\n    environment:\n      - ConnectionStrings__Default=Server=localhost;Database=Pedidos' }
        ],
        opcoes: [
          'A API não encontra o banco, porque localhost aponta para o próprio container da API',
          'A conexão funciona, porque o banco roda na mesma máquina',
          'A conexão funciona apenas na primeira execução',
          'O compose corrige o endereço automaticamente'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A máquina hospedeira não é o mesmo que o container; localhost fica dentro dele.',
          2: 'Não há nada de especial na primeira execução; o endereço está errado sempre.',
          3: 'O compose não altera valores de configuração.'
        },
        dicas: [
          'Dentro do container, localhost é ele mesmo.',
          'Na rede do compose, use o nome do serviço.'
        ],
        explicacao: 'A configuração precisa apontar para `banco`, o nome do serviço. `localhost`, dentro do container, é a própria API.',
        conceitos: ['docker.networks', 'docker.variaveis', 'docker.compose']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker08-a5',
        tipo: 'scenario',
        enunciado: 'Qual valor colocar na string de conexão da API?',
        cena: 'No arquivo compose do projeto, o serviço da API se chama api e o serviço do banco se chama banco. O banco escuta na porta 1433 dentro do container.',
        opcoes: [
          'Server=banco,1433;Database=Pedidos',
          'Server=localhost,1433;Database=Pedidos',
          'Server=api,1433;Database=Pedidos',
          'Server=127.0.0.1,1433;Database=Pedidos'
        ],
        correta: 0,
        feedbackErro: {
          1: 'localhost aponta para o próprio container da API.',
          2: 'api é o serviço da aplicação; quem atende a conexão é o banco.',
          3: '127.0.0.1 é outro jeito de escrever localhost.'
        },
        dicas: [
          'O nome do serviço funciona como endereço na rede.',
          'O banco se chama banco.'
        ],
        explicacao: 'Na rede do compose, cada serviço é encontrado pelo próprio nome: `Server=banco,1433` aponta para o container do banco.',
        conceitos: ['docker.networks', 'docker.compose']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'A string de conexão via variável',
      blocos: [
        { tipo: 'texto', texto: 'A API .NET lê a conexão do mesmo jeito que você viu em ASP.NET e Entity Framework: pela configuração. No compose, ela entra como variável de ambiente do serviço da API.' },
        {
          tipo: 'codigo',
          linguagem: 'yaml',
          titulo: 'docker-compose.yml',
          codigo: '  api:\n    build: .\n    environment:\n      - ASPNETCORE_ENVIRONMENT=Development\n      - ConnectionStrings__Default=Server=banco,1433;Database=Pedidos;User Id=sa;Password=SenhaForte123;TrustServerCertificate=True',
          legenda: 'A conexão inteira chega por uma variável de ambiente.'
        },
        {
          tipo: 'tabela',
          titulo: 'Quem entrega o quê',
          colunas: ['Informação', 'De onde vem'],
          linhas: [
            ['Endereço do banco', 'Nome do serviço na rede do compose'],
            ['Nome do banco', 'Variável de configuração da API'],
            ['Usuário e senha', 'Variáveis definidas no arquivo']
          ],
          legenda: 'Trocar de ambiente é trocar valores, nunca a imagem.'
        },
        { tipo: 'nota', tom: 'info', texto: '`TrustServerCertificate=True` é comum em ambiente de desenvolvimento com certificado local. Em produção, a recomendação é validar o certificado.' },
        { tipo: 'trabalho', texto: 'Esse é o desenho que você vai reencontrar em projetos profissionais: API e banco como serviços, dados em volume, configuração em variáveis e o banco sempre acessado pelo nome do serviço.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker08-a6',
        tipo: 'interpret-code',
        enunciado: 'O que esta variável faz pela API dentro do compose?',
        contexto: [
          { tipo: 'codigo', linguagem: 'yaml', codigo: '    environment:\n      - ConnectionStrings__Default=Server=banco,1433;Database=Pedidos;User Id=sa;Password=SenhaForte123' }
        ],
        opcoes: [
          'Entrega à API o endereço, o banco e as credenciais usados na conexão',
          'Publica a porta 1433 do banco na máquina',
          'Cria o banco Pedidos automaticamente',
          'Monta um volume na pasta do SQL Server'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Quem publica portas é a chave ports, e não uma variável.',
          2: 'A variável informa onde conectar; criar o banco é tarefa da aplicação ou do script de inicialização.',
          3: 'Volume é declarado em outra chave, dentro do serviço do banco.'
        },
        dicas: [
          'Leia os pares nome=valor da string.',
          'Server, Database, User e Password descrevem a conexão.'
        ],
        explicacao: 'A variável reúne endereço, banco e credenciais. A API lê isso na inicialização e monta a conexão com o SQL Server.',
        conceitos: ['docker.variaveis', 'docker.compose']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · User and password',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras que aparecem em qualquer configuração de banco: **user** (usuário) e **password** (senha).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['user', 'usuário'],
            ['password', 'senha']
          ]
        },
        { tipo: 'ingles', frase: 'The API connects to the database with a user and a password.', traducao: 'A API se conecta ao banco com um usuário e uma senha.' },
        { tipo: 'nota', tom: 'info', texto: '**connects to the database** = "conecta ao banco" — a frase que descreve o que a string de conexão faz.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker08-a7',
        tipo: 'write-code',
        enunciado: 'Escreva a linha do arquivo compose que passa a variável **ASPNETCORE_ENVIRONMENT=Development** para o serviço.',
        placeholder: '- NOME=valor',
        respostasAceitas: [
          '- aspnetcore_environment=development'
        ],
        dicas: [
          'No compose, cada variável vira um item da lista environment.',
          'Comece com um traço e um espaço.'
        ],
        explicacao: 'O item de lista começa com um traço e entrega a variável ao serviço no arquivo compose.',
        conceitos: ['docker.variaveis', 'docker.compose']
      }
    }
  ]
});
