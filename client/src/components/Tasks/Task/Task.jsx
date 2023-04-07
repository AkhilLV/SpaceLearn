import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  crossTask,
  deleteTask,
  editTask,
  getCardTasksByDate,
  getAllTasksByDate,
} from "../../../api";
import CardContext from "../../../contexts/CardContext";
import ModalContext from "../../../contexts/ModalContext";

import DropdownMenu from "../../DropdownMenu/DropdownMenu";
import Form from "../../Form/Form";

export default function Task({ task, isDashboard }) {
  const { selectedDate, setTasks } = useContext(CardContext);
  let { cardId } = useParams();

  if (!cardId) {
    // cardId will be difined only a CardPage
    cardId = task.cardId;
  }

  const [showForm, setShowForm] = useState(false);

  const { setShowInfoModal } = useContext(ModalContext);

  const handleClick = async (e) => {
    try {
      await crossTask(cardId, task.taskId, task.taskDateId, !task.taskDone);

      if (!isDashboard) {
        const res = await getCardTasksByDate(cardId, selectedDate);
        setTasks(res.data);
      } else {
        const res = await getAllTasksByDate(selectedDate);
        setTasks(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    try {
      await deleteTask(cardId, task.taskId);

      if (isDashboard) {
        const res = await getAllTasksByDate(selectedDate);
        setTasks(res.data);
      } else {
        const res = await getCardTasksByDate(cardId, selectedDate);
        setTasks(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (e, setShowDropdownMenu) => {
    setShowDropdownMenu(false);
    setShowForm(true);
  };

  const handleEditTaskForm = async (e, inputValues) => {
    const taskText = inputValues[1];

    if (!taskText) return setShowInfoModal("Fill all fields");

    try {
      await editTask(cardId, task.taskId, { taskText });
      setShowForm(false);

      if (isDashboard) {
        const res = await getAllTasksByDate(selectedDate);
        setTasks(res.data);
      } else {
        const res = await getCardTasksByDate(cardId, selectedDate);
        setTasks(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {showForm && (
        <Form
          headerText="Edit task"
          inputItems={[
            {
              id: 1,
              labelText: "Task Name",
              inputType: "text",
              inputValue: task.taskText,
            },
          ]}
          submitBtnText="Edit task"
          onSubmit={handleEditTaskForm}
          setShowForm={setShowForm}
        />
      )}
      <div key={task.taskId} onClick={handleClick} className="task">
        <div className="center-vertical">
          <div className="circle" />
          <span className="task-text">
            {task.taskText}{" "}
            {isDashboard && (
              <span className="task-card-name">{task.cardName}</span>
            )}
          </span>
        </div>
        <DropdownMenu
          buttons={[
            {
              buttonName: "Delete",
              handler: handleDelete,
            },
            {
              buttonName: "Edit",
              handler: handleEdit,
            },
          ]}
        />
      </div>
    </>
  );
}
