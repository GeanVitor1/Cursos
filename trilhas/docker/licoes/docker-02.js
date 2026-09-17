Plataforma.registrarLicao({
  id: 'docker-02',
  trilha: 'docker',
  tipo: 'licao',
  titulo: 'Primeiro Dockerfile',
  subtitulo: 'Fundamentos · Etapa 3',
  duracaoMin: 50,
  xp: 30,
  objetivos: [
    'Explicar o que é um Dockerfile e para que ele serve',
    'Reconhecer as instruções FROM, WORKDIR, COPY, RUN e ENTRYPOINT',
    'Descrever o build de uma imagem .NET em duas etapas',
    'Construir uma imagem com docker build'
  ],
  conceitos: ['docker.dockerfile'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'A receita da imagem',
      introduz: ['docker.dockerfile'],
      blocos: [
        { tipo: 'retoma', conceito: 'docker.imagem', texto: 'Você já sabe que a imagem é o molde somente leitura. Agora vai aprender a **escrever** esse molde: quando a imagem é da sua API, ninguém vai baixá-la pronta.' },
        { tipo: 'texto', texto: 'O **Dockerfile** é um arquivo de texto, sem extensão, com as instruções que montam a imagem passo a passo. É a receita: cada linha diz o que colocar na imagem e o que executar depois.' },
        { tipo: 'conceito', id: 'docker.dockerfile', titulo: 'Dockerfile', texto: 'O arquivo com as instruções para construir uma imagem: base, cópia dos arquivos, build e comando.', exemplo: 'FROM, COPY, RUN e ENTRYPOINT em um arquivo chamado Dockerfile.' },
        {
          tipo: 'tabela',
          titulo: 'As instruções desta lição',
          colunas: ['Instrução', 'O que faz'],
          linhas: [
            ['FROM', 'Define a imagem base de onde a sua começa'],
            ['WORKDIR', 'Define a pasta de trabalho dentro da imagem'],
            ['COPY', 'Copia arquivos do projeto para dentro da imagem'],
            ['RUN', 'Executa um comando durante a construção'],
            ['ENTRYPOINT', 'Define o comando que inicia quando o container sobe']
          ],
          legenda: 'A ordem importa: cada instrução é aplicada sobre o resultado da anterior.'
        },
        { tipo: 'nota', tom: 'info', texto: 'O arquivo se chama exatamente **Dockerfile**, sem extensão, e fica na raiz do projeto.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker02-a1',
        tipo: 'multiple-choice',
        enunciado: 'Para que serve o **Dockerfile**?',
        opcoes: [
          'Descrever, em instruções, como construir a imagem da aplicação',
          'Listar os containers que estão em execução na máquina',
          'Guardar as senhas do banco de dados da aplicação',
          'Executar a aplicação direto na máquina, sem empacotar nada'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Quem lista containers é o docker ps.',
          2: 'Segredos não ficam no Dockerfile; configuração é assunto de variáveis de ambiente.',
          3: 'O Dockerfile serve para empacotar, não para rodar direto na máquina.'
        },
        dicas: [
          'É a receita da imagem.',
          'Ele é um arquivo de texto com instruções.'
        ],
        explicacao: 'O Dockerfile reúne as instruções que constroem a imagem, do sistema base até o comando que inicia a aplicação.',
        conceitos: ['docker.dockerfile']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'FROM: escolhendo a base',
      blocos: [
        { tipo: 'texto', texto: 'Toda imagem começa de outra imagem. No `FROM` você escolhe a base — a Microsoft publica imagens prontas para .NET, com o runtime já instalado.' },
        {
          tipo: 'codigo',
          linguagem: 'dockerfile',
          titulo: 'Dockerfile',
          codigo: 'FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build\nWORKDIR /src',
          legenda: 'A base sdk traz o compilador; o AS build dá um nome a essa etapa.'
        },
        { tipo: 'texto', texto: 'O build de uma API .NET costuma usar **duas etapas**: primeiro uma imagem com o SDK, que compila e publica o projeto; depois uma imagem menor, só com o runtime, que recebe o resultado publicado.' },
        { tipo: 'nota', tom: 'info', texto: 'Separar as etapas deixa a imagem final menor: o compilador fica para trás, na primeira etapa.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker02-a2',
        tipo: 'fill-code',
        enunciado: 'Complete a primeira linha do Dockerfile. Para **compilar** o projeto, a base precisa trazer o SDK.',
        codigo: 'FROM mcr.microsoft.com/dotnet/{{1}}:8.0 AS build',
        lacunas: [['sdk']],
        dicas: [
          'É a imagem que traz o compilador, e não só o runtime.',
          'São três letras.'
        ],
        explicacao: 'A base com o SDK traz o compilador, necessário para compilar o projeto dentro do build.',
        conceitos: ['docker.dockerfile']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'COPY e RUN: levando o código',
      blocos: [
        { tipo: 'texto', texto: 'Depois da base, o Dockerfile copia o projeto e executa os comandos de build. Cada `RUN` deixa uma marca na imagem construída:' },
        {
          tipo: 'codigo',
          linguagem: 'dockerfile',
          titulo: 'Dockerfile',
          codigo: 'COPY *.csproj .\nRUN dotnet restore\nCOPY . .\nRUN dotnet publish -c Release -o /app',
          legenda: 'Restaurar antes de copiar tudo aproveita melhor as camadas já construídas.'
        },
        { tipo: 'texto', texto: 'O `COPY` copia do seu projeto para dentro da imagem. O `RUN` executa um comando durante a construção — aqui, restaurar pacotes e publicar em modo Release.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Cada instrução vira uma camada da imagem. Se o código mudar, o Docker reaproveita as camadas anteriores e refaz apenas o que veio depois da mudança.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker02-a3',
        tipo: 'order-blocks',
        enunciado: 'Ordene as instruções do Dockerfile da API .NET.',
        blocos: [
          'FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build',
          'WORKDIR /src',
          'COPY *.csproj .',
          'RUN dotnet restore',
          'COPY . .',
          'RUN dotnet publish -c Release -o /app'
        ],
        dicas: [
          'Tudo começa pela imagem base.',
          'Restaurar os pacotes vem antes de publicar.'
        ],
        explicacao: 'Primeiro a base com SDK, depois a pasta de trabalho, a cópia do projeto, a restauração, a cópia do restante e a publicação.',
        conceitos: ['docker.dockerfile']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'ENTRYPOINT: o que inicia o container',
      blocos: [
        { tipo: 'texto', texto: 'Na segunda etapa do build, a imagem final recebe só o que foi publicado e o comando que deve rodar quando o container subir.' },
        {
          tipo: 'codigo',
          linguagem: 'dockerfile',
          titulo: 'Dockerfile',
          codigo: 'FROM mcr.microsoft.com/dotnet/aspnet:8.0\nWORKDIR /app\nCOPY --from=build /app .\nENTRYPOINT ["dotnet", "MinhaApi.dll"]',
          legenda: 'A imagem final é menor e já sabe como iniciar a API.'
        },
        { tipo: 'texto', texto: 'O `ENTRYPOINT` é a porta de entrada: toda vez que esse container sobe, o Docker executa esse comando. Sem ele, o container liga e desliga sem fazer nada.' },
        { tipo: 'nota', tom: 'info', texto: 'O `--from=build` copia o resultado da etapa anterior. O nome vem do `AS build` que você escreveu no primeiro `FROM`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker02-a4',
        tipo: 'interpret-code',
        enunciado: 'O que a instrução abaixo faz quando o container sobe?',
        contexto: [
          { tipo: 'codigo', linguagem: 'dockerfile', codigo: 'ENTRYPOINT ["dotnet", "MinhaApi.dll"]' }
        ],
        opcoes: [
          'Inicia a API executando dotnet MinhaApi.dll dentro do container',
          'Copia o arquivo MinhaApi.dll para a máquina',
          'Baixa o runtime do .NET durante a execução',
          'Lista os containers em execução'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A cópia acontece no build, com COPY; o ENTRYPOINT apenas inicia.',
          2: 'O runtime já está na imagem; nada é baixado na execução.',
          3: 'Quem lista containers é o docker ps.'
        },
        dicas: [
          'ENTRYPOINT é o comando de partida.',
          'O que aparece na lista é o que roda dentro do container.'
        ],
        explicacao: 'A instrução ENTRYPOINT define o processo principal que roda dentro do container. Aqui ela executa a DLL publicada da API.',
        conceitos: ['docker.dockerfile']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Construindo a imagem',
      blocos: [
        { tipo: 'texto', texto: 'Com o Dockerfile pronto, a imagem é construída com `docker build`. O `-t` dá um nome e uma etiqueta à imagem; o ponto final indica a pasta onde está o Dockerfile.' },
        {
          tipo: 'codigo',
          linguagem: 'bash',
          codigo: 'docker build -t minha-api .',
          legenda: 'Constrói a imagem e a registra com o nome minha-api.'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Esquecer o ponto final é um erro comum: sem ele o Docker não sabe qual pasta enviar para o build.' },
        { tipo: 'trabalho', texto: 'No trabalho, o Dockerfile fica versionado junto com o código, como qualquer outro arquivo do projeto. Assim o ambiente da aplicação evolui no mesmo commit das mudanças — e o time inteiro constrói a mesma imagem.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker02-a5',
        tipo: 'write-code',
        enunciado: 'Escreva o comando que constrói uma imagem chamada **minha-api** a partir do Dockerfile da pasta atual.',
        placeholder: 'docker ...',
        respostasAceitas: [
          'docker build -t minha-api .'
        ],
        dicas: [
          'O comando de construir é docker build.',
          'O nome vem depois de -t e não esqueça o ponto final.'
        ],
        explicacao: '`docker build -t minha-api .` constrói a imagem a partir do Dockerfile da pasta atual e a nomeia como `minha-api`.',
        conceitos: ['docker.dockerfile', 'docker.imagem']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Dockerfile',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras que você vai ler em toda documentação de build: **dockerfile** e **command**.' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['dockerfile', 'arquivo com as instruções da imagem'],
            ['command', 'comando']
          ]
        },
        { tipo: 'ingles', frase: 'The dockerfile has the commands to build the image.', traducao: 'O Dockerfile tem os comandos para construir a imagem.' },
        { tipo: 'nota', tom: 'info', texto: '**the commands to build** = "os comandos para construir" — a função exata do arquivo que você escreveu.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker02-a6',
        tipo: 'scenario',
        enunciado: 'Qual é o caminho correto para colocar a API em um container?',
        cena: 'O time terminou a API .NET e quer que qualquer pessoa consiga executá-la com um comando, sem instalar o SDK na máquina. Você ficou responsável por empacotar.',
        opcoes: [
          'Escrever o Dockerfile com FROM, COPY, RUN e ENTRYPOINT e construir a imagem com docker build',
          'Enviar o código por e-mail e pedir para cada pessoa instalar o SDK na versão certa',
          'Criar um container a partir da imagem da API pronta, sem construir nada',
          'Copiar a pasta do projeto para dentro de um volume e executar na máquina'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Instalar o SDK em cada máquina é justamente o problema que o empacotamento resolve.',
          2: 'A imagem da sua API ainda não existe; ela precisa ser construída a partir do Dockerfile.',
          3: 'Volume guarda dados, não substitui a imagem da aplicação.'
        },
        dicas: [
          'A receita primeiro, a construção depois.',
          'Sem Dockerfile não existe imagem da sua API.'
        ],
        explicacao: 'O Dockerfile descreve a imagem; o `docker build` a constrói. A partir dela, qualquer pessoa cria o container com `docker run`, sem instalar nada além do Docker.',
        conceitos: ['docker.dockerfile', 'docker.imagem', 'docker.container'],
        desafio: true
      }
    }
  ]
});
