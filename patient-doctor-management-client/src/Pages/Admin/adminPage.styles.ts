import { IStackTokens } from "@fluentui/react";
import React from "react";

export const styleStack: IStackTokens = {
    childrenGap: "10vw"
};

export const LabelOptionStyle = (color: string): React.CSSProperties => ({
    color: color,
    fontFamily: "Grotesco",
    fontSize: "17px"
})

export const LabelCategoryStyle: React.CSSProperties = {
    fontFamily: "Grotesco",
    fontSize: "17px",
    color: "blue",
    marginBottom: "3vh"
}

export const ErrorLabelStyle: React.CSSProperties = {
    color: "red",
    marginTop: "5vh",
    marginLeft: "10vw",
    fontSize: "15px"
}