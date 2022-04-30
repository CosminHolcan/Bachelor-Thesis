using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp.DTO
{
    public class AddDoctorDTO: BaseDTO
    {
        public AddDoctorEntityDTO Doctor { get; set; }
    }
}
