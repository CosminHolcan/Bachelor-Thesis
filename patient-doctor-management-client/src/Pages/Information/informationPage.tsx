import { Stack, StackItem, TextField } from "@fluentui/react";
import Multiselect from "multiselect-react-dropdown";
import { useState } from "react";
import { IBaseModelWithDescription } from "../../Models/BaseModelNameWithDescription";
import { DiseasesContainerStyle, InformationPageContainerStyle, MedicinesContainerStyle, TextFieldStyle } from "./informationPage.styles";
import { IInformationPageProps } from "./informationPage.types";

export const InformationPage = (props: IInformationPageProps): JSX.Element => {
    const [selectedDisease, setSelectedDisease] = useState<IBaseModelWithDescription>();
    const [selectedMedicine, setSelectedMedicine] = useState<IBaseModelWithDescription>();

    return (
        <Stack horizontal horizontalAlign="center" style={InformationPageContainerStyle}>
            <StackItem style={DiseasesContainerStyle}>
                <StackItem>
                    <Multiselect
                        placeholder="Select a disease"
                        singleSelect={true}
                        options={props.diseases}
                        onSelect={(selectedList, selectedItem) => { setSelectedDisease(selectedItem) }}
                        displayValue="name"
                    />
                </StackItem>
                <StackItem style={TextFieldStyle}>
                    <TextField
                        multiline={true}
                        rows={15}
                        readOnly={true}
                        value={selectedDisease && selectedDisease.description}
                    />
                </StackItem>
            </StackItem>
            <StackItem style={MedicinesContainerStyle}>
                <StackItem>
                    <Multiselect
                        placeholder="Select a medicine"
                        singleSelect={true}
                        options={props.medicines}
                        onSelect={(selectedList, selectedItem) => { setSelectedMedicine(selectedItem) }}
                        displayValue="name"
                    />
                </StackItem>
                <StackItem style={TextFieldStyle}>
                    <TextField
                        multiline={true}
                        rows={15}
                        readOnly={true}
                        value={selectedMedicine && selectedMedicine.description}
                    />
                </StackItem>
            </StackItem>
        </Stack>
    )
}