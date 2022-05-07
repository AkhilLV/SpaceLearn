import "./CardListing.css";

import getSiblingElements from "../../helpers/getSiblingElements";

function CardListing({ cards, setSelectedCardId }) {
  const handleClick = (e) => {
    const cardId = e.target.dataset.id;
    setSelectedCardId(cardId);

    getSiblingElements(e.target).forEach((element) => element.classList.remove("active"));
    e.target.classList.add("active");
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
