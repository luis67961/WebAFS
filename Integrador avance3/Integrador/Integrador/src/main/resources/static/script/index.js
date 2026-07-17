
const botones = document.querySelectorAll(".boton-pestana");
const contenedor = document.getElementById("rejillaProductos");
const detalle = document.getElementById("detalleCategoria");

let categoriaActual = "avicola";

//  cargar productos desde Spring
async function cargarProductos(categoria) {

  const res = await fetch(`/api/productos/categoria/${categoria}`);
  const data = await res.json();

  contenedor.innerHTML = "";

  if (data.length > 0) {
    detalle.textContent = `Mostrando ${categoria}`;

  } else {
    detalle.textContent = "No hay productos en esta categoría";
  }

data.forEach(p => {
contenedor.innerHTML += `
<div class="parent">
  <div class="card">

    <div class="logo">
      <span class="circle circle1"></span>
      <span class="circle circle2"></span>
      <span class="circle circle3"></span>
      <span class="circle circle4"></span>
      <span class="circle circle5"></span>
    </div>

    <div class="glass"></div>

    <div class="content">
      <img src="${p.imagen}" alt="${p.nombre}" class="img-producto">

      <span class="title">${p.nombre}</span>
      <span class="text">${p.descripcion}</span>

      <div class="etiquetas">
        <span>${p.peso || '40 kg'}</span>
        <span>Prot. ${p.proteina || '22%'}</span>
      </div>
    </div>

    <div class="bottom">

     <div class="precios">
    <span class="precio">S/ ${p.precio} /kg</span>
  </div>

    <div class="view-more">
  <a href="/tienda" class="view-more-button">Ver</a>
</div>

    </div>

  </div>
</div>
`;
})};


botones.forEach(btn => {
  btn.addEventListener("click", () => {

    botones.forEach(b => b.classList.remove("activo"));
    btn.classList.add("activo");

    categoriaActual = btn.dataset.categoria;

    cargarProductos(categoriaActual);
  });
});

// carga inicial
cargarProductos(categoriaActual);











//  CHAT FLOTANTE 
const contenedorChat = document.querySelector(".contenedor-chat-flotante");
const btnToggleChat = document.getElementById("btnToggleChat");
const chipsSugerencias = document.querySelectorAll(".chip-sugerencia");
const inputMensajeChat = document.getElementById("inputMensajeChat");
const btnEnviarChat = document.querySelector(".boton-enviar-chat");


btnToggleChat.addEventListener("click", (e) => {
  e.stopPropagation(); 
  contenedorChat.classList.toggle("abierto");
});

// Cerrara clic fuera 
document.addEventListener("click", (e) => {
  if (!contenedorChat.contains(e.target)) {
    contenedorChat.classList.remove("abierto");
  }
});


chipsSugerencias.forEach(chip => {
  chip.addEventListener("click", () => {
    const textoPregunta = chip.textContent;
    inputMensajeChat.value = textoPregunta;
    inputMensajeChat.focus();
    
   
  });
});



/*CONTACTOO*/

   function abrirRuta() {
  window.open("https://www.google.com/maps?q=-8.100355,-79.000159", "_blank");
            }

document.getElementById("formContacto")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const btn = document.getElementById("btnEnviar");
    const loader = document.getElementById("loader");
    const texto = document.getElementById("textoBtn");

    // mostrar loading
    btn.disabled = true;
    loader.style.display = "inline-block";
    texto.textContent = "Enviando...";

    try {

        const formData = new FormData(this);

        const response = await fetch("/contacto", {
            method: "POST",
            body: formData
        });

        const mensaje = await response.text();

        alert(mensaje);
        this.reset();

    } catch (error) {

        alert("Error al enviar el mensaje");

    } finally {

        // restaurar boton
        btn.disabled = false;
        loader.style.display = "none";
        texto.textContent = "Enviar mensaje";
    }
});






/*faq acordeonn*/

document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".item-acordeon");

  items.forEach((item) => {
    const header = item.querySelector(".header-acordeon");

    header.addEventListener("click", () => {

      // cerrar los demas
      items.forEach((el) => {
        if (el !== item) el.classList.remove("activo");
      });

      // abrir/cerrar actual
      item.classList.toggle("activo");
    });
  });
});
