/*
  ============================================================
  BASE DE DATOS DEL DIRECTORIO
  ============================================================
  Aquí es donde vive toda la información de los oficios
  inscritos. No hay conexión a internet ni base de datos
  externa: este archivo ES la base de datos.

  Para inscribir a alguien nuevo:
  1. Abre admin.html en tu navegador
  2. Llena el formulario
  3. Da clic en "Generar código"
  4. Copia el bloque que aparece y pégalo aquí abajo,
     dentro de los corchetes [ ... ], después del último
     objeto (no olvides la coma "," antes de pegar)
  5. Guarda este archivo y sube los cambios a GitHub

  Cada oficio es un objeto con estos campos:
  - id: un número único (no repetir)
  - nombre: nombre de la persona
  - empresa: nombre del negocio o empresa
  - categoria: el oficio (ej: "Soldador", "Carpintero")
  - descripcion: una descripción corta de lo que hace
  - foto: la ruta a la foto dentro de la carpeta images/
  - telefono: número de contacto (opcional, se usa para WhatsApp)
  ============================================================
*/

const directorio = [
  {
    id: 1,
    nombre: "Kevin Aguirre",
    empresa: "Program P",
    categoria: "Programador",
    descripcion: "Programación, páginas web, diseño y desarrollo digital. Soluciones rápidas, modernas y funcionales.",
    foto: "images/kevin.png",
    telefono: "3124602312"
  },
  
];
