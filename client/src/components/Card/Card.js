import axios from 'axios'
import { useState } from 'react'
import './Card.css'

import Task from '../Task/Task'
import DateSelector from '../DateSelector/DateSelector'

const Card = (props) => {
  return (
    <div className="card">
      <div className="top-bar">
        <h2>{props.card_name}</h2>
        <div className="card-menu-icon"></div>
      </div>

      <DateSelector card_date={props.card_date} />

      <div className="task-input">
        <input type="text" />
        <button className="circle">+</button>
      </div>
      <div className="tasks">
        <ul>
          <li><span className="circle"></span>Walk Cat</li>
          <li><span className="circle"></span>Do Laundry</li>
          <li><span className="circle"></span>Make bed</li>
          <li><span className="circle"></span>Go out</li>
          <li><span className="circle"></span>Jog 6 miles</li>
        </ul>
      </div>
      <div className="tasks completed-tasks">
        <ul>
          <li><span className="circle"></span>Walk Cat</li>
          <li><span className="circle"></span>Do Laundry</li>
        </ul>
      </div>
    </div >
  )
}

export default Card