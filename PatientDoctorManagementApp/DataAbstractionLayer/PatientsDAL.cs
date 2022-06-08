using DataAbstractionLayer.Entities;
using DataAbstractionLayer.Enums;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DataAbstractionLayer
{
    public class PatientsDAL: BaseDAL
    {
        public PatientsDAL(DALContext dalContext) : base(dalContext) { }

        public List<Patient> GetAllPatients()
        {
            return this._dalContext.DbContext.Patients.ToList();
        }

        public Patient GetPatientByEmail(string email)
        {
            return this._dalContext.DbContext.Patients.FirstOrDefault((Patient patient) => patient.Email == email);
        }

        public Patient GetPatientById(Guid id)
        {
            return this._dalContext.DbContext.Patients.FirstOrDefault((Patient patient) => patient.Id == id);
        }

        public Patient AddPatient(string firstName, string lastName, string email, string password)
        {
            Patient patient = new Patient()
            {
                Id = new Guid(),
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Password = password,
                UserType = UserType.Patient
            };

            this._dalContext.DbContext.Patients.Add(patient);
            this._dalContext.DbContext.SaveChanges();

            return patient;
        }

        public void UpdatePatient(Guid userId, string email, string password)
        {
            Patient existingPatient = this.GetPatientById(userId);
            if (existingPatient == null)
                throw new Exception("There is no user with this id.");

            existingPatient.Email = email;
            if (password != "")
                existingPatient.Password = password;

            this._dalContext.DbContext.SaveChanges();
        }
    }
}
