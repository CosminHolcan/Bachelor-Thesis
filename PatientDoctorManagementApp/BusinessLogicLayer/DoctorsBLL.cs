using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class DoctorsBLL: BaseBLL
    {
        public DoctorsBLL(BLLContext bllContext) : base(bllContext) { }

        public List<Doctor> GetAllDoctors()
        {
            return this._bllContext.DALContext.Doctors.GetAllDoctors();
        }

        public Doctor GetDoctorByEmail(string email)
        {
            return this._bllContext.DALContext.Doctors.GetDoctorByEmail(email);
        }

        public void AddDoctor(string firstName, string lastName, string email, string password, Guid specializationId)
        {
            this.CheckUniqueEmail(email);
            this._bllContext.DALContext.Doctors.AddDoctor(firstName, lastName, email, password, specializationId);
        }
    }
}
