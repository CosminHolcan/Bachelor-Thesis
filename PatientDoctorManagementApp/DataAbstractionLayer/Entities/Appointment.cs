using System;

namespace DataAbstractionLayer.Entities
{
    public class Appointment
    {
        public Guid DoctorId { get; set; }
        public Doctor Doctor { get; set; }

        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }

        public DateTime StartTime { get; set; }
    }
}
