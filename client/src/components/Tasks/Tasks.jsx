import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCard,
  crossTask,
  deleteTask,
  editTask,
  getCardTasksByDate,
  getAllTasksByDate,
} from "../../api";
import CardContext from "../../contexts/CardContext";
import ModalContext from "../../contexts/ModalContext";

import DropdownMenu from "../DropdownMenu/DropdownMenu";
import Form from "../Form/Form";

import "./Tasks.css";

export default function Tasks({ tasks, taskDone, isDashboard = false }) {
  const { selectedDate, setCardData, setTasks } = useContext(CardContext);
  const { cardId } = useParams();

  const [selectedTaskId, setSelectedTaskId] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { setShowInfoModal } = useContext(ModalContext);

  const handleClick = async (e) => {
    const taskId = e.currentTarget.dataset.taskid;
    const taskDateId = e.currentTarget.dataset.taskdateid;
    const clickedTasksCardId = e.currentTarget.dataset.cardid;

    try {
      // function has too many params, hard to read
      await crossTask(
        cardId || clickedTasksCardId, // clickedTasksCardId is defined only when this compoment is used by DashboardPage
        taskId,
        taskDateId,
        !taskDone
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

  const handleDelete = async (e, task) => {
    try {
      await deleteTask(cardId, task.taskId);

      // stop sending get requests after delete and just chanhge the state

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

      const res = await getCard(cardId);
      setCardData(res.data.data);

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
      <div className={`tasks ${taskDone && "completed-tasks"}`}>
        {tasks.map((task) => (
          <div
            key={task.taskId}
            data-taskid={task.taskId}
            data-taskdateid={task.taskDateId}
            data-cardid={task.cardId}
            onClick={handleClick}
            className="task"
          >
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
                  handler: (e) => {
                    handleDelete(e, task);
                  },
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
        ))}
      </div>
    </>
  );
}
