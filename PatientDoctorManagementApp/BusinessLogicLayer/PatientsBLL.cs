using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class PatientsBLL: BaseBLL
    {
        public PatientsBLL(BLLContext bllContext): base(bllContext) { }

        public Patient GetPatientByEmail(string email)
        {
            return this._bllContext.DALContext.Patients.GetPatientByEmail(email);
        }

        public Patient GetPatientById(Guid id)
        {
            return this._bllContext.DALContext.Patients.GetPatientById(id);
        }

        public void AddPatient(Patient patient)
        {
            this._bllContext.DALContext.Patients.AddPatient(patient);
        }
    }
}
