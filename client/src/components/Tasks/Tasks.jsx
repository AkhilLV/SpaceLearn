import "./Tasks.css";
import Task from "./Task/Task";

export default function Tasks({ tasks, taskDone, isDashboard = false }) {
  return (
    <div className={`tasks ${taskDone && "completed-tasks"}`}>
      {tasks.map((task) => (
        <Task task={task} isDashboard={isDashboard} />
      ))}
    </div>
  );
}
