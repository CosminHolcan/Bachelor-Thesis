import { IBaseModel } from "../../Models/BaseModel";
import { IAdministrationFeatureProps } from "../../Pages/Admin/adminPage.types";

export interface IUpdateSpecializationProps extends IAdministrationFeatureProps {
    specializations: IBaseModel[];
}