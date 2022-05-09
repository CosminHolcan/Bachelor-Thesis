import { Label, Stack } from "@fluentui/react"
import { IAddAppointmentDTO } from "../../DTO/AddAppointmentDTO";
import { StatusAppointmentSlot } from "../../Enums/statusAppointmentSlot";
import { UserType } from "../../Enums/userTypes";
import { MILLISECONDS_IN_DAY, MILLISECONDS_IN_HALF_HOUR, MILLISECONDS_IN_HOUR } from "../../globalConstants";
import { IAppointmentForDoctor } from "../../Models/AppointmentForDoctor";
import { AppointmentsService } from "../../Utils/services";
import { IAppointmentSlotDoctorViewProps } from "./appointmentSlotDoctorView.types";

export const AppointmentSlotDoctorView = (props: IAppointmentSlotDoctorViewProps): JSX.Element => {
    const getStatus = (): StatusAppointmentSlot => {
        const currentTime: number = new Date().getTime();
        if (props.startTime.getTime() < currentTime - MILLISECONDS_IN_HOUR)
            return StatusAppointmentSlot.PAST_DATE;

        if (props.appointments.findIndex((appointment: IAppointmentForDoctor) => appointment.startTime.getTime() === props.startTime.getTime()) !== -1)
            return StatusAppointmentSlot.DOCTOR_CONSULTATION;

        return StatusAppointmentSlot.DOCTOR_FREE_TIME;
    }

    const getText = (): string => {
        const index: number = props.appointments.findIndex((appointment: IAppointmentForDoctor) => appointment.startTime.getTime() === props.startTime.getTime());
        if (index === -1)
            return '';

        return props.appointments[index].patientName;
    }

    return (
        <Stack style={{ border: "2px dotted gray" }} >
            <Stack style={{
                backgroundColor: getStatus(),
                height: "4vh",
                width: "10vw",
                marginBottom: "0.7vh",
                marginTop: "0.7vh",
                marginRight: "0.5vw",
                marginLeft: "0.5vw",
                borderRadius: 10
            }}>
                <Label style={{ color: "black", textAlign: "center" }}>
                    {getText()}
                </Label>
            </Stack>

        </Stack>
    )
}