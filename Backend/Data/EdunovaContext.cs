using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class EdunovaContext : DbContext
    {
        public EdunovaContext(DbContextOptions<EdunovaContext> options) : base(options)
        {
            //ovdje se mogu fino postaviti opcije ali ne zasada
        }
        public DbSet<Stroj> Strojevi { get; set; } //zbog ovog ovdije Strojevi se tablica zove u mnozini
         public  DbSet<Potrazitelj> Potrazitelji { get; set; } //zbog ovog ovdije Entiteti se tablica zove u mnozini

        public DbSet<Radnik> Radnici { get; set; }

    }
}

