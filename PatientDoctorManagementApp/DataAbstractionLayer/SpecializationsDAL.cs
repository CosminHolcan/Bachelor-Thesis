using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer
{
    public class SpecializationsDAL : BaseDAL
    {
        public SpecializationsDAL(DALContext dalContext) : base(dalContext) { }

        public void AddSpecialization(string specializationName)
        {
            Specialization specialization = new Specialization()
            {
                Id = new Guid(),
                Name = specializationName
            };

            this._dalContext.DbContext.Specializations.Add(specialization);
            this._dalContext.DbContext.SaveChanges();
        }

        public void UpdateSpecialization(Specialization specialization)
        {
            Specialization existingSpecialization = this._dalContext.DbContext.Specializations.FirstOrDefault((Specialization s) => s.Id == specialization.Id);
            if (existingSpecialization == null)
                throw new Exception("There is no specialization with this id.");

            existingSpecialization.Name = specialization.Name;
            this._dalContext.DbContext.SaveChanges();
        }

        public List<Specialization> GetAllSpecializations()
        {
            return this._dalContext.DbContext.Specializations.ToList();
        }

        public Specialization GetSpecializationById(Guid id)
        {
            return this._dalContext.DbContext.Specializations.FirstOrDefault((Specialization specialization) => specialization.Id == id);
        }

        public Specialization GetSpecializationByName(string name)
        {
            return this._dalContext.DbContext.Specializations.FirstOrDefault((Specialization specialization) => specialization.Name == name);
        }
    }
}
