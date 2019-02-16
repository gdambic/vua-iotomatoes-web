import moment from "moment";

export const getFormattedDate = (date, format = "YYYY-MM-DD") => {
  return moment(date).format(format)
}