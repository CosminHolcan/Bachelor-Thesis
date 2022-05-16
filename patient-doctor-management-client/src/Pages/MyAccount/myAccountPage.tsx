import { Stack } from "@fluentui/react"
import { Label, StackItem, TextField } from "office-ui-fabric-react"
import { useEffect, useState } from "react"
import Avatar from "react-avatar"
import { IUpdateUserDTO } from "../../DTO/UpdateUserDTO"
import { AuthorizationService } from "../../Utils/services"
import { IMyAccountPageProps } from "./myAccountPage.types"

export const MyAccountPage = (props: IMyAccountPageProps): JSX.Element => {
    const [email, setEmail] = useState<string>(props.currentUser.email);
    const [updateMode, setUpdateMode] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setError('');
    }, [email, password, repeatPassword])

    const handleModifyClicked = (e: any): void => {
        setUpdateMode(true);
    }

    const handleSaveClicked = (e: any): void => {
        if (email == '') {
            setError("Email field is empty.");
            return;
        }

        if (password != repeatPassword) {
            setError("New password and repeat password fieds don't match.");
            return;
        }

        const dto: IUpdateUserDTO = {
            jwt: localStorage.getItem("jwt") ?? '',
            email: email,
            password: password
        }

        AuthorizationService.UpdateUser(dto)
            .then(function (response) {
                setUpdateMode(false);
            })
            .catch(function (error) {
                setError(error.response.data.message)
            })
    }

    const handleCancelClicked = (e: any): void => {
        setEmail(props.currentUser.email);
        setPassword('');
        setRepeatPassword('');
        setUpdateMode(false);
    }

    return (
        <Stack horizontal style={{ marginTop: "5vh", marginLeft: "5vw" }}>
            <Stack>
                <Avatar name={props.currentUser.firstName + " " + props.currentUser.lastName} round={true} size="20vh" />
            </Stack>
            <Stack style={{ marginLeft: "5vw" }}>
                <Stack horizontal >
                    <StackItem style={{ width: "8vw" }}>
                        <Label>
                            First name
                        </Label>
                    </StackItem>
                    <StackItem style={{ width: "20vw" }}>
                        <TextField
                            rows={1}
                            disabled={true}
                            value={props.currentUser?.firstName}
                        />
                    </StackItem>
                </Stack>
                <Stack horizontal style={{ marginTop: "2vh" }}>
                    <StackItem style={{ width: "8vw" }}>
                        <Label>
                            Last name
                        </Label>
                    </StackItem>
                    <StackItem style={{ width: "20vw" }}>
                        <TextField
                            rows={1}
                            disabled={true}
                            value={props.currentUser?.lastName}
                        />
                    </StackItem>
                </Stack>
                {props.isLoggedInDoctor &&
                    <Stack horizontal style={{ marginTop: "2vh" }}>
                        <StackItem style={{ width: "8vw" }}>
                            <Label>
                                Specialization
                            </Label>
                        </StackItem>
                        <StackItem style={{ width: "20vw" }}>
                            <TextField
                                rows={1}
                                disabled={true}
                                value={props.currentUser?.specialization}
                            />
                        </StackItem>
                    </Stack>
                }
                <Stack horizontal style={{ marginTop: "2vh" }}>
                    <StackItem style={{ width: "8vw" }}>
                        <Label>
                            Email
                        </Label>
                    </StackItem>
                    <StackItem style={{ width: "20vw" }}>
                        <TextField
                            rows={1}
                            disabled={!updateMode}
                            value={email}
                            onChange={(e, newVaue) => newVaue != undefined && setEmail(newVaue)}
                        />
                    </StackItem>
                </Stack>
                {updateMode ?
                    <Stack>
                        <Stack horizontal style={{ marginTop: "2vh" }}>
                            <StackItem style={{ width: "8vw" }}>
                                <Label>
                                    New password
                                </Label>
                            </StackItem>
                            <StackItem style={{ width: "20vw" }}>
                                <TextField
                                    rows={1}
                                    value={password}
                                    onChange={(e, newVaue) => newVaue != undefined && setPassword(newVaue)}
                                    type="password"
                                />
                            </StackItem>
                        </Stack>
                        <Stack horizontal style={{ marginTop: "2vh" }}>
                            <StackItem style={{ width: "8vw" }}>
                                <Label>
                                    Repeat password
                                </Label>
                            </StackItem>
                            <StackItem style={{ width: "20vw" }}>
                                <TextField
                                    rows={1}
                                    value={repeatPassword}
                                    onChange={(e, newVaue) => newVaue != undefined && setRepeatPassword(newVaue)}
                                    type="password"
                                />
                            </StackItem>
                        </Stack>
                        <Stack horizontal style={{ marginTop: "5vh" }}>
                            <button onClick={handleSaveClicked} style={{ width: "10vw", marginRight: "8vw" }}>Save</button>
                            <button onClick={handleCancelClicked} style={{ width: "10vw" }}>Cancel</button>
                        </Stack>
                        {error != '' &&
                            <Stack style={{ marginTop: "5vh" }}>
                                <Label>
                                    {error}
                                </Label>
                            </Stack>
                        }
                    </Stack>
                    :
                    <Stack style={{ marginTop: "2vh" }}>
                        <button onClick={handleModifyClicked}>Modify</button>
                    </Stack>
                }
            </Stack>
        </Stack>
    )
}