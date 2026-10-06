const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const contexto = vm.createContext({ window: {} });
function carregar(arquivo) { vm.runInContext(fs.readFileSync(arquivo, 'utf8'), contexto, { filename: arquivo }); }
carregar('app/js/nucleo/registro.js');
contexto.P = contexto.Plataforma = contexto.window.Plataforma;
for (const arquivo of ['app/js/ui/dom.js', 'app/js/atividades/base.js', 'app/js/atividades/codigo.js', 'app/js/atividades/idiomas.js', 'data/manifest.js']) carregar(arquivo);
const P = contexto.Plataforma;
for (const trilha of P.interno.manifesto.trilhas) for (const arquivo of trilha.licoes) carregar(path.resolve('app', arquivo));
const atividades = Object.values(P.interno.licoes).flatMap(l => (l.etapas || []).flatMap(e => e.atividade || []));
const porId = Object.fromEntries(atividades.map(a => [a.id, a]));
const escrita = P.atividades.validarEscrita;
const lacuna = P.atividades.aceitaLacuna;
const modelo = s => s.replace(/\[(seu nome|nome)\]/g, 'Ana').replace(/\[sua idade\]/g, 'twenty');
function conferir(id, validas, invalidas = []) {
  const a = typeof id === 'object' ? id : porId[id];
  assert.ok(a, id + ': atividade encontrada');
  id = a.id;
  for (const texto of validas) assert.equal(escrita(a, texto), true, id + ': válida: ' + texto);
  for (const texto of invalidas) assert.equal(escrita(a, texto), false, id + ': inválida: ' + texto);
}

