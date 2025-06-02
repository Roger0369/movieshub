using Microsoft.AspNetCore.Mvc;
using ApiPeliculas.Data;
using ApiPeliculas.Models;
using Microsoft.EntityFrameworkCore;

namespace ApiPeliculas.Controllers
{
        // Indica que esta clase es un controlador de API y que sus rutas comienzan con "api/movies".
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MoviesController(ApplicationDbContext context)
        {
            _context = context;
        }
        // Método GET: api/movies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Movie>>> GetAll()
        {
            return await _context.Movies.ToListAsync();
        }

        // Método GET: api/movies/{id}
        // Busca una película por su ID y la devuelve si existe.
        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> GetById(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
                return NotFound();
            return movie;
        }
        // Método POST: api/movies
        // Crea una nueva película y la guarda en la base de datos.
        [HttpPost]
        public async Task<ActionResult<Movie>> Create(Movie movie)
        {
            _context.Movies.Add(movie);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = movie.Id }, movie);
        }
        // Método PUT: api/movies/{id}
        // Actualiza los datos de una película existente.
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Movie updatedMovie)
        {
            if (id != updatedMovie.Id)
            {
                return BadRequest("El ID de la URL no coincide con el ID del cuerpo.");
            }

            var existingMovie = await _context.Movies.FindAsync(id);
            if (existingMovie == null)
            {
                return NotFound("Película no encontrada.");
            }

            // Actualiza los campos de la película existente con los nuevos valores
            existingMovie.Name = updatedMovie.Name;
            existingMovie.Description = updatedMovie.Description;

            // Marca la entidad como modificada y guarda cambios.
            _context.Movies.Update(existingMovie);
            await _context.SaveChangesAsync();

            // Devuelve 204 NoContent para indicar éxito sin contenido.
            return NoContent();
        }

    }
}
