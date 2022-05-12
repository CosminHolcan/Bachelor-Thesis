import { ICustomKeyValuePair } from "../../Models/CustomKeyValuePair";
import { IMessage } from "../../Models/Message";

export interface IMessageListProps {
    messages: IMessage[];
    currentUserId: string;
}