using BusinessLogicLayer;
using DataAbstractionLayer.Models;
using DataAbstractionLayer.Enums;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PatientDoctorManagementApp.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;

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
            try
            {
                Patient patient = this._bllContext.Patients.AddPatient(registerDTO.FirstName, registerDTO.LastName, registerDTO.Email, EncryptionDecryption.Encrypt(registerDTO.Password));
                string jwtString = this._jwtService.Generate(patient.Id);
                return Ok(new
                {
                    userType = UserType.Patient,
                    jwt = jwtString
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

        [HttpPost("login")]
        public IActionResult Login(LoginDTO loginDTO)
        {
            Administrator existingAdministrator = this._bllContext.Administrators.GetAdministratorByEmail(loginDTO.Email);
            Doctor existingDoctor = this._bllContext.Doctors.GetDoctorByEmail(loginDTO.Email);
            Patient existingPatient = this._bllContext.Patients.GetPatientByEmail(loginDTO.Email);

            if (existingAdministrator == null && existingDoctor == null && existingPatient == null)
                return BadRequest(new
                {
                    message = "There is no account with this email."
                });

            if (existingAdministrator != null)
                return HandleFoundAccountByEmail(existingAdministrator, loginDTO);

            if (existingDoctor != null)
                return HandleFoundAccountByEmail(existingDoctor, loginDTO);

            return HandleFoundAccountByEmail(existingPatient, loginDTO);
        }

        [HttpPost("refreshToken")]
        public IActionResult RefreshToken(BaseDTO dto)
        {
            try
            {
                JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
                Guid userId = new Guid(token.Issuer);
                string newToken = _jwtService.Generate(userId);

                return Ok(new
                {
                    jwt = newToken
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

        [HttpGet("user")]
        public IActionResult GetUser()
        {
            string jwtString = Request.Cookies["jwt"];
            JwtSecurityToken token = _jwtService.Verify(jwtString);
            Guid userId = new Guid(token.Issuer);
            Patient patient = this._bllContext.Patients.GetPatientById(userId);

            return Ok(patient);
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "success"
            });
        }

        private IActionResult HandleFoundAccountByEmail(User user, LoginDTO loginDTO)
        {
            if (user.Password != EncryptionDecryption.Encrypt(loginDTO.Password))
                return BadRequest(new
                {
                    message = "Your email or password is incorrect."
                });

            string jwtString = this._jwtService.Generate(user.Id);
            return Ok(new
            {
                userType = user.UserType,
                jwt = jwtString
            });
        }

    }
}
