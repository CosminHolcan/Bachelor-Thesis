import { Label, Stack, StackItem } from "@fluentui/react"
import Avatar from 'react-avatar';
import { twoDatesHaveTheSameDay } from "../../Utils/functions";
import { IChatInfoProps } from "./chatInfo.types";

export const ChatInfo = (props: IChatInfoProps): JSX.Element => {
    return (
        <Stack horizontal style={{ width: "40vw", marginBottom: "2vh" }}>
            <Avatar round={true} name={props.userName} />
            <Stack style={{ marginLeft: "2vw" }}>
                <StackItem>
                    <Label>
                        {props.userName}
                    </Label>
                </StackItem>
                <Stack horizontal>
                    <StackItem style={{ width: "25vw", textOverflow: "ellipsis" }}>
                        <Label>
                            {props.lastMessageSentByCurrentUser
                                ? "You : " + props.lastMessage
                                : props.lastMessage
                            }
                        </Label>
                    </StackItem>
                    <StackItem style={{ marginLeft: "3vw", width: "5vw" }}>
                        <Label>
                            {twoDatesHaveTheSameDay(props.timeStamp, new Date())
                                ? props.timeStamp.getHours() + ":" + props.timeStamp.getMinutes()
                                : props.timeStamp.getDate() + "/" + props.timeStamp.getMonth() + "/" + props.timeStamp.getFullYear()
                            }
                        </Label>
                    </StackItem>
                </Stack>
            </Stack>
        </Stack>
    )
}