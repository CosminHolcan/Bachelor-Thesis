import { Label, Stack, StackItem, TextField } from "@fluentui/react";
import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react"
import { text } from "stream/consumers";
import { IAddSpecializationDTO } from "../../DTO/AddSpecializationDTO";
import { IUpdateBaseDTO } from "../../DTO/UpdateBaseDTO";
import { IUpdateSpecializationDTO } from "../../DTO/UpdateSpecializationDTO";
import { IBaseModel } from "../../Models/BaseModel";
import { IBaseModelNameAndDescription } from "../../Models/BaseModelNameAndDescription";
import { IAdministrationFeatureProps } from "../../Pages/Admin/adminPage.types";
import { DiseasesService, SpecializationService } from "../../Utils/services";
import { IUpdateDiseaseProps } from "./updateDisease.types";

export const UpdateDisease = (props: IUpdateDiseaseProps): JSX.Element => {
    const [selectedDisease, setSelectedDisease] = useState<IBaseModelNameAndDescription>();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if (props.errorMessage !== '')
            props.setErrorMessage('');
    }, [name, description]);

    useEffect(() => {
        setName(selectedDisease?.name ?? '');
        setDescription(selectedDisease?.description ?? '');
    }, [selectedDisease]);

    const handleOnButtonClicked = async (e: any) => {
        var newErrorMessage: string = '';

        if (selectedDisease == null || selectedDisease.id == '')
            newErrorMessage += "You must select an option."


        if (name.trim() === "" || description.trim() === "") {
            newErrorMessage += "New name and description can not be empty."
        }

        if (newErrorMessage !== '') {
            props.setErrorMessage(newErrorMessage);
            return;
        }

        const updateDiseaseDTO: IUpdateBaseDTO = {
            jwt: localStorage.getItem("jwt") ?? '',
            entity: {
                id: selectedDisease?.id ?? '',
                name: name,
                description: description
            }
        };

        DiseasesService.UpdateDisease(updateDiseaseDTO)
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
                    Update a disease
                </Label>
            </StackItem>
            <StackItem>
                <Multiselect
                    singleSelect={true}
                    options={props.diseases}
                    onSelect={(selectedList, selectedItem) => { setSelectedDisease(selectedItem) }}
                    displayValue="name"
                />
            </StackItem>
            <StackItem style={{ marginTop: "5vh" }}>
                <Label>
                    New name
                </Label>
            </StackItem>
            <StackItem>
                <TextField
                    rows={1}
                    value={name}
                    onChange={(event: any) => setName(event.target.value)}
                />
            </StackItem>
            <StackItem >
                <Label>
                    New description
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