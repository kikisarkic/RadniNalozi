namespace Backend.Models
{
    public class Stroj : Entitet
    {
        public string? Model { get; set; }
        public string? Tip { get; set; }
        public DateTime? Registracija { get; set; }
    }
}
