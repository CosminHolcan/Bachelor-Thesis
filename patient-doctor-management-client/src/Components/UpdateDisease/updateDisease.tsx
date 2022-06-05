import { Label, Stack, TextField } from "@fluentui/react";
import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react";
import { IUpdateBaseDTO } from "../../DTO/UpdateBaseDTO";
import { WAITING_MILLISECONDS } from "../../globalConstants";
import { IBaseModelWithDescription } from "../../Models/BaseModelNameWithDescription";
import { delay } from "../../Utils/functions";
import { DiseasesService } from "../../Utils/services";
import { ButtonSaveOperationStyle } from "../../Utils/styles";
import { LoadingSpinner } from "../LoadingSpinner/loadingSpinner";
import { LabelNewFieldStyle, UpdateDiseaseContainerStyle } from "./updateDisease.styles";
import { IUpdateDiseaseProps } from "./updateDisease.types";

export const UpdateDisease = (props: IUpdateDiseaseProps): JSX.Element => {
    const [selectedDisease, setSelectedDisease] = useState<IBaseModelWithDescription>();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [processingRequest, setProcessingRequest] = useState<boolean>(false);


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
            newErrorMessage += "You must select an option. "


        else if (name.trim() === "" || description.trim() === "") {
            newErrorMessage += "New name and description can't be empty."
        }

        if (newErrorMessage !== '') {
            props.setErrorMessage(newErrorMessage);
            return;
        }

        setProcessingRequest(true);

        const updateDiseaseDTO: IUpdateBaseDTO = {
            jwt: localStorage.getItem("jwt") ?? '',
            entity: {
                id: selectedDisease?.id ?? '',
                name: name,
                description: description
            }
        };

        DiseasesService.UpdateDisease(updateDiseaseDTO)
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
                <Stack style={UpdateDiseaseContainerStyle}>
                    <Multiselect
                        placeholder="Select an existing disease"
                        singleSelect={true}
                        options={props.diseases}
                        onSelect={(selectedList, selectedItem) => { setSelectedDisease(selectedItem) }}
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