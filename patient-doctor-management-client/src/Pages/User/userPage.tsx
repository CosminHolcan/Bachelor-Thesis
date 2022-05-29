import { Pivot, PivotItem, Stack, StackItem } from "@fluentui/react"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../Components/LoadingSpinner/loadingSpinner";
import { IPersonDescription } from "../../Models/PersonDescription";
import { MenuItem } from "../../Enums/menuItem";
import { UserType } from "../../Enums/userTypes";
import { MILLISECONDS_IN_HALF_HOUR, WAITING_MILLISECONDS } from "../../globalConstants";
import { IAppointmentForDoctor } from "../../Models/AppointmentForDoctor";
import { convertDateStringFromServerToLocal, delay } from "../../Utils/functions";
import { AppointmentsService, AuthorizationService, DiseasesService, DoctorsService, MedicinesService, MessagesService, PatientsService, TreatmentsService } from "../../Utils/services";
import { AdminPage } from "../Admin/adminPage";
import { CalendarPage } from "../Calendar/calendarPage";
import { ChatPage } from "../Chat/chatPage";
import { styleContentArea, styleStack } from "./userPage.style";
import { ICustomKeyValuePair } from "../../Models/CustomKeyValuePair";
import { IMessage } from "../../Models/Message";
import * as signalR from "@microsoft/signalr";
import { IUserPageProps } from "./userPage.types";
import { FeedbackPagePatientView } from "../Feedback/feedbackPagePatientView";
import { IBaseModel } from "../../Models/BaseModel";
import { FeedbackPageDoctorView } from "../Feedback/feedbackPageDoctorView";
import { IBaseDTO } from "../../DTO/BaseDTO";
import { IBaseModelWithDescription } from "../../Models/BaseModelNameWithDescription";
import { RecipesPages } from "../Recipes/recipesPage";
import { ITreatment } from "../../Models/Treatment";
import { InformationPage } from "../Information/informationPage";
import { MyAccountPage } from "../MyAccount/myAccountPage";
import { IUserInformation } from "../../Models/UserInformation";

const MY_ACCOUNT_PAGE_ICON: string = "Home";
const ADMIN_PAGE_ICCON: string = "Admin";
const CALENDAR_PAGE_ICON: string = "Calendar";
const LOGOUT_ICON: string = "Leave";
const CHAT_PAGE_ICON: string = "CannedChat";
const FEEDBACK_PAGE_ICON: string = "Feedback";
const RECEIPES_PAGE_ICON: string = "ClipboardList";
const INFORMATION_PAGE_ICON: string = "Articles";

