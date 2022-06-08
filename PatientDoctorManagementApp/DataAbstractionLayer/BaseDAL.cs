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
