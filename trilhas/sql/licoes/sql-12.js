Plataforma.registrarLicao({
  id: 'sql-12',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'INSERT e DELETE com segurança',
  subtitulo: 'Iniciante · Etapa 7',
  duracaoMin: 50,
  xp: 30,
  objetivos: [
    'Inserir registros com INSERT INTO e VALUES',
    'Remover registros com DELETE e WHERE',
    'Reconhecer os riscos de alterar dados sem filtro'
  ],
  conceitos: ['sql.insert', 'sql.delete', 'sql.where', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Adicionando registros',
      introduz: ['sql.insert'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.update', texto: 'Você já altera valores com `UPDATE ... SET ... WHERE`. Agora vai criar e remover registros.' },
        { tipo: 'texto', texto: 'O `INSERT INTO` (insira em) adiciona uma nova linha. Ele informa a tabela, a lista de colunas e a lista de valores:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: "INSERT INTO Clientes (Nome, Cidade, Ativo)\nVALUES ('Ana Souza', 'Curitiba', 1);",
          legenda: 'Um novo cliente, com os três valores na mesma ordem das colunas.'
        },
        { tipo: 'conceito', id: 'sql.insert', titulo: 'INSERT INTO', texto: 'Adiciona novos registros, informando as colunas e os valores na mesma ordem.', exemplo: "INSERT INTO Clientes (Nome, Cidade) VALUES ('Ana', 'Recife');" },
        { tipo: 'nota', tom: 'info', texto: 'As duas listas precisam ter a **mesma quantidade** e a **mesma ordem**: o primeiro valor vai para a primeira coluna, e assim por diante.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql12-a1',
        tipo: 'fill-code',
        enunciado: 'Complete para inserir um novo produto.',
        codigo: "INSERT {{1}} Produtos (Nome, Preco)\nVALUES ('Mouse', 100);",
        lacunas: [['into']],
        dicas: [
          'O comando é INSERT INTO.',
          'São quatro letras.'
        ],
        explicacao: '`INSERT INTO Produtos (Nome, Preco) VALUES (\'Mouse\', 100);` cria a linha com dois valores.',
        conceitos: ['sql.insert']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql12-a2',
        tipo: 'multiple-choice',
        enunciado: 'Qual INSERT está **correto** para criar um cliente ativo de Recife?',
        opcoes: [
          'INSERT INTO Clientes (Nome, Cidade, Ativo) VALUES (\'Ana\', \'Recife\', 1);',
          'INSERT Clientes VALUES (Nome, Cidade);',
          'UPDATE Clientes SET Nome = \'Ana\';',
          'INSERT INTO Clientes VALUES \'Ana\' AND \'Recife\';'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Falta o INTO e faltam os valores reais: colunas não vão no VALUES.',
          2: 'UPDATE altera linhas existentes; não cria registro novo.',
          3: 'O VALUES recebe a lista entre parênteses, ordenada como as colunas.'
        },
        dicas: [
          'Colunas e valores ficam entre parênteses, na mesma ordem.',
          'Texto entre aspas simples, número direto.'
        ],
        explicacao: '`INSERT INTO Clientes (Nome, Cidade, Ativo) VALUES (\'Ana\', \'Recife\', 1);` — três colunas, três valores, ordem respeitada.',
        conceitos: ['sql.insert']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql12-a3',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que insere um produto com **nome "Teclado"** e **preço 200**.',
        respostasAceitas: [
          "insert into produtos (nome, preco) values ('teclado', 200)",
          "insert into produtos (preco, nome) values (200, 'teclado')"
        ],
        dicas: [
          'Informe as colunas na ordem que você declarar.',
          'Teclado é texto: aspas simples. 200 é número.'
        ],
        explicacao: '`INSERT INTO Produtos (Nome, Preco) VALUES (\'Teclado\', 200);` — a ordem das colunas acompanha a ordem dos valores.',
        conceitos: ['sql.insert', 'sql.texto-aspas']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Removendo registros',
      introduz: ['sql.delete'],
      blocos: [
        { tipo: 'texto', texto: 'O `DELETE` (exclua) remove linhas. Como no `UPDATE`, o `WHERE` decide **quais**:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'DELETE FROM Clientes\nWHERE Id = 10;',
          legenda: 'Remove apenas o cliente de Id 10.'
        },
        { tipo: 'conceito', id: 'sql.delete', titulo: 'DELETE', texto: 'Remove registros. O WHERE escolhe as linhas; sem WHERE, apaga todas.', exemplo: 'DELETE FROM Clientes WHERE Id = 10;' },
        { tipo: 'nota', tom: 'atencao', texto: '`DELETE FROM Clientes;` sem `WHERE` esvazia a tabela inteira. Confira sempre com um `SELECT` antes — e lembre que a operação **não tem Ctrl+Z**.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql12-a4',
        tipo: 'find-error',
        enunciado: 'Esta consulta foi bloqueada na revisão de código. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'DELETE FROM Clientes;' }
        ],
        opcoes: [
          'Falta o WHERE: todos os clientes seriam excluídos',
          'O DELETE deveria ser DELETE *',
          'Faltam aspas em Clientes',
          'Nada — a consulta está correta'
        ],
        correta: 0,
        feedbackErro: {
          1: 'DELETE já pressupõe todas as colunas; o asterisco não entra aqui.',
          2: 'Clientes é nome de tabela, não texto: não leva aspas.',
          3: 'Sem WHERE, a tabela inteira é apagada.'
        },
        dicas: [
          'Pense no comando sem filtro.',
          'Quem escolhe as linhas é o WHERE.'
        ],
        explicacao: 'Sem `WHERE`, o `DELETE` apaga todas as linhas. No banco de verdade, esse comando sem filtro é um incidente.',
        conceitos: ['sql.delete', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql12-a5',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta que remove o produto de **Id 4**.',
        respostasAceitas: [
          'delete from produtos where id = 4'
        ],
        dicas: [
          'DELETE FROM tabela WHERE condição.',
          'Filtre pela chave primária.'
        ],
        explicacao: '`DELETE FROM Produtos WHERE Id = 4;` — uma única linha, identificada pela chave primária.',
        conceitos: ['sql.delete', 'sql.where']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql12-a6',
        tipo: 'scenario',
        enunciado: 'Um cliente pediu a exclusão da conta dele. Qual é a primeira coisa a verificar?',
        cena: 'A tabela Pedidos guarda ClienteId como chave estrangeira apontando para Clientes. Apagar o cliente pode deixar pedidos órfãos.',
        opcoes: [
          'Se existem pedidos vinculados ao cliente antes de apagar o cadastro',
          'Se o cliente tem e-mail cadastrado',
          'Quantas colunas a tabela Clientes possui',
          'Se existe outro cliente com o mesmo nome'
        ],
        correta: 0,
        feedbackErro: {
          1: 'E-mail não impede a exclusão; o vínculo com pedidos, sim.',
          2: 'O número de colunas não muda o risco do vínculo.',
          3: 'Nome repetido é possível; o que importa aqui é o vínculo por chave estrangeira.'
        },
        dicas: [
          'Pense no que aponta para Clientes.',
          'Excluir o pai sem tratar os filhos quebra a integridade.'
        ],
        explicacao: 'Antes de apagar um cadastro, verifique os registros que apontam para ele. Se existirem pedidos, a exclusão precisa ser tratada — ou o banco vai bloquear por causa da chave estrangeira.',
        conceitos: ['sql.delete', 'sql.chave-estrangeira'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql12-a7',
        tipo: 'match-pairs',
        enunciado: 'Conecte cada comando à sua ação no CRUD.',
        pares: [
          ['SELECT', 'Consulta dados'],
          ['INSERT', 'Cria registros'],
          ['UPDATE', 'Altera registros'],
          ['DELETE', 'Remove registros']
        ],
        dicas: [
          'Read = ler = SELECT.',
          'Create = criar = INSERT.'
        ],
        explicacao: 'O quarteto do CRUD: Create (INSERT), Read (SELECT), Update (UPDATE) e Delete (DELETE).',
        conceitos: ['sql.insert', 'sql.delete', 'sql.update', 'sql.comandos-sql']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Delete',
      blocos: [
        { tipo: 'texto', texto: 'O verbo **delete** (excluir) você já usa no SQL. Repare como ele aparece em um pedido de trabalho:' },
        { tipo: 'ingles', frase: 'Delete the customer with Id 10.', traducao: 'Exclua o cliente de Id 10.' },
        { tipo: 'nota', tom: 'info', texto: '**Delete the customer with Id 10** = "exclua o cliente de Id 10" — a frase inteira vira `DELETE FROM Clientes WHERE Id = 10;`.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql12-a8',
        tipo: 'write-code',
        enunciado: 'Delete the customer with Id 10.',
        placeholder: 'DELETE ...',
        respostasAceitas: [
          'delete from clientes where id = 10'
        ],
        dicas: [
          'delete = exclua; customer = cliente.',
          'Filtre pelo Id com WHERE.'
        ],
        explicacao: 'Traduzindo: "delete the customer with Id 10" = exclua o cliente de Id 10. `DELETE FROM Clientes WHERE Id = 10;`.',
        conceitos: ['sql.delete', 'sql.ingles']
      }
    }
  ]
});
