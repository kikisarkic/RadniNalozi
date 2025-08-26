namespace Backend.Models.DTO
{
    public record RadniNalogReadDto(
        int Sifra, 
        DateTime? Datum, 
        string PotraziteljNaziv, 
        string RadnikIme, 
        string StrojNaziv,
        string RacunBroj);
}
