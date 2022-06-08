using DataAbstractionLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DataAbstractionLayer
{
    public class FeedbacksDAL : BaseDAL
    {
        public FeedbacksDAL(DALContext dalContext) : base(dalContext) { }

        public List<Feedback> GetFeedbacksByPatientForDoctorAndDisease(Guid patientId, Guid doctorId, Guid diseaseId)
        {
            return this._dalContext.DbContext.Feedbacks.Where(feedback => feedback.PatientId == patientId && feedback.DoctorId == doctorId
            && feedback.DiseaseId == diseaseId && feedback.GivenByPatient == true).ToList();
        }

        public List<Feedback> GetFeedbacksByDoctorForPatientAndDisease(Guid patientId, Guid doctorId, Guid diseaseId)
        {
            return this._dalContext.DbContext.Feedbacks.Where(feedback => feedback.PatientId == patientId && feedback.DoctorId == doctorId
            && feedback.DiseaseId == diseaseId && feedback.GivenByPatient == false).ToList();
        }

        public void AddFeedback(Guid patientId, Guid doctorId, Guid diseaseId, DateTime timeStamp, string text, bool givenByPatient)
        {
            Feedback feedback = new Feedback()
            {
                PatientId = patientId,
                DoctorId = doctorId,
                DiseaseId = diseaseId,
                TimeStamp = timeStamp,
                Text = text,
                GivenByPatient = givenByPatient
            };

            this._dalContext.DbContext.Feedbacks.Add(feedback);
            this._dalContext.DbContext.SaveChanges();
        }
    }
}
