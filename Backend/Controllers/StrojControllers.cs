
using AutoMapper;
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class StrojController(EdunovaContext context, IMapper mapper) : GoldDiggerController(context, mapper)
    {
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Strojevi); //vraca sve strojeve iz baze
            }
            catch (Exception e)
            {
                return BadRequest(e); //ako se dogodi greska vraca 400 Bad Request i ispisuje poruku greske
            }
        }


        [HttpPost]
        public IActionResult Post(Stroj stroj)
        {
            try
            {

                _context.Strojevi.Add(stroj);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, stroj);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("{sifra:int}")]
        public IActionResult Put(int sifra, Stroj stroj)
        {
            if (sifra < 1)
            {
                return BadRequest(new { poruka = "Sifra mora biti veca od 0" });
            }
            try
            {
                Stroj s =_context.Strojevi.Find(sifra);
                if (s == null)
                {
                    return NotFound(new { poruka = "Stroj nije pronadjen" });
                }




                s.Model = stroj.Model;
                s.Tip = stroj.Tip;
                s.Registracija = stroj.Registracija;

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
                Stroj s = _context.Strojevi.Find(sifra);
                if (s == null)
                {
                    return NotFound(new { poruka = "Stroj nije pronadjen" });
                }

                _context.Strojevi.Remove(s);
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
                var stroj = _context.Strojevi.Find(sifra);
                if (stroj == null)
                {
                    return NotFound(new { poruka = "Stroj nije pronadjen" });
                }
                return Ok(stroj);
            }
            catch (Exception e)
            {
                return BadRequest(e); //ako se dogodi greska vraca 400 Bad Request i ispisuje poruku greske


            }
        }
    }
}