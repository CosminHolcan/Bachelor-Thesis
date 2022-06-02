import { Label, Stack, TextField } from "@fluentui/react";
import { useEffect, useState } from "react";
import { IAddBaseDTO } from "../../DTO/AddBaseDTO";
import { WAITING_MILLISECONDS } from "../../globalConstants";
import { IAdministrationFeatureProps } from "../../Pages/Admin/adminPage.types";
import { delay } from "../../Utils/functions";
import { DiseasesService } from "../../Utils/services";
import { ButtonSaveAdminOperationStyle } from "../../Utils/styles";
import { LoadingSpinner } from "../LoadingSpinner/loadingSpinner";
import { AddDiseaseContainerStyle, LabelDescriptionStyle } from "./addDisease.styles";

export const AddDisease = (props: IAdministrationFeatureProps): JSX.Element => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [processingRequest, setProcessingRequest] = useState<boolean>(false);

    useEffect(() => {
        if (props.errorMessage !== '')
            props.setErrorMessage('');
    }, [name, description]);

    const handleOnButtonClicked = async (e: any) => {
        if (name.trim() === "" || description.trim() === "") {
            props.setErrorMessage("Name and description can't be empty.");
            return;
        }

        setProcessingRequest(true);

        const addDiseaseDTO: IAddBaseDTO = {
            jwt: localStorage.getItem("jwt") ?? '',
            entity: {
                name: name,
                description: description
            }
        };

        DiseasesService.AddDisease(addDiseaseDTO)
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
                <Stack style={AddDiseaseContainerStyle}>
                    <Label>
                        Name
                    </Label>
                    <TextField
                        rows={1}
                        value={name}
                        onChange={(event: any) => setName(event.target.value)}
                    />
                    <Label style ={LabelDescriptionStyle}>
                        Description
                    </Label>
                    <TextField
                        multiline={true}
                        rows={5}
                        value={description}
                        onChange={(event: any) => setDescription(event.target.value)}
                    />
                    <button style={ButtonSaveAdminOperationStyle} onClick={handleOnButtonClicked}>Save</button>
                </Stack>
            }
        </>
    )
}