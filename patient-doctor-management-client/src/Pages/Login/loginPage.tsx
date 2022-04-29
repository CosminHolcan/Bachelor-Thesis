import { Label, Stack, StackItem, TextField } from "@fluentui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ILoginDTO } from "../../DTO/LoginDTO";
import { AuthorizationService } from "../../Utils/services";

export const LoginPage = (): JSX.Element => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = async (e: any) => {
        const loginDTO: ILoginDTO = {
            email: email,
            password: password
        };

        AuthorizationService.LoginUser(loginDTO)
            .then(function (response) {
                localStorage.setItem("jwt", response.data.jwt);
                localStorage.setItem("userType", response.data.userType);
                navigate("/patientDoctorManagement");
            })
            .catch(function (error) {
                setErrorMessage(error.response.data.message)
            });
    }

    const redirectCreateNewAccount = () => {
        navigate("/register");
    }

    const handleChangedEmailOrPassword = (): void => {
        if (errorMessage !== '')
            setErrorMessage('');
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
                    onChange={(event: any) => { setEmail(event.target.value); handleChangedEmailOrPassword(); }}
                />
            </StackItem>
            <StackItem>
                <Label>
                    Password
                </Label>
                <TextField
                    rows={1}
                    value={password}
                    onChange={(event: any) => { setPassword(event.target.value); handleChangedEmailOrPassword(); }}
                />
            </StackItem>
            <button onClick={handleSubmit}>Log in</button>
            <button onClick={redirectCreateNewAccount}>Create a new account</button>
            {
                errorMessage && 
                    <p>{errorMessage}</p>
            }
        </Stack>
    )
}