using BusinessLogicLayer;
using DataAbstractionLayer.Models;
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
            JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
            Guid patientId = new Guid(token.Issuer);

            try
            {
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
            JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
            Guid patientId = new Guid(token.Issuer);

            try
            {
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
            JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
            Guid doctorId = new Guid(token.Issuer);

            try
            {
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
