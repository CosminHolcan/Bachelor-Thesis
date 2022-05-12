import { useEffect, useState } from "react"
import { ICustomKeyValuePair } from "../../Models/CustomKeyValuePair"
import { IMessage } from "../../Models/Message";
import { IMessageListProps } from "./messageList.types"

export const MessageList = (props: IMessageListProps): JSX.Element => {

    setTimeout(() => {
        var objDiv = document.getElementById("messageListId");
        if (objDiv)
            objDiv.scrollTop = objDiv.scrollHeight;
    }, 0)

    const getMessageStyle = (senderId: string): React.CSSProperties => {
        if (senderId === props.currentUserId) {
            return {
                color: "white",
                marginBottom: "2vh",
                padding: "10px",
                backgroundColor: "blue",
                width: "50%",
                borderRadius: "20px",
                minHeight: "5vh",
                float: "right"
            }
        }
        else {
            return {
                color: "black",
                marginBottom: "2vh",
                padding: "10px",
                backgroundColor: "gray",
                width: "50%",
                borderRadius: "20px",
                minHeight: "5vh",
                float: "left"
            }
        }
    }

    return (
        <ul id='messageListId' style={{ overflowY: "scroll", overflowX: "hidden", height: "95%", listStyle: "none" }}>
            {props.messages.map((message, index) => {
                return (
                    <li key={message.timeStamp.getTime()} style={{ marginBottom: "3vh" }}>
                        <div style={getMessageStyle(message.senderId)}>
                            <div>
                                {message.text}
                            </div>
                            <div style={{ float: "right" }}>
                                {message.timeStamp.toLocaleTimeString()}
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}