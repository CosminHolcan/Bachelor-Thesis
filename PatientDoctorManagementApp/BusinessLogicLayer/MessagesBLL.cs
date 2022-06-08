using BusinessLogicLayer.Models;
using DataAbstractionLayer.Entities;
using System;
using System.Collections.Generic;

namespace BusinessLogicLayer
{
    public class MessagesBLL : BaseBLL
    {
        public MessagesBLL(BLLContext bllContext) : base(bllContext) { }

        public void AddMessage(Guid senderId, Guid receiverId, DateTime timeStamp, string text)
        {
            Doctor existingDoctorSender = this._bllContext.DALContext.Doctors.GetDoctorById(senderId);
            Patient existingPatientSender = this._bllContext.DALContext.Patients.GetPatientById(senderId);

            if (existingDoctorSender == null && existingPatientSender == null)
                throw new Exception("There is no sender with this id.");

            Doctor existingDoctorReceiver = this._bllContext.DALContext.Doctors.GetDoctorById(receiverId);
            Patient existingPatientReceiver = this._bllContext.DALContext.Patients.GetPatientById(receiverId);

            if (existingDoctorReceiver == null && existingPatientReceiver == null)
                throw new Exception("There is no receiver with this id.");

            this._bllContext.DALContext.Messages.AddMessage(senderId: senderId, receiverId: receiverId, timeStamp: timeStamp, text: text);
        }

        public List<CustomKeyValuePair<Guid, List<Message>>> GetMessagesForUser(Guid id)
        {
            Doctor existingDoctor = this._bllContext.DALContext.Doctors.GetDoctorById(id);
            Patient existingPatient = this._bllContext.DALContext.Patients.GetPatientById(id);

            if (existingDoctor == null && existingPatient == null)
                throw new Exception("There is no user with this id.");

            List<Message> allMessages = this._bllContext.DALContext.Messages.GetMessagesByUserId(id);
            List<CustomKeyValuePair<Guid, List<Message>>> result = new List<CustomKeyValuePair<Guid, List<Message>>>();

            foreach (Message message in allMessages)
            {
                Guid otherUserId = message.SenderId == id ? message.ReceiverId : message.SenderId;
                int currentListIndex = result.FindIndex((list) => list.Key == otherUserId);
                if (currentListIndex == -1)
                    result.Add(new CustomKeyValuePair<Guid, List<Message>>()
                    {
                        Key = otherUserId,
                        Value = new List<Message>() { message }
                    });
                else
                {
                    result[currentListIndex].Value.Add(message);
                }
            }

            return result;
        }
    }
}
