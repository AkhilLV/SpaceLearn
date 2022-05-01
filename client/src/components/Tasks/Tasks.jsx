import "./Tasks.css";

function Task({ tasks }) {
  console.log(tasks);

  return (
    <div className="tasks">
      {tasks.map((task) => <p key={task.taskId}><div className="circle"></div>{task.taskText}</p>)}
    </div>
  );
}

export default Task;
