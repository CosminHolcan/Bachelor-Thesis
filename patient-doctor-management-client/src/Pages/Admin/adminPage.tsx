import { Label, Stack, StackItem } from "@fluentui/react"
import { useState } from "react"
import { TailSpin } from "react-loader-spinner";
import { AddDisease } from "../../Components/AddDisease/addDisease";
import { AddDoctor } from "../../Components/AddDoctor/addDoctor";
import { AddMedicine } from "../../Components/AddMedicine/addMedicine";
import { AddSpecialization } from "../../Components/AddSpecialization/addSpecialization";
import { LoadingSpinner } from "../../Components/LoadingSpinner/loadingSpinner";
import { UpdateDisease } from "../../Components/UpdateDisease/updateDisease";
import { UpdateMedicine } from "../../Components/UpdateMedicine/updateMedicine";
import { UpdateSpecialization } from "../../Components/UpdateSpecialization/updateSpecialization";
import { AdminFeatures } from "../../Enums/adminFeatures";
import { WAITING_MILLISECONDS } from "../../globalConstants";
import { IBaseModel } from "../../Models/BaseModel";
import { IBaseModelWithDescription } from "../../Models/BaseModelNameWithDescription";
import { delay } from "../../Utils/functions";
import { DiseasesService, MedicinesService, SpecializationService } from "../../Utils/services";
import { ErrorLabelStyle, LabelCategoryStyle, LabelOptionStyle, styleStack } from "./adminPage.styles"

const SELECTED_OPTION_COLOR: string = "#0EBFE9";
const NONSELECTED_OPTION_COLOR: string = "gray";

