using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class BaseBLL
    {
        #region Members
        protected BLLContext _bllContext;
        #endregion

        #region Constructors
        public BaseBLL(BLLContext bllContext)
        {
            _bllContext = bllContext;
        }

        protected void CheckUniqueEmail(string email)
        {
            Administrator existingAdministrator = this._bllContext.Administrators.GetAdministratorByEmail(email);
            if (existingAdministrator != null)
                throw new Exception("There is already an account with this email.");

            Doctor existingDoctor = this._bllContext.Doctors.GetDoctorByEmail(email);
            if (existingDoctor != null)
                throw new Exception("There is already an account with this email.");


            Patient existingPatient = this._bllContext.Patients.GetPatientByEmail(email);
            if (existingPatient != null)
                throw new Exception("There is already an account with this email.");
        }
        #endregion
    }
}
