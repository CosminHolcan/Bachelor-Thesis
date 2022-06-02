import { Stack } from "@fluentui/react"
import { Label, StackItem, TextField } from "office-ui-fabric-react"
import { useEffect, useState } from "react"
import Avatar from "react-avatar"
import { IUpdateUserDTO } from "../../DTO/UpdateUserDTO"
import { AuthorizationService } from "../../Utils/services"
import { ButtonCancelStyle, ButtonModifyStyle, ButtonSaveStyle, InfoContainerStyle, LabelFieldContainerStyle, LabelStyle, MiddleFieldContainerStyle, MyAccountPageContainerStyle, TextFieldStyle, UpdateButtonsContainerStyle } from "./myAccountPage.styles"
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
        <Stack horizontal style={MyAccountPageContainerStyle}>
            <Stack>
                <Avatar name={props.currentUser.firstName + " " + props.currentUser.lastName} round={true} size="20vh" />
            </Stack>
            <Stack style={InfoContainerStyle}>
                <Stack horizontal >
                    <StackItem style={LabelFieldContainerStyle}>
                        <Label style={LabelStyle}>
                            First name
                        </Label>
                    </StackItem>
                    <StackItem style={TextFieldStyle}>
                        <TextField
                            rows={1}
                            readOnly={true}
                            value={props.currentUser?.firstName}
                        />
                    </StackItem>
                </Stack>
                <Stack horizontal style={MiddleFieldContainerStyle}>
                    <StackItem style={LabelFieldContainerStyle}>
                        <Label style={LabelStyle}>
                            Last name
                        </Label>
                    </StackItem>
                    <StackItem style={TextFieldStyle}>
                        <TextField
                            rows={1}
                            readOnly={true}
                            value={props.currentUser?.lastName}
                        />
                    </StackItem>
                </Stack>
                {props.isLoggedInDoctor &&
                    <Stack horizontal style={MiddleFieldContainerStyle}>
                        <StackItem style={LabelFieldContainerStyle}>
                            <Label style={LabelStyle}>
                                Specialization
                            </Label>
                        </StackItem>
                        <StackItem style={TextFieldStyle}>
                            <TextField
                                rows={1}
                                readOnly={true}
                                value={props.currentUser?.specialization}
                            />
                        </StackItem>
                    </Stack>
                }
                <Stack horizontal style={MiddleFieldContainerStyle}>
                    <StackItem style={LabelFieldContainerStyle}>
                        <Label style={LabelStyle}>
                            Email
                        </Label>
                    </StackItem>
                    <StackItem style={TextFieldStyle}>
                        <TextField
                            rows={1}
                            readOnly={!updateMode}
                            value={email}
                            onChange={(e, newVaue) => newVaue != undefined && setEmail(newVaue)}
                        />
                    </StackItem>
                </Stack>
                {updateMode ?
                    <Stack>
                        <Stack horizontal style={MiddleFieldContainerStyle}>
                            <StackItem style={LabelFieldContainerStyle}>
                                <Label style={LabelStyle}>
                                    New password
                                </Label>
                            </StackItem>
                            <StackItem style={TextFieldStyle}>
                                <TextField
                                    rows={1}
                                    value={password}
                                    onChange={(e, newVaue) => newVaue != undefined && setPassword(newVaue)}
                                    type="password"
                                />
                            </StackItem>
                        </Stack>
                        <Stack horizontal style={MiddleFieldContainerStyle}>
                            <StackItem style={LabelFieldContainerStyle}>
                                <Label style={LabelStyle}>
                                    Repeat password
                                </Label>
                            </StackItem>
                            <StackItem style={TextFieldStyle}>
                                <TextField
                                    rows={1}
                                    value={repeatPassword}
                                    onChange={(e, newVaue) => newVaue != undefined && setRepeatPassword(newVaue)}
                                    type="password"
                                />
                            </StackItem>
                        </Stack>
                        <Stack horizontal style={UpdateButtonsContainerStyle}>
                            <button style={ButtonSaveStyle} onClick={handleSaveClicked}>Save</button>
                            <button style={ButtonCancelStyle} onClick={handleCancelClicked}>Cancel</button>
                        </Stack>
                        {error != '' &&
                            <Label style={{ marginTop: "5vh" }}>
                                {error}
                            </Label>
                        }
                    </Stack>
                    :
                    <button style={ButtonModifyStyle} onClick={handleModifyClicked}>Modify</button>
                }
            </Stack>
        </Stack>
    )
}