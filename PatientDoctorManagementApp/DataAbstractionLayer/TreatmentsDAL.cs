using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer
{
    public class TreatmentsDAL : BaseDAL
    {
        public TreatmentsDAL(DALContext dalContext) : base(dalContext) { }

        public List<Treatment> GetTreatmentsByPatient(Guid patientId)
        {
            List<Treatment> treatments = this._dalContext.DbContext.Treatments.Where(treatment => treatment.PatientId == patientId).ToList();
            treatments.ForEach((Treatment t) =>
            {
                this._dalContext.DbContext.Entry(t).Reference(t => t.Patient).Load();
                this._dalContext.DbContext.Entry(t).Reference(t => t.Doctor).Load();
                this._dalContext.DbContext.Entry(t).Reference(t => t.Disease).Load();
                this._dalContext.DbContext.Entry(t).Collection(t => t.Medicines).Load();
            });

            return treatments;
        }

        public List<Treatment> GetTreatmentsByDoctor(Guid doctorId)
        {
            List<Treatment> treatments = this._dalContext.DbContext.Treatments.Where(treatment => treatment.DoctorId == doctorId).ToList();
            treatments.ForEach((Treatment t) =>
            {
                this._dalContext.DbContext.Entry(t).Reference(t => t.Patient).Load();
                this._dalContext.DbContext.Entry(t).Reference(t => t.Doctor).Load();
                this._dalContext.DbContext.Entry(t).Reference(t => t.Disease).Load();
                this._dalContext.DbContext.Entry(t).Collection(t => t.Medicines).Load();
            });

            return treatments;
        }

        public Treatment GetTreatment(Guid patientId, Guid doctorId, Guid diseaseId, DateTime startingDate)
        {
            return this._dalContext.DbContext.Treatments.FirstOrDefault(treatment => treatment.PatientId == patientId && treatment.DoctorId == doctorId
            && treatment.DiseaseId == diseaseId && treatment.StartingDate == startingDate);
        }

        public Treatment AddTreatment(Guid patientId, Guid doctorId, Guid diseaseId, List<Guid> medicinesId, DateTime startingDate, string observations)
        {
            Treatment treatment = new Treatment()
            {
                PatientId = patientId,
                DoctorId = doctorId,
                DiseaseId = diseaseId,
                Medicines = new List<Medicine>(medicinesId.Select(medicineId => this._dalContext.Medicines.GetMedicineById(medicineId))),
                StartingDate = startingDate,
                Observations = observations
            };

            this._dalContext.DbContext.Treatments.Add(treatment);
            this._dalContext.DbContext.SaveChanges();

            Treatment addedTreatment = GetTreatment(patientId, doctorId, diseaseId, startingDate);
            this._dalContext.DbContext.Entry(addedTreatment).Reference(t => t.Patient).Load();
            this._dalContext.DbContext.Entry(addedTreatment).Reference(t => t.Doctor).Load();
            this._dalContext.DbContext.Entry(addedTreatment).Reference(t => t.Disease).Load();
            this._dalContext.DbContext.Entry(addedTreatment).Collection(t => t.Medicines).Load();

            return addedTreatment;
        }
    }
}
