import { Pivot, PivotItem, Stack, StackItem } from "@fluentui/react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../Components/LoadingSpinner/loadingSpinner";
import { IDoctorDTO } from "../../DTO/DoctorDTO";
import { MenuItem } from "../../Enums/menuItem";
import { UserType } from "../../Enums/userTypes";
import { MILLISECONDS_IN_HALF_HOUR, WAITING_MILLISECONDS } from "../../globalConstants";
import { IAppointmentForDoctor } from "../../Models/AppointmentForDoctor";
import { convertDateStringFromServerToLocal, delay } from "../../Utils/functions";
import { AppointmentsService, AuthorizationService, DoctorsService } from "../../Utils/services";
import { AdminPage } from "../Admin/adminPage";
import { CalendarPage } from "../Calendar/calendarPage";
import { styleContentArea, styleStack } from "./userPage.style";

const MY_ACCOUNT_PAGE_ICON: string = "Home";
const ADMIN_PAGE_ICCON: string = "Admin";
const CALENDAR_PAGE_ICON: string = "Calendar";
const LOGOUT_ICON: string = "Leave";

export const UserPage = (): JSX.Element => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState<string>(MenuItem.MyAccount);
    const [doctors, setDoctors] = useState<IDoctorDTO[]>([]);
    const [appointmentsForDoctor, setAppointmentsForDoctor] = useState<IAppointmentForDoctor[]>([]);
    const [loadingData, setLoadingData] = useState<boolean>(false);

    const refreshToken = (): void => {
        var token = localStorage.getItem("jwt");
        token && AuthorizationService.RefreshToken({ jwt: token })
            .then((response) => {
                localStorage.setItem("jwt", response.data.jwt);
            })
            .catch(function (error) {
                localStorage.removeItem("jwt");
                localStorage.removeItem("userType");
                navigate("/login");
            });
    }

    setInterval(refreshToken, MILLISECONDS_IN_HALF_HOUR);

    const handleCalendarPatientClicked = (): void => {
        DoctorsService.GetAllDoctors({ jwt: localStorage.getItem("jwt") ?? '' })
            .then((function (response) {
                setDoctors(response.data.doctors);
            }))
            .catch((function (error) {
                console.log(error);
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

    const handleLogout = () => {
        localStorage.removeItem("userType");
        localStorage.removeItem("jwt");
        navigate("/login");
    }

    const onPivotItemClicked = (item: PivotItem | undefined): void => {
        if (item === undefined)
            return;

        if (item.props.itemKey === MenuItem.Logout) {
            handleLogout();
            return;
        }

        if (item.props.itemKey === MenuItem.CalendarPatient) {
            handleCalendarPatientClicked();
        }

        if (item.props.itemKey === MenuItem.CalendarDoctor) {
            handleCalendarDoctorClicked();
        }

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
                result = result.concat([MenuItem.CalendarDoctor]);
                break;
            case UserType.Patient:
                result = result.concat([MenuItem.CalendarPatient, MenuItem.SeeMyRecipes]);
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
                        <div>
                            My Account Page
                        </div>
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
            case MenuItem.Logout:
                return (
                    <PivotItem key={tabName} itemKey={tabName} headerText={tabName} itemIcon={LOGOUT_ICON} headerButtonProps={{ style: { marginLeft: "62vw", fontSize: 20 } }} />
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