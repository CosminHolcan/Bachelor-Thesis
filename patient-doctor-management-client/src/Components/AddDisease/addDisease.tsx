import { Label, Stack, StackItem, TextField } from "@fluentui/react";
import { useEffect, useState } from "react"
import { TailSpin } from "react-loader-spinner";
import { IAddBaseDTO } from "../../DTO/AddBaseDTO";
import { WAITING_MILLISECONDS } from "../../globalConstants";
import { IAdministrationFeatureProps } from "../../Pages/Admin/adminPage.types";
import { delay } from "../../Utils/functions";
import { DiseasesService, SpecializationService } from "../../Utils/services";
import { LoadingSpinner } from "../LoadingSpinner/loadingSpinner";

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
            props.setErrorMessage("Name and description can not be empty.");
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
                <Stack>
                    <StackItem>
                        <Label>
                            Add a new disease
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
            }
        </>
    )
}