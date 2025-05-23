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



function updateCardYears() {
    const dateInput = document.getElementById('startDate').value;
    
    if (dateInput) {
        const date = new Date(dateInput + 'T00:00:00Z');
        const currentYear = date.getUTCFullYear();
        const previousYear = currentYear - 1;

        // Actualizar todos los años actuales
        document.querySelectorAll('.card-year-actual').forEach(element => {
            element.textContent = currentYear;
        });

        // Actualizar todos los años anteriores (si existen)
        document.querySelectorAll('.card-year-previous').forEach(element => {
            element.textContent = previousYear;
        });
    }
}
document.getElementById('startDate').addEventListener('change', updateCardYears);

// Configurar fechas iniciales (año actual)
function setDefaultDates() {
    const currentYear = new Date().getFullYear();
    const defaultStart = `${currentYear}-01-01`;
    const defaultEnd = `${currentYear}-12-31`;
    
    document.getElementById('startDate').value = defaultStart;
    document.getElementById('endDate').value = defaultEnd;
}




async function loadData() {
    
    // Obtener fechas de los inputs        
    const startDateInput = document.getElementById('startDate').value;
    const endDateInput = document.getElementById('endDate').value;
    
    // Agregar tiempos automáticamente
    const startDate = formatDateWithTime(startDateInput);
    const endDate = formatDateWithTime(endDateInput, true);
    const year = startDateInput ? new Date(startDateInput).getUTCFullYear(): new Date().getUTCFullYear();
    const previousStartDate = formatDateWithTime(startDateInput, false, true);
    const previousEndDate = formatDateWithTime(endDateInput, true, true);

    try {
        //Grupo Ventas
        const [ventasData, acumuladoData] = await Promise.all([
            fetchData(`http://localhost:5179/api/Dashboard/sales/by-date?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`),
            fetchData(`http://localhost:5179/api/Dashboard/sales/accumulated?endDate=${encodeURIComponent(endDate)}`)
        ]);
        
        //Grupos ventas anteriores
        const [ventasPreviousData, acumuladoPreviousData] = await Promise.all([
            fetchData(`http://localhost:5179/api/Dashboard/sales/by-date?startDate=${encodeURIComponent(previousStartDate)}&endDate=${encodeURIComponent(previousEndDate)}`),
            fetchData(`http://localhost:5179/api/Dashboard/sales/accumulated?endDate=${encodeURIComponent(previousEndDate)}`)
        ]);
        
        //Grupo Porcentaje Ventas
        const [porcentajeVentasActual, porcentajeVentasPrevious] = await Promise.all([
            fetchData(`http://localhost:5179/api/Dashboard/variation/income?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`),
            fetchData(`http://localhost:5179/api/Dashboard/variation/income?startDate=${encodeURIComponent(previousStartDate)}&endDate=${encodeURIComponent(previousEndDate)}`)
        ]);

        //Grupo Utilidades
        const [utilidadesData, utilidadesAcumuladasData, porcentajeUtilidades] = await Promise.all([
            fetchData(`http://localhost:5179/api/Dashboard/annual-earnings?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`),
            fetchData(`http://localhost:5179/api/Dashboard/accumulated-earnings?endDate=${encodeURIComponent(endDate)}`),
            fetchData(`http://localhost:5179/api/Dashboard/variation/profit?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`)
        ]);
        
        //Grupo Financial
        const [financialData, salesCategoryData, marginEarningsData, liquidezData] = await Promise.all([
            fetchData(`http://localhost:5179/api/Dashboard/profit-loss-byMonth/${year}`),
            fetchData(`http://localhost:5179/api/Dashboard/sales-by-category?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`),
            fetchData(`http://localhost:5179/api/Dashboard/margin-earnings?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`),
            fetchData(`http://localhost:5179/api/Dashboard/liquidity-ratio?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`)
        ]);


        
        

       
        // 5. Actualizar la UI con los datos
        updateStats(ventasData, acumuladoData, ventasPreviousData, acumuladoPreviousData, porcentajeVentasActual, porcentajeVentasPrevious, utilidadesData, utilidadesAcumuladasData, porcentajeUtilidades, marginEarningsData, liquidezData); 
        renderFinancialChart(financialData);
        renderSalesCategoryChart(salesCategoryData);
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los datos');
    }
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('HTTP error  + ${response.status}');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching:', url, error);
        return [];
    }
}


function updateVariacion(elementId, value) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Determinar si es positivo/negativo
    const isPositive = value >= 0;
    
    // Actualizar clases
    element.className = `card-variacion ${isPositive ? 'positive' : 'negative'}`;
    
    // Formatear valor
    element.textContent = `${isPositive ? '+' : ''}${value.toFixed(2)}%`;
}


// Actualizar estadísticas
function updateStats(ventas, acumulado,ventasPrevious, acumuladoPrevious, porcentajeActual, porcentajePrevious, utilidadesData, utilidadesAcumuladasData, porcentajeUtilidades,marginEarningsData, liquidezData) {
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
    document.getElementById('porcentajeVentasActual').textContent = `${porcentajeActual}%`;
    document.getElementById('porcentajeVentasPrevio').textContent = `${porcentajePrevious}%`;
    document.getElementById('utilidadesActuales').textContent = formatter.format(utilidadesData.totalEarnings);
    document.getElementById('utilidadesAcumuladas').textContent = formatter.format(utilidadesAcumuladasData.totalEarnings) + ' acumulado';
    document.getElementById('porcentajeUtilidades').textContent = `${porcentajeUtilidades}%`;
    document.getElementById('margenUtilidadNeta').textContent = `${margenNetoPorcentaje}%` ;
    document.getElementById('liquidezCorriente').textContent = `${liquidezData.liquidityLevel}%`;


    updateVariacion('porcentajeVentasActual', porcentajeActual.variationPercentage);
    updateVariacion('porcentajeVentasPrevio', porcentajePrevious.variationPercentage);
    updateVariacion('porcentajeUtilidades', porcentajeUtilidades.variationPercentage);
    updateVariacion('variacionMargen', variacionMargenNetoUtilidades);
    updateVariacion('variacionLiquidez', variacionliquidez);
}

// Cargar datos iniciales
document.addEventListener('DOMContentLoaded', () => {
    setDefaultDates(); 
    loadData();
    //window.addEventListener('resize', manageSidebar);
});