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
    public class MedicinesController: ControllerBase
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
            JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
            Guid userId = new Guid(token.Issuer);

            return Ok(new
            {
                medicines = this._bllContext.Medicines.GetAllMedicines()
            });
        }

        [HttpPost("update")]
        public IActionResult UpdateMedicine(UpdateMedicineDTO dto)
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
