Plataforma.registrarLicao({
  id: 'engenharia-ia-02',
  trilha: 'engenharia-ia',
  tipo: 'licao',
  titulo: 'Investigar consultas antes de usar cache',
  duracaoMin: 25,
  xp: 30,
  objetivos: [
    'Reconhecer o padrão N+1 (uma consulta inicial mais uma por item) numa listagem lenta',
    'Medir consultas, volume e tempo antes de decidir por cache',
    'Listar o que um cache exige: chave por usuário, expiração e remoção da cópia antiga'
  ],
  conceitos: ['engenharia-ia.cache', 'engenharia-ia.performance'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'Termos antes do cenário',
      blocos: [
        { tipo: 'futuro', conceitos: ['redis.cache','redis.invalidacao'], titulo: 'Onde aprofundar', texto: 'Aqui você só decide se o cache vale a pena. A trilha de Redis mostra como implementar o cache e a invalidação (remover a cópia antiga quando o dado muda).' },
        { tipo: 'conceito', id: 'engenharia-ia.cache', titulo: 'Cache', texto: 'Cache é uma cópia de um dado guardada para ser reutilizada numa leitura futura, evitando refazer o trabalho de buscá-lo. A cópia pode ficar desatualizada, por isso o cache tem prazo de validade (expiração) e a fonte original continua sendo a referência.', exemplo: 'A lista de categorias muda uma vez por semana: guardá-la por 10 minutos economiza consultas ao banco.' },
        { tipo: 'glossario', titulo: 'Termos desta etapa', itens: [
          ['fonte original', 'onde está o dado de verdade', 'O banco de dados ou serviço que decide qual é a informação correta; o cache é só uma cópia dele.'],
          ['expiração', 'prazo da cópia', 'Tempo depois do qual a cópia é descartada e o dado volta a ser buscado na fonte original.'],
          ['invalidação', 'remover a cópia antiga', 'Apagar ou renovar a cópia quando o dado original muda, antes de ela expirar.'],
          ['latência', 'tempo de resposta', 'Quanto tempo passa entre pedir algo e receber a resposta.'],
          ['projeção', 'selecionar só os campos necessários', 'Pedir ao banco apenas as colunas que a tela usa, em vez do registro inteiro.'],
          ['paginação', 'dividir em páginas', 'Devolver os resultados em blocos (por exemplo 20 por vez) em vez de todos de uma vez.']
        ] }
      ]
    },
    {
      introduz: ['redis.cache'],
      tipo: 'atividade',
      atividade: {
        id: 'engenharia-ia-02-bases',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Associe cada termo à situação que ele descreve numa tela de pedidos.',
        pares: [
          ['Cache', 'A lista de categorias é guardada em memória para não ir ao banco a cada tela'],
          ['Fonte original', 'O banco de dados, que decide qual preço é o correto'],
          ['Expiração', 'Após 10 minutos a cópia da lista é descartada e buscada de novo'],
          ['Remoção da cópia', 'O preço mudou, então a cópia antiga é apagada na hora'],
          ['Projeção', 'A consulta traz só nome e total do pedido, não todas as colunas']
        ],
        conceitos: ['engenharia-ia.cache'],
        dicas: ['Releia o glossário: cada termo responde a uma pergunta diferente (onde está, quando vence, quando se apaga).', 'Expiração acontece pelo tempo; a remoção da cópia acontece por uma mudança no dado.'],
        explicacao: 'Cache é a cópia, a fonte original é a referência, a expiração limita a idade da cópia e a remoção a apaga quando o dado muda.'
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Investigar consultas antes de usar cache',
      blocos: [
        { tipo: 'conceito', id: 'engenharia-ia.performance', titulo: 'Diagnóstico de performance', texto: 'Diagnóstico de performance usa medições (número de consultas, volume de dados, tempo) para localizar onde está o custo, antes de mudar qualquer coisa. Cache só entra depois, como uma das opções.', exemplo: 'Uma listagem de 100 pedidos que faz 101 consultas ao banco tem o padrão N+1.' },
        { tipo: 'texto', texto: '**N+1:** a tela busca a lista de pedidos (1 consulta) e depois o cliente de cada pedido separadamente (N consultas). O total cresce com a quantidade de pedidos.' },
        { tipo: 'texto', texto: '**Como investigar:** conte as consultas por requisição, observe tempo e volume, restrinja os campos (projeção) e aplique paginação. Em Entity Framework Core, uma projeção traz na própria consulta os campos necessários. Compare antes e depois com o mesmo volume de dados.' },
        { tipo: 'texto', texto: '**Quando evitar cache:** como primeira resposta a consultas mal feitas, ou para permissões que precisam refletir uma revogação imediatamente. Quando usar, defina a tolerância a dado antigo e separe a chave por usuário.' },
        { tipo: 'trabalho', texto: 'Antes de instalar Redis, investigue a consulta repetida, a projeção e a paginação. Só depois avalie se ainda sobra um custo repetitivo que justifique cache e como invalidá-lo.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'engenharia-ia-02-decisao',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'A tela de pedidos demora 3 segundos. O log mostra 1 consulta à lista e mais 100 consultas, uma por pedido, para buscar o cliente.',
        enunciado: 'Qual investigação vem primeiro?',
        opcoes: [
          'Medir e reduzir as consultas repetidas, trazendo os clientes na própria consulta, antes de pensar em cache',
          'Guardar a resposta inteira da tela numa única chave de cache compartilhada entre todos os usuários',
          'Aumentar o tempo de expiração do cache para uma hora, sem medir quanto ele economizaria',
          'Aumentar a memória do servidor de banco, já que a lentidão deve ser falta de recurso'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Uma chave compartilhada pode mostrar a um usuário os pedidos de outro e esconde o problema das 100 consultas.',
          2: 'Mudar a expiração sem medir não ataca a causa e aumenta o risco de dado antigo.',
          3: 'Mais recurso pode mascarar o sintoma; as 100 consultas extras continuariam existindo.'
        },
        dicas: ['O log já indica a causa: o número de consultas por requisição.', 'O cache esconderia o problema ou o resolveria na origem?'],
        explicacao: 'Diagnosticar antes de alterar permite comprovar a melhora e evita trocar um problema de consultas por um problema de consistência.',
        conceitos: ['engenharia-ia.performance']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Orientar e revisar a IA',
      blocos: [
        { tipo: 'texto', texto: '**Como pedir:** analise esta listagem sem adicionar cache de início; proponha como medir consultas, volume e latência; compare projeção com carregamento relacionado. Se sugerir cache, peça chave por usuário, expiração, remoção da cópia antiga e o comportamento quando o cache estiver indisponível.' },
        { tipo: 'texto', texto: '**Como validar:** confira o SQL gerado e a contagem de consultas; teste dois usuários com permissões diferentes; verifique se um dado atualizado aparece depois de uma escrita; compare medições em condições equivalentes.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'engenharia-ia-02-revisao',
        tipo: 'explain',
        dimensao: 'construcao',
        enunciado: 'A IA sugeriu cache para a listagem de pedidos e você precisa decidir se aceita.',
        pergunta: 'Que medições e testes você faria para validar a sugestão?',
        criterios: [
          'Contar as consultas e o tempo antes e depois da mudança.',
          'Testar dois usuários diferentes para ver se a chave isola os dados de cada um.',
          'Verificar se, após alterar um pedido, a tela mostra o dado novo (expiração e remoção da cópia).'
        ],
        palavrasChave: [
          ['consultas', 'consulta', 'tempo', 'latência', 'medi', 'medir'],
          ['usuários', 'usuário', 'chave', 'isol'],
          ['expira', 'expiração', 'invalid', 'atualiz', 'desatualiz']
        ],
        minimoChaves: 3,
        exemplo: 'Mediria o número de consultas e o tempo da tela antes e depois, com o mesmo volume de pedidos. Entraria com duas contas para ver se cada uma recebe só os seus dados, e alteraria um pedido para confirmar que a tela não continua mostrando a cópia desatualizada.',
        explicacao: 'Sem medição, não se sabe se o cache ajudou; sem teste com dois usuários e com atualização, ele pode vazar dados ou mostrar informação antiga.',
        dicas: ['Pense em três riscos: não melhorar, vazar dados entre usuários e mostrar dado velho.', 'Cada risco tem um teste simples: medir, trocar de usuário, alterar o dado.'],
        conceitos: ['engenharia-ia.performance']
      }
    }
  ]
});
