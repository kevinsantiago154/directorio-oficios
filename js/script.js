/* ============================================================
   CONFIGURACIÓN
   ============================================================ */

/*
   IMPORTANTE:

   Coloca aquí el número de WhatsApp que recibirá
   las solicitudes de cotización.

   Ejemplo para Colombia:

   const WHATSAPP_COTIZACIONES = "573001234567";

   NO pongas:
   +57
   espacios
   guiones
   paréntesis

   Solo números.
*/

const WHATSAPP_COTIZACIONES = "3228198087";


/* ============================================================
   UTILIDADES
   ============================================================ */

// Quita tildes/acentos para que buscar "ingenieria" encuentre
// "ingeniería" sin importar cómo lo escriba la persona.

function normalizar(texto){

  return (texto || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}


/* ============================================================
   WHATSAPP DE PROFESIONALES
   ============================================================ */

function crearLinkWhatsApp(telefono, empresa){

  const soloNumeros =
    (telefono || "").replace(/\D/g, "");

  const mensaje =
    encodeURIComponent(
      `Hola, vi tu perfil de "${empresa}" en el Directorio de Oficios de Ibagué y quisiera más información.`
    );

  // Se asume número colombiano si no trae indicativo de país.

  const numeroConIndicativo =
    soloNumeros.length === 10
      ? `57${soloNumeros}`
      : soloNumeros;

  return `https://wa.me/${numeroConIndicativo}?text=${mensaje}`;
}


/* ============================================================
   RENDER DE TARJETAS
   ============================================================ */

const grid =
  document.getElementById("grid");

const contador =
  document.getElementById("contador");

const buscador =
  document.getElementById("buscador");

const chipsContenedor =
  document.getElementById("chips");


function crearTarjeta(item, indice){

  const card =
    document.createElement("article");

  card.className = "card";

  // Retraso en cascada.

  card.style.animationDelay =
    `${Math.min(indice * 55, 440)}ms`;


  const contactoHTML =
    item.telefono

      ? `
        <a
          class="btn-whatsapp"
          href="${crearLinkWhatsApp(
            item.telefono,
            item.empresa
          )}"
          target="_blank"
          rel="noopener"
        >
          Escribir por WhatsApp
        </a>
      `

      : `
        <span class="no-phone">
          Sin contacto registrado
        </span>
      `;


  card.innerHTML = `

    <span class="rivet-l"></span>
    <span class="rivet-r"></span>

    <div class="card-top">

      <img
        class="card-photo"
        src="${item.foto}"
        alt="Foto de ${item.empresa}"
        loading="lazy"
      >

      <div class="card-id">

        <p class="card-empresa">
          ${item.empresa}
        </p>

        <p class="card-nombre">
          ${item.nombre}
        </p>

      </div>

    </div>

    <span class="badge">
      ${item.categoria}
    </span>

    <p class="card-desc">
      ${item.descripcion}
    </p>

    <div class="card-actions">
      ${contactoHTML}
    </div>

  `;

  return card;
}


function renderizar(lista){

  grid.innerHTML = "";


  if (lista.length === 0){

    grid.innerHTML = `

      <div class="empty-state">

        <p>
          No encontramos ese oficio
        </p>

        <p>
          Prueba con otra palabra,
          o revisa que esté bien escrito.
        </p>

      </div>

    `;

  }else{

    lista.forEach(
      (item, indice) =>
        grid.appendChild(
          crearTarjeta(item, indice)
        )
    );

  }


  contador.textContent =
    `${lista.length} ${
      lista.length === 1
        ? "resultado"
        : "resultados"
    }`;
}


/* ============================================================
   FILTRO / BÚSQUEDA
   ============================================================ */

let categoriaActiva = null;


function filtrar(){

  const termino =
    normalizar(
      buscador.value.trim()
    );


  const resultado =
    directorio.filter(item => {

      const coincideTexto =
        !termino ||

        normalizar(item.nombre)
          .includes(termino) ||

        normalizar(item.empresa)
          .includes(termino) ||

        normalizar(item.categoria)
          .includes(termino);


      const coincideCategoria =
        !categoriaActiva ||
        item.categoria === categoriaActiva;


      return (
        coincideTexto &&
        coincideCategoria
      );

    });


  renderizar(resultado);
}


buscador.addEventListener(
  "input",
  filtrar
);


/* ============================================================
   CHIPS DE CATEGORÍA
   ============================================================ */

function construirChips(){

  const categorias =
    [
      ...new Set(
        directorio.map(
          item => item.categoria
        )
      )
    ].sort();


  categorias.forEach(categoria => {

    const chip =
      document.createElement("button");

    chip.className = "chip";

    chip.type = "button";

    chip.textContent =
      categoria;


    chip.addEventListener(
      "click",
      () => {

        const yaActiva =
          categoriaActiva === categoria;


        categoriaActiva =
          yaActiva
            ? null
            : categoria;


        document
          .querySelectorAll(".chip")
          .forEach(
            c =>
              c.classList.remove(
                "active"
              )
          );


        if (!yaActiva){

          chip.classList.add(
            "active"
          );

        }


        filtrar();

      }
    );


    chipsContenedor.appendChild(
      chip
    );

  });

}


/* ============================================================
   NAVEGACIÓN ENTRE PESTAÑAS
   ============================================================ */

const navButtons =
  document.querySelectorAll(
    ".nav-btn"
  );

const pageSections =
  document.querySelectorAll(
    ".page-section"
  );


function mostrarSeccion(nombre){

  pageSections.forEach(section => {

    section.classList.remove(
      "active-section"
    );

  });


  navButtons.forEach(button => {

    button.classList.remove(
      "active"
    );

  });


  const seccion =
    document.getElementById(
      nombre
    );


  const boton =
    document.querySelector(
      `.nav-btn[data-section="${nombre}"]`
    );


  if (seccion){

    seccion.classList.add(
      "active-section"
    );

  }


  if (boton){

    boton.classList.add(
      "active"
    );

  }


  /*
     Volvemos suavemente hacia
     la parte superior.
  */

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


navButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const nombre =
        button.dataset.section;

      mostrarSeccion(nombre);

    }
  );

});


