using BusinessLogicLayer;
using DataAbstractionLayer.Entities;
using Microsoft.AspNetCore.Mvc;
using PatientDoctorManagementApp.DTO;
using System;
using System.IdentityModel.Tokens.Jwt;

namespace PatientDoctorManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DiseasesController : ControllerBase
    {
        private readonly BLLContext _bllContext;
        private readonly JWTService _jwtService;

        public DiseasesController(BLLContext bllContext, JWTService jwtService)
        {
            _bllContext = bllContext;
            _jwtService = jwtService;
        }

        [HttpPost("add")]
        public IActionResult AddDisease(AddBaseDTO dto)
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

                this._bllContext.Diseases.AddDisease(name: dto.Entity.Name, description: dto.Entity.Description);
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

        [HttpPost("all")]
        public IActionResult GetAllDiseases(BaseDTO dto)
        {
            try
            {
                JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
                Guid userId = new Guid(token.Issuer);

                return Ok(new
                {
                    diseases = this._bllContext.Diseases.GetAllDiseases()
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
        public IActionResult UpdateDisease(UpdateDiseaseDTO dto)
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

                this._bllContext.Diseases.UpdateDisease(dto.Entity);
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
