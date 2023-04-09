import { useContext, useState } from "react";

import "./TaskInput.css";
import { useParams } from "react-router-dom";
import { addTask, getCardTasksByDate } from "../../api";

import CardContext from "../../contexts/CardContext";
import ModalContext from "../../contexts/ModalContext";
import TaskInputForm from "../Form/TaskInputForm/TaskInputForm";

export default function TaskInput() {
  const { selectedDate, setTasks } = useContext(CardContext);
  const { setShowInfoModal } = useContext(ModalContext);

  const [showForm, setShowForm] = useState(false);

  const { cardId } = useParams();

  const handleAddTaskForm = async (e, inputValues) => {
    e.preventDefault();

    const [taskText, newDateValues] = inputValues;

    if (!taskText || newDateValues.length === 0)
      return setShowInfoModal("Enter a new task");

    try {
      await addTask(cardId, { taskText, taskDates: newDateValues });
      const res = await getCardTasksByDate(cardId, selectedDate);
      setTasks(res.data);
      setShowInfoModal("Task added");
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="task-input">
      {showForm && (
        <TaskInputForm onSubmit={handleAddTaskForm} setShowForm={setShowForm} />
      )}

      <div onClick={() => setShowForm(true)} className="task-input-form">
        <input
          className="input"
          type="text"
          placeholder="What did you to learn today?"
        />
        <button type="button" className="circle">
          +
        </button>
      </div>
    </div>
  );
}
