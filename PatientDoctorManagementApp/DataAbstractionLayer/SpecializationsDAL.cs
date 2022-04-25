using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer
{
    public class SpecializationsDAL: BaseDAL
    {
        public SpecializationsDAL(DALContext dalContext) : base(dalContext) { }
    }
}
