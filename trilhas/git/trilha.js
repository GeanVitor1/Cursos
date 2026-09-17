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
        { id: 'git-00', titulo: 'clone, add e commit', duracao: 40, licao: 'git-00' },
        { id: 'git-01', titulo: 'push, pull e o fluxo diário', duracao: 35, licao: 'git-01' },
        { id: 'git-cp-fundamentos', titulo: 'Checkpoint — Fundamentos', duracao: 30, licao: 'git-checkpoint-fundamentos', tipo: 'prova' }
      ]
    },
    {
      id: 'colaboracao',
      nome: 'Colaboração',
      etapas: [
        { id: 'git-02', titulo: 'Branches na prática', duracao: 45, licao: 'git-02' },
        { id: 'git-03', titulo: 'Merge', duracao: 40, licao: 'git-03' },
        { id: 'git-04', titulo: 'Pull request e code review', duracao: 50, licao: 'git-04' },
        { id: 'git-05', titulo: 'Conflito: você e outro dev na mesma linha', duracao: 55, licao: 'git-05' },
        { id: 'git-cp-colaboracao', titulo: 'Checkpoint — Colaboração', duracao: 45, licao: 'git-checkpoint-colaboracao', tipo: 'prova' }
      ]
    },
    {
      id: 'correcoes',
      nome: 'Corrigindo erros',
      etapas: [
        { id: 'git-06', titulo: 'revert: desfazendo com segurança', duracao: 40, licao: 'git-06' },
        { id: 'git-07', titulo: 'reset: entendendo os modos', duracao: 45, licao: 'git-07' },
        { id: 'git-08', titulo: 'stash: guardando trabalho temporário', duracao: 35, licao: 'git-08' },
        { id: 'git-09', titulo: '.gitignore bem feito', duracao: 30, licao: 'git-09' },
        { id: 'git-cp-correcoes', titulo: 'Checkpoint — Correções', duracao: 40, licao: 'git-checkpoint-correcoes', tipo: 'prova' }
      ]
    },
    {
      id: 'profissional',
      nome: 'Fluxo profissional',
      etapas: [
        { id: 'git-10', titulo: 'Git Flow, trunk-based e o que o mercado usa', duracao: 45, licao: 'git-10' },
        { id: 'git-11', titulo: 'Commits que contam história', duracao: 35, licao: 'git-11' },
        { id: 'git-12', titulo: 'Tags, releases e versionamento', duracao: 40, licao: 'git-12' },
        { id: 'git-cp-profissional', titulo: 'Checkpoint final — Git', duracao: 45, licao: 'git-checkpoint-profissional', tipo: 'prova' }
      ]
    }
  ]
});
