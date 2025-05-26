using Microsoft.Identity.Client;

namespace TLOUdle.Server.Modulos
{
    public class Personajes
    {
        public int Id { get; set; }
        public String Nombre { get; set; }
        public String Altura { get; set; }
        public int Edad {  get; set; }
        public String Sexo { get; set; }
        public String ColorPelo { get; set; }
        public int Juegos { get; set; }
        public String TipoPersonaje { get; set; }
        public String Estado { get; set; }
        public String Descripcion { get; set; }
        public String Foto { get; set; }
    }
}
