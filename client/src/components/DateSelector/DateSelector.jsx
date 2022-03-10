import "./DateSelector.css";

import addDaysToDate from "../../helpers/addDaysToDate";
import getSiblingElements from "../../helpers/getSiblingElements";

function DateSelector({ card_date, setSelectedDate }) {
  const startDate = new Date(card_date);

  const dateToWords = (dateObject) => {
    const monthsInWords = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return `${dateObject.getDate()} ${monthsInWords[dateObject.getMonth()]}`;
  };

  const handleDateSelectorClick = (event) => {
    getSiblingElements(event.target).forEach((element) => element.classList.remove("active"));
    event.target.classList.add("active");

    setSelectedDate(event.target.dataset.value); // this function lies
  };

  return (
    <div className="date-selector" onClick={handleDateSelectorClick}>
      <div className="date active" data-value="done_day_one">{dateToWords(startDate)}</div>
      <div className="date" data-value="done_day_two">{dateToWords(addDaysToDate(startDate, 1))}</div>
      <div className="date" data-value="done_day_three">{dateToWords(addDaysToDate(startDate, 4))}</div>
      <div className="date" data-value="done_day_four">{dateToWords(addDaysToDate(startDate, 7))}</div>
    </div>
  );
}

export default DateSelector;
