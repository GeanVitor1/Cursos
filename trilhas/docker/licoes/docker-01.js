Plataforma.registrarLicao({
  id: 'docker-01',
  trilha: 'docker',
  tipo: 'licao',
  titulo: 'Imagem vs container',
  subtitulo: 'Fundamentos · Etapa 2',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Diferenciar imagem e container',
    'Baixar uma imagem com docker pull',
    'Criar e listar containers com docker run e docker ps',
    'Reconhecer que um container é descartável'
  ],
  conceitos: ['docker.imagem', 'docker.container'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O molde e a cópia',
      introduz: ['docker.imagem'],
      blocos: [
        { tipo: 'retoma', conceito: 'docker.ambiente', texto: 'Na lição anterior você viu que o ambiente precisa viajar junto com a aplicação. O primeiro passo desse pacote é a **imagem**.' },
        { tipo: 'texto', texto: 'Pense em uma forma de bolo: ela define o formato, mas não é o bolo. A **imagem** é assim — um pacote pronto e **somente leitura** com a aplicação, o runtime e as configurações. Dela nascem quantas cópias você quiser.' },
        { tipo: 'conceito', id: 'docker.imagem', titulo: 'Imagem', texto: 'O molde somente leitura com código, dependências e configuração; dela nascem os containers.', exemplo: 'nginx, redis e mcr.microsoft.com/dotnet/aspnet:8.0 são imagens.' },
        { tipo: 'texto', texto: 'Imagens ficam guardadas em um **registro**. O mais conhecido é o Docker Hub. Para trazer uma imagem de lá, use `docker pull`:' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          codigo: 'docker pull nginx',
          legenda: 'Baixa a imagem oficial do servidor web nginx.'
        },
        { tipo: 'nota', tom: 'info', texto: 'A imagem não executa nada sozinha. Para rodar, ela precisa virar um container.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker01-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que é uma **imagem** Docker?',
        opcoes: [
          'Um pacote somente leitura com a aplicação e suas dependências, do qual nascem os containers',
          'Uma cópia em execução da aplicação',
          'Uma pasta compartilhada entre a máquina e o container',
          'Um servidor de banco de dados instalado na máquina'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A cópia em execução é o container, não a imagem.',
          2: 'Pasta compartilhada é assunto de volumes, não de imagem.',
          3: 'Imagem não é um servidor instalado; é um pacote que pode conter até um banco, mas não se confunde com a máquina.'
        },
        dicas: [
          'Imagem é molde; quem executa é outra coisa.',
          'O molde é somente leitura.'
        ],
        explicacao: 'A imagem é o pacote pronto e imutável. Ela descreve o que a aplicação precisa e serve de base para criar containers.',
        conceitos: ['docker.imagem']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Do molde nasce o container',
      introduz: ['docker.container'],
      blocos: [
        { tipo: 'texto', texto: 'Quando a imagem é executada, ela vira um **container**: uma instância isolada, com processos próprios, que enxerga apenas o que está dentro do pacote.' },
        { tipo: 'conceito', id: 'docker.container', titulo: 'Container', texto: 'Uma instância em execução da imagem, isolada e descartável.', exemplo: 'docker run minha-api' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          codigo: 'docker run nginx\ndocker ps',
          legenda: 'A primeira linha cria e executa um container; a segunda lista os que estão rodando.'
        },
        {
          tipo: 'tabela',
          titulo: 'Imagem x container',
          colunas: ['Pergunta', 'Imagem', 'Container'],
          linhas: [
            ['O que é?', 'O molde somente leitura', 'Uma cópia em execução'],
            ['Quantos existem?', 'Uma imagem pode gerar vários', 'Cada cópia é um container'],
            ['Pode mudar?', 'Não; para mudar, gera outra imagem', 'Sim; o que muda fica na cópia'],
            ['Se apagar, perco o quê?', 'Perde o molde', 'Perde apenas aquela cópia']
          ],
          legenda: 'Do mesmo molde podem sair quantos bolos você quiser.'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Apagar um container **não** apaga a imagem. Você pode criar outro igual na hora.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker01-a2',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada item à sua definição.',
        pares: [
          ['Imagem', 'Pacote somente leitura com a aplicação e as dependências'],
          ['Container', 'Cópia em execução da imagem, isolada e descartável'],
          ['docker pull', 'Traz uma imagem do registro para a sua máquina'],
          ['docker run', 'Cria e executa um container a partir de uma imagem']
        ],
        dicas: [
          'Imagem é molde; container é cópia em execução.',
          'pull = trazer; run = executar.'
        ],
        explicacao: 'A imagem é o pacote, o container é a execução, `docker pull` traz a imagem e `docker run` cria o container.',
        conceitos: ['docker.imagem', 'docker.container']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'A vida de um container',
      blocos: [
        { tipo: 'texto', texto: 'O ciclo é curto e direto: baixar a imagem, criar o container, conferir o que está rodando e, quando não precisar mais, parar.' },
        {
          tipo: 'passos',
          itens: [
            '`docker pull nginx` — traz a imagem para a máquina',
            '`docker run -d nginx` — cria e executa um container em segundo plano (o `-d` libera o terminal)',
            '`docker ps` — mostra os containers em execução',
            '`docker stop <nome ou id>` — para o container sem apagar nada'
          ]
        },
        {
          tipo: 'tabela',
          titulo: 'Dois olhares para a lista',
          colunas: ['Comando', 'O que mostra'],
          linhas: [
            ['docker ps', 'Somente os containers em execução'],
            ['docker ps -a', 'Todos, inclusive os parados']
          ],
          legenda: 'Um container parado continua existindo até ser removido.'
        },
        { tipo: 'nota', tom: 'info', texto: 'Repare no `-a` de `docker ps -a`: ele significa "todos" e é a forma de achar um container que você parou.' },
        { tipo: 'trabalho', texto: 'No dia a dia, subir um serviço auxiliar em um container — uma ferramenta de banco, um servidor de arquivos — leva segundos e não deixa resíduo na máquina: terminou o uso, o container é removido.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker01-a3',
        tipo: 'predict-output',
        enunciado: 'O container foi parado, mas você quer conferir se ele **ainda existe** antes de criar outro. Qual comando mostra também os containers parados?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'docker stop minha-api' },
          { tipo: 'nota', tom: 'info', texto: 'O container chamado **minha-api** foi parado agora.' }
        ],
        opcoes: [
          'docker ps -a, que mostra também os containers parados',
          'docker ps, que mostra todos os containers sempre',
          'docker pull, que recarrega a lista de containers',
          'docker run, que mostra o histórico de execuções'
        ],
        correta: 0,
        feedbackErro: {
          1: 'docker ps sem -a mostra apenas os que estão rodando.',
          2: 'docker pull baixa imagens e não lista containers.',
          3: 'docker run cria um novo container; ele não lista nem mostra histórico.'
        },
        dicas: [
          'A letra a vem de all, todos.',
          'Sem o -a, os parados não aparecem.'
        ],
        explicacao: '`docker ps` lista só os containers em execução. Com o `-a` você enxerga também os parados — por isso o seu apareceu.',
        conceitos: ['docker.container']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker01-a4',
        tipo: 'order-blocks',
        enunciado: 'Ordene o ciclo completo: trazer a imagem, criar o container, conferir a lista e parar.',
        blocos: [
          'docker pull nginx',
          'docker run nginx',
          'docker ps',
          'docker stop nginx'
        ],
        dicas: [
          'Nada roda antes de a imagem chegar.',
          'Conferir vem antes de parar.'
        ],
        explicacao: '`docker pull` traz a imagem, `docker run` cria o container, `docker ps` confere e `docker stop` encerra a execução.',
        conceitos: ['docker.imagem', 'docker.container']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Container and image',
      blocos: [
        { tipo: 'texto', texto: 'Estas duas palavras aparecem em toda documentação: **container** e **image**.' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['container', 'contêiner (instância em execução)'],
            ['image', 'imagem (o molde empacotado)']
          ]
        },
        { tipo: 'ingles', frase: 'A container runs from an image.', traducao: 'Um contêiner roda a partir de uma imagem.' },
        { tipo: 'nota', tom: 'info', texto: '**runs from an image** = "roda a partir de uma imagem" — exatamente a relação que você acabou de aprender.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker01-a5',
        tipo: 'write-code',
        enunciado: 'Escreva o comando que cria e executa um container a partir da imagem **minha-api**.',
        placeholder: 'docker ...',
        respostasAceitas: [
          'docker run minha-api'
        ],
        dicas: [
          'A imagem é executada com docker run.',
          'Só a imagem, sem opções extras.'
        ],
        explicacao: '`docker run minha-api` cria um container a partir da imagem `minha-api` e já o executa.',
        conceitos: ['docker.container', 'docker.imagem']
      }
    }
  ]
});
