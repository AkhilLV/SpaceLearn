const addDaysToDate = (dateObject, daysToAdd) => {
  // Date, number
  const date = new Date(dateObject);
  date.setDate(date.getDate() + daysToAdd);

  return date;
};

const generateCardDates = (startDate) => {
  // Date
  const cardDates = [
    startDate,
    addDaysToDate(startDate, 1),
    addDaysToDate(startDate, 4),
    addDaysToDate(startDate, 9),
  ];

  return cardDates;
};

export default generateCardDates;
