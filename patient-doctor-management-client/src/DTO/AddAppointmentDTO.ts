import { IAddAppointmentEntityDTO } from "./AddAppointmentEntityDTO";
import { IBaseDTO } from "./BaseDTO";

export interface IAddAppointmentDTO extends IBaseDTO {
    appointment: IAddAppointmentEntityDTO;
}