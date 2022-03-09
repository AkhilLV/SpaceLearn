import "./DateSelector.css";

import getSiblingElements from "../../helpers/getSiblingElements";
import addDaysToDate from "../../helpers/addDaysToDate";

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
      <div className="date" data-value="done_day_two">{getDDMMYY(addDaysToDate(startDate, 1))}</div>
      <div className="date" data-value="done_day_three">{getDDMMYY(addDaysToDate(startDate, 4))}</div>
      <div className="date" data-value="done_day_four">{getDDMMYY(addDaysToDate(startDate, 7))}</div>
    </div>
  );
}

export default DateSelector;
