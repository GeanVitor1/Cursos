Plataforma.registrarLicao({
  id: 'docker-09',
  trilha: 'docker',
  tipo: 'licao',
  titulo: 'Redis com compose',
  subtitulo: 'Docker Compose · Etapa 12',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Adicionar o serviço de respostas rápidas ao arquivo compose',
    'Conectar a API ao serviço pelo nome',
    'Reconhecer o que acontece quando o serviço cai',
    'Entender por que guardar resultados em memória acelera a API'
  ],
  conceitos: ['docker.compose', 'docker.variaveis', 'docker.networks', 'docker.volumes'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O que falta: respostas rápidas',
      blocos: [
        { tipo: 'futuro', titulo: 'O que vem na trilha de Redis', conceitos: ['redis.cache', 'redis.servidor', 'redis.ttl'], texto: 'Aqui você só monta o serviço no compose. O uso do cache dentro do código .NET é assunto da trilha de Redis, mais adiante.' },
        { tipo: 'retoma', conceito: 'docker.compose', texto: 'O arquivo compose já descreve a API e o banco. Falta a terceira peça de muitos projetos.' },
        { tipo: 'texto', texto: 'Toda vez que a página de produtos abre, a API consulta o banco. Para dados que mudam pouco e são lidos o tempo todo, esse caminho é repetitivo e caro.' },
        { tipo: 'texto', texto: 'A solução é guardar o resultado já montado em um serviço de memória, muito mais rápido de ler. Na próxima vez, a API responde sem tocar no banco.' },
        { tipo: 'destaque', texto: 'Esse espaço de respostas rápidas tem nome: **cache**. O serviço mais usado para isso é o Redis, e ele também entra no compose.' },
        {
          tipo: 'codigo',
          linguagem: 'yaml',
          titulo: 'docker-compose.yml',
          codigo: 'services:\n  redis:\n    image: redis:7-alpine\n    ports:\n      - "6379:6379"',
          legenda: 'O serviço de cache é um terceiro bloco no mesmo arquivo.'
        },
        { tipo: 'nota', tom: 'info', texto: 'Do ponto de vista do Docker, esse serviço é como qualquer outro: imagem, porta, variáveis e rede. O que muda é o papel que ele cumpre.' },
        { tipo: 'trabalho', texto: 'Em projetos de verdade, o serviço de cache aparece no arquivo desde o começo, para que o ambiente de desenvolvimento se pareça com o de produção.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker09-a1',
        tipo: 'multiple-choice',
        enunciado: 'Por que guardar respostas prontas em um serviço de memória deixa a API mais rápida?',
        opcoes: [
          'Porque a resposta pronta vem da memória, sem consultar o banco de novo',
          'Porque o serviço de memória comprime os dados antes de enviá-los',
          'Porque o serviço de memória substitui o banco de dados',
          'Porque o serviço de memória publica a porta da API na máquina'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O ganho vem de evitar a consulta, não de comprimir dados.',
          2: 'O serviço de memória não substitui o banco: ele guarda respostas por um tempo.',
          3: 'Quem publica portas é o -p, não o serviço de memória.'
        },
        dicas: [
          'Compare ler da memória com consultar o banco.',
          'O dado continua existindo no banco.'
        ],
        explicacao: 'Com a resposta já guardada em memória, a API devolve na hora e o banco só é consultado quando o dado ainda não está guardado.',
        conceitos: ['docker.compose']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O serviço no arquivo',
      blocos: [
        { tipo: 'texto', texto: 'O Redis tem imagem oficial e uma porta padrão, a 6379. Para o ambiente local, basta declarar o serviço com a imagem e a porta.' },
        {
          tipo: 'tabela',
          titulo: 'O serviço no compose',
          colunas: ['Chave', 'Valor', 'Por quê'],
          linhas: [
            ['image', 'redis:7-alpine', 'Imagem oficial, leve, baseada em Alpine'],
            ['ports', '6379:6379', 'Permite inspecionar o serviço pela máquina'],
            ['volumes', 'redis-dados:/data', 'Opcional, para manter o conteúdo entre reinícios']
          ],
          legenda: 'A configuração é a mesma de qualquer outro serviço.'
        },
        {
          tipo: 'codigo',
          linguagem: 'yaml',
          titulo: 'docker-compose.yml',
          codigo: '  redis:\n    image: redis:7-alpine\n    ports:\n      - "6379:6379"\n    volumes:\n      - redis-dados:/data',
          legenda: 'Imagem, porta e um volume para o serviço.'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Diferente do banco, perder o conteúdo do cache não é drama: se ele for apagado, a API simplesmente consulta a fonte de novo.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker09-a2',
        tipo: 'fill-code',
        enunciado: 'Complete o serviço do Redis com a **porta padrão** dentro do container.',
        codigo: '  redis:\n    image: redis:7-alpine\n    ports:\n      - "{{1}}:6379"',
        lacunas: [['6379']],
        dicas: [
          'É a porta que aparece na tabela desta lição.',
          'São quatro dígitos, começando com 6.'
        ],
        explicacao: '`- "6379:6379"` publica a porta padrão do Redis, usada pela aplicação para conversar com o serviço.',
        conceitos: ['docker.compose', 'docker.portas']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker09-a3',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada serviço do projeto à sua porta interna e ao seu papel.',
        pares: [
          ['api', 'Porta 80; atende as requisições'],
          ['banco', 'Porta 1433; guarda os dados'],
          ['redis', 'Porta 6379; guarda respostas rápidas']
        ],
        dicas: [
          'A porta do SQL Server aparece na string de conexão.',
          'O Redis usa a porta 6379.'
        ],
        explicacao: 'Cada serviço tem porta e papel definidos: a API atende, o banco persiste e o Redis responde rápido.',
        conceitos: ['docker.compose', 'docker.portas']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Ligando a API ao serviço',
      blocos: [
        { tipo: 'texto', texto: 'Assim como a conexão do banco, o endereço do serviço de memória chega à API por variável de ambiente e usa o nome do serviço dentro da rede.' },
        {
          tipo: 'codigo',
          linguagem: 'yaml',
          titulo: 'docker-compose.yml',
          codigo: '  api:\n    environment:\n      - ConnectionStrings__Redis=redis:6379\n    depends_on:\n      - redis',
          legenda: 'A API aponta para o serviço redis pelo nome.'
        },
        { tipo: 'nota', tom: 'info', texto: 'Nada de `localhost`: dentro da rede do compose, o endereço é sempre o nome do serviço.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker09-a4',
        tipo: 'scenario',
        enunciado: 'O time percebeu uma melhora grande na segunda chamada. Qual é a explicação?',
        cena: 'A listagem de produtos demora 800 ms na primeira abertura e 40 ms nas seguintes. Ninguém alterou o banco, a rede ou a API entre as chamadas.',
        opcoes: [
          'Na segunda vez a resposta veio da memória, sem consultar o banco',
          'O banco ficou mais rápido sozinho após a primeira consulta',
          'A API mudou a porta entre as chamadas',
          'O volume do banco passou a servir os dados da memória'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Bancos mantêm o desempenho estável; o que muda é a origem da leitura.',
          2: 'A porta não muda sozinha e não explicaria a diferença.',
          3: 'Volume é armazenamento do banco, não memória de respostas.'
        },
        dicas: [
          'O que passou a existir depois da primeira chamada?',
          'A resposta pronta fica em memória.'
        ],
        explicacao: 'A primeira chamada consultou o banco e guardou o resultado em memória. As seguintes leram da memória, muito mais rápido.',
        conceitos: ['docker.compose', 'docker.networks']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker09-a5',
        tipo: 'predict-output',
        enunciado: 'O container do serviço de memória é derrubado. O que acontece com a API?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'docker compose stop redis' }
        ],
        opcoes: [
          'A API continua respondendo: sem o serviço, ela consulta o banco e volta a guardar os resultados',
          'A API para de responder imediatamente',
          'Os dados do banco são apagados junto com o serviço',
          'A rede do compose é removida e ninguém mais se encontra'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O serviço de memória é uma aceleração, não uma dependência obrigatória para responder.',
          2: 'Os dados do banco vivem no volume do banco, não no serviço de memória.',
          3: 'Parar um serviço não remove a rede do projeto.'
        },
        dicas: [
          'O que o serviço de memória guarda é uma cópia da resposta.',
          'A fonte da verdade continua sendo o banco.'
        ],
        explicacao: 'Sem o serviço de memória, a API perde a aceleração, mas continua funcionando: consulta o banco e recarrega as respostas quando ele voltar.',
        conceitos: ['docker.compose']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Cache',
      blocos: [
        { tipo: 'texto', texto: 'A palavra do dia é **cache**, acompanhada de **fast** (rápido).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['cache', 'reserva de respostas em memória'],
            ['fast', 'rápido']
          ]
        },
        { tipo: 'ingles', frase: 'The cache is fast.', traducao: 'O cache é rápido.' },
        { tipo: 'nota', tom: 'info', texto: '**fast** descreve justamente o motivo de o cache existir: responder sem esperar o banco.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker09-a6',
        tipo: 'write-code',
        enunciado: 'Escreva a linha que declara a imagem do serviço **redis** (versão 7, base alpine), em formato de arquivo compose.',
        placeholder: 'image: ...',
        respostasAceitas: [
          'image: redis:7-alpine'
        ],
        dicas: [
          'A chave é image e o valor é nome:etiqueta.',
          'A imagem é redis, versão 7-alpine.'
        ],
        explicacao: 'A linha declara a imagem oficial do Redis na versão 7, leve para o ambiente local.',
        conceitos: ['docker.compose']
      }
    }
  ]
});
