using TLOUdle.Server.Modulos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace TLOUdle.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VerPersonajeController : ControllerBase
    {
        private IConfiguration _configuration;
        private ILogger<VerPersonajeController> _logger;

        public VerPersonajeController(ILogger<VerPersonajeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        [HttpGet("{Id}")]
        public async Task<IActionResult> Get(int Id)
        {
            try
            {
                string sqlDataSource = _configuration.GetConnectionString("BBDD_con") ?? "";
                using SqlConnection conn = new SqlConnection(sqlDataSource);
                await conn.OpenAsync();

                string query = "SELECT * FROM dbo.Personajes WHERE Id = @Id";
                using SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@Id", Id);

                using SqlDataReader reader = await cmd.ExecuteReaderAsync();

                if (reader.Read())
                {
                    var personaje = new Personajes
                    {
                        Id = Convert.ToInt32(reader["Id"]),
                        Nombre = Convert.ToString(reader["nombre"]),
                        Altura = Convert.ToString(reader["altura"]),
                        Edad = Convert.ToInt32(reader["edad"]),
                        Sexo = Convert.ToString(reader["sexo"]),
                        ColorPelo = Convert.ToString(reader["colorPelo"]),
                        Juegos = Convert.ToInt32(reader["juegos"]),
                        TipoPersonaje = Convert.ToString(reader["tipoPersonaje"]),
                        Estado = Convert.ToString(reader["estado"]),
                        Descripcion = Convert.ToString(reader["descripcion"]),
                        Foto = Convert.ToString(reader["foto"])
                    };
                    return Ok(personaje);
                }
                else
                {
                    return NotFound($"No se encontró un personaje con ID {Id}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error al obtener el personaje con ID {Id}: {ex.Message}");
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

    }
}

