using DataAbstractionLayer.Models;
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
    }
}
