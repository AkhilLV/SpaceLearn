import { useEffect } from "react";

import "./CardListing.css";
import axios from "axios";
import baseUrl from "../../url/baseUrl";

function CardListing({ cards, setCards, setSelectedCardId }) {
  useEffect(() => {
    axios({
      method: "GET",
      url: `${baseUrl}/cards`,
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      setCards(res.data);
    });
  }, []);

  const handleClick = (e) => {
    const cardId = e.target.dataset.id;
    console.log(cardId);
    setSelectedCardId(cardId);
  };

  return (
    <>
      <h3>All Cards</h3>
      <ul className="card-listing">
        {cards.map((card) => <li onClick={handleClick} key={card.card_id} data-id={card.card_id}>{card.card_name}</li>)}
      </ul>
    </>
  );
}

export default CardListing;
