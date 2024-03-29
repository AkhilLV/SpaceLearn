import "./CardListing.css";

import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import CardContext from "../../contexts/CardContext";

import searchIcon from "../../assets/icons/search.svg";

function CardListing() {
  const { cards } = useContext(CardContext);
  const { cardId } = useParams();

  const cardContainer = useRef(null);

  useEffect(() => {
    const container = cardContainer.current;
    const children = container.childNodes;

    children.forEach((child) => {
      child.classList.remove("active");

      if (child.dataset.id === cardId) {
        child.classList.add("active");
      }
    });
  }, [cardId, cards]);

  return (
    <div className="card-listing">
      <header>
        <h3>All Cards</h3>
        <img src={searchIcon} alt="search" />
      </header>
      <div ref={cardContainer} className="card-listing-container">
        {cards.map((card) => (
          <Link
            to={`/cards/${card.card_id}`}
            className="card-listing-item dashboard-link"
            key={card.card_id}
            data-id={card.card_id}
          >
            <span
              className="circle"
              style={{ backgroundColor: `#${card.card_color}` }}
            />
            {card.card_name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CardListing;
