const addDaysToDate = (dateObject, daysToAdd) => {
  const date = dateObject;
  console.log(date);
  date.setDate(date.getDate() + daysToAdd);

  return date;
};

export default addDaysToDate;
