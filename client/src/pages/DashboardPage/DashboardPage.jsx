import { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Tasks from "../../components/Tasks/Tasks";
import Upcoming from "../../components/Upcoming/Upcoming";

import CardContext from "../../contexts/CardContext";

import "./DashboardPage.css";
import { getAllTasksByDate, getTasksBetweenDates } from "../../api/index";

import { addDaysToDate } from "../../helpers/generateCardDates";

function DashboardPage() {
  const { selectedDate, tasks, setTasks, setSelectedDate } =
    useContext(CardContext);

  const username = localStorage.getItem("username");

  const [upcomingTasks, setUpcomingTasks] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getAllTasksByDate(selectedDate);
      setTasks(res.data);

      const resUpcoming = await getTasksBetweenDates(
        addDaysToDate(selectedDate, 1).toISOString().substring(0, 10),
        addDaysToDate(selectedDate, 6).toISOString().substring(0, 10)
      );
      setUpcomingTasks(resUpcoming.data);
    })();
  }, [selectedDate]);

  return (
    <div id="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <header>
          <h1>Hey {username}!</h1>
          <span className="circle" />
        </header>

        <h2>
          Your list for{" "}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </h2>

        <div className="box-container">
          <div className="box">
            <p className="number">
              {tasks.filter((task) => !task.taskDone).length}
            </p>
            <p className="text">tasks left</p>
          </div>
          <div className="box box-green">
            <p className="number">
              {tasks.filter((task) => task.taskDone).length}
            </p>
            <p className="text">tasks completed</p>
          </div>
        </div>

        <Tasks
          tasks={tasks.filter((task) => !task.taskDone)}
          taskDone={false}
          isDashboard
        />
      </div>

      <Upcoming upcomingTasks={upcomingTasks} />
    </div>
  );
}

export default DashboardPage;
