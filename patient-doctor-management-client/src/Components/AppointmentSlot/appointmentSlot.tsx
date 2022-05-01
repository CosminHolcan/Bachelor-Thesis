import { Stack } from "@fluentui/react"
import { IAppointmentSlotProps } from "./appointmentSlot.types"

export const AppointmentSlot = (props: IAppointmentSlotProps): JSX.Element => {
    return (
        <Stack style={{border: "2px dotted gray"}}>
            <Stack style={{ backgroundColor: props.color, height: "4vh", width: "10vw", marginBottom: "0.7vh",marginTop: "0.7vh", marginRight: "0.5vw",marginLeft: "0.5vw", borderRadius: 10 }}>
                Appointment slot
            </Stack>
        </Stack>
    )
}