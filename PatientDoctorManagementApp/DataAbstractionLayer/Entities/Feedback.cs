using System;

namespace DataAbstractionLayer.Entities
{
    public class Feedback
    {
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }

        public Guid DiseaseId { get; set; }
        public Disease Disease { get; set; }

        public Guid DoctorId { get; set; }
        public Doctor Doctor { get; set; }

        public bool GivenByPatient { get; set; }

        public string Text { get; set; }

        public DateTime TimeStamp { get; set; }
    }
}
