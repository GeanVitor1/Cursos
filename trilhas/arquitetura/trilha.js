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
        { titulo: 'Por que separar responsabilidades', duracao: 40 },
        { titulo: 'Controller → Service → Repository', duracao: 50 },
        { titulo: 'Interfaces: o contrato importa', duracao: 40 },
        { titulo: 'Dependency Injection como ferramenta de arquitetura', duracao: 45 },
        { titulo: 'Checkpoint — Fundamentos', duracao: 40, tipo: 'prova' }
      ]
    },
    {
      id: 'solid',
      nome: 'SOLID',
      etapas: [
        { titulo: 'Single Responsibility na prática', duracao: 40 },
        { titulo: 'Open/Closed', duracao: 40 },
        { titulo: 'Liskov Substitution', duracao: 35 },
        { titulo: 'Interface Segregation', duracao: 35 },
        { titulo: 'Dependency Inversion', duracao: 40 },
        { titulo: 'Checkpoint — SOLID', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'clean',
      nome: 'Clean Code & Clean Architecture',
      etapas: [
        { titulo: 'Código legível: nomes, funções pequenas, intenção', duracao: 45 },
        { titulo: 'Camadas: Domain, Application, Infrastructure, API', duracao: 55 },
        { titulo: 'Regra de dependência: para dentro', duracao: 45 },
        { titulo: 'Casos de uso (use cases)', duracao: 50 },
        { titulo: 'Checkpoint — Clean Architecture', duracao: 50, tipo: 'prova' }
      ]
    },
    {
      id: 'ddd',
      nome: 'DDD',
      etapas: [
        { titulo: 'Linguagem ubíqua e contexto', duracao: 40 },
        { titulo: 'Entidades e Value Objects', duracao: 50 },
        { titulo: 'Agregados e invariantes', duracao: 55 },
        { titulo: 'Eventos de domínio', duracao: 50 },
        { titulo: 'Checkpoint final — DDD', duracao: 55, tipo: 'prova' }
      ]
    }
  ]
});
