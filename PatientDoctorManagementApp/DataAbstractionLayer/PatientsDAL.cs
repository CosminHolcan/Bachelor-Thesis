using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer
{
    public class PatientsDAL: BaseDAL
    {
        public PatientsDAL(DALContext dalContext) : base(dalContext) { }
    }
}
