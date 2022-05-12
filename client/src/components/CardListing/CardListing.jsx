import "./CardListing.css";

import { useContext, useEffect, useRef } from "react";
import CardContext from "../../contexts/CardContext";

function CardListing() {
  const { cards, setSelectedCardId, selectedCardId } = useContext(CardContext);

  const cardContainer = useRef(null);

  const handleClick = (e) => {
    if (!Array.from(e.target.classList).includes("card-listing-item")) return;

    const cardId = e.target.dataset.id;
    setSelectedCardId(cardId);
  };

  useEffect(() => {
    if (!selectedCardId) return;

    const container = cardContainer.current;
    const children = container.childNodes;

    children.forEach((child) => {
      child.classList.remove("active");

      if (child.dataset.id === selectedCardId) {
        child.classList.add("active");
      }
    });
  }, [selectedCardId, cards]);

  return (
    <ul className="card-listing">
      <h3>All Cards</h3>
      <div ref={cardContainer} onClick={handleClick}>
        {cards.map((card) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            className="card-listing-item"
            key={card.card_id}
            data-id={card.card_id}
          >
            <span className="circle" />
            {card.card_name}
          </li>
        ))}
      </div>

    </ul>
  );
}

export default CardListing;
