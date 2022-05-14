import { IBaseModel } from "../../Models/BaseModel";
import { IPersonDescription } from "../../Models/PersonDescription";

export interface IFeedbackPageDoctorViewProps {
    patients: IPersonDescription[];
    diseases: IBaseModel[];
    currentUserId: string;
}