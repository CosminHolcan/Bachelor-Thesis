import { IBaseModelWithDescription } from "../../Models/BaseModelNameWithDescription";
import { IAdministrationFeatureProps } from "../../Pages/Admin/adminPage.types";

export interface IUpdateDiseaseProps extends IAdministrationFeatureProps {
    diseases: IBaseModelWithDescription[];
}