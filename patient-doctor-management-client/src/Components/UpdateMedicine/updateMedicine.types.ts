import { IBaseModelNameAndDescription } from "../../Models/BaseModelNameAndDescription";
import { IAdministrationFeatureProps } from "../../Pages/Admin/adminPage.types";

export interface IUpdateMedicineProps extends IAdministrationFeatureProps {
    medicines: IBaseModelNameAndDescription[];
}