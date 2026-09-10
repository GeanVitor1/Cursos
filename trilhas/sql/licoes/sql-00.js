Plataforma.registrarLicao({
  id: 'sql-00',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'O que é um banco de dados?',
  subtitulo: 'Fundamentos · Etapa 0',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Entender por que um sistema precisa de um banco de dados',
    'Diferenciar servidor, banco e tabela',
    'Reconhecer coluna e registro dentro de uma tabela',
    'Entender o papel da chave primária'
  ],
  conceitos: ['sql.banco', 'sql.servidor', 'sql.tabela', 'sql.coluna', 'sql.registro', 'sql.chave-primaria', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Por que o sistema precisa lembrar?',
      introduz: ['sql.banco'],
      blocos: [
        { tipo: 'texto', texto: 'Todo sistema que você vai construir precisa **lembrar das informações**: clientes, produtos, pedidos, pagamentos. Se a aplicação desligar, os dados não podem desaparecer.' },
        { tipo: 'texto', texto: 'Uma forma simples de enxergar isso: pense na **agenda de contatos** do celular. Cada pessoa tem nome, telefone e e-mail. Tudo fica organizado e você consegue encontrar qualquer contato rapidamente.' },
        { tipo: 'conceito', id: 'sql.banco', titulo: 'Banco de dados', texto: 'Um lugar organizado onde o sistema guarda informações para poder consultá-las e alterá-las depois.', exemplo: 'O banco mercado_aurora guarda Clientes, Produtos e Pedidos.' },
        { tipo: 'nota', tom: 'info', texto: 'Nesta trilha você vai usar um banco fictício de uma loja chamada **Mercado Aurora**. Ele terá clientes, produtos, pedidos e pagamentos.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Servidor: onde o banco mora',
      introduz: ['sql.servidor'],
      blocos: [
        { tipo: 'texto', texto: 'O banco de dados não existe "no ar". Ele fica instalado em um computador preparado para ficar ligado o tempo todo, atendendo às aplicações. Esse computador é o **servidor**.' },
        { tipo: 'conceito', id: 'sql.servidor', titulo: 'Servidor', texto: 'O computador onde o banco de dados fica instalado e funcionando.', exemplo: 'Um servidor pode hospedar vários bancos.' },
        { tipo: 'diagrama', arte: 'SERVIDOR (um computador ligado 24h)\n┌──────────────────────────────────┐\n│  BANCO DE DADOS: mercado_aurora  │\n│                                  │\n│   ┌───────────┐  ┌───────────┐   │\n│   │ Clientes  │  │ Produtos  │   │\n│   └───────────┘  └───────────┘   │\n└──────────────────────────────────┘', legenda: 'Um servidor pode hospedar vários bancos. Cada banco tem várias tabelas.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Tabela: um assunto por vez',
      introduz: ['sql.tabela'],
      blocos: [
        { tipo: 'texto', texto: 'Dentro do banco, as informações ficam separadas por assunto: uma parte para clientes, outra para produtos, outra para pedidos. Cada uma dessas partes organizadas é uma **tabela**.' },
        { tipo: 'conceito', id: 'sql.tabela', titulo: 'Tabela', texto: 'A estrutura que guarda um tipo de informação, como clientes ou produtos.', exemplo: 'A tabela Clientes guarda os clientes; a tabela Produtos guarda os produtos.' },
        { tipo: 'tabela', titulo: 'Tabelas do Mercado Aurora', colunas: ['Tabela', 'O que guarda'], linhas: [['Clientes', 'quem compra'], ['Produtos', 'o que é vendido'], ['Pedidos', 'compras realizadas']], legenda: 'Uma tabela guarda um assunto. Isso evita misturar clientes com produtos.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Coluna e registro: o cabeçalho e a linha',
      introduz: ['sql.coluna', 'sql.registro'],
      blocos: [
        { tipo: 'texto', texto: 'Agora olhe para dentro de uma tabela. Os dados ficam em uma grade parecida com uma planilha.' },
        { tipo: 'tabela', titulo: 'Tabela: Clientes', colunas: ['Id', 'Nome', 'Email', 'Cidade', 'Ativo'], linhas: [[1, 'Ana Souza', 'ana@email.com', 'Curitiba', 1], [2, 'Bruno Lima', 'bruno@email.com', 'Recife', 1], [3, 'Carla Dias', 'carla@email.com', 'São Paulo', 0]] },
        { tipo: 'conceito', id: 'sql.coluna', titulo: 'Coluna', texto: 'Um campo da tabela. A coluna define que tipo de informação todo registro possui.', exemplo: 'Id, Nome, Email, Cidade e Ativo são as colunas de Clientes.' },
        { tipo: 'conceito', id: 'sql.registro', titulo: 'Registro', texto: 'Cada linha completa da tabela: todos os dados de um item.', exemplo: 'A linha "1 | Ana Souza | ana@email.com | Curitiba | 1" é um registro de cliente.' },
        { tipo: 'diagrama', arte: 'COLUNAS (o cabeçalho)\n┌────┬────────────┬─────────────────┐\n│ Id │ Nome       │ Email           │\n├────┼────────────┼─────────────────┤\n│ 1  │ Ana Souza  │ ana@email.com   │ ◄── um REGISTRO (linha completa)\n│ 2  │ Bruno Lima │ bruno@email.com │ ◄── outro REGISTRO\n└────┴────────────┴─────────────────┘', legenda: 'A coluna é o campo; o registro é a linha inteira.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql00-a0',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'Na tabela Clientes, o cabeçalho **Nome** representa o quê?',
        opcoes: [
          'Uma coluna da tabela',
          'Um registro completo',
          'O servidor onde o banco fica',
          'Uma linha da tabela'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Um registro é a linha inteira, com todos os campos preenchidos.',
          2: 'O servidor é o computador onde o banco fica; não é um campo da tabela.',
          3: 'Uma linha reúne todas as colunas; "Nome" é só um dos campos.'
        },
        dicas: ['O cabeçalho fica na parte de cima da tabela.', 'Cada campo da tabela tem um nome no cabeçalho.'],
        explicacao: 'O cabeçalho define a coluna. "Nome" é uma coluna; a linha inteira (Id + Nome + Email + Cidade + Ativo) é um registro.',
        conceitos: ['sql.coluna', 'sql.tabela']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql00-a1',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Agora que você conhece os quatro termos, conecte cada um ao seu significado.',
        pares: [
          ['Servidor', 'Computador onde o banco fica instalado e rodando'],
          ['Banco de dados', 'Conjunto organizado de tabelas de um sistema'],
          ['Tabela', 'Estrutura que guarda um tipo de informação'],
          ['Registro', 'Uma linha completa dentro de uma tabela']
        ],
        dicas: ['O servidor é um computador preparado para ficar ligado e atender.', 'Uma tabela guarda um assunto. Um registro é um item desse assunto.'],
        explicacao: 'Essa hierarquia aparece em toda conversa técnica: servidor → banco → tabela → registro.',
        conceitos: ['sql.servidor', 'sql.banco', 'sql.tabela', 'sql.registro']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql00-a2',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'Na tabela Clientes, o que a linha inteira "2 | Bruno Lima | bruno@email.com | Recife | 1" representa?',
        opcoes: [
          'Um registro completo de cliente, com todos os seus dados',
          'A coluna do nome',
          'O servidor onde os dados ficam',
          'Apenas o e-mail do Bruno'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A coluna é só um campo; a linha reúne todos eles.',
          2: 'O servidor é a máquina que hospeda o banco.',
          3: 'O e-mail é só uma das colunas daquele registro.'
        },
        dicas: ['Compare com o diagrama: a linha horizontal inteira é o quê?', 'Id, Nome, Email, Cidade e Ativo juntos descrevem quem?'],
        explicacao: 'A linha inteira é um registro. As colunas são apenas os campos que todo registro possui.',
        conceitos: ['sql.registro', 'sql.tabela']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'A chave primária',
      introduz: ['sql.chave-primaria'],
      blocos: [
        { tipo: 'texto', texto: 'Como saber que dois clientes "Ana Souza" são pessoas diferentes? Precisamos de algo único para cada registro.' },
        { tipo: 'conceito', id: 'sql.chave-primaria', titulo: 'Chave primária', texto: 'A coluna que identifica cada linha de forma única. Não pode repetir nem ficar vazia.', exemplo: 'A coluna Id de Clientes.' },
        { tipo: 'tabela', titulo: 'A coluna Id identifica cada cliente', colunas: ['Id', 'Nome', 'Cidade'], linhas: [[1, 'Ana Souza', 'Curitiba'], [2, 'Ana Souza', 'Recife'], [3, 'Ana Souza', 'Salvador']], legenda: 'Mesmo com nomes iguais, cada registro tem um Id diferente.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Nunca invente significados para o Id. Ele serve para identificar, não para classificar. Um cliente com Id 1 não é "melhor" que o de Id 2.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql00-a3',
        tipo: 'true-false',
        dimensao: 'reconhecimento',
        enunciado: 'Marque verdadeiro ou falso para cada afirmação.',
        afirmacoes: [
          { texto: 'Uma tabela pode ter dois registros com o mesmo valor de chave primária.', correta: false, explicacao: 'A chave primária é única: não pode repetir.' },
          { texto: 'Uma tabela guarda dados de um mesmo tipo de coisa, como clientes ou produtos.', correta: true, explicacao: 'Cada tabela guarda um assunto, como Clientes ou Produtos.' },
          { texto: 'A chave primária serve para identificar cada linha de forma única.', correta: true, explicacao: 'É exatamente o papel da chave primária.' }
        ],
        dicas: ['Releia a definição de chave primária: ela é única por registro.', 'Se dois registros tivessem o mesmo Id, como o sistema saberia qual é qual?'],
        explicacao: 'A chave primária é um contrato: não pode repetir e não pode ser nula. É o que garante que cada registro seja localizável.',
        conceitos: ['sql.chave-primaria', 'sql.tabela']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Por que não uma planilha?',
      blocos: [
        { tipo: 'texto', texto: 'Planilhas funcionam para analisar dados, mas não para sustentar um sistema. Veja a diferença em um fluxo real:' },
        { tipo: 'diagrama', arte: 'Aplicação (e-commerce)\n        │  "salve este pedido"\n        ▼\n  Banco de dados\n        │  resposta rápida e consistente\n        ▼\nAplicação mostra confirmação' },
        { tipo: 'lista', itens: ['**Vários usuários ao mesmo tempo**: o banco controla quem grava o quê, sem sobrescrever.', '**Dados sempre válidos**: o banco impede pedidos vinculados a clientes que não existem.', '**Consultas rápidas**: mesmo com milhões de registros, uma busca por Id é quase instantânea.', '**Segurança**: usuários e aplicações têm permissões diferentes.'] }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql00-a4',
        tipo: 'find-error',
        dimensao: 'reconhecimento',
        enunciado: 'Esta tabela deveria ter uma chave primária saudável. O que está errado?',
        contexto: [
          { tipo: 'tabela', titulo: 'Clientes', colunas: ['Id', 'Nome', 'Email'], linhas: [[1, 'Ana Souza', 'ana@email.com'], [1, 'Bruno Lima', 'bruno@email.com'], [3, 'Carla Dias', 'carla@email.com']] }
        ],
        opcoes: [
          'Há dois registros com Id 1, e a chave primária não pode repetir',
          'A tabela tem poucas linhas para ser um banco',
          'O e-mail deveria ser um número',
          'Falta a coluna de telefone'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A quantidade de linhas não tem a ver com a chave primária.',
          2: 'E-mails são textos; o problema está na coluna Id.',
          3: 'Telefone não é obrigatório e não tem relação com o erro.'
        },
        dicas: ['Compare a coluna Id das duas primeiras linhas.', 'Qual é a regra número um da chave primária?'],
        explicacao: 'Chave primária não pode repetir. Dois clientes com Id 1 tornam impossível saber qual registro é qual — e o banco rejeitaria essa gravação.',
        conceitos: ['sql.chave-primaria']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner',
      introduz: ['sql.ingles'],
      blocos: [
        { tipo: 'texto', texto: 'Vocabulário que aparece em toda documentação e em conversas de trabalho:' },
        { tipo: 'vocab', titulo: 'Database vocabulary', pares: [['database', 'banco de dados'], ['server', 'servidor'], ['table', 'tabela'], ['row', 'linha (registro)'], ['column', 'coluna (campo)'], ['primary key', 'chave primária']] },
        { tipo: 'ingles', frase: 'The customers table has three columns.', traducao: 'A tabela de clientes tem três colunas.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql00-a6',
        tipo: 'translate',
        dimensao: 'associacao',
        enunciado: 'Qual é o significado de **table**?',
        termo: 'table',
        direcao: 'en-pt',
        opcoes: ['tabela', 'linha', 'coluna', 'servidor'],
        correta: 0,
        feedbackErro: {
          1: 'Linha é **row**.',
          2: 'Coluna é **column**.',
          3: 'Servidor é **server**.'
        },
        dicas: ['É a estrutura que guarda um tipo de informação.', 'Você acabou de ver a palavra no vocabulário.'],
        explicacao: 'Table = tabela. Row = linha (registro). Column = coluna. Termos que aparecem em toda documentação.',
        conceitos: ['sql.ingles']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql00-a5',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Uma loja online registra cerca de 40 mil pedidos por mês. No começo, a equipe controlava tudo em uma planilha compartilhada — mas começou a perder dados: duas pessoas editavam a mesma linha, valores sumiam e ninguém sabia qual versão era a correta.',
        enunciado: 'Por que migrar para um banco de dados resolve esse cenário?',
        opcoes: [
          'Porque o banco controla acessos simultâneos, impede dados inválidos e permite consultas rápidas em grande volume',
          'Porque a planilha é mais lenta para digitar',
          'Porque banco de dados é sempre gratuito',
          'Porque assim ninguém mais precisa de senha'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A velocidade de digitação não é o problema; o problema é perder e corromper dados.',
          2: 'Custo não é o critério; a planilha simplesmente não foi feita para isso.',
          3: 'Permissões continuam existindo; o banco melhora o controle, não elimina a necessidade de senha.'
        },
        dicas: ['O problema central é edição simultânea e dados perdidos.', 'Qual característica do banco resolve exatamente isso?'],
        explicacao: 'Esse é o trabalho real de um banco: garantir que várias pessoas usando ao mesmo tempo não corrompam os dados.',
        conceitos: ['sql.banco', 'sql.servidor'],
        desafio: true
      }
    }
  ]
});
