import { Label, Stack, StackItem, TextField } from "@fluentui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IRegisterDTO } from "../../DTO/RegisterDTO";
import { AuthorizationService } from "../../Utils/services";

export const RegisterPage = (): JSX.Element => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        setErrorMessage('');
    }, [firstName, lastName, email, password, repeatPassword]);

    const handleSubmit = async (e: any) => {
        var newErrorMessage: string = '';
        if (firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || password.trim() === "") {
            newErrorMessage += "All fields are required, none of them can be empty."
        }

        if (password !== repeatPassword) {
            newErrorMessage += "The password and repeat password fields don't match.";
        }

        if (newErrorMessage !== '') {
            setErrorMessage(newErrorMessage);
            return;
        }

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
                    type="password"
                    rows={1}
                    value={password}
                    onChange={(event: any) => setPassword(event.target.value)}
                />
            </StackItem>
            <StackItem>
                <Label>
                    Repeat Password
                </Label>
                <TextField
                    type="password"
                    rows={1}
                    value={repeatPassword}
                    onChange={(event: any) => setRepeatPassword(event.target.value)}
                />
            </StackItem>
            <button onClick={handleSubmit}>Create</button>
            <button onClick={redirectLoginPage}>Already having an account ? Log in here</button>
            {
                errorMessage &&
                <StackItem>
                    <Label>
                        {errorMessage}
                    </Label>
                </StackItem>
            }
        </Stack>
    )
}