import { getCard, crossTask } from "../../api";
import "./Tasks.css";

function Tasks({
  tasks, selectedCardId, cardDateId, setState,
}) {
  const handleClick = async (e) => {
    if (!Array.from(e.target.classList).includes("task")) return;

    const taskId = e.target.dataset.taskid;

    try {
      await crossTask(selectedCardId, taskId, cardDateId, {
        taskDone: true,
      });
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
    <div className="tasks" onClick={handleClick}>
      {tasks.map((task) => (
        <p key={task.taskId} data-taskid={task.taskId} className="task">
          <div className="circle" />
          {task.taskText}
        </p>
      ))}
    </div>
  );
}

export default Tasks;
