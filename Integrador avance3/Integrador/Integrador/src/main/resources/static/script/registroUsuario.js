document.addEventListener("DOMContentLoaded", () => {

  // ELEMENTOS
  const registerForm = document.querySelector(".auth-right form");
  const logoutForm = document.querySelector(".btn-logout")?.closest("form");
  const deleteForm = document.querySelector(".btn-delete")?.closest("form");
  const errorBox = document.getElementById("errorBox");

  // TOAST
  function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.innerText = message;
    toast.className = "toast-box show " + (type === "error" ? "toast-error" : "toast-success");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2500);
  }

  // OCULTAR ERROR BACKEND
  if (errorBox) {
    setTimeout(() => {
      errorBox.style.display = "none";
    }, 4000);
  }

  // REGISTRO USUARIO
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(registerForm);

      try {
        const res = await fetch("/registro", {
          method: "POST",
          body: formData
        });

        const data = await res.json();

        if (data.ok) {
          showToast("Cuenta creada correctamente");
          window.location.reload();
        } else {
          showToast(data.error || "Error al registrar", "error");
        }

      } catch (err) {
        showToast("Error de servidor", "error");
      }
    });
  }

  
  // ELIMINAR CUENTA
const deleteBtn = document.querySelector(".btn-delete");

if (deleteBtn) {
  deleteBtn.addEventListener("click", async () => {

    const confirmDelete = confirm("¿Seguro que deseas eliminar tu cuenta?");
    if (!confirmDelete) return;

    try {
      const res = await fetch("/usuario/eliminar", {
        method: "POST"
      });

      const data = await res.json();

      if (data.ok) {
        showToast("Cuenta eliminada");

        // cerrar sesión correctamente
        window.location.href = "/miCuenta";
      } else {
        showToast(data.error || "No se pudo eliminar", "error");
      }

    } catch (err) {
      showToast("Error de servidor", "error");
    }
  });
}

});