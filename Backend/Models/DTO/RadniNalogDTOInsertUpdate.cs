namespace Backend.Models.DTO
{
    public record RadniNalogDTOInsertUpdate(
        DateTime? Datum, 
        int PotraziteljSifra, 
        int RadnikSifra, 
        int StrojSifra,
        int RacunSifra);
}
