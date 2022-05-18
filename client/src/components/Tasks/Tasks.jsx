import "./Tasks.css";

import { useContext } from "react";
import { getCard, crossTask } from "../../api";
import CardContext from "../../contexts/CardContext";

function Tasks({
  tasks, state, setState,
}) {
  const { selectedCardId } = useContext(CardContext);

  const handleClick = async (e) => {
    const classList = Array.from(e.target.classList);
    if (!(classList.includes("task") || classList.includes("circle"))) return;

    // determines if a task should be marked as done or not. checks the parent
    const taskDone = !Array.from(e.currentTarget.classList).includes("completed-tasks");

    // fixes undefined id if user clicks on circle
    let task = e.target;
    if (classList.includes("circle")) {
      task = e.target.parentNode;
    }
    const taskId = task.dataset.taskid;

    try {
      // functions has too many params
      await crossTask(selectedCardId, taskId, state.selectedDateId, { taskDone });

      const res = await getCard(selectedCardId);
      setState((prev) => ({
        ...prev,
        cardData: res.data,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // similar divs. refactor
  return (
    <>
      <div className="tasks" onClick={handleClick}>
        {tasks.filter((task) => !task.taskDates[state.selectedDate]).map((task) => (
          <p key={task.taskId} data-taskid={task.taskId} className="task">
            <div className="circle" />
            {task.taskText}
          </p>
        ))}
      </div>
      <div className="tasks completed-tasks" onClick={handleClick}>
        {tasks.filter((task) => task.taskDates[state.selectedDate]).map((task) => (
          <p key={task.taskId} data-taskid={task.taskId} className="task">
            <div className="circle" />
            {task.taskText}
          </p>
        ))}
      </div>
    </>
  );
}

export default Tasks;
