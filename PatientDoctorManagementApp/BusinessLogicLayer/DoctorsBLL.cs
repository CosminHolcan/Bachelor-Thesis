using BusinessLogicLayer.Models;
using DataAbstractionLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BusinessLogicLayer
{
    public class DoctorsBLL : BaseBLL
    {
        public DoctorsBLL(BLLContext bllContext) : base(bllContext) { }

        public List<PersonDescription> GetAllDoctors()
        {
            return this._bllContext.DALContext.Doctors.GetAllDoctors().Select((Doctor doctor) => new PersonDescription()
            {
                Id = doctor.Id,
                Specialization = doctor.Specialization.Name,
                Name = doctor.FirstName + " " + doctor.LastName
            }).OrderBy(doctor => doctor.Name).ToList();
        }

        public Doctor GetDoctorByEmail(string email)
        {
            return this._bllContext.DALContext.Doctors.GetDoctorByEmail(email);
        }

        public void AddDoctor(string firstName, string lastName, string email, string password, Guid specializationId)
        {
            this._bllContext.Users.CheckUniqueEmail(email);
            this._bllContext.DALContext.Doctors.AddDoctor(firstName, lastName, email, password, specializationId);
        }
    }
}
