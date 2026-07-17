document.addEventListener("DOMContentLoaded", () => {
    cargarVisitas();
});

function cargarVisitas() {

    fetch("/api/visitas")
        .then(res => res.json())
        .then(data => {

            if (!Array.isArray(data)) {
                console.error("Respuesta inválida:", data);
                return;
            }

            const pendientesContainer = document.getElementById("visitasPendientes");
            const programadasContainer = document.getElementById("visitasProgramadas");

            pendientesContainer.innerHTML = "";
            programadasContainer.innerHTML = "";

            data.forEach(v => {

const estado = (v.estado || "").trim().toUpperCase();

    if (estado === "FINALIZADA") {
        return; // 👈 no se dibuja nada
    }

                let boton = "";



if (estado === "PENDIENTE") {

    boton = `
        <button class="btn-programar"
        onclick="abrirModal(${v.id}, '${v.usuarioTelefono}', '${v.usuario}')">
            <i class="fa-solid fa-calendar-plus"></i>
            PROGRAMAR VISITA
        </button>
    `;

} else if (estado === "PROGRAMADA") {

    boton = `
        <button class="btn btn-danger w-100"
        onclick="finalizarVisita(${v.id})">
            <i class="fa-solid fa-check"></i>
            FINALIZAR VISITA
        </button>
    `;
}



                const card = `
<div class="col-12 col-md-6 col-lg-4">

    <div class="glass-card shadow p-3">

        <h5>
            <i class="fa-solid fa-user" style="color:#1e88e5;"></i>
            <span style="color:#1e88e5; font-weight:600;">
                ${v.usuario}
            </span>
        </h5>

        <p style="color:#f9a825; font-weight:500;">
            <i class="fa-solid fa-phone"></i>
            ${v.usuarioTelefono}
        </p>

        <p style="color:#43a047; font-weight:500;">
            <i class="fa-solid fa-calendar-days"></i> Se solicitó el:
            ${v.fechaSolicitud ?? ''}
        </p>

        <p>
            <i class="fa-solid fa-flag"></i>
            Estado: 
            <span style="color:#fdd835; font-weight:700;">
                ${v.estado}
            </span>
        </p>

        <p>
    <i class="fa-solid fa-user-gear"></i>
    Especialista:
    <strong>${v.especialista ?? 'No asignado'}</strong>
</p>

<p>
    <i class="fa-solid fa-calendar-check"></i>
    VISITA PROGRAMADA EL:
    <strong>${v.fechaProgramada ?? ''}</strong>
</p>


${boton}
    </div>

</div>`;

                //  separación correcta
                if (v.estado === "PENDIENTE") {
                    pendientesContainer.innerHTML += card;
                } else {
                    programadasContainer.innerHTML += card;
                }

            });
        });
}





//abrir nmodal de visitya tecnica
function abrirModal(id, telefono, usuario) {

    document.getElementById("visitaId").value = id;
    document.getElementById("nombreUsuario").value = usuario;
    document.getElementById("telefonoUsuario").value = telefono;

    const modal = new bootstrap.Modal(
        document.getElementById("visitaModal")
    );

    modal.show();
}




//para el backend guardar visita tecnica
function guardarVisita() {

    const id = document.getElementById("visitaId").value;
    const fecha = document.getElementById("fechaVisita").value;
    const especialista = document.getElementById("especialista").value.trim();

    //  VALIDACIÓN DE ID
    if (!id) {
        alert("Error: visita no identificada");
        return;
    }

    //  VALIDACIÓN FECHA
    if (!fecha) {
        alert("Debes seleccionar una fecha para programar la visita");
        document.getElementById("fechaVisita").focus();
        return;
    }

    //  VALIDACIÓN FECHA NO PASADA
    const fechaSeleccionada = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0,0,0,0);

    if (fechaSeleccionada < hoy) {
        alert("No puedes programar una fecha pasada");
        return;
    }

    //  VALIDACIÓN ESPECIALISTA
    if (!especialista) {
        alert("Debes asignar un especialista");
        document.getElementById("especialista").focus();
        return;
    }

    if (especialista.length < 3) {
        alert("Nombre del especialista muy corto");
        return;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(especialista)) {
        alert("El especialista solo debe contener letras");
        return;
    }

    const btn = document.querySelector("#visitaModal .btn-success");
    btn.disabled = true;
    btn.innerText = "Guardando...";

    // PETICIÓN
    fetch(`/api/visitas/${id}/programar`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fecha: fecha,
            especialista: especialista
        })
    })
    .then(async res => {

        btn.disabled = false;
        btn.innerText = "Guardar";

        if (!res.ok) {
            const error = await res.text();
            throw new Error(error);
        }

        return res.text();
    })
    .then(msg => {

        alert("Visita programada correctamente");

        bootstrap.Modal.getInstance(
            document.getElementById("visitaModal")
        ).hide();

        cargarVisitas();
    })
    .catch(err => {
        alert("Error: " + err.message);
    });
}

