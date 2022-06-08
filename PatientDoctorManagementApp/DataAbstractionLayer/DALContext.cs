using System;

namespace DataAbstractionLayer
{
    public class DALContext : IDisposable
    {
        #region Members
        private Lazy<PatientDoctorManagementDbContext> _dbContext;
        private Lazy<AdministratorsDAL> _administratorsDAL;
        private Lazy<AppointmentsDAL> _appointmentsDAL;
        private Lazy<DiseasesDAL> _diseasesDAL;
        private Lazy<DoctorsDAL> _doctorsDAL;
        private Lazy<FeedbacksDAL> _feedbacksDAL;
        private Lazy<MedicinesDAL> _medicinesDAL;
        private Lazy<MessagesDAL> _messagesDAL;
        private Lazy<PatientsDAL> _patientsDAL;
        private Lazy<SpecializationsDAL> _specializationsDAL;
        private Lazy<TreatmentsDAL> _treatmentsDAL;
        #endregion

        #region Properties
        public PatientDoctorManagementDbContext DbContext => _dbContext.Value;
        public AdministratorsDAL Administrators => _administratorsDAL.Value;
        public AppointmentsDAL Appointments => _appointmentsDAL.Value;
        public DiseasesDAL Diseases => _diseasesDAL.Value;
        public DoctorsDAL Doctors => _doctorsDAL.Value;
        public FeedbacksDAL Feedbacks => _feedbacksDAL.Value;
        public MedicinesDAL Medicines => _medicinesDAL.Value;
        public MessagesDAL Messages => _messagesDAL.Value;
        public PatientsDAL Patients => _patientsDAL.Value;
        public SpecializationsDAL Specializations => _specializationsDAL.Value;
        public TreatmentsDAL Treatments => _treatmentsDAL.Value;
        #endregion

        #region Constructors
        public DALContext()
        {
            _dbContext = new Lazy<PatientDoctorManagementDbContext>(() => new PatientDoctorManagementDbContext());
            _administratorsDAL = new Lazy<AdministratorsDAL>(() => new AdministratorsDAL(this));
            _appointmentsDAL = new Lazy<AppointmentsDAL>(() => new AppointmentsDAL(this));
            _diseasesDAL = new Lazy<DiseasesDAL>(() => new DiseasesDAL(this));
            _doctorsDAL = new Lazy<DoctorsDAL>(() => new DoctorsDAL(this));
            _feedbacksDAL = new Lazy<FeedbacksDAL>(() => new FeedbacksDAL(this));
            _medicinesDAL = new Lazy<MedicinesDAL>(() => new MedicinesDAL(this));
            _messagesDAL = new Lazy<MessagesDAL>(() => new MessagesDAL(this));
            _patientsDAL = new Lazy<PatientsDAL>(() => new PatientsDAL(this));
            _specializationsDAL = new Lazy<SpecializationsDAL>(() => new SpecializationsDAL(this));
            _treatmentsDAL = new Lazy<TreatmentsDAL>(() => new TreatmentsDAL(this));
        }
        #endregion

        #region IDisposable
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_dbContext.IsValueCreated)
                    _dbContext = null;

                if (_administratorsDAL.IsValueCreated)
                    _administratorsDAL = null;

                if (_appointmentsDAL.IsValueCreated)
                    _appointmentsDAL = null;

                if (_diseasesDAL.IsValueCreated)
                    _diseasesDAL = null;

                if (_doctorsDAL.IsValueCreated)
                    _doctorsDAL = null;

                if (_medicinesDAL.IsValueCreated)
                    _medicinesDAL = null;

                if (_messagesDAL.IsValueCreated)
                    _messagesDAL = null;

                if (_feedbacksDAL.IsValueCreated)
                    _feedbacksDAL = null;

                if (_patientsDAL.IsValueCreated)
                    _patientsDAL = null;

                if (_specializationsDAL.IsValueCreated)
                    _specializationsDAL = null;

                if (_treatmentsDAL.IsValueCreated)
                    _treatmentsDAL = null;
            }
        }

        ~DALContext()
        {
            Dispose(false);
        }
        #endregion
    }
}
