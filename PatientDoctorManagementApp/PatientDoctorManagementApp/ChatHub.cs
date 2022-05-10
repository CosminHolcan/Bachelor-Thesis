using BusinessLogicLayer;
using Microsoft.AspNetCore.SignalR;
using PatientDoctorManagementApp.DTO;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace PatientDoctorManagementApp
{
    public class ChatHub: Hub
    {
        private readonly BLLContext _bllContext;
        private readonly JWTService _jwtService;

        public ChatHub(BLLContext bllContext, JWTService jwtService)
        {
            _bllContext = bllContext;
            _jwtService = jwtService;
        }

        public Task ConnectToHub(BaseDTO dto)
        {
            JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
            Guid userId = new Guid(token.Issuer);

            Groups.AddToGroupAsync(Context.ConnectionId, userId.ToString());
            return base.OnConnectedAsync();
        }

        public Task SendMessage(SendMessageDTO dto)
        {
            try
            {
                JwtSecurityToken token = _jwtService.Verify(dto.Jwt);
                Guid senderId = new Guid(token.Issuer);
                Guid receiverId = new Guid(dto.Receiver);

                this._bllContext.Messages.AddMessage(senderId: senderId, receiverId: receiverId, timeStamp: dto.TimeStamp, text: dto.Text);

                return Clients.Group(receiverId.ToString()).SendAsync("ReceiveMessage", senderId.ToString(), receiverId.ToString(), dto.Text, dto.TimeStamp);
            }
            catch (Exception e)
            {
                return null;
            }
        }
    }
}
