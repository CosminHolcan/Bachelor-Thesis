import { Label, ScrollablePane, ScrollablePaneContext, Stack, StackItem, TextField } from "@fluentui/react"
import { useEffect, useState } from "react";
import "./chatPage.styles.css";
import { IChatPageProps } from "./chatPage.types"
import * as signalR from "@microsoft/signalr";
import Multiselect from "multiselect-react-dropdown";
import { UserType } from "../../Enums/userTypes";
import { IPersonDescription } from "../../Models/PersonDescription";
import { values } from "office-ui-fabric-react";
import { IMessage } from "../../Models/Message";
import { convertDateStringFromServerToLocal } from "../../Utils/functions";
import { ICustomKeyValuePair } from "../../Models/CustomKeyValuePair";
import { MessageList } from "../../Components/MessageList/messageList";
import { ChatInfo } from "../../Components/ChatInfo/chatInfo";
import { cloneDeep } from 'lodash';

export const ChatPage = (props: IChatPageProps) => {
    const [textMessage, setTextMessage] = useState<string>('');
    const [selectedPerson, setSelectedPerson] = useState<IPersonDescription>();
    const [realTimeMessages, setRealTimeMessages] = useState<ICustomKeyValuePair<string, IMessage[]>[]>(props.messages);

    var userTypeString = localStorage.getItem("userType");
    const isLoggedInDoctor = userTypeString == null ? false : +userTypeString == UserType.Doctor ? true : false;

    props.connection.on("ReceiveMessage", function (sender, receiver, messageText, timeStamp) {
        const index: number = realTimeMessages.findIndex((group) => group.key === sender);

        const newMessage: IMessage = {
            senderId: sender,
            receiverId: receiver,
            text: messageText,
            timeStamp: new Date(convertDateStringFromServerToLocal(timeStamp))
        }

        const newMessages = cloneDeep(realTimeMessages);

        newMessages[index].value.push(newMessage);
        var currentLength: number = realTimeMessages[index].value.length;

        if (currentLength < 2) {
            setRealTimeMessages(newMessages);
            return;
        }

        while (newMessages[index].value[currentLength - 1].text == newMessages[index].value[currentLength - 2].text) {
            currentLength -= 1;
            newMessages[index].value.pop();
        }

        setRealTimeMessages(newMessages);
    });

    const onButtonClicked = () => {
        if (props.connection === undefined)
            return;

        const timeStamp : Date = new Date();

        props.connection.invoke("SendMessage", {
            jwt: localStorage.getItem("jwt"),
            receiver: selectedPerson?.id ?? '',
            text: textMessage,
            timeStamp: new Date()
        })
            .then(function (response) {
                const index: number = realTimeMessages.findIndex((group) => group.key == selectedPerson?.id ?? '');

                const newMessage: IMessage = {
                    senderId: props.currentUserId,
                    receiverId: selectedPerson?.id ?? '',
                    text: textMessage,
                    timeStamp: timeStamp
                }
        
                const newMessages = cloneDeep(realTimeMessages);
        
                newMessages[index].value.push(newMessage);
                setRealTimeMessages(newMessages);

            })
            .catch(function (err) {
                return console.error(err.toString());
            });
    }

    const getChatInfos = (): JSX.Element => {
        return (
            <>
                {realTimeMessages.map((group) => {
                    const userName: string = props.people.find((person) => person.id === group.key)?.name ?? '';

                    if (userName == '')
                        return;

                    const userId: string = props.people.find((person) => person.id === group.key)?.id ?? '';
                    const length: number = group.value.length;
                    return (
                        <ChatInfo
                            key={userId}
                            userName={userName}
                            userId={userId}
                            lastMessage={group.value[length - 1].text}
                            lastMessageSentByCurrentUser={group.value[length - 1].senderId == props.currentUserId}
                            timeStamp={group.value[length - 1].timeStamp} />
                    )
                })}
            </>
        )
    }

    return (
        <Stack horizontal style={{ marginTop: "10vh" }}>
            <Stack style={{ width: "40vw", height: "80vh" }}>
                <StackItem style={{ height: "10vh" }}>
                    <Multiselect
                        singleSelect={true}
                        options={props.people}
                        groupBy={isLoggedInDoctor ? undefined : "specialization"}
                        onSelect={(selectedList, selectedItem) => { setSelectedPerson(selectedItem) }}
                        displayValue="name"
                    />
                </StackItem>
                <StackItem style={{ height: "70vh", overflowY: "scroll", overflowX: "hidden" }}>
                    {getChatInfos()}
                </StackItem>
            </Stack>
            <Stack style={{ textAlign: "center", width: "60vw", height: "60vh" }}>
                <StackItem >
                    <MessageList messages={realTimeMessages[0].value} />
                </StackItem>
                <StackItem>
                    <TextField
                        onChange={(e, newValue) => newValue && setTextMessage(newValue)}
                    />
                    <button onClick={onButtonClicked}>Press here</button>
                </StackItem>
            </Stack>
        </Stack>
    )
}