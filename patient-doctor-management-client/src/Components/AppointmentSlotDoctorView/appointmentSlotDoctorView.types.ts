import { IAppointmentForDoctor } from "../../Models/AppointmentForDoctor";

export interface IAppointmentSlotDoctorViewProps {
    startTime: Date;
    appointments: IAppointmentForDoctor[];
}