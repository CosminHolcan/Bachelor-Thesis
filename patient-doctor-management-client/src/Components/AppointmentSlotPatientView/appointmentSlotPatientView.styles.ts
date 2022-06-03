import React from "react";

export const SlotPatientViewContainerStyle: React.CSSProperties = {
    border: "2px dotted gray"
}

export const SlotBodyStyle = (backgroundColor: string): React.CSSProperties => ({
    backgroundColor: backgroundColor,
    height: "4vh",
    width: "10vw",
    marginBottom: "0.7vh",
    marginTop: "0.7vh",
    marginRight: "0.5vw",
    marginLeft: "0.5vw",
    borderRadius: 10
})