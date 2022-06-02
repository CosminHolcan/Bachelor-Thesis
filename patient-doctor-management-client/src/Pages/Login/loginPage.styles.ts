import React from "react";

export const LoginContainerStyle: React.CSSProperties = {
    backgroundColor: "#0EBFE9",
    height: "100vh"
}

export const LoginFormContainerStyle: React.CSSProperties = {
    backgroundColor: "white",
    height: "60vh",
    width: "30vw",
    borderRadius: "20px"
}

export const EmailContainerStyle: React.CSSProperties = {
    height: "5vh",
    width: "20vw",
    marginRight: "5vw",
    marginLeft: "5vw",
    marginTop: "10vh"
}

export const LabelStyle: React.CSSProperties = {
    fontFamily: "Grotesco",
    fontSize: "20px" 
}

export const PasswordContainerStyle: React.CSSProperties = {
    height: "5vh",
    width: "20vw",
    marginRight: "5vw",
    marginLeft: "5vw",
    marginTop: "8vh",
    marginBottom: "12vh"
}

export const ButtonSignupStyle: React.CSSProperties = {
    borderRadius: "20px",
    borderWidth: 0,
    width: "10vw",
    height: "4vh",
    backgroundColor: "#0EBFE9",
    fontFamily: "Grotesco",
    fontSize: 15,
    color: "white"
}

export const ButtonLoginStyle: React.CSSProperties = {
    ...ButtonSignupStyle,
    marginRight: "2vw"
}