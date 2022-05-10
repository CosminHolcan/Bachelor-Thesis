import { useEffect, useState } from "react"
import { ICustomKeyValuePair } from "../../Models/CustomKeyValuePair"
import { IMessage } from "../../Models/Message";
import { IMessageListProps } from "./messageList.types"

export const MessageList = (props: IMessageListProps): JSX.Element => {
    const [messages, setMessages] = useState<IMessage[]>(props.messages);

    // useEffect(() => {
    //     if (props.messages.length < 2)
    //         return;

    //     const newMessages = [...props.messages];
    //     while (newMessages[newMessages.length-1].text == newMessages[newMessages.length-2].text)
    //         newMessages.pop();
        
    //     setMessages(newMessages);
    // }, [props.messages.length]);

    return (
        <ul style={{ overflowY: "scroll", overflowX: "hidden", height: "60vh" }}>
            {messages.map(message => {
                return (
                    <li key={message.timeStamp.getTime()}>
                        <div>
                            {message.timeStamp.toLocaleTimeString()}
                        </div>
                        <div>
                            {message.text}
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}