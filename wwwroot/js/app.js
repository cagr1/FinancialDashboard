// js/app.js

// Responsive Sidebar Management

const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const sidebarToggle = document.getElementById('sidebarToggle');
const toggleIcon = document.getElementById('toggleIcon');
//const expandedMenu = document.getElementById('expandedMenu');

let isPinned = false;

sidebar.addEventListener('mouseenter', () => {
    if (!isPinned) {
        sidebar.classList.replace('w-20', 'w-64');
        mainContent.classList.replace('ml-20', 'ml-64');
    }
});


sidebar.addEventListener('mouseleave', () => {
    if (!isPinned) {
        sidebar.classList.replace('w-64', 'w-20');
        mainContent.classList.replace('ml-64', 'ml-20');
    }
});

// Toggle del sidebar
sidebarToggle.addEventListener('click', () => {
    isPinned = !isPinned;
    
    // Control de clases principales

    sidebar.classList.toggle('w-64', isPinned);
    sidebar.classList.toggle('w-20', !isPinned);
    mainContent.classList.toggle('ml-64', isPinned);
    mainContent.classList.toggle('ml-20', !isPinned);   
   
    // Control de icono
    toggleIcon.innerHTML = isPinned ? 
    `<path d="M16.642 20.669c-0.391 0.39-0.391 1.023-0 1.414 0.195 0.195 0.451 0.293 0.707 0.293s0.512-0.098 0.707-0.293l5.907-6.063-5.907-6.063c-0.39-0.39-1.023-0.39-1.414 0s-0.391 1.024 0 1.414l3.617 3.617h-19.264c-0.552 0-1 0.448-1 1s0.448 1 1 1h19.326zM30.005 0h-18c-1.105 0-2.001 0.895-2.001 2v9h2.014v-7.78c0-0.668 0.542-1.21 1.21-1.21h15.522c0.669 0 1.21 0.542 1.21 1.21l0.032 25.572c0 0.668-0.541 1.21-1.21 1.21h-15.553c-0.668 0-1.21-0.542-1.21-1.21v-7.824l-2.014 0.003v9.030c0 1.105 0.896 2 2.001 2h18c1.105 0 2-0.895 2-2v-28c-0.001-1.105-0.896-2-2-2z"/>` :
    // SVG para estado "logged out" (ícono diferente)
    `<path d="M3.651 16.989h17.326c0.553 0 1-0.448 1-1s-0.447-1-1-1h-17.264l3.617-3.617c0.391-0.39 0.391-1.024 0-1.414s-1.024-0.39-1.414 0l-5.907 6.062 5.907 6.063c0.196 0.195 0.451 0.293 0.707 0.293s0.511-0.098 0.707-0.293c0.391-0.39 0.391-1.023 0-1.414zM29.989 0h-17c-1.105 0-2 0.895-2 2v9h2.013v-7.78c0-0.668 0.542-1.21 1.21-1.21h14.523c0.669 0 1.21 0.542 1.21 1.21l0.032 25.572c0 0.668-0.541 1.21-1.21 1.21h-14.553c-0.668 0-1.21-0.542-1.21-1.21v-7.824l-2.013 0.003v9.030c0 1.105 0.895 2 2 2h16.999c1.105 0 2.001-0.895 2.001-2v-28c-0-1.105-0.896-2-2-2z"/>`;

    sidebar.classList.toggle('pinned', isPinned);
});


function formatDateWithTime(dateString, isEndDate = false, subtractYear = false) {
    const date = new Date(dateString + 'T00:00:00Z'); // Asegurarse de que la fecha esté en UTC
    
    if (subtractYear) {
        date.setFullYear(date.getFullYear() - 1);
    }

    if (isEndDate) {
        date.setUTCHours(23, 59, 59);
    } else {
        date.setUTCHours(0, 0, 0);
    }
    
    return date.toISOString().slice(0, 19).replace('T', ' ');
}




// function updateCardYears() {
//     const dateInput = document.getElementById('startDate').value;
    
//     if (dateInput) {
//         const date = new Date(dateInput + 'T00:00:00Z');
//         const currentYear = date.getUTCFullYear();
//         const previousYear = currentYear - 1;

//         // Actualizar todos los años actuales
//         document.querySelectorAll('.card-year-actual').forEach(element => {
//             element.textContent = currentYear;
//         });

//         // Actualizar todos los años anteriores (si existen)
//         document.querySelectorAll('.card-year-previous').forEach(element => {
//             element.textContent = previousYear;
//         });
//     }
// }
// document.getElementById('startDate').addEventListener('change', updateCardYears);

function updateCardYears() {
    const dateInput = document.getElementById('startDate').value;
    if (!dateInput) return;
    
    const year = new Date(dateInput).getFullYear();
    document.querySelectorAll('.card-year-actual').forEach(el => el.textContent = year);
    document.querySelectorAll('.card-year-previous').forEach(el => el.textContent = year - 1);
}


