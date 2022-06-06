using System;

namespace BusinessLogicLayer.Models
{
    public class FeedbackInfo
    {
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
        public Guid DiseaseId { get; set; }
        public DateTime TimeStamp { get; set; }
        public string Text { get; set; }
        public bool GivenByPatient {get; set;}
    }
}
