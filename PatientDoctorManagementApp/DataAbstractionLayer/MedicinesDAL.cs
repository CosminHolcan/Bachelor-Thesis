using DataAbstractionLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DataAbstractionLayer
{
    public class MedicinesDAL: BaseDAL
    {
        public MedicinesDAL(DALContext dalContext) : base(dalContext) { }

        public void AddMedicine(string name, string description)
        {
            Medicine medicine = new Medicine()
            {
                Id = new Guid(),
                Name = name,
                Description = description
            };

            this._dalContext.DbContext.Medicines.Add(medicine);
            this._dalContext.DbContext.SaveChanges();
        }

        public void UpdateMedicine(Medicine medicine)
        {
            Medicine existingMedicine = this._dalContext.DbContext.Medicines.FirstOrDefault((Medicine m) => m.Id == medicine.Id);
            if (existingMedicine == null)
                throw new Exception("There is no medicine with this id.");

            existingMedicine.Name = medicine.Name;
            existingMedicine.Description = medicine.Description;
            this._dalContext.DbContext.SaveChanges();
        }

        public List<Medicine> GetAllMedicines()
        {
            return this._dalContext.DbContext.Medicines.ToList();
        }

        public Medicine GetMedicineByName(string name)
        {
            return this._dalContext.DbContext.Medicines.FirstOrDefault((Medicine medicine) => medicine.Name == name);
        }

        public Medicine GetMedicineById(Guid id)
        {
            return this._dalContext.DbContext.Medicines.FirstOrDefault((Medicine medicine) => medicine.Id == id);
        }
    }
}
