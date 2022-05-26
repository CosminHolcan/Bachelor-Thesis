using DataAbstractionLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer
{
    public class DiseasesDAL : BaseDAL
    {
        public DiseasesDAL(DALContext dalContext) : base(dalContext) { }

        public void AddDisease(string name, string description)
        {
            Disease disease = new Disease()
            {
                Id = new Guid(),
                Name = name,
                Description = description
            };

            this._dalContext.DbContext.Diseases.Add(disease);
            this._dalContext.DbContext.SaveChanges();
        }

        public void UpdateDisease(Disease disease)
        {
            Disease existingDisease = this._dalContext.DbContext.Diseases.FirstOrDefault((Disease d) => d.Id == disease.Id);
            if (existingDisease == null)
                throw new Exception("There is no disease with this id.");

            existingDisease.Name = disease.Name;
            existingDisease.Description = disease.Description;
            this._dalContext.DbContext.SaveChanges();
        }

        public List<Disease> GetAllDiseases()
        {
            return this._dalContext.DbContext.Diseases.ToList();
        }

        public Disease GetDiseaseByName(string name)
        {
            return this._dalContext.DbContext.Diseases.FirstOrDefault((Disease disease) => disease.Name == name);
        }

        public Disease GetDiseaseById(Guid id)
        {
            return this._dalContext.DbContext.Diseases.FirstOrDefault((Disease disease) => disease.Id == id);
        }
    }
}
