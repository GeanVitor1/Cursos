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
        { id: 'linq-cp-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 35, licao: 'linq-cp-fundamentos', tipo: 'prova' },
      ]
    },
    {
      id: 'iniciante',
      nome: 'Iniciante',
      etapas: [
        { id: 'linq-04', titulo: 'Any, All e Contains (em breve)', duracao: 40, licao: 'linq-04' },
        { id: 'linq-05', titulo: 'OrderBy e ThenBy (em breve)', duracao: 35, licao: 'linq-05' },
        { id: 'linq-06', titulo: 'GroupBy (em breve)', duracao: 45, licao: 'linq-06' },
        { id: 'linq-07', titulo: 'Sum, Count, Min, Max, Average (em breve)', duracao: 40, licao: 'linq-07' },
        { id: 'linq-checkpoint-iniciante', titulo: 'Checkpoint — Iniciante', duracao: 40, licao: 'linq-checkpoint-iniciante', tipo: 'prova' },
      ]
    },
    {
      id: 'intermediario',
      nome: 'Intermediário',
      etapas: [
        { id: 'linq-08', titulo: 'IQueryable vs IEnumerable: a diferença que importa (em breve)', duracao: 50, licao: 'linq-08' },
        { id: 'linq-09', titulo: 'Projeções com Select e objetos anônimos (em breve)', duracao: 40, licao: 'linq-09' },
        { id: 'linq-10', titulo: 'Join em LINQ (em breve)', duracao: 50, licao: 'linq-10' },
        { id: 'linq-11', titulo: 'Deferred execution: quando a query roda (em breve)', duracao: 45, licao: 'linq-11' },
        { id: 'linq-checkpoint-intermediario', titulo: 'Checkpoint — Intermediário', duracao: 45, licao: 'linq-checkpoint-intermediario', tipo: 'prova' },
      ]
    },
    {
      id: 'profissional',
      nome: 'Profissional',
      etapas: [
        { id: 'linq-12', titulo: 'LINQ + EF Core: consultas de negócio (em breve)', duracao: 55, licao: 'linq-12' },
        { id: 'linq-13', titulo: 'Evitando consultas lentas e N+1 (em breve)', duracao: 55, licao: 'linq-13' },
        { id: 'linq-14', titulo: 'Compondo relatórios reais (em breve)', duracao: 60, licao: 'linq-14' },
        { id: 'linq-checkpoint-profissional', titulo: 'Checkpoint final — LINQ Profissional', duracao: 45, licao: 'linq-checkpoint-profissional', tipo: 'prova' },
      ]
    }
  ]
});
