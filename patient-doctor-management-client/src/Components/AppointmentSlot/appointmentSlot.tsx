import { Label, Stack } from "@fluentui/react"
import { IAddAppointmentDTO } from "../../DTO/AddAppointmentDTO";
import { StatusAppointmentSlot } from "../../Enums/statusAppointmentSlot";
import { UserType } from "../../Enums/userTypes";
import { MILLISECONDS_IN_DAY } from "../../globalConstants";
import { AppointmentsService } from "../../Utils/services";
import { IAppointmentSlotForPatientViewProps } from "./appointmentSlot.types"

export const AppointmentSlotForPatientView = (props: IAppointmentSlotForPatientViewProps): JSX.Element => {
    const getStatus = (): StatusAppointmentSlot => {
        if (props.appointments.patientAppointments.findIndex((time: Date) => time.getTime() === props.startTime.getTime()) !== -1)
            return StatusAppointmentSlot.RESERVED_TO_CURRENT_PATIENT;

        const currentTime: number = new Date().getTime();
        if (props.startTime.getTime() < currentTime + MILLISECONDS_IN_DAY / 2)
            return StatusAppointmentSlot.PAST_DATE;

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
        <Stack style={{ border: "2px dotted gray" }} onClick={() => { handleOnClick(); }}>
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
            </Stack>
        </Stack>
    )
}