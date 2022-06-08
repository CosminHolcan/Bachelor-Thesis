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
