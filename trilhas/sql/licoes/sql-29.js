Plataforma.registrarLicao({
  id: 'sql-29',
  trilha: 'sql',
  tipo: 'licao',
  titulo: 'Índices: o que são e quando usar',
  subtitulo: 'Avançado · Etapa 35',
  duracaoMin: 50,
  xp: 30,
  objetivos: [
    'Entender índices como atalho de busca',
    'Criar índices com CREATE INDEX',
    'Reconhecer quando um índice ajuda ou atrapalha'
  ],
  conceitos: ['sql.indices', 'sql.where', 'sql.ingles'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O sumário do banco',
      introduz: ['sql.indices'],
      blocos: [
        { tipo: 'retoma', conceito: 'sql.where', texto: 'Todo `WHERE` que você escreveu varreu linhas. Em tabelas pequenas isso é instantâneo; em milhões de linhas, não.' },
        { tipo: 'texto', texto: 'Um **índice** funciona como o sumário de um livro: uma estrutura extra que leva direto às linhas, sem varrer tudo:' },
        { tipo: 'conceito', id: 'sql.indices', titulo: 'Índice', texto: 'Estrutura auxiliar que acelera buscas por uma coluna, ao custo de escrita mais lenta e espaço extra.', exemplo: 'CREATE INDEX idx_clientes_cidade ON Clientes (Cidade);' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'CREATE INDEX idx_clientes_cidade\nON Clientes (Cidade);'
        },
        { tipo: 'nota', tom: 'info', texto: 'O nome do índice (`idx_clientes_cidade`) é convenção: prefixo idx + tabela + coluna. O banco cria e mantém a estrutura sozinho.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql29-a1',
        tipo: 'multiple-choice',
        enunciado: 'O que um índice faz por uma consulta com WHERE?',
        opcoes: [
          'Leva direto às linhas, sem varrer a tabela inteira',
          'Altera os dados da tabela',
          'Cria uma tabela nova com o resultado',
          'Ordena o resultado automaticamente'
        ],
        correta: 0,
        dicas: [
          'Pense no sumário do livro.',
          'O dado continua o mesmo.'
        ],
        explicacao: 'Índice é atalho de leitura: mesma consulta, menos varredura. Nada muda nos dados.',
        conceitos: ['sql.indices']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Quando criar — e quando não',
      blocos: [
        { tipo: 'texto', texto: 'Índice brilha em coluna de filtro e junção (`WHERE`, `ON`). Mas toda escrita (INSERT, UPDATE, DELETE) precisa atualizar cada índice da tabela:' },
        {
          tipo: 'codigo',
          linguagem: 'sql',
          codigo: 'CREATE INDEX idx_pedidos_cliente\nON Pedidos (ClienteId);'
        },
        { tipo: 'nota', tom: 'atencao', texto: 'ClienteId é filtrado e juntado o tempo todo: ótimo candidato. Já indexar *todas* as colunas deixa a escrita lenta e o banco inchado.' },
        { tipo: 'trabalho', texto: 'A primeira suspeita de consulta lenta no banco de verdade é a falta de índice na coluna do WHERE ou do JOIN. DBA começa quase toda investigação por aí.', fonte: '💼 No trabalho' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql29-a2',
        tipo: 'multiple-choice',
        enunciado: 'Qual coluna é a melhor candidata a índice?',
        opcoes: [
          'ClienteId em Pedidos, usada em JOINs e filtros',
          'Uma coluna que nunca aparece em filtros',
          'Todas as colunas de todas as tabelas',
          'Colunas de texto livre como observações'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Índice sem uso só custa escrita e espaço.',
          2: 'Indexar tudo deixa INSERT e UPDATE lentos.',
          3: 'Texto livre varia demais para um bom índice.'
        },
        dicas: [
          'Índice serve a filtro e junção.',
          'Pense no custo de escrita.'
        ],
        explicacao: 'Coluna de JOIN e WHERE paga o índice. O resto é custo sem benefício.',
        conceitos: ['sql.indices', 'sql.join']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql29-a3',
        tipo: 'fill-code',
        enunciado: 'Complete para criar um índice na coluna Cidade de Clientes.',
        codigo: '{{1}} INDEX idx_clientes_cidade\nON Clientes (Cidade);',
        lacunas: [['create']],
        dicas: [
          'O verbo que cria objetos no banco.',
          'Seis letras.'
        ],
        explicacao: '`CREATE INDEX ... ON tabela (coluna)`: nome, tabela e coluna do atalho.',
        conceitos: ['sql.indices']
      }
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql29-a4',
        tipo: 'true-false',
        enunciado: 'Avalie as afirmações sobre índices.',
        afirmacoes: [
          { texto: 'Índices aceleram leituras com WHERE e JOIN na coluna indexada.', correta: true, explicacao: 'O atalho leva direto às linhas.' },
          { texto: 'Quanto mais índices, sempre melhor.', correta: false, explicacao: 'Cada índice custa escrita e espaço; excesso deixa INSERT e UPDATE lentos.' },
          { texto: 'Chaves primárias já têm índice automático na maioria dos bancos.', correta: true, explicacao: 'Por isso buscar por Id é rápido sem você criar nada.' }
        ],
        dicas: [
          'Índice tem custo de escrita.',
          'Id já é rápido por padrão.'
        ],
        explicacao: 'Índice acelera leitura, custa escrita; primárias já vêm indexadas.',
        conceitos: ['sql.indices', 'sql.chave-primaria'],
        desafio: true
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'English corner · Index',
      blocos: [
        { tipo: 'texto', texto: 'Duas palavras para falar de rapidez: **index** (índice) e **fast** (rápido).' },
        {
          tipo: 'vocab',
          titulo: 'Palavras novas (2)',
          pares: [
            ['index', 'índice'],
            ['fast', 'rápido']
          ]
        },
        { tipo: 'ingles', frase: 'Queries with index are fast.', traducao: 'Consultas com índice são rápidas.' },
        { tipo: 'nota', tom: 'info', texto: '**with index are fast** = "com índice são rápidas".' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'sql29-a5',
        tipo: 'write-code',
        enunciado: 'Queries with index are fast: crie o índice de Cidade.',
        placeholder: 'CREATE ...',
        respostasAceitas: [
          'create index idx_clientes_cidade on clientes (cidade)'
        ],
        dicas: [
          'CREATE INDEX nome ON tabela (coluna).',
          'Siga a convenção idx_tabela_coluna.'
        ],
        explicacao: 'O atalho de Cidade nasce com `CREATE INDEX`.',
        conceitos: ['sql.indices', 'sql.ingles']
      }
    }
  ]
});
