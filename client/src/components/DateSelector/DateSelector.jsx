import "./DateSelector.css";

import getSiblingElements from "../../helpers/getSiblingElements";

// don't add to prototype. even better, store the dates in database
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function DateSelector(props) {
  const startDate = new Date(props.card_date);

  const toWords = (i) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[i];
  };

  const getDDMMYY = (date) => `${date.getDate()} ${toWords(date.getMonth())}`;

  const selectDate = (event) => {
    getSiblingElements(event.target).forEach((element) => element.classList.remove("active"));
    event.target.classList.add("active");
    props.setSelectedDate(event.target.dataset.value);
  };

  return (
    <div className="date-selector" onClick={selectDate}>
      <div className="date active" data-value="done_day_one">{getDDMMYY(startDate)}</div>
      <div className="date" data-value="done_day_two">{getDDMMYY(startDate.addDays(1))}</div>
      <div className="date" data-value="done_day_three">{getDDMMYY(startDate.addDays(4))}</div>
      <div className="date" data-value="done_day_four">{getDDMMYY(startDate.addDays(7))}</div>
    </div>
  );
}

export default DateSelector;
