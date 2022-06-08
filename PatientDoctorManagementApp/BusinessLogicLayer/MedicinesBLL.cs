using BusinessLogicLayer.Models;
using DataAbstractionLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BusinessLogicLayer
{
    public class MedicinesBLL: BaseBLL
    {
        public MedicinesBLL(BLLContext bllContext) : base(bllContext) { }

        public void AddMedicine(string name, string description)
        {
            this.CheckUniqueNameAdd(name);
            this._bllContext.DALContext.Medicines.AddMedicine(name, description);
        }

        public void UpdateMedicine(Medicine medicine)
        {
            this.CheckUniqueNameUpdate(medicine);
            this._bllContext.DALContext.Medicines.UpdateMedicine(medicine);
        }

        public List<BaseModel> GetAllMedicines()
        {
            return this._bllContext.DALContext.Medicines.GetAllMedicines().OrderBy(medicine => medicine.Name).Select(medicine => new BaseModel()
            {
                Id = medicine.Id,
                Name = medicine.Name,
                Description = medicine.Description
            }).ToList();
        }

        private void CheckUniqueNameAdd(string name)
        {
            if (this._bllContext.DALContext.Medicines.GetMedicineByName(name) != null)
                throw new Exception("There is already a medicine with this name.");
        }

        private void CheckUniqueNameUpdate(Medicine medicine)
        {
            Medicine existingMedicine = this._bllContext.DALContext.Medicines.GetMedicineById(medicine.Id);
            if (existingMedicine == null)
                throw new Exception("There is no medicine with this id.");

            if (medicine.Name == existingMedicine.Name)
                return;

            this.CheckUniqueNameAdd(medicine.Name);
        }
    }
}
