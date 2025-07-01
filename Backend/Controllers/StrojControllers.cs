
using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")] 
    public class StrojController : ControllerBase

    {

        //koristimo dependency injection

        //1. definiramo privatno svojstvo
        private readonly EdunovaContext _context;
        // 2.konstruktoru postavljamo vrijednost
        public StrojController(EdunovaContext context)
        { _context = context; }

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
    }
}