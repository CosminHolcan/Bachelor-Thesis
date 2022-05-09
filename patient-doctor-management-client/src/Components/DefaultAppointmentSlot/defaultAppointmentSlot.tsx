import { Label, Stack } from "@fluentui/react"
import { IAddAppointmentDTO } from "../../DTO/AddAppointmentDTO";
import { StatusAppointmentSlot } from "../../Enums/statusAppointmentSlot";
import { UserType } from "../../Enums/userTypes";
import { MILLISECONDS_IN_DAY } from "../../globalConstants";
import { AppointmentsService } from "../../Utils/services";
import { IDefaultAppointmentSlot } from "./defaultAppointmentSlot.types";

export const DefaultAppointmentSlot = (props: IDefaultAppointmentSlot): JSX.Element => {
    return (
        <Stack style={props.style}>
            <Stack style={{
                height: "4vh",
                width: "10vw",
                marginBottom: "0.7vh",
                marginTop: "0.7vh",
                marginRight: "0.5vw",
                marginLeft: "0.5vw",
                borderRadius: 10
            }}>
                {props.text &&
                    <Label style={{ color: "black", textAlign: "center" }}>
                        {props.text}
                    </Label>
                }
            </Stack>

        </Stack>
    )
}