using System;
using System.Collections.Generic;

namespace DataAbstractionLayer.Entities
{
    public class Medicine
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual ICollection<Treatment> Treatments { get; set; }
    }
}
