Plataforma.registrarTrilha({
  id: 'entity-framework',
  nome: 'Entity Framework Core',
  curto: 'EF Core',
  sigla: 'EF',
  descricao: 'Seu C# conversando com o banco de dados: como um objeto vira registro, como consultar e como gravar — sempre mostrando o SQL que acontece por baixo.',
  fase: 2,
  status: 'disponivel',
  prerequisitos: [{ trilha: 'sql', min: 100 }, { trilha: 'csharp', min: 100 }, { trilha: 'linq', min: 100 }],
  niveis: [
    {
      id: 'fundamentos',
      nome: 'Fundamentos',
      etapas: [
        { id: 'ef-00', titulo: 'C# e SQL: como os dois conversam (sem sofrimento)', duracao: 40, licao: 'ef-00' },
        { id: 'ef-01', titulo: 'DbContext e DbSet: a porta e as gavetas', duracao: 45, licao: 'ef-01' },
        { id: 'ef-02', titulo: 'Add e SaveChanges: do objeto ao INSERT', duracao: 45, licao: 'ef-02' },
        { id: 'ef-03', titulo: 'Lendo dados: o LINQ vira SQL', duracao: 45, licao: 'ef-03' },
        { id: 'ef-cp-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 40, licao: 'ef-cp-fundamentos', tipo: 'prova' },
      ]
    },
    {
      id: 'iniciante',
      nome: 'Iniciante',
      etapas: [
        { id: 'ef-04', titulo: 'Primeira migration (em breve)', duracao: 50, licao: 'ef-04' },
        { id: 'ef-05', titulo: 'Criando o banco de verdade (em breve)', duracao: 40, licao: 'ef-05' },
        { id: 'ef-06', titulo: 'Atualizando registros (em breve)', duracao: 40, licao: 'ef-06' },
        { id: 'ef-07', titulo: 'Excluindo registros (em breve)', duracao: 35, licao: 'ef-07' },
        { id: 'ef-08', titulo: 'Connection string e configuração (em breve)', duracao: 40, licao: 'ef-08' },
        { id: 'entity-framework-checkpoint-iniciante', titulo: 'Checkpoint — Iniciante', duracao: 45, licao: 'entity-framework-checkpoint-iniciante', tipo: 'prova' },
      ]
    },
    {
      id: 'relacionamentos',
      nome: 'Relacionamentos',
      etapas: [
        { id: 'ef-09', titulo: 'One-to-Many na prática (em breve)', duracao: 55, licao: 'ef-09' },
        { id: 'ef-10', titulo: 'Include e ThenInclude (em breve)', duracao: 50, licao: 'ef-10' },
        { id: 'ef-11', titulo: 'One-to-One (em breve)', duracao: 40, licao: 'ef-11' },
        { id: 'ef-12', titulo: 'Many-to-Many (em breve)', duracao: 55, licao: 'ef-12' },
        { id: 'ef-13', titulo: 'Fluent API vs Data Annotations (em breve)', duracao: 50, licao: 'ef-13' },
        { id: 'entity-framework-checkpoint-relacionamentos', titulo: 'Checkpoint — Relacionamentos', duracao: 45, licao: 'entity-framework-checkpoint-relacionamentos', tipo: 'prova' },
      ]
    },
    {
      id: 'intermediario',
      nome: 'Intermediário',
      etapas: [
        { id: 'ef-14', titulo: 'Tracking e AsNoTracking (em breve)', duracao: 45, licao: 'ef-14' },
        { id: 'ef-15', titulo: 'O SQL que o EF gera por baixo (em breve)', duracao: 50, licao: 'ef-15' },
        { id: 'ef-16', titulo: 'Projeções com Select e DTOs (em breve)', duracao: 45, licao: 'ef-16' },
        { id: 'ef-17', titulo: 'Paginação de resultados (em breve)', duracao: 40, licao: 'ef-17' },
        { id: 'ef-18', titulo: 'Transações no EF Core (em breve)', duracao: 45, licao: 'ef-18' },
        { id: 'entity-framework-checkpoint-intermediario', titulo: 'Checkpoint — Intermediário', duracao: 45, licao: 'entity-framework-checkpoint-intermediario', tipo: 'prova' },
      ]
    },
    {
      id: 'avancado',
      nome: 'Avançado',
      etapas: [
        { id: 'ef-19', titulo: 'Performance: N+1, split queries, compiled queries (em breve)', duracao: 60, licao: 'ef-19' },
        { id: 'ef-20', titulo: 'Migrations profissionais e ambientes (em breve)', duracao: 55, licao: 'ef-20' },
        { id: 'ef-21', titulo: 'Concorrência e rowversion (em breve)', duracao: 50, licao: 'ef-21' },
        { id: 'ef-22', titulo: 'Global query filters e soft delete (em breve)', duracao: 45, licao: 'ef-22' },
        { id: 'ef-23', titulo: 'Interceptors e auditoria (em breve)', duracao: 50, licao: 'ef-23' },
      ]
    },
    {
      id: 'profissional',
      nome: 'Profissional',
      etapas: [
        { id: 'ef-24', titulo: 'Repository + Unit of Work: quando faz sentido (em breve)', duracao: 60, licao: 'ef-24' },
        { id: 'ef-25', titulo: 'EF Core em produção: diagnóstico e cuidados (em breve)', duracao: 60, licao: 'ef-25' },
        { id: 'entity-framework-checkpoint-profissional', titulo: 'Checkpoint final — EF Profissional', duracao: 50, licao: 'entity-framework-checkpoint-profissional', tipo: 'prova' },
      ]
    }
  ]
});
