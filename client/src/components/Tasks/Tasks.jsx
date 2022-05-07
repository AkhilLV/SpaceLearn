import { getCard, crossTask } from "../../api";
import "./Tasks.css";

function Tasks({
  tasks, selectedCardId, state, setState,
}) {
  const handleClick = async (e) => {
    if (!Array.from(e.target.classList).includes("task")) return;

    const taskDone = !Array.from(e.currentTarget.classList).includes("completed-tasks");
    const taskId = e.target.dataset.taskid;

    try {
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
