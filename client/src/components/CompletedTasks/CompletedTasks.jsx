import "./CompletedTasks.css";

export default function CompletedTasks({ tasks }) {
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
