export const FUNCIONES_GENERALES = {
  queryAObjeto: (objeto) => {
    const parts = [];
    for (const key in objeto) {
      if (objeto.hasOwnProperty(key)) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(objeto[key]));
      }
    }
    return '?' + parts.join('&');
  }
};