// Configurar fechas iniciales (año actual)
function setDefaultDates() {
    const currentYear = new Date().getFullYear();
    const defaultStart = `${currentYear}-01-01`;
    const defaultEnd = `${currentYear}-12-31`;
    
    document.getElementById('startDate').value = defaultStart;
    document.getElementById('endDate').value = defaultEnd;
}

// 3. Generadores de datos ficticios
function generateSalesData(startDate, endDate) {
    const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    const baseSales = Math.floor(Math.random() * 50000) + 10000;
    const variation = Math.floor(Math.random() * 20000) - 5000;
    
    return {
        totalSales: baseSales + variation * (days / 365),
        variationPercentage: Math.floor(Math.random() * 50) - 10
    };
}

function generateEarningsData(startDate, endDate) {
    const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    const baseEarnings = Math.floor(Math.random() * 20000) + 5000;
    
    return {
        totalEarnings: baseEarnings * (days / 365),
        variationPercentage: Math.floor(Math.random() * 30) + 5
    };
}

function generateFinancialData(year) {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return months.map(month => ({
        NameMonth: month,
        TotalIncome: Math.floor(Math.random() * 15000) + 5000,
        TotalExpenses: Math.floor(Math.random() * 10000) + 3000,
        TotalEarnings: Math.floor(Math.random() * 8000) + 2000
    }));
}

function generateSalesCategoryData(startDate, endDate) {
    const categories = ['Electrónica', 'Ropa', 'Hogar', 'Alimentos', 'Libros', 'Juguetes', 'Deportes'];
    return categories.map(category => ({
        description: category,
        saldo: Math.floor(Math.random() * 15000) + 2000
    }));
}

function generateMarginData() {
    return {
        totalEarnings: (Math.random() * 0.5) + 0.3 // 30% a 80%
    };
}

function generateLiquidityData() {
    return {
        liquidityLevel: (Math.random() * 2) + 0.5 // 0.5 a 2.5
    };
}

// 4. Función para simular fetchData
async function fetchData(url) {
    // Simulamos un retraso de red
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Parseamos los parámetros de la URL
    const params = new URLSearchParams(url.split('?')[1]);
    const startDate = params.get('startDate')?.replace(' ', 'T') + 'Z';
    const endDate = params.get('endDate')?.replace(' ', 'T') + 'Z';
    const year = url.match(/byMonth\/(\d+)/)?.[1];
    
    // Determinamos qué tipo de datos generar basado en la URL
    if (url.includes('sales/by-date')) {
        return generateSalesData(startDate, endDate);
    } else if (url.includes('sales/accumulated')) {
        return generateSalesData('2000-01-01', endDate);
    } else if (url.includes('variation/income') || url.includes('variation/profit')) {
        return { variationPercentage: Math.floor(Math.random() * 50) - 10 };
    } else if (url.includes('annual-earnings')) {
        return generateEarningsData(startDate, endDate);
    } else if (url.includes('accumulated-earnings')) {
        return generateEarningsData('2000-01-01', endDate);
    } else if (url.includes('profit-loss-byMonth')) {
        return generateFinancialData(year);
    } else if (url.includes('sales-by-category')) {
        return generateSalesCategoryData(startDate, endDate);
    } else if (url.includes('margin-earnings')) {
        return generateMarginData();
    } else if (url.includes('liquidity-ratio')) {
        return generateLiquidityData();
    }
    
    return {};
}

// 5. Funciones para actualizar la UI (se mantienen igual)
function updateVariacion(elementId, value) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const isPositive = value >= 0;
    element.className = `card-variacion ${isPositive ? 'positive' : 'negative'}`;
    element.textContent = `${isPositive ? '+' : ''}${value.toFixed(2)}%`;
}

