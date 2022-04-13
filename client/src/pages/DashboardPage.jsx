import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import CardInputModal from "../components/CardInputModal/CardInputModal";
import CardSection from "../components/CardSection/CardSection";

import "./DashboardPage.css";

function DashboardPage({ isLoggedIn }) {
  const [cards, setCards] = useState([]);
  const [showInputModal, setShowInputModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) return history.push("/auth");
  }, []);

  return (
    <>
      {showInputModal ? (
        <CardInputModal
          setCards={setCards}
          setShowInputModal={setShowInputModal}
        />
      ) : null}

      <div id="dashboard">
        <Sidebar
          cards={cards}
          setCards={setCards}
          setShowInputModal={setShowInputModal}
          setSelectedCardId={setSelectedCardId}
        />
        <CardSection selectedCardId={selectedCardId} />
      </div>
    </>
  );
}

export default DashboardPage;
