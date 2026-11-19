Plataforma.registrarLicao({
  id: 'ciber-fundamentos-00',
  trilha: 'ciber-fundamentos',
  tipo: 'licao',
  titulo: 'Da rede ao HTTPS: localizar uma falha',
  duracaoMin: 30,
  xp: 30,
  objetivos: [
    'Explicar o que fazem HTTP, DNS, TLS, IP e TCP no caminho de uma página até o navegador',
    'Distinguir falha ao alcançar o servidor (DNS, conexão, certificado) de uma resposta HTTP de recusa, como o 403',
    'Pedir à IA uma investigação por camadas e rejeitar a "correção" de desligar a validação do certificado'
  ],
  conceitos: ['ciber-fundamentos.http', 'ciber-fundamentos.dns-tls', 'ciber-fundamentos.redes'],
  etapas: [
    {
      tipo: 'conteudo',
      titulo: 'O caminho de uma página, passo a passo',
      blocos: [
        { tipo: 'texto', texto: 'Ao digitar `loja.exemplo` no navegador, vários passos acontecem antes de a página aparecer. Cada um pode falhar de um jeito diferente, e saber qual falhou evita mexer no lugar errado.' },
        { tipo: 'diagrama', arte: '1. DNS    loja.exemplo -> 203.0.113.10   (nome vira endereço)\n2. TCP    conexão com a porta 443 do servidor\n3. TLS    o servidor apresenta o certificado; o navegador valida\n4. HTTP   GET /pedidos  ->  resposta 200, 403, 404...' },
        { tipo: 'conceito', id: 'ciber-fundamentos.dns-tls', titulo: 'DNS e TLS', texto: 'DNS é o serviço que traduz um nome (loja.exemplo) em um endereço IP. TLS é o protocolo que cifra a conexão e permite ao navegador conferir, pelo certificado, se o servidor é mesmo quem diz ser. HTTPS é o HTTP trafegando dentro dessa conexão protegida por TLS.', exemplo: 'Cadeado no navegador = certificado válido para aquele nome; não significa que o site seja confiável ou que o usuário tenha permissão.' },
        { tipo: 'conceito', id: 'ciber-fundamentos.http', titulo: 'HTTP e API', texto: 'HTTP define as mensagens de requisição (método e endereço) e de resposta (código de status, como 200, 403 ou 404). Uma API web é um conjunto de operações que um programa oferece a outros programas usando essas mensagens.', exemplo: 'GET /pedidos/7 devolve 200 se o pedido existe e o usuário pode vê-lo.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ciber-fundamentos-00-bases',
        tipo: 'match-pairs',
        dimensao: 'associacao',
        enunciado: 'Associe cada elemento ao seu papel no caminho da página.',
        pares: [
          ['DNS', 'Transforma o nome do site em um endereço IP'],
          ['TLS', 'Cifra a conexão e permite validar o certificado do servidor'],
          ['HTTP', 'Define a requisição e a resposta, incluindo o código de status'],
          ['API', 'Conjunto de operações que um programa oferece a outro']
        ],
        conceitos: ['ciber-fundamentos.dns-tls', 'ciber-fundamentos.http'],
        dicas: ['Use a lista numerada: cada passo faz uma coisa só.', 'Quem converte nomes, quem protege a conexão e quem carrega o status são camadas diferentes.'],
        explicacao: 'DNS resolve nomes, TLS protege e autentica a conexão, HTTP carrega pedidos e respostas e a API é o contrato de operações entre programas.'
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Da rede ao HTTPS: localizar uma falha',
      blocos: [
        { tipo: 'conceito', id: 'ciber-fundamentos.redes', titulo: 'Camadas e localização de falhas', texto: 'IP identifica um destino na rede; TCP fornece transporte confiável entre portas; DNS traduz nomes em endereços; HTTP define as mensagens de aplicação; HTTPS protege o HTTP com TLS. Para investigar, descubra em qual camada o problema aparece.', exemplo: 'Nome não resolve = DNS. Conexão recusada ou expirada = transporte. Aviso de certificado = TLS. Código 4xx ou 5xx = aplicação respondeu.' },
        { tipo: 'texto', texto: '**Por que importa:** uma página que não abre pode falhar na resolução do nome, no transporte, na validação do certificado ou na própria aplicação. Alterar código sem localizar a camada pode não resolver nada.' },
        { tipo: 'texto', texto: '**Quando evitar:** TLS não verifica se um usuário pode acessar um pedido e não corrige vulnerabilidade da aplicação. DNS não entrega o conteúdo da página.' },
        { tipo: 'nota', tom: 'atencao', texto: 'Um 403 normalmente vem da aplicação, mas um proxy, firewall de aplicação (WAF) ou CDN no caminho também pode responder 403. Confira nos cabeçalhos da resposta quem a enviou antes de concluir que a causa é a permissão da aplicação.' },
        { tipo: 'trabalho', texto: 'Laboratório local: abra as ferramentas de rede do navegador nesta plataforma e observe método, status e duração de um arquivo. Desligue a rede pelo próprio navegador, recarregue e compare o erro de transporte com uma resposta HTTP. Não teste sistemas de terceiros.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ciber-fundamentos-00-decisao',
        tipo: 'scenario',
        dimensao: 'aplicacao',
        cena: 'Um usuário abre a página de pedidos da empresa e recebe o código 403 (acesso proibido). O nome do site resolve e o certificado é válido.',
        enunciado: 'O que você investiga primeiro?',
        opcoes: [
          'Se a política de acesso da aplicação (ou um proxy/WAF na frente dela) está recusando esse usuário',
          'Se o registro DNS do site foi apagado, já que a página não carregou como esperado',
          'Se o certificado TLS expirou, porque a conexão deve ter sido recusada',
          'Se o protocolo TCP precisa ser trocado por outro mais rápido'
        ],
        correta: 0,
        feedbackErro: {
          1: 'Se o DNS tivesse falhado, o navegador nem alcançaria o servidor; um 403 já é uma resposta HTTP.',
          2: 'Um certificado expirado gera aviso do navegador antes de qualquer resposta HTTP.',
          3: 'TCP não decide quem pode ver uma página; trocar o transporte não altera a permissão.'
        },
        dicas: ['Receber um código HTTP significa que a conexão e o TLS funcionaram.', 'Quem decide "pode ou não pode" é a política de acesso, não o DNS nem o certificado.'],
        explicacao: 'O 403 mostra que houve resposta: a conexão funcionou e algo recusou o acesso. Compare com a política esperada, pois negar pode ser o comportamento correto.',
        conceitos: ['ciber-fundamentos.redes']
      }
    },
    {
      tipo: 'conteudo',
      titulo: 'Orientar e revisar a IA',
      blocos: [
        { tipo: 'texto', texto: '**Como pedir:** ajude a investigar uma falha de acesso em ambiente local; organize hipóteses por DNS, transporte, certificado e HTTP; peça uma evidência por camada; não sugira desabilitar a validação de certificado como correção.' },
        { tipo: 'texto', texto: '**Como validar:** veja se a proposta distingue falha de conexão de resposta HTTP. Nunca publique tokens capturados e não aceite "ignorar certificado" como solução permanente.' }
      ]
    },
    {
      tipo: 'atividade',
      atividade: {
        id: 'ciber-fundamentos-00-revisao',
        tipo: 'explain',
        dimensao: 'construcao',
        enunciado: 'A IA propôs, para um site que mostra erro de certificado, adicionar uma opção que ignora a validação do certificado.',
        pergunta: 'Por que isso não é uma boa correção e o que você verificaria no lugar?',
        criterios: [
          'Explicar que ignorar o certificado tira a garantia de que se fala com o servidor certo.',
          'Citar o que verificar no certificado (validade, nome do site, emissor).',
          'Propor corrigir ou renovar o certificado, e não desligar a validação.'
        ],
        palavrasChave: [
          ['certificado', 'certificados'],
          ['validade', 'expirou', 'expirado', 'nome', 'emissor'],
          ['renovar', 'renovação', 'corrigir', 'instalar', 'substituir']
        ],
        minimoChaves: 3,
        exemplo: 'Ignorar a validação deixa qualquer pessoa no caminho se passar pelo servidor. Eu olharia se o certificado venceu, se foi emitido para o nome certo e por quem, e então pediria a renovação ou a instalação do certificado correto em vez de desligar a checagem.',
        explicacao: 'A validação do certificado é o que garante falar com o servidor legítimo; a correção é consertar o certificado, não remover a checagem.',
        dicas: ['O que o navegador estaria deixando de garantir se a checagem fosse ignorada?', 'Um certificado tem data de validade e um nome de site; qual dos dois pode estar errado?'],
        conceitos: ['ciber-fundamentos.dns-tls']
      }
    }
  ]
});
