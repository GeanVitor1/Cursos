Plataforma.registrarTrilha({
  id: 'azure',
  nome: 'Azure para Desenvolvedores .NET',
  curto: 'Azure',
  sigla: 'AZ',
  descricao: 'App Service, Azure SQL, Container Apps, Storage, Key Vault, Application Insights, Service Bus e Functions — sempre com o "onde isso aparece numa aplicação real".',
  fase: 8,
  status: 'planejada',
  prerequisitos: [{ trilha: 'docker', min: 100 }, { trilha: 'cicd', min: 50 }],
  niveis: [
    {
      id: 'fundamentos',
      nome: 'Fundamentos',
      etapas: [
        { titulo: 'Azure do ponto de vista do desenvolvedor', duracao: 40 },
        { titulo: 'App Service: publicando uma API', duracao: 55 },
        { titulo: 'Azure SQL', duracao: 50 },
        { titulo: 'Checkpoint — Fundamentos', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'containers',
      nome: 'Containers no Azure',
      etapas: [
        { titulo: 'Container Registry', duracao: 40 },
        { titulo: 'Container Apps', duracao: 50 },
        { titulo: 'Noções de AKS', duracao: 45 },
        { titulo: 'Checkpoint — Containers', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'servicos',
      nome: 'Serviços essenciais',
      etapas: [
        { titulo: 'Storage: blobs, filas e arquivos', duracao: 45 },
        { titulo: 'Key Vault: segredos fora do código', duracao: 45 },
        { titulo: 'Application Insights: enxergando produção', duracao: 50 },
        { titulo: 'Service Bus', duracao: 50 },
        { titulo: 'Azure Functions', duracao: 50 },
        { titulo: 'Checkpoint final — Azure', duracao: 55, tipo: 'prova' }
      ]
    }
  ]
});
