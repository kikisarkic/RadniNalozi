
using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RadniNalogController(EdunovaContext context, IMapper mapper) : GoldDiggerController(context, mapper)
    {
        [HttpGet]
        public ActionResult<List<RadniNalogDTORead>> Get()
        {
            try
            {
                var lista = _context.RadniNalozi
                    .Include(r => r.Radnik)
                    .Include(r => r.Stroj)
                    .Include(r => r.Potrazitelj)
                    .Include(r => r.Racun)
                    .ToList();
                return Ok(_mapper.Map<List<RadniNalogDTORead>>(lista)); //vraca sve strojeve iz baze
            }
            catch (Exception e)
            {
                return BadRequest(e); //ako se dogodi greska vraca 400 Bad Request i ispisuje poruku greske
            }
        }


        [HttpGet("{sifra:int}")]
        public ActionResult<RadniNalogDTOInsertUpdate> Get(int sifra)
        {
            try
            {
                var rn = _context.RadniNalozi
                    .Include(r => r.Radnik)
                    .Include(r => r.Stroj)
                    .Include(r => r.Potrazitelj)
                    .Include(r => r.Racun)
                    .Where(r => r.Sifra == sifra)
                    .ToList();
                return Ok(_mapper.Map<RadniNalogDTOInsertUpdate>(rn)); //vraca sve strojeve iz baze
            }
            catch (Exception e)
            {
                return BadRequest(e); //ako se dogodi greska vraca 400 Bad Request i ispisuje poruku greske
            }
        }


        [HttpPost]
        public ActionResult<RadniNalogDTORead> POST(RadniNalogDTOInsertUpdate nalog)
        {
            try
            {

                var n = new RadniNalog();

                var potrazitelj = _context.Potrazitelji.Find(nalog.PotraziteljSifra);
                if (potrazitelj == null)
                {
                    return NotFound(new { poruka = "Potrazitelj nije pronadjen" });
                }
                n.Potrazitelj = potrazitelj;


                var radnik = _context.Radnici.Find(nalog.RadnikSifra);
                if (radnik == null)
                {
                    return NotFound(new { poruka = "Radnik nije pronadjen" });
                }
                n.Radnik = radnik;


                var stroj = _context.Strojevi.Find(nalog.StrojSifra);
                if (stroj == null)
                {
                    return NotFound(new { poruka = "Stroj nije pronadjen" });
                }
                n.Stroj = stroj;

                var racun = _context.Racuni.Find(nalog.RacunSifra);
                if (racun == null)
                {
                    return NotFound(new { poruka = "Racun nije pronadjen" });
                }
                n.Racun = racun;
                n.Datum = nalog.Datum;

                _context.RadniNalozi.Add(n);
                _context.SaveChanges();
                return Ok(_mapper.Map<RadniNalogDTORead>(n)); //vraca sve strojeve iz baze
            }
            catch (Exception e)
            {
                return BadRequest(e); //ako se dogodi greska vraca 400 Bad Request i ispisuje poruku greske
            }
        }


        [HttpPut("{sifra:int}")]
        public ActionResult<RadniNalogDTORead> Put(int sifra, RadniNalogDTOInsertUpdate nalog)
        {
            try
            {

                var n = _context.RadniNalozi.Find(sifra);

                if (n == null || sifra < 1)
                {
                    return NotFound(new { poruka = "Radni nalog nije pronadjen" });
                }

                var potrazitelj = _context.Potrazitelji.Find(nalog.PotraziteljSifra);
                if (potrazitelj == null)
                {
                    return NotFound(new { poruka = "Potrazitelj nije pronadjen" });
                }
                n.Potrazitelj = potrazitelj;


                var radnik = _context.Radnici.Find(nalog.RadnikSifra);
                if (radnik == null)
                {
                    return NotFound(new { poruka = "Radnik nije pronadjen" });
                }
                n.Radnik = radnik;


                var stroj = _context.Strojevi.Find(nalog.StrojSifra);
                if (stroj == null)
                {
                    return NotFound(new { poruka = "Stroj nije pronadjen" });
                }
                n.Stroj = stroj;

                var racun = _context.Racuni.Find(nalog.RacunSifra);
                if (racun == null)
                {
                    return NotFound(new { poruka = "Racun nije pronadjen" });
                }
                n.Racun = racun;
                n.Datum = nalog.Datum;

                _context.RadniNalozi.Update(n);
                _context.SaveChanges();
                return Ok(_mapper.Map<RadniNalogDTORead>(n)); 
            }
            catch (Exception e)
            {
                return BadRequest(e); //ako se dogodi greska vraca 400 Bad Request i ispisuje poruku greske
            }
        }



        [HttpDelete("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            if (sifra < 1)
            {
                return BadRequest(new { poruka = "Sifra mora biti veca od 0" });
            }
            try
            {
                var s = _context.RadniNalozi.Find(sifra);
                if (s == null)
                {
                    return NotFound(new { poruka = "Radni nalov nije pronadjen" });
                }

                _context.RadniNalozi.Remove(s);
                _context.SaveChanges();
                return Ok(new {poruka="Uspjesno obrisano" });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


    }
}