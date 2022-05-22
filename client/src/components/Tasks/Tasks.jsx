import { useContext } from "react";
import { getCard, crossTask, deleteTask } from "../../api";
import CardContext from "../../contexts/CardContext";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

import "./Tasks.css";

export default function Tasks({
  tasks, taskDone,
}) {
  const { selectedCardId, selectedDateId, setCardData } = useContext(CardContext);

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
      await crossTask(selectedCardId, taskId, selectedDateId, { taskDone: !taskDone });

      const res = await getCard(selectedCardId);
      setCardData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    // go up from button to task div
    const task = e.target.parentNode.parentNode.parentNode;
    const taskId = task.dataset.taskid;

    try {
      await deleteTask(selectedCardId, taskId);

      const res = await getCard(selectedCardId);
      setCardData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => { };

  return (
    <div className={`tasks ${taskDone && "completed-tasks"}`} onClick={handleClick}>
      {tasks.map((task) => (
        <div key={task.taskId} data-taskid={task.taskId} className="task">
          <div className="center-vertical">
            <div className="circle" />
            <span>{task.taskText}</span>
          </div>
          <DropdownMenu config={[
            {
              buttonName: "Delete",
              handler: handleDelete,
            },
            {
              buttonName: "Edit",
              handler: handleEdit,
            },
          ]}
          />
        </div>
      ))}
    </div>
  );
}
