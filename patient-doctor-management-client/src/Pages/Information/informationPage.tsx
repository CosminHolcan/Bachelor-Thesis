import { Stack, StackItem, TextField } from "@fluentui/react";
import Multiselect from "multiselect-react-dropdown";
import { useState } from "react";
import { IBaseModelWithDescription } from "../../Models/BaseModelNameWithDescription";
import { IInformationPageProps } from "./informationPage.types";

export const InformationPage = (props: IInformationPageProps): JSX.Element => {
    const [selectedDisease, setSelectedDisease] = useState<IBaseModelWithDescription>();
    const [selectedMedicine, setSelectedMedicine] = useState<IBaseModelWithDescription>();

    return (
        <Stack horizontal>
            <StackItem>
                <Multiselect
                    singleSelect={true}
                    options={props.diseases}
                    onSelect={(selectedList, selectedItem) => { setSelectedDisease(selectedItem) }}
                    displayValue="name"
                />
                <TextField
                    multiline={true}
                    rows={5}
                    disabled={true}
                    value={selectedDisease && selectedDisease.description}
                />
            </StackItem>
            <StackItem>
                <Multiselect
                    singleSelect={true}
                    options={props.medicines}
                    onSelect={(selectedList, selectedItem) => { setSelectedMedicine(selectedItem) }}
                    displayValue="name"
                />
                <TextField
                    multiline={true}
                    rows={5}
                    disabled={true}
                    value={selectedMedicine && selectedMedicine.description}
                />
            </StackItem>
        </Stack>
    )
}