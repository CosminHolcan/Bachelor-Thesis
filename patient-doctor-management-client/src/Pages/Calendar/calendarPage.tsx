import { Stack } from "@fluentui/react";
import Multiselect from "multiselect-react-dropdown";
import { Icon, Label, StackItem } from "office-ui-fabric-react";
import { useEffect, useState } from "react";
import { AppointmentSlot } from "../../Components/AppointmentSlot/appointmentSlot";
import { CustomCalendar } from "../../Components/CustomCalendar/customCalendar";
import { IDoctorDTO } from "../../DTO/DoctorDTO";
import { UserType } from "../../Enums/userTypes";
import { MILLISECONDS_IN_DAY, MILLISECONDS_IN_WEEK, NONE } from "../../globalConstants";
import { IAppointment } from "../../Models/Appointment";
import { IBaseModel } from "../../Models/BaseModel";
import { convertNumberMonthToString } from "../../Utils/functions";
import { DoctorsService } from "../../Utils/services";
import { ICalendarPageProps } from "./calendarPage.types";

const ICON_LEFT: string = "CaretSolidLeft";
const ICON_RIGHT: string = "CaretSolidRight";

export const CalendarPage = (props: ICalendarPageProps): JSX.Element => {
    const getFirstStartingWeekDate = (): Date => {
        const currentDay: Date = new Date();
        const startingWeekDate: Date = new Date();

        switch (currentDay.getDay()) {
            case 0:
                startingWeekDate.setTime(currentDay.getTime() + MILLISECONDS_IN_DAY);
                break;
            case 1:
                break;
            case 2:
                startingWeekDate.setTime(currentDay.getTime() - MILLISECONDS_IN_DAY);
                break;
            case 3:
                startingWeekDate.setTime(currentDay.getTime() - 2 * MILLISECONDS_IN_DAY);
                break;
            case 4:
                startingWeekDate.setTime(currentDay.getTime() - 3 * MILLISECONDS_IN_DAY);
                break;
            case 5:
                startingWeekDate.setTime(currentDay.getTime() - 4 * MILLISECONDS_IN_DAY);
                break;
            case 6:
                startingWeekDate.setTime(currentDay.getTime() + 2 * MILLISECONDS_IN_DAY);
                break;

        }

        startingWeekDate.setHours(9, 0, 0, 0);
        return startingWeekDate;
    }

    var userTypeString = localStorage.getItem("userType");
    const isLoggedInDoctor = userTypeString == null ? false : +userTypeString == UserType.Doctor ? true : false;

    const [doctorsToShow, setDoctorsToShow] = useState<IDoctorDTO[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<IDoctorDTO>();
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [startingWeekDate, setStartingWeekDate] = useState<Date>(getFirstStartingWeekDate());

    useEffect(() => {
        if (props.doctors == [])
            return;

        setDoctorsToShow(props.doctors);
    }, [props.doctors]);

    useEffect(() => {
        if (!selectedDoctor)
            return;

        setStartingWeekDate(getFirstStartingWeekDate());
    }, [selectedDoctor]);

    const showLeftArrow = (): boolean => {
        return startingWeekDate.getTime() != getFirstStartingWeekDate().getTime();
    }

    const handleLeftArrowClicked = (): void => {
        const newStartingWeekDate = new Date();
        newStartingWeekDate.setTime(startingWeekDate.getTime() - MILLISECONDS_IN_WEEK);
        setStartingWeekDate(newStartingWeekDate);
    }

    const handleRightArrowClicked = (): void => {
        const newStartingWeekDate = new Date();
        newStartingWeekDate.setTime(startingWeekDate.getTime() + MILLISECONDS_IN_WEEK);
        setStartingWeekDate(newStartingWeekDate);
    }

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
                    options={doctorsToShow.map((doctor) => { return { name: doctor.name, specialization: doctor.specialization } })}
                    groupBy="specialization"
                    onSelect={(selectedList, selectedItem) => { setSelectedDoctor(selectedItem) }}
                    displayValue="name"
                />
            </StackItem>
            <Stack horizontal horizontalAlign="center" style={{ marginTop: "2vh" }}>
                {showLeftArrow() &&
                    <StackItem onClick={() => { handleLeftArrowClicked(); }}>
                        <Icon
                            iconName={ICON_LEFT}
                            style={{ fontSize: "4vh", marginRight: "3vw" }}
                        />
                    </StackItem>
                }
                <StackItem>
                    <Label style={{ fontSize: 20 }}>
                        {convertNumberMonthToString(startingWeekDate.getMonth()) + ", " + startingWeekDate.getDate()}
                    </Label>
                </StackItem>
                <StackItem onClick={() => { handleRightArrowClicked(); }}>
                    <Icon
                        iconName={ICON_RIGHT}
                        style={{ fontSize: "4vh", marginLeft: "3vw" }}
                    />
                </StackItem>
            </Stack>
            <CustomCalendar
                appointments={appointments}
                startingWeekDate={startingWeekDate}
                selectedDoctor={selectedDoctor}
            />
        </Stack>
    )
}