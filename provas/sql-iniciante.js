Plataforma.registrarLicao({
  id: 'sql-checkpoint-iniciante',
  trilha: 'sql',
  tipo: 'prova',
  titulo: 'Checkpoint — SQL Iniciante',
  subtitulo: 'Prova de nível · SQL Iniciante',
  duracaoMin: 40,
  xp: 100,
  objetivos: [
    'Ordenar resultados com ORDER BY, ASC e DESC',
    'Remover duplicados e limitar a quantidade de linhas',
    'Lidar com valores nulos e buscar textos com LIKE',
    'Alterar dados com UPDATE, INSERT e DELETE com segurança'
  ],
  conceitos: ['sql.order-by', 'sql.distinct', 'sql.limite', 'sql.null', 'sql.like', 'sql.update', 'sql.insert', 'sql.delete', 'sql.where', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova de nível: SQL Iniciante',
      blocos: [
        { tipo: 'texto', texto: 'São **10 atividades** cobrindo ordenação, duplicados, limites, nulos, padrões de texto e alteração de dados. Não há nota de bloqueio: o resultado mostra o que já está dominado e o que deve voltar na revisão.' },
        {
          tipo: 'lista',
          itens: [
            'Leia cada cenário como se fosse um chamado real.',
            'Pode usar dicas — o resultado continua contando.',
            'Ao final, você verá seu domínio conceito por conceito.'
          ]
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i1',
        tipo: 'multiple-choice',
        enunciado: 'Qual consulta retorna os produtos **do mais caro para o mais barato**?',
        opcoes: [
          'SELECT Nome, Preco FROM Produtos ORDER BY Preco DESC;',
          'SELECT Nome, Preco FROM Produtos ORDER BY Preco;',
          'SELECT Nome, Preco FROM Produtos WHERE Preco DESC;',
          'SELECT Nome, Preco FROM Produtos ORDER BY Preco ASC;'
        ],
        correta: 0,
        dicas: [
          'Decrescente = do maior para o menor.',
          'Sem indicação, a ordem é crescente.'
        ],
        explicacao: '`ORDER BY Preco DESC` coloca o maior preço primeiro. Sem `DESC`, a ordem é crescente; o `WHERE` não recebe direção.',
        conceitos: ['sql.order-by']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i2',
        tipo: 'predict-output',
        enunciado: 'Quantas linhas esta consulta retorna?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Clientes',
            colunas: ['Nome', 'Cidade'],
            linhas: [
              ['Ana Souza', 'Curitiba'],
              ['Bruno Lima', 'Curitiba'],
              ['Carla Dias', 'Recife'],
              ['Diego Alves', 'Recife']
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT DISTINCT Cidade\nFROM Clientes;' }
        ],
        opcoes: [
          '2 linhas: Curitiba e Recife',
          '4 linhas, uma por cliente',
          '1 linha, apenas Curitiba',
          '3 linhas: Curitiba, Recife e Curitiba'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O DISTINCT remove as repetições de cidade.',
          2: 'Recife também tem clientes.',
          3: 'Valores iguais não se repetem no resultado.'
        },
        dicas: [
          'Conte as cidades diferentes.',
          'Curitiba aparece duas vezes na tabela.'
        ],
        explicacao: 'Existem duas cidades diferentes: Curitiba e Recife. O `DISTINCT` devolve cada uma uma única vez.',
        conceitos: ['sql.distinct']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i3',
        tipo: 'fill-code',
        enunciado: 'Complete para listar os **3 produtos mais caros**.',
        codigo: 'SELECT {{1}} 3 Nome, Preco\nFROM Produtos\nORDER BY Preco DESC;',
        lacunas: [['top', 'limit']],
        dicas: [
          'No SQL Server a quantidade vem entre SELECT e as colunas.',
          'São três letras.'
        ],
        explicacao: '`SELECT TOP 3 ... ORDER BY Preco DESC` limita o resultado depois de ordenar pelo maior preço.',
        conceitos: ['sql.limite', 'sql.order-by']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i4',
        tipo: 'multiple-choice',
        enunciado: 'O time quer a lista de clientes **sem telefone** cadastrado. Qual consulta atende?',
        opcoes: [
          'SELECT * FROM Clientes WHERE Telefone IS NULL;',
          'SELECT * FROM Clientes WHERE Telefone = NULL;',
          'SELECT * FROM Clientes WHERE Telefone LIKE NULL;',
          'SELECT * FROM Clientes WHERE Telefone = 0;'
        ],
        correta: 0,
        dicas: [
          'NULL não se compara com =.',
          'Existe uma forma específica de verificar nulos.'
        ],
        explicacao: '`IS NULL` é a forma correta de verificar ausência de valor. `= NULL` e `LIKE NULL` nunca retornam linhas.',
        conceitos: ['sql.null']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i5',
        tipo: 'fill-code',
        enunciado: 'Complete para exibir **Sem telefone** quando o telefone for nulo.',
        codigo: "SELECT Nome, {{1}}(Telefone, 'Sem telefone')\nFROM Clientes;",
        lacunas: [['coalesce']],
        dicas: [
          'A função devolve o primeiro valor não nulo.',
          'Tem oito letras.'
        ],
        explicacao: '`COALESCE(Telefone, \'Sem telefone\')` troca o nulo pelo texto na exibição, sem alterar o dado guardado.',
        conceitos: ['sql.null', 'sql.texto-aspas']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i6',
        tipo: 'multiple-choice',
        enunciado: 'O suporte quer os clientes cujo **nome começa com "Ana"**. Qual padrão usar?',
        opcoes: [
          "WHERE Nome LIKE 'Ana%'",
          "WHERE Nome LIKE '%Ana%'",
          "WHERE Nome = 'Ana%'",
          "WHERE Nome LIKE '%Ana'"
        ],
        correta: 0,
        feedbackErro: {
          1: 'Com % na frente, qualquer texto poderia vir antes de "Ana".',
          2: 'O = compara o texto exato, sem coringa.',
          3: 'Com % no final, o nome precisaria terminar com "Ana".'
        },
        dicas: [
          'Começa com = % no final do padrão.',
          'A comparação por padrão é o LIKE.'
        ],
        explicacao: '`LIKE \'Ana%\'` libera qualquer texto **depois** de Ana. O `%` no início liberaria qualquer coisa antes.',
        conceitos: ['sql.like', 'sql.texto-aspas']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i7',
        tipo: 'find-error',
        enunciado: 'A consulta abaixo foi recusada na revisão. Por quê?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'UPDATE Produtos\nSET Estoque = 0;' }
        ],
        opcoes: [
          'Falta o WHERE: o estoque de todos os produtos seria zerado',
          'O SET deveria vir antes do UPDATE',
          'Estoque = 0 precisa de aspas simples',
          'Falta o TOP antes do UPDATE'
        ],
        correta: 0,
        feedbackErro: {
          1: 'A ordem correta é UPDATE ... SET ... WHERE.',
          2: 'Estoque é número: zero entra sem aspas.',
          3: 'TOP limita resultados de leitura; não é usado no UPDATE.'
        },
        dicas: [
          'Compare com o UPDATE seguro.',
          'O que falta para atingir só um produto?'
        ],
        explicacao: 'Sem `WHERE`, o `UPDATE` altera a tabela inteira. Filtrar pela chave primária é o que limita o estrago a uma linha.',
        conceitos: ['sql.update', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i8',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que insere um produto com **nome "Webcam"** e **preço 150**.',
        respostasAceitas: [
          "insert into produtos (nome, preco) values ('webcam', 150)",
          "insert into produtos (preco, nome) values (150, 'webcam')"
        ],
        dicas: [
          'Colunas entre parênteses, valores entre parênteses, mesma ordem.',
          'Webcam é texto; 150 é número.'
        ],
        explicacao: '`INSERT INTO Produtos (Nome, Preco) VALUES (\'Webcam\', 150);` — a nova linha entra no fim da tabela.',
        conceitos: ['sql.insert', 'sql.texto-aspas']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i9',
        tipo: 'true-false',
        enunciado: 'Marque verdadeiro ou falso sobre alterar dados.',
        afirmacoes: [
          { texto: 'DELETE FROM Clientes; sem WHERE apaga todos os clientes.', correta: true, explicacao: 'Sem filtro, o comando atinge a tabela inteira.' },
          { texto: 'O caminho seguro antes de um UPDATE é rodar um SELECT com o mesmo WHERE.', correta: true, explicacao: 'Conferir as linhas antes evita alterar mais do que o esperado.' },
          { texto: 'INSERT INTO Clientes VALUES (\'Ana\'); funciona mesmo sem informar as colunas.', correta: true, explicacao: 'Funciona quando os valores estão na ordem exata de todas as colunas — mas informar as colunas é mais seguro e legível.' }
        ],
        dicas: [
          'Sem WHERE não existe filtro.',
          'Conferir antes é hábito profissional.'
        ],
        explicacao: 'Alterar dados exige filtro e conferência: o mesmo `WHERE` do `SELECT` vale para o `UPDATE` e para o `DELETE`.',
        conceitos: ['sql.delete', 'sql.insert', 'sql.update', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-i10',
        tipo: 'scenario',
        ingles: { frase: 'Retrieve the first 10 customers by name.' },
        cena: 'O time de marketing pediu uma amostra: os 10 primeiros clientes, em ordem alfabética, para uma conferência rápida de cadastro.',
        enunciado: 'Qual consulta atende ao pedido em inglês?',
        opcoes: [
          'SELECT TOP 10 * FROM Clientes ORDER BY Nome ASC;',
          'SELECT * FROM Clientes ORDER BY Nome ASC;',
          'SELECT TOP 10 * FROM Clientes;',
          'SELECT * FROM Clientes WHERE Nome LIKE \'10%\';'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Falta o limite de 10 linhas.',
          2: 'Falta a ordenação por nome.',
          3: 'O LIKE procura texto "10", não quantidade de linhas.'
        },
        dicas: [
          'first 10 = primeiras 10 linhas.',
          'sorted by name = ordenados por nome.'
        ],
        explicacao: '"Retrieve the first 10 customers by name" = recupere os 10 primeiros clientes por nome. `TOP 10` com `ORDER BY Nome ASC`.',
        conceitos: ['sql.limite', 'sql.order-by', 'sql.ingles'],
        desafio: true
      }
    }
  ]
});
