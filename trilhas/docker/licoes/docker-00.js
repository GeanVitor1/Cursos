Plataforma.registrarLicao({
  id: 'docker-00',
  trilha: 'docker',
  tipo: 'licao',
  titulo: 'O problema que o Docker resolve',
  subtitulo: 'Fundamentos · Etapa 1',
  duracaoMin: 35,
  xp: 30,
  objetivos: [
    'Reconhecer o problema de rodar a mesma aplicação em máquinas diferentes',
    'Explicar o que é um ambiente reproduzível',
    'Listar o que uma aplicação .NET precisa para rodar',
    'Identificar situações do dia a dia em que o Docker ajuda'
  ],
  conceitos: ['docker.ambiente'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'A frase que todo time conhece',
      introduz: ['docker.ambiente'],
      blocos: [
        { tipo: 'retoma', conceito: 'terminal.docker', texto: 'No terminal você viu `docker compose up` como **prévia**. Agora começa a trilha que explica o que está por trás desse comando.' },
        { tipo: 'texto', texto: 'Você termina uma API .NET e ela funciona na sua máquina. O colega baixa o mesmo código e nada funciona. A aplicação vai para o servidor e o erro muda de cara.' },
        { tipo: 'destaque', texto: 'O código é o mesmo. O que muda é o **ambiente** onde ele roda.' },
        {
          tipo: 'lista',
          itens: [
            'Versão diferente do SDK do .NET instalada em cada máquina',
            'Banco de dados que existe em um computador e falta no outro',
            'Portas já ocupadas por outros programas',
            'Configurações que ninguém preencheu antes de subir'
          ]
        },
        { tipo: 'texto', texto: 'Instalar tudo à mão em cada máquina funciona uma vez. Na segunda, alguém esquece um passo e o problema volta.' },
        { tipo: 'conceito', id: 'docker.ambiente', titulo: 'Ambiente reproduzível', texto: 'Empacotar a aplicação com tudo o que ela precisa para rodar igual em qualquer máquina.', exemplo: 'O mesmo pacote roda na sua máquina, na do colega e no servidor.' },
        { tipo: 'nota', tom: 'info', texto: 'A palavra-chave é **igual**: mesmo sistema, mesmas dependências, mesma configuração.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker00-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que significa dizer que uma aplicação roda em um **ambiente reproduzível**?',
        opcoes: [
          'Ela leva junto tudo o que precisa, então roda igual em qualquer máquina',
          'Ela roda somente na máquina de quem escreveu o código',
          'Ela dispensa banco de dados e configuração',
          'Ela precisa ser reinstalada a cada execução'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O objetivo é justamente não depender de uma máquina específica.',
          2: 'A aplicação continua precisando de banco e configuração; ela só leva isso empacotado.',
          3: 'Instalar de novo a cada execução seria o oposto de reproduzível.'
        },
        dicas: [
          'Reproduzível = dá para repetir em qualquer lugar.',
          'Pense no pacote que viaja junto com o código.'
        ],
        explicacao: 'Ambiente reproduzível é aquele que viaja com a aplicação: mesmas dependências, mesma configuração e mesmo resultado em qualquer máquina.',
        conceitos: ['docker.ambiente']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'O que uma aplicação .NET precisa para rodar',
      blocos: [
        { tipo: 'texto', texto: 'Antes de empacotar, vale listar as peças que a sua API usa hoje. Cada uma delas é um ponto onde o ambiente pode falhar:' },
        {
          tipo: 'tabela',
          titulo: 'Dependências de uma API .NET',
          colunas: ['Peça', 'Onde costuma viver hoje', 'O que pode dar errado'],
          linhas: [
            ['Runtime do .NET', 'Instalado na máquina', 'Versão diferente da usada no desenvolvimento'],
            ['SQL Server', 'Instalado na máquina ou em outro servidor', 'Não existe, está parado ou tem outra versão'],
            ['Porta da API', 'Livre ou ocupada na máquina', 'Outro programa já usa a mesma porta'],
            ['Configurações', 'Arquivo local ou variáveis', 'Alguém esqueceu de preencher a conexão']
          ],
          legenda: 'A mesma lista vale para o computador do colega, o seu e o servidor.'
        },
        { tipo: 'texto', texto: 'Você já viu no SQL e no ASP.NET que a configuração da conexão muda de ambiente para ambiente. Sem um pacote único, cada troca de máquina vira uma nova instalação.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Documentar os passos em um arquivo de texto ajuda, mas não impede o esquecimento. O ambiente precisa ser **executável**, não apenas descrito.' },
        { tipo: 'trabalho', texto: 'Em times de verdade, "instalar o ambiente" costuma consumir o primeiro dia de quem entra. Projetos maduros entregam um comando único que sobe tudo — e é isso que você vai aprender a montar nesta trilha.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker00-a2',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre o problema do ambiente.',
        afirmacoes: [
          { texto: 'Se o código funciona na máquina do desenvolvedor, ele funciona em qualquer lugar.', correta: false, explicacao: 'Versões, banco e configuração mudam de máquina para máquina.' },
          { texto: 'O mesmo projeto .NET pode falhar por causa da versão do runtime instalada.', correta: true, explicacao: 'Uma versão diferente pode quebrar a aplicação antes mesmo de ela começar.' },
          { texto: 'Um ambiente reproduzível leva dependências e configuração junto com a aplicação.', correta: true, explicacao: 'É esse pacote único que faz o resultado se repetir em qualquer máquina.' }
        ],
        dicas: [
          'Lembre da frase que abre a lição.',
          'Reproduzível não é sobre uma máquina só.'
        ],
        explicacao: 'O ambiente muda de máquina para máquina. Empacotar dependências e configuração é o que torna o resultado repetível.',
        conceitos: ['docker.ambiente']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'A ideia do pacote único',
      blocos: [
        { tipo: 'texto', texto: 'Em vez de instalar peças separadas em cada máquina, o Docker monta um **pacote único**: a aplicação já compilada, o runtime, as bibliotecas e as configurações combinadas em um só lugar.' },
        {
          tipo: 'diagrama',
          titulo: 'O pacote viaja igual',
          arte: [
            '  Sua máquina          Colega                 Servidor',
            '  +-----------+        +-----------+          +-----------+',
            '  |  pacote   |        |  pacote   |          |  pacote   |',
            '  |   .NET    |  --->  |   .NET    |   --->   |   .NET    |',
            '  |   API     |        |   API     |          |   API     |',
            '  +-----------+        +-----------+          +-----------+',
            '        mesmo conteúdo, mesmo resultado'
          ].join('\n'),
          legenda: 'O pacote é o mesmo; o que muda é só a máquina que o executa.'
        },
        { tipo: 'texto', texto: 'Cada cópia desse pacote roda de forma **isolada**: ela não enxerga as pastas nem os programas da máquina hospedeira, apenas o que foi colocado dentro do pacote.' },
        { tipo: 'nota', tom: 'sucesso', texto: 'Quando o ambiente é parte da entrega, o famoso "na minha máquina funciona" perde a força.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker00-a3',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada problema do dia a dia ao que um ambiente reproduzível garante.',
        pares: [
          ['Instalar o runtime certo em cada máquina', 'A versão certa viaja dentro do pacote'],
          ['Banco de dados ausente', 'A dependência sobe junto com a aplicação'],
          ['Configuração esquecida', 'As variáveis fazem parte da entrega'],
          ['Máquina do colega diferente da sua', 'O mesmo pacote roda nos dois lugares']
        ],
        dicas: [
          'Pense no que cada problema tem em comum: depende da máquina.',
          'O pacote carrega runtime, dependências e configuração.'
        ],
        explicacao: 'Ambiente reproduzível resolve os quatro pontos de uma vez: o pacote carrega runtime, dependências e configuração e roda igual em qualquer máquina.',
        conceitos: ['docker.ambiente']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Onde o Docker entra',
      blocos: [
        { tipo: 'texto', texto: 'O Docker é a ferramenta que **cria e executa** esse pacote único. Ele existe para que montar o ambiente deixe de ser uma lista de passos e passe a ser um comando.' },
        {
          tipo: 'lista',
          itens: [
            'O pacote pronto e versionado se chama **imagem**',
            'Uma cópia em execução dessa imagem se chama **container**',
            'Antes de tudo isso, é o ambiente empacotado que resolve o problema'
          ]
        },
        { tipo: 'futuro', titulo: 'Nas próximas lições', conceitos: ['docker.imagem', 'docker.container'], texto: 'Você vai separar esses dois nomes com calma e ver o primeiro `docker run` funcionando.' },
        { tipo: 'nota', tom: 'info', texto: 'Nesta lição, guarde só o problema e a ideia de pacote. Os nomes técnicos vêm na sequência.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker00-a4',
        tipo: 'scenario',
        enunciado: 'Qual é a melhor resposta para o colega?',
        cena: 'É o primeiro dia de um colega novo no time. Ele baixou o repositório, rodou a API e recebeu um erro de conexão com o banco. Ele pergunta o que precisa fazer para o projeto rodar.',
        opcoes: [
          'Seguir o ambiente empacotado do projeto, que sobe a API e o banco com as configurações corretas',
          'Instalar o banco manualmente e torcer para as versões baterem',
          'Pedir para ele usar outra máquina, porque a dele deve estar com problema',
          'Ignorar o banco na primeira semana e trabalhar só no que não usa dados'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Instalar à mão é exatamente o processo que gera o problema; a próxima pessoa repete o erro.',
          2: 'Trocar de máquina não resolve a falta de um ambiente definido pelo projeto.',
          3: 'Adiar o problema não ajuda o colega nem o time.'
        },
        dicas: [
          'O time já tem o projeto empacotado.',
          'Um comando deve subir tudo o que a aplicação precisa.'
        ],
        explicacao: 'Com um ambiente reproduzível, o colega novo não depende de instruções soltas: ele executa o pacote do projeto e recebe a aplicação com banco e configuração no mesmo estado.',
        conceitos: ['docker.ambiente'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Environment',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras úteis para falar desse problema em inglês: **environment** (ambiente) e **same** (mesmo).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['environment', 'ambiente'],
            ['same', 'mesmo / mesma']
          ]
        },
        { tipo: 'ingles', frase: 'The same app runs in every environment.', traducao: 'A mesma aplicação roda em todo ambiente.' },
        { tipo: 'nota', tom: 'info', texto: '**runs in every environment** = "roda em todo ambiente" — a promessa que o Docker persegue.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'docker00-a5',
        tipo: 'multiple-choice',
        enunciado: 'O que significa a frase **The same app runs in every environment.**?',
        opcoes: [
          'A mesma aplicação roda em todo ambiente',
          'A aplicação roda apenas no ambiente de desenvolvimento',
          'Cada ambiente tem uma aplicação diferente',
          'A aplicação precisa de dois ambientes para rodar'
        ],
        correta: 0,
        feedbackErro: {
          1: 'every environment é todo ambiente, não apenas um.',
          2: 'same app diz que a aplicação é a mesma.',
          3: 'A frase não fala em quantidade de ambientes.'
        },
        dicas: [
          'same = mesmo; every = todo.',
          'environment = ambiente.'
        ],
        explicacao: '`same` é mesmo e `every environment` é todo ambiente: a mesma aplicação roda em qualquer lugar.',
        conceitos: ['docker.ambiente']
      }
    }
  ]
});
