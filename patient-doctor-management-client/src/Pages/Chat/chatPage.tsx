import { Label, ScrollablePane, ScrollablePaneContext, Stack, StackItem, TextField } from "@fluentui/react"
import { useEffect, useState } from "react";
import "./chatPage.styles.css";
import { IChatPageProps } from "./chatPage.types"
import * as signalR from "@microsoft/signalr";
import Multiselect from "multiselect-react-dropdown";
import { UserType } from "../../Enums/userTypes";
import { IPersonDescription } from "../../Models/PersonDescription";
import { Icon, values } from "office-ui-fabric-react";
import { IMessage } from "../../Models/Message";
import { convertDateStringFromServerToLocal } from "../../Utils/functions";
import { ICustomKeyValuePair } from "../../Models/CustomKeyValuePair";
import { MessageList } from "../../Components/MessageList/messageList";
import { ChatInfo } from "../../Components/ChatInfo/chatInfo";
import { cloneDeep } from 'lodash';

const SEND_ICON: string = "Send";

export const ChatPage = (props: IChatPageProps) => {
    const [textMessage, setTextMessage] = useState<string>('');
    const [realTimeMessages, setRealTimeMessages] = useState<ICustomKeyValuePair<string, IMessage[]>[]>(props.messages);
    const [selectedPersonId, setSelectedPersonId] = useState<string>('');
    const [selectedPerson, setSelectedPerson] = useState<IPersonDescription>();

    useEffect(() => {
        if (selectedPersonId === undefined)
            return;

        if (selectedPerson === undefined || selectedPerson.id !== selectedPersonId) {
            const newSelectedPerson = props.people.find((person) => person.id === selectedPersonId);
            setSelectedPerson(newSelectedPerson);
        }
    }, [selectedPersonId])

    useEffect(() => {
        var newMessages: ICustomKeyValuePair<string, IMessage[]>[] = cloneDeep(realTimeMessages);
        newMessages = newMessages.sort((group1, group2) =>
            Math.max(...group1.value.map(message => message.timeStamp.getTime())) < Math.max(...group2.value.map(message => message.timeStamp.getTime()))
                ? 1 : -1);
        setRealTimeMessages(newMessages);
    }, [props.messages])

    var userTypeString = localStorage.getItem("userType");
    const isLoggedInDoctor = userTypeString == null ? false : +userTypeString == UserType.Doctor ? true : false;

    props.connection.on("ReceiveMessage", function (sender, receiver, messageText, timeStamp) {
        var index: number = realTimeMessages.findIndex((group) => group.key === sender);
        const newMessage: IMessage = {
            senderId: sender,
            receiverId: receiver,
            text: messageText,
            timeStamp: new Date(convertDateStringFromServerToLocal(timeStamp))
        }

        const newMessages = cloneDeep(realTimeMessages);

        if (index === -1) {
            newMessages.push({
                key: sender,
                value: [newMessage]
            });
            index = newMessages.length-1;
        }
        else {
            newMessages[index].value.push(newMessage);
        }

        var currentLength: number = newMessages[index].value.length;

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

    const onSendMessageClicked = () => {
        if (props.connection === undefined || selectedPersonId === '')
            return;

        const timeStamp: Date = new Date();

        props.connection.invoke("SendMessage", {
            jwt: localStorage.getItem("jwt"),
            receiver: selectedPersonId ?? '',
            text: textMessage,
            timeStamp: new Date()
        })
            .then(function (response) {
                const index: number = realTimeMessages.findIndex((group) => group.key == selectedPersonId);

                const newMessage: IMessage = {
                    senderId: props.currentUserId,
                    receiverId: selectedPersonId,
                    text: textMessage,
                    timeStamp: timeStamp
                }

                const newMessages = cloneDeep(realTimeMessages);
                if (index === -1) {
                    newMessages.push({
                        key: selectedPersonId,
                        value: [newMessage]
                    });
                }
                else {
                    newMessages[index].value.push(newMessage);
                }

                setRealTimeMessages(newMessages);
                setTextMessage('');
            })
            .catch(function (err) {
                setTextMessage('');
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
                            onClick={(userId: string) => { setSelectedPersonId(userId) }}
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

    const getSelectedPersonMessages = (): IMessage[] => {
        if (selectedPersonId === '')
            return [];

        const index: number = realTimeMessages.findIndex((group) => group.key == selectedPersonId);
        if (index === -1)
            return [];

        return realTimeMessages[index].value;
    }

    return (
        <Stack horizontal style={{ marginTop: "10vh" }}>
            <Stack style={{ width: "40vw", height: "80vh" }}>
                <StackItem>
                    <Multiselect
                        singleSelect={true}
                        options={props.people}
                        selectedValues={selectedPerson !== undefined && [selectedPerson]}
                        groupBy={isLoggedInDoctor ? undefined : "specialization"}
                        onSelect={(selectedList, selectedItem) => { setSelectedPersonId(selectedItem.id) }}
                        displayValue="name"
                    />
                </StackItem>
                <StackItem style={{ height: "80vh", overflowY: "scroll", overflowX: "hidden" }}>
                    {getChatInfos()}
                </StackItem>
            </Stack>
            <Stack style={{ width: "60vw", height: "80vh", borderTop: '1px solid black', borderLeft: '1px solid black' }}>
                <StackItem style={{ height: "70.3vh" }}>
                    <MessageList messages={getSelectedPersonMessages()} currentUserId={props.currentUserId} />
                </StackItem>
                <Stack style={{ width: "100%", height: "8.7vh", marginTop: "1vh" }} horizontal>
                    <StackItem style={{ width: "90%" }}>
                        <TextField
                            rows={2}
                            value={textMessage}
                            multiline={true}
                            onChange={(e, newValue) => newValue !== undefined && setTextMessage(newValue)}
                        />
                    </StackItem>
                    <Stack style={{ width: "10%", height: "100%", border: '1px solid black' }} verticalAlign="center" horizontalAlign="center">
                        <Icon
                            style={{ fontSize: 40 }}
                            iconName={SEND_ICON}
                            onClick={onSendMessageClicked}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}