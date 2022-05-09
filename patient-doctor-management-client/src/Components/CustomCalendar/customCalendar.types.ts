import { IPersonDescription } from "../../Models/PersonDescription";
import { IAppointment } from "../../Models/Appointment";
import { IAppointmentForDoctor } from "../../Models/AppointmentForDoctor";
import { IAppointmentsByDoctorForPatient } from "../../Models/AppointmentsByDoctorForPatient";

export interface ICustomCalendarProps {
    appointmentsPatientView?: IAppointmentsByDoctorForPatient;
    appointmentsDoctorView?: IAppointmentForDoctor[];
    startingWeekDate: Date | undefined;
    selectedDoctor: IPersonDescription | undefined;
    setRefreshData: React.Dispatch<React.SetStateAction<boolean>>;
}