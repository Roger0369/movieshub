// Importa los espacios de nombres necesarios para el controlador, los modelos y servicios
using Microsoft.AspNetCore.Mvc;
using ApiPeliculas.Models;     // Para acceder al modelo UserLogin
using ApiPeliculas.Services;   // Para acceder al servicio AuthService

namespace ApiPeliculas.Controllers
{
    // Marca esta clase como un controlador de API
    [ApiController]
    
    // Define la ruta base para acceder a este controlador: api/auth
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        // Campo privado para almacenar la instancia del servicio de autenticación
        private readonly AuthService _authService;

        // Constructor que recibe el servicio AuthService por inyección de dependencias
        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        // Ruta POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin login)
        {
            // Llama al método del servicio que valida las credenciales del usuario
            var isValid = await _authService.ValidateUserAsync(login);

            // Si las credenciales no son válidas, retorna error 401 (no autorizado)
            if (!isValid)
                return Unauthorized("Credenciales inválidas");

            // Si las credenciales son correctas, retorna código 200 con mensaje de éxito
            return Ok("Login exitoso");
        }
    }
}




