using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer.Models
{
    public class Disease
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Descripttion { get; set; }
        public virtual ICollection<Patient> Patients { get; set; }
        public virtual ICollection<Treatment> Treatments { get; set; }
    }
}
