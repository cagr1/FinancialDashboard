using DashboardAPI.Data;
using DashboardAPI.Services;
using System.Net;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOutputCache();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<DatabaseConnection>();
builder.Services.AddScoped<DatabaseConnection>();
builder.Services.AddScoped<DashboardService>();
ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policiy =>
    {
        policiy.AllowAnyOrigin();
        policiy.AllowAnyMethod();
        policiy.AllowAnyHeader();
    });
});

var app = builder.Build();
app.UseCors("AllowAll");
app.UseHttpsRedirection();
app.UseOutputCache();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.MapControllers();
app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
