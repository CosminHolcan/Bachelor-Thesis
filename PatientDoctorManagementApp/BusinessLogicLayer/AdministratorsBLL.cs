using DataAbstractionLayer.Entities;
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

        public Administrator GetAdministratorByEmail(string email)
        {
            return this._bllContext.DALContext.Administrators.GetAdministratorByEmail(email);
        }

        public Administrator GetAdministratorById(Guid id)
        {
            return this._bllContext.DALContext.Administrators.GetAdministratorById(id);
        }
    }
}
