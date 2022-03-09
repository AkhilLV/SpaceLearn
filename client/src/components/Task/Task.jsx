import axios from "axios";
import baseUrl from "../../url/baseUrl";

function Task(props) {
  const crossTask = () => {
    axios({
      method: "POST",
      data: {
        card_id: props.card_id,
        task_id: props.task_id,
        task_day: props.selectedDate,
        set_to: !props.isTaskDone,
      },
      url: `${baseUrl}/crossTask`,
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      props.setTasksData(res.data);
    });
  };

  return (
    <li onClick={crossTask}>
      <span className="circle" />
      {props.task_text}
    </li>
  );
}

export default Task;

// [
//   {
//       "task_id": 70,
//       "task_text": "Lunar Landing",
//       "done_day_one": 0,
//       "done_day_two": 0,
//       "done_day_three": 0,
//       "done_day_four": 1
//   },
//   {
//       "task_id": 71,
//       "task_text": "Neil Damstrong",
//       "done_day_one": 0,
//       "done_day_two": 0,
//       "done_day_three": 0,
//       "done_day_four": 0
//   }
// ]
