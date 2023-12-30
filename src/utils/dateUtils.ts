import moment from "moment";

export const isDeadlineDate = (date?: string | Date) => {
  if (!date) return false;

  const inputMoment = moment(date, 'YYYY/MM/DD');
  const today = moment(new Date() , 'YYYY/MM/DD');
  const differenceInDays = inputMoment.diff(today, 'days');

  if (today.isBefore(inputMoment) && differenceInDays <= 3) return true;
  if (today.isSameOrAfter(inputMoment)) return true;

  return false;
}