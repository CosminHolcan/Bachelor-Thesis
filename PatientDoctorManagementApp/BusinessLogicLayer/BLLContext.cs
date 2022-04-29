using DataAbstractionLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogicLayer
{
    public class BLLContext : IDisposable
    {
        #region Members
        private Lazy<DALContext> _dalContext;
        private Lazy<AdministratorsBLL> _administratorsBLL;
        private Lazy<DiseasesBLL> _diseasesBLL;
        private Lazy<DoctorsBLL> _doctorsBLL;
        private Lazy<PatientsBLL> _patientsBLL;
        private Lazy<MedicinesBLL> _medicinesBLL;
        private Lazy<SpecializationsBLL> _specializationsBLL;
        #endregion

        #region Properties
        public DALContext DALContext => _dalContext.Value;
        public AdministratorsBLL Administrators => _administratorsBLL.Value;
        public DiseasesBLL Diseases => _diseasesBLL.Value;
        public DoctorsBLL Doctors => _doctorsBLL.Value;
        public PatientsBLL Patients => _patientsBLL.Value;
        public MedicinesBLL Medicines => _medicinesBLL.Value;
        public SpecializationsBLL Specializations => _specializationsBLL.Value;
        #endregion

        #region Constructors
        public BLLContext()
        {
            _dalContext = new Lazy<DALContext>(() => new DALContext());
            _administratorsBLL = new Lazy<AdministratorsBLL>(() => new AdministratorsBLL(this));
            _diseasesBLL = new Lazy<DiseasesBLL>(() => new DiseasesBLL(this));
            _doctorsBLL = new Lazy<DoctorsBLL>(() => new DoctorsBLL(this));
            _patientsBLL = new Lazy<PatientsBLL>(() => new PatientsBLL(this));
            _medicinesBLL = new Lazy<MedicinesBLL>(() => new MedicinesBLL(this));
            _specializationsBLL = new Lazy<SpecializationsBLL>(() => new SpecializationsBLL(this));
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
                if (_dalContext.IsValueCreated)
                    _dalContext = null;

                if (_administratorsBLL.IsValueCreated)
                    _administratorsBLL = null;

                if (_diseasesBLL.IsValueCreated)
                    _diseasesBLL = null;

                if (_doctorsBLL.IsValueCreated)
                    _doctorsBLL = null;

                if (_patientsBLL.IsValueCreated)
                    _patientsBLL = null;

                if (_medicinesBLL.IsValueCreated)
                    _medicinesBLL = null;

                if (_specializationsBLL.IsValueCreated)
                    _specializationsBLL = null;
            }
        }

        ~BLLContext()
        {
            Dispose(false);
        }
        #endregion
    }
}
