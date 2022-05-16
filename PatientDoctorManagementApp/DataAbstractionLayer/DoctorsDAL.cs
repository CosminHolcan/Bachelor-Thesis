using DataAbstractionLayer.Enums;
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

        public Doctor GetDoctorByIdWithSpecialization(Guid id)
        {
            Doctor doctor = this._dalContext.DbContext.Doctors.FirstOrDefault((Doctor doctor) => doctor.Id == id);
            if (doctor == null)
                return null;

            this._dalContext.DbContext.Entry(doctor).Reference(doctor => doctor.Specialization).Load();
            return doctor;
        }

        public Doctor GetDoctorByEmail(string email)
        {
            return this._dalContext.DbContext.Doctors.FirstOrDefault((Doctor doctor) => doctor.Email == email);
        }

        public Doctor GetDoctorByEmailWithSpecialization(string email)
        {
            Doctor doctor = this._dalContext.DbContext.Doctors.FirstOrDefault((Doctor doctor) => doctor.Email == email);
            if (doctor == null)
                return null;

            this._dalContext.DbContext.Entry(doctor).Reference(doctor => doctor.Specialization).Load();
            return doctor;
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
                Specialization = specialization,
                UserType = UserType.Doctor
            };

            this._dalContext.DbContext.Doctors.Add(doctor);
            this._dalContext.DbContext.SaveChanges();
        }

        public void UpdateDoctor(Guid userId, string email, string password)
        {
            Doctor existingDoctor = this.GetDoctorById(userId);
            if (existingDoctor == null)
                throw new Exception("There is no user with this id.");

            existingDoctor.Email = email;
            if (password != "")
                existingDoctor.Password = password;

            this._dalContext.DbContext.SaveChanges();
        }
    }
}
