import { DetailsList, DetailsListLayoutMode, IColumn, Label, Stack, StackItem, TextField } from "@fluentui/react"
import { cloneDeep } from "lodash"
import Pagination from "material-ui-pagination"
import Multiselect from "multiselect-react-dropdown"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { IAddTreatmentDTO } from "../../DTO/AddTreatmentDTO"
import { IBaseModelWithDescription } from "../../Models/BaseModelNameWithDescription"
import { IPersonDescription } from "../../Models/PersonDescription"
import { ITreatment } from "../../Models/Treatment"
import { convertDateStringFromServerToLocal } from "../../Utils/functions"
import { TreatmentsService } from "../../Utils/services"
import { IRecipesPageProps } from "./recipesPage.types"

export const RecipesPages = (props: IRecipesPageProps): JSX.Element => {
    const [treatments, setTreatments] = useState<ITreatment[]>(props.treatments);
    const [selectedPatient, setSelectedPatient] = useState<IPersonDescription>();
    const [selectedDisease, setSelectedDisease] = useState<IBaseModelWithDescription>();
    const [selectedMedicines, setSelectedMedicines] = useState<IBaseModelWithDescription[]>([]);
    const [observations, setObservations] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setError('');
    }, [selectedPatient, selectedDisease, selectedMedicines, observations])

    const addMedicine = (medicine: IBaseModelWithDescription): void => {
        const newMedicines: IBaseModelWithDescription[] = cloneDeep(selectedMedicines);
        newMedicines.push(medicine);
        setSelectedMedicines(newMedicines);
    }

    const removeMedicine = (medicine: IBaseModelWithDescription): void => {
        const index: number = selectedMedicines.findIndex((item) => item.id == medicine.id);
        if (index === -1)
            return;

        const newMedicines: IBaseModelWithDescription[] = cloneDeep(selectedMedicines);
        newMedicines.splice(index, 1);
        setSelectedMedicines(newMedicines);
    }

    const onSaveClicked = (e: any): void => {
        if (selectedPatient === undefined || selectedDisease === undefined || selectedMedicines === [] || selectedMedicines === undefined)
            return;

        const currentDay: Date = new Date();
        currentDay.setHours(0, 0, 0, 0);

        const dto: IAddTreatmentDTO = {
            jwt: localStorage.getItem("jwt") ?? '',
            treatment: {
                patientId: selectedPatient.id,
                diseaseId: selectedDisease.id,
                medicinesId: selectedMedicines.map((medicine) => medicine.id),
                observations: observations,
                startingDate: new Date()
            }
        }

        TreatmentsService.AddTreatment(dto)
            .then((function (response) {
                const newTreatments: ITreatment[] = cloneDeep(treatments);
                newTreatments.push({
                    patient: response.data.treatment.patient,
                    doctor: response.data.treatment.doctor,
                    disease: response.data.treatment.disease,
                    medicines: response.data.treatment.medicines,
                    startingDate: new Date(convertDateStringFromServerToLocal(response.data.treatment.startingDate)),
                    observations: response.data.treatment.observations
                });
                setTreatments(newTreatments);
                setSelectedPatient(undefined);
                setSelectedDisease(undefined);
                setSelectedMedicines([]);
                setObservations('');
            }))
            .catch((function (error) {
                setError(error.response.data.message)
            }))
    }

    const getColumns = (): IColumn[] => {
        const minWidth: number = 75;
        const maxWidth: number = 210;
        return [
            {
                key: "Patient",
                name: "Patient",
                fieldName: "Patient",
                minWidth: minWidth,
                maxWidth: maxWidth,
                isSorted: true
            },
            {
                key: "Doctor",
                name: "Doctor",
                fieldName: "Doctor",
                minWidth: minWidth,
                maxWidth: maxWidth
            },
            {
                key: "Disease",
                name: "Disease",
                fieldName: "Disease",
                minWidth: minWidth,
                maxWidth: maxWidth
            },
            {
                key: "Medicines",
                name: "Medicines",
                fieldName: "Medicines",
                minWidth: minWidth,
                maxWidth: maxWidth,
                isMultiline: true
            },
            {
                key: "Observations",
                name: "Observations",
                fieldName: "Observations",
                minWidth: 150,
                maxWidth: 350,
                isMultiline: true
            },
            {
                key: "Date",
                name: "Date",
                fieldName: "Date",
                minWidth: minWidth,
                maxWidth: maxWidth,
                isSorted: true
            }
        ]
    }

    return (
        <Stack>
            <StackItem style={{ height: "50vh" }}>
                <DetailsList
                    layoutMode={DetailsListLayoutMode.justified}
                    columns={getColumns()}
                    items={treatments.map((treatment) => {
                        var medicinesString: string = '';
                        treatment.medicines.forEach((medicine) => medicinesString = medicinesString + "\n" + medicine);
                        return {
                            Patient: treatment.patient,
                            Doctor: treatment.doctor,
                            Disease: treatment.disease,
                            Medicines: medicinesString,
                            Observations: treatment.observations,
                            Date: treatment.startingDate.getDate() + "/" + treatment.startingDate.getMonth() + "/" + treatment.startingDate.getFullYear()
                        }
                    })}
                />
            </StackItem>
            {props.isLoggedInDoctor &&
                <Stack>
                    <StackItem>
                        <Multiselect
                            singleSelect={true}
                            options={props.patients}
                            onSelect={(selectedList, selectedItem) => { setSelectedPatient(selectedItem) }}
                            displayValue="name"
                            selectedValues={selectedPatient && [selectedPatient]}
                        />
                    </StackItem>
                    <StackItem>
                        <Multiselect
                            singleSelect={true}
                            options={props.diseases}
                            selectedValues={selectedDisease && [selectedDisease]}
                            onSelect={(selectedList, selectedItem) => { setSelectedDisease(selectedItem) }}
                            displayValue="name"
                        />
                    </StackItem>
                    <StackItem>
                        <Multiselect
                            options={props.medicines}
                            onSelect={(selectedList, selectedItem) => { addMedicine(selectedItem) }}
                            onRemove={(selectedList, selectedItem) => { removeMedicine(selectedItem) }}
                            displayValue="name"
                            selectedValues={selectedMedicines.length > 0 && selectedMedicines}
                        />
                    </StackItem>
                    <StackItem>
                        <Label>
                            Observations
                        </Label>
                        <TextField
                            multiline={true}
                            rows={3}
                            onChange={(event: any) => setObservations(event.target.value)}
                        />
                    </StackItem>
                    <StackItem>
                        <button onClick={onSaveClicked}>Save</button>
                    </StackItem>
                    {error &&
                        <StackItem>
                            <Label>
                                {error}
                            </Label>
                        </StackItem>
                    }
                </Stack>
            }
        </Stack>
    )
}