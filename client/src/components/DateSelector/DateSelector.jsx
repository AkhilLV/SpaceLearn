import "./DateSelector.css";

import getSiblingElements from "../../helpers/getSiblingElements";
import dateToWords from "../../helpers/dateToWords";
import { useEffect } from "react";

function DateSelector({ cardDates, setState }) {
  const handleDateSelectorClick = (event) => {
    if (!Array.from(event.target.classList).includes("date")) return;

    getSiblingElements(event.target).forEach((element) => element.classList.remove("active"));
    event.target.classList.add("active");

    setState((prev) => ({
      ...prev,
      selectedDateId: event.target.dataset.dateid,
      selectedDate: event.target.dataset.date,
    }));
  };

  useEffect(() => { console.log(cardDates); }, []);

  return (
    <div className="date-selector" onClick={handleDateSelectorClick}>
      {cardDates.map((cardDate, i) => <div key={cardDate.cardDateId} className={`date ${i === 0 && "active"}`} data-date={cardDate.cardDate} data-dateid={cardDate.cardDateId}>{dateToWords(new Date(cardDate.cardDate))}</div>)}
    </div>
  );
}

export default DateSelector;
