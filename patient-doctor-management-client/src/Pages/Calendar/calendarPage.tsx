import { Stack } from "@fluentui/react";
import Multiselect from "multiselect-react-dropdown";
import { Icon, Label, StackItem } from "office-ui-fabric-react";
import { useEffect, useState } from "react";
import { CustomCalendar } from "../../Components/CustomCalendar/customCalendar";
import { LoadingSpinner } from "../../Components/LoadingSpinner/loadingSpinner";
import { IGetAppointmentByDoctorForPatientDTO } from "../../DTO/GetAppointmentByDoctorForPatientDTO";
import { UserType } from "../../Enums/userTypes";
import { MILLISECONDS_IN_DAY, MILLISECONDS_IN_WEEK, WAITING_MILLISECONDS } from "../../globalConstants";
import { IAppointmentsByDoctorForPatient } from "../../Models/AppointmentsByDoctorForPatient";
import { IPersonDescription } from "../../Models/PersonDescription";
import { convertDateStringFromServerToLocal, convertNumberMonthToString, delay } from "../../Utils/functions";
import { AppointmentsService } from "../../Utils/services";
import { ControlStartWeekDayStyle, DoctorDropdownContainerStyle, LabelStartWeekDayStyle, LeftArrowStyle, RightArrowStyle } from "./calendarPage.styles";
import { ICalendarPageProps } from "./calendarPage.types";

const ICON_LEFT_Arrow: string = "CaretSolidLeft";
const ICON_RIGHT_ARROW: string = "CaretSolidRight";

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
                if (props.isLoggedInDoctor && currentDay.getHours() < 17)
                    startingWeekDate.setTime(currentDay.getTime() - 4 * MILLISECONDS_IN_DAY);
                else
                    startingWeekDate.setTime(currentDay.getTime() + 3 * MILLISECONDS_IN_DAY);
                break;
            case 6:
                startingWeekDate.setTime(currentDay.getTime() + 2 * MILLISECONDS_IN_DAY);
                break;

        }

        startingWeekDate.setHours(9, 0, 0, 0);
        return startingWeekDate;
    }

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
                const patientAppointments: Date[] = response.data.appointments.patientAppointments.map((time: string) => new Date(convertDateStringFromServerToLocal(time)));
                const otherAppointments: Date[] = response.data.appointments.otherAppointments.map((time: string) => new Date(convertDateStringFromServerToLocal(time)));
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
        if (props.isLoggedInDoctor)
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
            {!props.isLoggedInDoctor && doctorsToShow.length > 0 &&
                <Stack style={DoctorDropdownContainerStyle}>
                    <Label>
                        Doctor
                    </Label>
                    <Multiselect
                        placeholder="Select a doctor"
                        singleSelect={true}
                        options={doctorsToShow}
                        groupBy="specialization"
                        onSelect={(selectedList, selectedItem) => { setSelectedDoctor(selectedItem) }}
                        displayValue="name"
                    />
                </Stack>
            }
            {showContent() &&
                <Stack>
                    <Stack horizontal horizontalAlign="center" style={ControlStartWeekDayStyle}>
                        {showLeftArrow() &&
                            <StackItem onClick={() => { handleLeftArrowClicked(); }}>
                                <Icon
                                    iconName={ICON_LEFT_Arrow}
                                    style={LeftArrowStyle}
                                />
                            </StackItem>
                        }
                        <StackItem>
                            <Label style={LabelStartWeekDayStyle}>
                                {convertNumberMonthToString(startingWeekDate.getMonth()) + ", " + startingWeekDate.getDate()}
                            </Label>
                        </StackItem>
                        <StackItem onClick={() => { handleRightArrowClicked(); }}>
                            <Icon
                                iconName={ICON_RIGHT_ARROW}
                                style={RightArrowStyle}
                            />
                        </StackItem>
                    </Stack>

                    <CustomCalendar
                        appointmentsPatientView={props.isLoggedInDoctor ? undefined : appointments}
                        appointmentsDoctorView={props.isLoggedInDoctor ? props.appointments : undefined}
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