import { IAddDoctorEntityDTO } from "./AddDoctorEntityDTO";
import { IBaseDTO } from "./BaseDTO";

export interface IAddDoctorDTO extends IBaseDTO {
    doctor: IAddDoctorEntityDTO;
}