Plataforma.registrarTrilha({
  id: 'cicd',
  nome: 'CI/CD com GitHub Actions',
  curto: 'CI/CD',
  sigla: 'CI',
  descricao: 'Do commit ao deploy: pipeline, build, testes, artifacts, secrets, environments e publicação automatizada.',
  fase: 8,
  status: 'planejada',
  prerequisitos: [{ trilha: 'git', min: 100 }, { trilha: 'docker', min: 100 }],
  niveis: [
    {
      id: 'fundamentos',
      nome: 'Fundamentos',
      etapas: [
        { titulo: 'O que é um pipeline (código até deploy)', duracao: 35 },
        { titulo: 'GitHub Actions: workflows e jobs', duracao: 45 },
        { titulo: 'Build automatizado de .NET', duracao: 50 },
        { titulo: 'Checkpoint — Fundamentos', duracao: 40, tipo: 'prova' }
      ]
    },
    {
      id: 'pratica',
      nome: 'Na prática',
      etapas: [
        { titulo: 'Rodando testes no pipeline', duracao: 45 },
        { titulo: 'Artifacts', duracao: 35 },
        { titulo: 'Secrets e variáveis', duracao: 40 },
        { titulo: 'Environments e aprovações', duracao: 40 },
        { titulo: 'Deploy de containers', duracao: 55 },
        { titulo: 'Checkpoint final — CI/CD', duracao: 50, tipo: 'prova' }
      ]
    }
  ]
});
