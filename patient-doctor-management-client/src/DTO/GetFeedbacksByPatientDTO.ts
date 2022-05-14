import { IBaseDTO } from "./BaseDTO";

export interface IGetFeedbacksByPatientDTO extends IBaseDTO {
    patientId: string;
    doctorId: string;
    diseaseId: string;
}