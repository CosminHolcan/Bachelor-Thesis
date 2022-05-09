import { ICustomKeyValuePair } from "../../Models/CustomKeyValuePair";
import { IMessage } from "../../Models/Message";
import { IPersonDescription } from "../../Models/PersonDescription";

export interface IChatPageProps {
    people: IPersonDescription[];
    messages: ICustomKeyValuePair<string, IMessage[]>[];
}