Plataforma.registrarTrilha({
  id: 'docker',
  nome: 'Docker',
  curto: 'Docker',
  sigla: 'DKR',
  descricao: 'Do "na minha máquina funciona" ao ambiente reproduzível: imagens, containers, compose, .NET + SQL Server + Redis.',
  fase: 6,
  status: 'disponivel',
  prerequisitos: [{ trilha: 'aspnet', min: 100 }],
  niveis: [
    {
      id: 'fundamentos',
      nome: 'Fundamentos',
      etapas: [
        { id: 'docker-00', titulo: 'O problema que o Docker resolve', duracao: 35, licao: 'docker-00' },
        { id: 'docker-01', titulo: 'Imagem vs container', duracao: 35, licao: 'docker-01' },
        { id: 'docker-02', titulo: 'Primeiro Dockerfile', duracao: 50, licao: 'docker-02' },
        { id: 'docker-cp-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 35, licao: 'docker-checkpoint-fundamentos', tipo: 'prova' }
      ]
    },
    {
      id: 'pratica',
      nome: 'Docker na prática',
      etapas: [
        { id: 'docker-03', titulo: 'Portas', duracao: 30, licao: 'docker-03' },
        { id: 'docker-04', titulo: 'Volumes e persistência', duracao: 40, licao: 'docker-04' },
        { id: 'docker-05', titulo: 'Variáveis de ambiente', duracao: 35, licao: 'docker-05' },
        { id: 'docker-06', titulo: 'Networks', duracao: 40, licao: 'docker-06' },
        { id: 'docker-cp-pratica', titulo: 'Checkpoint — Prática', duracao: 40, licao: 'docker-checkpoint-pratica', tipo: 'prova' }
      ]
    },
    {
      id: 'compose',
      nome: 'Docker Compose',
      etapas: [
        { id: 'docker-07', titulo: 'docker-compose: orquestrando serviços', duracao: 50, licao: 'docker-07' },
        { id: 'docker-08', titulo: '.NET + SQL Server com compose', duracao: 60, licao: 'docker-08' },
        { id: 'docker-09', titulo: 'Redis com compose', duracao: 40, licao: 'docker-09' },
        { id: 'docker-10', titulo: 'Aplicação completa: API + banco + cache', duracao: 60, licao: 'docker-10' },
        { id: 'docker-cp-profissional', titulo: 'Checkpoint final — Docker', duracao: 55, licao: 'docker-checkpoint-profissional', tipo: 'prova' }
      ]
    }
  ]
});
