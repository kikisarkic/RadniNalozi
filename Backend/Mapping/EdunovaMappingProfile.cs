using AutoMapper;
using Backend.Models;
using Backend.Models.DTO;
using System.Text.RegularExpressions;

namespace Backend.Mapping
{ /// <summary>
  /// Klasa <c>EdunovaMappingProfile</c> definira AutoMapper profile za mapiranje entiteta i DTO objekata u aplikaciji Edunova.
  /// Služi za konfiguraciju pravila mapiranja između modela baze podataka i DTO modela koji se koriste za prijenos podataka.
  /// </summary>
    public class EdunovaMappingProfile : Profile
    {

        public EdunovaMappingProfile()
        {


            CreateMap<RadniNalog, RadniNalogReadDto>()
                 .ForCtorParam(
                     "PotraziteljNaziv",
                     opt => opt.MapFrom(src => src.Potrazitelj.Naziv)
                 ).ForCtorParam(
                     "RadnikIme",
                     opt => opt.MapFrom(src => src.Radnik.Ime)
                 ).ForCtorParam(
                     "StrojNaziv",
                     opt => opt.MapFrom(src => src.Stroj.Model)
                 ).ForCtorParam(
                     "RacunBroj",
                     opt => opt.MapFrom(src => src.Racun.Iznos)
                 );


        }
    }
}