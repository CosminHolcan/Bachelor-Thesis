using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp.DTO
{
    public class GetAppointmentsByDoctorForPatient : BaseDTO
    {
        public string DoctorId { get; set; }
    }
}
