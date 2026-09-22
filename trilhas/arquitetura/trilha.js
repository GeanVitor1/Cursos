Plataforma.registrarTrilha({
  id: 'arquitetura',
  nome: 'Arquitetura & SOLID',
  curto: 'Arquitetura',
  sigla: 'ARQ',
  descricao: 'Evolução guiada: primeiro o código ruim, depois a melhoria. Camadas, SOLID, Clean Architecture e DDD com propósito.',
  fase: 4,
  status: 'planejada',
  prerequisitos: [{ trilha: 'aspnet', min: 100 }],
  niveis: [
    {
      id: 'fundamentos',
      nome: 'Fundamentos',
      etapas: [
        { id: 'arquitetura-00', titulo: 'Por que separar responsabilidades', duracao: 40, licao: 'arquitetura-00' },
        { id: 'arquitetura-01', titulo: 'Controller → Service → Repository', duracao: 50, licao: 'arquitetura-01' },
        { id: 'arquitetura-02', titulo: 'Interfaces: o contrato importa', duracao: 40, licao: 'arquitetura-02' },
        { id: 'arquitetura-03', titulo: 'Dependency Injection como ferramenta de arquitetura', duracao: 45, licao: 'arquitetura-03' },
        { id: 'arquitetura-checkpoint-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 40, licao: 'arquitetura-checkpoint-fundamentos', tipo: 'prova' },
      ]
    },
    {
      id: 'solid',
      nome: 'SOLID',
      etapas: [
        { id: 'arquitetura-04', titulo: 'Single Responsibility na prática', duracao: 40, licao: 'arquitetura-04' },
        { id: 'arquitetura-05', titulo: 'Open/Closed', duracao: 40, licao: 'arquitetura-05' },
        { id: 'arquitetura-06', titulo: 'Liskov Substitution', duracao: 35, licao: 'arquitetura-06' },
        { id: 'arquitetura-07', titulo: 'Interface Segregation', duracao: 35, licao: 'arquitetura-07' },
        { id: 'arquitetura-08', titulo: 'Dependency Inversion', duracao: 40, licao: 'arquitetura-08' },
        { id: 'arquitetura-checkpoint-solid', titulo: 'Checkpoint — SOLID', duracao: 45, licao: 'arquitetura-checkpoint-solid', tipo: 'prova' },
      ]
    },
    {
      id: 'clean',
      nome: 'Clean Code & Clean Architecture',
      etapas: [
        { id: 'arquitetura-09', titulo: 'Código legível: nomes, funções pequenas, intenção', duracao: 45, licao: 'arquitetura-09' },
        { id: 'arquitetura-10', titulo: 'Camadas: Domain, Application, Infrastructure, API', duracao: 55, licao: 'arquitetura-10' },
        { id: 'arquitetura-11', titulo: 'Regra de dependência: para dentro', duracao: 45, licao: 'arquitetura-11' },
        { id: 'arquitetura-12', titulo: 'Casos de uso (use cases)', duracao: 50, licao: 'arquitetura-12' },
        { id: 'arquitetura-checkpoint-clean', titulo: 'Checkpoint — Clean Architecture', duracao: 50, licao: 'arquitetura-checkpoint-clean', tipo: 'prova' },
      ]
    },
    {
      id: 'ddd',
      nome: 'DDD',
      etapas: [
        { id: 'arquitetura-13', titulo: 'Linguagem ubíqua e contexto', duracao: 40, licao: 'arquitetura-13' },
        { id: 'arquitetura-14', titulo: 'Entidades e Value Objects', duracao: 50, licao: 'arquitetura-14' },
        { id: 'arquitetura-15', titulo: 'Agregados e invariantes', duracao: 55, licao: 'arquitetura-15' },
        { id: 'arquitetura-16', titulo: 'Eventos de domínio', duracao: 50, licao: 'arquitetura-16' },
        { id: 'arquitetura-checkpoint-ddd', titulo: 'Checkpoint final — DDD', duracao: 55, licao: 'arquitetura-checkpoint-ddd', tipo: 'prova' },
      ]
    }
  ]
});
