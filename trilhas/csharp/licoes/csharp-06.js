Plataforma.registrarLicao({
  id: 'csharp-06',
  trilha: 'csharp',
  tipo: 'licao',
  titulo: 'Injeção de dependência: o problema antes da solução',
  subtitulo: 'C# · Etapa 6',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Entender o problema que a injeção de dependência resolve',
    'Receber dependências pelo construtor',
    'Reconhecer o registro de dependências em uma API ASP.NET'
  ],
  conceitos: ['csharp.di', 'csharp.interfaces', 'csharp.construtor'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O problema continua',
      blocos: [
        { tipo: 'texto', texto: 'Na etapa anterior, a interface permitiu trocar o provedor. Mas o service ainda **decide** qual implementação usar, com `new`:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'public class PedidoService\n{\n    public void FinalizarPedido(Pedido pedido)\n    {\n        INotificador notificador = new EmailNotificador();\n        notificador.Enviar("Pedido confirmado");\n    }\n}' },
        { tipo: 'lista', itens: [
          'Para **testar**, seria preciso enviar e-mail de verdade (ou mudar o código).',
          'Para **trocar** o canal, seria preciso recompilar o service.',
          'Se o notificador precisar de outro recurso, o service passa a saber disso também.'
        ] },
        { tipo: 'destaque', texto: 'A regra de ouro: uma classe **não deveria construir** tudo o que depende. Ela deveria **receber** o que precisa.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Recebendo pelo construtor',
      introduz: ['csharp.construtor', 'csharp.di'],
      blocos: [
        { tipo: 'texto', texto: 'O **construtor** é o método chamado no momento em que o objeto é criado. Ele é o lugar natural para receber as dependências:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'public class PedidoService\n{\n    private readonly INotificador _notificador;\n\n    public PedidoService(INotificador notificador)\n    {\n        _notificador = notificador;\n    }\n\n    public void FinalizarPedido(Pedido pedido)\n    {\n        _notificador.Enviar("Pedido confirmado");\n    }\n}' },
        { tipo: 'diagrama', arte: 'ANTES: PedidoService constrói       DEPOIS: PedidoService recebe\n\nPedidoService                       algo externo\n   │ new                                 │ injeta\n   ▼                                     ▼\nEmailNotificador                    PedidoService(INotificador)\n                                         │ usa\n                                         ▼\n                                    qualquer implementação' },
        { tipo: 'glossario', titulo: 'Decifrando o código', itens: [
          ['construtor', 'recebe as dependências', 'Método com o mesmo nome da classe, sem retorno.'],
          ['_notificador', 'campo privado', 'Guardado com underline por convenção do time.'],
          ['readonly', 'não muda depois', 'A referência é definida uma vez, no construtor.'],
          ['injeção de dependência', 'DI', 'Fornecer as dependências de fora para dentro.']
        ] },
        { tipo: 'nota', tom: 'info', texto: 'O nome "injeção de dependência" descreve exatamente isso: a dependência é **injetada** (entregue) de fora. Você já viu o problema; a solução agora tem nome.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs06-a1',
        tipo: 'interpret-code',
        dimensao: 'reconhecimento',
        enunciado: 'O que mudou no comportamento do service?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'public class PedidoService\n{\n    private readonly INotificador _notificador;\n\n    public PedidoService(INotificador notificador)\n    {\n        _notificador = notificador;\n    }\n}' }
        ],
        opcoes: [
          'Ele não decide mais qual notificador usar; recebe um pronto, pronto para trocar ou simular em testes',
          'Ele passou a criar internamente um EmailNotificador',
          'Ele deixou de precisar de qualquer notificador',
          'Ele só funciona se INotificador for uma classe concreta'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Não há `new` no código; a criação ficou para quem usa a classe.',
          2: 'O campo `_notificador` continua sendo usado para enviar; a dependência existe.',
          3: 'INotificador é uma interface: o service só conhece o contrato.'
        },
        dicas: ['Procure a palavra `new` no código.', 'Quem agora escolhe a implementação?'],
        explicacao: 'Ao receber a dependência, o service fica independente da escolha concreta. Isso é o que torna teste e troca possíveis.',
        conceitos: ['csharp.di', 'csharp.construtor']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs06-a2',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete o construtor para receber e guardar a dependência.',
        codigo: 'public class PedidoService\n{\n    private readonly INotificador _notificador;\n\n    public {{1}}(INotificador notificador)\n    {\n        _notificador = {{2}};\n    }\n}',
        lacunas: [['PedidoService'], ['notificador']],
        dicas: ['O construtor tem o mesmo nome da classe.', 'Atribua o parâmetro ao campo com underline.'],
        explicacao: 'O construtor declara "para eu funcionar, preciso de um INotificador". Quem cria o service entrega a implementação desejada.',
        conceitos: ['csharp.construtor', 'csharp.di']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs06-a3',
        tipo: 'code-review',
        dimensao: 'aplicacao',
        enunciado: 'Este teste não consegue ser escrito sem enviar e-mail de verdade. Qual alternativa resolve?',
        ticket: { numero: '#5244', titulo: 'Testes do PedidoService', corpo: 'O time quer testar a regra de finalizar pedido sem depender de e-mail real.' },
        autor: 'colega de time',
        diff: [
          ' public class PedidoService',
          ' {',
          '+    public void FinalizarPedido(Pedido pedido)',
          '+    {',
          '+        EmailNotificador notificador = new EmailNotificador();',
          '+        notificador.Enviar("Pedido confirmado");',
          '+    }',
          ' }'
        ],
        opcoes: [
          'Receber `INotificador` pelo construtor e usar uma implementação falsa no teste',
          'Colocar um if para não enviar e-mail quando estiver testando',
          'Trocar EmailNotificador por um método estático',
          'Remover o envio de e-mail do sistema'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Espalhar condições de teste dentro do código de produção é um anti-padrão: o teste contamina a regra.',
          2: 'Método estático dificulta trocar a implementação depois.',
          3: 'O e-mail é requisito do sistema; o que falta é poder substituí-lo no teste.'
        },
        dicas: ['O teste precisa de uma versão "de mentira" do notificador.', 'Como entregar essa versão de fora para o service?'],
        explicacao: 'Com DI, o teste cria um NotificadorFalso : INotificador e injeta no service. Nenhum e-mail é enviado e a regra é testada de verdade.',
        conceitos: ['csharp.di', 'csharp.interfaces'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Onde tudo se conecta em uma API',
      blocos: [
        { tipo: 'texto', texto: 'Em uma aplicação ASP.NET, o registro das dependências fica no início do programa. É aqui que a aplicação passa a saber qual implementação usar quando alguém pedir `INotificador`:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'builder.Services.AddScoped<INotificador, EmailNotificador>();' },
        { tipo: 'nota', tom: 'info', texto: 'Você não precisa entender esta linha agora: ela é a configuração que o ASP.NET usa para entregar a dependência. Vamos detalhá-la na trilha de ASP.NET Core.' },
        { tipo: 'texto', texto: 'A partir do registro, o próprio ASP.NET cria o PedidoService e entrega o notificador certo. Você não escreve `new PedidoService()` em lugar nenhum.' },
        { tipo: 'nota', tom: 'info', texto: 'Você vai estudar `AddScoped`, `AddTransient` e `AddSingleton` na trilha de ASP.NET Core, depois de entender por que eles existem.' },
        { tipo: 'trabalho', texto: 'Injeção de dependência aparece o tempo todo em projetos .NET. Em entrevistas, é quase certo perguntarem qual problema ela resolve — agora você sabe responder com um caso concreto.', fonte: '💼 Em uma entrevista .NET' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs06-a4',
        tipo: 'explain',
        dimensao: 'construcao',
        enunciado: 'Explique com suas palavras.',
        pergunta: 'Qual problema a injeção de dependência resolve? Dê um exemplo concreto.',
        criterios: [
          'A classe deixa de construir suas próprias dependências',
          'Fica possível trocar a implementação sem reescrever a classe',
          'Fica possível testar com uma implementação falsa'
        ],
        palavrasChave: ['new', 'constru', 'criar', 'trocar', 'substitu', 'test', 'falsa', 'falso', 'simular', 'mock', 'recebe', 'injet', 'fora'],
        exemplo: 'Sem DI, o PedidoService cria um EmailNotificador com new e fica preso a ele. Com DI, o service recebe um INotificador pelo construtor: posso entregar um notificador de SMS em produção ou um notificador falso no teste, sem alterar o service.',
        dicas: ['Comece pelo problema: quem construía a dependência?', 'Depois diga o que muda: trocar e testar.'],
        explicacao: 'Entender o problema é mais importante do que decorar o nome. DI é apenas a técnica de fornecer dependências de fora.',
        conceitos: ['csharp.di']
      }
    }
  ]
});
