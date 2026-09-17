Plataforma.registrarLicao({
  id: 'docker-checkpoint-pratica',
  trilha: 'docker',
  tipo: 'prova',
  titulo: 'Checkpoint — Prática',
  subtitulo: 'Docker na prática · Etapa 9',
  duracaoMin: 40,
  xp: 100,
  objetivos: [
    'Publicar portas com o formato externa:interna',
    'Persistir dados com volumes',
    'Entregar configuração por variáveis de ambiente',
    'Conectar serviços pela rede do Docker'
  ],
  conceitos: ['docker.portas', 'docker.volumes', 'docker.variaveis', 'docker.networks', 'docker.container', 'docker.imagem'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova de nível: Docker na prática',
      blocos: [
        { tipo: 'texto', texto: 'São **8 atividades** cobrindo portas, volumes, variáveis de ambiente e redes. Aqui os comandos aparecem completos, como você os verá em um projeto real.' },
        {
          tipo: 'lista',
          itens: [
            'Leia o comando inteiro antes de responder: as opções dizem muito.',
            'Quando faltar contexto, use as dicas.',
            'O resultado mostra qual área da prática precisa de revisão.'
          ]
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-p1',
        tipo: 'multiple-choice',
        enunciado: 'O comando `docker run -d -p 3000:80 minha-api` falhou porque a porta 3000 da máquina já está em uso. Qual é a correção mais simples?',
        opcoes: [
          'Publicar em outra porta da máquina, como -p 3001:80',
          'Trocar a porta interna da API para 3001',
          'Remover o -d para rodar em primeiro plano',
          'Baixar a imagem novamente'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A porta interna não é o problema; a externa é que está ocupada.',
          2: 'O -d não interfere na porta.',
          3: 'A imagem não tem relação com o conflito de porta.'
        },
        dicas: [
          'O conflito é na porta da máquina.',
          'Mude apenas o número de fora.'
        ],
        explicacao: 'A porta externa está ocupada. Trocar para `-p 3001:80` mantém a aplicação intacta e libera o conflito.',
        conceitos: ['docker.portas']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-p2',
        tipo: 'fill-code',
        enunciado: 'Complete para que o banco de pedidos grave os dados no volume **dados**.',
        codigo: 'docker run -d {{1}} dados:/var/lib/postgresql/data postgres',
        lacunas: [['-v']],
        dicas: [
          'A opção de volume tem uma letra.',
          'Vem antes do nome do volume.'
        ],
        explicacao: 'A opção -v monta o volume nomeado na pasta de dados do banco.',
        conceitos: ['docker.volumes']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-p3',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre persistência e configuração.',
        afirmacoes: [
          { texto: 'Um volume nomeado continua existindo depois que o container é removido.', correta: true, explicacao: 'O volume fica fora do container e sobrevive à remoção.' },
          { texto: 'A variável passada com -e altera a imagem usada pelo container.', correta: false, explicacao: 'A imagem é somente leitura; a variável vale para a execução.' },
          { texto: 'docker volume rm apaga os dados guardados no volume.', correta: true, explicacao: 'Por isso é uma operação que exige cuidado.' }
        ],
        dicas: [
          'Volume tem vida própria.',
          'Imagem não muda na execução.'
        ],
        explicacao: 'Volumes sobrevivem ao container, mas podem ser removidos com um comando específico; variáveis de ambiente apenas configuram cada execução.',
        conceitos: ['docker.volumes', 'docker.variaveis', 'docker.imagem']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-p4',
        tipo: 'scenario',
        enunciado: 'Qual conjunto de opções atende ao pedido?',
        cena: 'A API precisa rodar em segundo plano, acessível na porta 8080 da máquina, conectada ao banco pelo nome do container **banco**. O banco está na rede minha-rede.',
        opcoes: [
          'docker run -d -p 8080:80 --network minha-rede -e ConnectionStrings__Default="Server=banco;Database=Pedidos" minha-api',
          'docker run -d -p 80:8080 --network minha-rede -e ConnectionStrings__Default="Server=localhost;Database=Pedidos" minha-api',
          'docker run -d -p 8080:80 --name minha-rede -e ConnectionStrings__Default="Server=minha-rede;Database=Pedidos" minha-api',
          'docker run -d -p 8080:80 -v minha-rede -e ConnectionStrings__Default="Server=localhost;Database=Pedidos" minha-api'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A ordem das portas está invertida e localhost aponta para a própria API.',
          2: '--name cria um nome para o container, não entra na rede; e minha-rede não é o servidor.',
          3: '-v monta volume, não rede; e localhost não alcança o banco.'
        },
        dicas: [
          'Externa antes da interna; rede com --network; servidor com o nome do container.',
          'O banco se chama banco e está na rede minha-rede.'
        ],
        explicacao: 'A combinação correta publica a porta, entra na rede e configura a conexão pelo nome do container do banco.',
        conceitos: ['docker.portas', 'docker.networks', 'docker.variaveis'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-p5',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada opção à sua função.',
        pares: [
          ['-p 8080:80', 'Publica a porta interna 80 na porta 8080 da máquina'],
          ['-v dados:/app/dados', 'Monta o volume dados na pasta da aplicação'],
          ['-e NOME=valor', 'Entrega uma variável de ambiente'],
          ['--network minha-rede', 'Coloca o container na rede indicada']
        ],
        dicas: [
          'Cada opção resolve um dos quatro temas da etapa.',
          'A ordem do -p é externa:interna.'
        ],
        explicacao: 'Portas, volumes, variáveis e redes são as quatro opções que moldam um container na prática.',
        conceitos: ['docker.portas', 'docker.volumes', 'docker.variaveis', 'docker.networks']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-p6',
        tipo: 'find-error',
        enunciado: 'A API e o banco rodam em containers da mesma rede, mas a conexão falha com o endereço localhost. Qual é o diagnóstico?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'docker run -d --network minha-rede --name banco postgres\ndocker run -d --network minha-rede -e ConnectionStrings__Default="Server=localhost;Database=Pedidos" minha-api' }
        ],
        opcoes: [
          'Dentro do container da API, localhost aponta para ela mesma; o correto é usar o nome banco',
          'A rede minha-rede precisa ser criada antes de cada execução',
          'O banco não aceita conexões de outros containers',
          'O -e não pode ser combinado com --network'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A rede é criada uma vez e reaproveitada nos comandos seguintes.',
          2: 'Bancos em containers aceitam conexões de outros containers na mesma rede.',
          3: 'As opções são independentes e funcionam juntas.'
        },
        dicas: [
          'O que significa localhost dentro de um container?',
          'Use o nome do container do banco.'
        ],
        explicacao: '`localhost` é sempre o próprio container. Nome `banco` é o endereço correto dentro da rede compartilhada.',
        conceitos: ['docker.networks', 'docker.variaveis']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-p7',
        tipo: 'predict-output',
        enunciado: 'O banco grava no volume **dados**. Depois de remover e recriar o container com o mesmo volume, o que acontece?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'docker rm -f banco\ndocker run -d --name banco -v dados:/var/lib/postgresql/data postgres' }
        ],
        opcoes: [
          'Os dados anteriores continuam no volume e ficam disponíveis para o novo container',
          'O banco inicia vazio, porque o container é novo',
          'O comando falha, porque o volume está preso ao container antigo',
          'O Docker apaga o volume antigo e cria outro automaticamente'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O conteúdo está no volume, não no container.',
          2: 'O volume não fica preso: pode ser montado em outro container.',
          3: 'O Docker só cria outro volume se você usar um nome diferente.'
        },
        dicas: [
          'O volume é a parte que sobrevive.',
          'Mesmo nome, mesmo conteúdo.'
        ],
        explicacao: 'O volume `dados` guarda o conteúdo fora do container. Recriar o container montando o mesmo volume não perde nada.',
        conceitos: ['docker.volumes', 'docker.container']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-p8',
        tipo: 'write-code',
        enunciado: 'Escreva um comando que executa **minha-api** em segundo plano, publicando a porta 8080 da máquina para a 80 do container e entregando a variável **ASPNETCORE_ENVIRONMENT=Development**.',
        placeholder: 'docker ...',
        respostasAceitas: [
          'docker run -d -p 8080:80 -e aspnetcore_environment=development minha-api'
        ],
        dicas: [
          'Comece com docker run -d.',
          'Depois -p com externa:interna e -e com NOME=valor.'
        ],
        explicacao: 'O comando combina segundo plano, porta publicada e variável de ambiente.',
        conceitos: ['docker.portas', 'docker.variaveis', 'docker.container']
      }
    }
  ]
});
