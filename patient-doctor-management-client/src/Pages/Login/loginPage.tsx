import { Label, Stack, StackItem, TextField } from "@fluentui/react";
import { useState } from "react";

export const LoginPage = (): JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: any) => {

    }

    const redirectCreateNewAccount = () => {

    }

    return (
       <Stack>
           <StackItem>
                <Label>
                    Email
                </Label>
                <TextField
                    rows={1}
                    value={email}
                    onChange={(event: any) => setEmail(event.target.value)}
                />
            </StackItem>
            <StackItem>
                <Label>
                    Password
                </Label>
                <TextField
                    rows={1}
                    value={password}
                    onChange={(event: any) => setPassword(event.target.value)}
                />
            </StackItem>
            <button onClick={handleSubmit}>Log in</button>
            <button onClick={redirectCreateNewAccount}>Create a new account</button>
       </Stack>
    )
}