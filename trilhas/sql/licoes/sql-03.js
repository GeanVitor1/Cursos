Plataforma.registrarLicao({
  id: 'sql-03',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Filtrando com WHERE',
  subtitulo: 'Fundamentos · Etapa 3',
  duracaoMin: 50,
  xp: 30,
  objetivos: [
    'Filtrar registros com WHERE',
    'Usar os operadores de comparação =, <>, >, <, >= e <=',
    'Escrever textos entre aspas simples corretamente'
  ],
  conceitos: ['sql.where', 'sql.operadores', 'sql.texto-aspas', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Nem tudo, só o que importa',
      introduz: ['sql.where'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.select', texto: 'Você já sabe buscar colunas com `SELECT ... FROM`. Agora vai aprender a escolher **quais linhas** aparecem no resultado.' },
        { tipo: 'texto', texto: 'Com milhares de clientes, retornar todos para mostrar apenas os ativos é desperdício. O banco precisa filtrar antes de responder.' },
        { tipo: 'texto', texto: 'A palavra-chave é `WHERE` (onde). Ela diz o critério que a linha precisa satisfazer para aparecer no resultado.' },
        { tipo: 'conceito', id: 'sql.where', titulo: 'WHERE', texto: 'A parte da consulta que define a condição que cada linha precisa satisfazer para entrar no resultado.', exemplo: 'SELECT * FROM Clientes WHERE Ativo = 1;' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT *\nFROM Clientes\nWHERE Ativo = 1;'
        },
        {
          tipo: 'tabela',
          titulo: 'Resultado',
          colunas: ['Id', 'Nome', 'Cidade', 'Ativo'],
          linhas: [
            [1, 'Ana Souza', 'Curitiba', 1],
            [2, 'Bruno Lima', 'Recife', 1]
          ],
          legenda: 'Carla tem Ativo = 0 e ficou de fora.'
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql03-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que o `WHERE` faz em uma consulta?',
        opcoes: [
          'Define a condição que cada linha precisa satisfazer para entrar no resultado',
          'Ordena as linhas do resultado',
          'Escolhe quais colunas aparecem',
          'Remove colunas vazias'
        ],
        correta: 0,
        dicas: [
          'WHERE vem de "onde" — onde a condição é verdadeira.',
          'Ele não escolhe colunas; isso é papel do SELECT.'
        ],
        explicacao: 'SELECT escolhe **colunas**. WHERE escolhe **linhas**. Essa dupla aparece em praticamente toda consulta profissional.',
        conceitos: ['sql.where']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Operadores de comparação',
      introduz: ['sql.operadores'],
      blocos: [
        { tipo: 'texto', texto: 'A condição do WHERE usa operadores. Se você já fez a trilha de C#, vai reconhecer quase todos — atenção especial à igualdade:' },
        {
          tipo: 'tabela',
          titulo: 'Operadores',
          colunas: ['Operador', 'Significado', 'Exemplo'],
          linhas: [
            ['=', 'igual a', 'Ativo = 1'],
            ['<>', 'diferente de', 'Status <> \'Pago\''],
            ['>', 'maior que', 'Preco > 150'],
            ['<', 'menor que', 'Estoque < 10'],
            ['>=', 'maior ou igual a', 'Preco >= 100'],
            ['<=', 'menor ou igual a', 'Preco <= 500']
          ]
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Em SQL, igualdade é `=`. O `==` é do C#. Trocar os dois é um dos erros mais comuns de quem alterna entre C# e SQL.' },
        { tipo: 'nota', tom: 'info', texto: 'R$ = reais (dinheiro no Brasil).' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql03-a2',
        tipo: 'predict-output',
        enunciado: 'Quais produtos serão retornados?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Produtos',
            colunas: ['Id', 'Nome', 'Preco'],
            linhas: [
              [1, 'Mouse', 100.0],
              [2, 'Teclado', 200.0],
              [3, 'Monitor', 900.0],
              [4, 'Webcam', 150.0]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Nome\nFROM Produtos\nWHERE Preco > 150;' }
        ],
        opcoes: [
          'Teclado e Monitor',
          'Mouse e Webcam',
          'Apenas Monitor',
          'Todos os produtos'
        ],
        correta: 0,
        dicas: [
          'O operador é "maior que", sem incluir o valor igual.',
          'Webcam custa exatamente 150. Ela entra no critério?'
        ],
        explicacao: '`>` exige valor estritamente maior. Teclado (200) e Monitor (900) passam. Webcam (150) fica de fora porque é igual, não maior.',
        conceitos: ['sql.where', 'sql.operadores']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql03-a3',
        tipo: 'fill-code',
        enunciado: 'Complete a consulta para buscar os produtos **mais caros que R$ 500**.',
        codigo: 'SELECT Nome, Preco\nFROM Produtos\nWHERE Preco {{1}} 500;',
        lacunas: [['>']],
        dicas: [
          'Mais caro = preço maior.',
          'O operador é um único caractere.'
        ],
        explicacao: '`Preco > 500` retorna apenas os estritamente mais caros que 500. Para incluir os de exatamente 500, seria `>=`.',
        conceitos: ['sql.where', 'sql.operadores']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Texto pede aspas simples',
      introduz: ['sql.texto-aspas'],
      blocos: [
        { tipo: 'texto', texto: 'Números e booleanos entram direto na condição. Textos precisam de **aspas simples**:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT *\nFROM Clientes\nWHERE Cidade = \'Curitiba\';'
        },
        {
          tipo: 'tabela',
          titulo: 'Resultado',
          colunas: ['Id', 'Nome', 'Cidade'],
          linhas: [[1, 'Ana Souza', 'Curitiba']]
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Aspas duplas (`"`) significam outra coisa no banco: nomes de tabelas e colunas. Para valores de texto, use sempre aspas simples (`\'`).' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql03-a4',
        tipo: 'multiple-choice',
        enunciado: 'Como buscar apenas os clientes de Recife?',
        opcoes: [
          'SELECT * FROM Clientes WHERE Cidade = \'Recife\';',
          'SELECT * FROM Clientes WHERE Cidade = Recife;',
          'SELECT * FROM Clientes WHERE Cidade == "Recife";',
          'SELECT Recife FROM Clientes;'
        ],
        correta: 0,
        dicas: [
          'Texto sempre vai entre aspas simples.',
          'Igualdade em SQL é com um sinal de igual só.'
        ],
        explicacao: '`WHERE Cidade = \'Recife\'` é a forma correta: valor de texto entre aspas simples e igualdade com `=`.',
        conceitos: ['sql.texto-aspas', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql03-a5',
        tipo: 'find-error',
        enunciado: 'Esta consulta falha no banco. O que está faltando?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT *\nProdutos\nWHERE Id = 10;' }
        ],
        opcoes: [
          'A palavra FROM antes de Produtos',
          'Aspas em torno do número 10',
          'O FROM deveria vir depois do WHERE',
          'O ponto e vírgula no final'
        ],
        correta: 0,
        dicas: [
          'Compare com consultas que funcionaram: o que vinha logo depois de SELECT *?',
          'A tabela precisa ser precedida por uma palavra-chave.'
        ],
        explicacao: 'A estrutura é `SELECT colunas FROM tabela`. Sem o `FROM`, o banco não sabe de onde buscar os dados.',
        conceitos: ['sql.from', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql03-a6',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso.',
        afirmacoes: [
          { texto: 'Texto em uma condição SQL vai entre aspas simples.', correta: true },
          { texto: 'O operador <> significa "diferente de".', correta: true },
          { texto: 'Preco >= 100 inclui produtos que custam exatamente 100.', correta: true }
        ],
        dicas: [
          '>= significa maior OU igual.',
          'A negação de igual em SQL é <>.'
        ],
        explicacao: 'Esses três detalhes aparecem em todo código SQL que você vai ler. Vale fixar: aspas simples, `<>` para diferente e `>=` incluindo o valor.',
        conceitos: ['sql.texto-aspas', 'sql.operadores']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Diferente e nulos',
      blocos: [
        { tipo: 'texto', texto: 'Para excluir um valor específico do resultado, use `<>`:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT *\nFROM Pedidos\nWHERE Status <> \'Pago\';',
          legenda: 'Retorna os pedidos que ainda não foram pagos.'
        },
        { tipo: 'futuro', conceitos: [], texto: 'Valores vazios (NULL) serão vistos depois.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql03-a7',
        tipo: 'write-code',
        enunciado: 'Escreva uma consulta que retorne **todos os produtos com estoque menor que 10**.',
        respostasAceitas: ['select * from produtos where estoque < 10'],
        dicas: [
          'A tabela é Produtos; a coluna é Estoque.',
          'Estrutura: SELECT * FROM Produtos WHERE Estoque < 10;'
        ],
        explicacao: '`SELECT * FROM Produtos WHERE Estoque < 10;` — o banco filtra as linhas e devolve só as que satisfazem a condição.',
        conceitos: ['sql.where', 'sql.operadores']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql03-a8',
        tipo: 'predict-output',
        enunciado: 'O que esta consulta retorna?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Clientes',
            colunas: ['Id', 'Nome', 'Cidade', 'Ativo'],
            linhas: [
              [1, 'Ana Souza', 'Curitiba', 1],
              [2, 'Bruno Lima', 'Recife', 1],
              [3, 'Carla Dias', 'São Paulo', 0]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Nome, Cidade\nFROM Clientes\nWHERE Cidade = \'Recife\';' }
        ],
        opcoes: [
          'Bruno Lima, Recife',
          'Ana Souza, Curitiba',
          'Todos os clientes',
          'Nenhum registro'
        ],
        correta: 0,
        dicas: [
          'Procure na coluna Cidade quem tem exatamente "Recife".',
          'O filtro é por igualdade de texto.'
        ],
        explicacao: 'Só a linha de Bruno atende à condição. O resultado traz apenas as colunas pedidas: Nome e Cidade.',
        conceitos: ['sql.where', 'sql.texto-aspas']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql03-a9',
        tipo: 'write-code',
        enunciado: 'Retrieve all customers from São Paulo.',
        placeholder: 'SELECT ...',
        respostasAceitas: [
          'select * from clientes where cidade = \'sao paulo\'',
          'select * from clientes where cidade = \'são paulo\'',
          "select * from clientes where cidade = 'são paulo'"
        ],
        dicas: [
          'from São Paulo = da cidade de São Paulo.',
          'Use WHERE Cidade = com o texto entre aspas simples.'
        ],
        explicacao: 'Traduzindo: "retrieve all customers from São Paulo" = retorne todos os clientes de São Paulo. Consulta: `SELECT * FROM Clientes WHERE Cidade = \'São Paulo\';`.',
        conceitos: ['sql.where', 'sql.ingles'],
        desafio: true
      }
    }
  ]
});
