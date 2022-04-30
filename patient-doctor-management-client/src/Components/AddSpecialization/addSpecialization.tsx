import { Label, Stack, StackItem, TextField } from "@fluentui/react";
import { useEffect, useState } from "react"
import { TailSpin } from "react-loader-spinner";
import { IAddSpecializationDTO } from "../../DTO/AddSpecializationDTO";
import { WAITING_MILLISECONDS } from "../../globalConstants";
import { IAdministrationFeatureProps } from "../../Pages/Admin/adminPage.types";
import { delay } from "../../Utils/functions";
import { SpecializationService } from "../../Utils/services";

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
                            Add a new specialization
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
                        <button onClick={handleOnButtonClicked}>Save</button>
                    </StackItem>
                </Stack>
            }
        </>
    )
}