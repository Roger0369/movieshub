using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using ApiPeliculas.Models;
using ApiPeliculas.Services;

namespace ApiPeliculas.Controllers

// Marcar esta clase y definir como un controlador de API
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        // Inyectar el servicio de autenticación y la configuración
        private readonly AuthService _authService;
        private readonly IConfiguration _configuration;
        // Constructor que recibe el servicio de autenticación y la configuración
        public AuthController(AuthService authService, IConfiguration configuration)
        {
            _authService = authService;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin login)
        {
            var user = await _authService.ValidateAndGetUserAsync(login);

            if (user == null)
                return Unauthorized("Credenciales inválidas");

            var token = GenerateJwtToken(user.Username);
            return Ok(new { token });
        }
        // Método privado para generar un JWT a partir del nombre de usuario
        private string GenerateJwtToken(string username)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username)
            };
            // Se crea el token JWT con los claims, emisor, audiencia, expiración y firma
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );
            // Se serializa el token para enviarlo como string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
