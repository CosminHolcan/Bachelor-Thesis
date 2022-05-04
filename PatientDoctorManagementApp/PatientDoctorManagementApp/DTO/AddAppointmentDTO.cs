using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp.DTO
{
    public class AddAppointmentDTO : BaseDTO
    {
        public AddAppointmentEntityDTO Appointment { get; set; }
    }
}
