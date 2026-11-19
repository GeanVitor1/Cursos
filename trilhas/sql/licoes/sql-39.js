Plataforma.registrarLicao({
  id: 'sql-39',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Otimização de consultas lentas',
  subtitulo: 'Profissional · Etapa 45',
  duracaoMin: 60,
  xp: 30,
  objetivos: [
    'Aplicar o ciclo completo de otimização num caso real',
    'Trocar SELECT * por colunas e funções no WHERE por alternativas',
    'Decidir entre índice novo, reescrita ou paginação'
  ],
  conceitos: ['sql.otimizacao', 'sql.execution-plan', 'sql.indices', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O caso da consulta lenta',
      introduz: ['sql.otimizacao'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.execution-plan', texto: 'Você lê planos e cria índices. Agora vai aplicar o ciclo inteiro num chamado real.' },
        { tipo: 'texto', texto: '**Otimizar** é tirar uma consulta do vermelho com método: medir, achar o gargalo, agir, medir de novo:' },
        { tipo: 'conceito', id: 'sql.otimizacao', titulo: 'Otimização', texto: 'O ciclo de melhorar consultas lentas: plano, índice ou reescrita, e nova medição.', exemplo: 'SELECT Nome em vez de SELECT *; índice na coluna do WHERE.' },
        { tipo: 'texto', texto: 'O chamado: "a busca de clientes por cidade demora 8 segundos". O plano mostra Table Scan em Clientes com 2 milhões de linhas.' },
        { tipo: 'nota', tom: 'info', texto: 'Primeiro passo de todo caso: reproduzir e medir. Sem número inicial, não há como provar melhora.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql39-a1',
        tipo: 'scenario',
        enunciado: 'A busca por cidade demora 8 segundos com Table Scan. Qual é a primeira ação?',
        cena: 'Clientes tem 2 milhões de linhas e nenhum índice em Cidade. A consulta filtra WHERE Cidade = ...',
        opcoes: [
          'Criar índice em Cidade e medir de novo',
          'Apagar metade dos clientes',
          'Trocar o banco de servidor',
          'Pedir para os usuários esperarem'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Apagar dados não é otimização.',
          2: 'Hardware antes de índice é pular etapas.',
          3: 'Lentidão tem causa tratável.'
        },
        dicas: [
          'Scan com filtro pede índice.',
          'Aja no gargalo do plano.'
        ],
        explicacao: 'Índice na coluna do filtro + nova medição: o ciclo funcionando.',
        conceitos: ['sql.otimizacao', 'sql.indices']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'SELECT * e funções no WHERE',
      blocos: [
        { tipo: 'texto', texto: 'Dois vilões clássicos que o plano não perdoa:' },
        {
          tipo: 'lista',
          itens: [
            '`SELECT *` traz colunas inúteis e impede o banco de responder só pelo índice. Liste as colunas.',
            'Função na coluna do `WHERE` (como `UPPER(Cidade) = ...`) desliga o índice. Prefira comparar direto ou guardar padronizado.'
          ]
        },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'SELECT Nome, Email\nFROM Clientes\nWHERE Cidade = \'Curitiba\';'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'Reescrever a consulta costuma render mais que hardware novo — e custa zero.' },
        { tipo: 'trabalho', texto: 'Em revisão, SELECT * em consulta no banco de verdade e função no WHERE são os dois comentários mais comuns de quem cuida do banco.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql39-a2',
        tipo: 'find-error',
        enunciado: 'Esta consulta lenta foi marcada na revisão. Qual é o problema?',
        contexto: [
          { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT *\nFROM Pedidos\nWHERE YEAR(DataPedido) = 2026;' }
        ],
        opcoes: [
          'SELECT * traz tudo e a função no WHERE desliga o índice da data',
          'Falta o GROUP BY para o banco conseguir agrupar os anos',
          'A função YEAR não existe em SQL e causa erro de sintaxe',
          'Nada, a consulta já está ótima e não precisa de mudança'
        ],
        correta: 0,
        feedbackErro: {
          1: 'GROUP BY não tem a ver com a lentidão.',
          2: 'YEAR existe e funciona.',
          3: 'Dois vilões juntos: asterisco e função no filtro.'
        },
        dicas: [
          'Liste o que a consulta puxa a mais.',
          'Função na coluna filtrada mata o índice.'
        ],
        explicacao: 'Colunas listadas + comparação direta de data: a reescrita que o plano aprovaria.',
        conceitos: ['sql.otimizacao', 'sql.datas'],
        desafio: true
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql39-a4',
        tipo: 'multiple-choice',
        enunciado: 'Qual reescrita de `WHERE YEAR(DataPedido) = 2026` permite ao banco usar um índice em `DataPedido`?',
        opcoes: [
          'WHERE DataPedido >= \'2026-01-01\' AND DataPedido < \'2027-01-01\'',
          'WHERE CAST(DataPedido AS VARCHAR(4)) = \'2026\'',
          'WHERE LEFT(DataPedido, 4) = \'2026\'',
          'WHERE YEAR(DataPedido) + 0 = 2026'
        ],
        correta: 0,
        feedbackErro: {
          1: 'O CAST é uma função aplicada em cada linha: o índice continua desligado.',
          2: 'LEFT também é função na coluna e impede o uso do índice.',
          3: 'Somar zero mantém a função YEAR na coluna: nada muda para o índice.'
        },
        dicas: [
          'Qualquer função aplicada na coluna desliga o índice.',
          'Compare a coluna direto com um intervalo de datas.'
        ],
        explicacao: 'Comparar `DataPedido` direto com um intervalo mantém a coluna sem função e deixa o índice utilizável.',
        conceitos: ['sql.otimizacao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Reescrever o filtro e paginar',
      blocos: [
        { tipo: 'texto', texto: '`YEAR(DataPedido) = 2026` aplica a função em **cada linha** e impede o uso do índice. A reescrita compara a coluna direto, com um intervalo:' },
        { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Id, ValorTotal\nFROM Pedidos\nWHERE DataPedido >= \'2026-01-01\'\n  AND DataPedido < \'2027-01-01\';' },
        { tipo: 'texto', texto: 'Outra defesa é **paginar**: em vez de devolver milhões de linhas, devolva uma página por vez. No SQL Server isso exige `ORDER BY` com `OFFSET` e `FETCH`:' },
        { tipo: 'codigo', linguagem: 'sql', codigo: 'SELECT Id, Nome\nFROM Clientes\nORDER BY Id\nOFFSET 20 ROWS\nFETCH NEXT 10 ROWS ONLY;', legenda: 'Pula as 20 primeiras linhas e devolve as 10 seguintes: a terceira página, com 10 itens por página.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql39-a5',
        tipo: 'write-code',
        enunciado: 'Escreva a consulta (SQL Server) que traz **Id e Nome** dos clientes ordenados por Id, pulando os **20 primeiros** e devolvendo os **10 seguintes** (terceira página).',
        respostasAceitas: [
          'SELECT Id, Nome FROM Clientes ORDER BY Id OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY;',
          'SELECT Id, Nome FROM Clientes ORDER BY Id OFFSET 20 ROWS FETCH FIRST 10 ROWS ONLY;',
          'SELECT Id, Nome FROM Clientes ORDER BY Id OFFSET 20 ROW FETCH NEXT 10 ROWS ONLY;',
          'SELECT Id, Nome FROM Clientes ORDER BY Id LIMIT 10 OFFSET 20;'
        ],
        dicas: [
          'A paginação do SQL Server exige ORDER BY seguido de OFFSET e FETCH.',
          'OFFSET diz quantas linhas pular; FETCH NEXT diz quantas devolver.'
        ],
        explicacao: 'A paginação com OFFSET e FETCH descarta 20 linhas e devolve 10: a terceira página de 10 itens.',
        conceitos: ['sql.otimizacao']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Sem palavra nova',
      blocos: [
        { tipo: 'texto', texto: 'Fechando o ciclo com palavras que você já domina.' },
        { tipo: 'ingles', frase: 'Explain slow queries.', traducao: 'Explique consultas lentas.' },
        { tipo: 'nota', tom: 'info', texto: 'Explicar a lentidão (plano) antes de corrigir: a ordem profissional.' },
        { tipo: 'vida-real', emoji: '🔧', titulo: 'A busca de pedidos do ano ignora o índice de DataPedido', texto: 'A consulta usa `YEAR(DataPedido) = 2025`, e a função no `WHERE` impede o banco de usar o índice. Reescrita como `DataPedido >= \'2025-01-01\' AND DataPedido < \'2026-01-01\'`, a coluna fica livre e o plano passa a usar o índice.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql39-a3',
        tipo: 'multiple-choice',
        enunciado: 'Explain slow queries. O que a frase pede?',
        opcoes: [
          'Explique consultas lentas',
          'Acelere consultas lentas',
          'Apague consultas lentas',
          'Ignore consultas lentas'
        ],
        correta: 0,
        dicas: [
          'explain = explicar.',
          'slow queries = consultas lentas.'
        ],
        explicacao: 'Medir e explicar antes de agir: o ciclo da otimização.',
        conceitos: ['sql.otimizacao', 'sql.ingles']
      }
    }
  ]
});
