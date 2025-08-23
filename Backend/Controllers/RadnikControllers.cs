
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RadnikController : ControllerBase

    {

        // koristimo dependency injection

        // 1. definiramo privatno svojstvo
        private readonly EdunovaContext _context;
        //  2.konstruktoru postavljamo vrijednost
        public RadnikController(EdunovaContext context)
        { _context = context; }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Radnici); //vraca sve strojeve iz baze
            }
            catch (Exception e)
            {
                return BadRequest(e); //ako se dogodi greska vraca 400 Bad Request i ispisuje poruku greske
            }
        }


        [HttpPost]
        public IActionResult Post(Radnik radnik)
        {
            try
            {

                _context.Radnici.Add(radnik);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, radnik);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("{sifra:int}")]
        public IActionResult Put(int sifra, Radnik radnik)
        {
            if (sifra < 1)
            {
                return BadRequest(new { poruka = "Sifra mora biti veca od 0" });
            }
            try
            {
                Radnik e = _context.Radnici.Find(sifra);
                if (e == null)
                {
                    return NotFound(new { poruka = "Radnik nije pronadjen" });
                }




                e.Ime=radnik.Ime;
                e.Prezime=radnik.Prezime;
                e.Telefon=radnik.Telefon;


                _context.Update(e);
                _context.SaveChanges();
                return Ok(e);
            }
            catch (Exception e)
            {
                return BadRequest(e);
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
                Radnik e = _context.Radnici.Find(sifra);
                if (e == null)
                {
                    return NotFound(new { poruka = "Radnik nije pronadjen" });
                }

                _context.Radnici.Remove(e);
                _context.SaveChanges();
                return Ok(e);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("{sifra:int}")]
        public IActionResult Get(int sifra)
        {

            if (sifra <= 0)
            {
                return BadRequest("sifra nije dobra");
            }
            try
            {
                var radnik = _context.Radnici.Find(sifra);
                if (radnik == null)
                {
                    return NotFound(new { poruka = "Radnik nije pronadjen" });
                }
                return Ok(radnik);
            }
            catch (Exception e)
            {
                return BadRequest(e); //ako se dogodi greska vraca 400 Bad Request i ispisuje poruku greske


            }
        }
    }
}