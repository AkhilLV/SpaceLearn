import React, { useState } from "react";

import "./TaskInput.css";

import { addTask } from "../../api";

export default function TaskInput({ setSelectedCardId }) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addTask(setSelectedCardId, { taskText });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="task-input">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Ex: Study redox reactions" value={taskText} onChange={(e) => setTaskText(e.target.value)} />
        <button type="button" className="circle">+</button>
      </form>
    </div>
  );
}
