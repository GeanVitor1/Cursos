Plataforma.registrarLicao({
  id: 'csharp-05',
  trilha: 'csharp',
  tipo: 'licao',
  titulo: 'Interfaces: o contrato antes da implementação',
  subtitulo: 'C# · Etapa 5',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Entender o problema que uma interface resolve',
    'Ler e escrever uma interface simples',
    'Reconhecer implementações diferentes do mesmo contrato'
  ],
  conceitos: ['csharp.interfaces', 'csharp.classes', 'csharp.leitura'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O problema: código preso a uma escolha',
      blocos: [
        { tipo: 'texto', texto: 'Veja como uma classe de pedidos costuma começar. Ela mesma decide como enviar o e-mail de confirmação:' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'public class PedidoService\n{\n    public void FinalizarPedido(Pedido pedido)\n    {\n        EmailService email = new EmailService();\n        email.Enviar("Pedido confirmado");\n    }\n}' },
        { tipo: 'texto', texto: 'Funciona. Mas surgem três perguntas:' },
        { tipo: 'lista', itens: [
          'E quando a empresa trocar de provedor de e-mail?',
          'E para testar a regra do pedido **sem** enviar e-mail de verdade?',
          'E se outro canal (SMS, push) precisar receber a mesma mensagem?'
        ] },
        { tipo: 'destaque', texto: 'Sempre que a classe precisa ser reescrita por causa de uma escolha externa (e-mail, banco, serviço externo), é sinal de que falta um **contrato** entre as duas partes.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Interface é o contrato',
      introduz: ['csharp.interfaces'],
      blocos: [
        { tipo: 'texto', texto: 'Uma **interface** descreve **o que** algo faz, sem dizer **como**. Quem implementa assume o compromisso de cumprir aquele contrato.' },
        { tipo: 'conceito', id: 'csharp.interfaces', titulo: 'Interface', texto: 'Um contrato: uma lista de métodos que uma classe se compromete a ter. Ela não executa nada; ela promete.', exemplo: 'interface INotificador { void Enviar(string mensagem); }' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'public interface INotificador\n{\n    void Enviar(string mensagem);\n}' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'public class EmailNotificador : INotificador\n{\n    public void Enviar(string mensagem)\n    {\n        // envia e-mail de verdade\n    }\n}\n\npublic class SmsNotificador : INotificador\n{\n    public void Enviar(string mensagem)\n    {\n        // envia SMS\n    }\n}' },
        { tipo: 'diagrama', arte: '      PedidoService\n            │ depende de\n            ▼\n      INotificador  ◄── contrato\n        ▲       ▲\n        │       │\nEmailNotificador  SmsNotificador\n   (implementações)' },
        { tipo: 'glossario', titulo: 'Termos que aparecem no código', itens: [
          ['interface', 'contrato', 'Lista de métodos que uma classe se compromete a ter.'],
          [': INotificador', 'implementa', 'A classe assina o contrato e precisa cumprir tudo.'],
          ['INotificador', 'prefixo I', 'Convenção do .NET: interfaces começam com I.'],
          ['classe concreta', 'implementação', 'A classe de verdade, que contém o código que executa a ação.']
        ] }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs05-a1',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada termo ao seu papel.',
        pares: [
          ['Interface', 'Contrato: o que deve existir'],
          ['Classe concreta', 'Implementação: como funciona de verdade'],
          ['EmailNotificador : INotificador', 'Uma implementação do contrato'],
          ['Trocar a implementação', 'Mudança sem reescrever quem usa']
        ],
        dicas: ['A interface não executa nada; ela promete.', 'A classe concreta é quem tem o código de verdade.'],
        explicacao: 'Quem usa a interface não se importa com a implementação. Essa separação é o coração de um código testável (fácil de testar e de trocar depois).',
        conceitos: ['csharp.interfaces']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs05-a2',
        tipo: 'interpret-code',
        dimensao: 'reconhecimento',
        enunciado: 'O que esta interface exige de quem a implementa?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'public interface ICalculadoraFrete\n{\n    decimal Calcular(decimal peso, string cep);\n}' }
        ],
        opcoes: [
          'Um método Calcular que recebe peso e CEP e devolve um decimal',
          'Uma propriedade chamada Peso',
          'Uma lista de fretes',
          'Nada: interface é só documentação'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Peso é um parâmetro do método, não uma propriedade.',
          2: 'A interface define um método, não uma coleção.',
          3: 'O compilador exige que a classe cumpra o contrato — não é apenas documentação.'
        },
        dicas: ['Leia o tipo de retorno e os parâmetros.', '`decimal Calcular(decimal peso, string cep)` é a assinatura.'],
        explicacao: 'A interface obriga qualquer transportadora a oferecer o cálculo de frete com essa assinatura, cada uma do seu jeito.',
        conceitos: ['csharp.interfaces', 'csharp.metodos']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs05-a3',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete a interface e a classe que a implementa.',
        codigo: 'public {{1}} INotificador\n{\n    void Enviar(string mensagem);\n}\n\npublic class EmailNotificador {{2}} INotificador\n{\n    public void Enviar(string mensagem)\n    {\n        // envia e-mail\n    }\n}',
        lacunas: [['interface'], [':']],
        dicas: ['A palavra que declara um contrato.', 'A classe "assina" o contrato com um símbolo de dois pontos.'],
        explicacao: '`interface` declara; `:` indica que a classe assume o contrato e deve implementar todos os métodos.',
        conceitos: ['csharp.interfaces']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs05-a4',
        tipo: 'code-review',
        dimensao: 'aplicacao',
        enunciado: 'Nesta revisão de código, o time queria permitir trocar o provedor de e-mail. O que ainda está errado?',
        ticket: { numero: '#5130', titulo: 'Permitir troca de provedor de e-mail', corpo: 'Foi criada a interface INotificador e duas implementações. No entanto, o PedidoService continua difícil de testar.' },
        autor: 'colega de time',
        diff: [
          ' public class PedidoService',
          ' {',
          '     public void FinalizarPedido(Pedido pedido)',
          '     {',
          '-        EmailService email = new EmailService();',
          '+        INotificador notificador = new EmailNotificador();',
          '         notificador.Enviar("Pedido confirmado");',
          '     }',
          ' }'
        ],
        opcoes: [
          'O PedidoService ainda cria a implementação com `new`; o ideal é receber o INotificador pronto de fora',
          'A interface não pode ter método Enviar',
          'Falta tratar o caso em que o envio falha',
          'O método FinalizarPedido deveria devolver uma string'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A interface existe justamente para padronizar o método Enviar.',
          2: 'O ticket fala de dificuldade para testar e trocar, não de falha no envio.',
          3: 'O problema apontado no ticket é a dificuldade de testar/trocar, não o retorno.'
        },
        dicas: ['Trocar `EmailService` por `INotificador` já foi um avanço...', '...mas quem ainda decide qual implementação usar?', 'O `new` escondido mantém a classe presa ao EmailNotificador.'],
        explicacao: 'A interface só resolve o problema quando a escolha da implementação sai de dentro da classe. A solução para isso é a próxima etapa.',
        conceitos: ['csharp.interfaces'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cs05-a5',
        tipo: 'explain',
        dimensao: 'construcao',
        enunciado: 'Explique com suas palavras.',
        pergunta: 'Qual a diferença entre a interface INotificador e a classe EmailNotificador?',
        criterios: [
          'Interface = contrato (o que deve existir)',
          'Classe = implementação (como funciona)',
          'Citar que dá para trocar a implementação sem mudar quem usa'
        ],
        palavrasChave: ['contrato', 'o que', 'implement', 'como', 'trocar', 'substitu', 'combinado', 'promessa'],
        exemplo: 'A interface é o contrato: ela diz que existe um método Enviar. A classe EmailNotificador é uma implementação concreta desse contrato, que envia de verdade por e-mail. Posso criar outra implementação (SMS) e trocar sem mudar quem chama Enviar.',
        dicas: ['Pense em "o que" versus "como".', 'Pense na possibilidade de substituir uma implementação.'],
        explicacao: 'Separar contrato de implementação é o que permite testar e evoluir o sistema sem reescrever as classes que dependem dele.',
        conceitos: ['csharp.interfaces']
      }
    }
  ]
});
