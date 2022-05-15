using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp.DTO
{
    public class AddTreatmentEntityDTO
    {
        public string PatientId { get; set; }
        public string DiseaseId { get; set; }
        public List<string> MedicinesId { get; set; }
        public DateTime StartingDate { get; set; }
        public string Observations { get; set; }
    }
}
