using DataAbstractionLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer
{
    public class AdministratorsDAL: BaseDAL
    {
        public AdministratorsDAL(DALContext dalContext) : base(dalContext) { }

        public void AddAdministrator(Administrator administrator)
        {
            administrator.Id = new Guid();
            this._dalContext.DbContext.Administrators.Add(administrator);
            this._dalContext.DbContext.SaveChanges();
        }

        public Administrator GetAdministratorByEmail(string email)
        {
            return this._dalContext.DbContext.Administrators.FirstOrDefault((Administrator administrator) => administrator.Email == email);
        }

        public Administrator GetAdministratorById(Guid id)
        {
            return this._dalContext.DbContext.Administrators.FirstOrDefault((Administrator administrator) => administrator.Id == id);
        }

        public void UpdateAdministrator(Guid userId, string email, string password)
        {
            Administrator existingAdministrator = this.GetAdministratorById(userId);
            if (existingAdministrator == null)
                throw new Exception("There is no user with this id.");

            existingAdministrator.Email = email;
            if (password != "")
                existingAdministrator.Password = password;

            this._dalContext.DbContext.SaveChanges();
        }
    }
}
