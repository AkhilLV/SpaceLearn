import "./CardListing.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useContext, useEffect, useRef,
} from "react";
import CardContext from "../../contexts/CardContext";

function CardListing() {
  const { cards } = useContext(CardContext);
  const { cardId } = useParams();

  const cardContainer = useRef(null);

  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!e.target.matches(".clickable")) return;

    let card = e.target;

    // access id when user clicks on the circular div
    if (e.target.matches(".circle")) {
      card = e.target.parentNode;
    }

    const selectedCardId = card.dataset.id;
    navigate(`/cards/${selectedCardId}`);
  };

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
      <h3>All Cards</h3>
      <div ref={cardContainer} onClick={handleClick} className="card-listing-container">
        {cards.map((card) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <Link
            to={`/cards/${card.card_id}`}
            className="clickable card-listing-item"
            key={card.card_id}
            data-id={card.card_id}
          >
            <span className="clickable circle" />
            {card.card_name}
          </Link>

        ))}
      </div>

    </div>
  );
}

export default CardListing;
