
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class PotraziteljController : ControllerBase

    {

        // koristimo dependency injection

        // 1. definiramo privatno svojstvo
        private readonly EdunovaContext _context;
        //  2.konstruktoru postavljamo vrijednost
        public PotraziteljController(EdunovaContext context)
        { _context = context; }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Potrazitelji); //vraca sve strojeve iz baze
            }
            catch (Exception e)
            {
                return BadRequest(e); //ako se dogodi greska vraca 400 Bad Request i ispisuje poruku greske
            }
        }


        [HttpPost]
        public IActionResult Post(Potrazitelj potrazitelj)
        {
            try
            {

                _context.Potrazitelji.Add(potrazitelj);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, potrazitelj);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("{sifra:int}")]
        public IActionResult Put(int sifra, Potrazitelj potrazitelj)
        {
            if (sifra < 1)
            {
                return BadRequest(new { poruka = "Sifra mora biti veca od 0" });
            }
            try
            {
                Potrazitelj e = _context.Potrazitelji.Find(sifra);
                if (e == null)
                {
                    return NotFound(new { poruka = "Potrazitelj nije pronadjen" });
                }




                e.Naziv= potrazitelj.Naziv;
                e.Adresa = potrazitelj.Adresa;
                e.OIB = potrazitelj.OIB;
                e.Telefon = potrazitelj.Telefon;
                e.Email = potrazitelj.Email;


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
                Potrazitelj e = _context.Potrazitelji.Find(sifra);
                if (e == null)
                {
                    return NotFound(new { poruka = "Potrazitelj nije pronadjen" });
                }

                _context.Potrazitelji.Remove(e);
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
                var potrazitelj = _context.Potrazitelji.Find(sifra);
                if (potrazitelj == null)
                {
                    return NotFound(new { poruka = "Potrazitelj nije pronadjen" });
                }
                return Ok(potrazitelj);
            }
            catch (Exception e)
            {
                return BadRequest(e); //ako se dogodi greska vraca 400 Bad Request i ispisuje poruku greske


            }
        }
    }
}