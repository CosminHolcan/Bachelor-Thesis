using System;

namespace PatientDoctorManagementApp.DTO
{
    public class SendMessageDTO: BaseDTO
    {
        public string Receiver { get; set; }
        public string Text { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
