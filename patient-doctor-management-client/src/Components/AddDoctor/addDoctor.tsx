import { Label, Stack, StackItem, TextField } from "@fluentui/react";
import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react"
import { IAddBaseDTO } from "../../DTO/AddBaseDTO";
import { IAddDoctorDTO } from "../../DTO/AddDoctor";
import { IBaseModel } from "../../Models/BaseModel";
import { IAdministrationFeatureProps } from "../../Pages/Admin/adminPage.types";
import { DoctorsService } from "../../Utils/services";
import { IAddDoctorProps } from "./addDoctor.types";

export const AddDoctor = (props: IAddDoctorProps): JSX.Element => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [selectedSpecialization, setSelectedSpecialization] = useState<IBaseModel>();

    useEffect(() => {
        if (props.errorMessage !== '')
            props.setErrorMessage('');
    }, [firstName, lastName, email, password, repeatPassword, selectedSpecialization]);

    const handleOnButtonClicked = async (e: any) => {
        var newErrorMessage: string = '';
        if (firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || password.trim() === "") {
            newErrorMessage += "All fields are required, none of them can be empty.";
        }

        if (!selectedSpecialization) {
            newErrorMessage += "No selected specialization.";
        }

        if (password !== repeatPassword) {
            newErrorMessage += "The password and repeat password fields don't match.";
        }

        if (newErrorMessage !== '') {
            props.setErrorMessage(newErrorMessage);
            return;
        }

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
            .then(function (response) {
                props.onSuccess();
            })
            .catch(function (error) {
                props.setErrorMessage(error.response.data.message)
            });
    }

    return (
        <Stack>
            <StackItem>
                <Label>
                    Add a new doctor
                </Label>
            </StackItem>
            <StackItem>
                <Label>
                    First Name
                </Label>
            </StackItem>
            <StackItem>
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
            </StackItem>
            <StackItem>
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
            </StackItem>
            <StackItem>
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
            </StackItem>
            <StackItem>
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
            <StackItem>
                <Multiselect
                    singleSelect={true}
                    options={props.specializations}
                    onSelect={(selectedList, selectedItem) => { setSelectedSpecialization(selectedItem) }}
                    displayValue="name"
                />
            </StackItem>
            <StackItem>
                <button onClick={handleOnButtonClicked}>Save</button>
            </StackItem>
        </Stack>
    )
}