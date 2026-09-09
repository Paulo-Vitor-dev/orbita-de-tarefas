using Microsoft.EntityFrameworkCore;
using OrbitaTarefas.Api.Data;
using OrbitaTarefas.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/api/tarefas", async (AppDbContext context) =>
{
    var tarefas = await context.Tarefas.ToListAsync();

    return Results.Ok(tarefas);
});

app.MapGet("/api/tarefas/{id}", async (int id, AppDbContext context) =>
{
    var tarefa = await context.Tarefas.FindAsync(id);

    if (tarefa is null)
    {
        return Results.NotFound();
    }

    return Results.Ok(tarefa);
});

app.MapPost("/api/tarefas", async (Tarefa novaTarefa, AppDbContext context) =>
{
    if (string.IsNullOrWhiteSpace(novaTarefa.Titulo))
    {
        return Results.BadRequest("O título da tarefa é obrigatório.");
    }

    context.Tarefas.Add(novaTarefa);

    await context.SaveChangesAsync();

    return Results.Created($"/api/tarefas/{novaTarefa.Id}", novaTarefa);
});

app.MapPut("/api/tarefas/{id}", async (int id, Tarefa tarefaAtualizada, AppDbContext context) =>
{
    var tarefa = await context.Tarefas.FindAsync(id);

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

    await context.SaveChangesAsync();

    return Results.Ok(tarefa);
});

app.MapDelete("/api/tarefas/{id}", async (int id, AppDbContext context) =>
{
    var tarefa = await context.Tarefas.FindAsync(id);

    if (tarefa is null)
    {
        return Results.NotFound();
    }

    context.Tarefas.Remove(tarefa);

    await context.SaveChangesAsync();

    return Results.NoContent();
});

app.Run();