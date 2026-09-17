Plataforma.registrarLicao({
  id: 'docker-04',
  trilha: 'docker',
  tipo: 'licao',
  titulo: 'Volumes e persistência',
  subtitulo: 'Docker na prática · Etapa 6',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Explicar por que os dados de um container se perdem',
    'Guardar dados em volumes nomeados',
    'Diferenciar volume nomeado de pasta da máquina',
    'Administrar volumes com docker volume'
  ],
  conceitos: ['docker.volumes'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O container é descartável',
      introduz: ['docker.volumes'],
      blocos: [
        { tipo: 'retoma', conceito: 'docker.container', texto: 'Container é cópia descartável: subiu, rodou, foi removido. Tudo o que foi escrito **dentro dele** some junto.' },
        { tipo: 'texto', texto: 'Para um servidor web isso não incomoda. Para um banco de dados, é fatal: cada reinício começaria do zero.' },
        { tipo: 'destaque', texto: 'O que precisa sobreviver ao container mora **fora** dele: em um volume.' },
        { tipo: 'conceito', id: 'docker.volumes', titulo: 'Volumes', texto: 'Armazenamento que sobrevive ao container, usado para bancos e arquivos persistentes.', exemplo: 'docker run -v dados:/var/lib/postgresql/data postgres' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          codigo: 'docker run -d -v dados:/var/lib/postgresql/data postgres',
          legenda: 'O volume dados é montado na pasta em que o banco grava.'
        },
        { tipo: 'nota', tom: 'info', texto: 'A forma é `-v nome-do-volume:pasta-dentro-do-container`. Quem grava na pasta está gravando no volume.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker04-a1',
        tipo: 'multiple-choice',
        enunciado: 'Por que um banco de dados dentro de um container precisa de um **volume**?',
        opcoes: [
          'Porque os dados gravados dentro do container se perdem quando ele é removido',
          'Porque o banco ocupa muito espaço na imagem',
          'Porque sem volume o banco não aceita conexões de rede',
          'Porque o volume deixa o banco mais rápido para escrever'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O tamanho da imagem não tem relação com a persistência dos dados.',
          2: 'Conexão de rede é assunto de portas e redes.',
          3: 'Volume é sobre persistência, não sobre velocidade de escrita.'
        },
        dicas: [
          'Lembre do que acontece com um container removido.',
          'O dado precisa morar fora do container.'
        ],
        explicacao: 'O container é descartável; o volume fica fora dele e mantém os dados entre execuções e remoções.',
        conceitos: ['docker.volumes', 'docker.container']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Volume nomeado ou pasta da máquina',
      blocos: [
        { tipo: 'texto', texto: 'Existem duas formas de montar armazenamento. A mais usada no dia a dia é o **volume nomeado**, gerenciado pelo Docker. A outra é apontar direto para uma pasta da máquina, o chamado bind mount.' },
        {
          tipo: 'tabela',
          titulo: 'As duas formas',
          colunas: ['Forma', 'Exemplo', 'Quando usar'],
          linhas: [
            ['Volume nomeado', 'dados:/var/lib/dados', 'Bancos e dados que o Docker deve gerenciar'],
            ['Pasta da máquina', './dados:/app/dados', 'Arquivos que você quer editar direto na máquina']
          ],
          legenda: 'Nos dois casos, a pasta da esquerda é a origem e a da direita é o destino no container.'
        },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          codigo: 'docker run -d -v ./config:/app/config minha-api',
          legenda: 'A pasta config da máquina aparece dentro do container.'
        },
        { tipo: 'nota', tom: 'info', texto: 'No volume nomeado você usa só um nome, sem barra. O Docker guarda o conteúdo em um lugar próprio da máquina.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker04-a2',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada situação à forma de armazenamento mais adequada.',
        pares: [
          ['Banco de dados que precisa sobreviver às atualizações', 'Volume nomeado gerenciado pelo Docker'],
          ['Arquivo de configuração que você quer editar na máquina', 'Pasta da máquina montada no container'],
          ['Tudo o que o container gravar em uma pasta', 'Vai para o volume montado nessa pasta'],
          ['Container removido sem volume', 'Os dados gravados dentro dele se perdem']
        ],
        dicas: [
          'O Docker gerencia o volume nomeado.',
          'Pasta da máquina aparece igual dentro do container.'
        ],
        explicacao: 'Volumes nomeados servem para dados gerenciados pelo Docker; pastas da máquina servem para arquivos que você edita fora dele. Sem volume, o conteúdo do container se perde.',
        conceitos: ['docker.volumes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker04-a3',
        tipo: 'fill-code',
        enunciado: 'Complete para gravar os dados da API no volume chamado **dados**, montado em `/app/dados`.',
        codigo: 'docker run -d -v {{1}}:/app/dados minha-api',
        lacunas: [['dados']],
        dicas: [
          'O nome do volume vem antes dos dois pontos.',
          'É o nome escolhido: dados.'
        ],
        explicacao: '`-v dados:/app/dados` monta o volume `dados` na pasta `/app/dados` do container.',
        conceitos: ['docker.volumes']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Administrando volumes',
      blocos: [
        { tipo: 'texto', texto: 'Volumes têm vida própria e podem ser listados e removidos como qualquer outro recurso do Docker.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          codigo: 'docker volume ls\ndocker volume rm dados',
          legenda: 'Lista os volumes e depois remove o volume dados.'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Remover um volume **apaga os dados** que estavam nele. É uma operação para fazer com o mesmo cuidado de um `DELETE` sem `WHERE`.' },
        { tipo: 'trabalho', texto: 'Em produção, o volume do banco costuma ser tratado como dado crítico: entra em rotina de backup e nunca é removido por engano. Saber onde os dados moram é o primeiro passo para não perdê-los.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker04-a4',
        tipo: 'predict-output',
        enunciado: 'O container é removido, mas o volume **dados** continua existindo. O que acontece na próxima execução?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'docker run -d -v dados:/app/dados minha-api\ndocker rm -f minha-api\ndocker run -d -v dados:/app/dados minha-api' }
        ],
        opcoes: [
          'Os dados gravados anteriormente continuam no volume e reaparecem na nova execução',
          'Os dados somem, porque o primeiro container foi removido',
          'O comando falha, porque o volume já está em uso',
          'O Docker cria um volume novo e diferente na segunda execução'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O volume não pertence ao container; remover o container não apaga o volume.',
          2: 'O volume fica livre para ser montado novamente quando o container deixa de usá-lo.',
          3: 'O nome é o mesmo, então o Docker reaproveita o volume existente.'
        },
        dicas: [
          'O volume sobrevive ao container.',
          'Mesmo nome de volume, mesmo conteúdo.'
        ],
        explicacao: 'O volume `dados` guarda o conteúdo fora do container. Ao montar o mesmo volume de novo, os dados reaparecem.',
        conceitos: ['docker.volumes', 'docker.container']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker04-a5',
        tipo: 'scenario',
        enunciado: 'Qual montagem você escolhe?',
        cena: 'O time vai subir o PostgreSQL em um container para a API de pedidos. O banco precisa manter clientes e pedidos entre reinícios e atualizações da aplicação.',
        opcoes: [
          'Montar um volume nomeado na pasta de dados do PostgreSQL',
          'Guardar os dados dentro do container e nunca removê-lo',
          'Montar a pasta do código da API na pasta de dados do banco',
          'Executar o banco sem armazenamento e recarregar os dados a cada subida'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Depender de nunca remover o container é frágil: qualquer recriação apaga os dados.',
          2: 'A pasta do código não tem relação com os dados do banco.',
          3: 'Recarregar tudo a cada subida não é persistência, é retrabalho.'
        },
        dicas: [
          'Dados críticos moram em volume nomeado.',
          'O volume fica fora do container.'
        ],
        explicacao: 'O volume nomeado mantém os dados do banco entre execuções, independentemente de o container ser recriado.',
        conceitos: ['docker.volumes'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Volume and data',
      blocos: [
        { tipo: 'texto', texto: 'Três palavras para falar de persistência: **volume**, **data** e **keep** (guardar, manter).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (3)',
          pares: [
            ['volume', 'volume (armazenamento que persiste)'],
            ['data', 'dados'],
            ['keep', 'guardar / manter']
          ]
        },
        { tipo: 'ingles', frase: 'The volume keeps the data.', traducao: 'O volume guarda os dados.' },
        { tipo: 'nota', tom: 'info', texto: '**keeps the data** = "guarda os dados" — a promessa que o container não faz sozinho.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker04-a6',
        tipo: 'write-code',
        enunciado: 'Escreva o comando que executa **minha-api** em segundo plano, montando o volume **dados** na pasta `/app/dados`.',
        placeholder: 'docker ...',
        respostasAceitas: [
          'docker run -d -v dados:/app/dados minha-api'
        ],
        dicas: [
          'Use -d para segundo plano e -v para o volume.',
          'O formato é nome:/caminho/no/container.'
        ],
        explicacao: '`docker run -d -v dados:/app/dados minha-api` executa a API em segundo plano com o volume `dados` montado.',
        conceitos: ['docker.volumes', 'docker.container']
      }
    }
  ]
});
