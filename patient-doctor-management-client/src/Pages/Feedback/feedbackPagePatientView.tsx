import { Stack } from "@fluentui/react"
import { cloneDeep } from "lodash"
import Multiselect from "multiselect-react-dropdown"
import { Icon, StackItem, TextField } from "office-ui-fabric-react"
import { useEffect, useState } from "react"
import { IAddFeedbackDTO } from "../../DTO/AddFeedbackDTO"
import { IGetFeedbacksByPatientDTO } from "../../DTO/GetFeedbacksByPatientDTO"
import { IBaseModel } from "../../Models/BaseModel"
import { IFeedback } from "../../Models/Feedback"
import { IPersonDescription } from "../../Models/PersonDescription"
import { convertDateStringFromServerToLocal, getMessageFormatStringDate } from "../../Utils/functions"
import { FeedbacksService } from "../../Utils/services"
import { AddNewObservationContainerStyle, DateStyle, DropdownDiseasesStyle, DropdownPatientsOrDoctorsStyle, DropdownsContainerStyle, FeedbackPatientStyle, FeedbacksContainerStyle, IconContainerStyle, TextFieldNewObservationStyle } from "./feedbackPageDoctor.styles"
import { IFeedbackPagePatientViewProps } from "./feedbackPagePatientView.types"

const ADD_ICON: string = "Add";

export const FeedbackPagePatientView = (props: IFeedbackPagePatientViewProps): JSX.Element => {
    const [selectedDoctor, setSelectedDoctor] = useState<IPersonDescription>();
    const [selectedDisease, setSelectedDisease] = useState<IBaseModel>();
    const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
    const [feedbackText, setFeedbackTex] = useState<string>('');

    useEffect(() => {
        if (selectedDoctor !== undefined && selectedDisease !== undefined) {
            const dto: IGetFeedbacksByPatientDTO = {
                jwt: localStorage.getItem("jwt") ?? '',
                patientId: props.currentUserId,
                doctorId: selectedDoctor.id,
                diseaseId: selectedDisease.id
            };

            FeedbacksService.GetFeedbacksByPatient(dto)
                .then(function (response) {
                    setFeedbacks(response.data.feedbacks.map((feedback: any) => {
                        return {
                            patientId: feedback.patientId,
                            doctorId: feedback.doctorId,
                            diseaseId: feedback.diseaseId,
                            timeStamp: new Date(convertDateStringFromServerToLocal(feedback.timeStamp)),
                            text: feedback.text,
                            givenByPatient: feedback.givenByPatient
                        }
                    }));
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }, [selectedDoctor, selectedDisease])

    setTimeout(() => {
        var objDiv = document.getElementById("feedbacksListId");
        if (objDiv)
            objDiv.scrollTop = objDiv.scrollHeight;
    }, 0)

    const onAddFeedbackClicked = (): void => {
        if (selectedDisease === undefined || selectedDoctor === undefined)
            return;

        const feedback: IFeedback = {
            patientId: props.currentUserId,
            doctorId: selectedDoctor.id,
            diseaseId: selectedDisease.id,
            timeStamp: new Date(),
            text: feedbackText,
            givenByPatient: true
        }

        const addFeedbackDTO: IAddFeedbackDTO = {
            jwt: localStorage.getItem("jwt") ?? '',
            feedback: feedback
        };

        FeedbacksService.AddFeedback(addFeedbackDTO)
            .then(function (response) {
                const newFeedbacks: IFeedback[] = cloneDeep(feedbacks);
                newFeedbacks.push(feedback);
                setFeedbacks(newFeedbacks);

                setFeedbackTex('');
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <Stack>
            <Stack horizontal style={DropdownsContainerStyle}>
                <StackItem style={DropdownPatientsOrDoctorsStyle}>
                    <Multiselect
                        singleSelect={true}
                        options={props.doctors}
                        groupBy={"specialization"}
                        onSelect={(selectedList, selectedItem) => { setSelectedDoctor(selectedItem) }}
                        displayValue="name"
                    />
                </StackItem>
                <StackItem style={DropdownDiseasesStyle}>
                    <Multiselect
                        singleSelect={true}
                        options={props.diseases}
                        onSelect={(selectedList, selectedItem) => { setSelectedDisease(selectedItem) }}
                        displayValue="name"
                    />
                </StackItem>
            </Stack>
            <StackItem style={FeedbacksContainerStyle}>
                <ul id="feedbacksListId" style={{ overflowY: "scroll", overflowX: "hidden", height: "95%", listStyle: "none" }}>
                    {feedbacks.map((feedback, index) => {
                        return (
                            <li key={feedback.timeStamp.getTime()} style={{ marginBottom: "3vh" }}>
                                <div style={FeedbackPatientStyle}>
                                    <div>
                                        {feedback.text}
                                    </div>
                                    <div style={DateStyle}>
                                        {getMessageFormatStringDate(feedback.timeStamp)}
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </StackItem>
            {selectedDoctor && selectedDisease &&
                <Stack style={AddNewObservationContainerStyle} horizontal>
                    <StackItem style={TextFieldNewObservationStyle}>
                        <TextField
                            rows={2}
                            value={feedbackText}
                            multiline={true}
                            onChange={(e, newValue) => newValue !== undefined && setFeedbackTex(newValue)}
                        />
                    </StackItem>
                    <Stack style={IconContainerStyle} verticalAlign="center" horizontalAlign="center">
                        <Icon
                            style={{ fontSize: 40 }}
                            iconName={ADD_ICON}
                            onClick={onAddFeedbackClicked}
                        />
                    </Stack>
                </Stack>
            }
        </Stack>
    )
}