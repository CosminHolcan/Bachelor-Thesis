import { Label, Stack, StackItem } from "@fluentui/react"
import { useEffect, useState } from "react";
import { MILLISECONDS_IN_DAY, MILLISECONDS_IN_HALF_HOUR } from "../../globalConstants";
import { AppointmentSlotForPatientView } from "../AppointmentSlot/appointmentSlot"
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
            appointments: props.appointments ?? {
                patientAppointments: [], otherAppointments: [],
            }
        }

        return (
            <StackItem>
                <Stack style={{ border: "2px dotted gray" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                        <Label style={{ color: "black", textAlign: "center" }}>
                            {workDay.toDateString()}
                        </Label>
                    </Stack>
                </Stack>
                <AppointmentSlotForPatientView
                    startTime={new Date(workDay.getTime())}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotForPatientView
                    startTime={new Date(workDay.getTime() + MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotForPatientView
                    startTime={new Date(workDay.getTime() + 2 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotForPatientView
                    startTime={new Date(workDay.getTime() + 3 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotForPatientView
                    startTime={new Date(workDay.getTime() + 4 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotForPatientView
                    startTime={new Date(workDay.getTime() + 5 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotForPatientView
                    startTime={new Date(workDay.getTime() + 6 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotForPatientView
                    startTime={new Date(workDay.getTime() + 7 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotForPatientView
                    startTime={new Date(workDay.getTime() + 8 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotForPatientView
                    startTime={new Date(workDay.getTime() + 9 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotForPatientView
                    startTime={new Date(workDay.getTime() + 10 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotForPatientView
                    startTime={new Date(workDay.getTime() + 11 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotForPatientView
                    startTime={new Date(workDay.getTime() + 12 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotForPatientView
                    startTime={new Date(workDay.getTime() + 13 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotForPatientView
                    startTime={new Date(workDay.getTime() + 14 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
                <AppointmentSlotForPatientView
                    startTime={new Date(workDay.getTime() + 15 * MILLISECONDS_IN_HALF_HOUR)}
                    setRefreshData={props.setRefreshData}
                    {...doctorWithAppointments}
                />
            </StackItem>
        )
    }

    const getFirstColumn = (): JSX.Element => {
        return (
            <StackItem>
                <Stack style={{ borderRight: "2px dotted gray", borderBottom: "2px dotted gray", borderTop: "2px dotted white" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                    </Stack>
                </Stack>
                <Stack style={{ border: "2px dotted gray" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                        <Label style={{ color: "black", textAlign: "center" }}>
                            9:00-9:30
                        </Label>
                    </Stack>
                </Stack>
                <Stack style={{ border: "2px dotted gray" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                        <Label style={{ color: "black", textAlign: "center" }}>
                            9:30-10:00
                        </Label>
                    </Stack>
                </Stack>
                <Stack style={{ border: "2px dotted gray" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                        <Label style={{ color: "black", textAlign: "center" }}>
                            10:00-10:30
                        </Label>
                    </Stack>
                </Stack>
                <Stack style={{ border: "2px dotted gray" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                        <Label style={{ color: "black", textAlign: "center" }}>
                            10:30-11:00
                        </Label>
                    </Stack>
                </Stack>
                <Stack style={{ border: "2px dotted gray" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                        <Label style={{ color: "black", textAlign: "center" }}>
                            11:00-11:30
                        </Label>
                    </Stack>
                </Stack>
                <Stack style={{ border: "2px dotted gray" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                        <Label style={{ color: "black", textAlign: "center" }}>
                            11:30-12:00
                        </Label>
                    </Stack>
                </Stack>
                <Stack style={{ border: "2px dotted gray" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                        <Label style={{ color: "black", textAlign: "center" }}>
                            12:00-12:30
                        </Label>
                    </Stack>
                </Stack>
                <Stack style={{ border: "2px dotted gray" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                        <Label style={{ color: "black", textAlign: "center" }}>
                            12:30-13:00
                        </Label>
                    </Stack>
                </Stack>
                <Stack style={{ border: "2px dotted gray" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                        <Label style={{ color: "black", textAlign: "center" }}>
                            13:00-13:30
                        </Label>
                    </Stack>
                </Stack>
                <Stack style={{ border: "2px dotted gray" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                        <Label style={{ color: "black", textAlign: "center" }}>
                            13:30-14:00
                        </Label>
                    </Stack>
                </Stack>
                <Stack style={{ border: "2px dotted gray" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                        <Label style={{ color: "black", textAlign: "center" }}>
                            14:00-14:30
                        </Label>
                    </Stack>
                </Stack>
                <Stack style={{ border: "2px dotted gray" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                        <Label style={{ color: "black", textAlign: "center" }}>
                            14:30-15:00
                        </Label>
                    </Stack>
                </Stack>
                <Stack style={{ border: "2px dotted gray" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                        <Label style={{ color: "black", textAlign: "center" }}>
                            15:00-15:30
                        </Label>
                    </Stack>
                </Stack>
                <Stack style={{ border: "2px dotted gray" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                        <Label style={{ color: "black", textAlign: "center" }}>
                            15:30-16:00
                        </Label>
                    </Stack>
                </Stack>
                <Stack style={{ border: "2px dotted gray" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                        <Label style={{ color: "black", textAlign: "center" }}>
                            16:00-16:30
                        </Label>
                    </Stack>
                </Stack>
                <Stack style={{ border: "2px dotted gray" }} >
                    <Stack style={{
                        backgroundColor: "dark gray",
                        height: "4vh",
                        width: "10vw",
                        marginBottom: "0.7vh",
                        marginTop: "0.7vh",
                        marginRight: "0.5vw",
                        marginLeft: "0.5vw",
                        borderRadius: 10
                    }}>
                        <Label style={{ color: "black", textAlign: "center" }}>
                            16:30-17:00
                        </Label>
                    </Stack>
                </Stack>
            </StackItem>
        )
    }

    return (
        <Stack horizontal horizontalAlign="center" style={{ marginTop: "4vh" }}>
            {getFirstColumn()}
            {weekDays.length > 0 && getAppointmentSlotsForDay(weekDays[0])}
            {weekDays.length > 0 && getAppointmentSlotsForDay(weekDays[1])}
            {weekDays.length > 0 && getAppointmentSlotsForDay(weekDays[2])}
            {weekDays.length > 0 && getAppointmentSlotsForDay(weekDays[3])}
            {weekDays.length > 0 && getAppointmentSlotsForDay(weekDays[4])}
        </Stack>
    )
}