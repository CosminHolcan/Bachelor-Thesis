import { Label, Stack, StackItem } from "@fluentui/react"
import { useState } from "react"
import { AddDisease } from "../../Components/AddDisease/addDisease";
import { AddMedicine } from "../../Components/AddMedicine/addMedicine";
import { AddSpecialization } from "../../Components/AddSpecialization/addSpecialization";
import { UpdateDisease } from "../../Components/UpdateDisease/updateDisease";
import { UpdateMedicine } from "../../Components/UpdateMedicine/updateMedicine";
import { UpdateSpecialization } from "../../Components/UpdateSpecialization/updateSpecialization";
import { AdminFeatures } from "../../Enums/adminFeatures";
import { IBaseModel } from "../../Models/BaseModel";
import { IBaseModelNameAndDescription } from "../../Models/BaseModelNameAndDescription";
import { DiseasesService, MedicinesService, SpecializationService } from "../../Utils/services";
import { styleStack } from "./adminPage.styles"

export const AdminPage = (): JSX.Element => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [specializations, setSpecializations] = useState<IBaseModel[]>([]);
    const [diseases, setDiseases] = useState<IBaseModelNameAndDescription[]>([]);
    const [medicines, setMedicines] = useState<IBaseModelNameAndDescription[]>([]);


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
        SpecializationService.GetAllSpecializations()
            .then(function (response) {
                setSpecializations(response.data);
                handleOptionChanged(AdminFeatures.UpdateSpecialization);
            })
            .catch(function (error) {
                setErrorMessage('Server error');
            })
    }

    const handleUpdateDiseaseSelected = (): void => {
        DiseasesService.GetAllDiseases()
            .then(function (response) {
                setDiseases(response.data);
                handleOptionChanged(AdminFeatures.UpdateDisease);
            })
            .catch(function (error) {
                setErrorMessage('Server error');
            })
    }

    const handleUpdateMedicineSelected = (): void => {
        MedicinesService.GetAllMedicines()
            .then(function (response) {
                setDiseases(response.data);
                handleOptionChanged(AdminFeatures.UpdateMedicine);
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
            case AdminFeatures.AddDisease:
                return (<AddDisease onSuccess={onSuccess} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />);
            case AdminFeatures.UpdateDisease:
                return (<UpdateDisease onSuccess={onSuccess} errorMessage={errorMessage} setErrorMessage={setErrorMessage} diseases={diseases} />);
            case AdminFeatures.AddMedicine:
                return (<AddMedicine onSuccess={onSuccess} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />);
            case AdminFeatures.UpdateMedicine:
                return (<UpdateMedicine onSuccess={onSuccess} errorMessage={errorMessage} setErrorMessage={setErrorMessage} medicines={diseases} />);
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