const pagos = [
    {
        codigo:"PG-091",
        cliente:"Granja San Pedro",
        metodo:"Transferencia",
        monto:"S/ 4,860",
        fecha:"2026-05-02",
        estado:"Pagado"
    },
    {
        codigo:"PG-090",
        cliente:"Avícola El Sol",
        metodo:"Crédito",
        monto:"S/ 1,240",
        fecha:"2026-04-30",
        estado:"Pendiente"
    },
    {
        codigo:"PG-089",
        cliente:"Postura Andina",
        metodo:"Yape",
        monto:"S/ 8,100",
        fecha:"2026-05-04",
        estado:"Pagado"
    }
];

const contenedor = document.getElementById("pagosContent");

contenedor.innerHTML = `
    <div class="mb-4">
        <h2 class="fw-bold text-success mb-0">Pagos</h2>
    </div>

    <div class="row g-4 mb-5">

        <div class="col-sm-6 col-xl-3">
            <div class="card border-0 shadow-sm rounded-4 h-100 p-3 bg-white">
                <div class="d-flex align-items-center gap-3">
                    <div class="bg-success bg-opacity-10 text-success rounded-4 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 50px; height: 50px;">
                        <i class="bi bi-cash fs-4"></i>
                    </div>
                    <div>
                        <small class="text-secondary fw-medium d-block mb-1">Cobrado mes</small>
                        <h3 class="fw-bold text-dark mb-0 lh-1">S/ 78,420</h3>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-xl-3">
            <div class="card border-0 shadow-sm rounded-4 h-100 p-3 bg-white">
                <div class="d-flex align-items-center gap-3">
                    <div class="bg-primary bg-opacity-10 text-primary rounded-4 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 50px; height: 50px;">
                        <i class="bi bi-wallet2 fs-4"></i>
                    </div>
                    <div>
                        <small class="text-secondary fw-medium d-block mb-1">Por cobrar</small>
                        <h3 class="fw-bold text-dark mb-0 lh-1">S/ 12,340</h3>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-xl-3">
            <div class="card border-0 shadow-sm rounded-4 h-100 p-3 bg-white">
                <div class="d-flex align-items-center gap-3">
                    <div class="rounded-4 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 50px; height: 50px; background-color: rgba(253, 126, 20, 0.1); color: #fd7e14;">
                        <i class="bi bi-exclamation-triangle fs-4"></i>
                    </div>
                    <div>
                        <small class="text-secondary fw-medium d-block mb-1">Vencidos</small>
                        <h3 class="fw-bold text-dark mb-0 lh-1">S/ 1,560</h3>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-sm-6 col-xl-3">
            <div class="card border-0 shadow-sm rounded-4 h-100 p-3 bg-white">
                <div class="d-flex align-items-center gap-3">
                    <div class="bg-info bg-opacity-10 text-info rounded-4 d-flex align-items-center justify-content-center flex-shrink-0" style="width: 50px; height: 50px;">
                        <i class="bi bi-check-circle fs-4"></i>
                    </div>
                    <div>
                        <small class="text-secondary fw-medium d-block mb-1">Conciliados</small>
                        <h3 class="fw-bold text-dark mb-0 lh-1">92%</h3>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="card shadow-sm border-0 rounded-4 bg-white p-4">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light text-success">
                    <tr>
                        <th class="py-3">N°</th>
                        <th class="py-3">Cliente</th>
                        <th class="py-3">Método</th>
                        <th class="py-3">Monto</th>
                        <th class="py-3">Fecha</th>
                        <th class="py-3 text-center">Estado</th>
                    </tr>
                </thead>

                <tbody class="border-top-0">
                    ${pagos.map(p => `
                        <tr>
                            <td class="fw-bold text-secondary">${p.codigo}</td>
                            <td class="fw-medium text-dark">${p.cliente}</td>
                            <td><span class="badge bg-light text-secondary border border-secondary border-opacity-25 px-2 py-1">${p.metodo}</span></td>
                            <td class="fw-bold text-dark">${p.monto}</td>
                            <td class="text-muted">${p.fecha}</td>
                            <td class="text-center">
                                ${p.estado === 'Pagado' 
                                    ? `<span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-3 py-2 w-100">Pagado</span>` 
                                    : `<span class="badge rounded-pill px-3 py-2 border w-100" style="background-color: rgba(253, 126, 20, 0.1); color: #fd7e14; border-color: rgba(253, 126, 20, 0.25) !important;">Pendiente</span>`
                                }
                            </td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    </div>
`;