using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp.DTO
{
    public class AddFeedbackEntityDTO
    {
        public string PatientId { get; set; }
        public string DoctorId { get; set; }
        public string DiseaseId { get; set; }
        public DateTime TimeStamp { get; set; }
        public string Text { get; set; }
        public bool GivenByPatient { get; set; }
    }
}
