import { IBaseModel } from "../../Models/BaseModel";
import { IBaseModelWithDescription } from "../../Models/BaseModelNameWithDescription";
import { IPersonDescription } from "../../Models/PersonDescription";

export interface IFeedbackPagePatientViewProps {
    doctors: IPersonDescription[];
    diseases: IBaseModelWithDescription[];
    currentUserId: string;
}