namespace Backend.Models.DTO
{
    public record RadniNaloziDTOInsertUpdate(
        DateTime? Datum, 
        int PotraziteljSifra, 
        int RadnikSifra, 
        int StrojSifra,
        int RacunSifra);
}
