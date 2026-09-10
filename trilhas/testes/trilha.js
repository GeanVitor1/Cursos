Plataforma.registrarTrilha({
  id: 'testes',
  nome: 'Testes Automatizados',
  curto: 'Testes',
  sigla: 'TST',
  descricao: 'Por que testar, xUnit, Arrange/Act/Assert, mocks com Moq, testes de API e banco em testes — com bugs reais como exercício.',
  fase: 4,
  status: 'planejada',
  prerequisitos: [{ trilha: 'aspnet', min: 100 }],
  niveis: [
    {
      id: 'fundamentos',
      nome: 'Fundamentos',
      etapas: [
        { titulo: 'Por que testar (com um bug real)', duracao: 40 },
        { titulo: 'xUnit: o primeiro teste', duracao: 45 },
        { titulo: 'Arrange, Act, Assert', duracao: 35 },
        { titulo: 'Checkpoint — Fundamentos', duracao: 35, tipo: 'prova' }
      ]
    },
    {
      id: 'unitarios',
      nome: 'Testes unitários',
      etapas: [
        { titulo: 'Testando services', duracao: 50 },
        { titulo: 'Mocks com Moq', duracao: 55 },
        { titulo: 'Testando casos de erro', duracao: 45 },
        { titulo: 'Bugs reais como exercício', duracao: 50 },
        { titulo: 'Checkpoint — Unitários', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'integracao',
      nome: 'Testes de integração',
      etapas: [
        { titulo: 'Testando controllers', duracao: 50 },
        { titulo: 'WebApplicationFactory', duracao: 55 },
        { titulo: 'Banco em testes (in-memory vs container)', duracao: 55 },
        { titulo: 'Checkpoint — Integração', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'profissional',
      nome: 'Profissional',
      etapas: [
        { titulo: 'TDD na prática: vermelho, verde, refatora', duracao: 55 },
        { titulo: 'Cobertura sem ilusão', duracao: 35 },
        { titulo: 'Testes no pipeline de CI', duracao: 45 },
        { titulo: 'Checkpoint final — Testes', duracao: 50, tipo: 'prova' }
      ]
    }
  ]
});
