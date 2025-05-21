// Importa el paquete de Entity Framework Core para trabajar con bases de datos
using Microsoft.EntityFrameworkCore;

// Importa los modelos de la aplicación, en este caso el modelo 'User'
using ApiPeliculas.Models;

namespace ApiPeliculas.Data
{
    // Esta clase representa el contexto de base de datos para Entity Framework
    // Hereda de DbContext, lo que permite trabajar con la base de datos como objetos .NET
    public class ApplicationDbContext : DbContext
    {
        // Constructor que recibe las opciones de configuración del contexto (por ejemplo, la cadena de conexión)
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) // Llama al constructor base de DbContext
        {
        }

        // Esta propiedad representa la tabla 'Users' en la base de datos
        // Entity Framework la usa para realizar operaciones CRUD sobre los usuarios
        public DbSet<User> Users { get; set; }
    }
}

