using BusinessLogicLayer.Models;
using DataAbstractionLayer.Enums;
using DataAbstractionLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class UsersBLL : BaseBLL
    {
        public UsersBLL(BLLContext bllContext) : base(bllContext) { }

        public UserInformation GetUserInformationById(Guid userId)
        {
            Patient existingPatient = this._bllContext.DALContext.Patients.GetPatientById(userId);
            if (existingPatient != null)
            {
                return new UserInformation()
                {
                    Id = existingPatient.Id,
                    FirstName = existingPatient.FirstName,
                    LastName = existingPatient.LastName,
                    Email = existingPatient.Email
                };
            }

            Doctor existingDoctor = this._bllContext.DALContext.Doctors.GetDoctorByIdWithSpecialization(userId);
            if (existingDoctor != null)
            {
                return new UserInformation()
                {
                    Id = existingDoctor.Id,
                    FirstName = existingDoctor.FirstName,
                    LastName = existingDoctor.LastName,
                    Email = existingDoctor.Email,
                    Specialization = existingDoctor.Specialization.Name
                };
            }

            Administrator existingAdministrator = this._bllContext.DALContext.Administrators.GetAdministratorById(userId);
            if (existingAdministrator != null)
            {
                return new UserInformation()
                {
                    Id = existingAdministrator.Id,
                    FirstName = existingAdministrator.FirstName,
                    LastName = existingAdministrator.LastName,
                    Email = existingAdministrator.Email
                };
            }

            throw new Exception("There is no account with this id.");
        }

        public UserInformation GetUserInformationByEmail(string email, out string password, out UserType userType)
        {
            Patient existingPatient = this._bllContext.DALContext.Patients.GetPatientByEmail(email);
            if (existingPatient != null)
            {
                userType = UserType.Patient;
                password = existingPatient.Password;
                return new UserInformation()
                {
                    Id = existingPatient.Id,
                    FirstName = existingPatient.FirstName,
                    LastName = existingPatient.LastName,
                    Email = existingPatient.Email
                };
            }

            Doctor existingDoctor = this._bllContext.DALContext.Doctors.GetDoctorByEmailWithSpecialization(email);
            if (existingDoctor != null)
            {
                userType = UserType.Doctor;
                password = existingDoctor.Password;
                return new UserInformation()
                {
                    Id = existingDoctor.Id,
                    FirstName = existingDoctor.FirstName,
                    LastName = existingDoctor.LastName,
                    Email = existingDoctor.Email,
                    Specialization = existingDoctor.Specialization.Name
                };
            }

            Administrator existingAdministrator = this._bllContext.DALContext.Administrators.GetAdministratorByEmail(email);
            if (existingAdministrator != null)
            {
                userType = UserType.Administrator;
                password = existingAdministrator.Password;
                return new UserInformation()
                {
                    Id = existingAdministrator.Id,
                    FirstName = existingAdministrator.FirstName,
                    LastName = existingAdministrator.LastName,
                    Email = existingAdministrator.Email
                };
            }

            throw new Exception("There is no account with this email.");
        }

        public void UpdateUser(Guid userId, string email, string password)
        {
            Patient existingPatient = this._bllContext.DALContext.Patients.GetPatientById(userId);
            if (existingPatient != null)
            {
                if (existingPatient.Email != email)
                    this.CheckUniqueEmail(email);
                this._bllContext.DALContext.Patients.UpdatePatient(userId, email, password);
                return;
            }

            Doctor existingDoctor = this._bllContext.DALContext.Doctors.GetDoctorById(userId);
            if (existingDoctor != null)
            {
                if (existingDoctor.Email != email)
                    this.CheckUniqueEmail(email);
                this._bllContext.DALContext.Doctors.UpdateDoctor(userId, email, password);
                return;
            }

            Administrator existingAdministrator = this._bllContext.DALContext.Administrators.GetAdministratorById(userId);
            if (existingPatient != null)
            {
                if (existingAdministrator.Email != email)
                    this.CheckUniqueEmail(email);
                this._bllContext.DALContext.Administrators.UpdateAdministrator(userId, email, password);
                return;
            }

            throw new Exception("There is no user with this id.");
        }

        public void CheckUniqueEmail(string email)
        {
            Administrator existingAdministrator = this._bllContext.Administrators.GetAdministratorByEmail(email);
            if (existingAdministrator != null)
                throw new Exception("There is already an account with this email.");

            Doctor existingDoctor = this._bllContext.Doctors.GetDoctorByEmail(email);
            if (existingDoctor != null)
                throw new Exception("There is already an account with this email.");


            Patient existingPatient = this._bllContext.Patients.GetPatientByEmail(email);
            if (existingPatient != null)
                throw new Exception("There is already an account with this email.");
        }
    }
}
