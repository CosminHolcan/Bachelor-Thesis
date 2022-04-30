using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class SpecializationsBLL: BaseBLL
    {
        public SpecializationsBLL (BLLContext bllContext): base(bllContext) { }

        public void AddSpecialization(string specializationName)
        {
            this._bllContext.DALContext.Specializations.AddSpecialization(specializationName);
        }

        public void UpdateSpecialization(Specialization specialization)
        {
            this._bllContext.DALContext.Specializations.UpdateSpecialization(specialization);
        }

        public List<Specialization> GetAllSpecializations()
        {
            return this._bllContext.DALContext.Specializations.GetAllSpecializations();
        }

        public Specialization GetSpecializationById(Guid id)
        {
            return this._bllContext.DALContext.Specializations.GetSpecializationById(id);
        }
    }
}
