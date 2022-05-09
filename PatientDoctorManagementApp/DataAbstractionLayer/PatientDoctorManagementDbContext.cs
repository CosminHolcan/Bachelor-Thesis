using DataAbstractionLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer
{
    public class PatientDoctorManagementDbContext : DbContext
    {
        public PatientDoctorManagementDbContext() { }

        public PatientDoctorManagementDbContext(DbContextOptions<PatientDoctorManagementDbContext> options) : base(options) { }

        public DbSet<Patient> Patients { get; set; }

        public DbSet<Doctor> Doctors { get; set; }

        public DbSet<Administrator> Administrators { get; set; }

        public DbSet<Medicine> Medicines { get; set; }

        public DbSet<Message> Messages { get; set; }

        public DbSet<Specialization> Specializations { get; set; }

        public DbSet<Treatment> Treatments { get; set; }

        public DbSet<Disease> Diseases { get; set; }

        public DbSet<Appointment> Appointments { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=DESKTOP-M4L4HDE;Database=PatientDoctorManagement;Integrated Security=SSPI");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Treatment>().HasKey(treatment => new { treatment.PatientId, treatment.DiseaseId, treatment.DoctorId, treatment.StartingDate });
            modelBuilder.Entity<Appointment>().HasKey(appointment => new { appointment.DoctorId, appointment.PatientId, appointment.StartTime });
            modelBuilder.Entity<Message>().HasKey(message => new { message.SenderId, message.ReceiverId, message.TimeStamp });
        }
    }
}
