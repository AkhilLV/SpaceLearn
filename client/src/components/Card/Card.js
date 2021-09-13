import axios from 'axios'
import { useEffect, useState } from 'react'
import './Card.css'

import Task from '../Task/Task'
import DateSelector from '../DateSelector/DateSelector'

const Card = (props) => {
  const [taskInput, setTaskInput] = useState("")
  const [tasksData, setTasksData] = useState("")
  const [selectedDate, setSelectedDate] = useState("done_day_one")

  useEffect(() => {
    axios({
      method: "POST",
      url: "https://space-learn.herokuapp.com/getTasks",
      data: {
        cardId: props.card_id,
      },
      withCredentials: true
    }).then(res => {
      setTasksData(res.data)
      console.log(res.data)
    })
  }, [])

  const addTask = (e) => {
    e.preventDefault()

    if (!taskInput) return
    axios({
      method: "POST",
      data: {
        cardId: props.card_id,
        taskText: taskInput
      },
      url: "https://space-learn.herokuapp.com/addTask",
      withCredentials: true
    }).then((res) => {
      console.log(res.data)
      setTaskInput("")
      setTasksData(res.data)
    })
  }

  return (
    <div className="card">
      <div className="top-bar">
        <h2>{props.card_name}</h2>
        <div className="card-menu-icon"></div>
      </div>

      <DateSelector card_date={props.card_date} setSelectedDate={setSelectedDate} />

      <div className="task-input">
        <form onSubmit={addTask}>
          <input type="text" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
          <button className="circle">+</button>
        </form>
      </div>

      <div className="tasks">
        <ul>
          {
            tasksData ? tasksData.filter((task) => !task[selectedDate]).map(task =>
              <Task key={task.task_id} task_id={task.task_id} task_text={task.task_text} setTasksData={setTasksData} selectedDate={selectedDate} card_id={props.card_id} isTaskDone={false} />) : "All done!"
          }
        </ul>
      </div>

      <div className="tasks completed-tasks">
        <ul>
          {
            tasksData ? tasksData.filter((task) => task[selectedDate]).map(task =>
              <Task key={task.task_id} task_id={task.task_id} task_text={task.task_text} setTasksData={setTasksData} selectedDate={selectedDate} card_id={props.card_id} isTaskDone={true} />) : "All done!"
          }
        </ul>
      </div>
    </div >
  )
}

export default Card