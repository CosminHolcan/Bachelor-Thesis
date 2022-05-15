import { IAddTreatmentEntityDTO } from "./AddTreatmentEntityDTO";
import { IBaseDTO } from "./BaseDTO";

export interface IAddTreatmentDTO extends IBaseDTO {
    treatment: IAddTreatmentEntityDTO;
}