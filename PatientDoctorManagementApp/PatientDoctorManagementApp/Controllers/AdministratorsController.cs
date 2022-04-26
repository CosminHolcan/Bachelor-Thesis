using BusinessLogicLayer;
using DataAbstractionLayer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdministratorsController : ControllerBase
    {
        private readonly BLLContext _bllContext;

        public AdministratorsController(BLLContext bllContext)
        {
            _bllContext = bllContext;
        }

        [HttpGet("all")]
        public IEnumerable<Administrator> GetAllAdministrators()
        {
            return new List<Administrator>() { new Administrator() { FirstName = "Cosmin" }, new Administrator() { FirstName = "Cezar" } };
        }

        [HttpPost("addAdministrator")]
        public string AddAdministrator(Administrator administrator)
        {
            administrator.Password = EncryptionDecryption.Encrypt(administrator.Password);
            this._bllContext.Administrators.AddAdministrator(administrator);
            return EncryptionDecryption.Decrypt(administrator.Password);
        }
    }
}
