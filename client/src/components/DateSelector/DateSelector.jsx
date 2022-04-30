import "./DateSelector.css";

import getSiblingElements from "../../helpers/getSiblingElements";

function DateSelector({ cardDates, setSelectedDate }) {
  const handleDateSelectorClick = (event) => {
    getSiblingElements(event.target).forEach((element) => element.classList.remove("active"));
    event.target.classList.add("active");

    setSelectedDate(event.target.dataset.date);
  };

  return (
    <div className="date-selector" onClick={handleDateSelectorClick}>
      <div className="date active" data-date={cardDates[0]}>{cardDates[0]}</div>
      <div className="date" data-date={cardDates[1]}>{cardDates[1]}</div>
      <div className="date" data-date={cardDates[2]}>{cardDates[2]}</div>
      <div className="date" data-date={cardDates[3]}>{cardDates[3]}</div>
    </div>
  );
}

export default DateSelector;
