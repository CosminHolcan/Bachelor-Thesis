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

        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=DESKTOP-M4L4HDE;Database=PatientDoctorManagement;Integrated Security=SSPI");
        }
    }
}
