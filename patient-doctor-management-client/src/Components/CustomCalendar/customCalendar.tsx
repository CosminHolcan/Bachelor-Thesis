import { Label, Stack, StackItem } from "@fluentui/react"
import { useEffect, useState } from "react";
import { UserType } from "../../Enums/userTypes";
import { MILLISECONDS_IN_DAY, MILLISECONDS_IN_HALF_HOUR } from "../../globalConstants";
import { AppointmentSlotDoctorView } from "../AppointmentSlotDoctorView/appointmentSlotDoctorView";
import { AppointmentSlotPatientView } from "../AppointmentSlotPatientView/appointmentSlotPatientView"
import { DefaultAppointmentSlot } from "../DefaultAppointmentSlot/defaultAppointmentSlot";
import { normalSlotStyle, topLeftSlotStyle } from "./customCalendar.styles";
import { ICustomCalendarProps } from "./customCalendar.types"

export const CustomCalendar = (props: ICustomCalendarProps): JSX.Element => {
    var userTypeString = localStorage.getItem("userType");
    const isLoggedInDoctor = userTypeString == null ? false : +userTypeString == UserType.Doctor ? true : false;

    const [weekDays, setWeekDays] = useState<Date[]>([]);

    useEffect(() => {
        if (!props.startingWeekDate)
            return;

        const newWeekDays: Date[] = [props.startingWeekDate];

        for (var i = 1; i <= 4; i++) {
            const workDay: Date = new Date();
            workDay.setTime(props.startingWeekDate.getTime() + i * MILLISECONDS_IN_DAY);
            newWeekDays.push(workDay);
        }

        setWeekDays(newWeekDays);
    }, [props.startingWeekDate]);

    const getAppointmentSlotsForDayPatientView = (workDay: Date): JSX.Element => {
        const doctorWithAppointments = {
            selectedDoctor: props.selectedDoctor,
            appointments: props.appointmentsPatientView ?? {
                patientAppointments: [], otherAppointments: [],
            }
        }

        return (
            <StackItem>
                <DefaultAppointmentSlot style={normalSlotStyle} text={workDay.toDateString()} />
                <AppointmentSlotPatientView
                    startTime={new Date(workDay.getTime())}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotPatientView
                    startTime={new Date(workDay.getTime() + MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotPatientView
                    startTime={new Date(workDay.getTime() + 2 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotPatientView
                    startTime={new Date(workDay.getTime() + 3 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotPatientView
                    startTime={new Date(workDay.getTime() + 4 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotPatientView
                    startTime={new Date(workDay.getTime() + 5 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotPatientView
                    startTime={new Date(workDay.getTime() + 6 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotPatientView
                    startTime={new Date(workDay.getTime() + 7 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotPatientView
                    startTime={new Date(workDay.getTime() + 8 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotPatientView
                    startTime={new Date(workDay.getTime() + 9 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotPatientView
                    startTime={new Date(workDay.getTime() + 10 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotPatientView
                    startTime={new Date(workDay.getTime() + 11 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotPatientView
                    startTime={new Date(workDay.getTime() + 12 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotPatientView
                    startTime={new Date(workDay.getTime() + 13 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotPatientView
                    startTime={new Date(workDay.getTime() + 14 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotPatientView
                    startTime={new Date(workDay.getTime() + 15 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
            </StackItem>
        )
    }

    const getAppointmentSlotsForDayDoctorView = (workDay: Date): JSX.Element => {

        return (
            <StackItem>
                <DefaultAppointmentSlot style={normalSlotStyle} text={workDay.toDateString()} />
                <AppointmentSlotDoctorView
                    startTime={new Date(workDay.getTime())}
                    appointments={props.appointmentsDoctorView ?? []}
                />
                <AppointmentSlotDoctorView
                    startTime={new Date(workDay.getTime() + MILLISECONDS_IN_HALF_HOUR)}
                    appointments={props.appointmentsDoctorView ?? []}
                />
                <AppointmentSlotDoctorView
                    startTime={new Date(workDay.getTime() + 2 * MILLISECONDS_IN_HALF_HOUR)}
                    appointments={props.appointmentsDoctorView ?? []}
                />
                <AppointmentSlotDoctorView
                    startTime={new Date(workDay.getTime() + 3 * MILLISECONDS_IN_HALF_HOUR)}
                    appointments={props.appointmentsDoctorView ?? []}
                />
                <AppointmentSlotDoctorView
                    startTime={new Date(workDay.getTime() + 4 * MILLISECONDS_IN_HALF_HOUR)}
                    appointments={props.appointmentsDoctorView ?? []}
                />
                <AppointmentSlotDoctorView
                    startTime={new Date(workDay.getTime() + 5 * MILLISECONDS_IN_HALF_HOUR)}
                    appointments={props.appointmentsDoctorView ?? []}
                />
                <AppointmentSlotDoctorView
                    startTime={new Date(workDay.getTime() + 6 * MILLISECONDS_IN_HALF_HOUR)}
                    appointments={props.appointmentsDoctorView ?? []}
                />
                <AppointmentSlotDoctorView
                    startTime={new Date(workDay.getTime() + 7 * MILLISECONDS_IN_HALF_HOUR)}
                    appointments={props.appointmentsDoctorView ?? []}
                />
                <AppointmentSlotDoctorView
                    startTime={new Date(workDay.getTime() + 8 * MILLISECONDS_IN_HALF_HOUR)}
                    appointments={props.appointmentsDoctorView ?? []}
                />
                <AppointmentSlotDoctorView
                    startTime={new Date(workDay.getTime() + 9 * MILLISECONDS_IN_HALF_HOUR)}
                    appointments={props.appointmentsDoctorView ?? []}
                />
                <AppointmentSlotDoctorView
                    startTime={new Date(workDay.getTime() + 10 * MILLISECONDS_IN_HALF_HOUR)}
                    appointments={props.appointmentsDoctorView ?? []}
                />
                <AppointmentSlotDoctorView
                    startTime={new Date(workDay.getTime() + 11 * MILLISECONDS_IN_HALF_HOUR)}
                    appointments={props.appointmentsDoctorView ?? []}
                />
                <AppointmentSlotDoctorView
                    startTime={new Date(workDay.getTime() + 12 * MILLISECONDS_IN_HALF_HOUR)}
                    appointments={props.appointmentsDoctorView ?? []}
                />
                <AppointmentSlotDoctorView
                    startTime={new Date(workDay.getTime() + 13 * MILLISECONDS_IN_HALF_HOUR)}
                    appointments={props.appointmentsDoctorView ?? []}
                />
                <AppointmentSlotDoctorView
                    startTime={new Date(workDay.getTime() + 14 * MILLISECONDS_IN_HALF_HOUR)}
                    appointments={props.appointmentsDoctorView ?? []}
                />
                <AppointmentSlotDoctorView
                    startTime={new Date(workDay.getTime() + 15 * MILLISECONDS_IN_HALF_HOUR)}
                    appointments={props.appointmentsDoctorView ?? []}
                />
            </StackItem>
        )
    }

    const getCalendarContent = (): JSX.Element => {
        if (isLoggedInDoctor) {
            return (
                <>
                    {weekDays.length > 0 && getAppointmentSlotsForDayDoctorView(weekDays[0])}
                    {weekDays.length > 0 && getAppointmentSlotsForDayDoctorView(weekDays[1])}
                    {weekDays.length > 0 && getAppointmentSlotsForDayDoctorView(weekDays[2])}
                    {weekDays.length > 0 && getAppointmentSlotsForDayDoctorView(weekDays[3])}
                    {weekDays.length > 0 && getAppointmentSlotsForDayDoctorView(weekDays[4])}
                </>
            );
        }

        return (
            <>
                {weekDays.length > 0 && getAppointmentSlotsForDayPatientView(weekDays[0])}
                {weekDays.length > 0 && getAppointmentSlotsForDayPatientView(weekDays[1])}
                {weekDays.length > 0 && getAppointmentSlotsForDayPatientView(weekDays[2])}
                {weekDays.length > 0 && getAppointmentSlotsForDayPatientView(weekDays[3])}
                {weekDays.length > 0 && getAppointmentSlotsForDayPatientView(weekDays[4])}
            </>
        );
    }

    const getFirstColumn = (): JSX.Element => {
        return (
            <StackItem>
                <DefaultAppointmentSlot style={topLeftSlotStyle} />
                <DefaultAppointmentSlot text="9:00 - 9:30" style={normalSlotStyle} />
                <DefaultAppointmentSlot text="9:30 - 10:00" style={normalSlotStyle} />
                <DefaultAppointmentSlot text="10:00 - 10:30" style={normalSlotStyle} />
                <DefaultAppointmentSlot text="10:30 - 11:00" style={normalSlotStyle} />
                <DefaultAppointmentSlot text="11:00 - 11:30" style={normalSlotStyle} />
                <DefaultAppointmentSlot text="11:30 - 12:00" style={normalSlotStyle} />
                <DefaultAppointmentSlot text="12:00 - 12:30" style={normalSlotStyle} />
                <DefaultAppointmentSlot text="12:30 - 13:00" style={normalSlotStyle} />
                <DefaultAppointmentSlot text="13:00 - 13:30" style={normalSlotStyle} />
                <DefaultAppointmentSlot text="13:30 - 14:00" style={normalSlotStyle} />
                <DefaultAppointmentSlot text="14:00 - 14:30" style={normalSlotStyle} />
                <DefaultAppointmentSlot text="14:30 - 15:00" style={normalSlotStyle} />
                <DefaultAppointmentSlot text="15:00 - 15:30" style={normalSlotStyle} />
                <DefaultAppointmentSlot text="15:30 - 16:00" style={normalSlotStyle} />
                <DefaultAppointmentSlot text="16:00 - 16:30" style={normalSlotStyle} />
                <DefaultAppointmentSlot text="16:30 - 17:00" style={normalSlotStyle} />
            </StackItem>
        )
    }

    return (
        <Stack horizontal horizontalAlign="center" style={{ marginTop: "4vh" }}>
            {getFirstColumn()}
            {getCalendarContent()}
        </Stack>
    )
}