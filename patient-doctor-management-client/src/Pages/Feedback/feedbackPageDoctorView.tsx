import { Stack } from "@fluentui/react"
import { cloneDeep } from "lodash"
import Multiselect from "multiselect-react-dropdown"
import { Icon, StackItem, TextField } from "office-ui-fabric-react"
import { useEffect, useState } from "react"
import { IAddFeedbackDTO } from "../../DTO/AddFeedbackDTO"
import { IGetFeedbacksByDoctorDTO } from "../../DTO/GetFeedbacksByDoctorDTO"
import { IGetFeedbacksByPatientDTO } from "../../DTO/GetFeedbacksByPatientDTO"
import { IBaseModel } from "../../Models/BaseModel"
import { IFeedback } from "../../Models/Feedback"
import { IPersonDescription } from "../../Models/PersonDescription"
import { convertDateStringFromServerToLocal } from "../../Utils/functions"
import { FeedbacksService } from "../../Utils/services"
import { IFeedbackPageDoctorViewProps } from "./feedbackPageDoctorView.types"

const ADD_ICON: string = "Add";

export const FeedbackPageDoctorView = (props: IFeedbackPageDoctorViewProps): JSX.Element => {
    const [selectedPatient, setSelectedPatient] = useState<IPersonDescription>();
    const [selectedDisease, setSelectedDisease] = useState<IBaseModel>();
    const [feedbacksByPatient, setFeedbacksByPatient] = useState<IFeedback[]>([]);
    const [feedbacksByDoctor, setFeedbacksByDoctor] = useState<IFeedback[]>([]);
    const [feedbackText, setFeedbackTex] = useState<string>('');

    useEffect(() => {
        setFeedbackTex('');
        if (selectedPatient !== undefined && selectedDisease !== undefined) {
            const getFeedbacksByDoctorDTO: IGetFeedbacksByDoctorDTO = {
                jwt: localStorage.getItem("jwt") ?? '',
                patientId: selectedPatient.id,
                diseaseId: selectedDisease.id
            };

            const getFeedbacksByPatientDTO: IGetFeedbacksByPatientDTO = {
                jwt: localStorage.getItem("jwt") ?? '',
                patientId: selectedPatient.id,
                doctorId: props.currentUserId,
                diseaseId: selectedDisease.id
            };

            FeedbacksService.GetFeedbacksByDoctor(getFeedbacksByDoctorDTO)
                .then(function (byDoctorResponse) {
                    FeedbacksService.GetFeedbacksByPatient(getFeedbacksByPatientDTO)
                        .then(function (byPatientResponse) {
                            setFeedbacksByDoctor(byDoctorResponse.data.feedbacks.map((feedback: any) => {
                                return {
                                    patientId: feedback.patientId,
                                    doctorId: feedback.doctorId,
                                    diseaseId: feedback.diseaseId,
                                    timeStamp: new Date(convertDateStringFromServerToLocal(feedback.timeStamp)),
                                    text: feedback.text,
                                    givenByPatient: feedback.givenByPatient
                                }
                            }));
                            setFeedbacksByPatient(byPatientResponse.data.feedbacks.map((feedback: any) => {
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
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }, [selectedPatient, selectedDisease])

    const onAddFeedbackClicked = (): void => {
        if (selectedDisease === undefined || selectedPatient === undefined)
            return;

        const feedback: IFeedback = {
            patientId: selectedPatient.id,
            doctorId: props.currentUserId,
            diseaseId: selectedDisease.id,
            timeStamp: new Date(),
            text: feedbackText,
            givenByPatient: false
        }

        const addFeedbackDTO: IAddFeedbackDTO = {
            jwt: localStorage.getItem("jwt") ?? '',
            feedback: feedback
        };

        FeedbacksService.AddFeedback(addFeedbackDTO)
            .then(function (response) {
                const newFeedbacks: IFeedback[] = cloneDeep(feedbacksByDoctor);
                newFeedbacks.push(feedback);
                setFeedbacksByDoctor(newFeedbacks);

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
                        options={props.patients}
                        onSelect={(selectedList, selectedItem) => { setSelectedPatient(selectedItem) }}
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
            <Stack horizontal>
                <StackItem>
                    <ul style={{ overflowY: "scroll", overflowX: "hidden", height: "95%", listStyle: "none" }}>
                        {feedbacksByDoctor.map((feedback, index) => {
                            return (
                                <li key={feedback.timeStamp.getTime()} style={{ marginBottom: "3vh" }}>
                                    <div style={{
                                        color: "white",
                                        marginBottom: "2vh",
                                        padding: "10px",
                                        backgroundColor: "blue",
                                        width: "50%",
                                        borderRadius: "20px",
                                        minHeight: "5vh",
                                        float: "right"
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
                <StackItem>
                    <ul style={{ overflowY: "scroll", overflowX: "hidden", height: "95%", listStyle: "none" }}>
                        {feedbacksByPatient.map((feedback, index) => {
                            return (
                                <li key={feedback.timeStamp.getTime()} style={{ marginBottom: "3vh" }}>
                                    <div style={{
                                        color: "white",
                                        marginBottom: "2vh",
                                        padding: "10px",
                                        backgroundColor: "blue",
                                        width: "50%",
                                        borderRadius: "20px",
                                        minHeight: "5vh",
                                        float: "right"
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
            </Stack>
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