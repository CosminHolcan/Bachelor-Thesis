using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class AdministratorsBLL: BaseBLL
    {
        public AdministratorsBLL(BLLContext bllContext) : base(bllContext) { }

        public void AddAdministrator(Administrator administrator)
        {
            this._bllContext.DALContext.Administrators.AddAdministrator(administrator);
        }

        public Administrator GetAdministrator(string email, string password)
        {
            return this._bllContext.DALContext.Administrators.GetAdministrator(email, password);
        }
    }
}
