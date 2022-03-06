import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

import "./Cards.css";

import InputModal from "../InputModal/InputModal";
import Card from "../Card/Card";

import baseUrl from "../../url/baseUrl";

function Cards(props) {
  const [cardsData, setCardsData] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (!props.isLoggedIn) return history.push("/login");

    axios({
      method: "GET",
      url: `${baseUrl}/getCards`,
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
          <button title="Add new card" className="circle" onClick={() => setShowInputModal(true)}>+</button>
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
