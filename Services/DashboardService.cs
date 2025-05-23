using DashboardAPI.Data;
using DashboardAPI.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Microsoft.Data.SqlClient;
using System.Data;



namespace DashboardAPI.Services
{
    public class DashboardService
    {
        private readonly DatabaseConnection _databaseConnection;

        public DashboardService(IConfiguration configuration)
        {
            _databaseConnection = new DatabaseConnection(configuration);
        }

        public async Task<SalesData> GetSalesDataRange(DateTime startDate, DateTime endDate)
        {
            var paramaters = new SqlParameter[]
            {
                new SqlParameter("@FECHA_INICIAL", startDate),
                new SqlParameter("@FECHA_FINAL", endDate)
            };

            var result = new SalesData();

            using (var reader = await _databaseConnection.ExecuteStoredProcedure("sp_SalesDataByDateRange", paramaters))
            {
                return new SalesData
                {
                    TotalSales = await reader.ReadAsync() ? reader.GetDecimal(reader.GetOrdinal("TOTAL_VENTAS")) : 0
                };
            }

                //var resultTable = await _databaseConnection.ExecuteStoredProcedure("sp_SalesDataByDateRange", paramaters);
            
           
            //return new SalesData
            //{
            //    TotalSales = resultTable.Rows.Count > 0 ? Convert.ToDecimal(resultTable.Rows[0]["TOTAL_VENTAS"]) : 0
            //};



        }

        public async Task<SalesData> GetAccumulatedSalesData(DateTime endDate)
        {
            var paramaters = new SqlParameter[]
            {
                
                new SqlParameter("@FECHA_FINAL", endDate)
            };

            var result = new SalesData();

            using (var reader = await _databaseConnection.ExecuteStoredProcedure("sp_SalesAccumulatedByRange", paramaters))
            {
                return new SalesData
                {
                    TotalSales = await reader.ReadAsync() ? reader.GetDecimal(reader.GetOrdinal("TOTAL_VENTAS")) : 0
                };
            }

            //DataTable resultTable = await _databaseConnection.ExecuteStoredProcedure("sp_SalesAccumulatedByRange", paramaters);

            //return new SalesData
            //{
            //    TotalSales = resultTable.Rows.Count > 0 ? Convert.ToDecimal(resultTable.Rows[0]["TOTAL_VENTAS"]) : 0
            //};

        }

        public async Task<AnnualVariationRevenues> GetVariationIncome(DateTime startDate, DateTime endDate)
        {
            var paramaters = new SqlParameter[]
            {
                new SqlParameter("@FECHA_INICIAL", startDate),
                new SqlParameter("@FECHA_FINAL", endDate)
            };

            var result = new AnnualVariationRevenues();

            using (var reader = await _databaseConnection.ExecuteStoredProcedure("sp_AnnualVariationRevenues", paramaters))
            {
                return new AnnualVariationRevenues
                {
                    VariationPercentage = await reader.ReadAsync() ? reader.GetDecimal(reader.GetOrdinal("VariacionPorcentual")) : 0
                };
            }

            //DataTable resultTable =  await _databaseConnection.ExecuteStoredProcedure("sp_AnnualVariationRevenues", paramaters);

            //return new AnnualVariationRevenues
            //{
            //    VariationPercentage = resultTable.Rows.Count > 0 ? Convert.ToDecimal(resultTable.Rows[0]["VariacionPorcentual"]) : 0
            //};



        }

        public async Task<AnnualEarnings> GetAnnualEarnings(DateTime startDate,DateTime endDate)
        {
            var paramaters = new SqlParameter[]
            {
                new SqlParameter("@FECHA_INICIAL", startDate),
                new SqlParameter("@FECHA_FINAL", endDate)
            };

            var result = new AnnualEarnings();

            using (var reader = await _databaseConnection.ExecuteStoredProcedure("sp_AnnualEarnings", paramaters))
            {
                return new AnnualEarnings
                {
                    TotalEarnings = await reader.ReadAsync() ? reader.GetDecimal(reader.GetOrdinal("Utilidad")) : 0
                };
            }

            //DataTable resultTable = await _databaseConnection.ExecuteStoredProcedure("sp_AnnualEarnings", paramaters);

            //return new AnnualEarnings
            //{
            //    TotalEarnings = resultTable.Rows.Count > 0 ? Convert.ToDecimal(resultTable.Rows[0]["Utilidad"]) : 0
            //};

        }

