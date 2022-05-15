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
import { styleStack } from "./adminPage.styles"

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
        if (selectedOption === value) {
            setSelectedOption('');
            setErrorMessage('');
            return;
        }

        setSelectedOption(value);
        setErrorMessage('');
    }

    const handleUpdateSpecializationSelected = (): void => {
        if (selectedOption === AdminFeatures.UpdateSpecialization) {
            setSelectedOption('');
            setErrorMessage('');
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
        if (selectedOption === AdminFeatures.UpdateDisease) {
            setSelectedOption('');
            setErrorMessage('');
            return;
        }

        setLoadingData(true);
        DiseasesService.GetAllDiseases({jwt: localStorage.getItem("jwt") ?? ''})
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
        if (selectedOption === AdminFeatures.UpdateMedicine) {
            setSelectedOption('');
            setErrorMessage('');
            return;
        }

        setLoadingData(true);
        MedicinesService.GetAllMedicines({jwt: localStorage.getItem("jwt") ?? ''})
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
        if (selectedOption === AdminFeatures.AddDoctor) {
            setSelectedOption('');
            setErrorMessage('');
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
                        <Label onClick={() => { handleAddDoctorSelected(); }}>
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
                        <Label onClick={() => { handleOptionChanged(AdminFeatures.AddMedicine); }}>
                            Add a new medicine
                        </Label>
                    </StackItem>
                    <StackItem>
                        <Label onClick={() => { handleUpdateMedicineSelected(); }}>
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
                        <Label onClick={() => { handleOptionChanged(AdminFeatures.AddDisease); }}>
                            Add a new disease
                        </Label>
                    </StackItem>
                    <StackItem>
                        <Label onClick={() => { handleUpdateDiseaseSelected(); }}>
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
                <StackItem>
                    <Label style={{ color: "red", marginTop: "5vh" }}>
                        Error: {errorMessage}
                    </Label>
                </StackItem>}
        </Stack>
    )
}