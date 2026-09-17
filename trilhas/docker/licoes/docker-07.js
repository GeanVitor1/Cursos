Plataforma.registrarLicao({
  id: 'docker-07',
  trilha: 'docker',
  tipo: 'licao',
  titulo: 'docker-compose: orquestrando serviços',
  subtitulo: 'Docker Compose · Etapa 10',
  duracaoMin: 50,
  xp: 30,
  objetivos: [
    'Explicar o problema que o Docker Compose resolve',
    'Descrever serviços, portas, volumes e variáveis em um arquivo compose',
    'Subir e derrubar o projeto inteiro com docker compose',
    'Ler os registros dos serviços para investigar problemas'
  ],
  conceitos: ['docker.compose'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Vários comandos viram um arquivo',
      introduz: ['docker.compose'],
      blocos: [
        { tipo: 'retoma', conceito: 'docker.portas', texto: 'Você já sabe publicar portas com `-p`.' },
        { tipo: 'retoma', conceito: 'docker.volumes', texto: 'Já sabe persistir dados com `-v`.' },
        { tipo: 'retoma', conceito: 'docker.networks', texto: 'E já sabe conectar serviços com `--network`.' },
        { tipo: 'texto', texto: 'O problema é juntar tudo isso: a API, o banco e a rede viram uma linha de comando enorme, que cada pessoa do time precisa lembrar e repetir na ordem certa.' },
        { tipo: 'destaque', texto: 'O Docker Compose tira essa lista da cabeça e coloca em um arquivo versionado com o projeto.' },
        { tipo: 'conceito', id: 'docker.compose', titulo: 'Docker Compose', texto: 'O arquivo que descreve vários serviços, redes e volumes e sobe tudo com um comando.', exemplo: 'docker compose up' },
        {
          tipo: 'codigo',
          linguagem: 'yaml',
          titulo: 'docker-compose.yml',
          codigo: 'services:\n  api:\n    image: minha-api\n    ports:\n      - "8080:80"\n    environment:\n      - ASPNETCORE_ENVIRONMENT=Development\n    depends_on:\n      - banco\n  banco:\n    image: postgres',
          legenda: 'O mesmo comando de antes, agora descrito em um arquivo.'
        },
        { tipo: 'nota', tom: 'info', texto: 'O arquivo se chama `docker-compose.yml` e fica na raiz do projeto, ao lado do Dockerfile.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker07-a1',
        tipo: 'multiple-choice',
        enunciado: 'Qual problema o **Docker Compose** resolve?',
        opcoes: [
          'Descrever vários serviços, redes e volumes em um arquivo e subir tudo com um comando',
          'Construir imagens sem precisar de Dockerfile',
          'Substituir o banco de dados por um arquivo de configuração',
          'Publicar a aplicação na internet automaticamente'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O Dockerfile continua sendo a receita da imagem de cada serviço.',
          2: 'O banco continua sendo um serviço, agora descrito no arquivo.',
          3: 'Publicar na internet é outro assunto; o compose organiza o ambiente local.'
        },
        dicas: [
          'Pense nos vários -p, -v, -e e --network juntos.',
          'Um arquivo, um comando.'
        ],
        explicacao: 'O Compose descreve o projeto inteiro em um arquivo e sobe ou derruba todos os serviços juntos, de forma repetível.',
        conceitos: ['docker.compose']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'A anatomia do arquivo',
      blocos: [
        { tipo: 'texto', texto: 'O arquivo começa pela chave `services`. Cada serviço é um bloco com nome, imagem (ou build) e as opções que você já conhece, agora escritas em formato de lista.' },
        {
          tipo: 'tabela',
          titulo: 'Chaves que você já conhece',
          colunas: ['Chave no arquivo', 'Equivale a', 'Para que serve'],
          linhas: [
            ['image', 'a imagem usada', 'Diz qual imagem o serviço executa'],
            ['build', 'docker build', 'Constrói a imagem a partir de um Dockerfile'],
            ['ports', '-p', 'Publica portas no formato externa:interna'],
            ['volumes', '-v', 'Monta volumes e pastas'],
            ['environment', '-e', 'Define variáveis de ambiente'],
            ['depends_on', 'ordem de subida', 'Indica de quais serviços este depende']
          ],
          legenda: 'O que era opção de linha de comando vira chave do arquivo.'
        },
        { tipo: 'texto', texto: 'A indentação é a sintaxe: cada nível é marcado por dois espaços. Um erro de alinhamento muda o significado do arquivo.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Use **espaços**, nunca tabulação, na indentação do arquivo. Ferramentas de edição costumam ter uma opção para isso.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker07-a2',
        tipo: 'fill-code',
        enunciado: 'Complete o nome do serviço da API no arquivo.',
        codigo: 'services:\n  {{1}}:\n    image: minha-api\n    ports:\n      - "8080:80"',
        lacunas: [['api']],
        dicas: [
          'É o nome curto do serviço que expõe a porta 8080.',
          'Os outros arquivos da trilha usam esse mesmo nome.'
        ],
        explicacao: 'O serviço chamado `api` usa a imagem `minha-api` e publica a porta 8080. O nome do serviço também vale como endereço dentro da rede.',
        conceitos: ['docker.compose']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker07-a3',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada chave do arquivo compose à opção equivalente na linha de comando.',
        pares: [
          ['ports', '-p'],
          ['volumes', '-v'],
          ['environment', '-e'],
          ['build', 'docker build']
        ],
        dicas: [
          'O arquivo apenas escreve o que antes era opção.',
          'Quatro equivalências diretas.'
        ],
        explicacao: 'Cada chave do compose corresponde a uma opção ou comando que você já usava separadamente.',
        conceitos: ['docker.compose', 'docker.portas', 'docker.volumes', 'docker.variaveis']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Os comandos do compose',
      blocos: [
        { tipo: 'texto', texto: 'Com o arquivo pronto, o projeto inteiro sobe com um comando. O `docker compose` lê o arquivo da pasta atual, cria rede e volumes e inicia os serviços na ordem certa.' },
        {
          tipo: 'tabela',
          titulo: 'Comandos do dia a dia',
          colunas: ['Comando', 'O que faz'],
          linhas: [
            ['docker compose up', 'Cria e inicia todos os serviços'],
            ['docker compose up -d', 'Faz o mesmo, liberando o terminal'],
            ['docker compose ps', 'Lista o estado dos serviços do projeto'],
            ['docker compose logs', 'Mostra a saída dos serviços'],
            ['docker compose down', 'Para e remove os containers e a rede do projeto']
          ],
          legenda: 'Tudo é executado na pasta onde está o arquivo.'
        },
        { tipo: 'nota', tom: 'info', texto: 'O `down` remove containers e rede, mas **preserva os volumes nomeados**: os dados do banco continuam lá.' },
        { tipo: 'trabalho', texto: 'O arquivo compose é revisado junto com o código, como qualquer outro arquivo do projeto. Quando alguém adiciona um serviço novo, a mudança chega ao time pelo mesmo pull request.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker07-a4',
        tipo: 'order-blocks',
        enunciado: 'Ordene a rotina: subir o projeto, conferir o estado, olhar os registros e derrubar tudo.',
        blocos: [
          'docker compose up -d',
          'docker compose ps',
          'docker compose logs',
          'docker compose down'
        ],
        dicas: [
          'Primeiro sobe, depois confere.',
          'Os registros vêm antes de derrubar.'
        ],
        explicacao: 'A rotina é subir, conferir, investigar pelos registros e, ao terminar, derrubar o ambiente com `down`.',
        conceitos: ['docker.compose']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker07-a5',
        tipo: 'find-error',
        enunciado: 'O arquivo abaixo não sobe e o erro aponta para o serviço banco. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'yaml', codigo: 'services:\n  api:\n    image: minha-api\n  banco:\n  image: postgres' }
        ],
        opcoes: [
          'A indentação de image: postgres está fora do bloco do serviço banco',
          'O serviço banco não pode usar a imagem postgres',
          'Falta a chave version no começo do arquivo',
          'Todo serviço precisa declarar ports'
        ],
        correta: 0,
        feedbackErro: {
          1: 'postgres é uma imagem válida e muito usada.',
          2: 'A chave version não é obrigatória nas versões atuais do compose.',
          3: 'ports é opcional; nem todo serviço é acessado de fora.'
        },
        dicas: [
          'Compare o alinhamento de image nos dois serviços.',
          'Indentação é a sintaxe do arquivo.'
        ],
        explicacao: 'Com a indentação errada, `image` deixa de pertencer ao serviço `banco`. No compose, o alinhamento define a estrutura.',
        conceitos: ['docker.compose']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker07-a6',
        tipo: 'scenario',
        enunciado: 'Qual é a melhor decisão?',
        cena: 'O time gasta tempo explicando, em um documento, quais comandos rodar para subir a API, o banco e a rede local. Quem entra novo erra a ordem com frequência e pede ajuda.',
        opcoes: [
          'Escrever um arquivo compose que descreve os serviços e substituir o documento por um único comando de subida',
          'Continuar com o documento, detalhando ainda mais os passos',
          'Criar um script diferente para cada pessoa do time',
          'Pedir para cada pessoa subir os serviços na ordem que preferir'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Documentos longos não impedem erro de ordem; o ambiente precisa ser executável.',
          2: 'Scripts diferentes por pessoa geram ambientes divergentes.',
          3: 'Cada pessoa montar de um jeito é o caminho mais curto para o desencontro.'
        },
        dicas: [
          'O ambiente deve ser descrito uma vez e executado por todos.',
          'Um arquivo substitui a lista de comandos.'
        ],
        explicacao: 'O compose transforma a lista de comandos em um arquivo versionado. Qualquer pessoa sobe o mesmo ambiente com o mesmo comando.',
        conceitos: ['docker.compose'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Compose',
      blocos: [
        { tipo: 'texto', texto: 'A frase desta lição usa só palavras que você já viu: **compose**, **containers**, **command**.' },
        { tipo: 'ingles', frase: 'Compose runs all the containers with one command.', traducao: 'O Compose executa todos os containers com um comando.' },
        { tipo: 'nota', tom: 'info', texto: '**with one command** = "com um comando" — o resumo do que o arquivo faz pelo time.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker07-a7',
        tipo: 'write-code',
        enunciado: 'Escreva o comando que sobe todos os serviços descritos no arquivo compose, liberando o terminal.',
        placeholder: 'docker ...',
        respostasAceitas: [
          'docker compose up -d'
        ],
        dicas: [
          'O comando principal é up.',
          'A opção -d deixa os serviços em segundo plano.'
        ],
        explicacao: '`docker compose up -d` sobe todos os serviços do arquivo e devolve o terminal para você.',
        conceitos: ['docker.compose']
      }
    }
  ]
});
