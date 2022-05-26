using DataAbstractionLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp.DTO
{
    public class DoctorDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Specialization { get; set; }
    }
}
