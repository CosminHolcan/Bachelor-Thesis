using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer.Models
{
    public class AppointmentsByDoctorForPatient
    {
        public List<DateTime> PatientAppointments { get; set; }
        public List<DateTime> OtherAppointments { get; set; }
    }
}
