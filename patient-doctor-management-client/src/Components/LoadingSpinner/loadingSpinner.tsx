import { Label, Stack, StackItem } from "@fluentui/react";
import { TailSpin } from "react-loader-spinner";
import { ILoadingSpinerProps } from "./loadingSpinner.types";

const LOADING_MESSAGE: string = "Loading";

export const LoadingSpinner = (props: ILoadingSpinerProps) => {
    return (
        <Stack horizontalAlign='center' verticalAlign='center' style={props.wrapStackStyle}>
            <StackItem>
                <TailSpin width={props.width} height={props.height} color="blue" />
            </StackItem>
            <StackItem>
                <Label style={props.labelStyle}>
                    {LOADING_MESSAGE}
                </Label>
            </StackItem>
        </Stack>
    )
}