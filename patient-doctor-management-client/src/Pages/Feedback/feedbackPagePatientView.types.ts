import { IBaseModel } from "../../Models/BaseModel";
import { IPersonDescription } from "../../Models/PersonDescription";

export interface IFeedbackPagePatientViewProps {
    doctors: IPersonDescription[];
    diseases: IBaseModel[];
    currentUserId: string;
}