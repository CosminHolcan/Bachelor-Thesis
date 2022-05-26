using DataAbstractionLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp.DTO
{
    public class UpdateDiseaseDTO : BaseDTO
    {
        public Disease Entity { get; set; }
    }
}

