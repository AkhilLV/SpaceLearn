import { useContext } from "react";
import { getCard, crossTask } from "../../api";
import CardContext from "../../contexts/CardContext";

import "./Tasks.css";

export default function Tasks({
  tasks, taskDone, state, setState,
}) {
  const { selectedCardId } = useContext(CardContext);

  const handleClick = async (e) => {
    const classList = Array.from(e.target.classList);
    if (!(classList.includes("task") || classList.includes("circle"))) return;

    // fixes undefined id if user clicks on circle
    let task = e.target;
    if (classList.includes("circle")) {
      task = e.target.parentNode;
    }

    const taskId = task.dataset.taskid;

    try {
      // function has too many params, hard to read
      await crossTask(selectedCardId, taskId, state.selectedDateId, { taskDone: !taskDone });

      const res = await getCard(selectedCardId);
      setState((prev) => ({
        ...prev,
        cardData: res.data,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`tasks ${taskDone && "completed-tasks"}`} onClick={handleClick}>
      {tasks.map((task) => (
        <p key={task.taskId} data-taskid={task.taskId} className="task">
          <div className="circle" />
          {task.taskText}
        </p>
      ))}
    </div>
  );
}
