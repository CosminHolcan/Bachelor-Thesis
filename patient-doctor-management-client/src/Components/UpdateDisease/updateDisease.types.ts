import { IBaseModelNameAndDescription } from "../../Models/BaseModelNameAndDescription";
import { IAdministrationFeatureProps } from "../../Pages/Admin/adminPage.types";

export interface IUpdateDiseaseProps extends IAdministrationFeatureProps {
    diseases: IBaseModelNameAndDescription[];
}