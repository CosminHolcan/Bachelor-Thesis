import { Label, Stack, StackItem } from "@fluentui/react"
import { useState } from "react"
import { AddSpecialization } from "../../Components/AddSpecialization/addSpecialization";
import { UpdateSpecialization } from "../../Components/UpdateSpecialization/updateSpecialization";
import { AdminFeatures } from "../../Enums/adminFeatures";
import { IBaseModel } from "../../Models/BaseModel";
import { SpecializationService } from "../../Utils/services";
import { styleStack } from "./adminPage.styles"

export const AdminPage = (): JSX.Element => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [specializations, setSpecializations] = useState<IBaseModel[]>([]);

    const onSuccess = (): void => {
        setSelectedOption('');
    }

    const handleOptionChanged = (value: string): void => {
        if (selectedOption === value) {
            setSelectedOption('');
            setErrorMessage('');
            return;
        }

        setSelectedOption(value);
        setErrorMessage('');
    }

    const handleUpdateSpecializationSelected = (): void => {
        SpecializationService.GetSpecializationsNames()
            .then(function (response) {
                setSpecializations(response.data);
                handleOptionChanged(AdminFeatures.UpdateSpecialization);
            })
            .catch(function (error) {
                setErrorMessage('Server error');
            })
    }

    const getSelectedOption = (): JSX.Element => {
        switch (selectedOption) {
            case AdminFeatures.AddSpecialization:
                return (<AddSpecialization onSuccess={onSuccess} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />);
            case AdminFeatures.UpdateSpecialization:
                return (<UpdateSpecialization onSuccess={onSuccess} errorMessage={errorMessage} setErrorMessage={setErrorMessage} specializations={specializations} />);
        }
        return (<div></div>)
    }

    return (
        <Stack style={{ marginTop: "5vh" }} >
            <Stack horizontal style={{ marginTop: "5vh" }} horizontalAlign="center" tokens={styleStack}>
                <Stack>
                    <StackItem style={{ marginBottom: "2vh" }}>
                        <Label>
                            Accounts
                        </Label>
                    </StackItem>
                    <StackItem>
                        <Label>
                            Add a doctor account
                        </Label>
                    </StackItem>
                </Stack>
                <Stack>
                    <StackItem style={{ marginBottom: "2vh" }}>
                        <Label>
                            Medicines
                        </Label>
                    </StackItem>
                    <StackItem>
                        <Label>
                            Add a new medicine
                        </Label>
                    </StackItem>
                    <StackItem>
                        <Label>
                            Update an existing medicine
                        </Label>
                    </StackItem>
                </Stack>
                <Stack>
                    <StackItem style={{ marginBottom: "2vh" }}>
                        <Label>
                            Diseases
                        </Label>
                    </StackItem>
                    <StackItem>
                        <Label>
                            Add a new disease
                        </Label>
                    </StackItem>
                    <StackItem>
                        <Label>
                            Update an existing disease
                        </Label>
                    </StackItem>
                </Stack>
                <Stack>
                    <StackItem style={{ marginBottom: "2vh" }}>
                        <Label>
                            Specializations
                        </Label>
                    </StackItem>
                    <StackItem>
                        <Label onClick={() => { handleOptionChanged(AdminFeatures.AddSpecialization); }}>
                            Add a new specialization
                        </Label>
                    </StackItem>
                    <StackItem>
                        <Label onClick={() => { handleUpdateSpecializationSelected(); }}>
                            Update an existing specialization
                        </Label>
                    </StackItem>
                </Stack>
            </Stack>
            {selectedOption !== '' && getSelectedOption()}
            {errorMessage !== '' &&
                <StackItem>
                    <Label>
                        {errorMessage}
                    </Label>
                </StackItem>}
        </Stack>
    )
}