import { IAddBaseEntityDTO } from "./AddBaseEntityDTO";
import { IBaseDTO } from "./BaseDTO";

export interface IAddBaseDTO extends IBaseDTO{
    entity: IAddBaseEntityDTO;
}