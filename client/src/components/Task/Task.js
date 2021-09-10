import axios from "axios"

const Task = (props) => {
  const crossTask = () => {
    axios({
      method: "POST",
      data: {
        card_id: props.card_id,
        task_id: props.task_id,
        task_day: props.selectedDate,
        set_to: !props.isTaskDone
      },
      url: "http://localhost:4000/crossTask",
      withCredentials: true
    }).then((res) => {
      props.setTasksData(res.data)
    })
  }

  return (
    <li onClick={crossTask}><span className="circle"></span>{props.task_text}</li>
  )
}

export default Task

// Todo
// 1. Cross out tasks
// 2. Delete Cards: Drop down menu
// 3. Edit Cards: Drop down menu
// 4. Delete Tasks: 3 dots on hover
// 5. Edit Tasks: 3 dots on hover