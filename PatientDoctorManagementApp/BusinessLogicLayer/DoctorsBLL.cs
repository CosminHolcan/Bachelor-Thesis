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

        public Doctor GetDoctorByEmail(string email)
        {
            return this._bllContext.DALContext.Doctors.GetDoctorByEmail(email);
        }
    }
}
