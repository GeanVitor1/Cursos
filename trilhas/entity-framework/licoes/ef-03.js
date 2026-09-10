Plataforma.registrarLicao({
  id: 'ef-03',
  trilha: 'entity-framework',
  tipo: 'licao',
  titulo: 'Lendo dados: o LINQ vira SQL',
  subtitulo: 'EF Core · Etapa 3',
  duracaoMin: 45,
  xp: 30,
  objetivos: [
    'Consultar o banco com o LINQ já aprendido',
    'Escolher entre Find, FirstOrDefault e ToList',
    'Reconhecer o SQL que o EF gera para cada consulta'
  ],
  conceitos: ['ef.consultas', 'ef.dbset', 'linq.first', 'linq.where', 'sql.select'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'LINQ no DbSet vira SQL',
      introduz: ['ef.consultas'],
      blocos: [
        { tipo: 'retoma', conceito: 'linq.where', texto: 'Você já sabe filtrar coleções com `Where` e lambda. Agora o mesmo LINQ vai conversar com o banco.' },
        { tipo: 'texto', texto: 'Aqui está a ponte que faltava: o mesmo LINQ que você usou em listas funciona no `DbSet` — mas em vez de percorrer a memória, ele é **traduzido para SQL** e executado no banco.' },
        { tipo: 'conceito', id: 'ef.consultas', titulo: 'Consultas com EF', texto: 'Escrever LINQ no DbSet; o EF traduz para SQL e executa no banco.', exemplo: 'context.Produtos.Where(p => p.Ativo).ToListAsync()' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: 'List<Produto> ativos = await context.Produtos\n    .Where(p => p.Ativo)\n    .ToListAsync();' },
        { tipo: 'diagrama', arte: 'LINQ (C#)                          SQL enviado ao banco\n\ncontext.Produtos                    SELECT Id, Nome, Preco, Estoque, Ativo\n  .Where(p => p.Ativo)      ──────►  FROM Produtos\n  .ToListAsync()                     WHERE Ativo = 1;' },
        { tipo: 'nota', tom: 'info', texto: 'O `ToListAsync` só aparece no EF: ele executa a consulta no banco e materializa o resultado como lista. Em listas comuns usávamos `ToList`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef03-a1',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Conecte cada consulta ao SQL que o EF gera (aproximadamente).',
        pares: [
          ['FindAsync(10)', 'SELECT ... WHERE Id = 10'],
          ['Where(p => p.Ativo).ToListAsync()', 'SELECT ... WHERE Ativo = 1'],
          ['ToListAsync()', 'SELECT ... (todos os registros)'],
          ['FirstOrDefaultAsync(p => p.Nome == "Mouse")', 'SELECT TOP 1 ... WHERE Nome = \'Mouse\'']
        ],
        dicas: ['Find busca pela chave primária.', 'Where vira WHERE; First vira TOP 1.'],
        explicacao: 'A tradução LINQ → SQL é direta. Ler o C# e imaginar o SQL é uma habilidade que acelera o diagnóstico de problemas.',
        conceitos: ['ef.consultas', 'sql.select']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef03-a2',
        tipo: 'predict-output',
        dimensao: 'reconhecimento',
        enunciado: 'Qual SQL o EF envia para o banco?',
        contexto: [
          { tipo: 'codigo', linguagem: 'csharp', codigo: 'var produto = await context.Produtos\n    .FirstOrDefaultAsync(p => p.Id == 10);' }
        ],
        opcoes: [
          'SELECT TOP 1 ... FROM Produtos WHERE Id = 10 (aproximadamente)',
          'SELECT * FROM Produtos (todos)',
          'INSERT INTO Produtos ...',
          'SELECT COUNT(*) FROM Produtos'
        ],
        correta: 0,
        feedbackErro: {
          1: 'FirstOrDefault busca um item específico; o filtro por Id vai para o WHERE.',
          2: 'Não há inserção em uma consulta.',
          3: 'A consulta busca um registro, não a contagem.'
        },
        dicas: ['FirstOrDefaultAsync = um item.', 'A condição da lambda vira o WHERE.'],
        explicacao: 'O filtro `p => p.Id == 10` vira `WHERE Id = 10`, e o "pegar o primeiro" vira `TOP 1` (ou `LIMIT 1`, conforme o banco).',
        conceitos: ['ef.consultas', 'linq.first']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Find, FirstOrDefault ou ToList?',
      blocos: [
        { tipo: 'tabela', titulo: 'Quando usar cada um', colunas: ['Situação', 'Método', 'Por quê'], linhas: [
          ['Buscar por Id', 'FindAsync(id)', 'É a chave primária; o contexto ainda aproveita o que já tem em memória'],
          ['Buscar por outra coluna', 'FirstOrDefaultAsync(regra)', 'Filtro por qualquer propriedade'],
          ['Listar vários', 'Where(...).ToListAsync()', 'Vários itens, com filtro'],
          ['Listar todos', 'ToListAsync()', 'Cuidado: pode trazer uma tabela inteira']
        ], legenda: 'A escolha do método se reflete no SQL gerado — e no custo da consulta.' },
        { tipo: 'nota', tom: 'info', texto: 'Você vai ver `TOP 1` no SQL gerado: em SQL Server, `SELECT TOP 1` significa "traga apenas o primeiro registro". Em outros bancos aparece como `LIMIT 1`. É o "pegar o primeiro" traduzido para SQL.' },
        { tipo: 'codigo', linguagem: 'csharp', codigo: '// Buscar por Id\nProduto? produto = await context.Produtos.FindAsync(10);\n\n// Buscar por outra coluna\nCliente? cliente = await context.Clientes\n    .FirstOrDefaultAsync(c => c.Email == "ana@email.com");' },
        { tipo: 'trabalho', texto: 'Em code review, uma das primeiras verificações é se a consulta busca só o necessário. `ToListAsync()` sem filtro em uma tabela grande é um problema de performance real.', fonte: '💼 Em um code review' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef03-a3',
        tipo: 'fill-code',
        dimensao: 'preenchimento',
        enunciado: 'Complete a busca do cliente pelo e-mail.',
        codigo: 'Cliente? cliente = await context.Clientes\n    .{{1}}(c => c.Email == "ana@email.com");',
        lacunas: [['firstordefaultasync', 'FirstOrDefaultAsync']],
        dicas: ['Busca o primeiro ou devolve null, de forma assíncrona.', 'É o mesmo FirstOrDefault do LINQ com o sufixo Async.'],
        explicacao: '`FirstOrDefaultAsync` combina o método seguro do LINQ com a execução assíncrona no banco.',
        conceitos: ['ef.consultas', 'linq.first', 'csharp.async']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef03-a4',
        tipo: 'write-code',
        dimensao: 'construcao',
        enunciado: 'Escreva uma consulta assíncrona que devolva todos os produtos ativos do banco.',
        esqueleto: 'List<Produto> ativos = // complete',
        validar: function (valor) {
          const t = P.dom.normalizarCodigo(valor).replace(/ /g, '');
          return t.indexOf('context.produtos') !== -1 && t.indexOf('.where(') !== -1 && t.indexOf('.tolistasync()') !== -1 && t.indexOf('await') !== -1;
        },
        respostasAceitas: ['await context.Produtos.Where(p => p.Ativo).ToListAsync();'],
        dicas: ['Comece por `context.Produtos`.', 'Filtre com Where e materialize com `await ...ToListAsync()`.'],
        explicacao: 'Essa linha gera `SELECT ... FROM Produtos WHERE Ativo = 1` — o LINQ de memória e o SQL agora são a mesma ideia.',
        conceitos: ['ef.consultas', 'linq.where'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ef03-a5',
        tipo: 'code-review',
        dimensao: 'aplicacao',
        enunciado: 'A busca por produto em "/produtos/10" está lenta e às vezes devolve erro quando o produto não existe. Avalie a alteração.',
        ticket: { numero: '#5602', titulo: 'Busca de produto lenta e instável', corpo: 'A listagem por Id demora em tabelas grandes e retorna erro 500 quando o Id não existe.' },
        autor: 'colega de time',
        diff: [
          '+ public async Task<Produto> BuscarAsync(int id)',
          '+ {',
          '+     var produtos = await context.Produtos.ToListAsync();',
          '+     return produtos.First(p => p.Id == id);',
          '+ }'
        ],
        opcoes: [
          'A consulta traz a tabela inteira para a memória e depois filtra; o correto é filtrar no banco com FirstOrDefaultAsync',
          'O método deveria ser síncrono',
          'Falta converter o id para texto',
          'O retorno deveria ser uma lista'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Assincronismo não é o problema; o problema é onde o filtro acontece.',
          2: 'Id é int na entidade; converter pioraria.',
          3: 'A busca por Id devolve um produto, não uma lista.'
        },
        dicas: ['Observe a ordem: ToListAsync antes do filtro.', 'Filtre no banco, não na memória.'],
        explicacao: '`ToListAsync()` sem filtro carrega tudo; o `First` depois roda em memória e lança exceção se não achar. A correção: `context.Produtos.FirstOrDefaultAsync(p => p.Id == id)` — SQL com WHERE e sem exceção no caso vazio.',
        conceitos: ['ef.consultas', 'linq.first'],
        desafio: true
      }
    }
  ]
});
