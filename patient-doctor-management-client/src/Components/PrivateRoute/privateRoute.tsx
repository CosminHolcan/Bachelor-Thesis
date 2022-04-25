import { Navigate } from "react-router-dom";
import { IPrivateRouteProps } from "./privateRoute.types";

export default function PrivateRoute({ isAuthenticated, authenticationPath, outlet }: IPrivateRouteProps) {
    if (isAuthenticated) {
        return outlet;
    } else {
        return <Navigate to={{ pathname: authenticationPath }} />;
    }
};