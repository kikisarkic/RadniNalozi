namespace Backend.Models.DTO
{
    public record RadniNalogDTORead(
        int Sifra, 
        DateTime? Datum, 
        string PotraziteljNaziv, 
        string RadnikIme, 
        string StrojNaziv,
        string RacunBroj);
}
