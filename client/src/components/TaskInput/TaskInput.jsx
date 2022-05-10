import { useContext, useState } from "react";

import "./TaskInput.css";

import { addTask, getCard } from "../../api";
import CardContext from "../../contexts/CardContext";
import ModalContext from "../../contexts/ModalContext";

export default function TaskInput({ setState }) {
  const { selectedCardId } = useContext(CardContext);
  const { setShowModal } = useContext(ModalContext);

  const [taskText, setTaskText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskText) return setShowModal([true, "Enter a new task"]);

    try {
      await addTask(selectedCardId, { taskText });
      const res = await getCard(selectedCardId);
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
        <input className="input" type="text" placeholder="Ex: Study redox reactions" value={taskText} onChange={(e) => setTaskText(e.target.value)} />
        <button type="submit" className="circle">+</button>
      </form>
    </div>
  );
}
