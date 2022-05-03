import "./Tasks.css";

function Task({ tasks }) {
  return (
    <div className="tasks">
      {tasks.map((task) => (
        <p key={task.taskId}>
          <div className="circle" />
          {task.taskText}
        </p>
      ))}
    </div>
  );
}

export default Task;