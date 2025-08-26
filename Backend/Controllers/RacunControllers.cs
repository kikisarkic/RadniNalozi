
using AutoMapper;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RacunController(EdunovaContext context, IMapper mapper) : GoldDiggerController(context, mapper)
    {
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Racuni); //vraca sve racune iz baze
            }
            catch (Exception e)
            {
                return BadRequest(e); //ako se dogodi greska vraca 400 Bad Request i ispisuje poruku greske
            }
        }


        [HttpPost]
        public IActionResult Post(Racun racun)
        {
            try
            {

                _context.Racuni.Add(racun);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, racun);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("{sifra:int}")]
        public IActionResult Put(int sifra, Racun racun)
        {
            if (sifra < 1)
            {
                return BadRequest(new { poruka = "Sifra mora biti veca od 0" });
            }
            try
            {
                Racun s = _context.Racuni.Find(sifra);
                if (s == null)
                {
                    return NotFound(new { poruka = "Racun nije pronadjen" });
                }




                s.NacinPlacanja = racun.NacinPlacanja;
                s.Iznos = racun.Iznos;
                

                _context.Update(s);
                _context.SaveChanges();
                return Ok(s);
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
                Racun s = _context.Racuni.Find(sifra);
                if (s == null)
                {
                    return NotFound(new { poruka = "Racun nije pronadjen" });
                }

                _context.Racuni.Remove(s);
                _context.SaveChanges();
                return Ok(s);
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
                var racun = _context.Racuni.Find(sifra);
                if (racun == null)
                {
                    return NotFound(new { poruka = "Racun nije pronadjen" });
                }
                return Ok(racun);
            }
            catch (Exception e)
            {
                return BadRequest(e); //ako se dogodi greska vraca 400 Bad Request i ispisuje poruku greske


            }
        }
    }
}