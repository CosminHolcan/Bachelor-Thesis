import { Stack } from "@fluentui/react";
import Multiselect from "multiselect-react-dropdown";
import { Icon, Label, StackItem } from "office-ui-fabric-react";
import { useEffect, useState } from "react";
import { AppointmentSlotPatientView } from "../../Components/AppointmentSlotPatientView/appointmentSlotPatientView";
import { CustomCalendar } from "../../Components/CustomCalendar/customCalendar";
import { LoadingSpinner } from "../../Components/LoadingSpinner/loadingSpinner";
import { IPersonDescription } from "../../Models/PersonDescription";
import { IGetAppointmentByDoctorForPatientDTO } from "../../DTO/GetAppointmentByDoctorForPatientDTO";
import { UserType } from "../../Enums/userTypes";
import { MILLISECONDS_IN_DAY, MILLISECONDS_IN_WEEK, NONE, WAITING_MILLISECONDS } from "../../globalConstants";
import { IAppointment } from "../../Models/Appointment";
import { IAppointmentsByDoctorForPatient } from "../../Models/AppointmentsByDoctorForPatient";
import { IBaseModel } from "../../Models/BaseModel";
import { convertDateStringFromServerToLocal, convertNumberMonthToString, delay } from "../../Utils/functions";
import { AppointmentsService, DoctorsService } from "../../Utils/services";
import { ICalendarPageProps } from "./calendarPage.types";

const ICON_LEFT: string = "CaretSolidLeft";
const ICON_RIGHT: string = "CaretSolidRight";

