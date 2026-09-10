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
        { id: 'ef-cp-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 40, tipo: 'prova' }
      ]
    },
    {
      id: 'iniciante',
      nome: 'Iniciante',
      etapas: [
        { titulo: 'Primeira migration (em breve)', duracao: 50 },
        { titulo: 'Criando o banco de verdade (em breve)', duracao: 40 },
        { titulo: 'Atualizando registros (em breve)', duracao: 40 },
        { titulo: 'Excluindo registros (em breve)', duracao: 35 },
        { titulo: 'Connection string e configuração (em breve)', duracao: 40 },
        { titulo: 'Checkpoint — Iniciante', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'relacionamentos',
      nome: 'Relacionamentos',
      etapas: [
        { titulo: 'One-to-Many na prática (em breve)', duracao: 55 },
        { titulo: 'Include e ThenInclude (em breve)', duracao: 50 },
        { titulo: 'One-to-One (em breve)', duracao: 40 },
        { titulo: 'Many-to-Many (em breve)', duracao: 55 },
        { titulo: 'Fluent API vs Data Annotations (em breve)', duracao: 50 },
        { titulo: 'Checkpoint — Relacionamentos', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'intermediario',
      nome: 'Intermediário',
      etapas: [
        { titulo: 'Tracking e AsNoTracking (em breve)', duracao: 45 },
        { titulo: 'O SQL que o EF gera por baixo (em breve)', duracao: 50 },
        { titulo: 'Projeções com Select e DTOs (em breve)', duracao: 45 },
        { titulo: 'Paginação de resultados (em breve)', duracao: 40 },
        { titulo: 'Transações no EF Core (em breve)', duracao: 45 },
        { titulo: 'Checkpoint — Intermediário', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'avancado',
      nome: 'Avançado',
      etapas: [
        { titulo: 'Performance: N+1, split queries, compiled queries (em breve)', duracao: 60 },
        { titulo: 'Migrations profissionais e ambientes (em breve)', duracao: 55 },
        { titulo: 'Concorrência e rowversion (em breve)', duracao: 50 },
        { titulo: 'Global query filters e soft delete (em breve)', duracao: 45 },
        { titulo: 'Interceptors e auditoria (em breve)', duracao: 50 }
      ]
    },
    {
      id: 'profissional',
      nome: 'Profissional',
      etapas: [
        { titulo: 'Repository + Unit of Work: quando faz sentido (em breve)', duracao: 60 },
        { titulo: 'EF Core em produção: diagnóstico e cuidados (em breve)', duracao: 60 },
        { titulo: 'Checkpoint final — EF Profissional', duracao: 50, tipo: 'prova' }
      ]
    }
  ]
});
