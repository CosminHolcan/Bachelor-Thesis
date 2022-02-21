using DataAbstractionLayer.Enums;
using System;

namespace DataAbstractionLayer
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public UserType Type { get; set; }
    }
}
