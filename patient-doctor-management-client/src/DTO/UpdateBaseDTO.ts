import { IBaseDTO } from "./BaseDTO";
import { IUpdateBaseEntityDTO } from "./UpdateBaseEntityDTO";

export interface IUpdateBaseDTO extends IBaseDTO {
    entity: IUpdateBaseEntityDTO;
}