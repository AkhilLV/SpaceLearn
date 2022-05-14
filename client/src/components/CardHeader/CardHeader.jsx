import { useContext, useState } from "react";

import { deleteCard, getCards } from "../../api";

import moreMenu from "../../assets/more-menu.svg";
import CardContext from "../../contexts/CardContext";

export default function CardHeader({ state }) {
  const [showMenu, setShowMenu] = useState(false);

  const { selectedCardId, setSelectedCardId, setCards } = useContext(CardContext);

  const handleDelete = async () => {
    try {
      await deleteCard(selectedCardId);
      setShowMenu(false);

      const res = await getCards();
      if (!res.data.length) return setCards(false);
      setCards(res.data);
      setSelectedCardId(res.data[0].card_id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card-header">
      <h2>{state.cardData.cardName}</h2>

      <div className="menu">
        <img src={moreMenu} alt="more menu" onClick={() => setShowMenu(!showMenu)} />
        <div className={`dropdown ${showMenu && "show"}`}>
          <button type="button" onClick={handleDelete}>Delete</button>
          <button type="button">Edit</button>
        </div>
      </div>
    </div>
  );
}
