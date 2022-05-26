using DataAbstractionLayer.Entities;
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
        #endregion
    }
}
