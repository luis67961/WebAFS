// --- DATOS DE REPORTES ---
const reports = [
    { id: "ventas", title: "Reporte de Ventas", icon: "bi-cash-stack", color: "text-success" },
    { id: "pedidos", title: "Reporte de Pedidos", icon: "bi-box-seam", color: "text-primary" },
    { id: "rentabilidad", title: "Rentabilidad", icon: "bi-graph-up-arrow", color: "text-info" },
    { id: "clientes", title: "Clientes", icon: "bi-people-fill", color: "text-success" },
    { id: "deudas", title: "Deudas", icon: "bi-exclamation-triangle-fill", color: "text-danger" },
    { id: "visitas", title: "Visitas Técnicas", icon: "bi-geo-alt-fill", color: "text-warning" },
    { id: "precios", title: "Precios de Insumos", icon: "bi-tag-fill", color: "text-success" },
    { id: "productos", title: "Productos Más Vendidos", icon: "bi-boxes", color: "text-primary" },
    { id: "mayoristas", title: "Mayoristas / Minoristas", icon: "bi-building", color: "text-info" },
    { id: "pagos", title: "Pagos Contraentrega", icon: "bi-credit-card", color: "text-warning" },
    { id: "consolidado", title: "Consolidado del Negocio", icon: "bi-bar-chart-line-fill", color: "text-success" }
];

// Variable global para destruir el gráfico anterior antes de dibujar uno nuevo
let chartInstance = null;

