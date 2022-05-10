import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import InputModal from "../components/InputModal/InputModal";
import CardSection from "../components/CardSection/CardSection";

import "./DashboardPage.css";

import UserContext from "../contexts/user";

function DashboardPage({ setShowModal }) {
  const [cards, setCards] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(false);

  const { isLoggedIn } = useContext(UserContext);

  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) return history.push("/auth");
  }, []);

  return (
    <>
      {showInputModal && (
        <InputModal
          setCards={setCards}
          setShowInputModal={setShowInputModal}
          setShowModal={setShowModal}
        />
      )}

      <div id="dashboard">
        <Sidebar
          cards={cards}
          setCards={setCards}
          setShowInputModal={setShowInputModal}
          setSelectedCardId={setSelectedCardId}
        />
        {selectedCardId && <CardSection selectedCardId={selectedCardId} />}
      </div>
    </>
  );
}

export default DashboardPage;
