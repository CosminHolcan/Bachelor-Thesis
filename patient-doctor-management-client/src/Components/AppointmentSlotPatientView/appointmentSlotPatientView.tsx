import { Stack } from "@fluentui/react";
import { IAddAppointmentDTO } from "../../DTO/AddAppointmentDTO";
import { StatusAppointmentSlot } from "../../Enums/statusAppointmentSlot";
import { MILLISECONDS_IN_DAY, MILLISECONDS_IN_HALF_HOUR } from "../../globalConstants";
import { AppointmentsService } from "../../Utils/services";
import { SlotBodyStyle, SlotPatientViewContainerStyle } from "./appointmentSlotPatientView.styles";
import { IAppointmentSlotPatientViewProps } from "./appointmentSlotPatientView.types";

export const AppointmentSlotPatientView = (props: IAppointmentSlotPatientViewProps): JSX.Element => {
    const getStatus = (): StatusAppointmentSlot => {
        const currentTime: number = new Date().getTime();
        const tommorowDate: Date = new Date();
        tommorowDate.setTime(currentTime + MILLISECONDS_IN_DAY);
        tommorowDate.setHours(0, 0, 0, 0);
        if (props.startTime.getTime() < tommorowDate.getTime())
            return StatusAppointmentSlot.PAST_DATE;
            
        if (props.appointments.patientAppointments.findIndex((time: Date) => time.getTime() === props.startTime.getTime()) !== -1)
            return StatusAppointmentSlot.RESERVED_TO_CURRENT_PATIENT;

        if (props.appointments.otherAppointments.findIndex((time: Date) => time.getTime() === props.startTime.getTime()) !== -1)
            return StatusAppointmentSlot.OCCUPIED_BY_OTHER_PATIENT;

        return StatusAppointmentSlot.FREE_TO_RESERVE;
    }


    const handleOnClick = (): void => {
        const status: StatusAppointmentSlot = getStatus();
        if (status === StatusAppointmentSlot.PAST_DATE || status === StatusAppointmentSlot.OCCUPIED_BY_OTHER_PATIENT)
            return;

        const addAppointmentDTO: IAddAppointmentDTO = {
            jwt: localStorage.getItem("jwt") ?? '',
            appointment: {
                doctorId: props.selectedDoctor?.id ?? '',
                startTime: props.startTime
            }
        };

        AppointmentsService.AddAppointment(addAppointmentDTO)
            .then((response) => {
                props.setRefreshData(true);
            })
            .catch((error) => {

            });
    }

    return (
        <Stack style={SlotPatientViewContainerStyle} onClick={() => { handleOnClick(); }}>
            <Stack style={SlotBodyStyle(getStatus())}>
            </Stack>
        </Stack>
    )
}