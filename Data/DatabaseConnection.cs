using System;
using System.Data;
using Microsoft.Data.SqlClient;

using Microsoft.Extensions.Configuration;


namespace DashboardAPI.Data
{
    public class DatabaseConnection : IDisposable
    {

        private readonly string _connectionString;
        
        public DatabaseConnection(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");         
            
        }

        public async Task<SqlDataReader> ExecuteStoredProcedure(string spName, SqlParameter[] parameters = null)
        {      
            var _connection = new SqlConnection(_connectionString);  
            await _connection.OpenAsync();
            
             var command = new SqlCommand(spName, _connection)
        {
            CommandType = CommandType.StoredProcedure,
            CommandTimeout = 300 // 5 minutos
        };

        if (parameters != null)
        {
            command.Parameters.AddRange(parameters);
        }

        
        return await command.ExecuteReaderAsync(CommandBehavior.CloseConnection);
            
        }

         public void Dispose()
            {
               
            }

    }
}

           

