import { useEffect, useState } from "react"
import { ICustomKeyValuePair } from "../../Models/CustomKeyValuePair"
import { IMessage } from "../../Models/Message";
import { IMessageListProps } from "./messageList.types"

export const MessageList = (props: IMessageListProps): JSX.Element => {
    return (
        <ul style={{ overflowY: "scroll", overflowX: "hidden", height: "60vh" }}>
            {props.messages.map(message => {
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