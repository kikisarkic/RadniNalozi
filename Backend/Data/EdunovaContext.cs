using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class EdunovaContext(DbContextOptions<EdunovaContext> options) : DbContext(options)
    {
        public DbSet<Stroj> Strojevi { get; set; } //zbog ovog ovdije Strojevi se tablica zove u mnozini
        public  DbSet<Potrazitelj> Potrazitelji { get; set; } //zbog ovog ovdije Entiteti se tablica zove u mnozini
        public DbSet<Racun> Racuni { get; set; } //zbog ovog ovdije Entiteti se tablica zove u mnozini
        public DbSet<Radnik> Radnici { get; set; }
        public DbSet<RadniNalog> RadniNalozi { get; set; } //zbog ovog ovdije Entiteti se tablica zove u mnozini

        override protected void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<RadniNalog>().HasOne(x=>x.Stroj);
            modelBuilder.Entity<RadniNalog>().HasOne(x => x.Radnik);
            modelBuilder.Entity<RadniNalog>().HasOne(x => x.Racun);
            modelBuilder.Entity<RadniNalog>().HasOne(x => x.Potrazitelj);
        }

    }
}

