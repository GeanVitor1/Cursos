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
        { id: 'cicd-00', titulo: 'O que é um pipeline (código até deploy)', duracao: 35, licao: 'cicd-00' },
        { id: 'cicd-01', titulo: 'GitHub Actions: workflows e jobs', duracao: 45, licao: 'cicd-01' },
        { id: 'cicd-02', titulo: 'Build automatizado de .NET', duracao: 50, licao: 'cicd-02' },
        { id: 'cicd-checkpoint-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 40, licao: 'cicd-checkpoint-fundamentos', tipo: 'prova' },
      ]
    },
    {
      id: 'pratica',
      nome: 'Na prática',
      etapas: [
        { id: 'cicd-03', titulo: 'Rodando testes no pipeline', duracao: 45, licao: 'cicd-03' },
        { id: 'cicd-04', titulo: 'Artifacts', duracao: 35, licao: 'cicd-04' },
        { id: 'cicd-05', titulo: 'Secrets e variáveis', duracao: 40, licao: 'cicd-05' },
        { id: 'cicd-06', titulo: 'Environments e aprovações', duracao: 40, licao: 'cicd-06' },
        { id: 'cicd-07', titulo: 'Deploy de containers', duracao: 55, licao: 'cicd-07' },
        { id: 'cicd-checkpoint-pratica', titulo: 'Checkpoint final — CI/CD', duracao: 50, licao: 'cicd-checkpoint-pratica', tipo: 'prova' },
      ]
    }
  ]
});
