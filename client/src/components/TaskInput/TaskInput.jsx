import { useContext, useState } from "react";

import "./TaskInput.css";
import { useParams } from "react-router-dom";
import { addTask, getCard } from "../../api";
import CardContext from "../../contexts/CardContext";
import ModalContext from "../../contexts/ModalContext";

export default function TaskInput() {
  const { setCardData } = useContext(CardContext);
  const { setShowInfoModal } = useContext(ModalContext);

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

  return (
    <div className="task-input">
      <form onSubmit={handleSubmit}>
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
