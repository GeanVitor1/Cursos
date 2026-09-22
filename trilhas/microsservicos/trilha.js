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
        { id: 'microsservicos-00', titulo: 'Monolito: por que começar por ele', duracao: 40, licao: 'microsservicos-00' },
        { id: 'microsservicos-01', titulo: 'Monolito modular', duracao: 45, licao: 'microsservicos-01' },
        { id: 'microsservicos-02', titulo: 'Quando NÃO usar microsserviços', duracao: 45, licao: 'microsservicos-02' },
        { id: 'microsservicos-checkpoint-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 40, licao: 'microsservicos-checkpoint-fundamentos', tipo: 'prova' },
      ]
    },
    {
      id: 'comunicacao',
      nome: 'Comunicação',
      etapas: [
        { id: 'microsservicos-03', titulo: 'Comunicação síncrona entre serviços', duracao: 50, licao: 'microsservicos-03' },
        { id: 'microsservicos-04', titulo: 'Comunicação assíncrona e eventos', duracao: 50, licao: 'microsservicos-04' },
        { id: 'microsservicos-05', titulo: 'API Gateway', duracao: 45, licao: 'microsservicos-05' },
        { id: 'microsservicos-checkpoint-comunicacao', titulo: 'Checkpoint — Comunicação', duracao: 45, licao: 'microsservicos-checkpoint-comunicacao', tipo: 'prova' },
      ]
    },
    {
      id: 'problemas',
      nome: 'Problemas reais',
      etapas: [
        { id: 'microsservicos-06', titulo: 'Consistência eventual', duracao: 50, licao: 'microsservicos-06' },
        { id: 'microsservicos-07', titulo: 'Observabilidade: logs, métricas e tracing', duracao: 55, licao: 'microsservicos-07' },
        { id: 'microsservicos-08', titulo: 'Falhas em cascata e resiliência', duracao: 50, licao: 'microsservicos-08' },
        { id: 'microsservicos-checkpoint-problemas', titulo: 'Checkpoint final — System Design', duracao: 55, licao: 'microsservicos-checkpoint-problemas', tipo: 'prova' },
      ]
    }
  ]
});
