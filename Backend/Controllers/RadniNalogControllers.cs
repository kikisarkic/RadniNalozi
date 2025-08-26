
using AutoMapper;
using Backend.Data;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RadniNalogController(EdunovaContext context, IMapper mapper) : GoldDiggerController(context, mapper)
    {
        [HttpGet]
        public ActionResult<List<RadniNalogReadDto>> Get()
        {
            try
            {
                var lista = _context.RadniNalozi
                    .Include(r => r.Radnik)
                    .Include(r => r.Stroj)
                    .Include(r => r.Potrazitelj)
                    .Include(r => r.Racun)
                    .ToList();
                return Ok(_mapper.Map<List<RadniNalogReadDto>>(lista)); //vraca sve strojeve iz baze
            }
            catch (Exception e)
            {
                return BadRequest(e); //ako se dogodi greska vraca 400 Bad Request i ispisuje poruku greske
            }
        }


       
        
    }
}