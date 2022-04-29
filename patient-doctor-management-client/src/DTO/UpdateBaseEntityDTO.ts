import { IAddBaseEntityDTO } from "./AddBaseEntityDTO";

export interface IUpdateBaseEntityDTO extends IAddBaseEntityDTO {
    id: string;
}