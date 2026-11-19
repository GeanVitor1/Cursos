Plataforma.registrarLicao({
  id: 'engenharia-ia-01',
  trilha: 'engenharia-ia',
  tipo: 'licao',
  titulo: 'Escolher .NET e separar responsabilidades',
  duracaoMin: 25,
  xp: 30,
  objetivos: [
    'Dizer o que cada peça faz numa API ASP.NET Core: controller, service e contexto de dados',
    'Avaliar se uma camada extra (repository) resolve um problema concreto ou só acrescenta arquivos',
    'Conferir em código gerado onde está a regra e se a dependência pode ser trocada em teste'
  ],
  conceitos: ['engenharia-ia.ef-contexto', 'engenharia-ia.dotnet'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Peças que aparecem no cenário',
      blocos: [
        { tipo: 'futuro', conceitos: ['ef.dbcontext'], titulo: 'Onde aprofundar', texto: 'Por enquanto, basta saber que o DbContext lê e grava no banco. A trilha de Entity Framework Core mostra como configurá-lo e usá-lo.' },
        { tipo: 'conceito', id: 'engenharia-ia.ef-contexto', titulo: 'Contexto de dados e controller', texto: 'O controller é a entrada da API: recebe a requisição HTTP e encaminha o trabalho. O contexto de dados (DbContext do Entity Framework Core) é o objeto que lê e grava as tabelas do banco. Injeção de dependência significa receber esses objetos prontos pelo construtor, em vez de criá-los dentro da regra.', exemplo: 'PedidosController recebe PedidoService no construtor; PedidoService recebe o contexto de dados.' },
        { tipo: 'glossario', titulo: 'Termos desta etapa', itens: [
          ['controller', 'entrada da aplicação', 'Traduz a requisição HTTP e chama a regra da aplicação.'],
          ['service', 'serviço de regra', 'Classe que aplica a regra de negócio, como "só cancela antes do envio".'],
          ['middleware', 'etapa do fluxo HTTP', 'Código que roda antes ou depois do controller, como autenticação e registro de erros.']
        ] }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'engenharia-ia-01-bases',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Associe cada peça de uma API de pedidos à sua responsabilidade.',
        pares: [
          ['Controller', 'Receber a requisição HTTP e devolver a resposta'],
          ['Service', 'Verificar se o pedido já foi enviado antes de cancelar'],
          ['Contexto de dados', 'Ler e gravar os pedidos no banco'],
          ['Injeção de dependência', 'Entregar ao construtor os objetos de que a classe precisa']
        ],
        conceitos: ['engenharia-ia.ef-contexto'],
        dicas: ['Pergunte-se: quem fala com o navegador, quem decide a regra e quem fala com o banco?', 'A injeção não é uma camada; é a forma de ligar as camadas.'],
        explicacao: 'Cada peça tem uma responsabilidade; a injeção de dependência só as conecta, e por isso permite trocar uma delas em teste.'
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Escolher .NET e separar responsabilidades',
      blocos: [
        { tipo: 'conceito', id: 'engenharia-ia.dotnet', titulo: '.NET, C# e ASP.NET Core', texto: '.NET fornece o ambiente de execução e as bibliotecas; C# é a linguagem que o utiliza; ASP.NET Core oferece os componentes para aplicações web e APIs, como roteamento, configuração e processamento de requisições.', exemplo: 'Uma API de pedidos em C# roda sobre o .NET usando ASP.NET Core para as rotas.' },
        { tipo: 'texto', texto: '**Por que separar:** misturar transporte, regra de negócio e acesso ao banco numa só classe torna mudanças e testes mais difíceis.' },
        { tipo: 'texto', texto: '**Quando evitar:** uma rotina local de conversão de arquivos pode ser um programa de console, sem ASP.NET Core. E um repository adicional é opcional: o contexto de dados do Entity Framework Core já abstrai a persistência; só vale criá-lo quando houver um problema concreto, como trocar a fonte de dados em teste.' },
        { tipo: 'trabalho', texto: 'No cancelamento, o controller identifica a entrada, o service verifica envio e permissão, e o contexto de dados registra a alteração. O cliente nunca decide sozinho se a operação está autorizada.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'engenharia-ia-01-decisao',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Para um serviço de pedidos com três operações, a IA propôs controller, service, repository, factory e mapeador, todos com interface.',
        enunciado: 'O que você decide fazer com a proposta?',
        opcoes: [
          'Pedir o problema que cada camada resolve e manter só as que reduzem complexidade ou facilitam testes',
          'Aceitar tudo, porque projetos profissionais precisam sempre dessas cinco camadas e interfaces',
          'Descartar também o service e colocar a regra de cancelamento dentro do controller',
          'Mover a verificação de cancelamento para o JavaScript da tela, que é mais rápido de alterar'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Não existe uma arquitetura obrigatória; cada camada precisa justificar o custo que traz.',
          2: 'Sem o service, a regra fica presa à entrada HTTP e fica mais difícil testá-la isoladamente.',
          3: 'Regra só na tela pode ser contornada por qualquer cliente; ela precisa ser verificada no servidor.'
        },
        dicas: ['Mais arquivos só ajudam se resolverem algo concreto.', 'Imagine testar a regra de cancelamento: onde ela está mais fácil de isolar?'],
        explicacao: 'Você deve conseguir localizar transporte, regra e persistência, sem exigir uma arquitetura única para todo projeto.',
        conceitos: ['engenharia-ia.dotnet']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Orientar e revisar a IA',
      blocos: [
        { tipo: 'texto', texto: '**Como pedir:** proponha uma API ASP.NET Core para pedidos; separe transporte e regra de cancelamento, receba dependências pelo construtor e compare usar o contexto de dados diretamente com adicionar um repository, justificando custo e testes de cada escolha.' },
        { tipo: 'texto', texto: '**Como validar:** siga uma requisição do início ao fim, ache onde a regra é aplicada e veja como a dependência seria trocada num teste. Desconfie de interfaces que só duplicam métodos e de regra de autorização existente apenas no navegador.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'engenharia-ia-01-revisao',
        tipo: 'explain',
        dimensao: 'construcao',
        enunciado: 'A IA entregou o código da API de pedidos separado em controller, service e contexto de dados.',
        pergunta: 'Como você conferiria se a separação está útil e correta?',
        criterios: [
          'Localizar em qual classe está a regra de cancelamento.',
          'Dizer como a dependência (por exemplo o banco) seria substituída num teste.',
          'Apontar um sinal de camada desnecessária ou de regra só no navegador.'
        ],
        palavrasChave: [
          ['service', 'serviço'],
          ['construtor', 'injet', 'injeç', 'interface'],
          ['desnecessária', 'desnecessário', 'duplica', 'duplicam', 'navegador', 'tela']
        ],
        minimoChaves: 3,
        exemplo: 'Eu abriria o service para ver se a verificação do envio está lá, e não no controller. Depois checaria se o construtor recebe a dependência, para que o teste passe uma versão falsa do banco. Também procuraria interfaces que só repetem métodos e validações feitas só na tela.',
        explicacao: 'A separação é boa quando a regra é fácil de achar, a dependência é substituível em teste e nenhuma camada existe só por existir.',
        dicas: ['Pense em três verificações: onde está a regra, como testar e o que sobra.', 'Uma interface que repete os mesmos métodos de uma classe só ajuda se houver motivo para trocar a implementação.'],
        conceitos: ['engenharia-ia.dotnet']
      }
    }
  ]
});
