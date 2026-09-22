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
        { id: 'seguranca-00', titulo: 'Segurança é requisito, não enfeite', duracao: 35, licao: 'seguranca-00' },
        { id: 'seguranca-01', titulo: 'Validação de entrada e dados sensíveis', duracao: 40, licao: 'seguranca-01' },
        { id: 'seguranca-02', titulo: 'Segredos fora do código: secrets e Key Vault', duracao: 40, licao: 'seguranca-02' },
        { id: 'seguranca-checkpoint-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 35, licao: 'seguranca-checkpoint-fundamentos', tipo: 'prova' },
      ]
    },
    {
      id: 'ataques',
      nome: 'Ataques comuns (OWASP)',
      etapas: [
        { id: 'seguranca-03', titulo: 'SQL Injection: como o ORM ajuda e onde ele não salva', duracao: 45, licao: 'seguranca-03' },
        { id: 'seguranca-04', titulo: 'XSS: quando o problema está na saída', duracao: 40, licao: 'seguranca-04' },
        { id: 'seguranca-05', titulo: 'CSRF e CORS: confundir é perigoso', duracao: 45, licao: 'seguranca-05' },
        { id: 'seguranca-06', titulo: 'Exposição de dados e mensagens de erro', duracao: 40, licao: 'seguranca-06' },
        { id: 'seguranca-checkpoint-ataques', titulo: 'Checkpoint — OWASP', duracao: 45, licao: 'seguranca-checkpoint-ataques', tipo: 'prova' },
      ]
    },
    {
      id: 'pratica',
      nome: 'Segurança na prática',
      etapas: [
        { id: 'seguranca-07', titulo: 'Hash de senha: por que nunca texto puro', duracao: 45, licao: 'seguranca-07' },
        { id: 'seguranca-08', titulo: 'Revisando código com olhar de segurança', duracao: 45, licao: 'seguranca-08' },
        { id: 'seguranca-09', titulo: 'Checklist de pull request seguro', duracao: 35, licao: 'seguranca-09' },
        { id: 'seguranca-checkpoint-pratica', titulo: 'Checkpoint final — Segurança', duracao: 45, licao: 'seguranca-checkpoint-pratica', tipo: 'prova' },
      ]
    }
  ]
});
