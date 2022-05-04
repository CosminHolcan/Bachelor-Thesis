using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer
{
    public class DoctorsDAL: BaseDAL
    {
        public DoctorsDAL(DALContext dalContext): base(dalContext) { }

        public List<Doctor> GetAllDoctors()
        {
            List<Doctor> doctors = this._dalContext.DbContext.Doctors.ToList();
            doctors.ForEach((Doctor d) =>
            {
                this._dalContext.DbContext.Entry(d).Reference(d => d.Specialization).Load();
            });
            return doctors;
        }

        public Doctor GetDoctorById(Guid id)
        {
            return this._dalContext.DbContext.Doctors.FirstOrDefault((Doctor doctor) => doctor.Id == id);
        }

        public Doctor GetDoctorByEmail(string email)
        {
            return this._dalContext.DbContext.Doctors.FirstOrDefault((Doctor doctor) => doctor.Email == email);
        }

        public void AddDoctor(string firstName, string lastName, string email, string password, Guid specializationId)
        {
            Specialization specialization = this._dalContext.Specializations.GetSpecializationById(specializationId);
            if (specialization == null)
                throw new Exception("There is no such a specialization");

            Doctor doctor = new Doctor()
            {
                Id = new Guid(),
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Password = password,
                Specialization = specialization
            };

            this._dalContext.DbContext.Doctors.Add(doctor);
            this._dalContext.DbContext.SaveChanges();
        }
    }
}
