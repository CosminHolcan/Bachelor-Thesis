export interface IChatInfoProps {
    userName: string;
    userId: string;
    lastMessage: string;
    timeStamp: Date;
    lastMessageSentByCurrentUser: boolean;
    onClick : (userId: string) => void;
}