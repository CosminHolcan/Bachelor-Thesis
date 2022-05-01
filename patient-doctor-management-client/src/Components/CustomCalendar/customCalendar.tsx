import { Stack, StackItem } from "@fluentui/react"
import { useEffect, useState } from "react";
import { MILLISECONDS_IN_DAY, MILLISECONDS_IN_HALF_HOUR } from "../../globalConstants";
import { AppointmentSlot } from "../AppointmentSlot/appointmentSlot"
import { ICustomCalendarProps } from "./customCalendar.types"

export const CustomCalendar = (props: ICustomCalendarProps): JSX.Element => {
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

    const getAppointmentSlotsForDay = (workDay: Date): JSX.Element => {
        const doctorWithAppointments = {
            selectedDoctor: props.selectedDoctor,
            appointments: props.appointments
        }

        return (
            <StackItem>
                <AppointmentSlot
                    startTime={new Date(workDay.getTime())}
                    {...doctorWithAppointments}
                />
                <AppointmentSlot
                    startTime={new Date(workDay.getTime() + MILLISECONDS_IN_HALF_HOUR)}
                    {...doctorWithAppointments}
                />
                <AppointmentSlot
                    startTime={new Date(workDay.getTime() + 2 * MILLISECONDS_IN_HALF_HOUR)}
                    {...doctorWithAppointments}
                />
                <AppointmentSlot
                    startTime={new Date(workDay.getTime() + 3 * MILLISECONDS_IN_HALF_HOUR)}
                    {...doctorWithAppointments}
                />
                <AppointmentSlot
                    startTime={new Date(workDay.getTime() + 4 * MILLISECONDS_IN_HALF_HOUR)}
                    {...doctorWithAppointments}
                />
                <AppointmentSlot
                    startTime={new Date(workDay.getTime() + 5 * MILLISECONDS_IN_HALF_HOUR)}
                    {...doctorWithAppointments}
                />
                <AppointmentSlot
                    startTime={new Date(workDay.getTime() + 6 * MILLISECONDS_IN_HALF_HOUR)}
                    {...doctorWithAppointments}
                />
                <AppointmentSlot
                    startTime={new Date(workDay.getTime() + 7 * MILLISECONDS_IN_HALF_HOUR)}
                    {...doctorWithAppointments}
                />
                <AppointmentSlot
                    startTime={new Date(workDay.getTime() + 8 * MILLISECONDS_IN_HALF_HOUR)}
                    {...doctorWithAppointments}
                />
                <AppointmentSlot
                    startTime={new Date(workDay.getTime() + 9 * MILLISECONDS_IN_HALF_HOUR)}
                    {...doctorWithAppointments}
                />
                <AppointmentSlot
                    startTime={new Date(workDay.getTime() + 10 * MILLISECONDS_IN_HALF_HOUR)}
                    {...doctorWithAppointments}
                />
                <AppointmentSlot
                    startTime={new Date(workDay.getTime() + 11 * MILLISECONDS_IN_HALF_HOUR)}
                    {...doctorWithAppointments}
                />
                <AppointmentSlot
                    startTime={new Date(workDay.getTime() + 12 * MILLISECONDS_IN_HALF_HOUR)}
                    {...doctorWithAppointments}
                />
                <AppointmentSlot
                    startTime={new Date(workDay.getTime() + 13 * MILLISECONDS_IN_HALF_HOUR)}
                    {...doctorWithAppointments}
                />
                <AppointmentSlot
                    startTime={new Date(workDay.getTime() + 14 * MILLISECONDS_IN_HALF_HOUR)}
                    {...doctorWithAppointments}
                />
                <AppointmentSlot
                    startTime={new Date(workDay.getTime() + 15 * MILLISECONDS_IN_HALF_HOUR)}
                    {...doctorWithAppointments}
                />
            </StackItem>
        )
    }

    return (
        <Stack horizontal horizontalAlign="center" style={{ marginTop: "4vh" }}>
            {weekDays.length > 0 && getAppointmentSlotsForDay(weekDays[0])}
            {weekDays.length > 0 && getAppointmentSlotsForDay(weekDays[1])}
            {weekDays.length > 0 && getAppointmentSlotsForDay(weekDays[2])}
            {weekDays.length > 0 && getAppointmentSlotsForDay(weekDays[3])}
            {weekDays.length > 0 && getAppointmentSlotsForDay(weekDays[4])}
        </Stack>
    )
}