//FINALIZAR VIISTA

function finalizarVisita(id) {

    console.log("Finalizar ID:", id);

    fetch(`/api/visitas/${id}/finalizar`, {
        method: "PUT"
    })
    .then(res => {
        console.log("STATUS:", res.status);
        return res.text();
    })
    .then(msg => {
        console.log("RESPUESTA:", msg);

        alert("Visita finalizada");
        cargarVisitas();
    })
    .catch(err => {
        console.error("ERROR:", err);
    });
}




//CARGAR HISTORIAL DEL BACKEND Y MNOSTRAR EN EL FRONMTED


function cargarHistorial() {

    fetch("/api/visitas")
        .then(res => res.json())
        .then(data => {

            const tbody = document.getElementById("tablaHistorial");
            tbody.innerHTML = "";

            data.forEach(v => {

                const estado = (v.estado || "").trim().toUpperCase();

                // solo mostrar FINALIZADAS
                if (estado !== "FINALIZADA") return;

                const fila = `
                    <tr>
                        <td>${v.id}</td>
                        <td>${v.usuario}</td>
                        <td>${v.usuarioTelefono}</td>
                        <td>${v.especialista ?? '-'}</td>
                        <td>${v.fechaProgramada ?? '-'}</td>
                        <td>
                            <span class="badge bg-secondary">
                                ${v.estado}
                            </span>
                        </td>
                    </tr>
                `;

                tbody.innerHTML += fila;
            });
        });
}



//BUSCADOR TRAE RESPUESTA DEL BACKEND Y LO MOSTRARA EN EL FRONTED

document.querySelector(".search-bar input").addEventListener("input", function () {

    const q = this.value.trim();

    const container = document.getElementById("searchResults");

    if (q === "") {
        container.classList.add("hidden");
        container.innerHTML = "";
        return;
    }

    fetch(`/api/visitas/buscar?q=${q}`)
        .then(res => res.json())
        .then(data => {

            container.innerHTML = "";

            if (data.length === 0) {
                container.innerHTML = "<p>No hay resultados </p>";
            }

            data.forEach(v => {
                container.innerHTML += `
                    <div class="search-item">
                        <strong>${v.usuario}</strong><br>
                        ID: ${v.id}<br>
                        Estado: ${v.estado}
                    </div>
                `;
            });

            container.classList.remove("hidden");
        });
});




//CRERA VISITA TECNICA NUEVA MANUALMENTE

function crearVisita() {

    const usuario = document.getElementById("nuevoUsuario").value.trim();
    const telefono = document.getElementById("nuevoTelefono").value.trim();

    // VALIDACION USUARIO
    if (!usuario) {
        alert("El usuario es obligatorio");
        document.getElementById("nuevoUsuario").focus();
        return;
    }

    if (usuario.length < 3) {
        alert("El usuario debe tener al menos 3 caracteres");
        return;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(usuario)) {
        alert("El usuario solo debe contener letras");
        return;
    }

    // VALIDACIÓN TELEFONO
    if (!telefono) {
        alert("El teléfono es obligatorio");
        document.getElementById("nuevoTelefono").focus();
        return;
    }

    if (!/^9\d{8}$/.test(telefono)) {
        alert("El teléfono debe tener 9 dígitos y empezar con 9");
        return;
    }

    // BLOQUEAR BOTON
    const btn = document.querySelector("#modalNuevaVisita .btn-success");
    btn.disabled = true;
    btn.innerText = "Creando...";

    //  PETICION
    fetch("/api/visitas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuario: usuario,
            usuarioTelefono: telefono
        })
    })
    .then(async res => {

        btn.disabled = false;
        btn.innerText = "Crear visita";

        if (!res.ok) {
            const error = await res.text();
            throw new Error(error);
        }

        return res.text();
    })
    .then(msg => {

        alert("Visita creada correctamente");

        // cerrar modal
        bootstrap.Modal.getInstance(
            document.getElementById("modalNuevaVisita")
        ).hide();

        // limpiar campos
        document.getElementById("nuevoUsuario").value = "";
        document.getElementById("nuevoTelefono").value = "";

        // recargar lista
        cargarVisitas();
    })
    .catch(err => {
        alert("Error: " + err.message);
    });
}