        public async Task<EarningAccumulated> GetEarningAccumulated(DateTime endDate)
        {
            var paramaters = new SqlParameter[]
            {
                new SqlParameter("@FECHA_FINAL", endDate)
            };


            var result = new EarningAccumulated();

            using (var reader = await _databaseConnection.ExecuteStoredProcedure("sp_EarningsAccumulated", paramaters))
            {
                return new EarningAccumulated
                {
                    TotalEarnings = await reader.ReadAsync() ? reader.GetDecimal(reader.GetOrdinal("Utilidad")) : 0
                };
            }
            //DataTable resultTable = await _databaseConnection.ExecuteStoredProcedure("sp_EarningsAccumulated", paramaters);

            //return new EarningAccumulated
            //{
            //    TotalEarnings = resultTable.Rows.Count > 0 ? Convert.ToDecimal(resultTable.Rows[0]["Utilidad"]) : 0
            //};

        }

        public async Task<AnnualVariationRevenues> GetVariationProfit(DateTime startDate, DateTime endDate)
        {
            var paramaters = new SqlParameter[]
            {
                new SqlParameter("@FECHA_INICIAL", startDate),
                new SqlParameter("@FECHA_FINAL", endDate)
            };
            var result = new AnnualVariationRevenues();

            using (var reader = await _databaseConnection.ExecuteStoredProcedure("sp_AnnualVariationIncomes", paramaters))
            {
                return new AnnualVariationRevenues
                {
                    VariationPercentage = await reader.ReadAsync() ? reader.GetDecimal(reader.GetOrdinal("Variacion")) : 0
                };
            }

            //DataTable resultTable = await _databaseConnection.ExecuteStoredProcedure("sp_AnnualVariationIncomes", paramaters);

            //return new AnnualVariationRevenues
            //{
            //    VariationPercentage = resultTable.Rows.Count > 0 ? Convert.ToDecimal(resultTable.Rows[0]["Variacion"]) : 0
            //};



        }

        public async Task<List<AccumulatedProfitLossEarnings>> GetAccumulatedProfitLossEarnings(int year)
        {
             
    
            var paramaters = new SqlParameter[]
            {
                new SqlParameter("@anio", SqlDbType.Int)
                {
                    Value = year
                }
            };

            var result = new List<AccumulatedProfitLossEarnings>();

            using (var reader = await _databaseConnection.ExecuteStoredProcedure("sp_ReportProfitLossEarnings", paramaters))
            {
                while (await reader.ReadAsync())
                {
                    result.Add(new AccumulatedProfitLossEarnings
                    {
                        NumberMonth = reader.GetInt64(reader.GetOrdinal("NumeroMes")),
                        NameMonth = reader.GetString(reader.GetOrdinal("NombreMes")),
                        TotalIncome = reader.GetDecimal(reader.GetOrdinal("Ingresos")),
                        TotalExpenses = reader.GetDecimal(reader.GetOrdinal("Egresos")),
                        TotalEarnings = reader.GetDecimal(reader.GetOrdinal("Utilidad"))
                    });
                }
                return result;
            }
           
        }

