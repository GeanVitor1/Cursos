Plataforma.registrarTrilha({
  id: 'git',
  nome: 'Git & GitHub Profissional',
  curto: 'Git',
  sigla: 'GIT',
  descricao: 'Baseado em situações de trabalho: branch, merge, conflito, pull request, code review, revert, stash e fluxo de equipe.',
  fase: 2,
  status: 'disponivel',
  transversal: true,
  prerequisitos: [{ trilha: 'terminal', min: 100 }],
  niveis: [
    {
      id: 'fundamentos',
      nome: 'Fundamentos',
      etapas: [
        { titulo: 'clone, add e commit', duracao: 40 },
        { titulo: 'push, pull e o fluxo diário', duracao: 35 },
        { titulo: 'Checkpoint — Fundamentos', duracao: 30, tipo: 'prova' }
      ]
    },
    {
      id: 'colaboracao',
      nome: 'Colaboração',
      etapas: [
        { titulo: 'Branches na prática', duracao: 45 },
        { titulo: 'Merge', duracao: 40 },
        { titulo: 'Pull request e code review', duracao: 50 },
        { titulo: 'Conflito: você e outro dev na mesma linha', duracao: 55 },
        { titulo: 'Checkpoint — Colaboração', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'correcoes',
      nome: 'Corrigindo erros',
      etapas: [
        { titulo: 'revert: desfazendo com segurança', duracao: 40 },
        { titulo: 'reset: entendendo os modos', duracao: 45 },
        { titulo: 'stash: guardando trabalho temporário', duracao: 35 },
        { titulo: '.gitignore bem feito', duracao: 30 },
        { titulo: 'Checkpoint — Correções', duracao: 40, tipo: 'prova' }
      ]
    },
    {
      id: 'profissional',
      nome: 'Fluxo profissional',
      etapas: [
        { titulo: 'Git Flow, trunk-based e o que o mercado usa', duracao: 45 },
        { titulo: 'Commits que contam história', duracao: 35 },
        { titulo: 'Tags, releases e versionamento', duracao: 40 },
        { titulo: 'Checkpoint final — Git', duracao: 45, tipo: 'prova' }
      ]
    }
  ]
});
