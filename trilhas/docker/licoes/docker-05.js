Plataforma.registrarLicao({
  id: 'docker-05',
  trilha: 'docker',
  tipo: 'licao',
  titulo: 'Variáveis de ambiente',
  subtitulo: 'Docker na prática · Etapa 7',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Explicar por que a configuração não fica dentro da imagem',
    'Passar variáveis para o container com -e',
    'Agrupar configurações em um arquivo .env',
    'Reconhecer o risco de guardar segredos no repositório'
  ],
  conceitos: ['docker.variaveis'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'A mesma imagem, configurações diferentes',
      introduz: ['docker.variaveis'],
      blocos: [
        { tipo: 'retoma', conceito: 'docker.imagem', texto: 'A imagem é **somente leitura**: não dá para editá-la para trocar a conexão do banco. E nem deve: a mesma imagem precisa valer para todos os ambientes.' },
        { tipo: 'texto', texto: 'Se a conexão do banco ficasse gravada na imagem, você precisaria de uma imagem diferente para desenvolvimento, teste e produção. O caminho certo é a imagem ser fixa e a **configuração** chegar na hora de executar.' },
        { tipo: 'conceito', id: 'docker.variaveis', titulo: 'Variáveis de ambiente', texto: 'Configuração passada em tempo de execução com -e ou em um arquivo .env.', exemplo: 'docker run -e ASPNETCORE_ENVIRONMENT=Development minha-api' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          codigo: 'docker run -d -e ASPNETCORE_ENVIRONMENT=Development minha-api',
          legenda: 'A variável é entregue ao processo que roda dentro do container.'
        },
        { tipo: 'nota', tom: 'info', texto: 'O formato é `-e NOME=valor`. A aplicação .NET lê essa variável como se fosse configuração do projeto.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker05-a1',
        tipo: 'multiple-choice',
        enunciado: 'Por que a configuração da aplicação **não** deve ficar gravada na imagem?',
        opcoes: [
          'Porque a mesma imagem precisa rodar em ambientes diferentes, recebendo a configuração na execução',
          'Porque a imagem não aceita nenhum tipo de texto',
          'Porque variáveis ocupam muito espaço em disco',
          'Porque o Docker apaga a configuração ao construir a imagem'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A imagem aceita arquivos e textos; o problema é outro.',
          2: 'O espaço ocupado não é o motivo.',
          3: 'O Docker não apaga nada por conta própria; a questão é de desenho.'
        },
        dicas: [
          'Imagem fixa, configuração variável.',
          'Uma imagem para vários ambientes.'
        ],
        explicacao: 'A imagem é o pacote imutável; o ambiente e a configuração chegam por variáveis na execução, permitindo reutilizar a mesma imagem em todos os contextos.',
        conceitos: ['docker.variaveis', 'docker.imagem']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Uma variável, várias variáveis',
      blocos: [
        { tipo: 'texto', texto: 'Para mais de uma configuração, repita o `-e`. Cada uma vira uma variável de ambiente dentro do container:' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          codigo: 'docker run -d \\\n  -e ASPNETCORE_ENVIRONMENT=Development \\\n  -e ConnectionStrings__Default="Server=localhost;Database=Pedidos" \\\n  minha-api',
          legenda: 'Ambiente e conexão chegam como variáveis separadas.'
        },
        {
          tipo: 'tabela',
          titulo: 'Exemplos de configuração',
          colunas: ['Variável', 'Para que serve'],
          linhas: [
            ['ASPNETCORE_ENVIRONMENT', 'Diz se a API roda em Development ou em outro ambiente'],
            ['ConnectionStrings__Default', 'Informa o endereço e o banco usados pela aplicação'],
            ['ASPNETCORE_URLS', 'Define em qual endereço interno a API escuta']
          ],
          legenda: 'O nome da variável é a chave que a aplicação .NET procura na configuração.'
        },
        { tipo: 'nota', tom: 'info', texto: 'No mundo .NET, dois underscores seguidos representam a separação de níveis da configuração (`ConnectionStrings__Default` lê `ConnectionStrings:Default`).' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker05-a2',
        tipo: 'fill-code',
        enunciado: 'Complete para entregar a variável de ambiente à API.',
        codigo: 'docker run -d {{1}} ASPNETCORE_ENVIRONMENT=Development minha-api',
        lacunas: [['-e']],
        dicas: [
          'A opção vem antes do NOME=valor.',
          'São dois caracteres: um traço e uma letra.'
        ],
        explicacao: 'A opção -e cria a variável de ambiente dentro do container.',
        conceitos: ['docker.variaveis']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker05-a3',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre configuração em containers.',
        afirmacoes: [
          { texto: 'A mesma imagem pode rodar em Development e em produção, mudando apenas as variáveis.', correta: true, explicacao: 'É exatamente para isso que a configuração fica fora da imagem.' },
          { texto: 'Uma variável passada com -e fica gravada dentro da imagem.', correta: false, explicacao: 'Ela vale para aquela execução do container, não altera a imagem.' },
          { texto: 'A aplicação .NET consegue ler variáveis de ambiente como configuração.', correta: true, explicacao: 'O provedor de configuração do .NET lê variáveis de ambiente automaticamente.' }
        ],
        dicas: [
          'A imagem é somente leitura.',
          'Configuração chega na execução, não no build.'
        ],
        explicacao: 'A imagem não muda; cada execução recebe a configuração que precisa por variáveis de ambiente.',
        conceitos: ['docker.variaveis', 'docker.imagem']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O arquivo .env',
      blocos: [
        { tipo: 'texto', texto: 'Passar dez variáveis na linha de comando fica impraticável. Em vez disso, guarde os pares `NOME=valor` em um arquivo `.env` e aponte para ele:' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          titulo: '.env',
          codigo: 'ASPNETCORE_ENVIRONMENT=Development\nConnectionStrings__Default=Server=localhost;Database=Pedidos',
          legenda: 'Um par NOME=valor por linha.'
        },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          codigo: 'docker run -d --env-file .env minha-api',
          legenda: 'Todas as variáveis do arquivo entram no container de uma vez.'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'O arquivo `.env` costuma conter senhas. Ele **não** pode ir para o repositório: mantenha o arquivo fora do versionamento, como você viu na trilha de Git.' },
        { tipo: 'trabalho', texto: 'A separação entre imagem e configuração é o que permite promover a mesma build de desenvolvimento para teste e produção. O que muda no caminho são apenas os valores das variáveis.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker05-a4',
        tipo: 'scenario',
        enunciado: 'Qual é a melhor solução para o time?',
        cena: 'A API precisa apontar para bancos diferentes em cada máquina do time. Hoje cada pessoa edita a string de conexão no código antes de rodar, e isso vive gerando conflito no repositório.',
        opcoes: [
          'Manter a imagem fixa e entregar a conexão por variável de ambiente em cada execução',
          'Gerar uma imagem diferente para cada pessoa do time',
          'Deixar a conexão fixa no código e pedir para ninguém alterar',
          'Guardar a senha do banco dentro do Dockerfile'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Uma imagem por pessoa multiplica o trabalho e o risco de divergência.',
          2: 'Conexão fixa no código quebra em qualquer ambiente diferente.',
          3: 'Dockerfile vai para o repositório; senha ali vira segredo exposto.'
        },
        dicas: [
          'Uma imagem, configurações diferentes.',
          'A configuração chega na execução.'
        ],
        explicacao: 'Com a conexão em variáveis de ambiente, cada máquina usa os seus valores e a imagem continua a mesma para todos.',
        conceitos: ['docker.variaveis', 'docker.imagem']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker05-a5',
        tipo: 'find-error',
        enunciado: 'O commit abaixo foi barrado na revisão. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'git add .env\ngit commit -m "Adiciona configuração do banco"' }
        ],
        opcoes: [
          'O arquivo .env contém senhas e não deve ser versionado; mantenha o arquivo fora do repositório',
          'O arquivo .env só pode ser usado dentro de containers',
          'O commit deveria incluir a imagem construída junto',
          'Variáveis de ambiente precisam ser definidas apenas no Dockerfile'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O .env é um arquivo comum; o problema é o conteúdo sensível indo para o histórico.',
          2: 'Imagens não vão para o repositório de código; apenas o Dockerfile.',
          3: 'O Dockerfile não é o lugar de guardar valores de configuração e segredos.'
        },
        dicas: [
          'Pense no que costuma existir dentro de um .env.',
          'Segredo não entra no histórico do Git.'
        ],
        explicacao: 'Arquivos de configuração carregam senhas e endereços internos. Versioná-los expõe segredos; o certo é manter o arquivo fora do repositório e passar os valores na execução.',
        conceitos: ['docker.variaveis']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Variable and value',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras novas: **variable** (variável) e **value** (valor).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['variable', 'variável'],
            ['value', 'valor']
          ]
        },
        { tipo: 'ingles', frase: 'The environment variable has a value.', traducao: 'A variável de ambiente tem um valor.' },
        { tipo: 'nota', tom: 'info', texto: '**has a value** = "tem um valor" — toda variável de ambiente é um nome com um valor.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker05-a6',
        tipo: 'write-code',
        enunciado: 'Escreva o comando que executa **minha-api** em segundo plano com a variável **ASPNETCORE_ENVIRONMENT=Development**.',
        placeholder: 'docker ...',
        respostasAceitas: [
          'docker run -d -e aspnetcore_environment=development minha-api'
        ],
        dicas: [
          'Use -d para segundo plano e -e para a variável.',
          'O formato da variável é NOME=valor.'
        ],
        explicacao: 'O comando executa a imagem em segundo plano e entrega a variável ao processo da API dentro do container.',
        conceitos: ['docker.variaveis', 'docker.container']
      }
    }
  ]
});
