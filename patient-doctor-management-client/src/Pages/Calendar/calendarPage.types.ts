import { IPersonDescription } from "../../Models/PersonDescription";
import { IAppointmentForDoctor } from "../../Models/AppointmentForDoctor";

export interface ICalendarPageProps {
    doctors: IPersonDescription[];
    appointments?: IAppointmentForDoctor[];
}