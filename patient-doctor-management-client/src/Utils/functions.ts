export const delay = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export const convertNumberMonthToString = (month: number): string => {
    switch (month) {
        case 0:
            return "Janury";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "Nobember";
        case 11:
            return "December";
        default:
            return "";
    }
}

export const convertDateStringFromServerToLocal = (date: string): string => {
    if (date[date.length-1] !== 'Z')
        date = date.concat("Z");

    return date;
} 