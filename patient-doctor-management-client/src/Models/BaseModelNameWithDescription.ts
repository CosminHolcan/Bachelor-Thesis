import { IBaseModel } from "./BaseModel";

export interface IBaseModelWithDescription extends IBaseModel {
    description: string;
}