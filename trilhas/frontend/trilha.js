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
        { titulo: 'Estrutura de uma página', duracao: 35 },
        { titulo: 'Tags semânticas que o trabalho usa', duracao: 35 },
        { titulo: 'Formulários', duracao: 40 },
        { titulo: 'Checkpoint — HTML', duracao: 30, tipo: 'prova' }
      ]
    },
    {
      id: 'css',
      nome: 'CSS',
      etapas: [
        { titulo: 'Box model e display', duracao: 40 },
        { titulo: 'Flexbox', duracao: 50 },
        { titulo: 'Grid', duracao: 50 },
        { titulo: 'Responsividade', duracao: 40 },
        { titulo: 'Organização de CSS em projeto real', duracao: 35 },
        { titulo: 'Checkpoint — CSS', duracao: 40, tipo: 'prova' }
      ]
    },
    {
      id: 'javascript',
      nome: 'JavaScript essencial',
      etapas: [
        { titulo: 'Variáveis, tipos e operadores', duracao: 40 },
        { titulo: 'Arrays e objetos', duracao: 45 },
        { titulo: 'Funções e arrow functions', duracao: 40 },
        { titulo: 'DOM e eventos', duracao: 45 },
        { titulo: 'fetch e promessas', duracao: 45 },
        { titulo: 'Checkpoint — JavaScript', duracao: 40, tipo: 'prova' }
      ]
    },
    {
      id: 'typescript',
      nome: 'TypeScript',
      etapas: [
        { titulo: 'Types e type inference', duracao: 45 },
        { titulo: 'Interfaces e types', duracao: 45 },
        { titulo: 'Objetos e arrays tipados', duracao: 45 },
        { titulo: 'Funções tipadas', duracao: 40 },
        { titulo: 'Generics', duracao: 50 },
        { titulo: 'async, promises e tratamento de erros', duracao: 50 },
        { titulo: 'Checkpoint — TypeScript', duracao: 50, tipo: 'prova' }
      ]
    },
    {
      id: 'react',
      nome: 'React',
      etapas: [
        { titulo: 'Componentes e JSX', duracao: 50 },
        { titulo: 'Props', duracao: 40 },
        { titulo: 'State', duracao: 45 },
        { titulo: 'Hooks: useState e useEffect', duracao: 55 },
        { titulo: 'Formulários', duracao: 50 },
        { titulo: 'Rotas', duracao: 45 },
        { titulo: 'Consumindo a API .NET', duracao: 60 },
        { titulo: 'Autenticação no frontend', duracao: 55 },
        { titulo: 'Organização de projeto', duracao: 45 },
        { titulo: 'Checkpoint final — React', duracao: 60, tipo: 'prova' }
      ]
    }
  ]
});
