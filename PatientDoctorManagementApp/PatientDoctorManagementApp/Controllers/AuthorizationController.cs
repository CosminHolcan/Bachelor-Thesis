using BusinessLogicLayer;
using DataAbstractionLayer.Entities;
using DataAbstractionLayer.Enums;
using Microsoft.AspNetCore.Mvc;
using PatientDoctorManagementApp.DTO;
using System;
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
        public IActionResult Register(RegisterDTO dto)
        {
            try
            {
                Patient patient = this._bllContext.Patients.AddPatient(dto.FirstName, dto.LastName, dto.Email, EncryptionDecryption.Encrypt(dto.Password));
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
        public IActionResult Login(LoginDTO dto)
        {
            Administrator existingAdministrator = this._bllContext.Administrators.GetAdministratorByEmail(dto.Email);
            Doctor existingDoctor = this._bllContext.Doctors.GetDoctorByEmail(dto.Email);
            Patient existingPatient = this._bllContext.Patients.GetPatientByEmail(dto.Email);

            if (existingAdministrator == null && existingDoctor == null && existingPatient == null)
                return BadRequest(new
                {
                    message = "There is no account with this email."
                });

            if (existingAdministrator != null)
                return HandleFoundAccountByEmail(existingAdministrator, dto);

            if (existingDoctor != null)
                return HandleFoundAccountByEmail(existingDoctor, dto);

            return HandleFoundAccountByEmail(existingPatient, dto);
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
                    userId = userId,
                    jwt = newToken,
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
                jwt = jwtString,
                userId = user.Id
            });
        }

    }
}
