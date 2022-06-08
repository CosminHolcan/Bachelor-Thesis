namespace PatientDoctorManagementApp.DTO
{
    public class GetFeedbacksByPatientDTO : BaseDTO
    {
        public string PatientId { get; set; }
        public string DoctorId { get; set; }
        public string DiseaseId { get; set; }
    }
}
