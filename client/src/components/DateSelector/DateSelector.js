import "./DateSelector.css"

const DateSelector = (props) => {
  return (
    <div className="date-selector">
      <div className="date">Today</div>
      <div className="date">{props.card_date}</div>
      <div className="date">25 Aug</div>
      <div className="date">25 Aug</div>
    </div>
  )
}

export default DateSelector