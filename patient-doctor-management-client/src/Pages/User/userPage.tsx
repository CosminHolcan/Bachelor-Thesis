import { Stack, StackItem } from "@fluentui/react"
import { useNavigate } from "react-router-dom";

export const UserPage = (): JSX.Element => {
    const navigate = useNavigate();

    const redirectLoginPage = () => {
        localStorage.removeItem("userType");
        navigate("/login");
    }

    return (
        <Stack>
            <p>User page yey you are log in</p>
            <button onClick={redirectLoginPage}>Logout</button>
        </Stack>
    )
}