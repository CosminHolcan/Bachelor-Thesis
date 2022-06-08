using BusinessLogicLayer;
using BusinessLogicLayer.Models;
using Microsoft.AspNetCore.Mvc;
using PatientDoctorManagementApp.DTO;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;

namespace PatientDoctorManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TreatmentsController : ControllerBase
    {
        private readonly BLLContext _bllContext;
        private readonly JWTService _jwtService;

        public TreatmentsController(BLLContext bllContext, JWTService jwtService)
        {
            _bllContext = bllContext;
            _jwtService = jwtService;
        }

        [HttpPost("getByPatient")]
        public IActionResult GetTreatmentsByPatient(BaseDTO dto)
        {
            try
            {
                JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
                Guid userId = new Guid(token.Issuer);

                return Ok(new
                {
                    treatments = this._bllContext.Treatments.GetTreatmentsByPatient(userId)
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

        [HttpPost("getByDoctor")]
        public IActionResult GetTreatmentsByDoctor(BaseDTO dto)
        {
            try
            {
                JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
                Guid userId = new Guid(token.Issuer);

                return Ok(new
                {
                    treatments = this._bllContext.Treatments.GetTreatmentsByDoctor(userId)
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

        [HttpPost("add")]
        public IActionResult AddTreatment(AddTreatmentDTO dto)
        {
            try
            {
                JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
                Guid doctorId = new Guid(token.Issuer);

                TreatmentInfo treatment = this._bllContext.Treatments.AddTreatment(patientId: new Guid(dto.Treatment.PatientId), doctorId: doctorId,
                    diseaseId: new Guid(dto.Treatment.DiseaseId),
                    medicinesId: dto.Treatment.MedicinesId.Select(medicineId => new Guid(medicineId)).ToList(), startingDate: dto.Treatment.StartingDate,
                    observations: dto.Treatment.Observations);

                return Ok(new
                {
                    treatment = treatment
                });
            }
            catch (Exception e)
            {
                return BadRequest(new
                {
                    message = e.Message
                });
            }
        }
    }
}
