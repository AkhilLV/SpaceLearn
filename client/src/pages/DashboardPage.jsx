import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import CardSection from "../components/CardSection/CardSection";

import "./DashboardPage.css";

import UserContext from "../contexts/UserContext";
import CardContext from "../contexts/CardContext";

function DashboardPage() {
  const { isLoggedIn } = useContext(UserContext);
  const { selectedCardId } = useContext(CardContext);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isLoggedIn) return navigate("/auth");
  // }, []);

  return (
    <div id="dashboard">
      <Sidebar />

      {selectedCardId && <CardSection />}
    </div>
  );
}

export default DashboardPage;
