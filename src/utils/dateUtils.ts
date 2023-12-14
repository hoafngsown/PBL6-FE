import { translate } from "@/helpers"
import moment from "moment"

export const padZero = (number, n: number) => {
  if (!number) {
    return
  }

  if (number >= 10) {
    return number
  }

  return (
    new Array(n).join("0").slice((n || 2) * -1) +
    number.toString().replace("0", "")
  )
}

export const toTwoDigits = (number: number): string => {
  if (!number) {
    return "00"
  }

  return padZero(number, 2)
}

export const getNextMonthFromDate = (date: string | Date | moment.Moment) => {
  const getDate = `${
    moment(date).add(1, "M").format("YYYY") +
    translate("infoHealthMon.year") +
    moment(date).add(1, "M").format("MM") +
    translate("infoHealthMon.moon") +
    moment(date).add(1, "M").format("DD") +
    translate("infoHealthMon.day")
  }`

  return getDate
}

export const getNextYearFromDate = (
  date: string | Date | moment.Moment,
  nextYearNumber: number
) => {
  const getDate = `${
    moment(date).add(nextYearNumber, "y").format("YYYY") +
    translate("infoHealthMon.year") +
    moment(date).add(nextYearNumber, "y").format("MM") +
    translate("infoHealthMon.moon") +
    moment(date).add(nextYearNumber, "y").format("DD") +
    translate("infoHealthMon.day")
  }`

  return getDate
}

export const formatDayMonth = (date: string | Date) => {
  return moment(date).format("DD/MM")
}

export const formatMonthDay = (date: string | Date) => {
  return moment(date).format("MM/DD")
}

export const getNextDay = (date: Date) => {
  let result: Date = new Date()
  const today = new Date(date)
  result.setDate(today.getDate() + 1)
  return result
}


export const calculateDuration = (
  startDate: Date,
  endDate: Date
): { minutes: number; seconds: number } => {
  const diffInSeconds = Math.floor(
    (endDate.getTime() - startDate.getTime()) / 1000
  );
  let minutes = Math.floor(diffInSeconds / 60);
  let seconds = diffInSeconds % 60;
  if (minutes < 0 || seconds < 0) {
    minutes = 0;
    seconds = 0;
  }
  return { minutes, seconds };
};

export const isDeadlineDate = (date?: string | Date) => {
  if (!date) return false;

  const inputMoment = moment(date, 'YYYY/MM/DD');
  const today = moment(new Date() , 'YYYY/MM/DD');
  const differenceInDays = inputMoment.diff(today, 'days');

  if (today.isBefore(inputMoment) && differenceInDays <= 3) return true;
  if (today.isSameOrAfter(inputMoment)) return true;

  return false;
}