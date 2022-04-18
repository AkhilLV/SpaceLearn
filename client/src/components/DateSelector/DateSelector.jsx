import "./DateSelector.css";

import getSiblingElements from "../../helpers/getSiblingElements";

function DateSelector({ card_date, setSelectedDate }) {
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
