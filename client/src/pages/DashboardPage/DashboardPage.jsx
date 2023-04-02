import { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Tasks from "../../components/Tasks/Tasks";
import Upcoming from "../../components/Upcoming/Upcoming";

import CardContext from "../../contexts/CardContext";

import "./DashboardPage.css";
import { getAllTasksByDate, getTasksBetweenDates } from "../../api/index";

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

function DashboardPage() {
  const { selectedDate, tasks, setTasks, setSelectedDate } =
    useContext(CardContext);

  const [upcomingTasks, setUpcomingTasks] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getAllTasksByDate(selectedDate);
      setTasks(res.data);

      const resUpcoming = await getTasksBetweenDates(
        addDays(selectedDate, 1).toISOString().substring(0, 10),
        addDays(selectedDate, 6).toISOString().substring(0, 10)
      );
      console.log(resUpcoming.data);
      setUpcomingTasks(resUpcoming.data);
    })();
  }, [selectedDate]);

  return (
    <div id="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <header>
          <h1>Hello Jake</h1>
          <span className="circle" />
        </header>

        <h1>
          Your list for{" "}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </h1>

        <div className="box-container">
          <div className="box">
            {tasks.filter((task) => !task.taskDone).length} tasks left
          </div>
          <div className="box box-green">
            {tasks.filter((task) => task.taskDone).length} tasks completed
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
