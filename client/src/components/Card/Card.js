import axios from 'axios'
import { useState } from 'react'
import './Card.css'

const Card = (props) => {
  const [taskInput, setTaskInput] = useState("")
  const [isInputVisible, setIsInputVisible] = useState(false)
  const toggleInput = () => {
    setIsInputVisible(!isInputVisible)
  }

  const addTask = () => {
    axios({
      method: "POST",
      data: {
        card_id: props.card_id,
        task: taskInput
      },
      url: "http://localhost:3000/addTask",
      withCredentials: true
    }).then((res) => {
      console.log(props.setCardData(res.data))
    })
    setIsInputVisible(false)
  }

  return (
    <div className="card">
      <h2>{props.date}</h2>
      <ul>
        {
          props.tasks.map((task) => <li>{task[0]}</li>)
        }
      </ul>
      {
        isInputVisible
          ? <input type="text" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} onblur={() => addTask()} autoFocus />
          : null
      }
      <button onClick={toggleInput}>+</button>
    </div>
  )
}

export default Card