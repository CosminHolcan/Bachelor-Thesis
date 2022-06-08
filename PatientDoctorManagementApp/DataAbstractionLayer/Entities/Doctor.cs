using System.Collections.Generic;

namespace DataAbstractionLayer.Entities
{
    public class Doctor: User
    {
        public Specialization Specialization { get; set; }
        public virtual ICollection<Treatment> Treatments { get; set; }
    }
}
