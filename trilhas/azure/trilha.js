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
        { id: 'azure-00', titulo: 'Azure do ponto de vista do desenvolvedor', duracao: 40, licao: 'azure-00' },
        { id: 'azure-01', titulo: 'App Service: publicando uma API', duracao: 55, licao: 'azure-01' },
        { id: 'azure-02', titulo: 'Azure SQL', duracao: 50, licao: 'azure-02' },
        { id: 'azure-checkpoint-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 45, licao: 'azure-checkpoint-fundamentos', tipo: 'prova' },
      ]
    },
    {
      id: 'containers',
      nome: 'Containers no Azure',
      etapas: [
        { id: 'azure-03', titulo: 'Container Registry', duracao: 40, licao: 'azure-03' },
        { id: 'azure-04', titulo: 'Container Apps', duracao: 50, licao: 'azure-04' },
        { id: 'azure-05', titulo: 'Noções de AKS', duracao: 45, licao: 'azure-05' },
        { id: 'azure-checkpoint-containers', titulo: 'Checkpoint — Containers', duracao: 45, licao: 'azure-checkpoint-containers', tipo: 'prova' },
      ]
    },
    {
      id: 'servicos',
      nome: 'Serviços essenciais',
      etapas: [
        { id: 'azure-06', titulo: 'Storage: blobs, filas e arquivos', duracao: 45, licao: 'azure-06' },
        { id: 'azure-07', titulo: 'Key Vault: segredos fora do código', duracao: 45, licao: 'azure-07' },
        { id: 'azure-08', titulo: 'Application Insights: enxergando produção', duracao: 50, licao: 'azure-08' },
        { id: 'azure-09', titulo: 'Service Bus', duracao: 50, licao: 'azure-09' },
        { id: 'azure-10', titulo: 'Azure Functions', duracao: 50, licao: 'azure-10' },
        { id: 'azure-checkpoint-servicos', titulo: 'Checkpoint final — Azure', duracao: 55, licao: 'azure-checkpoint-servicos', tipo: 'prova' },
      ]
    }
  ]
});
