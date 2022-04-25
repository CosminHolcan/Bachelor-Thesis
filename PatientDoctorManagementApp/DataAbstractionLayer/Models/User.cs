using DataAbstractionLayer.Enums;
using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;

namespace DataAbstractionLayer
{
    public class User
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public UserType UserType { get; set; }
    }
}
