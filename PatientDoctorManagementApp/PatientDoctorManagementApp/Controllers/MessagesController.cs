using BusinessLogicLayer;
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
    public class MessagesController: ControllerBase
    {
        private readonly BLLContext _bllContext;
        private readonly JWTService _jwtService;

        public MessagesController(BLLContext bllContext, JWTService jwtService)
        {
            _bllContext = bllContext;
            _jwtService = jwtService;
        }

        [HttpPost("forUser")]
        public IActionResult UpdateMedicine(BaseDTO dto)
        {
            JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
            Guid userId = new Guid(token.Issuer);

            try
            {
                var messages = this._bllContext.Messages.GetMessagesForUser(userId);
                return Ok(new
                {
                    messages = messages
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
