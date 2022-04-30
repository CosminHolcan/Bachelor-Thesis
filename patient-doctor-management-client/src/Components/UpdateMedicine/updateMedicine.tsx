import { Label, Stack, StackItem, TextField } from "@fluentui/react";
import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react"
import { TailSpin } from "react-loader-spinner";
import { text } from "stream/consumers";
import { IAddSpecializationDTO } from "../../DTO/AddSpecializationDTO";
import { IUpdateBaseDTO } from "../../DTO/UpdateBaseDTO";
import { IUpdateSpecializationDTO } from "../../DTO/UpdateSpecializationDTO";
import { WAITING_MILLISECONDS } from "../../globalConstants";
import { IBaseModel } from "../../Models/BaseModel";
import { IBaseModelNameAndDescription } from "../../Models/BaseModelNameAndDescription";
import { IAdministrationFeatureProps } from "../../Pages/Admin/adminPage.types";
import { delay } from "../../Utils/functions";
import { DiseasesService, MedicinesService, SpecializationService } from "../../Utils/services";
import { LoadingSpinner } from "../LoadingSpinner/loadingSpinner";
import { IUpdateMedicineProps } from "./updateMedicine.types";

export const UpdateMedicine = (props: IUpdateMedicineProps): JSX.Element => {
    const [selectedMedicine, setSelectedMedicine] = useState<IBaseModelNameAndDescription>();
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


        if (name.trim() === "" || description.trim() === "") {
            newErrorMessage += "New name and description can not be empty."
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
                <Stack>
                    <StackItem>
                        <Label>
                            Update a disease
                        </Label>
                    </StackItem>
                    <StackItem>
                        <Multiselect
                            singleSelect={true}
                            options={props.medicines}
                            onSelect={(selectedList, selectedItem) => { setSelectedMedicine(selectedItem) }}
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
            }
        </>
    )
}