export const AdminPage = (): JSX.Element => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [specializations, setSpecializations] = useState<IBaseModel[]>([]);
    const [diseases, setDiseases] = useState<IBaseModelWithDescription[]>([]);
    const [medicines, setMedicines] = useState<IBaseModelWithDescription[]>([]);
    const [loadingData, setLoadingData] = useState<boolean>(false);

    const onSuccess = (): void => {
        setSelectedOption('');
    }

    const onStartingRequest = (): void => {
        setLoadingData(true);
    }

    const handleOptionChanged = (value: string): void => {
        setErrorMessage('');

        if (selectedOption === value) {
            setSelectedOption('');
            return;
        }

        setSelectedOption(value);
    }

    const handleUpdateSpecializationSelected = (): void => {
        setErrorMessage('');

        if (selectedOption === AdminFeatures.UpdateSpecialization) {
            setSelectedOption('');
            return;
        }

        setLoadingData(true);
        SpecializationService.GetAllSpecializations()
            .then(async function (response) {
                await delay(WAITING_MILLISECONDS);
                setLoadingData(false);
                setSpecializations(response.data);
                handleOptionChanged(AdminFeatures.UpdateSpecialization);
            })
            .catch(async function (error) {
                await delay(WAITING_MILLISECONDS);
                setLoadingData(false);
                setErrorMessage('Server error');
            })
    }

    const handleUpdateDiseaseSelected = (): void => {
        setErrorMessage('');

        if (selectedOption === AdminFeatures.UpdateDisease) {
            setSelectedOption('');
            return;
        }

        setLoadingData(true);
        DiseasesService.GetAllDiseases({ jwt: localStorage.getItem("jwt") ?? '' })
            .then(async function (response) {
                await delay(WAITING_MILLISECONDS);
                setLoadingData(false);
                setDiseases(response.data.diseases);
                handleOptionChanged(AdminFeatures.UpdateDisease);
            })
            .catch(async function (error) {
                await delay(WAITING_MILLISECONDS);
                setLoadingData(false);
                setErrorMessage('Server error');
            })
    }

    const handleUpdateMedicineSelected = (): void => {
        setErrorMessage('');

        if (selectedOption === AdminFeatures.UpdateMedicine) {
            setSelectedOption('');
            return;
        }

        setLoadingData(true);
        MedicinesService.GetAllMedicines({ jwt: localStorage.getItem("jwt") ?? '' })
            .then(async function (response) {
                await delay(WAITING_MILLISECONDS);
                setLoadingData(false);
                setMedicines(response.data.medicines);
                handleOptionChanged(AdminFeatures.UpdateMedicine);
            })
            .catch(async function (error) {
                await delay(WAITING_MILLISECONDS);
                setLoadingData(false);
                setErrorMessage('Server error');
            })
    }

    const handleAddDoctorSelected = (): void => {
        setErrorMessage('');

        if (selectedOption === AdminFeatures.AddDoctor) {
            setSelectedOption('');
            return;
        }

        setLoadingData(true);
        SpecializationService.GetAllSpecializations()
            .then(async function (response) {
                await delay(WAITING_MILLISECONDS);
                setLoadingData(false);
                setSpecializations(response.data);
                handleOptionChanged(AdminFeatures.AddDoctor);
            })
            .catch(async function (error) {
                await delay(WAITING_MILLISECONDS);
                setLoadingData(false);
                setErrorMessage('Server error');
            })
    }

    const getSelectedOption = (): JSX.Element => {
        switch (selectedOption) {
            case AdminFeatures.AddSpecialization:
                return (
                    <AddSpecialization
                        onSuccess={onSuccess}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                    />
                );
            case AdminFeatures.UpdateSpecialization:
                return (
                    <UpdateSpecialization
                        onSuccess={onSuccess}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        specializations={specializations}
                    />
                );
            case AdminFeatures.AddDisease:
                return (
                    <AddDisease
                        onSuccess={onSuccess}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                    />
                );
            case AdminFeatures.UpdateDisease:
                return (
                    <UpdateDisease
                        onSuccess={onSuccess}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        diseases={diseases}
                    />
                );
            case AdminFeatures.AddMedicine:
                return (
                    <AddMedicine
                        onSuccess={onSuccess}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                    />
                );
            case AdminFeatures.UpdateMedicine:
                return (
                    <UpdateMedicine
                        onSuccess={onSuccess}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        medicines={medicines}
                    />
                );
            case AdminFeatures.AddDoctor:
                return (
                    <AddDoctor
                        onSuccess={onSuccess}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        specializations={specializations}
                    />
                );
        }
        return (<div />)
    }

    return (
        <Stack style={{ marginTop: "5vh" }} >
            <Stack horizontal style={{ marginTop: "5vh" }} horizontalAlign="center" tokens={styleStack}>
                <Stack>
                    <Label style={LabelCategoryStyle}>
                        Accounts
                    </Label>
                    <StackItem>
                        <Label
                            style={LabelOptionStyle(selectedOption == AdminFeatures.AddDoctor || selectedOption == "" ? SELECTED_OPTION_COLOR : NONSELECTED_OPTION_COLOR)}
                            onClick={() => { handleAddDoctorSelected(); }}>
                            Add a doctor account
                        </Label>
                    </StackItem>
                </Stack>
                <Stack>
                    <Label style={LabelCategoryStyle}>
                        Medicines
                    </Label>
                    <StackItem>
                        <Label
                            style={LabelOptionStyle(selectedOption == AdminFeatures.AddMedicine || selectedOption == "" ? SELECTED_OPTION_COLOR : NONSELECTED_OPTION_COLOR)}
                            onClick={() => { handleOptionChanged(AdminFeatures.AddMedicine); }}>
                            Add a new medicine
                        </Label>
                    </StackItem>
                    <StackItem>
                        <Label
                            style={LabelOptionStyle(selectedOption == AdminFeatures.UpdateMedicine || selectedOption == "" ? SELECTED_OPTION_COLOR : NONSELECTED_OPTION_COLOR)}
                            onClick={() => { handleUpdateMedicineSelected(); }}>
                            Update an existing medicine
                        </Label>
                    </StackItem>
                </Stack>
                <Stack>
                    <Label style={LabelCategoryStyle}>
                        Diseases
                    </Label>
                    <StackItem>
                        <Label
                            style={LabelOptionStyle(selectedOption == AdminFeatures.AddDisease || selectedOption == "" ? SELECTED_OPTION_COLOR : NONSELECTED_OPTION_COLOR)}
                            onClick={() => { handleOptionChanged(AdminFeatures.AddDisease); }}>
                            Add a new disease
                        </Label>
                    </StackItem>
                    <StackItem>
                        <Label
                            style={LabelOptionStyle(selectedOption == AdminFeatures.UpdateDisease || selectedOption == "" ? SELECTED_OPTION_COLOR : NONSELECTED_OPTION_COLOR)}
                            onClick={() => { handleUpdateDiseaseSelected(); }}>
                            Update an existing disease
                        </Label>
                    </StackItem>
                </Stack>
                <Stack>
                    <Label style={LabelCategoryStyle}>
                        Specializations
                    </Label>
                    <StackItem>
                        <Label
                            style={LabelOptionStyle(selectedOption == AdminFeatures.AddSpecialization || selectedOption == "" ? SELECTED_OPTION_COLOR : NONSELECTED_OPTION_COLOR)}
                            onClick={() => { handleOptionChanged(AdminFeatures.AddSpecialization); }}>
                            Add a new specialization
                        </Label>
                    </StackItem>
                    <StackItem>
                        <Label
                            style={LabelOptionStyle(selectedOption == AdminFeatures.UpdateSpecialization || selectedOption == "" ? SELECTED_OPTION_COLOR : NONSELECTED_OPTION_COLOR)}
                            onClick={() => { handleUpdateSpecializationSelected(); }}>
                            Update an existing specialization
                        </Label>
                    </StackItem>
                </Stack>
            </Stack>
            {loadingData
                ?
                <LoadingSpinner
                    height={100}
                    width={100}
                    labelStyle={{ fontSize: 20 }}
                    wrapStackStyle={{ marginTop: "10vh" }}
                />
                :
                selectedOption !== '' && getSelectedOption()}
            {errorMessage !== '' &&
                <Label style={ErrorLabelStyle}>
                    {errorMessage}
                </Label>}
        </Stack>
    )
}