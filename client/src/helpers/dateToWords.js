const dateToWords = (dateObject) => {
  const monthsInWords = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${dateObject.getDate()} ${monthsInWords[dateObject.getMonth()]}`;
};

export default dateToWords;
