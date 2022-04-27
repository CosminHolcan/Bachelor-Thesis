using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer
{
    public class PatientsDAL: BaseDAL
    {
        public PatientsDAL(DALContext dalContext) : base(dalContext) { }

        public Patient GetPatientByEmail(string email)
        {
            return this._dalContext.DbContext.Patients.FirstOrDefault((Patient patient) => patient.Email == email);
        }

        public Patient GetPatientById(Guid id)
        {
            return this._dalContext.DbContext.Patients.FirstOrDefault((Patient patient) => patient.Id == id);
        }

        public void AddPatient(Patient patient)
        {
            this._dalContext.DbContext.Patients.Add(patient);
            this._dalContext.DbContext.SaveChanges();
        }
    }
}
