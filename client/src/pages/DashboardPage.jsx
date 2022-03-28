import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

import baseUrl from "../url/baseUrl";
import Sidebar from "../components/Sidebar/Sidebar";

function DashboardPage({ isLoggedIn }) {
  const [showInputModal, setShowInputModal] = useState(false);
  const [cardsData, setCardsData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) return history.push("/auth");

    axios({
      method: "GET",
      url: `${baseUrl}/cards`,
      withCredentials: true,
    }).then((res) => {
      setCardsData(res.data);
    });
  }, []);

  return (
    <>
      {showInputModal ? <CardInputModal setShowInputModal={setShowInputModal} setCardsData={setCardsData} /> : null}

      <div className="container">
        <Sidebar />
        <div className="cards">
          {
            cardsData ? <Card key={card.cardId} cardName={card.card_name} cardId={card.cardId} setCardsData={setCardsData} /> : "Nothing to see here!"
          }
        </div>
      </div>
    </>
  );
}

export default DashboardPage;

// {
//   cardsData ? cardsData.map((card) => <Card key={card.cardId} cardName={card.card_name} cardId={card.cardId} setCardsData={setCardsData} />) : "Nothing to see here!"
// }
