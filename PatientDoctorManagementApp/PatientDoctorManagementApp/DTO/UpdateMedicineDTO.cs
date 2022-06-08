using DataAbstractionLayer.Entities;

namespace PatientDoctorManagementApp.DTO
{
    public class UpdateMedicineDTO : BaseDTO
    {
        public Medicine Entity { get; set; }
    }
}