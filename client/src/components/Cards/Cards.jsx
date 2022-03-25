import "./Cards.css";

import { useHistory } from "react-router-dom"
import { useState, useEffect } from "react";

import axios from "axios";
import baseUrl from "../../url/baseUrl";

import Card from "../Card/Card";
import InputModal from "../InputModal/InputModal";

function Cards({ isLoggedIn }) {
  const [cardsData, setCardsData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) return history.push("/login");

    axios({
      method: "GET",
      url: `${baseUrl}/cards`,
      withCredentials: true,
    }).then((res) => {
      setCardsData(res.data);
    });
  }, []);

  const [showInputModal, setShowInputModal] = useState(false);

  return (
    <>
      <div className={showInputModal ? "overlay" : null} />
      {showInputModal ? <InputModal setShowInputModal={setShowInputModal} setCardsData={setCardsData} /> : null}

      <div className="container">
        <div className="control-bar">
          <button type="button" title="Add new card" className="circle" onClick={() => setShowInputModal(true)}>+</button>
        </div>

        <div className="cards">
          {
            cardsData ? cardsData.map((card) => <Card key={card.card_id} card_name={card.card_name} card_date={card.card_date} card_id={card.card_id} setCardsData={setCardsData} />) : "Nothing to see here!"
          }
        </div>
      </div>
    </>
  );
}

export default Cards;
