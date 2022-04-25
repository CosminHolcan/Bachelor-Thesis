using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer.Models
{
    public class Doctor: User
    {
        public Specialization specialization { get; set; }
        public virtual ICollection<Treatment> Treatments { get; set; }
    }
}
