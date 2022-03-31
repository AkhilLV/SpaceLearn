import "./DateSelector.css";

import addDaysToDate from "../../helpers/addDaysToDate";
import getSiblingElements from "../../helpers/getSiblingElements";

const dateToWords = (dateObject) => {
  const monthsInWords = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return `${dateObject.getDate()} ${monthsInWords[dateObject.getMonth()]}`;
};

function DateSelector({ card_date, setSelectedDate }) {
  const startDate = new Date(card_date);

  const handleDateSelectorClick = (event) => {
    getSiblingElements(event.target).forEach((element) => element.classList.remove("active"));
    event.target.classList.add("active");

    setSelectedDate(event.target.dataset.value); // this function lies
  };

  return (
    <div className="date-selector" onClick={handleDateSelectorClick}>
      <div className="date active"></div>
      <div className="date"></div>
      <div className="date"></div>
      <div className="date"></div>
    </div>
  );
}

export default DateSelector;
