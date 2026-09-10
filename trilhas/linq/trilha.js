Plataforma.registrarTrilha({
  id: 'linq',
  nome: 'LINQ',
  curto: 'LINQ',
  sigla: 'LQ',
  descricao: 'Consultando coleções e o banco com C#: Where, Select, FirstOrDefault e a diferença entre IQueryable e IEnumerable — construído depois de lambdas, nunca antes.',
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
        { titulo: 'Any, All e Contains', duracao: 40 },
        { titulo: 'OrderBy e ThenBy', duracao: 35 },
        { titulo: 'GroupBy', duracao: 45 },
        { titulo: 'Sum, Count, Min, Max, Average', duracao: 40 },
        { titulo: 'Checkpoint — Iniciante', duracao: 40, tipo: 'prova' }
      ]
    },
    {
      id: 'intermediario',
      nome: 'Intermediário',
      etapas: [
        { titulo: 'IQueryable vs IEnumerable (a diferença que importa)', duracao: 50 },
        { titulo: 'Projeções com Select e objetos anônimos', duracao: 40 },
        { titulo: 'Join em LINQ', duracao: 50 },
        { titulo: 'Deferred execution: quando a query roda', duracao: 45 },
        { titulo: 'Checkpoint — Intermediário', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'profissional',
      nome: 'Profissional',
      etapas: [
        { titulo: 'LINQ + EF Core: consultas de negócio', duracao: 55 },
        { titulo: 'Evitando consultas lentas e N+1', duracao: 55 },
        { titulo: 'Compondo relatórios reais', duracao: 60 },
        { titulo: 'Checkpoint final — LINQ Profissional', duracao: 45, tipo: 'prova' }
      ]
    }
  ]
});
