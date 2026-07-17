window.addEventListener("DOMContentLoaded", () => {

    const contenedor = document.querySelector(".contenedor-chat-flotante");
    const chatBox = document.querySelector("#ventanaChat");
    const chatBody = document.querySelector(".cuerpo-chat");
    const input = document.querySelector("#inputMensajeChat");
    const btnSend = document.querySelector(".boton-enviar-chat");
    const btnToggle = document.querySelector("#btnToggleChat");

    const backendURL = "http://localhost:8080/api/chat";

    if (!contenedor || !chatBox || !chatBody || !input || !btnSend || !btnToggle) {
        console.error("Chat: elementos no encontrados. Revisa los IDs y Clases.");
        return;
    }

    // --- ESTILOS DE BOOTSTRAP PARA MENSAJES ---
    const crearMensaje = (texto, tipo) => {
        const div = document.createElement("div");
        
        if (tipo === "user") {
            div.className = "mensaje-usuario bg-success text-white p-3 rounded-4 shadow-sm mb-3 small ms-auto";
            div.style.maxWidth = "85%";
        } else {
            div.className = "mensaje-bot bg-white p-3 rounded-4 shadow-sm mb-3 text-secondary small border-start border-success border-4";
            div.style.maxWidth = "85%";
        }
        
        div.innerHTML = `<p class="mb-0">${texto}</p>`;
        return div;
    };

    const mostrarMensaje = (texto, tipo) => {
        const msg = crearMensaje(texto, tipo);
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    let typingElement = null;

    const mostrarTyping = () => {
        typingElement = document.createElement("div");
        typingElement.className = "mensaje-bot bg-white p-3 rounded-4 shadow-sm mb-3 text-secondary small border-start border-success border-4";
        typingElement.style.maxWidth = "85%";
        typingElement.innerHTML = `<p class="mb-0">Escribiendo...</p>`;
        chatBody.appendChild(typingElement);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const ocultarTyping = () => {
        if (typingElement) typingElement.remove();
        typingElement = null;
    };

    const enviarAlBackend = async (mensaje) => {
        try {
            const res = await fetch(backendURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: mensaje })
            });

            const data = await res.json();
            return data.reply || "Sin respuesta del servidor";

        } catch (err) {
            console.error(err);
            return "Error al conectar con el servidor";
        }
    };

    const enviarMensaje = async () => {
        const mensaje = input.value.trim();
        if (!mensaje) return;

        mostrarMensaje(mensaje, "user");
        input.value = "";

        mostrarTyping();

        const respuesta = await enviarAlBackend(mensaje);

        ocultarTyping();
        mostrarMensaje(respuesta, "bot");
    };

    btnSend.addEventListener("click", enviarMensaje);

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            enviarMensaje();
        }
    });

    // --- LÓGICA DE ABRIR/CERRAR CON CLASES DE BOOTSTRAP ---
    btnToggle.addEventListener("click", () => {
        // classList.toggle agrega la clase si no está, y la quita si está.
        chatBox.classList.toggle("d-none");
    });

});