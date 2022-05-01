import { Stack } from "@fluentui/react";
import Multiselect from "multiselect-react-dropdown";
import { Label, StackItem } from "office-ui-fabric-react";
import { useEffect, useState } from "react";
import { AppointmentSlot } from "../../Components/AppointmentSlot/appointmentSlot";
import { IDoctorDTO } from "../../DTO/DoctorDTO";
import { UserType } from "../../Enums/userTypes";
import { NONE } from "../../globalConstants";
import { IBaseModel } from "../../Models/BaseModel";
import { DoctorsService } from "../../Utils/services";
import { ICalendarPageProps } from "./calendarPage.types";

export const CalendarPage = (props: ICalendarPageProps): JSX.Element => {
    var userTypeString = localStorage.getItem("userType");
    const isLoggedInDoctor = userTypeString == null ? false : +userTypeString == UserType.Doctor ? true : false;
    const [doctorsToShow, setDoctorsToShow] = useState<IDoctorDTO[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<IDoctorDTO[]>();
    const [selectedSpecialization, setSelectedSpecialization] = useState<IBaseModel>();
    const [specializations, setSpecializations] = useState<IBaseModel[]>([]);

    useEffect(() => {
        if (props.doctors == [])
            return;

        setDoctorsToShow(props.doctors);
    }, [props.doctors]);

    return (
        <Stack>
            <StackItem>
                <Label>
                    Doctor
                </Label>
            </StackItem>
            <StackItem>
                <Multiselect
                    singleSelect={true}
                    options={doctorsToShow.map((doctor) => {return {name: doctor.name, specialization: doctor.specialization}})}
                    groupBy="specialization"
                    onSelect={(selectedList, selectedItem) => { setSelectedDoctor(selectedItem) }}
                    displayValue="name"
                />
            </StackItem>
            <Stack horizontal horizontalAlign="center" style={{ marginTop: "4vh" }}>
                <StackItem>
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="blue" />
                </StackItem>
                <StackItem>
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                </StackItem>
                <StackItem>
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                </StackItem>
                <StackItem>
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                </StackItem>
                <StackItem>
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                    <AppointmentSlot color="blue" />
                    <AppointmentSlot color="red" />
                </StackItem>
            </Stack>
        </Stack>
    )
}