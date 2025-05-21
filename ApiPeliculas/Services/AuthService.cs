using System.Data;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Data.SqlClient;
using ApiPeliculas.Models;

namespace ApiPeliculas.Services
{
    public class AuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<bool> ValidateUserAsync(UserLogin login)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            var passwordBytes = Encoding.UTF8.GetBytes(login.Password);
            var hashedPassword = Convert.ToHexString(SHA512.HashData(passwordBytes));

            var query = "SELECT COUNT(*) FROM Users WHERE Username = @Username AND PasswordHash = @PasswordHash";
            using var command = new SqlCommand(query, connection);
            command.Parameters.Add("@Username", SqlDbType.NVarChar, 100).Value = login.Username;
            command.Parameters.Add("@PasswordHash", SqlDbType.NVarChar, 128).Value = hashedPassword;

            var result = await command.ExecuteScalarAsync();
            var count = result != null ? Convert.ToInt32(result) : 0;

            return count > 0;
        }
    }
}

