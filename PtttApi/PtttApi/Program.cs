using Microsoft.EntityFrameworkCore;
using PtttApi.Db;
using PtttApi.Repositories;
using PtttApi.Services;

var builder = WebApplication.CreateBuilder(args);

IConfigurationRoot configuration = new ConfigurationBuilder()
    .AddUserSecrets<Program>()
    .Build();

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<TenantContext>();
builder.Services.AddScoped<IRoomieRepository, RoomieRepository>();
builder.Services.AddTransient<IRoomieService, RoomieService>();

// allows for anyone to ask for anything
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});


builder.Services.AddDbContext<TenantContext>(options =>
    options.UseSqlServer(configuration["ConnectionStrings:MyConnection"])
    );


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors();

app.MapControllers();

app.Run();