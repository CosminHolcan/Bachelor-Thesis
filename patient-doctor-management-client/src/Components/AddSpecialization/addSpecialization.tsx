import { Label, Stack, StackItem, TextField } from "@fluentui/react";
import { useEffect, useState } from "react"
import { IAdministrationFeatureProps } from "../../Pages/Admin/adminPage.types";
import { SpecializationService } from "../../Utils/services";

export const AddSpecialization = (props: IAdministrationFeatureProps): JSX.Element => {
    const [name, setName] = useState<string>('');

    useEffect(() => {
        if (props.errorMessage !== '')
            props.setErrorMessage('');
    }, [name]);

    const handleOnButtonClicked = async (e: any) => {
        if (name.trim() === "") {
            props.setErrorMessage("Name can not be empty.")
            return;
        }

        SpecializationService.AddSpecialization(name)
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
    )
}