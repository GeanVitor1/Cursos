Plataforma.registrarLicao({
  id: 'docker-10',
  trilha: 'docker',
  tipo: 'licao',
  titulo: 'Aplicação completa: API + banco + cache',
  subtitulo: 'Docker Compose · Etapa 13',
  duracaoMin: 60,
  xp: 30,
  objetivos: [
    'Montar o arquivo compose completo de uma aplicação .NET',
    'Relacionar API, banco e serviço de memória com papéis bem definidos',
    'Organizar a ordem de subida com verificação de saúde',
    'Investigar problemas lendo os registros dos serviços'
  ],
  conceitos: ['docker.compose', 'docker.variaveis', 'docker.volumes', 'docker.networks', 'docker.portas'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O projeto completo',
      blocos: [
        { tipo: 'futuro', titulo: 'Depois desta trilha', conceitos: ['redis.cache', 'redis.servidor', 'redis.ttl'], texto: 'A trilha de Redis mostra como usar o cache dentro do código da API. Aqui o foco é o ambiente: os três serviços subindo juntos com um comando.' },
        { tipo: 'retoma', conceito: 'docker.compose', texto: 'Você já montou cada peça separadamente: API, banco e o serviço de memória. Agora elas ficam no mesmo arquivo.' },
        { tipo: 'texto', texto: 'Uma aplicação de pedidos precisa de três serviços: a API que atende, o banco que guarda os dados e o cache que acelera as leituras. Cada um tem uma responsabilidade e um ciclo de vida.' },
        {
          tipo: 'diagrama',
          titulo: 'A aplicação completa',
          arte: [
            '  navegador',
            '      |',
            '      v  :8080',
            '  +---------+      +---------+      +---------+',
            '  |   api   |----->|  banco  |      |  redis  |',
            '  |  .NET   |----->| SQL Srv |      |  cache  |',
            '  +---------+      +---------+      +---------+',
            '       |                                  ^',
            '       +----------------------------------+',
            '          tudo na mesma rede do projeto'
          ].join('\n'),
          legenda: 'Três serviços, uma rede, um comando de subida.'
        },
        {
          tipo: 'lista',
          itens: [
            '**api**: construída pelo Dockerfile do projeto, exposta na porta 8080',
            '**banco**: SQL Server com dados em volume e credenciais por variáveis',
            '**redis**: serviço de memória com a porta 6379',
            '**volumes**: declarados no fim do arquivo e usados pelos serviços'
          ]
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker10-a1',
        tipo: 'multiple-choice',
        enunciado: 'No projeto completo, qual é o papel de cada serviço?',
        opcoes: [
          'A API atende as requisições, o banco guarda os dados e o serviço de memória acelera as leituras',
          'A API guarda os dados, o banco atende as requisições e o serviço de memória faz backup',
          'Os três serviços fazem a mesma coisa e servem para dividir a carga',
          'O serviço de memória substitui o banco quando ele está ocupado'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Quem atende as requisições é a API; o banco não expõe a aplicação.',
          2: 'Cada serviço tem uma responsabilidade diferente.',
          3: 'O serviço de memória acelera leituras, mas a verdade dos dados continua no banco.'
        },
        dicas: [
          'Pense no que cada peça faz de melhor.',
          'O banco é a fonte da verdade.'
        ],
        explicacao: 'Cada serviço tem um papel: atender, persistir e acelerar. Juntos, formam o ambiente da aplicação.',
        conceitos: ['docker.compose']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O arquivo completo',
      blocos: [
        { tipo: 'texto', texto: 'O arquivo reúne tudo o que você aprendeu: serviços com imagem ou build, portas, variáveis, volumes, dependências e verificação de saúde.' },
        {
          tipo: 'codigo',
          linguagem: 'yaml',
          titulo: 'docker-compose.yml',
          codigo: 'services:\n  api:\n    build: .\n    ports:\n      - "8080:80"\n    environment:\n      - ASPNETCORE_ENVIRONMENT=Development\n      - ConnectionStrings__Default=Server=banco,1433;Database=Pedidos;User Id=sa;Password=SenhaForte123;TrustServerCertificate=True\n      - ConnectionStrings__Redis=redis:6379\n    depends_on:\n      banco:\n        condition: service_healthy\n      redis:\n        condition: service_started\n\n  banco:\n    image: mcr.microsoft.com/mssql/server:2022-latest\n    environment:\n      - ACCEPT_EULA=Y\n      - MSSQL_SA_PASSWORD=SenhaForte123\n    volumes:\n      - dados:/var/opt/mssql\n\n  redis:\n    image: redis:7-alpine\n    ports:\n      - "6379:6379"\n\nvolumes:\n  dados:',
          legenda: 'Um arquivo descreve a aplicação inteira.'
        },
        { tipo: 'nota', tom: 'info', texto: 'Repare que o serviço `api` não declara rede: no compose, todos os serviços entram automaticamente na mesma rede do projeto e se encontram pelo nome.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker10-a2',
        tipo: 'fill-code',
        enunciado: 'Complete o fim do arquivo, declarando o volume usado pelo serviço do banco.',
        codigo: '    volumes:\n      - dados:/var/opt/mssql\n\nvolumes:\n  {{1}}:',
        lacunas: [['dados']],
        dicas: [
          'O mesmo nome usado no serviço precisa aparecer aqui.',
          'É o volume em que o SQL Server grava.'
        ],
        explicacao: 'O bloco final `volumes:` declara o volume nomeado `dados`, que o serviço do banco usa para persistir os arquivos.',
        conceitos: ['docker.volumes', 'docker.compose']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker10-a3',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada parte do arquivo à sua função no projeto completo.',
        pares: [
          ['build: .', 'Constrói a imagem da API a partir do Dockerfile do projeto'],
          ['ports: 8080:80', 'Publica a API para acesso de fora'],
          ['depends_on com condition', 'Organiza a ordem de subida entre os serviços'],
          ['volumes: dados', 'Declara o armazenamento que persiste os dados do banco']
        ],
        dicas: [
          'Pense no papel de cada chave: construir, publicar, guardar e conectar.',
          'Use build para construir e volumes para guardar.'
        ],
        explicacao: 'O arquivo combina construção, publicação, ordem de subida e persistência em um só lugar.',
        conceitos: ['docker.compose', 'docker.portas', 'docker.volumes']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Ordem de subida na prática',
      blocos: [
        { tipo: 'texto', texto: 'O banco demora alguns segundos para aceitar conexões. A verificação de saúde evita que a API suba antes de o banco estar pronto.' },
        {
          tipo: 'passos',
          itens: [
            '`docker compose up -d` — o compose cria rede e volumes e inicia os serviços',
            'O serviço do banco começa a responder à verificação de saúde',
            'Quando o banco está saudável, a API sobe e encontra o banco pelo nome',
            '`docker compose ps` — confere o estado de cada serviço'
          ]
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Se a API ainda falhar na primeira conexão, verifique a verificação de saúde do banco antes de culpar a string de conexão.' },
        { tipo: 'trabalho', texto: 'Ler os registros é metade do trabalho de quem opera containers. Em um projeto profissional, um erro que parece de banco muitas vezes aparece primeiro nos registros da API.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker10-a4',
        tipo: 'find-error',
        enunciado: 'O arquivo abaixo não sobe: o volume dados é citado no serviço, mas algo falta no fim do arquivo. Qual é a correção?',
        contexto: [
          { tipo: 'codigo', linguagem: 'yaml', codigo: 'services:\n  banco:\n    image: mcr.microsoft.com/mssql/server:2022-latest\n    volumes:\n      - dados:/var/opt/mssql' }
        ],
        opcoes: [
          'Declarar o volume no bloco final volumes: do arquivo',
          'Trocar o volume por uma variável de ambiente',
          'Remover a chave image e usar build',
          'Publicar a porta 1433 para o volume funcionar'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Volume não é configuração; ele é declarado no bloco volumes.',
          2: 'O serviço do banco usa imagem pronta, não build.',
          3: 'Publicar porta não tem relação com a persistência.'
        },
        dicas: [
          'Todo volume nomeado precisa aparecer em dois lugares.',
          'O serviço usa; o arquivo declara.'
        ],
        explicacao: 'Um volume nomeado é usado dentro do serviço e declarado no bloco `volumes:` do arquivo. Sem a declaração, o compose não sobe.',
        conceitos: ['docker.volumes', 'docker.compose']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker10-a5',
        tipo: 'predict-output',
        enunciado: 'O projeto é derrubado com `docker compose down` e subido de novo. O que acontece com os pedidos já gravados?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'docker compose down\ndocker compose up -d' }
        ],
        opcoes: [
          'Continuam disponíveis, porque os dados do banco ficam no volume dados',
          'São apagados, porque o down remove todos os dados do projeto',
          'São apagados, porque a imagem do banco é baixada novamente',
          'Continuam disponíveis apenas se a API não for reiniciada'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O down remove containers e rede, mas preserva os volumes nomeados.',
          2: 'A imagem já está baixada localmente; mesmo que fosse baixada de novo, os dados estão no volume.',
          3: 'O volume é independente do ciclo de vida da API.'
        },
        dicas: [
          'O que o down remove e o que ele preserva?',
          'Dados do banco ficam em volume.'
        ],
        explicacao: 'O `docker compose down` remove containers e rede, mas mantém os volumes. Ao subir de novo, o banco reencontra os dados no volume.',
        conceitos: ['docker.volumes', 'docker.compose']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Investigando com os registros',
      blocos: [
        { tipo: 'texto', texto: 'Quando algo não funciona, o primeiro passo é olhar a saída dos serviços. O compose tem um comando para isso, com a opção de acompanhar em tempo real.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          codigo: 'docker compose logs api\ndocker compose logs -f banco',
          legenda: 'O primeiro mostra os registros da API; o segundo acompanha o banco ao vivo.'
        },
        {
          tipo: 'tabela',
          titulo: 'Sintoma e onde olhar primeiro',
          colunas: ['Sintoma', 'Onde investigar'],
          linhas: [
            ['API responde erro de conexão', 'Registros da API e estado do banco em docker compose ps'],
            ['Banco reiniciando sozinho', 'Registros do banco: senha fora dos requisitos'],
            ['Página lenta na primeira abertura', 'Registros do serviço de memória'],
            ['Mudança não aparece', 'Imagem da API precisa ser reconstruída']
          ],
          legenda: 'Cada sintoma tem um lugar mais provável de explicação.'
        },
        { tipo: 'nota', tom: 'info', texto: 'Depois de mudar o Dockerfile ou o código, use `docker compose up -d --build` para reconstruir a imagem da API antes de subir.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker10-a6',
        tipo: 'scenario',
        enunciado: 'Qual é a melhor sequência para resolver o problema?',
        cena: 'A API está respondendo erro de conexão com o banco em um projeto que acabou de subir. O serviço do banco aparece como reiniciando no estado do compose.',
        opcoes: [
          'Olhar os registros do banco para confirmar se a senha atende aos requisitos e corrigir a variável',
          'Trocar a porta da API para 8081 e subir de novo',
          'Remover o volume do banco e subir tudo do zero',
          'Apagar a imagem da API e construir outra'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A porta da API não tem relação com o banco reiniciando.',
          2: 'Remover o volume apaga dados e não resolve a causa da reinicialização.',
          3: 'O problema está no serviço do banco, não na imagem da API.'
        },
        dicas: [
          'O estado do serviço já aponta para o banco.',
          'Senha inválida faz o SQL Server reiniciar.'
        ],
        explicacao: 'Registros do banco mostram a causa. Senha fora dos requisitos de complexidade é uma das razões mais comuns de reinicialização do SQL Server.',
        conceitos: ['docker.compose', 'docker.variaveis'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker10-a7',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre o projeto completo.',
        afirmacoes: [
          { texto: 'No compose, os serviços do mesmo projeto entram juntos na rede e se encontram pelo nome.', correta: true, explicacao: 'A rede do projeto é criada automaticamente pelo compose.' },
          { texto: 'O bloco volumes no fim do arquivo é opcional quando o serviço usa armazenamento.', correta: false, explicacao: 'Volumes nomeados precisam ser declarados para o compose criá-los.' },
          { texto: 'docker compose logs ajuda a descobrir por que um serviço não sobe.', correta: true, explicacao: 'É o primeiro lugar para investigar erros de subida.' }
        ],
        dicas: [
          'Rede automática, volume declarado.',
          'Registros mostram a causa dos erros.'
        ],
        explicacao: 'O compose cuida da rede sozinho; volumes nomeados são declarados no arquivo; os registros são a principal ferramenta de investigação.',
        conceitos: ['docker.networks', 'docker.volumes', 'docker.compose']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Together',
      blocos: [
        { tipo: 'texto', texto: 'A frase de fechamento usa só palavras já conhecidas e resume o projeto: **together** (juntos).' },
        { tipo: 'ingles', frase: 'The API, the database and the cache run together.', traducao: 'A API, o banco e o cache rodam juntos.' },
        { tipo: 'nota', tom: 'info', texto: '**run together** = "rodam juntos" — exatamente o que o arquivo compose entrega ao time.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker10-a8',
        tipo: 'write-code',
        enunciado: 'Escreva o comando que mostra os registros do serviço **api**.',
        placeholder: 'docker ...',
        respostasAceitas: [
          'docker compose logs api'
        ],
        dicas: [
          'O comando de registros é logs.',
          'O serviço vem logo depois.'
        ],
        explicacao: 'O comando mostra a saída do serviço da API, o primeiro lugar para investigar erros.',
        conceitos: ['docker.compose']
      }
    }
  ]
});
