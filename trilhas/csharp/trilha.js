Plataforma.registrarTrilha({
  id: 'csharp',
  nome: 'C# para Backend .NET',
  curto: 'C#',
  sigla: 'C#',
  descricao: 'A base de C# que o backend realmente usa: classes, objetos, tipos, listas, null, interfaces, injeção de dependência, lambdas e async — só o que é necessário, no momento em que é necessário.',
  fase: 1,
  status: 'disponivel',
  prerequisitos: [],
  niveis: [
    {
      id: 'objetos',
      nome: 'Dados e comportamento',
      etapas: [
        { id: 'csharp-00', titulo: 'Classes e objetos: o molde dos dados', duracao: 45, licao: 'csharp-00' },
        { id: 'csharp-01', titulo: 'Variáveis, tipos e decisões', duracao: 40, licao: 'csharp-01' },
        { id: 'csharp-02', titulo: 'Métodos: ações com entrada e saída', duracao: 40, licao: 'csharp-02' },
        { id: 'csharp-03', titulo: 'Listas: vários itens na mesma variável', duracao: 40, licao: 'csharp-03' },
        { id: 'csharp-04', titulo: 'Null: quando o valor não existe', duracao: 40, licao: 'csharp-04' }
      ]
    },
    {
      id: 'design',
      nome: 'Código sustentável',
      etapas: [
        { id: 'csharp-05', titulo: 'Interfaces: o contrato antes da implementação', duracao: 40, licao: 'csharp-05' },
        { id: 'csharp-06', titulo: 'Injeção de dependência: o problema antes da solução', duracao: 45, licao: 'csharp-06' },
        { id: 'csharp-07', titulo: 'Generics e lambdas: lendo x => x.Ativo', duracao: 45, licao: 'csharp-07' }
      ]
    },
    {
      id: 'assincrono',
      nome: 'Erros e assincronismo',
      etapas: [
        { id: 'csharp-08', titulo: 'Exceções: quando algo dá errado', duracao: 40, licao: 'csharp-08' },
        { id: 'csharp-09', titulo: 'async e await: sem travar a aplicação', duracao: 45, licao: 'csharp-09' }
      ]
    }
  ]
});
