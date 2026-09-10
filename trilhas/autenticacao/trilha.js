Plataforma.registrarTrilha({
  id: 'autenticacao',
  nome: 'Autenticação & Autorização',
  curto: 'Auth',
  sigla: 'AUT',
  descricao: 'Hash de senha, JWT, refresh token, claims, roles, policies e os erros reais do dia a dia: 401, 403 e token expirado.',
  fase: 4,
  status: 'planejada',
  prerequisitos: [{ trilha: 'aspnet', min: 100 }, { trilha: 'seguranca', min: 100 }],
  niveis: [
    {
      id: 'fundamentos',
      nome: 'Fundamentos',
      etapas: [
        { titulo: 'Autenticação vs autorização', duracao: 35 },
        { titulo: 'Senhas nunca em texto puro: hash e salt', duracao: 45 },
        { titulo: 'Checkpoint — Fundamentos', duracao: 30, tipo: 'prova' }
      ]
    },
    {
      id: 'jwt',
      nome: 'JWT na prática',
      etapas: [
        { titulo: 'O que é um JWT (por dentro)', duracao: 50 },
        { titulo: 'Gerando o access token', duracao: 55 },
        { titulo: 'Claims e roles dentro do token', duracao: 45 },
        { titulo: 'Refresh token e expiração', duracao: 55 },
        { titulo: 'Checkpoint — JWT', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'autorizacao',
      nome: 'Autorização',
      etapas: [
        { titulo: '[Authorize] em endpoints', duracao: 40 },
        { titulo: 'Roles e policies', duracao: 50 },
        { titulo: 'ASP.NET Identity: quando usar', duracao: 50 },
        { titulo: 'Registro e login completos', duracao: 60 },
        { titulo: 'Checkpoint — Autorização', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'falhas',
      nome: 'Falhas reais',
      etapas: [
        { titulo: 'Diagnosticando 401 em produção', duracao: 40 },
        { titulo: 'Diagnosticando 403 e permissões', duracao: 40 },
        { titulo: 'Token expirado e renovação no cliente', duracao: 45 },
        { titulo: 'Usuário sem permissão: o que retornar?', duracao: 35 },
        { titulo: 'Checkpoint final — Auth', duracao: 50, tipo: 'prova' }
      ]
    }
  ]
});
