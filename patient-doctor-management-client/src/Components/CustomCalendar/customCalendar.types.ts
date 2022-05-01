import { IDoctorDTO } from "../../DTO/DoctorDTO";
import { IAppointment } from "../../Models/Appointment";

export interface ICustomCalendarProps {
    appointments: IAppointment[] | undefined;
    startingWeekDate: Date | undefined;
    selectedDoctor: IDoctorDTO | undefined;
}