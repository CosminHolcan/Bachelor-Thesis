using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer.Entities
{
    public class Patient: User
    {
        public virtual ICollection<Disease> Diseases { get; set; }
        public virtual ICollection<Treatment> Treatments { get; set; }
    }
}
