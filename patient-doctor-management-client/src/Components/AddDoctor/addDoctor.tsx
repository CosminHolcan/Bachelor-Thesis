import { Label, Stack, StackItem, TextField } from "@fluentui/react";
import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react";
import { IAddDoctorDTO } from "../../DTO/AddDoctor";
import { WAITING_MILLISECONDS } from "../../globalConstants";
import { IBaseModel } from "../../Models/BaseModel";
import { delay } from "../../Utils/functions";
import { DoctorsService } from "../../Utils/services";
import { ButtonSaveOperationStyle } from "../../Utils/styles";
import { LoadingSpinner } from "../LoadingSpinner/loadingSpinner";
import { AddDoctorContainerStyle, LabelMiddleFieldStyle, SpecializationContainerStyle, TextFieldsContainerStyle } from "./addDoctor.styles";
import { IAddDoctorProps } from "./addDoctor.types";

export const AddDoctor = (props: IAddDoctorProps): JSX.Element => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [selectedSpecialization, setSelectedSpecialization] = useState<IBaseModel>();
    const [processingRequest, setProcessingRequest] = useState<boolean>(false);

    useEffect(() => {
        if (props.errorMessage !== '')
            props.setErrorMessage('');
    }, [firstName, lastName, email, password, repeatPassword, selectedSpecialization]);

    const handleOnButtonClicked = async (e: any) => {
        var newErrorMessage: string = '';
        if (firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || password.trim() === "") {
            newErrorMessage += "All fields are required, none of them can be empty. ";
        }

        if (!selectedSpecialization) {
            newErrorMessage += "No selected specialization. ";
        }

        if (password !== repeatPassword) {
            newErrorMessage += "The password and repeat password fields don't match.";
        }

        if (newErrorMessage !== '') {
            props.setErrorMessage(newErrorMessage);
            return;
        }

        setProcessingRequest(true);

        const addDoctorDTO: IAddDoctorDTO = {
            jwt: localStorage.getItem("jwt") ?? '',
            doctor: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                specializationId: selectedSpecialization?.id ?? ''
            }
        };

        DoctorsService.AddDoctor(addDoctorDTO)
            .then(async function (response) {
                await delay(WAITING_MILLISECONDS);
                setProcessingRequest(false);
                props.onSuccess();
            })
            .catch(async function (error) {
                await delay(WAITING_MILLISECONDS);
                setProcessingRequest(false);
                props.setErrorMessage(error.response.data.message);
            });
    }

    return (
        <>
            {processingRequest
                ?
                <LoadingSpinner
                    height={100}
                    width={100}
                    labelStyle={{ fontSize: 20 }}
                    wrapStackStyle={{ marginTop: "10vh" }}
                />
                :
                <Stack style={AddDoctorContainerStyle}>
                    <Stack horizontal >
                        <StackItem style={TextFieldsContainerStyle}>
                            <Label>
                                First Name
                            </Label>
                            <TextField
                                rows={1}
                                value={firstName}
                                onChange={(event: any) => setFirstName(event.target.value)}
                            />
                            <Label style={LabelMiddleFieldStyle}>
                                Last Name
                            </Label>
                            <TextField
                                rows={1}
                                value={lastName}
                                onChange={(event: any) => setLastName(event.target.value)}
                            />
                            <Label style={LabelMiddleFieldStyle}>
                                Email
                            </Label>
                            <TextField
                                rows={1}
                                value={email}
                                onChange={(event: any) => setEmail(event.target.value)}
                            />
                            <Label style={LabelMiddleFieldStyle}>
                                Password
                            </Label>
                            <TextField
                                type="password"
                                rows={1}
                                value={password}
                                onChange={(event: any) => setPassword(event.target.value)}
                            />
                            <Label style={LabelMiddleFieldStyle}>
                                Repeat Password
                            </Label>
                            <TextField
                                type="password"
                                rows={1}
                                value={repeatPassword}
                                onChange={(event: any) => setRepeatPassword(event.target.value)}
                            />
                        </StackItem>
                        <StackItem style={SpecializationContainerStyle}>
                            <Multiselect
                                placeholder="Select a specialization"
                                singleSelect={true}
                                options={props.specializations}
                                onSelect={(selectedList, selectedItem) => { setSelectedSpecialization(selectedItem) }}
                                displayValue="name"
                            />
                        </StackItem>
                    </Stack>
                    <button style={ButtonSaveOperationStyle} onClick={handleOnButtonClicked}>Save</button>
                </Stack>
            }
        </>
    )
}