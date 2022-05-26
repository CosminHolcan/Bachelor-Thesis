using BusinessLogicLayer;
using DataAbstractionLayer.Entities;
using Microsoft.AspNetCore.Mvc;
using PatientDoctorManagementApp.DTO;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorsController: ControllerBase
    {
        private readonly BLLContext _bllContext;
        private readonly JWTService _jwtService;

        public DoctorsController(BLLContext bllContext, JWTService jwtService)
        {
            _bllContext = bllContext;
            _jwtService = jwtService;
        }

        [HttpPost("all")]
        public IActionResult GetAllDoctors(BaseDTO dto)
        {
            JwtSecurityToken token = _jwtService.Verify(dto.Jwt);

            return Ok(new
            {
                doctors = this._bllContext.Doctors.GetAllDoctors()
            });
        }

        [HttpPost("add")]
        public IActionResult AddDoctor(AddDoctorDTO dto)
        {
            JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
            Guid userId = new Guid(token.Issuer);
            Administrator administrator = this._bllContext.Administrators.GetAdministratorById(userId);

            if (administrator == null)
            {
                return BadRequest(new
                {
                    error = "The authenticated user is not an administrator."
                });
            }

            try
            {
                this._bllContext.Doctors.AddDoctor(firstName: dto.Doctor.FirstName, lastName: dto.Doctor.LastName,
                    email: dto.Doctor.Email, password: EncryptionDecryption.Encrypt(dto.Doctor.Password),
                    specializationId: new Guid(dto.Doctor.SpecializationId));

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
