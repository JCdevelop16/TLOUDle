using TLOUdle.Server.Modulos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;


namespace TLOUdle.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PersonajeController : ControllerBase
    {
        private IConfiguration _configuration;
        private ILogger<PersonajeController> _logger;

        public PersonajeController(ILogger<PersonajeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }
        [HttpGet("personajes")]
        public async Task<IActionResult> ObtenerPersonajes()
        {
            List<Personajes> listaPersonajes = new List<Personajes>();

            try
            {
                string sqlDataSource = this._configuration.GetConnectionString("BBDD_con") ?? "";
                using SqlConnection conn = new SqlConnection(sqlDataSource);

                await conn.OpenAsync();

                using SqlCommand cmd = new SqlCommand("select * from dbo.Personajes;", conn);
                using SqlDataReader reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    listaPersonajes.Add(new Personajes
                    {
                        Id = Convert.ToInt32(reader["id"]),
                        Nombre = Convert.ToString(reader["nombre"]),
                        Altura = Convert.ToString(reader["altura"]),
                        Edad = Convert.ToInt32(reader["edad"]),
                        Sexo = Convert.ToString(reader["sexo"]),
                        ColorPelo = Convert.ToString(reader["colorpelo"]),
                        Juegos = Convert.ToInt32(reader["juegos"]),
                        TipoPersonaje = Convert.ToString(reader["tipoPersonaje"]),
                        Estado = Convert.ToString(reader["estado"]),
                        Descripcion = Convert.ToString(reader["descripcion"]),
                        Foto = Convert.ToString(reader["foto"])
                    });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error SQL: {ex.Message}");
                return StatusCode(500, $"Error al obtener Personajes: {ex.Message}");
            }
            return Ok(listaPersonajes);
        }
    }
    
}
