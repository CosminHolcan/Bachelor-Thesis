import { IBaseDTO } from "./BaseDTO";

export interface IUpdateUserDTO extends IBaseDTO {
    email: string;
    password: string;
}