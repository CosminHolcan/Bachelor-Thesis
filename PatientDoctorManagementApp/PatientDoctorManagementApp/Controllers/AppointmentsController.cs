using BusinessLogicLayer;
using BusinessLogicLayer.Models;
using Microsoft.AspNetCore.Mvc;
using PatientDoctorManagementApp.DTO;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;

namespace PatientDoctorManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly BLLContext _bllContext;
        private readonly JWTService _jwtService;

        public AppointmentsController(BLLContext bllContext, JWTService jwtService)
        {
            _bllContext = bllContext;
            _jwtService = jwtService;
        }

        [HttpPost("add")]
        public IActionResult AddAppointment(AddAppointmentDTO dto)
        {
            try
            {
                JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
                Guid patientId = new Guid(token.Issuer);

                this._bllContext.Appointments.AddAppointment(doctorId: new Guid(dto.Appointment.DoctorId), patientId: patientId, startTime: dto.Appointment.StartTime);
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

        [HttpPost("getByDoctorForPatient")]
        public IActionResult GetAppointmentsByDoctorForPatient(GetAppointmentsByDoctorForPatient dto)
        {
            try
            {
                JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
                Guid patientId = new Guid(token.Issuer);

                AppointmentsByDoctorForPatient result = this._bllContext.Appointments.GetAppointmentsByDoctorForPatient(doctorId: new Guid(dto.DoctorId), patientId: patientId);
                return Ok(new
                {
                    appointments = result
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
        public IActionResult GetAppointmentsByDoctor(BaseDTO dto)
        {
            try
            {
                JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
                Guid doctorId = new Guid(token.Issuer);

                List<AppointmentForDoctor> result = this._bllContext.Appointments.GetAppointmentsByDoctor(doctorId);
                return Ok(new
                {
                    appointments = result
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
