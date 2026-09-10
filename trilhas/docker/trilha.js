Plataforma.registrarTrilha({
  id: 'docker',
  nome: 'Docker',
  curto: 'Docker',
  sigla: 'DKR',
  descricao: 'Do "na minha máquina funciona" ao ambiente reproduzível: imagens, containers, compose, .NET + SQL Server + Redis.',
  fase: 6,
  status: 'planejada',
  prerequisitos: [{ trilha: 'aspnet', min: 100 }],
  niveis: [
    {
      id: 'fundamentos',
      nome: 'Fundamentos',
      etapas: [
        { titulo: 'O problema que o Docker resolve', duracao: 35 },
        { titulo: 'Imagem vs container', duracao: 35 },
        { titulo: 'Primeiro Dockerfile', duracao: 50 },
        { titulo: 'Checkpoint — Fundamentos', duracao: 35, tipo: 'prova' }
      ]
    },
    {
      id: 'pratica',
      nome: 'Docker na prática',
      etapas: [
        { titulo: 'Portas', duracao: 30 },
        { titulo: 'Volumes e persistência', duracao: 40 },
        { titulo: 'Variáveis de ambiente', duracao: 35 },
        { titulo: 'Networks', duracao: 40 },
        { titulo: 'Checkpoint — Prática', duracao: 40, tipo: 'prova' }
      ]
    },
    {
      id: 'compose',
      nome: 'Docker Compose',
      etapas: [
        { titulo: 'docker-compose: orquestrando serviços', duracao: 50 },
        { titulo: '.NET + SQL Server com compose', duracao: 60 },
        { titulo: 'Redis com compose', duracao: 40 },
        { titulo: 'Aplicação completa: API + banco + cache', duracao: 70 },
        { titulo: 'Checkpoint final — Docker', duracao: 55, tipo: 'prova' }
      ]
    }
  ]
});
