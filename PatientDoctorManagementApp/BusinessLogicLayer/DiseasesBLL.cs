using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class DiseasesBLL : BaseBLL
    {
        public DiseasesBLL(BLLContext bllContext) : base(bllContext) { }

        public void AddDisease(string name, string description)
        {
            this.CheckUniqueNameAdd(name);
            this._bllContext.DALContext.Diseases.AddDisease(name, description);
        }

        public void UpdateDisease(Disease disease)
        {
            this.CheckUniqueNameUpdate(disease);
            this._bllContext.DALContext.Diseases.UpdateDisease(disease);
        }

        public List<Disease> GetAllDiseases()
        {
            return this._bllContext.DALContext.Diseases.GetAllDiseases();
        }

        private void CheckUniqueNameAdd(string name)
        {
            if (this._bllContext.DALContext.Diseases.GetDiseaseByName(name) != null)
                throw new Exception("There is already a disease with this name.");
        }

        private void CheckUniqueNameUpdate(Disease disease)
        {
            Disease existingDisease = this._bllContext.DALContext.Diseases.GetDiseaseById(disease.Id);
            if (existingDisease == null)
                throw new Exception("There is no disease with this id.");

            if (disease.Name == existingDisease.Name)
                return;

            this.CheckUniqueNameAdd(disease.Name);
        }

    }
}
