using OrbitaTarefas.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

var tarefas = new List<Tarefa>
{
    new Tarefa
    {
        Id = 1,
        Titulo = "Estudar C#",
        Descricao = "Continuar o desenvolvimento do Órbita de Tarefas",
        Concluida = false
    },

    new Tarefa
    {
        Id = 2,
        Titulo = "Estudar Angular",
        Descricao = "Aprender integração com APIs REST",
        Concluida = false
    },

    new Tarefa
    {
        Id = 3,
        Titulo = "Criar interface",
        Descricao = "Desenvolver a interface inicial do Órbita de Tarefas",
        Concluida = true
    }
};

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/api/tarefas", () =>
{
    return tarefas;
});

app.MapGet("/api/tarefas/{id}", (int id) =>
{
    var tarefa = tarefas.FirstOrDefault(t => t.Id == id);

    if (tarefa is null)
    {
        return Results.NotFound();
    }

    return Results.Ok(tarefa);
});

app.MapPost("/api/tarefas", (Tarefa novaTarefa) =>
{
    if (string.IsNullOrWhiteSpace(novaTarefa.Titulo))
    {
        return Results.BadRequest("O título da tarefa é obrigatório.");
    }

    novaTarefa.Id = tarefas.Count + 1;

    tarefas.Add(novaTarefa);

    return Results.Created($"/api/tarefas/{novaTarefa.Id}", novaTarefa);
});

app.MapPut("/api/tarefas/{id}", (int id, Tarefa tarefaAtualizada) =>
{
    var tarefa = tarefas.FirstOrDefault(t => t.Id == id);

    if (tarefa is null)
    {
        return Results.NotFound();
    }

    if (string.IsNullOrWhiteSpace(tarefaAtualizada.Titulo))
    {
        return Results.BadRequest("O título da tarefa é obrigatório.");
    }

    tarefa.Titulo = tarefaAtualizada.Titulo;
    tarefa.Descricao = tarefaAtualizada.Descricao;
    tarefa.Concluida = tarefaAtualizada.Concluida;

    return Results.Ok(tarefa);
});

app.MapDelete("/api/tarefas/{id}", (int id) =>
{
    var tarefa = tarefas.FirstOrDefault(t => t.Id == id);

    if (tarefa is null)
    {
        return Results.NotFound();
    }

    tarefas.Remove(tarefa);

    return Results.NoContent();
});
app.Run();