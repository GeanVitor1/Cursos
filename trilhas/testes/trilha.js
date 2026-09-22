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
        { id: 'testes-00', titulo: 'Por que testar (com um bug real)', duracao: 40, licao: 'testes-00' },
        { id: 'testes-01', titulo: 'xUnit: o primeiro teste', duracao: 45, licao: 'testes-01' },
        { id: 'testes-02', titulo: 'Arrange, Act, Assert', duracao: 35, licao: 'testes-02' },
        { id: 'testes-checkpoint-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 35, licao: 'testes-checkpoint-fundamentos', tipo: 'prova' },
      ]
    },
    {
      id: 'unitarios',
      nome: 'Testes unitários',
      etapas: [
        { id: 'testes-03', titulo: 'Testando services', duracao: 50, licao: 'testes-03' },
        { id: 'testes-04', titulo: 'Mocks com Moq', duracao: 55, licao: 'testes-04' },
        { id: 'testes-05', titulo: 'Testando casos de erro', duracao: 45, licao: 'testes-05' },
        { id: 'testes-06', titulo: 'Bugs reais como exercício', duracao: 50, licao: 'testes-06' },
        { id: 'testes-checkpoint-unitarios', titulo: 'Checkpoint — Unitários', duracao: 45, licao: 'testes-checkpoint-unitarios', tipo: 'prova' },
      ]
    },
    {
      id: 'integracao',
      nome: 'Testes de integração',
      etapas: [
        { id: 'testes-07', titulo: 'Testando controllers', duracao: 50, licao: 'testes-07' },
        { id: 'testes-08', titulo: 'WebApplicationFactory', duracao: 55, licao: 'testes-08' },
        { id: 'testes-09', titulo: 'Banco em testes (in-memory vs container)', duracao: 55, licao: 'testes-09' },
        { id: 'testes-checkpoint-integracao', titulo: 'Checkpoint — Integração', duracao: 45, licao: 'testes-checkpoint-integracao', tipo: 'prova' },
      ]
    },
    {
      id: 'profissional',
      nome: 'Profissional',
      etapas: [
        { id: 'testes-10', titulo: 'TDD na prática: vermelho, verde, refatora', duracao: 55, licao: 'testes-10' },
        { id: 'testes-11', titulo: 'Cobertura sem ilusão', duracao: 35, licao: 'testes-11' },
        { id: 'testes-12', titulo: 'Testes no pipeline de CI', duracao: 45, licao: 'testes-12' },
        { id: 'testes-checkpoint-profissional', titulo: 'Checkpoint final — Testes', duracao: 50, licao: 'testes-checkpoint-profissional', tipo: 'prova' },
      ]
    }
  ]
});