// --- CARGAR TARJETAS SUPERIORES ---
function loadReportCards() {
    const container = document.getElementById('report-cards');
    container.innerHTML = '';

    reports.forEach(report => {
        const cardHTML = `
            <div class="col-6 col-md-4 col-lg-3 col-xl-2">
                <div class="card border-0 shadow-sm rounded-4 h-100 bg-white" style="cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'" onclick="selectReport('${report.id}')">
                    <div class="card-body text-center p-3 d-flex flex-column justify-content-center align-items-center gap-2">
                        <div class="rounded-circle d-flex align-items-center justify-content-center bg-light ${report.color}" style="width: 45px; height: 45px;">
                            <i class="bi ${report.icon} fs-4"></i>
                        </div>
                        <h6 class="card-title fw-bold text-dark mb-0 small lh-sm">${report.title}</h6>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

// --- CONFIGURACIÓN BASE DE GRÁFICOS ---
function drawChart(canvasId, type, labels, data, labelText, colorCode) {
    if (chartInstance) {
        chartInstance.destroy(); // Destruye el gráfico anterior
    }
    
    const ctx = document.getElementById(canvasId).getContext('2d');
    chartInstance = new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: labelText,
                data: data,
                backgroundColor: colorCode,
                borderColor: colorCode,
                borderWidth: 2,
                borderRadius: type === 'bar' ? 6 : 0, // Bordes curvos solo para barras
                tension: 0.3, // Curva suave para gráficos de línea
                fill: type === 'line' ? { target: 'origin', above: colorCode + '20' } : false // Sombra debajo de la línea
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#e9ecef', borderDash: [5, 5] },
                    border: { display: false }
                },
                x: {
                    grid: { display: false },
                    border: { display: false }
                }
            }
        }
    });
}

// --- FUNCIONES DE CADA REPORTE ---

function loadSalesReport() {
    document.getElementById('report-title').textContent = "Reporte de Ventas";
    const content = `
        <div class="row g-4 mb-4">
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">VENTAS MES</small><h3 class="text-success fw-bold mb-0 mt-2">S/ 85,420</h3><small class="text-success fw-medium">+4.1% <i class="bi bi-arrow-up"></i></small></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">KILOS VENDIDOS</small><h3 class="text-dark fw-bold mb-0 mt-2">32,400</h3><small class="text-success fw-medium">+4%</small></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">TICKET PROMEDIO</small><h3 class="text-dark fw-bold mb-0 mt-2">S/ 1,820</h3></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">N° TRANSACCIONES</small><h3 class="text-dark fw-bold mb-0 mt-2">248</h3></div></div>
        </div>
        <div class="chart-container" style="position: relative; height:40vh; width:100%">
            <canvas id="salesChart"></canvas>
        </div>
    `;
    document.getElementById('dynamic-report-content').innerHTML = content;
    // Dibuja el gráfico (Verde Bootstrap)
    drawChart('salesChart', 'bar', ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'], [18000, 21000, 19000, 24000, 26000, 22000, 27000, 30000], 'Ventas', '#198754');
}

function loadPedidosReport() {
    document.getElementById('report-title').textContent = "Reporte de Pedidos";
    const content = `
        <div class="row g-4 mb-4">
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">TOTAL PEDIDOS</small><h3 class="text-primary fw-bold mb-0 mt-2">1,284</h3><small class="text-success fw-medium">+12% <i class="bi bi-arrow-up"></i></small></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center" style="border-color: rgba(253, 126, 20, 0.3) !important;"><small class="text-secondary fw-bold">PENDIENTES</small><h3 class="fw-bold mb-0 mt-2" style="color: #fd7e14;">87</h3><small class="text-danger fw-medium">-3</small></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">ENTREGADOS</small><h3 class="text-success fw-bold mb-0 mt-2">1,152</h3></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">TIEMPO PROMEDIO</small><h3 class="text-dark fw-bold mb-0 mt-2">2.4 días</h3></div></div>
        </div>
        <div class="chart-container" style="position: relative; height:40vh; width:100%">
            <canvas id="pedidosChart"></canvas>
        </div>
    `;
    document.getElementById('dynamic-report-content').innerHTML = content;
    // Dibuja el gráfico (Azul Primario)
    drawChart('pedidosChart', 'line', ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'], [250, 320, 280, 434], 'Pedidos', '#0d6efd');
}

function loadRentabilidadReport() {
    document.getElementById('report-title').textContent = "Rentabilidad";
    const content = `
        <div class="row g-4 mb-4">
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">MARGEN BRUTO</small><h3 class="text-success fw-bold mb-0 mt-2">38.4%</h3><small class="text-success fw-medium">+2.1%</small></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">MARGEN NETO</small><h3 class="text-success fw-bold mb-0 mt-2">21.7%</h3></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">ROI</small><h3 class="text-dark fw-bold mb-0 mt-2">2.8x</h3></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center border-danger"><small class="text-secondary fw-bold">COSTOS TOTALES</small><h3 class="text-danger fw-bold mb-0 mt-2">S/ 48,920</h3></div></div>
        </div>
        <div class="chart-container" style="position: relative; height:40vh; width:100%">
            <canvas id="rentabilidadChart"></canvas>
        </div>
    `;
    document.getElementById('dynamic-report-content').innerHTML = content;
    // Dibuja el gráfico (Naranja)
    drawChart('rentabilidadChart', 'bar', ['Q1', 'Q2', 'Q3', 'Q4'], [15, 18, 22, 21.7], 'Margen Neto %', '#fd7e14');
}

function loadClientesReport() {
    document.getElementById('report-title').textContent = "Clientes";
    const content = `
        <div class="row g-4 mb-4">
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">TOTAL CLIENTES</small><h3 class="text-dark fw-bold mb-0 mt-2">2,845</h3></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">CLIENTES ACTIVOS</small><h3 class="text-success fw-bold mb-0 mt-2">1,732</h3><small class="text-success fw-medium">+8%</small></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">NUEVOS ESTE MES</small><h3 class="text-primary fw-bold mb-0 mt-2">184</h3></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">RETENCIÓN</small><h3 class="text-success fw-bold mb-0 mt-2">76%</h3></div></div>
        </div>
        <div class="chart-container" style="position: relative; height:40vh; width:100%">
            <canvas id="clientesChart"></canvas>
        </div>
    `;
    document.getElementById('dynamic-report-content').innerHTML = content;
    drawChart('clientesChart', 'line', ['Ene', 'Feb', 'Mar', 'Abr', 'May'], [1500, 1550, 1620, 1680, 1732], 'Clientes Activos', '#0dcaf0');
}

function loadDeudasReport() {
    document.getElementById('report-title').textContent = "Deudas";
    const content = `
        <div class="row g-4 mb-4">
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center border-warning"><small class="text-secondary fw-bold">TOTAL POR COBRAR</small><h3 class="fw-bold mb-0 mt-2" style="color: #fd7e14;">S/ 124,500</h3></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center border-danger"><small class="text-secondary fw-bold">VENCIDAS</small><h3 class="text-danger fw-bold mb-0 mt-2">S/ 38,200</h3></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center border-success"><small class="text-secondary fw-bold">COBRADO ESTE MES</small><h3 class="text-success fw-bold mb-0 mt-2">S/ 67,800</h3></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">CLIENTES MOROSOS</small><h3 class="text-dark fw-bold mb-0 mt-2">47</h3></div></div>
        </div>
        <div class="chart-container" style="position: relative; height:40vh; width:100%">
            <canvas id="deudasChart"></canvas>
        </div>
    `;
    document.getElementById('dynamic-report-content').innerHTML = content;
    drawChart('deudasChart', 'bar', ['0-30 días', '31-60 días', '61-90 días', '+90 días'], [60000, 26300, 20000, 18200], 'Monto por cobrar S/', '#dc3545');
}

function loadProductosReport() {
    document.getElementById('report-title').textContent = "Productos Más Vendidos";
    const content = `
        <div class="row g-4 mb-4">
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">PRODUCTO #1</small><h3 class="text-dark fw-bold mb-0 mt-2">Inicio Avícola</h3><small class="text-muted">8,450 kg</small></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">PRODUCTO #2</small><h3 class="text-dark fw-bold mb-0 mt-2">Engorde Final</h3><small class="text-muted">6,320 kg</small></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center border-success"><small class="text-secondary fw-bold">VENTAS TOTALES</small><h3 class="text-success fw-bold mb-0 mt-2">S/ 92,400</h3></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">TOP 5</small><h3 class="text-dark fw-bold mb-0 mt-2">87%</h3><small class="text-muted">del total</small></div></div>
        </div>
        <div class="chart-container" style="position: relative; height:40vh; width:100%">
            <canvas id="productosChart"></canvas>
        </div>
    `;
    document.getElementById('dynamic-report-content').innerHTML = content;
    drawChart('productosChart', 'bar', ['Inicio Avícola', 'Engorde Final', 'Postura', 'Crecimiento', 'Iniciador Cerdo'], [8450, 6320, 4200, 3100, 1500], 'Kilos Vendidos', '#198754');
}

function loadConsolidadoReport() {
    document.getElementById('report-title').textContent = "Consolidado del Negocio";
    const content = `
        <div class="row g-4 mb-4">
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center border-success"><small class="text-secondary fw-bold">INGRESOS TOTALES</small><h3 class="text-success fw-bold mb-0 mt-2">S/ 248,650</h3></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center border-success"><small class="text-secondary fw-bold">UTILIDAD NETA</small><h3 class="text-success fw-bold mb-0 mt-2">S/ 68,420</h3></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">CRECIMIENTO</small><h3 class="text-primary fw-bold mb-0 mt-2">+18.4%</h3></div></div>
            <div class="col-md-3"><div class="bg-white border rounded-4 p-3 shadow-sm text-center"><small class="text-secondary fw-bold">EFICIENCIA</small><h3 class="text-dark fw-bold mb-0 mt-2">94%</h3></div></div>
        </div>
        <div class="chart-container" style="position: relative; height:40vh; width:100%">
            <canvas id="consolidadoChart"></canvas>
        </div>
    `;
    document.getElementById('dynamic-report-content').innerHTML = content;
    drawChart('consolidadoChart', 'line', ['Q1', 'Q2', 'Q3', 'Q4'], [50000, 58000, 72000, 68420], 'Utilidad Neta S/', '#198754');
}

// --- REPORTES SIMPLES ---
function loadVisitasReport() { 
    document.getElementById('report-title').textContent = "Visitas Técnicas";
    simpleReport("Visitas Técnicas", "Registro, efectividad y seguimiento de visitas técnicas.", "text-success");
}

function loadPreciosReport() { 
    document.getElementById('report-title').textContent = "Precios de Insumos";
    simpleReport("Precios de Insumos", "Evolución de precios y costos de insumos.", "text-primary");
}

function loadMayoristasReport() { 
    document.getElementById('report-title').textContent = "Mayoristas / Minoristas";
    simpleReport("Mayoristas vs Minoristas", "Comparativa de ventas por tipo de cliente.", "text-info");
}

function loadPagosReport() { 
    document.getElementById('report-title').textContent = "Pagos Contraentrega";
    simpleReport("Pagos Contraentrega", "Control y seguimiento de pagos en entrega.", "text-warning");
}

function simpleReport(title, description, colorClass) {
    if (chartInstance) {
        chartInstance.destroy(); // Limpiamos canvas si cambiamos a un reporte simple
        chartInstance = null;
    }
    document.getElementById('dynamic-report-content').innerHTML = `
        <div class="text-center py-5 bg-light rounded-4 border">
            <h4 class="${colorClass} fw-bold mb-3">${title}</h4>
            <p class="text-secondary mb-1">${description}</p>
            <small class="text-muted fst-italic">Este reporte se completará próximamente con métricas y gráficas detalladas.</small>
        </div>
    `;
}

// --- SELECCIONAR REPORTE ---
function selectReport(reportId) {
    switch(reportId) {
        case "ventas":      loadSalesReport(); break;
        case "pedidos":     loadPedidosReport(); break;
        case "rentabilidad": loadRentabilidadReport(); break;
        case "clientes":    loadClientesReport(); break;
        case "deudas":      loadDeudasReport(); break;
        case "visitas":     loadVisitasReport(); break;
        case "precios":     loadPreciosReport(); break;
        case "productos":   loadProductosReport(); break;
        case "mayoristas":  loadMayoristasReport(); break;
        case "pagos":       loadPagosReport(); break;
        case "consolidado": loadConsolidadoReport(); break;
        default:            loadSalesReport();
    }
}

// --- EXPORTAR ---
function exportReport(type) {
    const title = document.getElementById('report-title').textContent;
    alert(`Exportando "${title}" en formato ${type.toUpperCase()}...`);
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    loadReportCards();
    loadSalesReport(); 
});