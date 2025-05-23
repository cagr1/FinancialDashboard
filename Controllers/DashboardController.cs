using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using DashboardAPI.Data;
using DashboardAPI.Services;
using DashboardAPI.Models;
using Microsoft.AspNetCore.OutputCaching;
using System.Text.Json;

namespace DashboardAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly DashboardService _dashboardService;

        public DashboardController(DashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        //Endpoint to get sales per year
        [HttpGet("sales/by-date")]
        [OutputCache(Duration = 180, VaryByQueryKeys = new[] { "startDate", "endDate" })]
        public async Task<SalesData> GetSalesData([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
         try
            {
                
                return await _dashboardService.GetSalesDataRange(startDate, endDate);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return new SalesData{TotalSales= 0};
            }
            
        }

        // Endpoint para ventas acumuladas
        [HttpGet("sales/accumulated")]
        [OutputCache(Duration = 180, VaryByQueryKeys = new[] { "endDate" })]
        public async Task<SalesData> GetAccumulatedSales( [FromQuery] DateTime endDate)
        {
            try
            {                
                return await _dashboardService.GetAccumulatedSalesData(endDate);
            }
            catch (Exception ex)
            {    
                Console.WriteLine($"Error: {ex.Message}");         
                return new SalesData { TotalSales = 0 };
            }
        }

        //Endpoint para obtener variación de ingresos
        [HttpGet("variation/income")]
        [OutputCache(Duration = 180, VaryByQueryKeys = new[] { "startDate", "endDate" })]
        public async Task<AnnualVariationRevenues> GetVariationIncome([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {             
                return await _dashboardService.GetVariationIncome(startDate, endDate);
            }
            catch (Exception ex)
            {             
                Console.WriteLine($"Error: {ex.Message}");
                return new AnnualVariationRevenues { VariationPercentage = 0 };
            }
        }

        //Endpoint para obtener ingresos anuales
        [HttpGet("annual-earnings")]
        [OutputCache(Duration = 180, VaryByQueryKeys = new[] { "startDate", "endDate" })]
        public async Task<AnnualEarnings> GetAnnualEarnings([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {
                return await _dashboardService.GetAnnualEarnings(startDate, endDate);
            }
            catch (Exception ex)
            {                
                Console.WriteLine($"Error: {ex.Message}");
                return new AnnualEarnings { TotalEarnings = 0 };
            }
        }

        //Endpoint para obtener ingresos acumulados
        [HttpGet("accumulated-earnings")]
        [OutputCache(Duration = 180, VaryByQueryKeys = new[] { "endDate" })]
        public async Task<EarningAccumulated> GetEarningAccumulated([FromQuery] DateTime endDate)
        {
            try
            {             
                return await _dashboardService.GetEarningAccumulated(endDate);
            }
            catch (Exception ex)
            {             
                Console.WriteLine($"Error: {ex.Message}");
                return new EarningAccumulated { TotalEarnings = 0 };
            }
        }

        //Endpoint para variacion de Utlidades
        [HttpGet("variation/profit")]
        [OutputCache(Duration = 180, VaryByQueryKeys = new[] { "endDate" })]
        public async Task<AnnualVariationRevenues> GetVariationProfit([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {             
                return await _dashboardService.GetVariationProfit(startDate, endDate);
            }
            catch (Exception ex)
            {             
                Console.WriteLine($"Error: {ex.Message}");
                return new AnnualVariationRevenues { VariationPercentage = 0 };
            }
        }


        //Endpoint para obtener reporte de Ingresos, Egresos y Utilidades
        [HttpGet("profit-loss-byMonth/{year}")]
        [OutputCache(Duration = 180, VaryByQueryKeys = new[] { "year" })]
        public async Task<ActionResult<List<AccumulatedProfitLossEarnings>>> GetAccumulatedProfitLossEarnings( int year)
        {
            try
            {  
                                             
                var data = await _dashboardService.GetAccumulatedProfitLossEarnings(year);

                var json = new JsonSerializerOptions()
                {
                  WriteIndented = false,
                  IgnoreNullValues = true
                };
               
               //return Ok(data);
                //return Ok(JsonSerializer.Serialize(data, json)); 
                return new JsonResult(data, json); // Return the JSON result with the specified options                
            }                       

            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");                
            }
        }

        //Endpoint para obtener variación anual de ingresos
        [HttpGet("annual-variation-revenues")]
        [OutputCache(Duration = 180, VaryByQueryKeys = new[] { "startDate", "endDate" })]
        public async Task<AnnualVariationRevenues> GetAnnualVariationRevenues([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {                
                return await _dashboardService.GetAnnualVariationRevenues(startDate, endDate);
            }
            catch (Exception ex)
            {                
                Console.WriteLine($"Error: {ex.Message}");
                return new AnnualVariationRevenues { VariationPercentage = 0 };
            }
        }


        //Endpoint para obtener ventas por categoria
        [HttpGet("sales-by-category")]
        [OutputCache(Duration = 180, VaryByQueryKeys = new[] { "startDate", "endDate" })]
        public async Task<ActionResult<List<SalesbyCategory>>> GetSalesbyCategoriesAsync([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {                
                var data = await _dashboardService.GetSalesbyCategoriesAsync(startDate, endDate);
                return Ok(data);
            }
            catch (Exception ex)
            {                
                 return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        //Endpoint para obtener margen de utilidad
        [HttpGet("margin-earnings")]
        [OutputCache(Duration = 180, VaryByQueryKeys = new[] { "startDate", "endDate" })]
        public async Task<MarginEarnings> GetMarginEarnings([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {                
                return await _dashboardService.GetMarginEarnings(startDate, endDate);
            }
            catch (Exception ex)
            {                
                Console.WriteLine($"Error: {ex.Message}");
                return new MarginEarnings { TotalEarnings = 0 };
            }
        }

        //Endpoint para obtener liquidez
        [HttpGet("liquidity-ratio")]
        [OutputCache(Duration = 180, VaryByQueryKeys = new[] { "startDate", "endDate" })]
        public async Task<LiquidityRatio> GetLiquidityRatio([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {                
                return await _dashboardService.GetLiquidityRatioAsync(startDate, endDate);
            }
            catch (Exception ex)
            {                
                Console.WriteLine($"Error: {ex.Message}");
                return new LiquidityRatio { LiquidityLevel = 0 };
            }
        }






        //Endpoint para obtener reporte de activos, pasivos, patrimonio e ingresos
        // [HttpGet("annual-revenues")]
        // [OutputCache(Duration = 180, VaryByQueryKeys = new[] { "startDate", "endDate" })]
        // public async Task<AnnualRevenues> GetAnnualRevenues([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        // {
        //     try
        //     {                
        //         return await _dashboardService.GetAnnualRevenues(startDate, endDate);
        //     }
        //     catch (Exception ex)
        //     {
        //         Console.WriteLine($"Error: {ex.Message}");
        //         return new AnnualRevenues();
        //     }
        //}
    }
}
