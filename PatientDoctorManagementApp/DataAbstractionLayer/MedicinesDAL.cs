using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer
{
    public class MedicinesDAL: BaseDAL
    {
        public MedicinesDAL(DALContext dalContext) : base(dalContext) { }
    }
}
