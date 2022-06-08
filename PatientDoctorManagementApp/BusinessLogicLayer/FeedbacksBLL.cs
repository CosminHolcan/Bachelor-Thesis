using BusinessLogicLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BusinessLogicLayer
{
    public class FeedbacksBLL: BaseBLL
    {
        public FeedbacksBLL(BLLContext bllContext): base(bllContext) { }

        public List<FeedbackInfo> GetFeedbacksByPatientForDoctorAndDisease(Guid patientId, Guid doctorId, Guid diseaseId)
        {
            return this._bllContext.DALContext.Feedbacks.GetFeedbacksByPatientForDoctorAndDisease(patientId, doctorId, diseaseId).Select(f => 
            new FeedbackInfo() { 
                PatientId = f.PatientId,
                DoctorId = f.DoctorId,
                DiseaseId = f.DiseaseId,
                TimeStamp = f.TimeStamp,
                Text = f.Text,
                GivenByPatient = f.GivenByPatient
            }).ToList();
        }

        public List<FeedbackInfo> GetFeedbacksByDoctorForPatientAndDisease(Guid patientId, Guid doctorId, Guid diseaseId)
        {
            return this._bllContext.DALContext.Feedbacks.GetFeedbacksByDoctorForPatientAndDisease(patientId, doctorId, diseaseId).Select(f =>
            new FeedbackInfo()
            {
                PatientId = f.PatientId,
                DoctorId = f.DoctorId,
                DiseaseId = f.DiseaseId,
                TimeStamp = f.TimeStamp,
                Text = f.Text,
                GivenByPatient = f.GivenByPatient
            }).ToList();
        }

        public void AddFeedback(Guid patientId, Guid doctorId, Guid diseaseId, DateTime timeStamp, string text, bool givenByPatient)
        {
            this._bllContext.DALContext.Feedbacks.AddFeedback(patientId, doctorId, diseaseId, timeStamp, text, givenByPatient);
        }
    }
}
