import { useContext, useState } from "react";

import "./TaskInput.css";
import { useParams } from "react-router-dom";
import { addTask, getCard } from "../../api";

import Form from "../Form/Form";

import CardContext from "../../contexts/CardContext";
import ModalContext from "../../contexts/ModalContext";

export default function TaskInput() {
  const { setCardData } = useContext(CardContext);
  const { setShowInfoModal } = useContext(ModalContext);

  const [showForm, setShowForm] = useState(false);

  const { cardId } = useParams();

  const [taskText, setTaskText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskText) return setShowInfoModal([true, "Enter a new task"]);

    try {
      await addTask(cardId, { taskText });
      const res = await getCard(cardId);
      setTaskText("");
      setCardData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTaskForm = () => {};

  return (
    <div className="task-input">
      {showForm && (
        <Form
          headerText="Add task"
          inputItems={[
            {
              id: 1,
              labelText: "Task Name",
              inputType: "text",
            },
            {
              id: 2,
              labelText: "Card Date",
              inputType: "date",
            },
          ]}
          submitBtnText="Create task"
          onSubmit={handleAddTaskForm}
          setShowForm={setShowForm}
        />
      )}
      <form onClick={() => setShowForm(true)} className="task-input-form">
        <input
          className="input"
          type="text"
          placeholder="What do you want to learn today?"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button type="submit" className="circle">
          +
        </button>
      </form>
    </div>
  );
}
