const addDaysToDate = (dateObject, daysToAdd) => { // Date, number
  const date = new Date(dateObject);
  date.setDate(date.getDate() + daysToAdd);

  return date;
};

export default addDaysToDate;
