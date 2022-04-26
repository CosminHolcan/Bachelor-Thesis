using DataAbstractionLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class BLLContext : IDisposable
    {
        #region Members
        private Lazy<DALContext> _dalContext;
        private Lazy<AdministratorsBLL> _administratorsBLL;
        #endregion

        #region Properties
        public DALContext DALContext => _dalContext.Value;
        public AdministratorsBLL Administrators => _administratorsBLL.Value;
        #endregion

        #region Constructors
        public BLLContext()
        {
            _dalContext = new Lazy<DALContext>(() => new DALContext());
            _administratorsBLL = new Lazy<AdministratorsBLL>(() => new AdministratorsBLL(this));
        }
        #endregion

        #region IDisposable
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_dalContext.IsValueCreated)
                    _dalContext = null;

                if (_administratorsBLL.IsValueCreated)
                    _administratorsBLL = null;
            }
        }

        ~BLLContext()
        {
            Dispose(false);
        }
        #endregion
    }
}
