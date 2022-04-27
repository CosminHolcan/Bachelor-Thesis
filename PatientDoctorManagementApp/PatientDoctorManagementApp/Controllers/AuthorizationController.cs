using BusinessLogicLayer;
using DataAbstractionLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PatientDoctorManagementApp.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorizationController : ControllerBase
    {
        private readonly BLLContext _bllContext;
        private readonly JWTService _jwtService;

        public AuthorizationController(BLLContext bllContext, JWTService jwtService)
        {
            _bllContext = bllContext;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDTO registerDTO)
        {
            Patient patient = new Patient()
            {
                Id = new Guid(),
                FirstName = registerDTO.FirstName,
                LastName = registerDTO.LastName,
                Email = registerDTO.Email,
                Password = EncryptionDecryption.Encrypt(registerDTO.Password)
            };
            this._bllContext.Patients.AddPatient(patient);

            return Ok("success");
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDTO loginDTO)
        {
            Administrator administrator = this._bllContext.Administrators.GetAdministrator(loginDTO.Email, EncryptionDecryption.Encrypt(loginDTO.Password));
            string jwtString = this._jwtService.Generate(administrator.Id);

            Response.Cookies.Append("jwt", jwtString, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new { administrator.UserType });
        }
    }
}
