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
    public class UsersController: ControllerBase
    {
        private readonly BLLContext _bllContext;
        private readonly JWTService _jwtService;

        public UsersController(BLLContext bllContext, JWTService jwtService)
        {
            _bllContext = bllContext;
            _jwtService = jwtService;
        }

        [HttpPost("user")]
        public IActionResult GetUser(BaseDTO dto)
        {
            try
            {
                JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
                Guid userId = new Guid(token.Issuer);

                return Ok(new
                {
                    userInformation = this._bllContext.Users.GetUserInformationById(userId)
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

        [HttpPost("updateUser")]
        public IActionResult UpdateUser(UpdateUserDTO dto)
        {
            try
            {
                JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
                Guid userId = new Guid(token.Issuer);
                string password = dto.Password;
                if (password != "")
                    password = EncryptionDecryption.Encrypt(password);

                this._bllContext.Users.UpdateUser(userId, dto.Email, password);

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
