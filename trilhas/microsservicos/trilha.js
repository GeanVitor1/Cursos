Plataforma.registrarTrilha({
  id: 'microsservicos',
  nome: 'Microsserviços & System Design',
  curto: 'Microsserviços',
  sigla: 'µSV',
  descricao: 'Quando usar — e principalmente quando NÃO usar: monolito modular, comunicação, consistência, observabilidade e falhas distribuídas.',
  fase: 9,
  status: 'planejada',
  prerequisitos: [
    { trilha: 'aspnet', min: 100 },
    { trilha: 'arquitetura', min: 100 },
    { trilha: 'mensageria', min: 100 },
    { trilha: 'docker', min: 100 }
  ],
  niveis: [
    {
      id: 'fundamentos',
      nome: 'Fundamentos',
      etapas: [
        { titulo: 'Monolito: por que começar por ele', duracao: 40 },
        { titulo: 'Monolito modular', duracao: 45 },
        { titulo: 'Quando NÃO usar microsserviços', duracao: 45 },
        { titulo: 'Checkpoint — Fundamentos', duracao: 40, tipo: 'prova' }
      ]
    },
    {
      id: 'comunicacao',
      nome: 'Comunicação',
      etapas: [
        { titulo: 'Comunicação síncrona entre serviços', duracao: 50 },
        { titulo: 'Comunicação assíncrona e eventos', duracao: 50 },
        { titulo: 'API Gateway', duracao: 45 },
        { titulo: 'Checkpoint — Comunicação', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'problemas',
      nome: 'Problemas reais',
      etapas: [
        { titulo: 'Consistência eventual', duracao: 50 },
        { titulo: 'Observabilidade: logs, métricas e tracing', duracao: 55 },
        { titulo: 'Falhas em cascata e resiliência', duracao: 50 },
        { titulo: 'Checkpoint final — System Design', duracao: 55, tipo: 'prova' }
      ]
    }
  ]
});
