using System;

namespace DataAbstractionLayer.Entities
{
    public class Message
    {
        public Guid SenderId { get; set; }
        public Guid ReceiverId { get; set; }
        public DateTime TimeStamp { get; set; }
        public string Text { get; set; }
    }
}
