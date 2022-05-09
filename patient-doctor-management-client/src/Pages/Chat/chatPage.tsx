import { Label, ScrollablePane, ScrollablePaneContext, Stack, StackItem, TextField } from "@fluentui/react"
import { useState } from "react";
import "./chatPage.styles.css";
import { IChatPageProps } from "./chatPage.types"
import * as signalR from "@microsoft/signalr";
import Multiselect from "multiselect-react-dropdown";
import { UserType } from "../../Enums/userTypes";
import { IPersonDescription } from "../../Models/PersonDescription";

export const ChatPage = (props: IChatPageProps) => {
    const [textMessage, setTextMessage] = useState<string>('');
    const [selectedPerson, setSelectedPerson] = useState<IPersonDescription>();

    console.log(props.messages);

    var userTypeString = localStorage.getItem("userType");
    const isLoggedInDoctor = userTypeString == null ? false : +userTypeString == UserType.Doctor ? true : false;

    var connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:44368/chatHub").build();
    connection.on("ReceiveMessage", function (user, message) {
        console.log(`${user} says ${message}`)
    });
    connection.start().then(function () {
        connection.invoke("ConnectToHub", { jwt: localStorage.getItem("jwt") })
            .then(function (response) {
            })
    }).catch(function (err) {
        return console.error(err.toString());
    });


    const onButtonClicked = () => {
        connection.invoke("SendMessage", {
            jwt: localStorage.getItem("jwt"),
            receiver: selectedPerson?.id ?? '',
            text: textMessage,
            timeStamp: new Date()
        })
            .catch(function (err) {
                return console.error(err.toString());
            });
    }

    return (
        <Stack horizontal style={{ marginTop: "10vh" }}>
            <Stack style={{ textAlign: "center", width: "40vw", height: "60vh" }}>
                <StackItem style={{ height: "20vh" }}>
                    <Multiselect
                        singleSelect={true}
                        options={props.people}
                        groupBy={isLoggedInDoctor ? undefined : "specialization"}
                        onSelect={(selectedList, selectedItem) => { setSelectedPerson(selectedItem) }}
                        displayValue="name"
                    />
                </StackItem>
                <StackItem style={{ height: "40vh" }}>
                    <StackItem style={{ height: "40vh" }}>
                        <div style={{ overflowY: "scroll", overflowX: "hidden", height: "40vh" }}>
                            <p>Text</p>
                            <p>Text</p>
                            <p>Text</p>
                            <p>Text</p>
                            <p>Text</p>
                            <p>Text</p>
                            <p>Text</p>
                            <p>Text</p>
                            <p>Text</p>
                            <p>Text</p>
                            <p>Text</p>
                            <p>Text</p>
                            <p>Text</p>
                            <p>Text</p>
                            <p>Text</p>
                            <p>Text</p>
                            <p>Text</p>
                            <p>Text</p>
                            <p>Text</p>
                        </div>
                    </StackItem>
                </StackItem>
            </Stack>
            <Stack style={{ textAlign: "center", width: "60vw", height: "60vh" }}>
                <StackItem>

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