import { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Tasks from "../../components/Tasks/Tasks";
import CardContext from "../../contexts/CardContext";

import "./DashboardPage.css";
import { getAllTasksByDate } from "../../api/index";

function DashboardPage() {
  const { selectedDate } = useContext(CardContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getAllTasksByDate(selectedDate);
      console.log(res);
      setTasks(res.data);
    })();
  }, []);

  return (
    <div id="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <header>
          <h1>Hello Jake</h1>
          <span className="circle" />
        </header>

        <p className="select-date">Showing tasks for 23 June</p>

        <div className="box-container">
          <div className="box">3 tasks left</div>
          <div className="box box-green">7 tasks completed</div>
        </div>

        <h1>Your list</h1>

        <Tasks
          tasks={tasks.filter((task) => !task.taskDone)}
          taskDone={false}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
