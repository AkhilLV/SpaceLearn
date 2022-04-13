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
    setSelectedCardId(cardId);
  };

  return (
    <ul className="card-listing">
      <h3>All Cards</h3>
      {cards.map((card) => (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li
          onClick={handleClick}
          key={card.card_id}
          data-id={card.card_id}
        >
          <span className="circle" />
          {card.card_name}
        </li>
      ))}
    </ul>
  );
}

export default CardListing;
