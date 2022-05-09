import { IDoctorDTO } from "../../DTO/DoctorDTO";
import { IAppointmentForDoctor } from "../../Models/AppointmentForDoctor";

export interface ICalendarPageProps {
    doctors: IDoctorDTO[];
    appointments?: IAppointmentForDoctor[];
}