document.addEventListener("DOMContentLoaded", function () {

    const links = document.querySelectorAll("#sidebar .nav-link");
    let currentPath = window.location.pathname;

    // Eliminar slash final si existe
    if (currentPath !== "/" && currentPath.endsWith("/")) {
        currentPath = currentPath.slice(0, -1);
    }

    links.forEach(link => {
        let linkPath = link.getAttribute("href");

        // Si Thymeleaf no ha procesado el enlace (por ejemplo, en local crudo), salta la verificación
        if (!linkPath) return;

        // Limpiar slash final
        if (linkPath !== "/" && linkPath.endsWith("/")) {
            linkPath = linkPath.slice(0, -1);
        }

        // Removemos las clases de Bootstrap activas por defecto
        link.classList.remove("active", "bg-success", "text-white");
        link.classList.add("text-dark");

        if (currentPath === linkPath) {
            link.classList.remove("text-dark");
            // Agregamos las clases oficiales de Bootstrap para resaltar el botón en verde
            link.classList.add("active", "bg-success", "text-white");
        }
    });

});