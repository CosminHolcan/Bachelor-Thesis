import { Label, Stack, TextField } from "@fluentui/react";
import { useEffect, useState } from "react";
import { IAddSpecializationDTO } from "../../DTO/AddSpecializationDTO";
import { WAITING_MILLISECONDS } from "../../globalConstants";
import { IAdministrationFeatureProps } from "../../Pages/Admin/adminPage.types";
import { delay } from "../../Utils/functions";
import { SpecializationService } from "../../Utils/services";
import { ButtonSaveAdminOperationStyle } from "../../Utils/styles";
import { LoadingSpinner } from "../LoadingSpinner/loadingSpinner";
import { AddSpecializationContainerStyle } from "./addSpecialization.styles";

export const AddSpecialization = (props: IAdministrationFeatureProps): JSX.Element => {
    const [name, setName] = useState<string>('');
    const [processingRequest, setProcessingRequest] = useState<boolean>(false);

    useEffect(() => {
        if (props.errorMessage !== '')
            props.setErrorMessage('');
    }, [name]);

    const handleOnButtonClicked = async (e: any) => {
        if (name.trim() === "") {
            props.setErrorMessage("Name can not be empty.")
            return;
        }

        setProcessingRequest(true);

        const addSpecializationDTO: IAddSpecializationDTO = {
            jwt: localStorage.getItem("jwt") ?? '',
            specializationName: name
        };

        SpecializationService.AddSpecialization(addSpecializationDTO)
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
                <Stack style={AddSpecializationContainerStyle}>
                    <Label>
                        Name
                    </Label>
                    <TextField
                        rows={1}
                        value={name}
                        onChange={(event: any) => setName(event.target.value)}
                    />
                    <button style={ButtonSaveAdminOperationStyle} onClick={handleOnButtonClicked}>Save</button>
                </Stack>
            }
        </>
    )
}