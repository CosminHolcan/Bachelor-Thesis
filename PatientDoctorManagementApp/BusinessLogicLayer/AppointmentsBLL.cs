using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class AppointmentsBLL : BaseBLL
    {
        public AppointmentsBLL(BLLContext bllContext) : base(bllContext) { }

        public void AddAppointment(Guid doctorId, Guid patientId, DateTime startTime)
        {
            Doctor existingDoctor = this._bllContext.DALContext.Doctors.GetDoctorById(doctorId);
            if (existingDoctor == null)
                throw new Exception("There is no doctor with this id.");

            Patient existingPatient = this._bllContext.Patients.GetPatientById(patientId);
            if (existingPatient == null)
                throw new Exception("There is no patient with this id.");

            this._bllContext.DALContext.Appointments.AddAppointment(doctorId, patientId, startTime);
        }

        public List<Appointment> GetAppointmentsByDoctor(Guid doctorId)
        {
            Doctor existingDoctor = this._bllContext.DALContext.Doctors.GetDoctorById(doctorId);
            if (existingDoctor == null)
                throw new Exception("There is no doctor with this id.");

            return this._bllContext.DALContext.Appointments.GetAppointmentsByDoctor(doctorId);
        }

        public AppointmentsByDoctorForPatient GetAppointmentsByDoctorForPatient(Guid doctorId, Guid patientId)
        {
            Doctor existingDoctor = this._bllContext.DALContext.Doctors.GetDoctorById(doctorId);
            if (existingDoctor == null)
                throw new Exception("There is no doctor with this id.");

            Patient existingPatient = this._bllContext.Patients.GetPatientById(patientId);
            if (existingPatient == null)
                throw new Exception("There is no patient with this id.");

            List<Appointment> allDoctorAppointments = this._bllContext.DALContext.Appointments.GetAppointmentsByDoctor(doctorId);

            return new AppointmentsByDoctorForPatient()
            {
                PatientAppointments = allDoctorAppointments.Where((Appointment appointment) => appointment.PatientId == patientId)
                    .Select((Appointment appointment) => appointment.StartTime).ToList(),
                OtherAppointments = allDoctorAppointments.Where((Appointment appointment) => appointment.PatientId != patientId)
                    .Select((Appointment appointment) => appointment.StartTime).ToList()
            };
        }
    }
}
