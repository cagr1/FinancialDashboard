using System;
using System.Collections.Generic;

namespace DashboardAPI.Models
{
    public class SalesData
    {
        
        public decimal TotalSales { get; set; }
    }
    public class AccumulatedProfitLossEarnings
    {
        public long NumberMonth { get; set; }
        public string NameMonth { get; set; }
        public decimal TotalIncome { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal TotalEarnings { get; set; }

    }

    public class AnnualVariationRevenues
    {
    
        public decimal VariationPercentage { get; set; }
    }
    public class AnnualEarnings
    {
        public decimal TotalEarnings { get; set; }
    }

    public class EarningAccumulated
    {
        public decimal TotalEarnings { get; set; }
    }

   
    public class SalesbyCategory
    {
    public string Code { get; set; }
    public string Description { get; set; }
    public decimal Saldo { get; set; }
    // public decimal SecurityServiceSales { get; set; } // 41020101
    // public decimal MonitorServiceSales { get; set; }   // 41020102
    // public decimal KitSales { get; set; }             // 41020103
    // public decimal AlarmSales { get; set; }           // 41020104
    // public decimal MaintenanceSales { get; set; }     // 41020105
    // public decimal MaterialSales { get; set; }        // 41020106

    }

    public class MarginEarnings
    {
        public decimal TotalEarnings { get; set; }
    }

    public class LiquidityRatio
    {
        public decimal LiquidityLevel { get; set; }
    }

   







}
