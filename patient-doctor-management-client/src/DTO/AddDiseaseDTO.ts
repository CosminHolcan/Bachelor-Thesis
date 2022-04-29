import { IAddBaseEntityDTO } from "./AddBaseEntityDTO";
import { IBaseDTO } from "./BaseDTO";

export interface IAddDiseaseDTO extends IBaseDTO{
    disease: IAddBaseEntityDTO;
}