import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import InputModal from "../components/InputModal/InputModal";
import CardSection from "../components/CardSection/CardSection";

import "./DashboardPage.css";

import UserContext from "../contexts/UserContext";
import CardContext from "../contexts/CardContext";

function DashboardPage({ setShowModal }) {
  const [showInputModal, setShowInputModal] = useState(false);

  const { isLoggedIn } = useContext(UserContext);
  const { selectedCardId } = useContext(CardContext);

  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) return history.push("/auth");
  }, []);

  return (
    <>
      {showInputModal && (
        <InputModal
          setShowInputModal={setShowInputModal}
          setShowModal={setShowModal}
        />
      )}

      <div id="dashboard">
        <Sidebar setShowInputModal={setShowInputModal} />

        {selectedCardId && <CardSection />}
      </div>
    </>
  );
}

export default DashboardPage;