        public async Task<AnnualVariationRevenues> GetAnnualVariationRevenues(DateTime startDate, DateTime endDate)
        {
            var paramaters = new SqlParameter[]
            {
                new SqlParameter("@FECHA_INICIAL", startDate ),
                new SqlParameter("@FECHA_FINAL", endDate )
            };

            var result = new AnnualVariationRevenues();

            using (var reader = await _databaseConnection.ExecuteStoredProcedure("sp_AnnualVariationRevenues", paramaters))
            {
                return new AnnualVariationRevenues
                {
                    VariationPercentage = await reader.ReadAsync() ? reader.GetDecimal(reader.GetOrdinal("VariacionPorcentual")) : 0
                };
            }

            //DataTable resultTable = await _databaseConnection.ExecuteStoredProcedure("sp_AnnualVariationRevenues", paramaters);

            //return new AnnualVariationRevenues
            //{
            //    VariationPercentage = resultTable.Rows.Count > 0 ? Convert.ToDecimal(resultTable.Rows[0]["VariacionPorcentual"]) : 0
            //};
        }

        

        public async Task<List<SalesbyCategory>> GetSalesbyCategoriesAsync(DateTime startDate, DateTime endDate)
        {
            var paramaters = new SqlParameter[]
            {
                new SqlParameter("@FECHA_INICIAL", startDate ),
                new SqlParameter("@FECHA_FINAL", endDate )
            };

            var result = new List<SalesbyCategory>();

            using (var reader = await _databaseConnection.ExecuteStoredProcedure("sp_salesByCategory", paramaters))
            {
                while (await reader.ReadAsync())
                {
                    result.Add(new SalesbyCategory
                    {
                        Code = reader.GetString(reader.GetOrdinal("Codigo")),
                        Description = reader.GetString(reader.GetOrdinal("Cuenta")),
                        Saldo = reader.GetDecimal(reader.GetOrdinal("Saldo"))
                    });
                }
                return result;
            }


            //DataTable resultTable = await _databaseConnection.ExecuteStoredProcedure("sp_salesByCategory", paramaters);
       
            //return resultTable.AsEnumerable().Select(row => new SalesbyCategory 
            //{
            //    Code = row.Field<string>("Codigo"),
            //    Description = row.Field<string>("Cuenta"),
            //    Saldo = row.Field<decimal>("Saldo"),
            //}).ToList();
            
        }


        public async Task<MarginEarnings> GetMarginEarnings(DateTime startDate, DateTime endDate)
        {
            var paramaters = new SqlParameter[]
            {
                new SqlParameter("@FECHA_INICIAL", startDate ),
                new SqlParameter("@FECHA_FINAL", endDate )
            };

            var result = new MarginEarnings();

            using (var reader = await _databaseConnection.ExecuteStoredProcedure("sp_MarginEarnings", paramaters))
            {
                return new MarginEarnings
                {
                    TotalEarnings = await reader.ReadAsync() ? reader.GetDecimal(reader.GetOrdinal("MargenUtilidadNeta")) : 0
                };
            }

            //DataTable resultTable = await _databaseConnection.ExecuteStoredProcedure("sp_MarginEarnings", paramaters);

            //return new MarginEarnings
            //{
            //    TotalEarnings = resultTable.Rows.Count > 0 ? Convert.ToDecimal(resultTable.Rows[0]["MargenUtilidadNeta"]) : 0
            //};
        }

        public async Task<LiquidityRatio> GetLiquidityRatioAsync(DateTime startDate, DateTime endDate)
        {
            var paramaters = new SqlParameter[]
            {
                new SqlParameter("@FECHA_INICIAL", startDate ),
                new SqlParameter("@FECHA_FINAL", endDate )
            };

            var result = new LiquidityRatio();

            using (var reader = await _databaseConnection.ExecuteStoredProcedure("sp_liquidityLevel", paramaters))
            {
                return new LiquidityRatio
                {
                    LiquidityLevel = await reader.ReadAsync() ? reader.GetDecimal(reader.GetOrdinal("Liquidez")) : 0
                };
            }

            //DataTable resultTable = await _databaseConnection.ExecuteStoredProcedure("sp_liquidityLevel", paramaters);

            //return new LiquidityRatio
            //{
            //    LiquidityLevel = resultTable.Rows.Count > 0 ? Convert.ToDecimal(resultTable.Rows[0]["Liquidez"]) : 0
            //};
        }



    }
}
