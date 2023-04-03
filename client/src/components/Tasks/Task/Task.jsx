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

export default function Task({ task }) {
  const { selectedDate, setTasks } = useContext(CardContext);
  const { cardId } = useParams();

  const [selectedTaskId, setSelectedTaskId] = useState(false);

  const { setShowInfoModal } = useContext(ModalContext);

  const handleClick = async (e) => {
    try {
      await crossTask(
        cardId || clickedTasksCardId, // clickedTasksCardId is defined only when this compoment is used by DashboardPage
        task.taskId,
        task.taskDateId,
        !task.taskDone
      );

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

      const resTasks = await getCardTasksByDate(cardId, selectedDate);
      setTasks(resTasks.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (e, setShowDropdownMenu, task) => {
    const taskId = getTaskId(e.target);
    setSelectedTaskId(taskId);

    setShowDropdownMenu(false);
    setShowForm(true);
  };

  const handleEditTaskForm = async (e, inputValues) => {
    const taskText = inputValues[1];

    if (!taskText) return setShowInfoModal("Fill all fields");

    try {
      await editTask(cardId, selectedTaskId, { taskText });
      setShowForm(false);
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
              // inputValue: cardData.cardName,
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
              handler: handleDelete(),
            },
            {
              buttonName: "Edit",
              handler: (e, setShowDropdownMenu) => {
                handleEdit(e, setShowDropdownMenu);
              },
            },
          ]}
        />
      </div>
    </>
  );
}
