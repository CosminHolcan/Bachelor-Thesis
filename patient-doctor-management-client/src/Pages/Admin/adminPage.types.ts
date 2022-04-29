import React from "react";

export interface IAdministrationFeatureProps {
    onSuccess: () => void;
    errorMessage: string;
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}