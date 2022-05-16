import { IBaseModelWithDescription } from "../../Models/BaseModelNameWithDescription";

export interface IInformationPageProps {
    diseases: IBaseModelWithDescription[];
    medicines: IBaseModelWithDescription[];
}