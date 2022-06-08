using System.Collections.Generic;

namespace DataAbstractionLayer.Entities
{
    public class Patient: User
    {
        public virtual ICollection<Disease> Diseases { get; set; }
        public virtual ICollection<Treatment> Treatments { get; set; }
    }
}
