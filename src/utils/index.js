import moment from "moment";

export const getFormattedDate = (date, format = "YYYY-MM-DD") => {
  return moment(date).format(format)
}

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}