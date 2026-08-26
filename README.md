# Directorio de Oficios · Ibagué

Página estática (HTML + CSS + JavaScript) para buscar oficios y negocios
en Ibagué. No usa base de datos en la nube ni backend: toda la
información vive en el archivo `js/data.js`, que tú editas cada vez que
inscribes a alguien nuevo.

## Estructura del proyecto

```
directorio-ibague/
├── index.html          → página pública (buscador)
├── admin.html           → herramienta para generar el código de un nuevo oficio
├── css/
│   └── style.css
├── js/
│   ├── data.js          → AQUÍ VIVEN LOS DATOS (la "base de datos")
│   ├── script.js         → lógica de búsqueda de index.html
│   └── admin.js          → lógica del generador de código
└── images/               → fotos de perfil de cada negocio
```

## Cómo inscribir a alguien nuevo

1. Pide la foto de la empresa (idealmente cuadrada) y guárdala dentro de
   la carpeta `images/`, por ejemplo `images/juan-perez.jpg`.
2. Abre `admin.html` haciendo doble clic (se abre en el navegador).
3. Llena el formulario: nombre, empresa, categoría, descripción,
   teléfono y el nombre del archivo de la foto que guardaste.
4. Da clic en **"Generar código"** y luego en **"Copiar código"**.
5. Abre `js/data.js` en Visual Studio Code.
6. Pega el bloque copiado **dentro** de los corchetes `[ ... ]`,
   justo después de la última coma del último oficio.
7. Guarda el archivo.
8. Abre `index.html` y comprueba que el nuevo oficio aparece en la
   búsqueda.
9. Sube los cambios a GitHub (`git add .`, `git commit -m "..."`,
   `git push`).

## Cómo probarlo localmente

Puedes simplemente abrir `index.html` haciendo doble clic. Si el
navegador bloquea la carga de las imágenes o los archivos JS por temas
de seguridad, usa la extensión **Live Server** de Visual Studio Code
(clic derecho sobre `index.html` → "Open with Live Server").

## Cómo publicarlo en GitHub Pages (gratis)

1. Sube esta carpeta completa a un repositorio en GitHub.
2. Entra al repositorio → **Settings** → **Pages**.
3. En "Branch", selecciona `main` y la carpeta `/ (root)`.
4. Guarda. En un par de minutos tu página quedará publicada en una
   dirección como `https://tu-usuario.github.io/nombre-del-repo/`.
5. Cada vez que subas cambios (`git push`) con nuevos oficios
   inscritos, la página publicada se actualiza sola.

## Notas

- La búsqueda no distingue mayúsculas/minúsculas ni tildes: buscar
  "ingenieria" encuentra "Ingeniería de sistemas".
- Los "chips" de categoría (los botones debajo del buscador) se generan
  solos según las categorías que existan en `data.js` — no hay que
  tocarlos a mano.
- El botón de WhatsApp solo aparece si el oficio tiene teléfono
  registrado. Si no quieres mostrar contacto, deja el campo
  `telefono` vacío (`""`) al inscribirlo.
- Si más adelante el proyecto crece mucho (cientos de inscritos,
  necesitas que la gente se registre sola, etc.) ahí sí valdría la
  pena migrar a algo como Firebase o Cloud SQL. Por ahora, con este
  enfoque no gastas nada y tienes control total.
