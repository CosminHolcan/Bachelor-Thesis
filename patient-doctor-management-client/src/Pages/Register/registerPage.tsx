import { Label, Stack, StackItem, TextField } from "@fluentui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRegisterDTO } from "../../DTO/RegisterDTO";
import { AuthorizationService } from "../../Utils/services";

export const RegisterPage = (): JSX.Element => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = async (e: any) => {
        const registerDTO: IRegisterDTO = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        AuthorizationService.RegisterUser(registerDTO)
            .then(function (response) {
                localStorage.setItem('jwt', response.data.jwt);
                localStorage.setItem('userType', response.data.userType);
                navigate("/patientDoctorManagement");
            })
            .catch(function (error) {
                setErrorMessage(error.response.data.message)
            });
    }

    const handleChangedEmail = (newValue: string): void => {
        if (errorMessage !== '')
            setErrorMessage('');
        setEmail(newValue);
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
                    onChange={(event: any) => handleChangedEmail(event.target.value)}
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
            {
                errorMessage && 
                    <p>{errorMessage}</p>
            }
        </Stack>
    )
}