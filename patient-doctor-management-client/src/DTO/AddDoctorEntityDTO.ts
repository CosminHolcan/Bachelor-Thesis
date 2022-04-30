import { IRegisterDTO } from "./RegisterDTO";

export interface IAddDoctorEntityDTO extends IRegisterDTO{
    specializationId: string;
}