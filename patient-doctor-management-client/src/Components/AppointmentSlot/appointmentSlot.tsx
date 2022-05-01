import { Label, Stack } from "@fluentui/react"
import { IAppointmentSlotProps } from "./appointmentSlot.types"

const OCCUPIED_COLOR: string = "red";
const FREE_COLOR: string = "blue";

export const AppointmentSlot = (props: IAppointmentSlotProps): JSX.Element => {
    const isOccupied = (): boolean => {
        return props.appointments?.findIndex((appointment) => appointment.startTime.getTime() == props.startTime?.getTime()) !== -1;
    }

    const handleOnClick = (): void => {
        if (isOccupied())
            return;

        console.log(props.startTime);
    }

    return (
        <Stack style={{ border: "2px dotted gray" }} onClick={() => { handleOnClick(); }}>
            <Stack style={{
                backgroundColor: isOccupied() ? OCCUPIED_COLOR : FREE_COLOR,
                height: "4vh",
                width: "10vw",
                marginBottom: "0.7vh",
                marginTop: "0.7vh",
                marginRight: "0.5vw",
                marginLeft: "0.5vw",
                borderRadius: 10
            }}>
                <Label style={{ color: "white" }}>
                    {isOccupied() ? "Occupied" : "Free"}
                </Label>
            </Stack>
        </Stack>
    )
}