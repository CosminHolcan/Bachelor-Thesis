import { IPersonDescription } from "../../Models/PersonDescription";
import { IAppointment } from "../../Models/Appointment";
import { IAppointmentsByDoctorForPatient } from "../../Models/AppointmentsByDoctorForPatient";

export interface IAppointmentSlotPatientViewProps {
    startTime: Date;
    selectedDoctor: IPersonDescription | undefined;
    appointments: IAppointmentsByDoctorForPatient;
    setRefreshData: React.Dispatch<React.SetStateAction<boolean>>;
}