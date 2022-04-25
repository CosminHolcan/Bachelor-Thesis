using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer
{
    public class DiseasesDAL: BaseDAL
    {
        public DiseasesDAL(DALContext dalContext): base(dalContext)
        {

        }
    }
}
