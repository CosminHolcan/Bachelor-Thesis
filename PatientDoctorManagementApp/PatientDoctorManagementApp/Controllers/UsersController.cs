using BusinessLogicLayer;
using DataAbstractionLayer;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        private UsersBLL _BLL;

        public UserController()
        {
            _BLL = new UsersBLL();
        }

        [HttpGet]
        [Route("getUsers")]
        public List<User> GetAllUsers()
        {
            return _BLL.GetAllUsers();
        }

        [HttpGet]
        [Route("getUser")]
        public ActionResult<User> GetUserById(int id)
        {
            User user = _BLL.GetUserById(id);

            if (user == null)
            {
                return NotFound("Invalid ID");
            }

            return Ok(user);
        }


        [Route("addUser")]
        [HttpPost]
        public void AddUser([FromBody] User user)
        {
            _BLL.AddUser(user);
        }
    };
}
