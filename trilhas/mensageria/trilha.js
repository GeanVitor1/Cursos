Plataforma.registrarTrilha({
  id: 'mensageria',
  nome: 'Mensageria',
  curto: 'Mensageria',
  sigla: 'MSG',
  descricao: 'Comunicação assíncrona: filas, producer/consumer, RabbitMQ, retries, dead letter e eventos.',
  fase: 7,
  status: 'planejada',
  prerequisitos: [{ trilha: 'aspnet', min: 100 }],
  niveis: [
    {
      id: 'fundamentos',
      nome: 'Fundamentos',
      etapas: [
        { id: 'mensageria-00', titulo: 'Comunicação síncrona vs assíncrona', duracao: 40, licao: 'mensageria-00' },
        { id: 'mensageria-01', titulo: 'Filas: a ideia central', duracao: 40, licao: 'mensageria-01' },
        { id: 'mensageria-02', titulo: 'Producer e consumer', duracao: 40, licao: 'mensageria-02' },
        { id: 'mensageria-checkpoint-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 35, licao: 'mensageria-checkpoint-fundamentos', tipo: 'prova' },
      ]
    },
    {
      id: 'rabbitmq',
      nome: 'RabbitMQ',
      etapas: [
        { id: 'mensageria-03', titulo: 'Exchanges e routing', duracao: 50, licao: 'mensageria-03' },
        { id: 'mensageria-04', titulo: 'Publicando e consumindo em .NET', duracao: 60, licao: 'mensageria-04' },
        { id: 'mensageria-05', titulo: 'Retries e falhas', duracao: 45, licao: 'mensageria-05' },
        { id: 'mensageria-06', titulo: 'Dead letter queue', duracao: 45, licao: 'mensageria-06' },
        { id: 'mensageria-checkpoint-rabbitmq', titulo: 'Checkpoint — RabbitMQ', duracao: 45, licao: 'mensageria-checkpoint-rabbitmq', tipo: 'prova' },
      ]
    },
    {
      id: 'eventos',
      nome: 'Eventos',
      etapas: [
        { id: 'mensageria-07', titulo: 'Eventos de domínio vs comandos', duracao: 45, licao: 'mensageria-07' },
        { id: 'mensageria-08', titulo: 'Kafka: conceitos essenciais', duracao: 50, licao: 'mensageria-08' },
        { id: 'mensageria-09', titulo: 'Quando usar fila e quando usar evento', duracao: 40, licao: 'mensageria-09' },
        { id: 'mensageria-checkpoint-eventos', titulo: 'Checkpoint final — Mensageria', duracao: 50, licao: 'mensageria-checkpoint-eventos', tipo: 'prova' },
      ]
    }
  ]
});
