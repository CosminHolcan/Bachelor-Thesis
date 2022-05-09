using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer.Models
{
    public class AppointmentForDoctor
    {
        public string PatientName { get; set; }
        public DateTime StartTime { get; set; }
    }
}
