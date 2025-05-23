# FinancialDashboard

# 🚀 ERP Executive Dashboard | Web API + Interactive BI

![Dashboard Preview](./image.png)

Dashboard de indicadores económicos desarrollado en .NET Core + Web API.


**Solución modular de Business Intelligence** para ERPs tradicionales, proporcionando visualización ejecutiva en tiempo real con integración multiplataforma.

## 🔥 Características Clave
- 📊 **Gráficos interactivos** con ECharts.js
- 🎨 UI responsive con **Tailwind CSS**
- ⚡ Backend eficiente en **.NET 8 Web API**
- 📅 Filtros dinámicos por periodo (mes/año/rangos personalizados)
- 🔄 Compatibilidad con **WinForms via WebView2**
- 📱 Diseño adaptable a dispositivos móviles

## 🛠 Stack Tecnológico
| Frontend              | Backend           | Integración       |
|-----------------------|-------------------|-------------------|
| ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript) | ![.NET](https://img.shields.io/badge/.NET-8-512BD4?logo=dotnet) | ![WebView2](https://img.shields.io/badge/WebView2-1.0.0-0078D7?logo=microsoft-edge) |
| ![ECharts](https://img.shields.io/badge/ECharts.js-5.4.0-AA344D?logo=apacheecharts) | ![WebAPI](https://img.shields.io/badge/Web_API-REST-512BD4?logo=dotnet) | ![Windows](https://img.shields.io/badge/WinForms-Compatible-0078D7?logo=windows) |
| ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.3.0-06B6D4?logo=tailwindcss) | ![JWT](https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens) |  |

## 📦 Instalación
```bash
# Clonar repositorio
git clone https://github.com/tuusuario/erp-dashboard.git

# Ejecutar API (puerto 5179)
cd src/API
dotnet run

# Abrir interfaz web
cd ../WebApp
open index.html