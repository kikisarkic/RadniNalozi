using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class RadniNalog: Entitet
    {

        public DateTime? Datum { get; set; }

        [ForeignKey("potrazitelj")]
        public Potrazitelj Potrazitelj { get; set; }=new Potrazitelj();

        [ForeignKey("radnik")]
        public Radnik Radnik { get; set; }=new Radnik();

        [ForeignKey("stroj")]
        public Stroj Stroj { get; set; }=new Stroj();

        [ForeignKey("racun")]
        public Racun Racun { get; set; }=new Racun();
    }
}
