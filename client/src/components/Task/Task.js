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
      url: "https://space-learn.herokuapp.com/crossTask",
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