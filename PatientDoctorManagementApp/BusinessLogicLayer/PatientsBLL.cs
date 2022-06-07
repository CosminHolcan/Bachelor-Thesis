using BusinessLogicLayer.Models;
using DataAbstractionLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class PatientsBLL : BaseBLL
    {
        public PatientsBLL(BLLContext bllContext) : base(bllContext) { }

        public List<PersonDescription> GetAllPatients()
        {
            return this._bllContext.DALContext.Patients.GetAllPatients().Select((Patient patient) => new PersonDescription()
            {
                Id = patient.Id,
                Name = patient.FirstName + " " + patient.LastName
            }).OrderBy(patient => patient.Name).ToList();
        }

        public Patient GetPatientByEmail(string email)
        {
            return this._bllContext.DALContext.Patients.GetPatientByEmail(email);
        }

        public Patient GetPatientById(Guid id)
        {
            return this._bllContext.DALContext.Patients.GetPatientById(id);
        }

        public Patient AddPatient(string firstName, string lastName, string email, string password)
        {
            this._bllContext.Users.CheckUniqueEmail(email);
            return this._bllContext.DALContext.Patients.AddPatient(firstName, lastName, email, password);
        }
    }
}
