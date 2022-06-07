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
    public class SpecializationsController : ControllerBase
    {
        private readonly BLLContext _bllContext;
        private readonly JWTService _jwtService;

        public SpecializationsController(BLLContext bllContext, JWTService jwtService)
        {
            _bllContext = bllContext;
            _jwtService = jwtService;
        }

        [HttpPost("add")]
        public IActionResult AddSpecialization(AddSpecializationDTO dto)
        {
            try
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

                this._bllContext.Specializations.AddSpecialization(dto.SpecializationName);
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

        [HttpGet("all")]
        public IActionResult GetAllSpecializations(BaseDTO dto)
        {
            try
            {
                JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
                Guid userId = new Guid(token.Issuer);

                return Ok(new
                {
                    specializations = this._bllContext.Specializations.GetAllSpecializations()
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

        [HttpPost("update")]
        public IActionResult UpdateSpecialization(UpdateSpecializationDTO dto)
        {
            try
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

                this._bllContext.Specializations.UpdateSpecialization(dto.Specialization);
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
