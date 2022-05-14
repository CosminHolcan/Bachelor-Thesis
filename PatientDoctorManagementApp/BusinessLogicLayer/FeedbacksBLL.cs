using DataAbstractionLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class FeedbacksBLL: BaseBLL
    {
        public FeedbacksBLL(BLLContext bllContext): base(bllContext) { }

        public List<Feedback> GetFeedbacksByPatientForDoctorAndDisease(Guid patientId, Guid doctorId, Guid diseaseId)
        {
            return this._bllContext.DALContext.Feedbacks.GetFeedbacksByPatientForDoctorAndDisease(patientId, doctorId, diseaseId);
        }

        public List<Feedback> GetFeedbacksByDoctorForPatientAndDisease(Guid patientId, Guid doctorId, Guid diseaseId)
        {
            return this._bllContext.DALContext.Feedbacks.GetFeedbacksByDoctorForPatientAndDisease(patientId, doctorId, diseaseId);
        }

        public void AddFeedback(Guid patientId, Guid doctorId, Guid diseaseId, DateTime timeStamp, string text, bool givenByPatient)
        {
            this._bllContext.DALContext.Feedbacks.AddFeedback(patientId, doctorId, diseaseId, timeStamp, text, givenByPatient);
        }
    }
}
