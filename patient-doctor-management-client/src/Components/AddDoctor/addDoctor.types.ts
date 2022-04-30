import { IBaseModel } from "../../Models/BaseModel";
import { IAdministrationFeatureProps } from "../../Pages/Admin/adminPage.types";

export interface IAddDoctorProps extends IAdministrationFeatureProps {
    specializations: IBaseModel[];
}