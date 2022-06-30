import { Label, Stack, TextField } from "@fluentui/react";
import Multiselect from "multiselect-react-dropdown";
import { useEffect, useState } from "react";
import { IUpdateSpecializationDTO } from "../../DTO/UpdateSpecializationDTO";
import { WAITING_MILLISECONDS } from "../../globalConstants";
import { IBaseModel } from "../../Models/BaseModel";
import { delay } from "../../Utils/functions";
import { SpecializationService } from "../../Utils/services";
import { ButtonSaveOperationStyle } from "../../Utils/styles";
import { LoadingSpinner } from "../LoadingSpinner/loadingSpinner";
import { LabelNewNameStyle, UpdateSpecializationContainerStyle } from "./updateSpecialization.styles";
import { IUpdateSpecializationProps } from "./updateSpecialization.types";

export const UpdateSpecialization = (props: IUpdateSpecializationProps): JSX.Element => {
    const [selectedSpecialization, setSelectedSpecialization] = useState<IBaseModel>();
    const [name, setName] = useState<string>('');
    const [processingRequest, setProcessingRequest] = useState<boolean>(false);


    useEffect(() => {
        if (props.errorMessage !== '')
            props.setErrorMessage('');
    }, [name]);

    const handleOnButtonClicked = async (e: any) => {
        var newErrorMessage: string = '';

        if (selectedSpecialization == null || selectedSpecialization.id == '')
            newErrorMessage += "You must select an option. "


        if (name.trim() === "") {
            newErrorMessage += "New name can not be empty."
        }

        if (newErrorMessage !== '') {
            props.setErrorMessage(newErrorMessage);
            return;
        }

        setProcessingRequest(true);

        const updateSpecializationDTO: IUpdateSpecializationDTO = {
            jwt: localStorage.getItem("jwt") ?? '',
            specialization: {
                id: selectedSpecialization?.id ?? '',
                name: name
            }
        };

        SpecializationService.UpdateSpecialization(updateSpecializationDTO)
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
                <Stack style={UpdateSpecializationContainerStyle}>
                    <Multiselect
                        placeholder="Select a specialization"
                        singleSelect={true}
                        options={props.specializations}
                        onSelect={(selectedList, selectedItem) => { setSelectedSpecialization(selectedItem) }}
                        displayValue="name"
                    />
                    <Label style={LabelNewNameStyle}>
                        New name
                    </Label>
                    <TextField
                        rows={1}
                        value={name}
                        onChange={(event: any) => setName(event.target.value)}
                    />
                    <button style={ButtonSaveOperationStyle} onClick={handleOnButtonClicked}>Save</button>
                </Stack>
            }
        </>
    )
}