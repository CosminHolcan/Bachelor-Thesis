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
    public class MedicinesController : ControllerBase
    {
        private readonly BLLContext _bllContext;
        private readonly JWTService _jwtService;

        public MedicinesController(BLLContext bllContext, JWTService jwtService)
        {
            _bllContext = bllContext;
            _jwtService = jwtService;
        }

        [HttpPost("add")]
        public IActionResult AddMedicine(AddBaseDTO dto)
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

                this._bllContext.Medicines.AddMedicine(name: dto.Entity.Name, description: dto.Entity.Description);
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
        public IActionResult GetAllMedicines(BaseDTO dto)
        {
            try
            {
                JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
                Guid userId = new Guid(token.Issuer);

                return Ok(new
                {
                    medicines = this._bllContext.Medicines.GetAllMedicines()
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
        public IActionResult UpdateMedicine(UpdateMedicineDTO dto)
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

                this._bllContext.Medicines.UpdateMedicine(dto.Entity);
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
