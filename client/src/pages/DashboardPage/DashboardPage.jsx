import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";

import "./DashboardPage.css";

import UserContext from "../../contexts/UserContext";

function DashboardPage() {
  const { isLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn) return navigate("/auth");
  // }, []);

  return (
    <div id="dashboard">
      <Sidebar />

      <div className="dashboard-content">
        <header>
          <h1>Hello Jake</h1>
          <span className="circle"></span>
        </header>

        <p className="select-date">Showing tasks for 23 June</p>

        <div className="box-container">
          <div className="box">3 tasks left</div>
          <div className="box box-green">7 tasks completed</div>
        </div>

        <h1>Your list</h1>
      </div>

    </div>
  );
}

export default DashboardPage;
