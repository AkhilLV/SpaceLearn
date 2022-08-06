import "./DateSelector.css";

import { useContext } from "react";
import getSiblingElements from "../../helpers/getSiblingElements";
import dateToWords from "../../helpers/dateToWords";
import CardContext from "../../contexts/CardContext";

function DateSelector() {
  const { cardData, setSelectedDateId, setSelectedDate } =
    useContext(CardContext);

  const handleDateSelectorClick = (event) => {
    if (!Array.from(event.target.classList).includes("date")) return;

    getSiblingElements(event.target).forEach((element) =>
      element.classList.remove("active")
    );
    event.target.classList.add("active");

    setSelectedDateId(event.target.dataset.dateid);
    setSelectedDate(event.target.dataset.date);
  };

  return (
    <div className="date-selector" onClick={handleDateSelectorClick}>
      {cardData.cardDates.map((cardDate, i) => (
        <div
          key={cardDate.cardDateId}
          className={`date ${i === 0 && "active"}`}
          data-date={cardDate.cardDate}
          data-dateid={cardDate.cardDateId}
        >
          {dateToWords(new Date(cardDate.cardDate))}
        </div>
      ))}
    </div>
  );
}

export default DateSelector;
