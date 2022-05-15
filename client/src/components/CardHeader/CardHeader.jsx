import { useContext, useState } from "react";

import { deleteCard, getCards } from "../../api";

import moreMenu from "../../assets/more-menu.svg";
import CardContext from "../../contexts/CardContext";

export default function CardHeader({ cardName }) {
  const [showMenu, setShowMenu] = useState(false);

  const { selectedCardId, setSelectedCardId, setCards } = useContext(CardContext);

  const handleDelete = async () => {
    try {
      await deleteCard(selectedCardId);
      setShowMenu(false);

      const res = await getCards();

      setSelectedCardId(false);

      if (!res.data.length) return setCards(false);
      setCards(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card-header">
      <h2>{cardName}</h2>

      <div className="menu">
        <img src={moreMenu} alt="more menu" onClick={() => setShowMenu(true)} />
        {showMenu
          && (
          <>
            <div className="overlay" onClick={() => setShowMenu(false)} />
            <div className="dropdown">
              <button type="button" onClick={handleDelete}>Delete</button>
              <button type="button">Edit</button>
            </div>
          </>
          )}
      </div>
    </div>
  );
}
