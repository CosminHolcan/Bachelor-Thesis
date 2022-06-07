import { DetailsList, DetailsListLayoutMode, IColumn, Icon, Label, Stack, StackItem, TextField } from "@fluentui/react"
import { cloneDeep } from "lodash"
import Multiselect from "multiselect-react-dropdown"
import { useEffect, useState } from "react"
import { IAddTreatmentDTO } from "../../DTO/AddTreatmentDTO"
import { IBaseModelWithDescription } from "../../Models/BaseModelNameWithDescription"
import { IPersonDescription } from "../../Models/PersonDescription"
import { ITreatment } from "../../Models/Treatment"
import { convertDateStringFromServerToLocal } from "../../Utils/functions"
import { TreatmentsService } from "../../Utils/services"
import { ButtonSaveOperationStyle } from "../../Utils/styles"
import { DoctorControllerStyle, DropdownDiseaseContainerStyle, DropdownsContainerStyle, LabelStyle, LeftArrowStyle, ObservationsAndSaveContainerStyle, RecipesTableContainerStyle, RightArrowStyle, TreatmentsPageStyle } from "./recipesPage.styles"
import { IRecipesPageProps } from "./recipesPage.types"

const TREATMENTS_PER_PAGE: number = 5;
const ICON_LEFT_Arrow: string = "CaretSolidLeft";
const ICON_RIGHT_ARROW: string = "CaretSolidRight";

export const RecipesPages = (props: IRecipesPageProps): JSX.Element => {
    const [treatments, setTreatments] = useState<ITreatment[]>(props.treatments);
    const [selectedPatient, setSelectedPatient] = useState<IPersonDescription>();
    const [selectedDisease, setSelectedDisease] = useState<IBaseModelWithDescription>();
    const [selectedMedicines, setSelectedMedicines] = useState<IBaseModelWithDescription[]>([]);
    const [observations, setObservations] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [treatmentsPage, setTreatmentsPage] = useState<number>(1);
    const [addedElements, setAddedElements] = useState<number>(0);

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
                setAddedElements(addedElements + 1);
            }))
            .catch((function (error) {
                setError(error.response.data.message)
            }))
    }

    const getTreatmentsToDisplay = (): ITreatment[] => {
        return treatments.slice((treatmentsPage - 1) * TREATMENTS_PER_PAGE, Math.min(treatmentsPage * TREATMENTS_PER_PAGE, treatments.length));
    }

    const showLeftArrow = (): boolean => {
        return treatmentsPage > 1;
    }

    const showRightArrow = (): boolean => {
        return treatments.length / TREATMENTS_PER_PAGE > treatmentsPage;
    }

    const getColumns = (): IColumn[] => {
        const minWidth: number = 120;
        const maxWidth: number = 250;
        var columns: IColumn[] = props.isLoggedInDoctor
            ? [{
                key: "Patient",
                name: "Patient",
                fieldName: "Patient",
                minWidth: minWidth,
                maxWidth: maxWidth,
                isSorted: true
            }]
            : [{
                key: "Doctor",
                name: "Doctor",
                fieldName: "Doctor",
                minWidth: minWidth,
                maxWidth: maxWidth,
                isSorted: true
            }];
        columns = columns.concat([
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
                minWidth: 180,
                maxWidth: 400,
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
        ]);

        return columns;
    }

    return (
        <Stack>
            {treatments.length > 0 &&
                <Stack>
                    <StackItem style={RecipesTableContainerStyle}>
                        <DetailsList
                            layoutMode={DetailsListLayoutMode.justified}
                            columns={getColumns()}
                            items={getTreatmentsToDisplay().map((treatment) => {
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
                    <Stack horizontal horizontalAlign="center" verticalAlign="center">
                        {showLeftArrow() &&
                            <StackItem onClick={() => { setTreatmentsPage(treatmentsPage - 1); }}>
                                <Icon
                                    iconName={ICON_LEFT_Arrow}
                                    style={LeftArrowStyle}
                                />
                            </StackItem>
                        }
                        <StackItem>
                            <Label style={TreatmentsPageStyle}>
                                {treatmentsPage}
                            </Label>
                        </StackItem>
                        {showRightArrow() &&
                            <StackItem onClick={() => { setTreatmentsPage(treatmentsPage + 1); }}>
                                <Icon
                                    iconName={ICON_RIGHT_ARROW}
                                    style={RightArrowStyle}
                                />
                            </StackItem>
                        }
                    </Stack>
                </Stack>
            }
            {props.isLoggedInDoctor &&
                <Stack style={DoctorControllerStyle}>
                    <Stack horizontal>
                        <StackItem style={DropdownsContainerStyle}>
                            <StackItem>
                                <Label style={LabelStyle}>
                                    Patient
                                </Label>
                                <Multiselect
                                    placeholder="Select a patient"
                                    singleSelect={true}
                                    options={props.patients}
                                    onSelect={(selectedList, selectedItem) => { setSelectedPatient(selectedItem) }}
                                    displayValue="name"
                                    selectedValues={selectedPatient && [selectedPatient]}
                                />
                            </StackItem>
                            <StackItem style={DropdownDiseaseContainerStyle}>
                                <Label style={LabelStyle}>
                                    Disease
                                </Label>
                                <Multiselect
                                    placeholder="Select a disease"
                                    singleSelect={true}
                                    options={props.diseases}
                                    selectedValues={selectedDisease && [selectedDisease]}
                                    onSelect={(selectedList, selectedItem) => { setSelectedDisease(selectedItem) }}
                                    displayValue="name"
                                />
                            </StackItem>
                            <StackItem>
                                <Label style={LabelStyle}>
                                    Medicines
                                </Label>
                                <Multiselect
                                    key={"id" + addedElements}
                                    placeholder="Select medicines"
                                    options={props.medicines}
                                    onSelect={(selectedList, selectedItem) => { addMedicine(selectedItem) }}
                                    onRemove={(selectedList, selectedItem) => { removeMedicine(selectedItem) }}
                                    displayValue="name"
                                    selectedValues={selectedMedicines.length > 0 && selectedMedicines}
                                />
                            </StackItem>
                        </StackItem>
                        <StackItem style={ObservationsAndSaveContainerStyle}>
                            <StackItem>
                                <Label style={LabelStyle}>
                                    Observations
                                </Label>
                                <TextField
                                    multiline={true}
                                    rows={4}
                                    value={observations}
                                    onChange={(event: any) => setObservations(event.target.value)}
                                />
                            </StackItem>
                            <button style={ButtonSaveOperationStyle} onClick={onSaveClicked}>Save</button>
                        </StackItem>
                    </Stack>
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