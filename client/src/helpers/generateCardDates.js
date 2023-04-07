import { DateObject } from "react-multi-date-picker";

export const addDaysToDate = (dateObject, daysToAdd) => {
  // Date, number
  const date = new Date(dateObject);
  date.setDate(date.getDate() + daysToAdd);

  return date;
};

const generateCardDates = () => {
  // Date
  const startDate = new Date();

  const cardDates = [
    new DateObject(startDate),
    new DateObject(addDaysToDate(startDate, 1)),
    new DateObject(addDaysToDate(startDate, 4)),
    new DateObject(addDaysToDate(startDate, 9)),
  ];

  return cardDates;
};

export default generateCardDates;
