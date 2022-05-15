using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp.DTO
{
    public class AddTreatmentDTO: BaseDTO
    {
        public AddTreatmentEntityDTO Treatment { get; set; }
    }
}
