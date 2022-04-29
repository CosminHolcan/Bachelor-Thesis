import { Label, Stack, StackItem, TextField } from "@fluentui/react";
import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react"
import { text } from "stream/consumers";
import { IAddSpecializationDTO } from "../../DTO/AddSpecializationDTO";
import { IUpdateSpecializationDTO } from "../../DTO/IUpdateSpecializationDTO";
import { IBaseModel } from "../../Models/BaseModel";
import { IAdministrationFeatureProps } from "../../Pages/Admin/adminPage.types";
import { SpecializationService } from "../../Utils/services";
import { IUpdateSpecializationProps } from "./updateSpecialization.types";

export const UpdateSpecialization = (props: IUpdateSpecializationProps): JSX.Element => {
    const [selectedSpecialization, setSelectedSpecialization] = useState<IBaseModel>();
    const [name, setName] = useState<string>('');

    useEffect(() => {
        if (props.errorMessage !== '')
            props.setErrorMessage('');
    }, [name]);

    const handleOnButtonClicked = async (e: any) => {
        var newErrorMessage: string = '';

        if (selectedSpecialization == null || selectedSpecialization.id == '')
            newErrorMessage += "You must select an option."


        if (name.trim() === "") {
            newErrorMessage += "New name can not be empty."
        }

        if (newErrorMessage !== '') {
            props.setErrorMessage(newErrorMessage);
            return;
        }

        const updateSpecializationDTO: IUpdateSpecializationDTO = {
            jwt: localStorage.getItem("jwt") ?? '',
            specialization: {
                id: selectedSpecialization?.id ?? '',
                name: name
            }
        };

        SpecializationService.UpdateSpecialization(updateSpecializationDTO)
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
                    Update a specialization
                </Label>
            </StackItem>
            <StackItem>
                <Multiselect
                    singleSelect={true}
                    options={props.specializations}
                    onSelect={(selectedList, selectedItem) => {setSelectedSpecialization(selectedItem)}}
                    displayValue="name" 
                    />
            </StackItem>
            <StackItem style={{marginTop: "5vh"}}>
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
            <StackItem>
                <button onClick={handleOnButtonClicked}>Save</button>
            </StackItem>
        </Stack>

    )
}