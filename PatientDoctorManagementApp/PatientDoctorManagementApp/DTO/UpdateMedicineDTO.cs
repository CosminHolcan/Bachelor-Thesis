using DataAbstractionLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp.DTO
{
    public class UpdateMedicineDTO : BaseDTO
    {
        public Medicine Entity { get; set; }
    }
}