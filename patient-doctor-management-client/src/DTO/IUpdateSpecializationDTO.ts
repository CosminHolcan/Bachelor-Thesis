import { IBaseModel } from "../Models/BaseModel";
import { IBaseDTO } from "./BaseDTO";

export interface IUpdateSpecializationDTO extends IBaseDTO{
    specialization: IBaseModel;
}