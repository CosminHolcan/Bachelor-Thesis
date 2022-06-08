using DataAbstractionLayer.Entities;

namespace PatientDoctorManagementApp.DTO
{
    public class UpdateSpecializationDTO : BaseDTO
    {
        public Specialization Specialization { get; set; }
    }
}
