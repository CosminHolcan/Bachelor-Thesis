using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp.DTO
{
    public class AddDoctorEntityDTO : RegisterDTO
    {
        public string SpecializationId { get; set; }
    }
}
