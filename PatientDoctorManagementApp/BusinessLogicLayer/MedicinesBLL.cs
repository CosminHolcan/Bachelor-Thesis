using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class MedicinesBLL: BaseBLL
    {
        public MedicinesBLL(BLLContext bllContext) : base(bllContext) { }

        public void AddMedicine(string name, string description)
        {
            this._bllContext.DALContext.Medicines.AddMedicine(name, description);
        }

        public void UpdateMedicine(Medicine medicine)
        {
            this._bllContext.DALContext.Medicines.UpdateMedicine(medicine);
        }

        public List<Medicine> GetAllMedicines()
        {
            return this._bllContext.DALContext.Medicines.GetAllMedicines();
        }
    }
}