export const CalendarPage = (props: ICalendarPageProps): JSX.Element => {
    const getFirstStartingWeekDate = (): Date => {
        const currentDay: Date = new Date();
        const startingWeekDate: Date = new Date();

        switch (currentDay.getDay()) {
            case 0:
                startingWeekDate.setTime(currentDay.getTime() + MILLISECONDS_IN_DAY);
                break;
            case 1:
                break;
            case 2:
                startingWeekDate.setTime(currentDay.getTime() - MILLISECONDS_IN_DAY);
                break;
            case 3:
                startingWeekDate.setTime(currentDay.getTime() - 2 * MILLISECONDS_IN_DAY);
                break;
            case 4:
                startingWeekDate.setTime(currentDay.getTime() - 3 * MILLISECONDS_IN_DAY);
                break;
            case 5:
                startingWeekDate.setTime(currentDay.getTime() - 4 * MILLISECONDS_IN_DAY);
                break;
            case 6:
                startingWeekDate.setTime(currentDay.getTime() + 2 * MILLISECONDS_IN_DAY);
                break;

        }

        startingWeekDate.setHours(9, 0, 0, 0);
        return startingWeekDate;
    }

    var userTypeString = localStorage.getItem("userType");
    const isLoggedInDoctor = userTypeString == null ? false : +userTypeString == UserType.Doctor ? true : false;

    const [doctorsToShow, setDoctorsToShow] = useState<IPersonDescription[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<IPersonDescription>();
    const [appointments, setAppointments] = useState<IAppointmentsByDoctorForPatient>();
    const [startingWeekDate, setStartingWeekDate] = useState<Date>(getFirstStartingWeekDate());
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [refreshData, setRefreshData] = useState<boolean>(false);

    useEffect(() => {
        if (!refreshData || !selectedDoctor)
            return;

        const dto: IGetAppointmentByDoctorForPatientDTO = {
            jwt: localStorage.getItem("jwt") ?? '',
            doctorId: selectedDoctor.id
        };

        setLoadingData(true);

        AppointmentsService.GetAppointmentsByDoctorForPatient(dto)
            .then(async (response) => {
                await delay(WAITING_MILLISECONDS);
                const patientAppointments: Date[] = response.data.appointments.patientAppointments.map((time: string) => new Date(time));
                const otherAppointments: Date[] = response.data.appointments.otherAppointments.map((time: string) => new Date(time));
                const newAppointments: IAppointmentsByDoctorForPatient = {
                    patientAppointments: patientAppointments,
                    otherAppointments: otherAppointments
                };
                setAppointments(newAppointments);
                setLoadingData(false);
                setRefreshData(false);
            })
            .catch(async (error) => {
                await delay(WAITING_MILLISECONDS);
                setLoadingData(false);
                setRefreshData(false);
            })

    }, [refreshData])

    useEffect(() => {
        if (props.doctors == [])
            return;

        setDoctorsToShow(props.doctors);
    }, [props.doctors]);

    useEffect(() => {
        if (!selectedDoctor)
            return;

        const dto: IGetAppointmentByDoctorForPatientDTO = {
            jwt: localStorage.getItem("jwt") ?? '',
            doctorId: selectedDoctor.id
        };

        setLoadingData(true);

        AppointmentsService.GetAppointmentsByDoctorForPatient(dto)
            .then(async (response) => {
                await delay(WAITING_MILLISECONDS);
                const patientAppointments: Date[] = response.data.appointments.patientAppointments.map((time: string) => new Date(convertDateStringFromServerToLocal(time)));
                const otherAppointments: Date[] = response.data.appointments.otherAppointments.map((time: string) => new Date(convertDateStringFromServerToLocal(time)));
                const newAppointments: IAppointmentsByDoctorForPatient = {
                    patientAppointments: patientAppointments,
                    otherAppointments: otherAppointments
                };
                setAppointments(newAppointments);
                setLoadingData(false);
            })
            .catch(async (error) => {
                await delay(WAITING_MILLISECONDS);
                setLoadingData(false);
            })

        setStartingWeekDate(getFirstStartingWeekDate());
    }, [selectedDoctor]);

    const showLeftArrow = (): boolean => {
        return startingWeekDate.getTime() != getFirstStartingWeekDate().getTime();
    }

    const showContent = (): boolean => {
        if (isLoggedInDoctor)
            return true;

        return selectedDoctor !== undefined && !loadingData;
    }

    const handleLeftArrowClicked = (): void => {
        const newStartingWeekDate = new Date();
        newStartingWeekDate.setTime(startingWeekDate.getTime() - MILLISECONDS_IN_WEEK);
        setStartingWeekDate(newStartingWeekDate);
    }

    const handleRightArrowClicked = (): void => {
        const newStartingWeekDate = new Date();
        newStartingWeekDate.setTime(startingWeekDate.getTime() + MILLISECONDS_IN_WEEK);
        setStartingWeekDate(newStartingWeekDate);
    }

    return (
        <Stack>
            {!isLoggedInDoctor && doctorsToShow.length > 0 &&
                <Stack>
                    <StackItem>
                        <Label>
                            Doctor
                        </Label>
                    </StackItem>
                    <StackItem>
                        <Multiselect
                            singleSelect={true}
                            options={doctorsToShow}
                            groupBy="specialization"
                            onSelect={(selectedList, selectedItem) => { setSelectedDoctor(selectedItem) }}
                            displayValue="name"
                        />
                    </StackItem>
                </Stack>
            }
            {showContent() &&
                <Stack>
                    <Stack horizontal horizontalAlign="center" style={{ marginTop: "2vh" }}>
                        {showLeftArrow() &&
                            <StackItem onClick={() => { handleLeftArrowClicked(); }}>
                                <Icon
                                    iconName={ICON_LEFT}
                                    style={{ fontSize: "4vh", marginRight: "3vw" }}
                                />
                            </StackItem>
                        }
                        <StackItem>
                            <Label style={{ fontSize: 20 }}>
                                {convertNumberMonthToString(startingWeekDate.getMonth()) + ", " + startingWeekDate.getDate()}
                            </Label>
                        </StackItem>
                        <StackItem onClick={() => { handleRightArrowClicked(); }}>
                            <Icon
                                iconName={ICON_RIGHT}
                                style={{ fontSize: "4vh", marginLeft: "3vw" }}
                            />
                        </StackItem>
                    </Stack>

                    <CustomCalendar
                        appointmentsPatientView={isLoggedInDoctor ? undefined : appointments}
                        appointmentsDoctorView={isLoggedInDoctor ? props.appointments : undefined}
                        startingWeekDate={startingWeekDate}
                        selectedDoctor={selectedDoctor}
                        setRefreshData={setRefreshData}
                    />
                </Stack>
            }
            {loadingData &&
                <LoadingSpinner
                    height={300}
                    width={300}
                    labelStyle={{ fontSize: 40 }}
                    wrapStackStyle={{ height: "80vh" }}
                />
            }
        </Stack>
    )
}