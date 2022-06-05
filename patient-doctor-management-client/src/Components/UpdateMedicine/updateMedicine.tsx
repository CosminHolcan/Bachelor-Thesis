import { Label, Stack, TextField } from "@fluentui/react";
import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react";
import { IUpdateBaseDTO } from "../../DTO/UpdateBaseDTO";
import { WAITING_MILLISECONDS } from "../../globalConstants";
import { IBaseModelWithDescription } from "../../Models/BaseModelNameWithDescription";
import { delay } from "../../Utils/functions";
import { MedicinesService } from "../../Utils/services";
import { ButtonSaveOperationStyle } from "../../Utils/styles";
import { LoadingSpinner } from "../LoadingSpinner/loadingSpinner";
import { LabelNewFieldStyle, UpdateMedicineContainerStyle } from "./updateMedicine.styles";
import { IUpdateMedicineProps } from "./updateMedicine.types";

export const UpdateMedicine = (props: IUpdateMedicineProps): JSX.Element => {
    const [selectedMedicine, setSelectedMedicine] = useState<IBaseModelWithDescription>();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [processingRequest, setProcessingRequest] = useState<boolean>(false);


    useEffect(() => {
        if (props.errorMessage !== '')
            props.setErrorMessage('');
    }, [name, description]);

    useEffect(() => {
        setName(selectedMedicine?.name ?? '');
        setDescription(selectedMedicine?.description ?? '');
    }, [selectedMedicine]);

    const handleOnButtonClicked = async (e: any) => {
        var newErrorMessage: string = '';

        if (selectedMedicine == null || selectedMedicine.id == '')
            newErrorMessage += "You must select an option. "


        else if (name.trim() === "" || description.trim() === "") {
            newErrorMessage += "New name and description can't be empty."
        }

        if (newErrorMessage !== '') {
            props.setErrorMessage(newErrorMessage);
            return;
        }

        setProcessingRequest(true);

        const updateMedicineDTO: IUpdateBaseDTO = {
            jwt: localStorage.getItem("jwt") ?? '',
            entity: {
                id: selectedMedicine?.id ?? '',
                name: name,
                description: description
            }
        };

        MedicinesService.UpdateMedicine(updateMedicineDTO)
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
                <Stack style={UpdateMedicineContainerStyle}>
                    <Multiselect
                        placeholder="Select an existing medicine"
                        singleSelect={true}
                        options={props.medicines}
                        onSelect={(selectedList, selectedItem) => { setSelectedMedicine(selectedItem) }}
                        displayValue="name"
                    />
                    <Label style={LabelNewFieldStyle}>
                        New name
                    </Label>
                    <TextField
                        rows={1}
                        value={name}
                        onChange={(event: any) => setName(event.target.value)}
                    />
                    <Label style={LabelNewFieldStyle}>
                        New description
                    </Label>
                    <TextField
                        multiline={true}
                        rows={5}
                        value={description}
                        onChange={(event: any) => setDescription(event.target.value)}
                    />
                    <button style={ButtonSaveOperationStyle} onClick={handleOnButtonClicked}>Save</button>
                </Stack>
            }
        </>
    )
}