/* ============================================================
   COTIZACIONES POR WHATSAPP
   ============================================================ */

function abrirWhatsAppCotizacion(plan){

  /*
     Si todavía no se ha configurado
     el número, mostramos un aviso.
  */

  if (!WHATSAPP_COTIZACIONES){

    alert(
      "Primero debes configurar el número de WhatsApp para recibir las cotizaciones en js/script.js."
    );

    return;
  }


  const mensaje =
    encodeURIComponent(
      `Hola, estoy interesado en el Plan ${plan} del Directorio de Oficios de Ibagué. Me gustaría conocer el precio y cómo puedo registrarme.`
    );


  const url =
    `https://wa.me/${WHATSAPP_COTIZACIONES}?text=${mensaje}`;


  window.open(
    url,
    "_blank",
    "noopener"
  );

}


/* ============================================================
   BOTONES DE PLANES
   ============================================================ */

const botonesPlanes =
  document.querySelectorAll(
    ".plan-button"
  );


botonesPlanes.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const plan =
        button.dataset.plan;

      abrirWhatsAppCotizacion(
        plan
      );

    }
  );

});


/* ============================================================
   BOTÓN GENERAL DE WHATSAPP
   ============================================================ */

const generalWhatsapp =
  document.getElementById(
    "generalWhatsapp"
  );


if (generalWhatsapp){

  generalWhatsapp.addEventListener(
    "click",
    () => {

      if (!WHATSAPP_COTIZACIONES){

        alert(
          "Primero debes configurar el número de WhatsApp para recibir las cotizaciones en js/script.js."
        );

        return;
      }


      const mensaje =
        encodeURIComponent(
          "Hola, quiero información sobre los planes para aparecer en el Directorio de Oficios de Ibagué."
        );


      const url =
        `https://wa.me/${WHATSAPP_COTIZACIONES}?text=${mensaje}`;


      window.open(
        url,
        "_blank",
        "noopener"
      );

    }
  );

}


/* ============================================================
   INICIO
   ============================================================ */

construirChips();

renderizar(directorio);