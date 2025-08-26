using Backend.Data;
using Backend.Mapping;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSwaggerGen();

//dodavanje Db contexta
builder.Services.AddDbContext<EdunovaContext>(o => {
   
    o.UseSqlServer(builder.Configuration.GetConnectionString("EdunovaContext"));
});


builder.Services.AddCors(o =>
{
    o.AddPolicy("CorsPolicy", p =>
    {
        p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

// automapper
builder.Services.AddAutoMapper(cfg => {
    cfg.AddProfile<EdunovaMappingProfile>();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    // https://github.com/domaindrivendev/Swashbuckle.AspNetCore/blob/cec1dc005b96b6a3d3962ba063ded2e5b8f9636b/src/Swashbuckle.AspNetCore.SwaggerUI/SwaggerUIOptionsExtensions.cs#L143
    //options.ConfigObject.TryItOutEnabled = true;
    options.EnableTryItOutByDefault();
});


app.MapControllers();


app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");


app.UseCors("CorsPolicy");

app.Run();