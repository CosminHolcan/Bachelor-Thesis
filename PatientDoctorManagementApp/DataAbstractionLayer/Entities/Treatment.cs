using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer.Entities
{
    public class Treatment
    {
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }

        public Guid DiseaseId { get; set; }
        public Disease Disease { get; set; }

        public Guid DoctorId { get; set; }
        public Doctor Doctor { get; set; }

        public virtual ICollection<Medicine> Medicines { get; set; }

        public DateTime StartingDate { get; set; }

        public string Observations { get; set; }
    }
}
