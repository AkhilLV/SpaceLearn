import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import InputModal from "../components/InputModal/InputModal";
import CardSection from "../components/CardSection/CardSection";

import "./DashboardPage.css";

function DashboardPage({ isLoggedIn, setShowModal }) {
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
        <InputModal
          setCards={setCards}
          setShowInputModal={setShowInputModal}
          setShowModal={setShowModal}
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
