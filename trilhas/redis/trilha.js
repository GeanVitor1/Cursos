Plataforma.registrarTrilha({
  id: 'redis',
  nome: 'Redis & Cache',
  curto: 'Redis',
  sigla: 'RDS',
  descricao: 'Por que cache existe, TTL, cache aside, serialização, invalidação e a integração com ASP.NET Core.',
  fase: 7,
  status: 'planejada',
  prerequisitos: [{ trilha: 'aspnet', min: 100 }],
  niveis: [
    {
      id: 'fundamentos',
      nome: 'Fundamentos',
      etapas: [
        { titulo: 'Por que cache existe (com números)', duracao: 35 },
        { titulo: 'Redis: o que é e onde encaixa', duracao: 40 },
        { titulo: 'TTL: tudo expira', duracao: 35 },
        { titulo: 'Checkpoint — Fundamentos', duracao: 30, tipo: 'prova' }
      ]
    },
    {
      id: 'pratica',
      nome: 'Na prática',
      etapas: [
        { titulo: 'Cache aside', duracao: 50 },
        { titulo: 'Serialização de objetos', duracao: 45 },
        { titulo: 'Invalidação: o problema difícil', duracao: 50 },
        { titulo: 'ASP.NET Core + Redis', duracao: 55 },
        { titulo: 'Checkpoint final — Redis', duracao: 45, tipo: 'prova' }
      ]
    }
  ]
});
