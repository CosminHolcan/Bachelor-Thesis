using DataAbstractionLayer.Entities;
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
            this.CheckUniqueNameAdd(specializationName);
            this._bllContext.DALContext.Specializations.AddSpecialization(specializationName);
        }

        public void UpdateSpecialization(Specialization specialization)
        {
            this.CheckUniqueNameUpdate(specialization);
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

        private void CheckUniqueNameAdd(string name)
        {
            if (this._bllContext.DALContext.Specializations.GetSpecializationByName(name) != null)
                throw new Exception("There is already a specialization with this name.");
        }

        private void CheckUniqueNameUpdate(Specialization specialization)
        {
            Specialization existingSpecialization = this._bllContext.DALContext.Specializations.GetSpecializationById(specialization.Id);
            if (existingSpecialization == null)
                throw new Exception("There is no specialization with this id.");

            if (specialization.Name == existingSpecialization.Name)
                return;

            this.CheckUniqueNameAdd(specialization.Name);
        }
    }
}
