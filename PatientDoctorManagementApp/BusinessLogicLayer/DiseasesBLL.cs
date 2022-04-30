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
            this.CheckName(name);
            this._bllContext.DALContext.Diseases.AddDisease(name, description);
        }

        public void UpdateDisease(Disease disease)
        {
            this.CheckName(disease.Name);
            this._bllContext.DALContext.Diseases.UpdateDisease(disease);
        }

        public List<Disease> GetAllDiseases()
        {
            return this._bllContext.DALContext.Diseases.GetAllDiseases();
        }

        private void CheckName(string name)
        {
            if (this._bllContext.DALContext.Diseases.GetDiseaseByName(name) != null)
                throw new Exception("There is already a disease with this name.");
        }

    }
}
