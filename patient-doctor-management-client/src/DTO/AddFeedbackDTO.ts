import { IFeedback } from "../Models/Feedback";
import { IBaseDTO } from "./BaseDTO";

export interface IAddFeedbackDTO extends IBaseDTO {
    feedback: IFeedback;
}