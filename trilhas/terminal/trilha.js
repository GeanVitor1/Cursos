Plataforma.registrarTrilha({
  id: 'terminal',
  nome: 'Terminal para Desenvolvedores',
  curto: 'Terminal',
  sigla: 'TERM',
  descricao: 'Só os comandos que aparecem no trabalho: navegar em pastas, rodar projetos .NET, usar Git e preparar Docker e npm — cada um no momento em que é necessário.',
  fase: 1,
  status: 'disponivel',
  prerequisitos: [],
  niveis: [
    {
      id: 'essenciais',
      nome: 'Comandos essenciais',
      etapas: [
        { id: 'terminal-00', titulo: 'Os comandos que você usa todos os dias', duracao: 30, licao: 'terminal-00' }
      ]
    }
  ]
});
