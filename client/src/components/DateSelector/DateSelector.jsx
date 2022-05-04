import "./DateSelector.css";

import getSiblingElements from "../../helpers/getSiblingElements";
import dateToWords from "../../helpers/dateToWords";

function DateSelector({ cardDates, setState }) {
  const handleDateSelectorClick = (event) => {
    if (!Array.from(event.target.classList).includes("date")) return;

    getSiblingElements(event.target).forEach((element) => element.classList.remove("active"));
    event.target.classList.add("active");

    setState((prev) => ({
      ...prev,
      selectedDate: event.target.dataset.date,
    }));
  };

  return (
    <div className="date-selector" onClick={handleDateSelectorClick}>
      {cardDates.map((cardDate, i) => <div key={cardDate} className={`date ${i === 0 && "active"}`} data-date={cardDate}>{dateToWords(new Date(cardDate))}</div>)}
    </div>
  );
}

export default DateSelector;
