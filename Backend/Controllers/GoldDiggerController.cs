using AutoMapper;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{

    public abstract class GoldDiggerController(EdunovaContext context, IMapper mapper) : ControllerBase
    {

        protected readonly EdunovaContext _context = context;

        protected readonly IMapper _mapper = mapper;
    }
}
