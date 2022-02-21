using DataAbstractionLayer;
using System;
using System.Collections.Generic;

namespace BusinessLogicLayer
{
    public class UsersBLL
    {
        private UsersDAL _DAL;

        public UsersBLL()
        {
            _DAL = new UsersDAL();
        }

        public List<User> GetAllUsers()
        {
            List<User> users = _DAL.GetAllUsers();
            return users;
        }

        public User GetUserById(int id)
        {
            User user = _DAL.GetUserById(id);
            return user;
        }

        public void AddUser(User user)
        {
            _DAL.AddUser(user);
        }
    }
}
