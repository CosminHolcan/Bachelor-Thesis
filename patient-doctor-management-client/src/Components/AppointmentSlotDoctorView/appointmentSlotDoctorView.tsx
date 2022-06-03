import { Label, Stack } from "@fluentui/react";
import { StatusAppointmentSlot } from "../../Enums/statusAppointmentSlot";
import { MILLISECONDS_IN_HALF_HOUR, MILLISECONDS_IN_HOUR } from "../../globalConstants";
import { IAppointmentForDoctor } from "../../Models/AppointmentForDoctor";
import { SlotBodyStyle, SlotDoctorViewContainerStyle, SlotLabelStyle } from "./appointmentSlotDoctorView.styles";
import { IAppointmentSlotDoctorViewProps } from "./appointmentSlotDoctorView.types";

export const AppointmentSlotDoctorView = (props: IAppointmentSlotDoctorViewProps): JSX.Element => {
    const getStatus = (): StatusAppointmentSlot => {
        const currentTime: number = new Date().getTime();
        if (props.startTime.getTime() < currentTime - currentTime % MILLISECONDS_IN_HALF_HOUR)
            return StatusAppointmentSlot.PAST_DATE;

        if (props.appointments.findIndex((appointment: IAppointmentForDoctor) => appointment.startTime.getTime() === props.startTime.getTime()) !== -1)
            return StatusAppointmentSlot.DOCTOR_CONSULTATION;

        return StatusAppointmentSlot.DOCTOR_FREE_TIME;
    }

    const getText = (): string => {
        const currentTime: number = new Date().getTime();
        if (props.startTime.getTime() < currentTime - currentTime % MILLISECONDS_IN_HALF_HOUR)
            return '';

        const index: number = props.appointments.findIndex((appointment: IAppointmentForDoctor) => appointment.startTime.getTime() === props.startTime.getTime());
        if (index === -1)
            return '';

        return props.appointments[index].patientName;
    }

    return (
        <Stack style={SlotDoctorViewContainerStyle} >
            <Stack style={SlotBodyStyle(getStatus())}>
                <Label style={SlotLabelStyle}>
                    {getText()}
                </Label>
            </Stack>
        </Stack>
    )
}