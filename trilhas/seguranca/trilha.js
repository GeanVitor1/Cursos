Plataforma.registrarTrilha({
  id: 'seguranca',
  nome: 'Segurança de Aplicações',
  curto: 'Segurança',
  sigla: 'SEC',
  descricao: 'OWASP básico aplicado ao dia a dia: SQL Injection, XSS, CSRF, CORS, segredos fora do código, validação de entrada e exposição de dados sensíveis.',
  fase: 4,
  status: 'planejada',
  prerequisitos: [{ trilha: 'aspnet', min: 100 }],
  niveis: [
    {
      id: 'fundamentos',
      nome: 'Fundamentos',
      etapas: [
        { titulo: 'Segurança é requisito, não enfeite', duracao: 35 },
        { titulo: 'Validação de entrada e dados sensíveis', duracao: 40 },
        { titulo: 'Segredos fora do código: secrets e Key Vault', duracao: 40 },
        { titulo: 'Checkpoint — Fundamentos', duracao: 35, tipo: 'prova' }
      ]
    },
    {
      id: 'ataques',
      nome: 'Ataques comuns (OWASP)',
      etapas: [
        { titulo: 'SQL Injection: como o ORM ajuda e onde ele não salva', duracao: 45 },
        { titulo: 'XSS: quando o problema está na saída', duracao: 40 },
        { titulo: 'CSRF e CORS: confundir é perigoso', duracao: 45 },
        { titulo: 'Exposição de dados e mensagens de erro', duracao: 40 },
        { titulo: 'Checkpoint — OWASP', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'pratica',
      nome: 'Segurança na prática',
      etapas: [
        { titulo: 'Hash de senha: por que nunca texto puro', duracao: 45 },
        { titulo: 'Revisando código com olhar de segurança', duracao: 45 },
        { titulo: 'Checklist de pull request seguro', duracao: 35 },
        { titulo: 'Checkpoint final — Segurança', duracao: 45, tipo: 'prova' }
      ]
    }
  ]
});
