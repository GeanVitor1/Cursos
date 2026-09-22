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
        { id: 'autenticacao-00', titulo: 'Autenticação vs autorização', duracao: 35, licao: 'autenticacao-00' },
        { id: 'autenticacao-01', titulo: 'Senhas nunca em texto puro: hash e salt', duracao: 45, licao: 'autenticacao-01' },
        { id: 'autenticacao-checkpoint-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 30, licao: 'autenticacao-checkpoint-fundamentos', tipo: 'prova' },
      ]
    },
    {
      id: 'jwt',
      nome: 'JWT na prática',
      etapas: [
        { id: 'autenticacao-02', titulo: 'O que é um JWT (por dentro)', duracao: 50, licao: 'autenticacao-02' },
        { id: 'autenticacao-03', titulo: 'Gerando o access token', duracao: 55, licao: 'autenticacao-03' },
        { id: 'autenticacao-04', titulo: 'Claims e roles dentro do token', duracao: 45, licao: 'autenticacao-04' },
        { id: 'autenticacao-05', titulo: 'Refresh token e expiração', duracao: 55, licao: 'autenticacao-05' },
        { id: 'autenticacao-checkpoint-jwt', titulo: 'Checkpoint — JWT', duracao: 45, licao: 'autenticacao-checkpoint-jwt', tipo: 'prova' },
      ]
    },
    {
      id: 'autorizacao',
      nome: 'Autorização',
      etapas: [
        { id: 'autenticacao-06', titulo: '[Authorize] em endpoints', duracao: 40, licao: 'autenticacao-06' },
        { id: 'autenticacao-07', titulo: 'Roles e policies', duracao: 50, licao: 'autenticacao-07' },
        { id: 'autenticacao-08', titulo: 'ASP.NET Identity: quando usar', duracao: 50, licao: 'autenticacao-08' },
        { id: 'autenticacao-09', titulo: 'Registro e login completos', duracao: 60, licao: 'autenticacao-09' },
        { id: 'autenticacao-checkpoint-autorizacao', titulo: 'Checkpoint — Autorização', duracao: 45, licao: 'autenticacao-checkpoint-autorizacao', tipo: 'prova' },
      ]
    },
    {
      id: 'falhas',
      nome: 'Falhas reais',
      etapas: [
        { id: 'autenticacao-10', titulo: 'Diagnosticando 401 em produção', duracao: 40, licao: 'autenticacao-10' },
        { id: 'autenticacao-11', titulo: 'Diagnosticando 403 e permissões', duracao: 40, licao: 'autenticacao-11' },
        { id: 'autenticacao-12', titulo: 'Token expirado e renovação no cliente', duracao: 45, licao: 'autenticacao-12' },
        { id: 'autenticacao-13', titulo: 'Usuário sem permissão: o que retornar?', duracao: 35, licao: 'autenticacao-13' },
        { id: 'autenticacao-checkpoint-falhas', titulo: 'Checkpoint final — Auth', duracao: 50, licao: 'autenticacao-checkpoint-falhas', tipo: 'prova' },
      ]
    }
  ]
});
