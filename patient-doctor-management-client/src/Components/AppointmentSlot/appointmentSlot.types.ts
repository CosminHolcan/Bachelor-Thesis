import { IDoctorDTO } from "../../DTO/DoctorDTO";
import { IAppointment } from "../../Models/Appointment";
import { IAppointmentsByDoctorForPatient } from "../../Models/AppointmentsByDoctorForPatient";

export interface IAppointmentSlotForPatientViewProps {
    startTime: Date;
    selectedDoctor: IDoctorDTO | undefined;
    appointments: IAppointmentsByDoctorForPatient;
    setRefreshData: React.Dispatch<React.SetStateAction<boolean>>;
}