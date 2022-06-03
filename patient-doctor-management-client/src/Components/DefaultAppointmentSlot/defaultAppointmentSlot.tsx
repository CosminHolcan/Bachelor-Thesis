import { Label, Stack } from "@fluentui/react";
import { DefaultSlotBodyStyle, DefaultSlotLabelStyle } from "./defaultAppointmentSlot.styles";
import { IDefaultAppointmentSlot } from "./defaultAppointmentSlot.types";

export const DefaultAppointmentSlot = (props: IDefaultAppointmentSlot): JSX.Element => {
    return (
        <Stack style={props.style}>
            <Stack style={DefaultSlotBodyStyle}>
                {props.text &&
                    <Label style={DefaultSlotLabelStyle}>
                        {props.text}
                    </Label>
                }
            </Stack>

        </Stack>
    )
}