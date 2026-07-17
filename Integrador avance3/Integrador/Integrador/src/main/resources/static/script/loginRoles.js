
function mostrarAlertaAdmin(mensaje, tipo = "danger") {

  const alerta = document.getElementById("alertaLoginAdmin");

  alerta.innerHTML = `
    <div class="alert alert-${tipo} alert-dismissible fade show">
      ${mensaje}
      <button type="button"
              class="btn-close"
              data-bs-dismiss="alert"></button>
    </div>
  `;

  setTimeout(() => {
    alerta.innerHTML = "";
  }, 3000);
}

function enviarCodigo() {

  const email = document.getElementById("emailAdmin").value;

  if (email === "") {
    mostrarAlertaAdmin("Ingresa el correo autorizado");
    return;
  }

  fetch("/auth/send-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  })
  .then(res => res.json())
  .then(data => {

    mostrarAlertaAdmin(
      "Código enviado al correo",
      "success"
    );

  })
  .catch(() => {

    mostrarAlertaAdmin(
      "Error al enviar código"
    );

  });
}

function validarAdmin() {

  const email = document.getElementById("emailAdmin").value;
  const password = document.getElementById("passwordAdmin").value;
  const codigo = document.getElementById("codigoAdmin").value;

  if (email === "" || password === "" || codigo === "") {

    mostrarAlertaAdmin(
      "Completa todos los campos"
    );

    return;
  }

  fetch("/auth/verify-admin", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      email,
      password,
      code: codigo
    })

  })
  .then(res => res.json())
  .then(data => {

    if (data.ok) {

      mostrarAlertaAdmin(
        "Acceso concedido",
        "success"
      );

      setTimeout(() => {

        // IMPORTANTE
        window.location.href = "/admin";

      }, 1000);

    } else {

      mostrarAlertaAdmin(
        "Credenciales incorrectas"
      );

    }

  })
  .catch(() => {

    mostrarAlertaAdmin(
      "Error de conexión"
    );

  });
}

function volverIndex() {
  window.location.href = "index.html";
}