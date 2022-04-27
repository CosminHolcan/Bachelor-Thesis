using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer
{
    public class DoctorsDAL: BaseDAL
    {
        public DoctorsDAL(DALContext dalContext): base(dalContext) { }

        public Doctor GetDoctorByEmail(string email)
        {
            return this._dalContext.DbContext.Doctors.FirstOrDefault((Doctor doctor) => doctor.Email == email);
        }
    }
}