test('todos os modelos e todas as variantes de escrita e preenchimento das 130 lições', () => {
  let variantes = 0;
  const contagem = {};
  for (const a of atividades) {
    if (!['write-code', 'fill-code'].includes(a.tipo)) continue;
    contagem[a.tipo] = (contagem[a.tipo] || 0) + 1;
    if (a.tipo === 'write-code') {
      for (const resposta of a.respostasAceitas) {
        const valor = modelo(resposta);
        conferir(a, [valor, '  ' + valor + '  '], ['', 'ZZZ_INVALIDO_987']);
        variantes += 2;
        if (a.trilha === 'ingles') { conferir(a, [valor.toUpperCase(), valor.replace(/'/g, '’').replace(/ /g, '   ')]); variantes += 2; }
      }
    } else a.lacunas.forEach((aceitos, i) => {
      for (const valor of aceitos) {
        assert.equal(lacuna(a, i, valor), true, a.id + ': ' + valor);
        assert.equal(lacuna(a, i, '  ' + valor + '  '), true, a.id + ': espaços externos');
        variantes += 2;
        if (['ingles', 'sql'].includes(a.trilha)) {
          assert.equal(lacuna(a, i, valor.toUpperCase()), true, a.id + ': maiúsculas');
          variantes++;
        }
      }
      assert.equal(lacuna(a, i, ''), false, a.id + ': vazia');
      assert.equal(lacuna(a, i, 'ZZZ_INVALIDO_987'), false, a.id + ': sem relação');
    });
  }
  assert.deepEqual(contagem, { 'fill-code': 122, 'write-code': 124 });
  console.log('Modelos/variantes exercitados:', variantes, contagem);
});

test('todas as consultas SQL aceitam caixa, formatação, comentários e cedilhas em identificadores', () => {
  for (const a of atividades.filter(a => a.trilha === 'sql' && a.tipo === 'write-code')) {
    for (const valor of a.respostasAceitas) {
      const tokens = valor.match(/'(?:[^']|'')*'|[^']+/g);
      function foraDasAspas(fn) { return tokens.map(t => t.startsWith("'") ? t : fn(t)).join(''); }
      const minuscula = foraDasAspas(t => t.toLowerCase());
      const maiuscula = foraDasAspas(t => t.toUpperCase());
      const acentuada = foraDasAspas(t => t.replace(/preco/gi, 'Preço').replace(/posicao/gi, 'Posição').replace(/idx_clientes_cidade/gi, 'Ídx_clientes_cidade'));
      const espacada = foraDasAspas(t => t.replace(/\s+/g, ' \n ').replace(/([(),=<>])/g, ' $1 '));
      conferir(a, [minuscula, maiuscula, acentuada, acentuada.normalize('NFD'), valor.replace(/;?\s*$/, ';'), '/* resposta */ ' + valor + '\n-- fim']);
      // Espaços não podem separar os caracteres de um operador composto.
      conferir(a, [espacada.replace(/<\s+>/g, '<>').replace(/<\s+=/g, '<=').replace(/>\s+=/g, '>=')]);
      const numero = valor.match(/\b\d+\b/);
      if (numero) {
        const antes = valor.slice(0, numero.index);
        const exigeInteiro = /\b(top|limit|offset)\s*$/i.test(antes) || /\b(n?varchar|n?char)\s*\(\s*$/i.test(antes);
        conferir(a, [antes + '0' + numero[0] + (exigeInteiro ? '' : '.00') + valor.slice(numero.index + numero[0].length)]);
        conferir(a, [], [valor.slice(0, numero.index) + (Number(numero[0]) + 1) + valor.slice(numero.index + numero[0].length)]);
      }
      if (tokens.some(t => t.startsWith("'"))) conferir(a, [], [tokens.map(t => t.startsWith("'") ? "'VALOR_ERRADO'" : t).join('')]);
      conferir(a, [], ['ZZZ ' + valor, valor.replace(/\b(from|into|set|create)\b/i, 'ERRO')]);
    }
  }
});

test('a resposta exata enviada pelo aluno e INSERT com outra ordem correta', () => {
  conferir('sql12-a3', [
    "insert into produtos (Nome , Preço) values ('Teclado',200);",
    "INSERT INTO [Produtos] ([Nome], [Preço]) VALUES ('Teclado', 200.00);",
    "insert into produtos (preço,nome) values(200,'Teclado')",
    "insert into produtos (Nome , Preço) values ('Teclado',200)"
  ], [
    "insert into produtos (Nome, Preço) values ('Mouse',200)",
    "insert into produtos (Nome, Preço) values ('Teclado',201)",
    "insert into produtos (Nome, Preço) values (200,'Teclado')",
    "insert into produtos (Nome, Preço) values ('Teclado','200')",
    "insert into produtos (Nome, Preços) values ('Teclado',200)",
    "insert into produtos (Nome, Preço) values ('Tec lado',200)"
  ]);
});

test('SQL permite aliases sem AS, tipos de JOIN equivalentes e ordenação padrão', () => {
  conferir('sql17-a4', ['select c.Nome,p.ValorTotal from Clientes c inner join Pedidos p on p.ClienteId=c.Id;']);
  conferir('sql15-a3', ['SELECT Clientes.Nome, Pedidos.ValorTotal FROM Clientes LEFT OUTER JOIN Pedidos ON Pedidos.ClienteId=Clientes.Id']);
  conferir('sql37-a1', ['select nome, estoque from produtos where estoque < 5 order by estoque asc;']);
  conferir('sql05-a7', ["select * from pedidos where status != 'Cancelado' and valortotal between 100 and 1000"]);
  conferir('sql08-a4', [], ['select top 5 * from produtos order by preco desc']);
  conferir('sql02-a7', [], ['select ASC Nome, Preco from Produtos', 'SELECTNome, Preco FROM Produtos']);
  conferir('sql02-a7', [], ['SELECT AS Nome, Preco FROM Produtos']);
  conferir('sql06-a5', [], ['SELECT Nome, Preco FROM Produtos ORDER BY AS Preco DESC']);
  conferir('sql06-a6', [], ['SELECT * FROM Clientes ORDER BY ASC Nome', 'SELECT * FROM Clientes ORDER BY Nome ASC ASC']);
  conferir('sql31-a5', [], ['create procedure buscarporcidade @cidade varchar(60.00) as select * from clientes where cidade=@cidade']);
  conferir('sql11-a4', [], ['update Produtos set Preco=250']);
  conferir('sql23-a4', [';WITH Caros AS (SELECT * FROM Produtos WHERE Preco > 500) SELECT Nome FROM Caros;;']);
  conferir('sql32-a4', ['BEGIN TRANSACTION; UPDATE Contas SET Saldo=Saldo-100 WHERE Id=1; UPDATE Contas SET Saldo=Saldo+100 WHERE Id=2; COMMIT;']);
});

test('consultas completas mostradas na explicação também são aceitas pelo gabarito SQL', () => {
  let consultas = 0;
  for (const a of atividades.filter(a => a.trilha === 'sql' && a.tipo === 'write-code')) {
    const exemplos = (a.explicacao.match(/`([^`]+)`/g) || []).map(t => t.slice(1, -1));
    for (const s of exemplos.filter(t => /^(select|insert|update|delete|with|create|begin)\b/i.test(t) && t.trim().endsWith(';'))) {
      conferir(a, [s]); consultas++;
    }
  }
  assert.ok(consultas >= 40, 'comparação do gabarito com outra fonte de resposta');
});

test('C# aceita nomes locais de lambdas, var, expressão de retorno e ordem de propriedades', () => {
  conferir('lq01-a3', ['var resultado = produtos.Where(produto => produto.Estoque < 10).ToList();', 'var resultado = produtos.Where((x) => x.Estoque < 10).ToList();'], ['var resultado = produtos.Where(x => p.Estoque < 10).ToList();', 'var resultado = produtos.where(p => p.Estoque < 10).ToList();']);
  conferir('lq02-a4', ['produtos.Where(x => x.Ativo).Select(produto => produto.Nome).ToList();'], ['produtos.Where(x => x.Ativo).Select(x => x.Preco).ToList();']);
  conferir('ef03-a4', ['await context.Produtos.Where(x => x.Ativo).ToListAsync();'], ['context.Produtos.Where(x => x.Ativo).ToListAsync();']);
  conferir('cs02-a3', ['public decimal CalcularTotal(decimal preco, int quantidade) => preco * quantidade;', 'public decimal CalcularTotal(decimal preco, int quantidade) { decimal total = preco * quantidade; return total; }']);
  conferir('cs00-a5', ['public class Cliente { public bool Ativo { get; set; } public string Telefone { get; set; } public int Id { get; set; } public string Email { get; set; } public string Nome { get; set; } }'], ['public class Cliente { public int Id { get; set; } }']);
  conferir('cs01-a4', ['if (preco > 100) precoFinal = preco * 0.90M;'], ['if (preco > 100) precoFinal = preco * 0.9;', 'if (preco < 100) precoFinal = preco * 0.9m;']);
  for (const [id, i, certa, errada] of [['redis04-a3', 0, 'Serialize', 'serialize'], ['redis04-a3', 1, 'Deserialize', 'deserialize'], ['redis06-a1', 0, 'AddStackExchangeRedisCache', 'addstackexchangerediscache'], ['ef02-a3', 0, 'Add', 'add'], ['api02-a3', 0, 'MapGet', 'mapget']]) {
    assert.equal(lacuna(porId[id], i, certa), true, id + ': API correta');
    assert.equal(lacuna(porId[id], i, errada), false, id + ': API inexistente');
  }
});

test('Docker aceita ordem de flags e formas longas; mantém imagem, portas e variáveis corretas', () => {
  conferir('docker03-a6', ['docker run -p 8080:80 -d minha-api', 'docker run --publish=8080:80 --detach minha-api'], ['docker run -d -p 80:8080 minha-api', 'docker run -d -p 8080:80 minha - api', 'docker run -d minha-api', 'docker run minha-api -d -p 8080:80']);
  conferir('docker05-a6', ['docker run -e "ASPNETCORE_ENVIRONMENT=Development" -d minha-api', 'docker run --env=ASPNETCORE_ENVIRONMENT=Development --detach minha-api'], ['docker run -d -e aspnetcore_environment=development minha-api']);
  conferir('docker02-a5', ['docker build . --tag minha-api']);
  conferir('cp-docker-pr10', ['docker compose up --build --detach']);
  conferir('docker08-a7', ['- ASPNETCORE_ENVIRONMENT=Development'], ['- aspnetcore_environment=development']);
});

test('Git aceita quebras de linha, ponto e vírgula e mensagens livres; não concatena comandos', () => {
  conferir('cp-git-f9', ['git add .; git commit -m "Ajusta frete"; git push origin main', "git add . && git commit -m 'Correção do frete' && git push origin main"], ['git add . git commit -m "Ajusta frete" git push origin main', 'git add .; git commit -m ""; git push origin main', 'git add .; git commit -m "   "; git push origin main', 'git add .; git commit -m "Frete"; git push origin errado']);
  conferir('cp-git-p10', ['git tag -a v2.2.0 -m "Nova versão"\ngit push origin v2.2.0'], ['git tag -a v2.2.0 -m "Nova versão" git push origin v2.2.0']);
  conferir('git02-a6', ['git checkout -b feature/preco'], ['git switch -c feature/novo']);
  assert.equal(lacuna(porId['git07-a3'], 0, '--hard'), false);
  assert.equal(lacuna(porId['git07-a3'], 0, '- -soft'), false);
});

test('Redis aceita caixa do comando e aspas equivalentes; valor e chave são preservados', () => {
  conferir('cp-redis-f8', ['set produto:10 Mouse ex 60', "SeT produto:10 'Mouse' Ex 60"], ['SET produto:10 "Teclado" EX 60', 'SET produto:10 "Mouse" EX 61', 'SET Produto:10 "Mouse" EX 60', 'SET produto:10 "Mouse"']);
  assert.equal(lacuna(porId['redis01-a2'], 0, 'SET'), true);
  assert.equal(lacuna(porId['cp-redis-f3'], 0, 'EX'), true);
});

test('Inglês aceita nomes, idades, contrações, apóstrofo tipográfico e espaços', () => {
  conferir('en-a1-00-a5', ['HELLO! MY NAME’S João. NICE TO MEET YOU.'], ['Hello, my name is João.']);
  conferir('en-a1-01-a5', ['I’m 25 years old.', 'I AM   thirty-two   YEARS OLD.'], ['I 25 years old.', 'I am old.']);
  conferir('en-a1-cp9', ['Hi! My name is Gean. I’m 25 years old. I’m from Brazil.']);
  conferir('en-a1-cp9', ['Hi! My name’s Ana. I’m thirty years old. I’m from Brazil.'], ['My name is. I am years old from.']);
  conferir('en-a1-03-a5', ['I work at nine.\nI study at night.', 'I work at nine\nI study at night']);
  conferir('en-a1-05-a5', ['I’d like a coffee, please.'], ['I would like a coffee.']);
  conferir('en-a1-06-a5', ['What’s the price? Can I pay with a credit card?']);
  conferir('en-a1-06-a5', ['What is the price of this jacket? May I use a debit card?', 'How much is the bag? Do you accept credit cards?', 'How much is it? Can I pay using a card?'], ['What is the price? I will pay in cash.']);
  conferir('en-a1-07-a5', ['Where’s the airport? I take the bus.']);
  conferir('en-a2-01-a5', ['Next week I’m going to study. I’m also going to work.']);
  conferir('en-a2-01-a5', ['Next week I’m going to study and I’m going to work.'], ['Next week I’m going to study.', 'Next week going to. going to.']);
});

test('transcrições numéricas mantêm os dígitos e horários aceitam zero à esquerda', () => {
  for (const a of atividades.filter(a => a.tipo === 'listening' && a.modo === 'escrever')) {
    assert.equal(P.atividades.validarAudio(a, ' ' + a.resposta + ' '), true, a.id);
    assert.equal(P.atividades.validarAudio(a, a.resposta + '0'), false, a.id);
  }
  const horario = porId['en-a1-04-a3'];
  for (const s of ['6:45', '06:45', '6 : 45']) assert.equal(P.atividades.validarAudio(horario, s), true);
  for (const s of ['645', '6.45', '6:46', '16:45']) assert.equal(P.atividades.validarAudio(horario, s), false);
});
