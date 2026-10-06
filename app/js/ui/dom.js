window.Plataforma = window.Plataforma || {};

(function (P) {
  function criar(tag, props, filhos) {
    const el = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (chave) {
      const valor = props[chave];
      if (valor == null || valor === false) return;
      if (chave === 'classe') el.className = valor;
      else if (chave === 'texto') el.textContent = valor;
      else if (chave === 'html') el.innerHTML = valor;
      else if (chave === 'dataset') Object.assign(el.dataset, valor);
      else if (chave.indexOf('on') === 0 && typeof valor === 'function') el.addEventListener(chave.slice(2), valor);
      else if (valor === true) el.setAttribute(chave, '');
      else el.setAttribute(chave, valor);
    });
    (Array.isArray(filhos) ? filhos : [filhos]).forEach(function (filho) {
      if (filho == null) return;
      el.appendChild(typeof filho === 'object' && filho.nodeType ? filho : document.createTextNode(String(filho)));
    });
    return el;
  }

  function formatar(texto) {
    if (texto == null) return '';
    const escapado = String(texto)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return escapado
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }

  function embaralhar(lista) {
    const copia = lista.slice();
    for (let i = copia.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = copia[i];
      copia[i] = copia[j];
      copia[j] = temp;
    }
    return copia;
  }

  function normalizar(texto) {
    return String(texto == null ? '' : texto)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();
  }

  function normalizarCodigo(texto) {
    return normalizar(texto)
      .replace(/;\s*$/, '')
      .replace(/\s*([=<>(),{}\[\];+\-*/%.])\s*/g, '$1')
      .replace(/\s+/g, '');
  }

  // Compara tokens sem alterar texto entre aspas ou unir identificadores distintos.
  const tokenCodigo = /'(?:[^'\\]|\\.|'')*'|"(?:[^"\\]|\\.|"")*"|[\p{L}_@][\p{L}\p{M}\p{N}_]*|\d+(?:\.\d+)?[mMdDfFlL]?|=>|==|!=|<>|<=|>=|&&|\|\||\?\?|\?\.|\S/u;
  const expressoesCodigo = {
    sql: new RegExp(/\/\*[\s\S]*?\*\/|--[^\n]*/.source + '|' + tokenCodigo.source, 'gu'),
    shell: new RegExp(/#[^\n]*/.source + '|' + tokenCodigo.source, 'gu'),
    codigo: new RegExp(/\/\*[\s\S]*?\*\/|\/\/[^\n]*/.source + '|' + tokenCodigo.source, 'gu')
  };
  function normalizarRespostaCodigo(texto, sensivelAMaiusculas, linguagem) {
    const dialeto = linguagem || (sensivelAMaiusculas ? 'codigo' : 'sql');
    const comentario = dialeto === 'sql' ? /^(\/\*|--)/ : (dialeto === 'shell' ? /^#/ : /^(\/\*|\/\/)/);
    const regex = expressoesCodigo[dialeto] || expressoesCodigo.codigo;
    const tokens = String(texto || '').normalize('NFC').match(regex) || [];
    const significativos = tokens.filter(function (t) { return !comentario.test(t); }).map(function (t) {
      if (sensivelAMaiusculas || /^["']/.test(t)) return t;
      return dialeto === 'sql' ? normalizar(t) : t.toLowerCase();
    });
    if (significativos[significativos.length - 1] === ';') significativos.pop();
    return JSON.stringify(significativos);
  }

  const palavrasSql = new Set(('select from where insert into values update set delete join inner outer left right full on as with group by having order asc desc union all distinct top limit offset exists not in is null and or between like case when then else end create table view procedure index begin commit rollback over cast varchar decimal int').split(' '));
  function normalizarSql(texto) {
    const tokens = JSON.parse(normalizarRespostaCodigo(texto, false, 'sql'));
    while (tokens[0] === ';') tokens.shift();
    while (tokens[tokens.length - 1] === ';') tokens.pop();
    const lista = [];
    let profundidade = 0;
    const ordenacoes = new Set();
    for (let i = 0; i < tokens.length; i += 1) {
      let t = tokens[i];
      if (t === '(') profundidade += 1;
      if (t === ')') { ordenacoes.delete(profundidade); profundidade -= 1; }
      if (['from', 'where', 'group', 'having', 'union', 'limit', 'offset', ';'].includes(t)) ordenacoes.delete(profundidade);
      if (t === 'order' && tokens[i + 1] === 'by') ordenacoes.add(profundidade);
      if (t === '[' && /^[\p{L}_][\p{L}\p{N}_]*$/u.test(tokens[i + 1] || '') && tokens[i + 2] === ']' && !palavrasSql.has(tokens[i + 1])) { t = tokens[i + 1]; i += 2; }
      else if (/^"[\p{L}_][\p{L}\p{M}\p{N}_]*"$/u.test(t) && !palavrasSql.has(normalizar(t.slice(1, -1)))) t = normalizar(t.slice(1, -1));
      if (t === 'inner' && tokens[i + 1] === 'join') continue;
      if (t === 'outer' && ['left', 'right', 'full'].includes(lista[lista.length - 1]) && tokens[i + 1] === 'join') continue;
      const anterior = tokens[i - 1] || '';
      const aposExpressao = [')', ']', 'end'].includes(anterior) || /^["'\d]/.test(anterior) ||
        (/^[\p{L}_][\p{L}\p{N}_]*$/u.test(anterior) && !palavrasSql.has(anterior));
      if (t === 'asc' && ordenacoes.has(profundidade) && aposExpressao) continue;
      // AS é opcional nos aliases, mas obrigatório em CTEs, views e CAST.
      if (t === 'as' && aposExpressao && /^[\p{L}_][\p{L}\p{N}_]*$/u.test(tokens[i + 1] || '') && !palavrasSql.has(tokens[i + 1]) &&
          (i + 2 === tokens.length || [',', 'from', 'join', 'inner', 'left', 'right', 'full', 'on', 'where', 'group', 'order', 'having', ';'].includes(tokens[i + 2]))) continue;
      if (t === '<>') t = '!=';
      if (/^\d+(\.\d+)?$/.test(t)) {
        const partes = t.split('.');
        const inteiroObrigatorio = ['top', 'limit', 'offset'].includes(anterior) ||
          (anterior === '(' && ['varchar', 'nvarchar', 'char', 'nchar'].includes(tokens[i - 2]));
        t = partes[0].replace(/^0+(?=\d)/, '') + (inteiroObrigatorio && partes[1] !== undefined ? '.' + partes[1] :
          (partes[1] && partes[1].replace(/0+$/, '') ? '.' + partes[1].replace(/0+$/, '') : ''));
      }
      lista.push(t);
    }
    return JSON.stringify(lista);
  }

  function normalizarCSharp(texto) {
    const tokens = JSON.parse(normalizarRespostaCodigo(texto, true, 'codigo'));
    // Métodos com uma expressão de retorno têm a mesma forma lógica de um return.
    if (tokens[0] === 'public' && tokens[1] !== 'void' && tokens[3] === '(') {
      const fechamento = tokens.indexOf(')');
      const corpo = tokens.slice(fechamento + 2);
      if (fechamento > 3 && tokens[fechamento + 1] === '=>' && corpo.length && !corpo.some(function (t) { return [';', '{', '}', 'return'].includes(t); })) {
        tokens.splice(fechamento + 1, tokens.length - fechamento - 1, '{', 'return', ...corpo, ';', '}');
      }
    }
    for (let i = 3; i < tokens.length; i += 1) {
      if (tokens[i] === '=>' && tokens[i - 1] === ')' && tokens[i - 3] === '(' && /^[\p{L}_][\p{L}\p{N}_]*$/u.test(tokens[i - 2])) {
        tokens.splice(i - 3, 3, tokens[i - 2]); i -= 2;
      }
    }
    let lambda = 0;
    for (let i = 1; i < tokens.length; i += 1) {
      if (tokens[i] !== '=>' || !/^[\p{L}_][\p{L}\p{N}_]*$/u.test(tokens[i - 1])) continue;
      const nome = tokens[i - 1], substituto = '$lambda' + lambda++;
      tokens[i - 1] = substituto;
      let profundidade = 0;
      for (let j = i + 1; j < tokens.length; j += 1) {
        const t = tokens[j];
        if (profundidade === 0 && [')', ']', '}', ',', ';'].includes(t)) break;
        if (['(', '[', '{'].includes(t)) profundidade += 1;
        if ([')', ']', '}'].includes(t)) profundidade -= 1;
        if (t === nome && tokens[j - 1] !== '.') tokens[j] = substituto;
      }
    }
    // A ordem de propriedades automáticas independentes não altera a classe.
    if (tokens.slice(0, 2).join(' ') === 'public class' && tokens[3] === '{' && tokens[tokens.length - 1] === '}') {
      const propriedades = [];
      let i = 4;
      while (tokens[i] === 'public' && ['int', 'string', 'bool', 'decimal'].includes(tokens[i + 1]) &&
          tokens.slice(i + 3, i + 10).join(' ') === '{ get ; set ; } public') {
        propriedades.push(tokens.slice(i, i + 9)); i += 9;
      }
      // Inclui a última propriedade, seguida pelo fechamento da classe.
      if (tokens[i] === 'public' && tokens.slice(i + 3, i + 9).join(' ') === '{ get ; set ; }') {
        propriedades.push(tokens.slice(i, i + 9)); i += 9;
      }
      if (i === tokens.length - 1 && propriedades.length) tokens.splice(4, i - 4, ...propriedades.sort(function (a, b) { return a[2].localeCompare(b[2]); }).flat());
    }
    return JSON.stringify(tokens.map(function (t) {
      return /^\d+\.\d+[mM]$/.test(t) ? t.replace(/0+([mM])$/, '$1').replace(/\.([mM])$/, '$1').replace(/M$/, 'm') : t;
    }));
  }

  function prepararTextoNatural(texto) {
    return String(texto || '').normalize('NFC').replace(/[\u2018\u2019\u02bc]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/[^\S\n]+/g, ' ').replace(/ *\n */g, '\n').trim();
  }

  function expandirContracoesIngles(texto) {
    return prepararTextoNatural(texto)
      .replace(/\bi'm\b/gi, 'I am')
      .replace(/\b(you|we|they)'re\b/gi, '$1 are')
      .replace(/\b(i|you|we|they)'ve\b/gi, '$1 have')
      .replace(/\b(is|are|was|were|do|does|did|have|has|had|could|should|would)n't\b/gi, '$1 not')
      .replace(/\bcan't\b/gi, 'can not').replace(/\bcannot\b/gi, 'can not').replace(/\bwon't\b/gi, 'will not')
      .replace(/\b(i|you|he|she|it|we|they)'ll\b/gi, '$1 will');
  }

  function normalizarIngles(texto) {
    return expandirContracoesIngles(texto).toLowerCase().replace(/[.,!?;:"]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function normalizarComando(texto, redis, mensagemLivre) {
    const tokens = [];
    let palavra = '', iniciou = false, aspas = null;
    function fecharPalavra() { if (iniciou) tokens.push(palavra); palavra = ''; iniciou = false; }
    const fonte = String(texto || '').replace(/\r\n?/g, '\n');
    for (let i = 0; i < fonte.length; i += 1) {
      const c = fonte[i];
      if (aspas) {
        if (c === aspas) aspas = null;
        else if (c === '\\' && aspas === '"' && ['"', '\\'].includes(fonte[i + 1])) palavra += fonte[++i];
        else palavra += c;
      } else if (c === '"' || c === "'") { aspas = c; iniciou = true; }
      else if (c === '\\' && fonte[i + 1] === '\n') i += 1;
      else if (c === '#' && !iniciou) { while (i < fonte.length && fonte[i] !== '\n') i += 1; i -= 1; }
      else if (c === ';' || c === '\n' || (c === '&' && fonte[i + 1] === '&')) {
        fecharPalavra(); if (tokens.length && tokens[tokens.length - 1] !== ';') tokens.push(';');
        if (c === '&') i += 1;
      } else if (/\s/.test(c)) fecharPalavra();
      else { palavra += c; iniciou = true; }
    }
    if (aspas) return null;
    fecharPalavra();
    if (tokens[tokens.length - 1] === ';') tokens.pop();
    if (redis) {
      const comandos = new Set(['SET', 'GET', 'DEL', 'EXPIRE', 'TTL', 'SETEX', 'PERSIST', 'MGET', 'MSET']);
      tokens.forEach(function (t, i) {
        if ((i === 0 || tokens[i - 1] === ';') && comandos.has(t.toUpperCase())) tokens[i] = t.toUpperCase();
        if (i >= 3 && tokens[0] === 'SET' && ['EX', 'PX', 'NX', 'XX', 'KEEPTTL'].includes(t.toUpperCase())) tokens[i] = t.toUpperCase();
      });
      if (tokens.length === 1 && ['EX', 'PX', 'NX', 'XX'].includes(tokens[0].toUpperCase())) tokens[0] = tokens[0].toUpperCase();
    }
    if (mensagemLivre) tokens.forEach(function (t, i) { if (t === '-m' && tokens[i + 1] && tokens[i + 1].trim() && tokens[i + 1] !== ';') tokens[i + 1] = '<mensagem>'; });
    return JSON.stringify(tokens);
  }

  function normalizarDocker(texto) {
    const normalizada = normalizarComando(texto);
    if (normalizada === null) return null;
    const tokens = JSON.parse(normalizada);
    const inicio = tokens[0] === 'docker' && ['run', 'build'].includes(tokens[1]) ? 2 :
      (tokens.slice(0, 3).join(' ') === 'docker compose up' ? 3 : 0);
    if (!inicio) return normalizada;
    const aliases = { '--detach': '-d', '--publish': '-p', '--env': '-e', '--volume': '-v', '--tag': '-t' };
    const flagsComValor = new Set(['-p', '-e', '-v', '-t']);
    const flags = [], posicionais = [];
    for (let i = inicio; i < tokens.length; i += 1) {
      let t = tokens[i];
      if (t === ';') return normalizada;
      // Tudo após a imagem de docker run pertence ao comando do container.
      if (tokens[1] === 'run' && posicionais.length) { posicionais.push(t); continue; }
      const igual = t.indexOf('=');
      const nome = igual > 0 ? t.slice(0, igual) : t;
      const flag = aliases[nome] || nome;
      if (flagsComValor.has(flag)) {
        const valor = igual > 0 ? t.slice(igual + 1) : tokens[++i];
        if (!valor || valor === ';' || valor.startsWith('-')) return normalizada;
        flags.push([flag, valor]);
      } else if (flag === '-d' || flag === '--build') flags.push([flag]);
      else if (t.startsWith('-')) return normalizada;
      else posicionais.push(t);
    }
    flags.sort(function (a, b) { return JSON.stringify(a).localeCompare(JSON.stringify(b)); });
    return JSON.stringify(tokens.slice(0, inicio).concat(flags.flat(), posicionais));
  }

  function limpar(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
  }

  P.dom = {
    criar: criar,
    el: criar,
    formatar: formatar,
    embaralhar: embaralhar,
    normalizar: normalizar,
    normalizarCodigo: normalizarCodigo,
    normalizarRespostaCodigo: normalizarRespostaCodigo,
    normalizarSql: normalizarSql,
    normalizarCSharp: normalizarCSharp,
    prepararTextoNatural: prepararTextoNatural,
    normalizarIngles: normalizarIngles,
    expandirContracoesIngles: expandirContracoesIngles,
    normalizarComando: normalizarComando,
    normalizarDocker: normalizarDocker,
    limpar: limpar
  };
})(window.Plataforma);
