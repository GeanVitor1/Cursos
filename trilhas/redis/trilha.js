Plataforma.registrarTrilha({
  id: 'redis',
  nome: 'Redis & Cache',
  curto: 'Redis',
  sigla: 'RDS',
  descricao: 'Por que cache existe, TTL, cache aside, serialização, invalidação e a integração com ASP.NET Core.',
  fase: 7,
  status: 'disponivel',
  prerequisitos: [{ trilha: 'aspnet', min: 100 }],
  niveis: [
    {
      id: 'fundamentos',
      nome: 'Fundamentos',
      etapas: [
        { id: 'redis-00', titulo: 'Por que cache existe (com números)', duracao: 35, licao: 'redis-00' },
        { id: 'redis-01', titulo: 'Redis: o que é e onde encaixa', duracao: 40, licao: 'redis-01' },
        { id: 'redis-02', titulo: 'TTL: tudo expira', duracao: 35, licao: 'redis-02' },
        { id: 'redis-cp-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 30, licao: 'redis-checkpoint-fundamentos', tipo: 'prova' }
      ]
    },
    {
      id: 'pratica',
      nome: 'Na prática',
      etapas: [
        { id: 'redis-03', titulo: 'Cache aside', duracao: 50, licao: 'redis-03' },
        { id: 'redis-04', titulo: 'Serialização de objetos', duracao: 45, licao: 'redis-04' },
        { id: 'redis-05', titulo: 'Invalidação: o problema difícil', duracao: 50, licao: 'redis-05' },
        { id: 'redis-06', titulo: 'ASP.NET Core + Redis', duracao: 55, licao: 'redis-06' },
        { id: 'redis-cp-profissional', titulo: 'Checkpoint final — Redis', duracao: 45, licao: 'redis-checkpoint-profissional', tipo: 'prova' }
      ]
    }
  ]
});
