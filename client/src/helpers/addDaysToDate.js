const addDaysToDate = (dateObject, daysToAdd) => { // Date Object, number
  const date = dateObject;
  date.setDate(date.getDate() + daysToAdd);

  return date;
};

export default addDaysToDate;
