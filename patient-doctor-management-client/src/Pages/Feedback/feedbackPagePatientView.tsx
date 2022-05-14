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
import { convertDateStringFromServerToLocal } from "../../Utils/functions"
import { FeedbacksService } from "../../Utils/services"
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
            <Stack horizontal>
                <StackItem>
                    <Multiselect
                        singleSelect={true}
                        options={props.doctors}
                        groupBy={"specialization"}
                        onSelect={(selectedList, selectedItem) => { setSelectedDoctor(selectedItem) }}
                        displayValue="name"
                    />
                </StackItem>
                <StackItem>
                    <Multiselect
                        singleSelect={true}
                        options={props.diseases}
                        onSelect={(selectedList, selectedItem) => { setSelectedDisease(selectedItem) }}
                        displayValue="name"
                    />
                </StackItem>
            </Stack>
            <StackItem>
                <ul style={{ overflowY: "scroll", overflowX: "hidden", height: "95%", listStyle: "none" }}>
                    {feedbacks.map((feedback, index) => {
                        return (
                            <li key={feedback.timeStamp.getTime()} style={{ marginBottom: "3vh" }}>
                                <div style={{
                                    color: "white",
                                    marginBottom: "2vh",
                                    padding: "10px",
                                    backgroundColor: "blue",
                                    width: "50%",
                                    borderRadius: "20px",
                                    minHeight: "5vh"
                                }}>
                                    <div>
                                        {feedback.text}
                                    </div>
                                    <div style={{ float: "right" }}>
                                        {feedback.timeStamp.toLocaleTimeString()}
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </StackItem>
            <Stack style={{ width: "100%", height: "8.7vh", marginTop: "1vh" }} horizontal>
                <StackItem style={{ width: "90%" }}>
                    <TextField
                        rows={2}
                        value={feedbackText}
                        multiline={true}
                        onChange={(e, newValue) => newValue && setFeedbackTex(newValue)}
                    />
                </StackItem>
                <Stack style={{ width: "10%", height: "100%", border: '1px solid black' }} verticalAlign="center" horizontalAlign="center">
                    <Icon
                        style={{ fontSize: 40 }}
                        iconName={ADD_ICON}
                        onClick={onAddFeedbackClicked}
                    />
                </Stack>
            </Stack>
        </Stack>
    )
}