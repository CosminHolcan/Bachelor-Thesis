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
    public class FeedbacksController : ControllerBase
    {
        private readonly BLLContext _bllContext;
        private readonly JWTService _jwtService;

        public FeedbacksController(BLLContext bllContext, JWTService jwtService)
        {
            _bllContext = bllContext;
            _jwtService = jwtService;
        }

        [HttpPost("byPatient")]
        public IActionResult GetFeedbacksByPatient(GetFeedbacksByPatientDTO dto)
        {
            JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
            Guid patientId = new Guid(token.Issuer);

            try
            {
                List<FeedbackInfo> feedbacks = this._bllContext.Feedbacks.GetFeedbacksByPatientForDoctorAndDisease(patientId: new Guid(dto.PatientId), doctorId: new Guid(dto.DoctorId), diseaseId: new Guid(dto.DiseaseId));
                return Ok(new
                {
                    feedbacks = feedbacks
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

        [HttpPost("byDoctor")]
        public IActionResult GetFeedbacksByDoctor(GetFeedbacksByDoctorDTO dto)
        {
            try
            {
                JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
                Guid doctorId = new Guid(token.Issuer);

                List<FeedbackInfo> feedbacks = this._bllContext.Feedbacks.GetFeedbacksByDoctorForPatientAndDisease(patientId: new Guid(dto.PatientId), doctorId: doctorId, diseaseId: new Guid(dto.DiseaseId));
                return Ok(new
                {
                    feedbacks = feedbacks
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
        public IActionResult AddFeedback(AddFeedbackDTO dto)
        {
            try
            {
                JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
            
                this._bllContext.Feedbacks.AddFeedback(patientId: new Guid(dto.Feedback.PatientId), doctorId: new Guid(dto.Feedback.DoctorId), diseaseId: new Guid(dto.Feedback.DiseaseId),
                    timeStamp: dto.Feedback.TimeStamp, text: dto.Feedback.Text, givenByPatient: dto.Feedback.GivenByPatient);
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
