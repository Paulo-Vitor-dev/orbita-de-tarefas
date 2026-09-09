using Microsoft.EntityFrameworkCore;
using OrbitaTarefas.Api.Models;

namespace OrbitaTarefas.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Tarefa> Tarefas { get; set; }
}