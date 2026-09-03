using OrbitaTarefas.Api.Models;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/api/tarefas", () =>
{
    var tarefa = new Tarefa
    {
        Id = 1,
        Titulo = "Estudar C#",
        Descricao = "Continuar o desenvolvimento do Órbita de Tarefas",
        Concluida = false
    };

    return tarefa;
});

app.Run();