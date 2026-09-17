Plataforma.registrarLicao({
  id: 'docker-03',
  trilha: 'docker',
  tipo: 'licao',
  titulo: 'Portas',
  subtitulo: 'Docker na prática · Etapa 5',
  duracaoMin: 30,
  xp: 30,
  objetivos: [
    'Explicar por que a porta do container não é acessível direto',
    'Publicar portas com a opção -p',
    'Interpretar o formato externa:interna',
    'Resolver conflitos de porta já ocupada na máquina'
  ],
  conceitos: ['docker.portas'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'A porta de fora',
      introduz: ['docker.portas'],
      blocos: [
        { tipo: 'retoma', conceito: 'docker.container', texto: 'O container é isolado: ele tem rede própria e a aplicação dentro dele escuta em uma porta **interna**, que só existe ali.' },
        { tipo: 'texto', texto: 'Se a API escuta na porta 80 dentro do container, ninguém de fora consegue acessá-la. É preciso **publicar** essa porta, ligando uma porta da máquina à porta interna.' },
        { tipo: 'conceito', id: 'docker.portas', titulo: 'Publicar portas', texto: 'A ligação entre a porta do container e a porta da máquina, no formato -p externa:interna.', exemplo: 'docker run -p 8080:80 nginx' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          codigo: 'docker run -d -p 8080:80 nginx',
          legenda: 'A porta 8080 da máquina encaminha para a porta 80 do container.'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'A ordem é **externa:interna**. O número antes dos dois pontos é a porta da sua máquina; o depois é a do container.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker03-a1',
        tipo: 'multiple-choice',
        enunciado: 'No comando `docker run -p 9090:80 minha-api`, o que significa cada número?',
        opcoes: [
          'A porta 9090 da máquina encaminha para a porta 80 do container',
          'A porta 80 da máquina encaminha para a porta 9090 do container',
          'As duas portas pertencem à máquina e a do container é escolhida pelo Docker',
          'A porta 9090 é do banco de dados e a 80 é da API'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A ordem está invertida: externa vem primeiro.',
          2: 'A parte depois dos dois pontos é sempre a porta interna do container.',
          3: 'As portas não identificam serviços; elas pertencem à máquina e ao container.'
        },
        dicas: [
          'O formato é externa:interna.',
          'Quem acessa de fora bate na porta da máquina.'
        ],
        explicacao: '`-p 9090:80` publica a porta interna 80 do container na porta 9090 da máquina. Quem abre `localhost:9090` chega na aplicação.',
        conceitos: ['docker.portas']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Vários containers, várias portas',
      blocos: [
        { tipo: 'texto', texto: 'A porta interna é escolha da aplicação e se repete em todos os containers dela. A porta da máquina é escolha sua e precisa ser única em cada container.' },
        {
          tipo: 'tabela',
          titulo: 'Dois containers da mesma API',
          colunas: ['Container', 'Porta interna', 'Porta na máquina'],
          linhas: [
            ['api-1', 80, 8080],
            ['api-2', 80, 8081]
          ],
          legenda: 'A porta interna pode repetir; a externa não pode, porque a máquina é uma só.'
        },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          codigo: 'docker run -d -p 8080:80 minha-api\ndocker run -d -p 8081:80 minha-api',
          legenda: 'Dois containers da mesma imagem, acessíveis em portas diferentes.'
        },
        { tipo: 'nota', tom: 'info', texto: 'Esse é o arranjo usado para testar uma versão nova ao lado da atual, sem derrubar a que já está no ar.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker03-a2',
        tipo: 'fill-code',
        enunciado: 'Complete para publicar a API na porta **8080** da máquina, ligada à porta 80 do container.',
        codigo: 'docker run -d -p {{1}}:80 minha-api',
        lacunas: [['8080']],
        dicas: [
          'O primeiro número é a porta da máquina.',
          'É a porta que você vai digitar no navegador.'
        ],
        explicacao: '`-p 8080:80` liga a porta 8080 da máquina à porta 80 do container.',
        conceitos: ['docker.portas']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker03-a3',
        tipo: 'predict-output',
        enunciado: 'Em qual endereço o time acessa a API no navegador?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'docker run -d -p 5000:80 minha-api' },
          { tipo: 'nota', tom: 'info', texto: 'A API está rodando e o comando terminou sem erro.' }
        ],
        opcoes: [
          'http://localhost:5000',
          'http://localhost:80',
          'http://localhost:8080',
          'http://minha-api:80'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A porta 80 está publicada como 5000 na máquina; ninguém a alcança direto.',
          2: '8080 não aparece no comando.',
          3: 'minha-api é o nome da imagem, não um endereço na máquina.'
        },
        dicas: [
          'Use a porta que foi publicada na máquina.',
          'É o primeiro número depois de -p.'
        ],
        explicacao: 'O comando publica a porta interna 80 na porta 5000 da máquina, então o acesso é `http://localhost:5000`.',
        conceitos: ['docker.portas']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Portas ocupadas e conflitos',
      blocos: [
        { tipo: 'texto', texto: 'Se outro programa já usa a porta na máquina, o Docker avisa e o container nem sobe:' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          codigo: 'docker: Error response from daemon: Bind for 0.0.0.0:8080 failed: port is already allocated.',
          legenda: 'A porta 8080 da máquina já pertence a outro processo.'
        },
        { tipo: 'texto', texto: 'A solução é simples: publicar em outra porta da máquina, mantendo a interna como está.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          codigo: 'docker run -d -p 8090:80 minha-api',
          legenda: 'Troca apenas a porta externa.'
        },
        { tipo: 'nota', tom: 'info', texto: 'O `docker ps` mostra a coluna de portas com o mapeamento de cada container em execução.' },
        { tipo: 'trabalho', texto: 'Em ambientes compartilhados, conflito de porta é um dos primeiros erros que aparecem. Saber ler o mapeamento no `docker ps` resolve o chamado em segundos.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker03-a4',
        tipo: 'find-error',
        enunciado: 'O comando abaixo falhou com a mensagem de porta já alocada. Qual é a correção?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'docker run -d -p 8080:80 minha-api\ndocker run -d -p 8080:80 minha-api' }
        ],
        opcoes: [
          'Publicar o segundo container em outra porta da máquina, como 8081:80',
          'Apagar a imagem e baixá-la de novo',
          'Parar o Docker e começar tudo outra vez',
          'Usar a mesma porta, mas com o parâmetro -d na frente'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O problema não é a imagem; ela pode gerar vários containers.',
          2: 'Reiniciar o Docker não libera a porta que o primeiro container está usando.',
          3: 'O -d não muda a porta; ele só executa em segundo plano.'
        },
        dicas: [
          'A porta da máquina é uma só.',
          'Cada container precisa de uma porta externa diferente.'
        ],
        explicacao: 'A porta 8080 da máquina já está em uso pelo primeiro container. O segundo precisa de outra porta externa, como `-p 8081:80`.',
        conceitos: ['docker.portas', 'docker.container']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Dentro e fora do container',
      blocos: [
        { tipo: 'texto', texto: 'Vale separar bem os dois lados. A porta interna pertence à aplicação; a externa pertence à máquina e ao time que acessa.' },
        {
          tipo: 'diagrama',
          titulo: 'Como o acesso chega',
          arte: [
            '  navegador                máquina                     container',
            '  http://localhost:8080 -> porta 8080  --encaminha-->  porta 80',
            '                                                    (aplicação escuta aqui)'
          ].join('\n'),
          legenda: 'A porta externa fica na máquina; a interna, dentro do container.'
        },
        { tipo: 'texto', texto: 'No Dockerfile, o `EXPOSE` apenas **documenta** a porta que a aplicação usa dentro do container. Quem realmente abre o caminho para fora é o `-p` na execução.' },
        {
          tipo: 'codigo',
          linguagem: 'dockerfile',
          codigo: 'EXPOSE 80',
          legenda: 'Deixa claro para o time que a aplicação escuta na porta 80.'
        },
        { tipo: 'nota', tom: 'atencao', texto: '`EXPOSE` sozinho não publica nada. Sem o `-p`, o container continua inacessível de fora.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker03-a5',
        tipo: 'scenario',
        enunciado: 'Qual comando você deve sugerir ao time?',
        cena: 'A API está pronta e roda na porta 80 dentro do container. O time quer acessá-la no navegador da máquina pela porta 8080, ao lado de outro serviço que já usa a 8090.',
        opcoes: [
          'docker run -d -p 8080:80 minha-api',
          'docker run -d -p 80:8080 minha-api',
          'docker run -d -p 8090:80 minha-api',
          'docker run -d minha-api'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A ordem externa:interna está invertida; a porta da máquina ficaria 80.',
          2: 'A porta 8090 já está ocupada pelo outro serviço.',
          3: 'Sem -p, a API não é acessível de fora do container.'
        },
        dicas: [
          'A porta pedida é a da máquina.',
          'Externa primeiro, interna depois.'
        ],
        explicacao: '`-p 8080:80` deixa a API acessível em `localhost:8080`, sem conflitar com o serviço que já usa a 8090.',
        conceitos: ['docker.portas']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Port',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras para falar do caminho de acesso: **port** (porta) e **outside** (fora).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['port', 'porta'],
            ['outside', 'fora / do lado de fora']
          ]
        },
        { tipo: 'ingles', frase: 'The port connects the container to the outside.', traducao: 'A porta liga o container ao lado de fora.' },
        { tipo: 'nota', tom: 'info', texto: '**to the outside** = "para o lado de fora" — exatamente o papel da porta publicada.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker03-a6',
        tipo: 'write-code',
        enunciado: 'Escreva o comando que executa a imagem **minha-api** em segundo plano, publicando a porta interna 80 na porta **8080** da máquina.',
        placeholder: 'docker ...',
        respostasAceitas: [
          'docker run -d -p 8080:80 minha-api'
        ],
        dicas: [
          'Use -d para segundo plano e -p para publicar.',
          'Externa primeiro: 8080, depois 80.'
        ],
        explicacao: '`docker run -d -p 8080:80 minha-api` executa em segundo plano e publica a porta 8080 da máquina para a 80 do container.',
        conceitos: ['docker.portas', 'docker.container']
      }
    }
  ]
});
