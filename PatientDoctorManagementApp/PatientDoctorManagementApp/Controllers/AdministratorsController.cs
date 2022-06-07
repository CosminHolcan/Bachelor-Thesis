using BusinessLogicLayer;
using DataAbstractionLayer.Entities;
using DataAbstractionLayer.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PatientDoctorManagementApp.DTO;
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

        [HttpPost("addAdministrator")]
        public string AddAdministrator(RegisterDTO registerDTO)
        {
            Administrator administrator = new Administrator()
            {
                FirstName = registerDTO.FirstName,
                LastName = registerDTO.LastName,
                Email = registerDTO.Email,
                Password = EncryptionDecryption.Encrypt(registerDTO.Password),
                UserType = UserType.Administrator
            };
            this._bllContext.Administrators.AddAdministrator(administrator);
            return EncryptionDecryption.Decrypt(administrator.Password);
        }
    }
}
