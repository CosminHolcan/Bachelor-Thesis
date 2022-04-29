import { Label, Stack, StackItem } from "@fluentui/react"
import { useState } from "react"
import { AddSpecialization } from "../../Components/AddSpecialization/addSpecialization";
import { styleStack } from "./adminPage.styles"

export const AdminPage = (): JSX.Element => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

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

    const getSelectedOption = (): JSX.Element => {
        switch (selectedOption) {
            case "AddSpecialization":
                return (<AddSpecialization onSuccess={onSuccess} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />);
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
                        <Label onClick={() => { handleOptionChanged("AddSpecialization"); }}>
                            Add a new specialization
                        </Label>
                    </StackItem>
                    <StackItem>
                        <Label>
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