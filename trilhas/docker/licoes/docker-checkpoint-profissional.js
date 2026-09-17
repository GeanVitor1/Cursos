Plataforma.registrarLicao({
  id: 'docker-checkpoint-profissional',
  trilha: 'docker',
  tipo: 'prova',
  titulo: 'Checkpoint final — Docker',
  subtitulo: 'Docker Compose · Etapa 14',
  duracaoMin: 50,
  xp: 100,
  objetivos: [
    'Interpretar e corrigir arquivos compose de projetos reais',
    'Relacionar portas, volumes, variáveis e redes em um mesmo cenário',
    'Investigar falhas de subida pelos registros dos serviços',
    'Explicar como a aplicação .NET completa sobe com um comando'
  ],
  conceitos: ['docker.ambiente', 'docker.imagem', 'docker.container', 'docker.dockerfile', 'docker.portas', 'docker.volumes', 'docker.variaveis', 'docker.networks', 'docker.compose'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova final: Docker',
      blocos: [
        { tipo: 'futuro', titulo: 'Depois desta trilha', conceitos: ['redis.cache', 'redis.servidor', 'redis.ttl'], texto: 'Esta prova fecha o ambiente. O uso do cache e de outros recursos dentro do código .NET continua na trilha de Redis.' },
        { tipo: 'texto', texto: 'São **10 atividades** cobrindo tudo o que você aprendeu: do problema do ambiente reproduzível ao arquivo compose completo com API, banco e serviço de memória.' },
        {
          tipo: 'lista',
          itens: [
            'Os cenários são os mesmos de um projeto .NET em equipe.',
            'Use as dicas quando precisar; elas não afetam o resultado.',
            'O retorno final mostra seu domínio conceito por conceito.'
          ]
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-pr1',
        tipo: 'multiple-choice',
        enunciado: 'Qual é a vantagem central de descrever a aplicação em um arquivo compose?',
        opcoes: [
          'Qualquer pessoa sobe o mesmo conjunto de serviços com um comando, sem decorar opções',
          'A aplicação dispensa Dockerfile porque o arquivo constrói tudo sozinho',
          'O banco de dados deixa de precisar de volume',
          'As portas deixam de ser publicadas na máquina'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O Dockerfile continua sendo necessário para as imagens construídas pelo projeto.',
          2: 'Persistência continua exigindo volume.',
          3: 'Portas continuam sendo publicadas quando o acesso externo é necessário.'
        },
        dicas: [
          'Pense em quem entra novo no time.',
          'Um arquivo, um comando, o mesmo ambiente.'
        ],
        explicacao: 'O compose documenta e executa o ambiente: o mesmo arquivo gera o mesmo conjunto de serviços para todo o time.',
        conceitos: ['docker.compose']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-pr2',
        tipo: 'fill-code',
        enunciado: 'Complete a linha que garante que a API só suba quando o banco estiver saudável.',
        codigo: '    depends_on:\n      banco:\n        condition: service_{{1}}',
        lacunas: [['healthy']],
        dicas: [
          'A verificação de saúde usa o termo healthy.',
          'É o estado do serviço que responde à verificação.'
        ],
        explicacao: 'A condição de saúde faz o compose esperar o banco responder à verificação antes de iniciar a API.',
        conceitos: ['docker.compose']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-pr3',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre o projeto completo.',
        afirmacoes: [
          { texto: 'O comando docker compose down preserva os volumes nomeados do projeto.', correta: true, explicacao: 'Os dados do banco continuam no volume entre execuções.' },
          { texto: 'No arquivo compose, cada serviço precisa declarar explicitamente a rede do projeto.', correta: false, explicacao: 'O compose coloca todos os serviços na mesma rede automaticamente.' },
          { texto: 'A mesma imagem da API pode rodar em ambientes diferentes mudando apenas as variáveis.', correta: true, explicacao: 'É a separação entre imagem fixa e configuração variável.' }
        ],
        dicas: [
          'Rede é automática; volume é declarado.',
          'Imagem fixa, configuração variável.'
        ],
        explicacao: 'O compose cria a rede do projeto sozinho, preserva volumes no down e mantém a imagem independente da configuração.',
        conceitos: ['docker.compose', 'docker.networks', 'docker.volumes', 'docker.variaveis']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-pr4',
        tipo: 'scenario',
        enunciado: 'Qual conjunto de ajustes resolve o problema?',
        cena: 'A aplicação completa sobe, mas a API recebe erro de conexão com o banco. Ao conferir o estado, o serviço do banco está saudável e a API está em execução. Nos registros da API aparece a tentativa de conectar em localhost.',
        opcoes: [
          'Trocar o endereço da conexão para o nome do serviço do banco e reconstruir a API',
          'Remover o volume do banco para a conexão voltar a funcionar',
          'Publicar a porta 1433 do banco na máquina e manter localhost',
          'Parar o serviço de memória para liberar a rede do projeto'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O volume não interfere no endereço de conexão.',
          2: 'Publicar a porta não corrige o endereço; dentro do container, localhost continua sendo a própria API.',
          3: 'O serviço de memória não bloqueia a comunicação com o banco.'
        },
        dicas: [
          'Dentro da rede do compose, o endereço é o nome do serviço.',
          'Mudou configuração? A imagem precisa ser reconstruída.'
        ],
        explicacao: 'A conexão deve apontar para o nome do serviço do banco. Como a variável mudou, a imagem da API precisa ser reconstruída com `--build`.',
        conceitos: ['docker.networks', 'docker.variaveis', 'docker.compose'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-pr5',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada necessidade do projeto à configuração correspondente no compose.',
        pares: [
          ['Acessar a API em localhost:8080', 'ports com "8080:80" no serviço da API'],
          ['Manter os dados do banco entre execuções', 'volumes com um volume nomeado no serviço do banco'],
          ['Entregar a string de conexão', 'environment com a variável de conexão'],
          ['Encontrar o banco pelo nome', 'Serviços na mesma rede do projeto']
        ],
        dicas: [
          'Pense em qual parte do arquivo atende cada necessidade.',
          'A mesma ordem que você viu nas lições anteriores.'
        ],
        explicacao: 'O compose reúne as quatro necessidades: publicar, persistir, configurar e conectar.',
        conceitos: ['docker.portas', 'docker.volumes', 'docker.variaveis', 'docker.networks', 'docker.compose']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-pr6',
        tipo: 'find-error',
        enunciado: 'O arquivo abaixo foi recusado na revisão. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'yaml', codigo: 'services:\n  api:\n    build: .\n    ports:\n    - "8080:80"\n  banco:\n    image: mcr.microsoft.com/mssql/server:2022-latest\n    volumes:\n      - dados:/var/opt/mssql\nvolumes:\n  dados:' }
        ],
        opcoes: [
          'Nada: o arquivo está correto e descreve API, banco e volume',
          'O volume dados não pode ser usado pelo SQL Server',
          'A porta deveria ser 80:8080',
          'O bloco volumes no fim deveria vir antes de services'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O SQL Server grava os arquivos do banco no volume normalmente.',
          2: 'A ordem correta é externa:interna; 8080:80 está certo.',
          3: 'O bloco volumes pode ficar no fim do arquivo; a ordem entre blocos de primeiro nível é livre.'
        },
        dicas: [
          'Confira a indentação, a ordem das portas e a declaração do volume.',
          'Compare cada chave com o que você aprendeu.'
        ],
        explicacao: 'O arquivo está correto: a API é construída, a porta está no formato certo e o volume é usado pelo banco e declarado no fim.',
        conceitos: ['docker.compose', 'docker.portas', 'docker.volumes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-pr7',
        tipo: 'order-blocks',
        enunciado: 'Ordene a rotina de quem acabou de mudar o código da API e quer tudo no ar.',
        blocos: [
          'docker compose up -d --build',
          'docker compose ps',
          'docker compose logs api',
          'docker compose down'
        ],
        dicas: [
          'Reconstruir e subir vem primeiro.',
          'Conferir, investigar e só então derrubar.'
        ],
        explicacao: 'Com `--build` a imagem da API é reconstruída na subida. Depois, conferir o estado, olhar os registros e derrubar o ambiente.',
        conceitos: ['docker.compose']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-pr8',
        tipo: 'predict-output',
        enunciado: 'A API grava um pedido no banco, o projeto é derrubado com down e subido de novo. O que a API encontra ao consultar os pedidos?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'docker compose down\ndocker compose up -d' }
        ],
        opcoes: [
          'O pedido gravado, porque o volume do banco sobrevive ao down',
          'A tabela vazia, porque o down apaga os dados do banco',
          'O pedido gravado apenas se a API não tiver sido reiniciada',
          'A tabela vazia, porque a imagem do banco foi removida'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O down remove os containers e a rede, mas os volumes continuam guardados.',
          2: 'O volume é independente do reinício da API.',
          3: 'A imagem não é removida pelo down e os dados estão no volume de qualquer forma.'
        },
        dicas: [
          'O que o down preserva?',
          'A persistência está no volume.'
        ],
        explicacao: 'Os dados do banco ficam no volume. O `down` derruba containers e rede, mas o volume permanece para a próxima subida.',
        conceitos: ['docker.volumes', 'docker.compose']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-pr9',
        tipo: 'interpret-code',
        enunciado: 'O que esta variável entrega à API?',
        contexto: [
          { tipo: 'codigo', linguagem: 'yaml', codigo: '    environment:\n      - ConnectionStrings__Redis=redis:6379' }
        ],
        opcoes: [
          'O endereço interno do serviço de memória, para a API guardar e ler respostas rápidas',
          'A senha do banco de dados principal',
          'A porta publicada da API na máquina',
          'O caminho do Dockerfile usado no build'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A senha do banco aparece em outra variável, junto ao serviço do banco.',
          2: 'A porta publicada da API é definida em ports.',
          3: 'O Dockerfile é indicado na chave build.'
        },
        dicas: [
          'Leia o nome da variável: ela aponta para o serviço redis.',
          '6379 é a porta padrão desse serviço.'
        ],
        explicacao: 'A variável informa à API onde encontrar o serviço de respostas rápidas, na porta 6379.',
        conceitos: ['docker.variaveis', 'docker.compose', 'docker.networks']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-pr10',
        tipo: 'write-code',
        enunciado: 'Escreva o comando que reconstrói as imagens e sobe todos os serviços em segundo plano.',
        placeholder: 'docker ...',
        respostasAceitas: [
          'docker compose up -d --build'
        ],
        dicas: [
          'Use o comando de subida com -d.',
          'A reconstrução das imagens vem com --build.'
        ],
        explicacao: '`docker compose up -d --build` reconstrói o que tem Dockerfile e sobe todos os serviços, liberando o terminal.',
        conceitos: ['docker.compose', 'docker.dockerfile']
      }
    }
  ]
});
