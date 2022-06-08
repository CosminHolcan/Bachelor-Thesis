using BusinessLogicLayer;
using Microsoft.AspNetCore.Mvc;
using PatientDoctorManagementApp.DTO;
using System;

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
        public IActionResult AddAdministrator(RegisterDTO registerDTO)
        {
            try
            {
                this._bllContext.Administrators.AddAdministrator(firstName: registerDTO.FirstName, lastName: registerDTO.LastName,
                    email: registerDTO.Email, password: EncryptionDecryption.Encrypt(registerDTO.Password));
                return Ok(new
                {
                    message = "success"
                });
            }
            catch (Exception exception)
            {
                return BadRequest(new
                {
                    message = exception.Message
                });
            }
        }
    }
}
