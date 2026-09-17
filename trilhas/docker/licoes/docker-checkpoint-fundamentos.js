Plataforma.registrarLicao({
  id: 'docker-checkpoint-fundamentos',
  trilha: 'docker',
  tipo: 'prova',
  titulo: 'Checkpoint — Fundamentos',
  subtitulo: 'Fundamentos · Etapa 4',
  duracaoMin: 35,
  xp: 100,
  objetivos: [
    'Reconhecer o problema que o ambiente reproduzível resolve',
    'Diferenciar imagem e container',
    'Construir uma imagem a partir de um Dockerfile',
    'Executar containers e acompanhar o ciclo de vida'
  ],
  conceitos: ['docker.ambiente', 'docker.imagem', 'docker.container', 'docker.dockerfile'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova de nível: Fundamentos do Docker',
      blocos: [
        { tipo: 'texto', texto: 'São **9 atividades** cobrindo ambiente reproduzível, imagem, container e Dockerfile. Não existe nota de bloqueio: o resultado mostra o que já está dominado e o que vale revisar antes de seguir para a prática.' },
        {
          tipo: 'lista',
          itens: [
            'Leia cada cenário como se fosse uma tarefa real de trabalho.',
            'As dicas continuam disponíveis e não tiram pontos.',
            'Ao final, o resultado aponta o seu domínio conceito por conceito.'
          ]
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-f1',
        tipo: 'multiple-choice',
        enunciado: 'Qual alternativa descreve corretamente a relação entre **imagem** e **container**?',
        opcoes: [
          'A imagem é o pacote somente leitura; o container é uma cópia em execução dela',
          'O container é o pacote somente leitura; a imagem é uma cópia em execução dele',
          'Imagem e container são nomes diferentes para a mesma coisa',
          'A imagem roda na máquina e o container roda apenas no servidor'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A ordem está invertida: o molde é a imagem.',
          2: 'São coisas distintas: uma é o molde, a outra é a execução.',
          3: 'Os dois rodam em qualquer máquina com Docker instalado.'
        },
        dicas: [
          'Lembre da forma de bolo.',
          'Do molde nascem as cópias.'
        ],
        explicacao: 'A imagem guarda código, dependências e configuração sem executar nada. Ao rodar, ela gera um ou mais containers.',
        conceitos: ['docker.imagem', 'docker.container']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-f2',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre o ambiente e o ciclo de vida.',
        afirmacoes: [
          { texto: 'Um ambiente reproduzível leva dependências e configuração junto com a aplicação.', correta: true, explicacao: 'É isso que faz o resultado se repetir em qualquer máquina.' },
          { texto: 'Apagar um container apaga também a imagem que o originou.', correta: false, explicacao: 'A imagem continua disponível e pode gerar novos containers.' },
          { texto: 'docker ps mostra somente os containers em execução.', correta: true, explicacao: 'Para ver os parados também, use docker ps -a.' }
        ],
        dicas: [
          'Imagem é o molde; container é a cópia.',
          'A letra a de -a significa todos.'
        ],
        explicacao: 'O ambiente empacotado é o que garante repetição; imagens e containers têm ciclos de vida independentes.',
        conceitos: ['docker.ambiente', 'docker.imagem', 'docker.container']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-f3',
        tipo: 'fill-code',
        enunciado: 'Complete o comando que constrói a imagem **minha-api** a partir do Dockerfile da pasta atual.',
        codigo: 'docker {{1}} -t minha-api .',
        lacunas: [['build']],
        dicas: [
          'É o comando que lê o Dockerfile.',
          'Cinco letras, em inglês.'
        ],
        explicacao: '`docker build -t minha-api .` constrói a imagem a partir do Dockerfile da pasta atual.',
        conceitos: ['docker.dockerfile', 'docker.imagem']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-f4',
        tipo: 'predict-output',
        enunciado: 'O que aparece na tela depois destes dois comandos?',
        contexto: [
          { tipo: 'codigo', linguagem: 'bash', codigo: 'docker run -d nginx\ndocker ps' }
        ],
        opcoes: [
          'Uma linha com o container nginx em execução',
          'Uma lista vazia, porque a imagem não foi baixada',
          'Uma mensagem de erro, porque falta o docker pull',
          'Duas linhas, uma para a imagem e outra para o container'
        ],
        correta: 0,
        feedbackErro: {
          1: 'docker run baixa a imagem automaticamente quando ela não existe na máquina.',
          2: 'Não é obrigatório rodar docker pull antes; o run resolve a falta da imagem.',
          3: 'docker ps lista containers em execução, não imagens.'
        },
        dicas: [
          'docker run cria e executa o container.',
          'docker ps lista o que está rodando.'
        ],
        explicacao: 'O primeiro comando baixa a imagem e executa o container em segundo plano; o segundo mostra o container em execução.',
        conceitos: ['docker.imagem', 'docker.container']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-f5',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada comando à sua função.',
        pares: [
          ['docker pull', 'Traz a imagem do registro para a máquina'],
          ['docker run', 'Cria e executa um container a partir da imagem'],
          ['docker ps -a', 'Lista os containers, inclusive os parados'],
          ['docker build', 'Constrói uma imagem a partir do Dockerfile']
        ],
        dicas: [
          'pull traz; build constrói; run executa.',
          'O -a amplia a lista.'
        ],
        explicacao: 'Cada comando tem um papel: pull traz a imagem, run executa o container, ps -a lista todos e build monta a imagem.',
        conceitos: ['docker.imagem', 'docker.container', 'docker.dockerfile']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-f6',
        tipo: 'find-error',
        enunciado: 'Este Dockerfile foi recusado na revisão. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'dockerfile', codigo: 'WORKDIR /app\nCOPY . .\nRUN dotnet publish -c Release -o /app\nENTRYPOINT ["dotnet", "MinhaApi.dll"]' }
        ],
        opcoes: [
          'Falta o FROM: sem uma imagem base, nada pode ser construído',
          'O ENTRYPOINT deveria vir antes do COPY',
          'O RUN não pode ser usado em um Dockerfile',
          'O WORKDIR precisa vir depois do ENTRYPOINT'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A ordem do ENTRYPOINT está correta: ele é o último passo.',
          2: 'RUN é uma das instruções mais usadas no build.',
          3: 'A pasta de trabalho é definida no começo, não no fim.'
        },
        dicas: [
          'Toda imagem começa de outra imagem.',
          'Qual instrução escolhe a base?'
        ],
        explicacao: 'Sem `FROM`, o Docker não sabe sobre qual base aplicar as demais instruções. É sempre a primeira linha do Dockerfile.',
        conceitos: ['docker.dockerfile']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-f7',
        tipo: 'order-blocks',
        enunciado: 'Ordene as instruções que constroem a imagem da API.',
        blocos: [
          'FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build',
          'COPY . .',
          'RUN dotnet publish -c Release -o /app',
          'FROM mcr.microsoft.com/dotnet/aspnet:8.0',
          'COPY --from=build /app .',
          'ENTRYPOINT ["dotnet", "MinhaApi.dll"]'
        ],
        dicas: [
          'Primeiro a etapa que compila, depois a imagem final.',
          'O ENTRYPOINT fecha o arquivo.'
        ],
        explicacao: 'A primeira etapa compila e publica; a segunda usa a imagem de runtime, copia o resultado e define o comando de partida.',
        conceitos: ['docker.dockerfile']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-f8',
        tipo: 'scenario',
        enunciado: 'Qual é a sequência que coloca a API em execução?',
        cena: 'Você acabou de escrever o Dockerfile da API. O time quer vê-la rodando na máquina de cada pessoa sem instalar o SDK do .NET.',
        opcoes: [
          'Construir a imagem com docker build e criar o container com docker run',
          'Executar docker ps e depois docker pull na API',
          'Publicar o projeto com dotnet publish e pedir para cada pessoa rodar a DLL',
          'Criar um volume com o código e executar a DLL direto dele'
        ],
        correta: 0,
        feedbackErro: {
          1: 'docker ps apenas lista containers; docker pull traz imagens prontas, e a sua ainda não existe.',
          2: 'Rodar a DLL exige o runtime instalado em cada máquina — o problema que o empacotamento resolve.',
          3: 'Volume guarda dados; não é um ambiente de execução.'
        },
        dicas: [
          'A imagem precisa existir antes do container.',
          'Construir e depois executar.'
        ],
        explicacao: 'O build cria a imagem; o run executa o container. Quem recebe o projeto só precisa do Docker.',
        conceitos: ['docker.dockerfile', 'docker.imagem', 'docker.container'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-docker-f9',
        tipo: 'write-code',
        enunciado: 'Escreva o comando que constrói a imagem **minha-api** usando o Dockerfile da pasta atual.',
        placeholder: 'docker ...',
        respostasAceitas: [
          'docker build -t minha-api .'
        ],
        dicas: [
          'Use build com a opção -t.',
          'Termine com o ponto da pasta atual.'
        ],
        explicacao: '`docker build -t minha-api .` — o `-t` nomeia a imagem e o ponto envia a pasta atual para o build.',
        conceitos: ['docker.dockerfile', 'docker.imagem']
      }
    }
  ]
});
