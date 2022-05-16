import { IUserInformation } from "../../Models/UserInformation";

export interface IMyAccountPageProps {
    currentUser: IUserInformation;
    isLoggedInDoctor: boolean;
}