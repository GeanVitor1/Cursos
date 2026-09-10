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
        { titulo: 'Comunicação síncrona vs assíncrona', duracao: 40 },
        { titulo: 'Filas: a ideia central', duracao: 40 },
        { titulo: 'Producer e consumer', duracao: 40 },
        { titulo: 'Checkpoint — Fundamentos', duracao: 35, tipo: 'prova' }
      ]
    },
    {
      id: 'rabbitmq',
      nome: 'RabbitMQ',
      etapas: [
        { titulo: 'Exchanges e routing', duracao: 50 },
        { titulo: 'Publicando e consumindo em .NET', duracao: 60 },
        { titulo: 'Retries e falhas', duracao: 45 },
        { titulo: 'Dead letter queue', duracao: 45 },
        { titulo: 'Checkpoint — RabbitMQ', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'eventos',
      nome: 'Eventos',
      etapas: [
        { titulo: 'Eventos de domínio vs comandos', duracao: 45 },
        { titulo: 'Kafka: conceitos essenciais', duracao: 50 },
        { titulo: 'Quando usar fila e quando usar evento', duracao: 40 },
        { titulo: 'Checkpoint final — Mensageria', duracao: 50, tipo: 'prova' }
      ]
    }
  ]
});
