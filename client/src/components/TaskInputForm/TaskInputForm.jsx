import { useState } from "react";

import "./Form.css";

import "./TaskInputForm.css";
import { motion } from "framer-motion";
import DatePicker from "react-multi-date-picker";
import close from "../../assets/icons/close.svg";

function TaskInputForm({ onSubmit = () => {}, setShowForm }) {
  // set default taskName
  const [taskName, setTaskName] = useState({
    taskName: "",
  });

  const [dateValues, setDateValues] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDateValues = dateValues.map((date) => date.toDate());
    onSubmit(e, [taskName, newDateValues]);
  };

  const variants = {
    hidden: { scale: 0.9, x: "-50%", y: "-50%" },
    visible: { scale: 1 },
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="overlay overlay-dark"
        onClick={() => setShowForm(false)}
      />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="input-modal"
      >
        <div className="header">
          <h3>Add task</h3>
          <button type="button" onClick={() => setShowForm(false)}>
            <img src={close} alt="close" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Task name: </label>

          <input
            className="input"
            type="text"
            value={taskName.taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />

          <label>Task Dates: </label>

          <DatePicker
            className="calender"
            value={dateValues}
            onChange={setDateValues}
            multiple
            minDate={new Date()}
          />

          <button className="btn btn-small" type="submit">
            Add Task
          </button>
        </form>
      </motion.div>
    </>
  );
}

export default TaskInputForm;

// a loader for button
