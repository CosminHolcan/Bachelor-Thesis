using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp.DTO
{
    public class AddFeedbackDTO: BaseDTO
    {
        public AddFeedbackEntityDTO Feedback { get; set; }
    }
}
