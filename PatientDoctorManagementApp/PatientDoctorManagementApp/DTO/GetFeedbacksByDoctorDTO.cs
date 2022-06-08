namespace PatientDoctorManagementApp.DTO
{
    public class GetFeedbacksByDoctorDTO: BaseDTO
    {
        public string PatientId { get; set; }
        public string DiseaseId { get; set; }
    }
}
