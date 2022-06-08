using DataAbstractionLayer.Entities;
using System;

namespace BusinessLogicLayer
{
    public class AdministratorsBLL: BaseBLL
    {
        public AdministratorsBLL(BLLContext bllContext) : base(bllContext) { }

        public void AddAdministrator(string firstName, string lastName, string email, string password)
        {
            this._bllContext.Users.CheckUniqueEmail(email);
            this._bllContext.DALContext.Administrators.AddAdministrator(firstName: firstName, lastName: lastName, email: email, password: password);
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
