import { Pivot, PivotItem, Stack, StackItem } from "@fluentui/react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "../../Enums/menuItem";
import { UserType } from "../../Enums/userTypes";
import { AdminPage } from "../Admin/adminPage";
import { styleContentArea, styleStack } from "./userPage.style";

const MY_ACCOUNT_PAGE_ICON: string = "Home";
const ADMIN_PAGE_ICCON: string = "Admin";
const LOGOUT_ICON: string = "Leave";

export const UserPage = (): JSX.Element => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState<string>(MenuItem.MyAccount);

    const getMenuItems = (): MenuItem[] => {
        const result: MenuItem[] = [MenuItem.MyAccount];
        var userType = null;
        var userTypeString = localStorage.getItem("userType");

        if (userTypeString != null)
            userType = +userTypeString;

        switch (userType) {
            case UserType.Administrator:
                result.push(MenuItem.Admin);
                break;
            case UserType.Doctor:
                result.concat([MenuItem.PrescribeRecipes]);
                break;
            case UserType.Patient:
                result.concat([MenuItem.SeeMyRecipes]);
                break;
        }

        result.push(MenuItem.Logout);
        return result;
    };

    const getPivotItem = (tabName: MenuItem): React.ReactNode => {
        switch (tabName) {
            case MenuItem.MyAccount:
                return (
                    <PivotItem key={tabName} itemKey={tabName} headerText={tabName} itemIcon={MY_ACCOUNT_PAGE_ICON} headerButtonProps={{style: {fontSize: 20}}}>
                        <div>
                            My Account Page
                        </div>
                    </PivotItem>
                );
            case MenuItem.Admin:
                return (
                    <PivotItem key={tabName} itemKey={tabName} headerText={tabName} itemIcon={ADMIN_PAGE_ICCON} headerButtonProps={{style: {fontSize: 20}}}>
                        <AdminPage />
                    </PivotItem>
                );
            case MenuItem.Logout:
                return (
                    <PivotItem key={tabName} itemKey={tabName} headerText={tabName} itemIcon={LOGOUT_ICON} headerButtonProps={{style: {marginLeft: "73vw", fontSize: 20}}}/>
                )
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userType");
        localStorage.removeItem("jwt");
        navigate("/login");
    }

    const onPivotItemClicked = (item: PivotItem | undefined): void => {
        if (item === undefined)
            return;

        if (item.props.itemKey === MenuItem.Logout) {
            handleLogout();
            return;
        }

        if (selectedTab === item.props.itemKey)
            return;

        item.props.itemKey && setSelectedTab(item.props.itemKey);
    };

    return (
        <Stack horizontal className={styleStack}>
            <Pivot selectedKey={selectedTab} onLinkClick={onPivotItemClicked} className={styleContentArea}>
                {getMenuItems().map((item) => getPivotItem(item))}
            </Pivot>
        </Stack>
    );
}