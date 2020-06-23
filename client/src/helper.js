import moment from 'moment'

export const setDateForYears = years => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + years);
    return date;
}

export const setDateForDays = days => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
}

export const validDate = date => {
    return moment(date).isValid() && date > new Date() && date < setDateForYears(10);
}