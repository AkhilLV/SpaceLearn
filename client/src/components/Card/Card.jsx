import "./Card.css";

import { useEffect, useState } from "react";

import DateSelector from "../DateSelector/DateSelector";

function Card(props) {
  const [task, setTask] = useState("");

  return (
    <div className="card">
      <div className="top-bar">
        <h2>{props.card_name}</h2>
        <div className="card-menu-icon" />
      </div>

      <DateSelector card_date={props.card_date} />

      <div className="task-input">
        <form onSubmit={addTask}>
          <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
          <button type="button" className="circle">+</button>
        </form>
      </div>
    </div>
  );
}

export default Card;
