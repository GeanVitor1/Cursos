Plataforma.registrarTrilha({
  id: 'linq',
  nome: 'LINQ',
  curto: 'LINQ',
  sigla: 'LQ',
  descricao: 'Consultando coleções com C#: Where, Select e FirstOrDefault — construído depois de lambdas, nunca antes.',
  fase: 2,
  status: 'disponivel',
  prerequisitos: [{ trilha: 'csharp', min: 100 }, { trilha: 'sql', min: 100 }],
  niveis: [
    {
      id: 'fundamentos',
      nome: 'Fundamentos',
      etapas: [
        { id: 'linq-00', titulo: 'O que é LINQ e por que ele existe', duracao: 35, licao: 'linq-00' },
        { id: 'linq-01', titulo: 'Where: filtrando com lambda', duracao: 40, licao: 'linq-01' },
        { id: 'linq-02', titulo: 'Select: transformando dados', duracao: 35, licao: 'linq-02' },
        { id: 'linq-03', titulo: 'First, FirstOrDefault e Single', duracao: 35, licao: 'linq-03' },
        { id: 'linq-cp-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 35, tipo: 'prova' }
      ]
    },
    {
      id: 'iniciante',
      nome: 'Iniciante',
      etapas: [
        { titulo: 'Any, All e Contains (em breve)', duracao: 40 },
        { titulo: 'OrderBy e ThenBy (em breve)', duracao: 35 },
        { titulo: 'GroupBy (em breve)', duracao: 45 },
        { titulo: 'Sum, Count, Min, Max, Average (em breve)', duracao: 40 },
        { titulo: 'Checkpoint — Iniciante', duracao: 40, tipo: 'prova' }
      ]
    },
    {
      id: 'intermediario',
      nome: 'Intermediário',
      etapas: [
        { titulo: 'IQueryable vs IEnumerable: a diferença que importa (em breve)', duracao: 50 },
        { titulo: 'Projeções com Select e objetos anônimos (em breve)', duracao: 40 },
        { titulo: 'Join em LINQ (em breve)', duracao: 50 },
        { titulo: 'Deferred execution: quando a query roda (em breve)', duracao: 45 },
        { titulo: 'Checkpoint — Intermediário', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'profissional',
      nome: 'Profissional',
      etapas: [
        { titulo: 'LINQ + EF Core: consultas de negócio (em breve)', duracao: 55 },
        { titulo: 'Evitando consultas lentas e N+1 (em breve)', duracao: 55 },
        { titulo: 'Compondo relatórios reais (em breve)', duracao: 60 },
        { titulo: 'Checkpoint final — LINQ Profissional', duracao: 45, tipo: 'prova' }
      ]
    }
  ]
});
