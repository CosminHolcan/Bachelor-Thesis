using System;
using System.Collections.Generic;

namespace BusinessLogicLayer.Models
{
    public class AppointmentsByDoctorForPatient
    {
        public List<DateTime> PatientAppointments { get; set; }
        public List<DateTime> OtherAppointments { get; set; }
    }
}
