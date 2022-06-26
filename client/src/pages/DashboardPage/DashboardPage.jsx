import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Dashboard from "../../components/Dashboard/Dashboard";

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

      <Dashboard />
    </div>
  );
}

export default DashboardPage;
