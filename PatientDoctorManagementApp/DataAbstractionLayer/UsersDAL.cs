using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer
{
    public class UsersDAL
    {
        public List<User> GetAllUsers()
        {
            var db = new PatientDoctorManagementDbContext();
            return db.Users.ToList();
        }

        public User GetUserById(int id)
        {
            var db = new PatientDoctorManagementDbContext();
            User u = new User();

            u = db.Users.FirstOrDefault(x => x.Id == id);

            return u;
        }

        public void AddUser(User user)
        {
            var db = new PatientDoctorManagementDbContext();
            db.Add(user);
            db.SaveChanges();
        }
    }
}
