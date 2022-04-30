import "./DateSelector.css";

import getSiblingElements from "../../helpers/getSiblingElements";
import dateToWords from "../../helpers/dateToWords";

function DateSelector({ cardDates, setSelectedDate }) {
  const handleDateSelectorClick = (event) => {
    getSiblingElements(event.target).forEach((element) => element.classList.remove("active"));
    event.target.classList.add("active");

    setSelectedDate(event.target.dataset.date);
  };

  return (
    <div className="date-selector" onClick={handleDateSelectorClick}>
      {cardDates.map((cardDate, i) => <div className={`date ${i === 0 && "active"}`} data-date={cardDate}>{dateToWords(new Date(cardDate))}</div>)}
    </div>
  );
}

export default DateSelector;
