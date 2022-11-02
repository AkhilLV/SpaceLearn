import { useContext, useState } from "react";

import "./TaskInput.css";
import { useParams } from "react-router-dom";
import { addTask, getCard } from "../../api";

import CardContext from "../../contexts/CardContext";
import ModalContext from "../../contexts/ModalContext";
import TaskInputForm from "../TaskInputForm/TaskInputForm";

export default function TaskInput() {
  const { setCardData } = useContext(CardContext);
  const { setShowInfoModal } = useContext(ModalContext);

  const [showForm, setShowForm] = useState(false);

  const { cardId } = useParams();

  const handleAddTaskForm = async (e, inputValues) => {
    e.preventDefault();

    const [taskText, taskDates] = inputValues;

    if (!taskText || taskDates.length === 0)
      return setShowInfoModal([true, "Enter a new task"]);

    try {
      await addTask(cardId, { taskText, taskDates });
      const res = await getCard(cardId);
      console.log(res.data);
      setCardData(res.data);
      setShowInfoModal([true, "Task added"]);
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

      <form onClick={() => setShowForm(true)} className="task-input-form">
        <input
          className="input"
          type="text"
          placeholder="What do you want to learn today?"
        />
        <button type="button" className="circle">
          +
        </button>
      </form>
    </div>
  );
}
