import { useState } from "react";

import "./TaskInput.css";

import { addTask, getCard } from "../../api";

export default function TaskInput({ cardId, setState }) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskText) return alert("Enter a new task");

    try {
      await addTask(cardId, { taskText });
      const res = await getCard(cardId);
      setTaskText("");
      setState((prev) => ({
        ...prev,
        cardData: res.data,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="task-input">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Ex: Study redox reactions" value={taskText} onChange={(e) => setTaskText(e.target.value)} />
        <button type="submit" className="circle">+</button>
      </form>
    </div>
  );
}
