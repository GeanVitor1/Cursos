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
        { id: 'sql-13', titulo: 'Por que JOIN existe', duracao: 40, licao: 'sql-13' },
        { id: 'sql-14', titulo: 'INNER JOIN na prática', duracao: 60, licao: 'sql-14' },
        { id: 'sql-15', titulo: 'LEFT JOIN e RIGHT JOIN', duracao: 60, licao: 'sql-15' },
        { id: 'sql-16', titulo: 'Múltiplos JOINs', duracao: 60, licao: 'sql-16' },
        { id: 'sql-17', titulo: 'Aliases e legibilidade', duracao: 30, licao: 'sql-17' },
        { id: 'sql-checkpoint-relacionamentos', titulo: 'Checkpoint — Joins', duracao: 45, licao: 'sql-checkpoint-relacionamentos', tipo: 'prova' },
      ]
    },
    {
      id: 'agregacao',
      nome: 'Agregação',
      etapas: [
        { id: 'sql-18', titulo: 'COUNT, SUM, AVG, MIN e MAX', duracao: 50, licao: 'sql-18' },
        { id: 'sql-19', titulo: 'GROUP BY', duracao: 50, licao: 'sql-19' },
        { id: 'sql-20', titulo: 'HAVING', duracao: 40, licao: 'sql-20' },
        { id: 'sql-21', titulo: 'Relatórios de vendas reais', duracao: 60, licao: 'sql-21' },
        { id: 'sql-checkpoint-agregacao', titulo: 'Checkpoint — Agregação', duracao: 40, licao: 'sql-checkpoint-agregacao', tipo: 'prova' },
      ]
    },
    {
      id: 'intermediario',
      nome: 'Intermediário',
      etapas: [
        { id: 'sql-22', titulo: 'Subqueries', duracao: 50, licao: 'sql-22' },
        { id: 'sql-23', titulo: 'CTEs (WITH)', duracao: 50, licao: 'sql-23' },
        { id: 'sql-24', titulo: 'CASE WHEN', duracao: 45, licao: 'sql-24' },
        { id: 'sql-25', titulo: 'UNION e UNION ALL', duracao: 35, licao: 'sql-25' },
        { id: 'sql-26', titulo: 'EXISTS e NOT EXISTS', duracao: 45, licao: 'sql-26' },
        { id: 'sql-27', titulo: 'Funções de data', duracao: 45, licao: 'sql-27' },
        { id: 'sql-28', titulo: 'Funções de string', duracao: 45, licao: 'sql-28' },
        { id: 'sql-checkpoint-intermediario', titulo: 'Checkpoint — Intermediário', duracao: 50, licao: 'sql-checkpoint-intermediario', tipo: 'prova' },
      ]
    },
    {
      id: 'avancado',
      nome: 'Avançado',
      etapas: [
        { id: 'sql-29', titulo: 'Índices: o que são e quando usar', duracao: 50, licao: 'sql-29' },
        { id: 'sql-30', titulo: 'Views', duracao: 40, licao: 'sql-30' },
        { id: 'sql-31', titulo: 'Stored procedures e functions', duracao: 60, licao: 'sql-31' },
        { id: 'sql-32', titulo: 'Transações e integridade', duracao: 50, licao: 'sql-32' },
        { id: 'sql-33', titulo: 'Locks e concorrência', duracao: 50, licao: 'sql-33' },
        { id: 'sql-34', titulo: 'Execution plans e performance', duracao: 60, licao: 'sql-34' },
        { id: 'sql-35', titulo: 'Window functions', duracao: 60, licao: 'sql-35' },
      ]
    },
    {
      id: 'profissional',
      nome: 'Profissional',
      etapas: [
        { id: 'sql-36', titulo: 'Modelagem de e-commerce', duracao: 90, licao: 'sql-36' },
        { id: 'sql-37', titulo: 'Consultas de estoque', duracao: 60, licao: 'sql-37' },
        { id: 'sql-38', titulo: 'Análise de pagamentos e relatórios', duracao: 60, licao: 'sql-38' },
        { id: 'sql-39', titulo: 'Otimização de consultas lentas', duracao: 60, licao: 'sql-39' },
        { id: 'sql-checkpoint-profissional', titulo: 'Checkpoint final — SQL Profissional', duracao: 60, licao: 'sql-checkpoint-profissional', tipo: 'prova' },
      ]
    }
  ]
});
