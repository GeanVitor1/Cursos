Plataforma.registrarTrilha({
  id: 'sql',
  nome: 'SQL & Bancos de Dados',
  curto: 'SQL',
  sigla: 'SQL',
  descricao: 'Do zero ao profissional: consultas, modelagem, joins, agregação, performance e situações reais de e-commerce.',
  fase: 1,
  status: 'disponivel',
  prerequisitos: [],
  niveis: [
    {
      id: 'fundamentos',
      nome: 'Fundamentos',
      etapas: [
        { id: 'sql-00', titulo: 'O que é um banco de dados?', duracao: 40, licao: 'sql-00' },
        { id: 'sql-01', titulo: 'Tabelas, linhas e colunas', duracao: 45, licao: 'sql-01' },
        { id: 'sql-02', titulo: 'Seu primeiro SELECT', duracao: 50, licao: 'sql-02' },
        { id: 'sql-03', titulo: 'Filtrando com WHERE', duracao: 50, licao: 'sql-03' },
        { id: 'sql-04', titulo: 'Combinando filtros com AND e OR', duracao: 45, licao: 'sql-04' },
        { id: 'sql-05', titulo: 'IN, BETWEEN e NOT', duracao: 45, licao: 'sql-05' },
        { id: 'sql-cp-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 40, licao: 'sql-checkpoint-fundamentos', tipo: 'prova' }
      ]
    },
    {
      id: 'iniciante',
      nome: 'Iniciante',
      etapas: [
        { id: 'sql-06', titulo: 'Ordenando resultados com ORDER BY', duracao: 40, licao: 'sql-06' },
        { id: 'sql-07', titulo: 'Removendo duplicados com DISTINCT', duracao: 30, licao: 'sql-07' },
        { id: 'sql-08', titulo: 'Limitando resultados (TOP e LIMIT)', duracao: 30, licao: 'sql-08' },
        { id: 'sql-09', titulo: 'Valores nulos (NULL) e COALESCE', duracao: 45, licao: 'sql-09' },
        { id: 'sql-10', titulo: 'Textos com LIKE', duracao: 40, licao: 'sql-10' },
        { id: 'sql-11', titulo: 'Alterando dados com UPDATE', duracao: 40, licao: 'sql-11' },
        { id: 'sql-12', titulo: 'INSERT e DELETE com segurança', duracao: 50, licao: 'sql-12' },
        { id: 'sql-cp-iniciante', titulo: 'Checkpoint — Iniciante', duracao: 40, licao: 'sql-checkpoint-iniciante', tipo: 'prova' }
      ]
    },
    {
      id: 'relacionamentos',
      nome: 'Relacionamentos',
      etapas: [
        { titulo: 'Por que JOIN existe', duracao: 40 },
        { titulo: 'INNER JOIN na prática', duracao: 60 },
        { titulo: 'LEFT JOIN e RIGHT JOIN', duracao: 60 },
        { titulo: 'Múltiplos JOINs', duracao: 60 },
        { titulo: 'Aliases e legibilidade', duracao: 30 },
        { titulo: 'Checkpoint — Joins', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'agregacao',
      nome: 'Agregação',
      etapas: [
        { titulo: 'COUNT, SUM, AVG, MIN e MAX', duracao: 50 },
        { titulo: 'GROUP BY', duracao: 50 },
        { titulo: 'HAVING', duracao: 40 },
        { titulo: 'Relatórios de vendas reais', duracao: 60 },
        { titulo: 'Checkpoint — Agregação', duracao: 40, tipo: 'prova' }
      ]
    },
    {
      id: 'intermediario',
      nome: 'Intermediário',
      etapas: [
        { titulo: 'Subqueries', duracao: 50 },
        { titulo: 'CTEs (WITH)', duracao: 50 },
        { titulo: 'CASE WHEN', duracao: 45 },
        { titulo: 'UNION e UNION ALL', duracao: 35 },
        { titulo: 'EXISTS e NOT EXISTS', duracao: 45 },
        { titulo: 'Funções de data', duracao: 45 },
        { titulo: 'Funções de string', duracao: 45 },
        { titulo: 'Checkpoint — Intermediário', duracao: 50, tipo: 'prova' }
      ]
    },
    {
      id: 'avancado',
      nome: 'Avançado',
      etapas: [
        { titulo: 'Índices: o que são e quando usar', duracao: 50 },
        { titulo: 'Views', duracao: 40 },
        { titulo: 'Stored procedures e functions', duracao: 60 },
        { titulo: 'Transações e integridade', duracao: 50 },
        { titulo: 'Locks e concorrência', duracao: 50 },
        { titulo: 'Execution plans e performance', duracao: 60 },
        { titulo: 'Window functions', duracao: 60 }
      ]
    },
    {
      id: 'profissional',
      nome: 'Profissional',
      etapas: [
        { titulo: 'Modelagem de e-commerce', duracao: 90 },
        { titulo: 'Consultas de estoque', duracao: 60 },
        { titulo: 'Análise de pagamentos e relatórios', duracao: 60 },
        { titulo: 'Otimização de consultas lentas', duracao: 60 },
        { titulo: 'Checkpoint final — SQL Profissional', duracao: 60, tipo: 'prova' }
      ]
    }
  ]
});
