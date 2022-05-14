import { IBaseModelWithDescription } from "../../Models/BaseModelNameWithDescription";
import { IAdministrationFeatureProps } from "../../Pages/Admin/adminPage.types";

export interface IUpdateMedicineProps extends IAdministrationFeatureProps {
    medicines: IBaseModelWithDescription[];
}