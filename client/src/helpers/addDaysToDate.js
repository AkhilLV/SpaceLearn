const addDaysToDate = (dateObject, daysToAdd) => {
  const date = dateObject;
  date.setDate(date.getDate() + daysToAdd);

  return date;
};

export default addDaysToDate;
