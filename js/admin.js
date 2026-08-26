// Sugiere automáticamente el siguiente ID disponible,
// mirando lo que ya existe en data.js
const idSugerido = document.getElementById("id-sugerido");
const maxId = directorio.reduce((max, item) => Math.max(max, item.id), 0);
idSugerido.value = maxId + 1;

const form = document.getElementById("form-oficio");
const resultado = document.getElementById("resultado");
const codigo = document.getElementById("codigo");
const btnCopiar = document.getElementById("btn-copiar");

function escaparComillas(texto){
  return texto.replace(/"/g, '\\"');
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = idSugerido.value.trim() || (maxId + 1);
  const nombre = document.getElementById("nombre").value.trim();
  const empresa = document.getElementById("empresa").value.trim();
  const categoria = document.getElementById("categoria").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const foto = document.getElementById("foto").value.trim();

  const bloque =
`  {
    id: ${id},
    nombre: "${escaparComillas(nombre)}",
    empresa: "${escaparComillas(empresa)}",
    categoria: "${escaparComillas(categoria)}",
    descripcion: "${escaparComillas(descripcion)}",
    foto: "images/${foto}",
    telefono: "${escaparComillas(telefono)}"
  },`;

  codigo.textContent = bloque;
  resultado.style.display = "block";
  resultado.scrollIntoView({ behavior: "smooth", block: "start" });
});

btnCopiar.addEventListener("click", () => {
  navigator.clipboard.writeText(codigo.textContent).then(() => {
    btnCopiar.textContent = "¡Copiado!";
    setTimeout(() => { btnCopiar.textContent = "Copiar código"; }, 1500);
  });
});
