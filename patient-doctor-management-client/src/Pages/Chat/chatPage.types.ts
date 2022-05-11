import { ICustomKeyValuePair } from "../../Models/CustomKeyValuePair";
import { IMessage } from "../../Models/Message";
import { IPersonDescription } from "../../Models/PersonDescription";

export interface IChatPageProps {
    currentUserId: string;
    people: IPersonDescription[];
    messages: ICustomKeyValuePair<string, IMessage[]>[];
    connection: signalR.HubConnection;
}