export const UserPage = (props: IUserPageProps): JSX.Element => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState<string>(MenuItem.MyAccount);
    const [doctors, setDoctors] = useState<IPersonDescription[]>([]);
    const [patients, setPatients] = useState<IPersonDescription[]>([]);
    const [appointmentsForDoctor, setAppointmentsForDoctor] = useState<IAppointmentForDoctor[]>([]);
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [messages, setMessages] = useState<ICustomKeyValuePair<string, IMessage[]>[]>([]);
    const [connection, setConnection] = useState<signalR.HubConnection>();
    const [currentUserId, setCurrentUserId] = useState<string>('');
    const [diseases, setDiseases] = useState<IBaseModelWithDescription[]>([]);
    const [medicines, setMedicines] = useState<IBaseModelWithDescription[]>([]);
    const [treatments, setTreatments] = useState<ITreatment[]>([]);
    const [currentUser, setCurrentUser] = useState<IUserInformation>();

    useEffect(() => {
        setCurrentUserId(props.currentUserId);
    }, [props.currentUserId])

    var userTypeString = localStorage.getItem("userType");
    const isLoggedInAdmin = userTypeString == null ? false : +userTypeString == UserType.Administrator ? true : false;
    const isLoggedInDoctor = userTypeString == null ? false : +userTypeString == UserType.Doctor ? true : false;

    const refreshToken = (): void => {
        var token = localStorage.getItem("jwt");
        token && AuthorizationService.RefreshToken({ jwt: token })
            .then((response) => {
                setCurrentUserId(response.data.userId);
                localStorage.setItem("jwt", response.data.jwt);
            })
            .catch(function (error) {
                localStorage.removeItem("jwt");
                localStorage.removeItem("userType");
                navigate("/login");
            });
    }

    setInterval(refreshToken, MILLISECONDS_IN_HALF_HOUR);

    useEffect(() => {
        if (connection !== undefined)
            return;

        var newConnection = new signalR.HubConnectionBuilder().withUrl("https://localhost:44368/chatHub").build();
        newConnection.start().then(function () {
            newConnection.invoke("ConnectToHub", { jwt: localStorage.getItem("jwt") })
                .then(function (response) {
                    setConnection(newConnection);
                })
        }).catch(function (err) {
            return console.error(err.toString());
        });
    }, [connection])

    useEffect(() => {
        if (selectedTab === MenuItem.Logout) {
            handleLogout();
            return;
        }

        if (selectedTab === MenuItem.MyAccount) {
            handleMyAccountClicked();
        }

        if (selectedTab === MenuItem.CalendarPatient) {
            handleCalendarPatientClicked();
        }

        if (selectedTab === MenuItem.CalendarDoctor) {
            handleCalendarDoctorClicked();
        }

        if (selectedTab === MenuItem.Chat) {
            handleChatClicked();
        }

        if (selectedTab === MenuItem.Feedback && !isLoggedInDoctor) {
            handleFeedbackPatientViewClicked();
        }

        if (selectedTab === MenuItem.Feedback && isLoggedInDoctor) {
            handleFeedbackDoctorViewClicked();
        }

        if (selectedTab === MenuItem.Recipes) {
            handleReceipesClicked();
        }

        if (selectedTab === MenuItem.Information) {
            handleInformationClicked();
        }
    }, [selectedTab])

    const getMessagesFromDataResponse = (dataResponse: any): ICustomKeyValuePair<string, IMessage[]>[] => {
        for (var i = 0; i < dataResponse.length; i++) {
            for (var j = 0; j < dataResponse[i].value.length; j++)
                dataResponse[i].value[j].timeStamp = new Date(convertDateStringFromServerToLocal(dataResponse[i].value[j].timeStamp));
        }
        return dataResponse;
    }

    const handleMyAccountClicked = (): void => {
        setLoadingData(true);

        AuthorizationService.GetUser({ jwt: localStorage.getItem("jwt") ?? '' })
            .then(async function (response) {
                setCurrentUser(response.data.userInformation);

                await delay(WAITING_MILLISECONDS);
                setLoadingData(false);
            })
            .catch(async function (error) {
                await delay(WAITING_MILLISECONDS / 5);
                setLoadingData(false);
            })
    }

    const handleCalendarPatientClicked = (): void => {
        DoctorsService.GetAllDoctors({ jwt: localStorage.getItem("jwt") ?? '' })
            .then((function (response) {
                setDoctors(response.data.doctors);
            }))
            .catch((function (error) {
            }));
    }

    const handleCalendarDoctorClicked = (): void => {
        setLoadingData(true);

        AppointmentsService.GetAppointmentByDoctor({ jwt: localStorage.getItem("jwt") ?? '' })
            .then((async function (response) {
                await delay(WAITING_MILLISECONDS);
                setLoadingData(false);

                const appointmentsData = response.data.appointments;
                const newAppointmentsForDoctor: IAppointmentForDoctor[] = appointmentsData.map((appointment: any) => ({
                    patientName: appointment.patientName,
                    startTime: new Date(convertDateStringFromServerToLocal(appointment.startTime))
                }));
                setAppointmentsForDoctor(newAppointmentsForDoctor);
            }))
            .catch((async function (error) {
                await delay(WAITING_MILLISECONDS);
                setLoadingData(false);
            }))
    }

    const handleChatClicked = (): void => {
        setLoadingData(true);

        if (isLoggedInDoctor) {
            PatientsService.GetAllPatients(({ jwt: localStorage.getItem("jwt") ?? '' }))
                .then((async function (response) {
                    setPatients(response.data.patients);
                    MessagesService.GetMessagesForUser(({ jwt: localStorage.getItem("jwt") ?? '' }))
                        .then((async function (messagesResponse) {
                            await delay(WAITING_MILLISECONDS);
                            setLoadingData(false);

                            setMessages(getMessagesFromDataResponse(messagesResponse.data.messages));
                        }))
                        .catch((async function (error) {
                            await delay(WAITING_MILLISECONDS);
                            setLoadingData(false);
                        }))
                }))
                .catch((async function (error) {
                    await delay(WAITING_MILLISECONDS);
                    setLoadingData(false);
                }))
        }
        else {
            setLoadingData(true);

            DoctorsService.GetAllDoctors({ jwt: localStorage.getItem("jwt") ?? '' })
                .then((async function (response) {
                    setDoctors(response.data.doctors);
                    MessagesService.GetMessagesForUser(({ jwt: localStorage.getItem("jwt") ?? '' }))
                        .then((async function (messagesResponse) {
                            await delay(WAITING_MILLISECONDS);
                            setLoadingData(false);

                            setMessages(getMessagesFromDataResponse(messagesResponse.data.messages));
                        }))
                        .catch((async function (error) {
                            await delay(WAITING_MILLISECONDS);
                            setLoadingData(false);
                        }))
                }))
                .catch((async function (error) {
                    await delay(WAITING_MILLISECONDS);
                    setLoadingData(false);
                }))
        }
    }

    const handleFeedbackPatientViewClicked = (): void => {
        setLoadingData(true);

        const baseDTO: IBaseDTO = {
            jwt: localStorage.getItem("jwt") ?? ''
        };

        DoctorsService.GetAllDoctors({ jwt: localStorage.getItem("jwt") ?? '' })
            .then((async function (response) {
                setDoctors(response.data.doctors);
                DiseasesService.GetAllDiseases(baseDTO)
                    .then((async function (diseasesResponse) {
                        await delay(WAITING_MILLISECONDS);
                        setLoadingData(false);

                        setDiseases(diseasesResponse.data.diseases);
                    }))
                    .catch((async function (error) {
                        await delay(WAITING_MILLISECONDS);
                        setLoadingData(false);
                    }))
            }))
            .catch((async function (error) {
                await delay(WAITING_MILLISECONDS);
                setLoadingData(false);
            }))
    }

    const handleFeedbackDoctorViewClicked = (): void => {
        setLoadingData(true);

        const baseDTO: IBaseDTO = {
            jwt: localStorage.getItem("jwt") ?? ''
        };

        PatientsService.GetAllPatients({ jwt: localStorage.getItem("jwt") ?? '' })
            .then((async function (response) {
                setPatients(response.data.patients);
                DiseasesService.GetAllDiseases(baseDTO)
                    .then((async function (diseasesResponse) {
                        await delay(WAITING_MILLISECONDS);
                        setLoadingData(false);

                        setDiseases(diseasesResponse.data.diseases);
                    }))
                    .catch((async function (error) {
                        await delay(WAITING_MILLISECONDS);
                        setLoadingData(false);
                    }))
            }))
            .catch((async function (error) {
                await delay(WAITING_MILLISECONDS);
                setLoadingData(false);
            }))
    }

    const handleReceipesClicked = (): void => {
        setLoadingData(true);

        if (!isLoggedInDoctor) {
            TreatmentsService.GetTreatmentsByPatient({ jwt: localStorage.getItem("jwt") ?? '' })
                .then((async function (response) {
                    await delay(WAITING_MILLISECONDS);
                    setLoadingData(false);

                    setTreatments(response.data.treatments.map((treatment: any) => {
                        return {
                            patient: treatment.patient,
                            doctor: treatment.doctor,
                            disease: treatment.disease,
                            medicines: treatment.medicines,
                            startingDate: new Date(convertDateStringFromServerToLocal(treatment.startingDate)),
                            observations: treatment.observations,
                        }
                    }));
                }))
                .catch((async function (error) {
                    await delay(WAITING_MILLISECONDS);
                    setLoadingData(false);
                }))

            return;
        }

        TreatmentsService.GetTreatmentsByDoctor({ jwt: localStorage.getItem("jwt") ?? '' })
            .then((async function (treatmentsResponse) {
                setTreatments(treatmentsResponse.data.treatments.map((treatment: any) => {
                    return {
                        patient: treatment.patient,
                        doctor: treatment.doctor,
                        disease: treatment.disease,
                        medicines: treatment.medicines,
                        startingDate: new Date(convertDateStringFromServerToLocal(treatment.startingDate)),
                        observations: treatment.observations,
                    }
                }));
                PatientsService.GetAllPatients({ jwt: localStorage.getItem("jwt") ?? '' })
                    .then((async function (patientsResponse) {
                        setPatients(patientsResponse.data.patients);
                        DiseasesService.GetAllDiseases({ jwt: localStorage.getItem("jwt") ?? '' })
                            .then((async function (diseasesResponse) {
                                setDiseases(diseasesResponse.data.diseases);
                                MedicinesService.GetAllMedicines({ jwt: localStorage.getItem("jwt") ?? '' })
                                    .then((async function (medicinesResponse) {
                                        await delay(WAITING_MILLISECONDS);
                                        setLoadingData(false);

                                        setMedicines(medicinesResponse.data.medicines);
                                    }))
                                    .catch((async function (error) {
                                        await delay(WAITING_MILLISECONDS);
                                        setLoadingData(false);
                                    }))
                            }))
                            .catch((async function (error) {
                                await delay(WAITING_MILLISECONDS);
                                setLoadingData(false);
                            }))
                    }))
                    .catch((async function (error) {
                        await delay(WAITING_MILLISECONDS);
                        setLoadingData(false);
                    }))
            }))

    }

    const handleInformationClicked = (): void => {
        setLoadingData(true);

        DiseasesService.GetAllDiseases({ jwt: localStorage.getItem("jwt") ?? '' })
            .then((async function (diseasesResponse) {
                setDiseases(diseasesResponse.data.diseases);
                MedicinesService.GetAllMedicines({ jwt: localStorage.getItem("jwt") ?? '' })
                    .then((async function (medicinesResponse) {
                        await delay(WAITING_MILLISECONDS);
                        setLoadingData(false);

                        setMedicines(medicinesResponse.data.medicines);
                    }))
                    .catch((async function (error) {
                        await delay(WAITING_MILLISECONDS);
                        setLoadingData(false);
                    }))
            }))
            .catch((async function (error) {
                await delay(WAITING_MILLISECONDS);
                setLoadingData(false);
            }))
    }

    const handleLogout = () => {
        localStorage.removeItem("userType");
        localStorage.removeItem("jwt");
        navigate("/login");
    }

    const onPivotItemClicked = (item: PivotItem | undefined): void => {
        if (item === undefined)
            return;

        if (selectedTab === item.props.itemKey)
            return;

        item.props.itemKey && setSelectedTab(item.props.itemKey);
    };

    const getMenuItems = (): MenuItem[] => {
        var result: MenuItem[] = [MenuItem.MyAccount];
        var userType = null;
        var userTypeString = localStorage.getItem("userType");

        if (userTypeString != null)
            userType = +userTypeString;

        switch (userType) {
            case UserType.Administrator:
                result.push(MenuItem.Admin);
                break;
            case UserType.Doctor:
                result = result.concat([MenuItem.CalendarDoctor, MenuItem.Chat, MenuItem.Feedback, MenuItem.Recipes, MenuItem.Information]);
                break;
            case UserType.Patient:
                result = result.concat([MenuItem.CalendarPatient, MenuItem.Chat, MenuItem.Feedback, MenuItem.Recipes, MenuItem.Information]);
                break;
        }

        result.push(MenuItem.Logout);
        return result;
    };

    const getPivotItem = (tabName: MenuItem): React.ReactNode => {
        switch (tabName) {
            case MenuItem.MyAccount:
                return (
                    <PivotItem key={tabName} itemKey={tabName} headerText={tabName} itemIcon={MY_ACCOUNT_PAGE_ICON} headerButtonProps={{ style: { fontSize: 20 } }}>
                        {!loadingData && currentUser !== undefined ?
                            <MyAccountPage isLoggedInDoctor={isLoggedInDoctor} currentUser={currentUser} />
                            : <LoadingSpinner
                                height={300}
                                width={300}
                                labelStyle={{ fontSize: 40 }}
                                wrapStackStyle={{ height: "80vh" }}
                            />}
                    </PivotItem>
                );
            case MenuItem.Admin:
                return (
                    <PivotItem key={tabName} itemKey={tabName} headerText={tabName} itemIcon={ADMIN_PAGE_ICCON} headerButtonProps={{ style: { fontSize: 20 } }}>
                        <AdminPage />
                    </PivotItem>
                );
            case MenuItem.CalendarPatient:
                return (
                    <PivotItem key={tabName} itemKey={tabName} headerText={tabName} itemIcon={CALENDAR_PAGE_ICON} headerButtonProps={{ style: { fontSize: 20 } }}>
                        <CalendarPage doctors={doctors} />
                    </PivotItem>
                )
            case MenuItem.CalendarDoctor:
                return (
                    <PivotItem key={tabName} itemKey={tabName} headerText={tabName} itemIcon={CALENDAR_PAGE_ICON} headerButtonProps={{ style: { fontSize: 20 } }}>
                        {!loadingData ?
                            <CalendarPage doctors={[]} appointments={appointmentsForDoctor} />
                            :
                            <LoadingSpinner
                                height={300}
                                width={300}
                                labelStyle={{ fontSize: 40 }}
                                wrapStackStyle={{ height: "80vh" }}
                            />}

                    </PivotItem>
                )
            case MenuItem.Chat:
                return (
                    <PivotItem key={tabName} itemKey={tabName} headerText={tabName} itemIcon={CHAT_PAGE_ICON} headerButtonProps={{ style: { fontSize: 20 } }}>
                        {!loadingData && connection !== undefined ?
                            <ChatPage people={isLoggedInDoctor ? patients : doctors} messages={messages} connection={connection} currentUserId={currentUserId} />
                            :
                            <LoadingSpinner
                                height={300}
                                width={300}
                                labelStyle={{ fontSize: 40 }}
                                wrapStackStyle={{ height: "80vh" }}
                            />}
                    </PivotItem>
                )
            case MenuItem.Feedback:
                if (!isLoggedInDoctor)
                    return (
                        <PivotItem key={tabName} itemKey={tabName} headerText={tabName} itemIcon={FEEDBACK_PAGE_ICON} headerButtonProps={{ style: { fontSize: 20 } }}>
                            {!loadingData ?
                                <FeedbackPagePatientView
                                    diseases={diseases}
                                    doctors={doctors}
                                    currentUserId={currentUserId}
                                />
                                :
                                <LoadingSpinner
                                    height={300}
                                    width={300}
                                    labelStyle={{ fontSize: 40 }}
                                    wrapStackStyle={{ height: "80vh" }}
                                />}
                        </PivotItem>
                    )
                else
                    return (
                        <PivotItem key={tabName} itemKey={tabName} headerText={tabName} itemIcon={FEEDBACK_PAGE_ICON} headerButtonProps={{ style: { fontSize: 20 } }}>
                            {!loadingData ?
                                <FeedbackPageDoctorView
                                    diseases={diseases}
                                    patients={patients}
                                    currentUserId={currentUserId}
                                />
                                :
                                <LoadingSpinner
                                    height={300}
                                    width={300}
                                    labelStyle={{ fontSize: 40 }}
                                    wrapStackStyle={{ height: "80vh" }}
                                />}
                        </PivotItem>
                    )
            case MenuItem.Recipes:
                return (
                    <PivotItem key={tabName} itemKey={tabName} headerText={tabName} itemIcon={RECEIPES_PAGE_ICON} headerButtonProps={{ style: { fontSize: 20 } }}>
                        {!loadingData ?
                            <RecipesPages
                                isLoggedInDoctor={isLoggedInDoctor}
                                patients={patients}
                                diseases={diseases}
                                medicines={medicines}
                                treatments={treatments}
                            />
                            :
                            <LoadingSpinner
                                height={300}
                                width={300}
                                labelStyle={{ fontSize: 40 }}
                                wrapStackStyle={{ height: "80vh" }}
                            />}
                    </PivotItem>
                )
            case MenuItem.Information:
                return (
                    <PivotItem key={tabName} itemKey={tabName} headerText={tabName} itemIcon={INFORMATION_PAGE_ICON} headerButtonProps={{ style: { fontSize: 20 } }}>
                        {!loadingData ?
                            <InformationPage
                                diseases={diseases}
                                medicines={medicines}
                            />
                            :
                            <LoadingSpinner
                                height={300}
                                width={300}
                                labelStyle={{ fontSize: 40 }}
                                wrapStackStyle={{ height: "80vh" }}
                            />}
                    </PivotItem>
                )
            case MenuItem.Logout:
                return (
                    <PivotItem key={tabName} itemKey={tabName} headerText={tabName} itemIcon={LOGOUT_ICON} headerButtonProps={{ style: { marginLeft: isLoggedInAdmin ? "73.5vw" : "30vw", fontSize: 20 } }} />
                )
        }
    };

    return (
        <Stack horizontal className={styleStack}>
            <Pivot selectedKey={selectedTab} onLinkClick={onPivotItemClicked} className={styleContentArea}>
                {getMenuItems().map((item) => getPivotItem(item))}
            </Pivot>
        </Stack>
    );
}