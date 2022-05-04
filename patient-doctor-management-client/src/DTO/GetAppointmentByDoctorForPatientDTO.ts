import { IBaseDTO } from "./BaseDTO";

export interface IGetAppointmentByDoctorForPatientDTO extends IBaseDTO{
    doctorId: string;
}