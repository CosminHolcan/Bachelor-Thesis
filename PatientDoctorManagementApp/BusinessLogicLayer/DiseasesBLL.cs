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
            this._bllContext.DALContext.Diseases.AddDisease(name, description);
        }

        public void UpdateDisease(Disease disease)
        {
            this._bllContext.DALContext.Diseases.UpdateDisease(disease);
        }

        public List<Disease> GetAllDiseases()
        {
            return this._bllContext.DALContext.Diseases.GetAllDiseases();
        }

    }
}
