Plataforma.registrarTrilha({
  id: 'ingles',
  nome: 'Inglês: Geral + para Desenvolvedores',
  curto: 'English',
  sigla: 'EN',
  descricao: 'Do A1 ao C1 com inglês para a vida real (apresentações, viagens, trabalho) e uma área técnica conectada para desenvolvedores. As habilidades são medidas separadamente: vocabulário, gramática, listening, reading, writing e compreensão.',
  fase: 1,
  status: 'disponivel',
  transversal: true,
  acessoLivre: true,
  prerequisitos: [],
  niveis: [
    {
      id: 'a1',
      nome: 'A1 — Iniciante',
      descricao: 'Sobrevivência: apresentar-se, números, família, rotina, horas, comida, compras, lugares e perguntas básicas.',
      etapas: [
        { id: 'en-a1-00', titulo: 'Apresentações: dizendo quem você é', duracao: 30, licao: 'en-a1-00' },
        { id: 'en-a1-01', titulo: 'Números, idade e telefone', duracao: 30, licao: 'en-a1-01' },
        { id: 'en-a1-02', titulo: 'Família e pessoas', duracao: 30, licao: 'en-a1-02' },
        { id: 'en-a1-03', titulo: 'Minha rotina: falando do dia a dia', duracao: 35, licao: 'en-a1-03' },
        { id: 'en-a1-04', titulo: 'Horas, dias e datas', duracao: 35, licao: 'en-a1-04' },
        { id: 'en-a1-05', titulo: 'Comida e restaurante', duracao: 35, licao: 'en-a1-05' },
        { id: 'en-a1-06', titulo: 'Compras: preços e pagamento', duracao: 35, licao: 'en-a1-06' },
        { id: 'en-a1-07', titulo: 'Lugares, direções e transporte', duracao: 35, licao: 'en-a1-07' },
        { id: 'en-a1-08', titulo: 'Perguntas básicas e conversa informal', duracao: 35, licao: 'en-a1-08' },
        { id: 'en-a1-checkpoint', titulo: 'Checkpoint A1 — Inglês geral', duracao: 35, licao: 'en-a1-checkpoint', tipo: 'prova' }
      ]
    },
    {
      id: 'a2',
      nome: 'A2 — Básico',
      descricao: 'Contar acontecimentos, fazer planos, viajar e resolver situações do cotidiano com mais autonomia.',
      etapas: [
        { id: 'en-a2-00', titulo: 'Contando o que aconteceu: passado simples', duracao: 40, licao: 'en-a2-00' },
        { id: 'en-a2-01', titulo: 'Planos e futuro: going to e will', duracao: 40, licao: 'en-a2-01' },
        { id: 'en-a2-02', titulo: 'Viagem: aeroporto e hotel', duracao: 40, licao: 'en-a2-02' },
        { titulo: 'Experiências de vida (present perfect)', duracao: 40 },
        { titulo: 'Descrevendo pessoas e lugares', duracao: 35 },
        { titulo: 'Saúde, telefone e mensagens', duracao: 40 },
        { titulo: 'Checkpoint A2', duracao: 40, tipo: 'prova' }
      ]
    },
    {
      id: 'b1',
      nome: 'B1 — Intermediário',
      descricao: 'Opinar, explicar problemas, contar histórias, participar de reuniões e escrever e-mails profissionais.',
      etapas: [
        { titulo: 'Dar opinião: concordar e discordar', duracao: 45 },
        { titulo: 'Explicando problemas e pedindo ajuda', duracao: 40 },
        { titulo: 'Contando histórias e anedotas', duracao: 45 },
        { titulo: 'Trabalho: reuniões e e-mails', duracao: 50 },
        { titulo: 'Condicionais (if... then)', duracao: 45 },
        { titulo: 'Checkpoint B1', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'b2',
      nome: 'B2 — Intermediário avançado',
      descricao: 'Debater, negociar, apresentar projetos e escrever relatórios com clareza.',
      etapas: [
        { titulo: 'Debates e negociação', duracao: 50 },
        { titulo: 'Apresentações profissionais', duracao: 50 },
        { titulo: 'Phrasal verbs essenciais', duracao: 45 },
        { titulo: 'Relatórios e propostas', duracao: 50 },
        { titulo: 'Checkpoint B2', duracao: 45, tipo: 'prova' }
      ]
    },
    {
      id: 'c1',
      nome: 'C1 — Avançado',
      descricao: 'Nuances, argumentação, escrita executiva e comunicação em contextos complexos.',
      etapas: [
        { titulo: 'Expressões idiomáticas e nuances', duracao: 50 },
        { titulo: 'Argumentação avançada', duracao: 50 },
        { titulo: 'Escrita acadêmica e executiva', duracao: 55 },
        { titulo: 'Checkpoint C1', duracao: 50, tipo: 'prova' }
      ]
    },
    {
      id: 'developer',
      nome: 'English for Developers',
      descricao: 'Inglês técnico conectado ao que você já sabe: documentação, mensagens de erro, GitHub, tickets, reuniões, entrevistas e comunicação profissional.',
      etapas: [
        { id: 'ingles-00', titulo: 'Vocabulário essencial: request, response, database', duracao: 35, licao: 'ingles-00' },
        { id: 'ingles-01', titulo: 'Mensagens de erro e leitura técnica', duracao: 35, licao: 'ingles-01' },
        { titulo: 'Frases de reunião diária', duracao: 35 },
        { titulo: 'GitHub: issue, pull request, merge, release', duracao: 40 },
        { titulo: 'Lendo documentação da Microsoft', duracao: 45 },
        { titulo: 'Stack Overflow e READMEs', duracao: 35 },
        { titulo: 'Escrevendo issues e pull requests', duracao: 40 },
        { titulo: 'Comentários de code review', duracao: 40 },
        { titulo: 'Vagas e entrevista em inglês', duracao: 50 },
        { titulo: 'Checkpoint — English for Developers', duracao: 40, tipo: 'prova' }
      ]
    }
  ]
});
