import { Label, Stack, StackItem, TextField } from "@fluentui/react";
import { useEffect, useState } from "react"
import { TailSpin } from "react-loader-spinner";
import { IAddBaseDTO } from "../../DTO/AddBaseDTO";
import { WAITING_MILLISECONDS } from "../../globalConstants";
import { IAdministrationFeatureProps } from "../../Pages/Admin/adminPage.types";
import { delay } from "../../Utils/functions";
import { DiseasesService, SpecializationService } from "../../Utils/services";

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
                <Stack horizontalAlign='center' verticalAlign='center' style={{ marginTop: "10vh" }}>
                    <StackItem>
                        <TailSpin width={100} height={100} color="blue" />
                    </StackItem>
                    <StackItem>
                        <Label style={{ fontSize: 20 }}>
                            Loading
                        </Label>
                    </StackItem>
                </Stack>
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