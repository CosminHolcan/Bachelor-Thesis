import { IBaseDTO } from "./BaseDTO";

export interface IGetFeedbacksByDoctorDTO extends IBaseDTO {
    patientId: string;
    diseaseId: string;
}