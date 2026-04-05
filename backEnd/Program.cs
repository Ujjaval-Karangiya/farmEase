using backEnd.Configurations;
using backEnd.Middlewares;

var builder = WebApplication.CreateBuilder(args);

// ─── Service Registrations ───────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddMySqlDatabase(builder.Configuration);
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddSwaggerWithJwt();
builder.Services.AddApplicationServices();
builder.Services.AddAngularCors();

// ─── Pipeline Configuration ──────────────────────────────────────────────────
var app = builder.Build();

app.UseGlobalExceptionMiddleware();  // Must be first in the pipeline

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngularApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
