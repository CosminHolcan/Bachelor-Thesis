export interface IMessage {
    senderId: string;
    receiverId: string;
    timeStamp: Date;
    text: string;
}