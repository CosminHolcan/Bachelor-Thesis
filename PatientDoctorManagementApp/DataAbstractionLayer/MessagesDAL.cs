using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAbstractionLayer
{
    public class MessagesDAL : BaseDAL
    {
        public MessagesDAL(DALContext dalContext) : base(dalContext) { }

        public void AddMessage(Guid senderId, Guid receiverId, DateTime timeStamp, string text)
        {
            Message message = new Message()
            {
                SenderId = senderId,
                ReceiverId = receiverId,
                TimeStamp = timeStamp,
                Text = text
            };

            this._dalContext.DbContext.Messages.Add(message);
            this._dalContext.DbContext.SaveChanges();
        }

        public List<Message> GetMessagesByUserId(Guid id)
        {
            return this._dalContext.DbContext.Messages.Where((Message message) => message.ReceiverId == id || message.SenderId == id).ToList();
        }
    }
}
