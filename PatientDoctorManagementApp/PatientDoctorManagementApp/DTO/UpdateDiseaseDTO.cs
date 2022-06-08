using DataAbstractionLayer.Entities;

namespace PatientDoctorManagementApp.DTO
{
    public class UpdateDiseaseDTO : BaseDTO
    {
        public Disease Entity { get; set; }
    }
}

