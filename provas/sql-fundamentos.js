Plataforma.registrarLicao({
  id: 'sql-checkpoint-fundamentos',
  trilha: 'sql',
  tipo: 'prova',
  titulo: 'Checkpoint — SQL Fundamentos',
  subtitulo: 'Prova de nível · SQL Fundamentos',
  duracaoMin: 40,
  xp: 100,
  objetivos: [
    'Consolidar banco, tabelas, chaves e relacionamentos',
    'Consultar com SELECT, colunas e FROM',
    'Filtrar com WHERE, operadores, AND, OR, IN e BETWEEN'
  ],
  conceitos: ['sql.banco', 'sql.tabela', 'sql.chave-primaria', 'sql.chave-estrangeira', 'sql.select', 'sql.from', 'sql.where', 'sql.and-or', 'sql.parenteses', 'sql.in', 'sql.between', 'sql.not', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Prova de nível: SQL Fundamentos',
      blocos: [
        { tipo: 'texto', texto: 'São **10 atividades** cobrindo tudo o que você estudou até aqui. Não há nota de bloqueio: o resultado mostra o que já está dominado e o que deve voltar na revisão.' },
        {
          tipo: 'lista',
          itens: [
            'Leia cada cenário com calma, como se fosse um ticket real.',
            'Pode usar dicas — o resultado continua contando.',
            'Ao final, você verá seu domínio conceito por conceito.'
          ]
        }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-a1',
        tipo: 'multiple-choice',
        enunciado: 'Uma aplicação precisa guardar clientes, produtos e pedidos de forma organizada. Qual sequência representa corretamente a hierarquia?',
        opcoes: [
          'Servidor → banco de dados → tabelas → registros',
          'Tabela → banco de dados → servidor → registros',
          'Registro → servidor → tabela → banco de dados',
          'Banco de dados → servidor → registros → tabelas'
        ],
        correta: 0,
        dicas: [
          'Comece pela máquina que hospeda tudo.',
          'Dentro do banco ficam as tabelas; dentro delas, os registros.'
        ],
        explicacao: 'O servidor hospeda o banco; o banco contém tabelas; cada tabela guarda registros.',
        conceitos: ['sql.banco', 'sql.servidor', 'sql.tabela']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-a2',
        tipo: 'true-false',
        enunciado: 'Avalie as afirmações sobre integridade.',
        afirmacoes: [
          { texto: 'Uma chave primária pode se repetir em registros diferentes.', correta: false },
          { texto: 'Uma chave estrangeira aponta para a chave primária de outra tabela.', correta: true },
          { texto: 'Um cliente pode ter vários pedidos — relacionamento um-para-muitos.', correta: true }
        ],
        dicas: [
          'Chave primária identifica de forma única.',
          'No relacionamento 1:N, o N fica na tabela que aponta.'
        ],
        explicacao: 'Esses três conceitos são a base da modelagem. Se algum falhou, volte à Etapa 1.',
        conceitos: ['sql.chave-primaria', 'sql.chave-estrangeira', 'sql.relacionamento']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-a3',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada comando SQL à sua ação.',
        pares: [
          ['SELECT', 'Consultar'],
          ['DELETE', 'Excluir'],
          ['UPDATE', 'Alterar'],
          ['INSERT', 'Inserir']
        ],
        dicas: [
          'UPDATE vem de atualizar.',
          'INSERT lembra inserir.'
        ],
        explicacao: 'O quarteto do CRUD. Em APIs, ele se conecta a GET, POST, PUT/PATCH e DELETE.',
        conceitos: ['sql.comandos-sql']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-a4',
        tipo: 'order-blocks',
        enunciado: 'Ordene os blocos para montar uma consulta que retorna nome e preço de todos os produtos.',
        blocos: ['SELECT', 'Nome, Preco', 'FROM', 'Produtos;'],
        dicas: [
          'O verbo vem primeiro.',
          'A tabela vem depois do FROM.'
        ],
        explicacao: 'SELECT colunas FROM tabela — a base de tudo.',
        conceitos: ['sql.select', 'sql.from']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-a5',
        tipo: 'fill-code',
        enunciado: 'Complete para retornar os produtos com estoque **menor** que 10.',
        codigo: 'SELECT Nome, Estoque\nFROM Produtos\nWHERE Estoque {{1}} 10;',
        lacunas: [['<']],
        dicas: [
          'Menor em SQL é um único caractere.',
          'Se fosse menor ou igual, seriam dois caracteres.'
        ],
        explicacao: '`<` é estritamente menor. `Estoque < 10` deixa de fora exatamente 10 unidades.',
        conceitos: ['sql.where', 'sql.operadores']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-a6',
        tipo: 'find-error',
        enunciado: 'O suporte reportou um erro nesta consulta. O que está faltando?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT *\nProdutos\nWHERE Preco > 100;' }
        ],
        opcoes: [
          'A palavra FROM antes de Produtos',
          'Aspas simples em torno de 100',
          'A palavra ORDER antes de WHERE',
          'Nada — a consulta está correta'
        ],
        correta: 0,
        dicas: [
          'Compare com a estrutura básica: SELECT colunas FROM tabela WHERE condição.',
          'Falta a palavra-chave que conecta SELECT à tabela.'
        ],
        explicacao: 'Sem FROM o banco não sabe de onde buscar. Estrutura completa: `SELECT * FROM Produtos WHERE Preco > 100;`.',
        conceitos: ['sql.from', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-a7',
        tipo: 'predict-output',
        enunciado: 'Quais pedidos esta consulta retorna?',
        contexto: [
          {
            tipo: 'tabela',
            titulo: 'Pedidos',
            colunas: ['Id', 'Status', 'ValorTotal'],
            linhas: [
              [101, 'Pago', 250.0],
              [102, 'Pendente', 430.5],
              [103, 'Enviado', 780.0],
              [104, 'Cancelado', 120.0]
            ]
          },
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Id, ValorTotal\nFROM Pedidos\nWHERE (Status = \'Pendente\' OR Status = \'Enviado\')\n  AND ValorTotal > 500;' }
        ],
        opcoes: [
          'Apenas o pedido 103',
          'Pedidos 102 e 103',
          'Pedidos 101, 102 e 103',
          'Nenhum pedido'
        ],
        correta: 0,
        dicas: [
          'O OR entre parênteses precisa ser verdadeiro E o valor precisa passar de 500.',
          'O pedido 102 é Pendente, mas custa 430.5 — passa no valor?'
        ],
        explicacao: '102 é pendente porém abaixo de 500. 103 é enviado e vale 780. Só o 103 atende ao grupo inteiro de condições.',
        conceitos: ['sql.and-or', 'sql.parenteses']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-a8',
        tipo: 'multiple-choice',
        ingles: { frase: 'Retrieve the name of all active customers.' },
        enunciado: 'Qual consulta atende ao pedido em inglês?',
        opcoes: [
          'SELECT Nome FROM Clientes WHERE Ativo = 1;',
          'SELECT Nome FROM Clientes;',
          'SELECT Ativo FROM Clientes WHERE Nome = 1;',
          'SELECT * FROM Clientes WHERE Nome = \'Ativo\';'
        ],
        correta: 0,
        dicas: [
          'active customers = clientes ativos.',
          'Retrieve the name = retorne o nome.'
        ],
        explicacao: '"Retrieve the name of all active customers" = retorne o nome de todos os clientes ativos. Consulta: `SELECT Nome FROM Clientes WHERE Ativo = 1;`.',
        conceitos: ['sql.select', 'sql.where', 'sql.ingles']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-a9',
        tipo: 'write-code',
        enunciado: 'Escreva uma consulta que retorne **nome e e-mail dos clientes de Curitiba**.',
        respostasAceitas: [
          'select nome, email from clientes where cidade = \'curitiba\''
        ],
        dicas: [
          'Liste as colunas pedidas depois do SELECT.',
          'Filtre por Cidade com texto entre aspas simples.'
        ],
        explicacao: '`SELECT Nome, Email FROM Clientes WHERE Cidade = \'Curitiba\';` — colunas específicas e filtro de texto.',
        conceitos: ['sql.select', 'sql.where', 'sql.texto-aspas']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'cp-a10',
        tipo: 'scenario',
        cena: 'Ticket #183: o cliente de Id 183 não consegue visualizar os pedidos dele no aplicativo. O suporte já confirmou que o cliente existe e que o cadastro está ativo. A tabela Pedidos guarda ClienteId como chave estrangeira.',
        enunciado: 'Qual seria sua primeira consulta para investigar?',
        opcoes: [
          'SELECT * FROM Pedidos WHERE ClienteId = 183;',
          'SELECT * FROM Clientes;',
          'DELETE FROM Pedidos WHERE ClienteId = 183;',
          'UPDATE Clientes SET Ativo = 1;'
        ],
        correta: 0,
        dicas: [
          'Investigar é consultar dados, nunca alterar antes de entender.',
          'Você quer saber se existem pedidos vinculados ao cliente 183.'
        ],
        explicacao: 'O primeiro passo de qualquer investigação é consultar: existem pedidos para o ClienteId 183? Se não existirem, o problema está na gravação. Se existirem, o problema está na consulta exibida pelo app. Nunca comece por DELETE ou UPDATE.',
        conceitos: ['sql.where', 'sql.chave-estrangeira'],
        desafio: true
      }
    }
  ]
});
