import { IBaseModelWithDescription } from "../../Models/BaseModelNameWithDescription";
import { IPersonDescription } from "../../Models/PersonDescription";
import { ITreatment } from "../../Models/Treatment";

export interface IRecipesPageProps {
    isLoggedInDoctor: boolean;
    treatments: ITreatment[];
    patients: IPersonDescription[];
    diseases: IBaseModelWithDescription[];
    medicines: IBaseModelWithDescription[];
}