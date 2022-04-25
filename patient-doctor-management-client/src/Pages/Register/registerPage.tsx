import { Label, Stack, StackItem, TextField } from "@fluentui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterPage = (): JSX.Element => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');

    const handleSubmit = async (e: any) => {

    }

    const redirectLoginPage = () => {
        navigate("/login");

    }

    return (
        <Stack>
            <StackItem>
                <Label>
                    First Name
                </Label>
                <TextField
                    rows={1}
                    value={firstName}
                    onChange={(event: any) => setFirstName(event.target.value)}
                />
            </StackItem>
            <StackItem>
                <Label>
                    Last Name
                </Label>
                <TextField
                    rows={1}
                    value={lastName}
                    onChange={(event: any) => setLastName(event.target.value)}
                />
            </StackItem>
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
            <button onClick={handleSubmit}>Create</button>
            <button onClick={redirectLoginPage}>Already having an account ? Log in here</button>
        </Stack>
    )
}