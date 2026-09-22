Plataforma.registrarTrilha({
  id: 'frontend',
  nome: 'Frontend: HTML, CSS, TypeScript & React',
  curto: 'Frontend',
  sigla: 'FE',
  descricao: 'O frontend necessário para o trabalho: layout, TypeScript com profundidade, React, consumo da sua API .NET e autenticação.',
  fase: 5,
  status: 'planejada',
  prerequisitos: [{ trilha: 'aspnet', min: 100 }],
  niveis: [
    {
      id: 'html',
      nome: 'HTML',
      etapas: [
        { id: 'frontend-00', titulo: 'Estrutura de uma página', duracao: 35, licao: 'frontend-00' },
        { id: 'frontend-01', titulo: 'Tags semânticas que o trabalho usa', duracao: 35, licao: 'frontend-01' },
        { id: 'frontend-02', titulo: 'Formulários', duracao: 40, licao: 'frontend-02' },
        { id: 'frontend-checkpoint-html', titulo: 'Checkpoint — HTML', duracao: 30, licao: 'frontend-checkpoint-html', tipo: 'prova' },
      ]
    },
    {
      id: 'css',
      nome: 'CSS',
      etapas: [
        { id: 'frontend-03', titulo: 'Box model e display', duracao: 40, licao: 'frontend-03' },
        { id: 'frontend-04', titulo: 'Flexbox', duracao: 50, licao: 'frontend-04' },
        { id: 'frontend-05', titulo: 'Grid', duracao: 50, licao: 'frontend-05' },
        { id: 'frontend-06', titulo: 'Responsividade', duracao: 40, licao: 'frontend-06' },
        { id: 'frontend-07', titulo: 'Organização de CSS em projeto real', duracao: 35, licao: 'frontend-07' },
        { id: 'frontend-checkpoint-css', titulo: 'Checkpoint — CSS', duracao: 40, licao: 'frontend-checkpoint-css', tipo: 'prova' },
      ]
    },
    {
      id: 'javascript',
      nome: 'JavaScript essencial',
      etapas: [
        { id: 'frontend-08', titulo: 'Variáveis, tipos e operadores', duracao: 40, licao: 'frontend-08' },
        { id: 'frontend-09', titulo: 'Arrays e objetos', duracao: 45, licao: 'frontend-09' },
        { id: 'frontend-10', titulo: 'Funções e arrow functions', duracao: 40, licao: 'frontend-10' },
        { id: 'frontend-11', titulo: 'DOM e eventos', duracao: 45, licao: 'frontend-11' },
        { id: 'frontend-12', titulo: 'fetch e promessas', duracao: 45, licao: 'frontend-12' },
        { id: 'frontend-checkpoint-javascript', titulo: 'Checkpoint — JavaScript', duracao: 40, licao: 'frontend-checkpoint-javascript', tipo: 'prova' },
      ]
    },
    {
      id: 'typescript',
      nome: 'TypeScript',
      etapas: [
        { id: 'frontend-13', titulo: 'Types e type inference', duracao: 45, licao: 'frontend-13' },
        { id: 'frontend-14', titulo: 'Interfaces e types', duracao: 45, licao: 'frontend-14' },
        { id: 'frontend-15', titulo: 'Objetos e arrays tipados', duracao: 45, licao: 'frontend-15' },
        { id: 'frontend-16', titulo: 'Funções tipadas', duracao: 40, licao: 'frontend-16' },
        { id: 'frontend-17', titulo: 'Generics', duracao: 50, licao: 'frontend-17' },
        { id: 'frontend-18', titulo: 'async, promises e tratamento de erros', duracao: 50, licao: 'frontend-18' },
        { id: 'frontend-checkpoint-typescript', titulo: 'Checkpoint — TypeScript', duracao: 50, licao: 'frontend-checkpoint-typescript', tipo: 'prova' },
      ]
    },
    {
      id: 'react',
      nome: 'React',
      etapas: [
        { id: 'frontend-19', titulo: 'Componentes e JSX', duracao: 50, licao: 'frontend-19' },
        { id: 'frontend-20', titulo: 'Props', duracao: 40, licao: 'frontend-20' },
        { id: 'frontend-21', titulo: 'State', duracao: 45, licao: 'frontend-21' },
        { id: 'frontend-22', titulo: 'Hooks: useState e useEffect', duracao: 55, licao: 'frontend-22' },
        { id: 'frontend-23', titulo: 'Formulários', duracao: 50, licao: 'frontend-23' },
        { id: 'frontend-24', titulo: 'Rotas', duracao: 45, licao: 'frontend-24' },
        { id: 'frontend-25', titulo: 'Consumindo a API .NET', duracao: 60, licao: 'frontend-25' },
        { id: 'frontend-26', titulo: 'Autenticação no frontend', duracao: 55, licao: 'frontend-26' },
        { id: 'frontend-27', titulo: 'Organização de projeto', duracao: 45, licao: 'frontend-27' },
        { id: 'frontend-checkpoint-react', titulo: 'Checkpoint final — React', duracao: 60, licao: 'frontend-checkpoint-react', tipo: 'prova' },
      ]
    }
  ]
});
