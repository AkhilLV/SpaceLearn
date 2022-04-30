import React from "react";

export default function TaskInput() {
  return (
    <div className="task-input">
      <form onSubmit={addTask}>
        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
        <button type="button" className="circle">+</button>
      </form>
    </div>
  );
}
