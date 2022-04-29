import { Label, Stack, StackItem, TextField } from "@fluentui/react";
import { useEffect, useState } from "react"
import { IAddBaseDTO } from "../../DTO/AddBaseDTO";
import { IAdministrationFeatureProps } from "../../Pages/Admin/adminPage.types";
import { DiseasesService, MedicinesService, SpecializationService } from "../../Utils/services";

export const AddMedicine = (props: IAdministrationFeatureProps): JSX.Element => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if (props.errorMessage !== '')
            props.setErrorMessage('');
    }, [name, description]);

    const handleOnButtonClicked = async (e: any) => {
        if (name.trim() === "" || description.trim() === "") {
            props.setErrorMessage("Name and description can not be empty.");
            return;
        }

        const addMedicineDTO: IAddBaseDTO = {
            jwt: localStorage.getItem("jwt") ?? '',
            entity: {
                name: name,
                description: description
            }
        };

        MedicinesService.AddMedicine(addMedicineDTO)
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
                    Add a new medicine
                </Label>
            </StackItem>
            <StackItem>
                <Label>
                    Name
                </Label>
            </StackItem>
            <StackItem>
                <TextField
                    rows={1}
                    value={name}
                    onChange={(event: any) => setName(event.target.value)}
                />
            </StackItem>
            <StackItem>
                <Label>
                    Description
                </Label>
            </StackItem>
            <StackItem>
                <TextField
                    multiline={true}
                    rows={5}
                    value={description}
                    onChange={(event: any) => setDescription(event.target.value)}
                />
            </StackItem>
            <StackItem>
                <button onClick={handleOnButtonClicked}>Save</button>
            </StackItem>
        </Stack>
    )
}