import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCard,
  crossTask,
  deleteTask,
  editTask,
  getCardTasksByDate,
} from "../../api";
import CardContext from "../../contexts/CardContext";
import ModalContext from "../../contexts/ModalContext";

import DropdownMenu from "../DropdownMenu/DropdownMenu";
import Form from "../Form/Form";

import "./Tasks.css";

export default function Tasks({ tasks, taskDone }) {
  const { selectedDateId, setCardData, setTasks } = useContext(CardContext);
  const { cardId } = useParams();

  const [selectedTaskId, setSelectedTaskId] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { setShowInfoModal } = useContext(ModalContext);

  const handleClick = async (e) => {
    if (!e.target.matches(".clickable")) return;

    let task = e.target;

    // access id when user clicks on nested elements
    if (e.target.matches(".circle") || e.target.matches(".task-text")) {
      task = e.target.parentNode.parentNode;
    }
    if (e.target.matches(".center-vertical")) {
      task = e.target.parentNode;
    }

    const taskId = task.dataset.taskid;
    const taskDateId = task.dataset.taskdateid;

    try {
      // function has too many params, hard to read
      await crossTask(cardId, taskId, taskDateId, !taskDone);

      const res = await getCardTasksByDate(cardId, "2023-03-29");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTaskId = (el) => {
    const task = el.parentNode.parentNode.parentNode; // go up from button to task div
    const taskId = task.dataset.taskid;

    return taskId;
  };

  const handleDelete = async (e) => {
    const taskId = getTaskId(e.target);

    try {
      await deleteTask(cardId, taskId);

      const res = await getCard(cardId);
      setCardData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (e, setShowDropdownMenu) => {
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

      const res = await getCard(cardId);
      setCardData(res.data);

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
      <div
        className={`tasks ${taskDone && "completed-tasks"}`}
        onClick={handleClick}
      >
        {tasks.map((task) => (
          <div
            key={task.taskId}
            data-taskid={task.taskId}
            data-taskdateid={task.taskDateId}
            className="clickable task"
          >
            <div className="clickable center-vertical">
              <div className="clickable circle" />
              <span className="clickable task-text">{task.taskText}</span>
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
        ))}
      </div>
    </>
  );
}
