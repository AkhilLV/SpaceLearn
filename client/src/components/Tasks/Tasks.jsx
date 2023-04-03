import "./Tasks.css";
import Task from "./Task/Task";

export default function Tasks({
  cardId, // cardId is defined only when this compoment is used by CardPage
  tasks,
  taskDone,
  isDashboard = false,
}) {
  return (
    <div className={`tasks ${taskDone && "completed-tasks"}`}>
      {tasks.map((task) => (
        <Task cardPageId={cardId} task={task} isDashboard={isDashboard} />
      ))}
    </div>
  );
}
