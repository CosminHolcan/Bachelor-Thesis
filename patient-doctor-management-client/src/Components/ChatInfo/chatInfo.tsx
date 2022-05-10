import { Stack, StackItem } from "@fluentui/react"
import Avatar from 'react-avatar';

export const ChatInfo = (): JSX.Element => {
    return (
        <Stack horizontal style={{marginBottom:"2vh"}}>
            <Avatar round={true} name="Rica Raducanu"/>
            <Stack>
                <StackItem>
                    <p>Rica Raducanu</p>
                </StackItem>
                <StackItem>
                    <p>Last message</p>
                </StackItem>
            </Stack>
        </Stack>
    )
}