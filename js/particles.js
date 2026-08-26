(function(){
  const contenedor = document.getElementById('particles');
  const CANTIDAD = 28; // súbelo o bájalo si quieres más o menos densidad

  for(let i = 0; i < CANTIDAD; i++){
    const p = document.createElement('span');
    p.className = 'particle';

    const tamaño = (Math.random() * 2.5 + 1.5).toFixed(1); // 1.5px a 4px
    const izquierda = Math.random() * 100;
    const duracion = (Math.random() * 6 + 6).toFixed(1); // 6s a 12s
    const retraso = (Math.random() * 10).toFixed(1);

    p.style.width = tamaño + 'px';
    p.style.height = tamaño + 'px';
    p.style.left = izquierda + 'vw';
    p.style.top = (Math.random() * 100) + 'vh';
    p.style.animationDuration = duracion + 's';
    p.style.animationDelay = retraso + 's';

    contenedor.appendChild(p);
  }
})();