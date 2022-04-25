using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer
{
    public class DoctorsDAL: BaseDAL
    {
        public DoctorsDAL(DALContext dalContext): base(dalContext) { }
    }
}
