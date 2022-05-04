using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp.DTO
{
    public class AddAppointmentEntityDTO
    {
        public string DoctorId { get; set; }
        public DateTime StartTime { get; set; }
    }
}
