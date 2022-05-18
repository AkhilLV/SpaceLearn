import { useContext } from "react";

import { deleteCard, getCards } from "../../api";

import CardContext from "../../contexts/CardContext";

import DropdownMenu from "../DropdownMenu/DropdownMenu";

export default function CardHeader({ cardName }) {
  const { selectedCardId, setSelectedCardId, setCards } = useContext(CardContext);

  const handleDelete = async () => {
    try {
      await deleteCard(selectedCardId);

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
    <div className="card-header">
      <h2>{cardName}</h2>

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
