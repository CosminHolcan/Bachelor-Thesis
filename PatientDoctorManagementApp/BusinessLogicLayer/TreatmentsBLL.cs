using BusinessLogicLayer.Models;
using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class TreatmentsBLL : BaseBLL
    {
        public TreatmentsBLL(BLLContext bllContext) : base(bllContext) { }

        public List<TreatmentInfo> GetTreatmentsByPatient(Guid patientId)
        {
            return this._bllContext.DALContext.Treatments.GetTreatmentsByPatient(patientId).Select(treatment => new TreatmentInfo()
            {
                Patient = treatment.Patient.FirstName + " " + treatment.Patient.LastName,
                Doctor = treatment.Doctor.FirstName + " " + treatment.Doctor.LastName,
                Disease = treatment.Disease.Name,
                Medicines = treatment.Medicines.Select(medicine => medicine.Name).ToList(),
                StartingDate = treatment.StartingDate,
                Observations = treatment.Observations
            }).ToList();
        }

        public List<TreatmentInfo> GetTreatmentsByDoctor(Guid doctorId)
        {
            return this._bllContext.DALContext.Treatments.GetTreatmentsByDoctor(doctorId).Select(treatment => new TreatmentInfo()
            {
                Patient = treatment.Patient.FirstName + " " + treatment.Patient.LastName,
                Doctor = treatment.Doctor.FirstName + " " + treatment.Doctor.LastName,
                Disease = treatment.Disease.Name,
                Medicines = treatment.Medicines.Select(medicine => medicine.Name).ToList(),
                StartingDate = treatment.StartingDate,
                Observations = treatment.Observations
            }).ToList();
        }

        public TreatmentInfo AddTreatment(Guid patientId, Guid doctorId, Guid diseaseId, List<Guid> medicinesId, DateTime startingDate, string observations)
        {
            CheckUniqueTreatment(patientId, doctorId, diseaseId, startingDate);
            Treatment addedTreatment = this._bllContext.DALContext.Treatments.AddTreatment(patientId: patientId, doctorId: doctorId, diseaseId: diseaseId,
                medicinesId: medicinesId, startingDate: startingDate, observations: observations);

            return new TreatmentInfo()
            {
                Patient = addedTreatment.Patient.FirstName + " "+addedTreatment.Patient.LastName,
                Doctor = addedTreatment.Doctor.FirstName + " "+ addedTreatment.Doctor.LastName,
                Disease = addedTreatment.Disease.Name,
                Medicines = addedTreatment.Medicines.Select(medicine => medicine.Name).ToList(),
                StartingDate = addedTreatment.StartingDate,
                Observations = addedTreatment.Observations
            };
        }

        private void CheckUniqueTreatment(Guid patientId, Guid doctorId, Guid diseaseId, DateTime startingDate)
        {
            Treatment treatment = this._bllContext.DALContext.Treatments.GetTreatment(patientId, doctorId, diseaseId, startingDate);
            if (treatment != null)
                throw new Exception("You already prescribed a recipe today for this patient and disease.");
        }
    }
}