function updateStats(ventas, acumulado, ventasPrevious, acumuladoPrevious, porcentajeActual, porcentajePrevious, utilidadesData, utilidadesAcumuladasData, porcentajeUtilidades, marginEarningsData, liquidezData) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const margenNetoPorcentaje = parseFloat((marginEarningsData.totalEarnings * 100).toFixed(2));
    const metaMargenNetoUtilidades = 50.00;
    const variacionMargenNetoUtilidades = parseFloat((margenNetoPorcentaje - metaMargenNetoUtilidades).toFixed(2));
    const metaLiquidez = 1.5;
    const variacionliquidez = parseFloat((liquidezData.liquidityLevel - metaLiquidez).toFixed(2));

    document.getElementById('ventasRango').textContent = formatter.format(ventas.totalSales);
    document.getElementById('ventasAcumuladas').textContent = formatter.format(acumulado.totalSales) + ' acumulado';
    document.getElementById('ventasRangoPrevious').textContent = formatter.format(ventasPrevious.totalSales);
    document.getElementById('ventasAcumuladasPrevious').textContent = formatter.format(acumuladoPrevious.totalSales) + ' acumulado';
    document.getElementById('porcentajeVentasActual').textContent = `${porcentajeActual.variationPercentage}%`;
    document.getElementById('porcentajeVentasPrevio').textContent = `${porcentajePrevious.variationPercentage}%`;
    document.getElementById('utilidadesActuales').textContent = formatter.format(utilidadesData.totalEarnings);
    document.getElementById('utilidadesAcumuladas').textContent = formatter.format(utilidadesAcumuladasData.totalEarnings) + ' acumulado';
    document.getElementById('porcentajeUtilidades').textContent = `${porcentajeUtilidades.variationPercentage}%`;
    document.getElementById('margenUtilidadNeta').textContent = `${margenNetoPorcentaje}%`;
    document.getElementById('liquidezCorriente').textContent = liquidezData.liquidityLevel.toFixed(2);

    updateVariacion('porcentajeVentasActual', porcentajeActual.variationPercentage);
    updateVariacion('porcentajeVentasPrevio', porcentajePrevious.variationPercentage);
    updateVariacion('porcentajeUtilidades', porcentajeUtilidades.variationPercentage);
    updateVariacion('variacionMargen', variacionMargenNetoUtilidades);
    updateVariacion('variacionLiquidez', variacionliquidez);
}

// 6. Función principal para cargar datos
async function loadData() {
    const startDateInput = document.getElementById('startDate').value;
    const endDateInput = document.getElementById('endDate').value;
    
    const startDate = formatDateWithTime(startDateInput);
    const endDate = formatDateWithTime(endDateInput, true);
    const year = startDateInput ? new Date(startDateInput).getUTCFullYear() : new Date().getUTCFullYear();
    const previousStartDate = formatDateWithTime(startDateInput, false, true);
    const previousEndDate = formatDateWithTime(endDateInput, true, true);

    try {
        // Simulamos todas las llamadas a la API con datos ficticios
        const [ventasData, acumuladoData, ventasPreviousData, acumuladoPreviousData, 
               porcentajeVentasActual, porcentajeVentasPrevious, utilidadesData, 
               utilidadesAcumuladasData, porcentajeUtilidades, marginEarningsData, 
               liquidezData] = await Promise.all([
            fetchData(`http://localhost:5179/api/Dashboard/sales/by-date?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`),
            fetchData(`http://localhost:5179/api/Dashboard/sales/accumulated?endDate=${encodeURIComponent(endDate)}`),
            fetchData(`http://localhost:5179/api/Dashboard/sales/by-date?startDate=${encodeURIComponent(previousStartDate)}&endDate=${encodeURIComponent(previousEndDate)}`),
            fetchData(`http://localhost:5179/api/Dashboard/sales/accumulated?endDate=${encodeURIComponent(previousEndDate)}`),
            fetchData(`http://localhost:5179/api/Dashboard/variation/income?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`),
            fetchData(`http://localhost:5179/api/Dashboard/variation/income?startDate=${encodeURIComponent(previousStartDate)}&endDate=${encodeURIComponent(previousEndDate)}`),
            fetchData(`http://localhost:5179/api/Dashboard/annual-earnings?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`),
            fetchData(`http://localhost:5179/api/Dashboard/accumulated-earnings?endDate=${encodeURIComponent(endDate)}`),
            fetchData(`http://localhost:5179/api/Dashboard/variation/profit?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`),
            fetchData(`http://localhost:5179/api/Dashboard/margin-earnings?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`),
            fetchData(`http://localhost:5179/api/Dashboard/liquidity-ratio?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`)
        ]);

        // Obtenemos datos para los gráficos
        const [financialData, salesCategoryData] = await Promise.all([
            fetchData(`http://localhost:5179/api/Dashboard/profit-loss-byMonth/${year}`),
            fetchData(`http://localhost:5179/api/Dashboard/sales-by-category?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`)
        ]);

        updateStats(ventasData, acumuladoData, ventasPreviousData, acumuladoPreviousData, 
                   porcentajeVentasActual, porcentajeVentasPrevious, utilidadesData, 
                   utilidadesAcumuladasData, porcentajeUtilidades, marginEarningsData, 
                   liquidezData);
        
        // Estas funciones deberías implementarlas según tu librería de gráficos
        renderFinancialChart(financialData);
        renderSalesCategoryChart(salesCategoryData);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los datos ficticios');
    }
}

// 7. Inicialización
document.addEventListener('DOMContentLoaded', () => {
    setDefaultDates();
    updateCardYears();
    loadData();
});

// Event listeners
document.getElementById('startDate').addEventListener('change', () => {
    updateCardYears();
    loadData();
});

document.getElementById('endDate').addEventListener('change', loadData);