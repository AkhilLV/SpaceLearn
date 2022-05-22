import { useContext } from "react";

import { deleteCard, getCards } from "../../api";

import "./CardHeader.css";

import CardContext from "../../contexts/CardContext";

import DropdownMenu from "../DropdownMenu/DropdownMenu";

export default function CardHeader() {
  const {
    selectedCardId, setSelectedCardId, setCards, cardData,
  } = useContext(CardContext);

  const handleDelete = async (e, setShowDropdownMenu) => {
    try {
      await deleteCard(selectedCardId);
      setShowDropdownMenu(false);

      const res = await getCards();

      setSelectedCardId(false);

      if (!res.data.length) return setCards(false);
      setCards(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async () => {

  };

  return (
    <div className="card-header center-vertical">
      <h2>{cardData.cardName}</h2>

      <DropdownMenu config={[
        {
          buttonName: "Delete",
          handler: handleDelete,
        },
        {
          buttonName: "Edit",
          handler: handleEdit,
        },
      ]}
      />
    </div>
  );
}
