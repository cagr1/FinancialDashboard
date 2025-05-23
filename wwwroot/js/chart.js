

//grafico#1
let financialChart = null;
//grafico#2


async function renderFinancialChart(data) {

    try
    {
        const chartDom = document.getElementById('financialChart');
        if (!data || data.length === 0) {
            console.warn('Datos financieros vacíos');
            return;
        }

        if (financialChart) {
            financialChart.dispose();
        } else {
            // Si es la primera vez, asegurar que el contenedor está vacío
            chartDom.innerHTML = '';
        }

        // Inicializar el gráfico
        
        financialChart = echarts.init(chartDom);

        // Configuración del gráfico
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                },
                formatter: function(params) {
                    let result = `<strong>${params[0].axisValue}</strong><br/>`;
                    params.forEach(param => {
                        const value = param.value >= 0 
                            ? `$${param.value.toLocaleString()}` 
                            : `-$${Math.abs(param.value).toLocaleString()}`;
                        result += `${param.marker} ${param.seriesName}: ${value}<br/>`;
                    });
                    return result;
                }
            },
            legend: {
                data: ['Ingresos', 'Egresos', 'Utilidad'],
                textStyle: {
                    fontWeight: 'bold'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data.map(d => d.NameMonth),
                axisLabel: {
                    rotate: 30,
                    fontWeight: 'bold'
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '${value}',
                    fontWeight: 'bold'
                },
                axisLine: {
                    show: true
                },
                splitLine: {
                    lineStyle: {
                        type: 'littleDashed'
                    }
                }
            },
            series: [
                {
                    name: 'Ingresos',
                    type: 'line',
                    stack: 'total',
                    smooth: true,
                    lineStyle: {
                        width: 2,
                        color: '#5470C6'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(37, 99, 235, 0.5)' },
                            { offset: 1, color: 'rgba(37, 99, 235, 0.1)' }
                        ])
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    symbol: 'circle',
                    symbolSize: 3,
                    itemStyle: {
                        color: '#5470C6'
                    },
                    data: data.map(d => d.TotalIncome)
                },
                {
                    name: 'Egresos',
                    type: 'line',
                    stack: 'total',
                    smooth: true,
                    lineStyle: {
                        width: 2,
                        color: '#EE6666'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: 'rgba(238, 102, 102, 0.5)' },
                            { offset: 1, color: 'rgba(238, 102, 102, 0.1)' }
                        ])
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    symbol: 'circle',
                    symbolSize: 3,
                    itemStyle: {
                        color: '#EE6666'
                    },
                    data: data.map(d => -Math.abs(d.TotalExpenses)) // Mostrar como valores negativos
                },
                {
                    name: 'Utilidad',
                    type: 'line',
                    smooth: true,
                    lineStyle: {
                        width: 3,
                        color: '#91CC75'
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    symbol: 'diamond',
                    symbolSize: 7,
                    itemStyle: {
                        color: '#91CC75'
                    },
                    markLine: {
                        silent: true,
                        lineStyle: {
                            color: '#91CC75',
                            type: 'dashed'
                        },
                        data: [{
                            yAxis: 0 // Línea de referencia en cero
                        }]
                    },
                    data: data.map(d => d.TotalEarnings)
                }
            ]
        };

        // Aplicar la configuración
        financialChart.setOption(option);

        // Manejar redimensionamiento
        window.addEventListener('resize', function() {
            financialChart.resize();
        });
    }
    catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

let salesChart = null;
async function renderSalesCategoryChart(data) 
{
    const chartDom = document.getElementById('salesChart');
        if (!data || data.length === 0) {
            chartDom.innerHTML = ''; // Limpiar el contenedor
            return;
        }
        const sortedData = data.sort((a, b) => b.saldo - a.saldo);

        if (salesChart) {
            salesChart.dispose();
        } 

        

        
        // 1. Preparar datos
    
    const categories = sortedData.map(item => item.description);
    const values = sortedData.map(item => item.saldo);

    // 2. Configurar series para Waterfall
    const series = [];
    const colors = ['#5470C6', '#91CC75', '#FAC858', '#EE6666', '#73C0DE', '#3BA272'];

    // Serie principal (barras visibles)
    series.push({
        name: 'Ventas',
        type: 'bar',
        data: values.map((value, index) => ({
            value: value,
            itemStyle: { color: colors[index % colors.length] } // Color único por categoría
        })),
        label: {
            show: true,
            position: 'inside',
            formatter: (params) => `$${params.value.toLocaleString()}`
        }
    });

    // 3. Configuración del gráfico
    const option = {
        
        tooltip: {
            trigger: 'axis',
            formatter: (params) => {
                const item = params[0];
                return `${item.name}<br/>Ventas: $${item.value.toLocaleString()}`;
            }
        },
        xAxis: {
            type: 'category',
            data: categories,
            axisLabel: {
                rotate: 45,
                formatter: (value) => 
                    value.length > 20 ? value.substring(0, 15) + '...' : value,
                fontSize: 12
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: (value) => `$${value.toLocaleString()}`
            },
            splitLine: { show: false } // Mejorar legibilidad
        },
        series: series,
        grid: {
            bottom: '25%',
            top: '20%'
        },
        dataZoom: [{
            type: 'slider',
            yAxisIndex: 0,
            start: 95, // Enfocar en valores pequeños
            end: 100
        }]
    };
    

        // Inicializar el gráfico
        
        salesChart = echarts.init(chartDom);

        // Aplicar la configuración
        salesChart.setOption(option);

        // Manejar redimensionamiento
        window.addEventListener('resize', function() {
            salesChart.resize();
        });
}



// Llamar al inicializador
document.addEventListener('DOMContentLoaded', () => {
   
    renderFinancialChart();
    renderSalesCategoryChart();
});