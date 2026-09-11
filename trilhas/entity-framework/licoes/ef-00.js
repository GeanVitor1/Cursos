Plataforma.registrarLicao({
  id: 'ef-00',
  trilha: 'entity-framework',
  tipo: 'licao',
  titulo: 'C# e SQL: como os dois conversam (sem sofrimento)',
  subtitulo: 'EF Core · Etapa 0',
  duracaoMin: 40,
  xp: 30,
  objetivos: [
    'Ver o problema de acessar o banco manualmente',
    'Entender o que é um ORM e o que é uma entidade',
    'Reconhecer o mapeamento classe ↔ tabela'
  ],
  conceitos: ['ef.orm', 'ef.entidade', 'sql.tabela', 'csharp.classes'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O caminho manual é longo',
      blocos: [
        { tipo: 'retoma', conceito: 'sql.tabela', texto: 'Você já sabe criar tabelas e consultar com SQL. Agora imagine fazer essa ponte **à mão**, para cada operação da aplicação.' },
        { tipo: 'texto', texto: 'Você já sabe que a tabela Produtos guarda os dados e que a classe Produto representa o produto em C#. O problema é fazer a ponte entre os dois.' },
        { tipo: 'codigo', linguagem: 'texto', codigo: '// Jeito manual: cada operação exige uma sequência longa de passos\n//\n// 1. Abrir a conexão com o banco\n// 2. Montar o comando SQL:\n//    INSERT INTO Produtos (Nome, Preco, Estoque) VALUES (...)\n// 3. Preencher os parâmetros com os valores do objeto produto\n// 4. Executar o comando e converter o que o banco devolver' },
        { tipo: 'nota', tom: 'info', texto: 'No comando acima, `INSERT INTO Produtos (Nome, Preco, Estoque) VALUES (...)` se lê assim: **insira dentro** de Produtos, nas colunas Nome, Preco e Estoque, os **valores** correspondentes. É tudo escrito à mão, coluna por coluna.' },
        { tipo: 'nota', tom: 'info', texto: 'Você não precisa entender cada linha desta sequência agora. O objetivo aqui é só perceber o tamanho e a repetição do trabalho manual.' },
        { tipo: 'texto', texto: 'Para **cada operação** (inserir, buscar, atualizar, excluir) você repete esse tipo de código. E ao ler dados, precisa criar o objeto e preencher campo por campo, na ordem certa.' },
        { tipo: 'lista', itens: [
          'Muito código repetitivo por operação.',
          'Fácil errar nome de coluna ou ordem dos parâmetros.',
          'Toda mudança de estrutura exige alterar SQL espalhado pelo projeto.',
          'Converter uma linha do banco para um objeto C# é manual.'
        ] },
        { tipo: 'destaque', texto: 'Esse trabalho previsível e repetitivo é exatamente o que uma ferramenta especializada faz por você. Na próxima tela você conhece o nome dela.' }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'ORM: o tradutor entre C# e o banco',
      introduz: ['ef.orm'],
      blocos: [
        { tipo: 'texto', texto: '**ORM** significa Object-Relational Mapper (mapeador objeto-relacional) — mas o nome importa menos do que a função: ele **traduz** entre objetos C# e tabelas do banco.' },
        { tipo: 'diagrama', arte: 'C#                                    Banco de dados\n\nProduto                               Produtos\n├── Id        (int)      ◄──────►     ├── Id        INT\n├── Nome      (string)   ◄──────►     ├── Nome      VARCHAR\n├── Preco     (decimal)  ◄──────►     ├── Preco     DECIMAL\n└── Estoque   (int)      ◄──────►     └── Estoque   INT' },
        { tipo: 'glossario', titulo: 'Vocabulário do ORM', itens: [
          ['ORM', 'mapeador objeto-relacional', 'Tradutor entre objetos C# e tabelas do banco.'],
          ['EF Core', 'o ORM do .NET', 'Entity Framework Core, o ORM oficial da Microsoft, usado na maioria dos projetos.']
        ] }
      ]
    },
    {
      tipo: 'conteudo',
      titulo: 'Entidade: a classe que representa uma tabela',
      introduz: ['ef.entidade'],
      blocos: [
        { tipo: 'texto', texto: 'Você escreve C# e o ORM gera o SQL correspondente. O objeto Produto que você já sabe criar é chamado de **entidade** — a classe mapeada para uma tabela.' },
        { tipo: 'glossario', titulo: 'A correspondência', itens: [
          ['Entidade', 'classe mapeada', 'Classe como Produto, ligada a uma tabela.'],
          ['Mapeamento', 'regra de correspondência', 'Diz qual classe vira qual tabela e qual propriedade vira qual coluna.']
        ] },
        { tipo: 'trabalho', texto: 'Em projetos .NET profissionais, EF Core (ou um ORM equivalente) é a forma padrão de acessar o banco. O SQL continua existindo por baixo — e você já sabe lê-lo, o que é uma vantagem enorme.', fonte: '💼 Em uma vaga .NET' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef00-a1',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada elemento do lado C# ao seu equivalente no banco.',
        pares: [
          ['Classe Produto', 'Tabela Produtos'],
          ['Propriedade Nome', 'Coluna Nome'],
          ['Objeto produto', 'Linha da tabela'],
          ['Tipo string', 'Tipo VARCHAR']
        ],
        dicas: ['A classe é o molde da tabela.', 'O objeto preenchido equivale a uma linha.'],
        explicacao: 'Esse mapeamento mental é o que permite entender todo o resto do Entity Framework.',
        conceitos: ['ef.orm', 'ef.entidade']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef00-a2',
        tipo: 'multiple-choice',
        dimensao: 'reconhecimento',
        enunciado: 'Qual problema o ORM resolve?',
        opcoes: [
          'Evita escrever e converter SQL manualmente para cada operação, mantendo o mapeamento entre classes e tabelas',
          'Elimina a necessidade de banco de dados',
          'Faz o banco ficar mais rápido do que com SQL nativo em qualquer situação',
          'Permite usar C# sem aprender SQL'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O banco continua existindo; o ORM só conversa com ele por você.',
          2: 'O ORM pode gerar SQL ótimo, mas o desempenho depende de como é usado — nada é mágica.',
          3: 'Sem noção de SQL, você não consegue investigar o que o ORM gera nem resolver lentidão.'
        },
        dicas: ['Pense no código repetitivo de conversão que você acabou de ver.', 'O ORM não substitui o banco.'],
        explicacao: 'O ORM automatiza o repetitivo e mantém o mapeamento. Entender SQL continua sendo essencial para usar bem.',
        conceitos: ['ef.orm']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef00-a3',
        tipo: 'order-blocks',
        dimensao: 'ordenacao',
        enunciado: 'Ordene os passos do caminho manual: do objeto C# até a linha gravada no banco.',
        blocos: [
          'Você tem um objeto Produto preenchido em memória',
          'Monta o comando SQL com os nomes das colunas',
          'Adiciona os parâmetros com os valores do objeto',
          'Executa o comando na conexão',
          'O banco grava a linha na tabela'
        ],
        dicas: ['O SQL só pode ser montado depois que o objeto existe.', 'A execução é o passo que chega ao banco.'],
        explicacao: 'Esse é o trabalho que o EF Core faz por baixo. Conhecer a sequência evita tratar o ORM como caixa-preta.',
        conceitos: ['ef.orm']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef00-a4',
        tipo: 'explain',
        dimensao: 'construcao',
        enunciado: 'Explique com suas palavras.',
        pergunta: 'O que é um ORM e que relação ele tem com SQL?',
        criterios: [
          'ORM traduz entre objetos C# e tabelas do banco',
          'Ele gera SQL automaticamente',
          'Entender SQL continua importante para investigar e otimizar'
        ],
        palavrasChave: ['traduz', 'mapeia', 'mapa', 'classe', 'tabela', 'gera', 'sql', 'c#', 'objeto', 'convers'],
        exemplo: 'ORM é um tradutor entre o mundo dos objetos C# e o mundo relacional do banco. O EF Core gera o SQL a partir do que escrevo em C#. Mesmo assim, preciso saber SQL para entender e otimizar o que ele gera.',
        dicas: ['Use a palavra "ponte" ou "tradutor".', 'Não esqueça o papel do SQL nessa história.'],
        explicacao: 'Compreender a relação ORM ↔ SQL é o que diferencia quem usa EF Core de quem apenas copia exemplos.',
        conceitos: ['ef.orm'],
        desafio: true
      }
    }
  ]
});
