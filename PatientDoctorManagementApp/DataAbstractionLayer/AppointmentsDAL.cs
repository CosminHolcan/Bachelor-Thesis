using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer
{
    public class AppointmentsDAL : BaseDAL
    {
        public AppointmentsDAL(DALContext dalContext) : base(dalContext) { }

        public void AddAppointment(Guid doctorId, Guid patientId, DateTime startTime)
        {
            Appointment appointment = new Appointment()
            {
                DoctorId = doctorId,
                PatientId = patientId,
                StartTime = startTime
            };

            this._dalContext.DbContext.Appointments.Add(appointment);
            this._dalContext.DbContext.SaveChanges();
        }

        public List<Appointment> GetAppointmentsByDoctor(Guid doctorId)
        {
            return this._dalContext.DbContext.Appointments.Where((Appointment appointment) => appointment.DoctorId == doctorId).ToList();
        }
    }
}
