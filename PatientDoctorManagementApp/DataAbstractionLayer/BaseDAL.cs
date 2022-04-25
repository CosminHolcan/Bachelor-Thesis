using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer
{
    public class BaseDAL
    {
        #region Members
        protected DALContext _dalContext;
        #endregion

        #region Constructors
        public BaseDAL(DALContext dalContext)
        {
            _dalContext = dalContext;
        }
        #endregion
    }
}
