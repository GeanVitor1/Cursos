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
    limpar: limpar
  };
})(window.Plataforma);
