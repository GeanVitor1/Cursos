Plataforma.registrarLicao({
  id: 'docker-06',
  trilha: 'docker',
  tipo: 'licao',
  titulo: 'Networks',
  subtitulo: 'Docker na prática · Etapa 8',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Explicar por que containers precisam de uma rede própria',
    'Criar e usar uma rede com docker network',
    'Conectar serviços pelo nome, sem depender de IP',
    'Reconhecer o erro de usar localhost entre containers'
  ],
  conceitos: ['docker.networks'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Containers que precisam conversar',
      introduz: ['docker.networks'],
      blocos: [
        { tipo: 'retoma', conceito: 'docker.container', texto: 'Cada container é isolado, inclusive na rede. A API em um container e o banco em outro **não se enxergam** por padrão.' },
        { tipo: 'texto', texto: 'Para os dois conversarem, eles entram na mesma rede. A rede do Docker é uma rede interna, criada por você e visível apenas para os containers que participam dela.' },
        { tipo: 'conceito', id: 'docker.networks', titulo: 'Redes do Docker', texto: 'A rede interna que permite os containers se encontrarem por nome, sem depender de IP.', exemplo: 'api e db conversando pela rede criada no projeto.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          codigo: 'docker network create minha-rede',
          legenda: 'Cria uma rede interna chamada minha-rede.'
        },
        { tipo: 'nota', tom: 'info', texto: 'Sem rede em comum, nem nome nem endereço funcionam: os containers ficam em mundos separados.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker06-a1',
        tipo: 'multiple-choice',
        enunciado: 'Por que a API precisa entrar na mesma **rede** do banco de dados?',
        opcoes: [
          'Porque containers isolados não conseguem se comunicar até compartilharem uma rede',
          'Porque a rede deixa os containers mais rápidos na escrita',
          'Porque sem rede o banco não aceita senha',
          'Porque a rede é o que publica as portas para a máquina'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A rede não muda a velocidade de escrita; ela permite a comunicação.',
          2: 'Senha é configuração, não rede.',
          3: 'Quem publica portas para a máquina é o -p, não a rede.'
        },
        dicas: [
          'Isolamento inclui a rede.',
          'Dois containers precisam de um caminho comum.'
        ],
        explicacao: 'A rede do Docker cria o caminho de comunicação entre os containers que participam dela. Sem isso, cada um fica isolado.',
        conceitos: ['docker.networks', 'docker.container']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Nome em vez de endereço',
      blocos: [
        { tipo: 'texto', texto: 'Dentro de uma rede, cada container recebe um endereço e um **nome**. O Docker resolve o nome automaticamente, então a aplicação não precisa saber IP algum:' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          codigo: 'docker run -d --network minha-rede --name banco postgres\ndocker run -d --network minha-rede --name api minha-api',
          legenda: 'Os dois containers entram na mesma rede e ganham nomes.'
        },
        {
          tipo: 'tabela',
          titulo: 'Como a API encontra o banco',
          colunas: ['Onde a API roda', 'Endereço do banco na configuração'],
          linhas: [
            ['Na máquina, fora do Docker', 'localhost'],
            ['Em um container da mesma rede', 'banco (o nome do container)']
          ],
          legenda: 'O nome vale apenas dentro da rede em que os dois participam.'
        },
        { tipo: 'nota', tom: 'info', texto: 'Nomes fixos deixam a configuração estável: o endereço não muda a cada reinício, como aconteceria com um IP sorteado.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker06-a2',
        tipo: 'fill-code',
        enunciado: 'Complete para colocar a API na rede **minha-rede**.',
        codigo: 'docker run -d {{1}} minha-rede --name api minha-api',
        lacunas: [['--network']],
        dicas: [
          'A opção começa com dois traços.',
          'É a opção que escolhe a rede do container.'
        ],
        explicacao: 'A opção conecta o container à rede indicada, permitindo que ele encontre os outros participantes pelo nome.',
        conceitos: ['docker.networks']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker06-a3',
        tipo: 'predict-output',
        enunciado: 'A API e o banco estão na mesma rede, com o container do banco chamado **banco**. Qual string de conexão funciona?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'docker run -d --network minha-rede --name banco postgres\ndocker run -d --network minha-rede --name api minha-api' }
        ],
        opcoes: [
          'Server=banco;Database=Pedidos',
          'Server=localhost;Database=Pedidos',
          'Server=127.0.0.1;Database=Pedidos',
          'Server=minha-rede;Database=Pedidos'
        ],
        correta: 0,
        feedbackErro: {
          1: 'localhost, dentro do container da API, aponta para o próprio container da API.',
          2: 'O mesmo vale para 127.0.0.1: é o endereço interno do próprio container.',
          3: 'minha-rede é o nome da rede, não do container do banco.'
        },
        dicas: [
          'O Docker resolve o nome do container.',
          'localhost dentro de um container significa ele mesmo.'
        ],
        explicacao: 'Na mesma rede, o nome `banco` resolve para o container do banco. `localhost` apontaria para a própria API.',
        conceitos: ['docker.networks']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Isolamento entre redes',
      blocos: [
        { tipo: 'texto', texto: 'Redes separam grupos de containers. Dois serviços em redes diferentes continuam invisíveis um para o outro, mesmo rodando na mesma máquina.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          codigo: 'docker network ls',
          legenda: 'Lista as redes existentes na máquina.'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Um container pode participar de mais de uma rede. Isso é usado quando ele precisa falar com dois grupos isolados — e é um recurso para usar com critério.' },
        { tipo: 'trabalho', texto: 'Em projetos reais, cada aplicação ganha a sua rede: a API fala com o banco dela, sem enxergar os serviços de outro sistema. Esse isolamento reduz o alcance de um eventual problema.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker06-a4',
        tipo: 'scenario',
        enunciado: 'Qual é a causa mais provável do erro?',
        cena: 'A API foi movida para um container e agora recebe erro de conexão recusada ao tentar falar com o banco, que também roda em um container. Antes, os dois rodavam direto na máquina e tudo funcionava.',
        opcoes: [
          'A API e o banco não estão na mesma rede, então não se encontram',
          'O banco perdeu a senha ao entrar no container',
          'A porta do banco não pode ser usada por containers',
          'O Docker não permite dois containers do mesmo projeto'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A senha é configuração e continua valendo; o caminho de rede é que mudou.',
          2: 'Portas funcionam normalmente entre containers na mesma rede.',
          3: 'Vários containers do mesmo projeto convivem sem problema.'
        },
        dicas: [
          'O que mudou quando os serviços entraram em containers?',
          'Isolamento de rede é o padrão; comunicação precisa ser criada.'
        ],
        explicacao: 'Na máquina, os dois usavam a rede local. Em containers isolados, é preciso colocá-los na mesma rede do Docker para que voltem a se encontrar.',
        conceitos: ['docker.networks', 'docker.container']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker06-a5',
        tipo: 'find-error',
        enunciado: 'A configuração abaixo foi recusada na revisão. Por quê?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'docker run -d --network minha-rede --name api -e ConnectionStrings__Default="Server=localhost;Database=Pedidos" minha-api' }
        ],
        opcoes: [
          'Dentro do container da API, localhost aponta para a própria API; o correto é o nome do container do banco',
          'A opção --network não pode ser usada junto com -e',
          'O nome api não pode ser usado em um container',
          'A string de conexão precisa ficar dentro do Dockerfile'
        ],
        correta: 0,
        feedbackErro: {
          1: 'As duas opções são independentes e podem ser combinadas.',
          2: 'Qualquer nome válido serve para identificar o container.',
          3: 'Configuração não fica no Dockerfile; ela chega por variáveis.'
        },
        dicas: [
          'Onde o localhost aponta dentro de um container?',
          'Na mesma rede, use o nome do serviço.'
        ],
        explicacao: 'Em uma configuração de containers, `localhost` é o próprio container. A API deve apontar para o nome do container do banco, como `banco`.',
        conceitos: ['docker.networks', 'docker.variaveis']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Network',
      blocos: [
        { tipo: 'texto', texto: 'A palavra nova é **network** (rede).' },
        {
          tipo: 'vocab',
          titulo: 'Palavra nova (1)',
          pares: [
            ['network', 'rede']
          ]
        },
        { tipo: 'ingles', frase: 'The network connects the containers by name.', traducao: 'A rede conecta os containers pelo nome.' },
        { tipo: 'nota', tom: 'info', texto: '**connects by name** = "conecta pelo nome" — a tradução exata do que você montou nesta lição.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker06-a6',
        tipo: 'write-code',
        enunciado: 'Escreva o comando que cria a rede chamada **minha-rede**.',
        placeholder: 'docker ...',
        respostasAceitas: [
          'docker network create minha-rede'
        ],
        dicas: [
          'O comando de redes é docker network.',
          'Para criar, use create seguido do nome.'
        ],
        explicacao: '`docker network create minha-rede` cria uma rede interna onde os containers podem se encontrar pelo nome.',
        conceitos: ['docker.networks']
      }
    }
  ]
});
