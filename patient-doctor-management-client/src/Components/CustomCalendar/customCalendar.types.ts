import { IDoctorDTO } from "../../DTO/DoctorDTO";
import { IAppointment } from "../../Models/Appointment";
import { IAppointmentsByDoctorForPatient } from "../../Models/AppointmentsByDoctorForPatient";

export interface ICustomCalendarProps {
    appointments: IAppointmentsByDoctorForPatient | undefined;
    startingWeekDate: Date | undefined;
    selectedDoctor: IDoctorDTO | undefined;
    setRefreshData: React.Dispatch<React.SetStateAction<boolean>>;
}