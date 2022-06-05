import { useState, useContext } from "react";

import { deleteCard, getCards, editCard } from "../../api";

import generateCardDates from "../../helpers/generateCardDates";

import "./CardHeader.css";

import CardContext from "../../contexts/CardContext";

import Form from "../Form/Form";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import ModalContext from "../../contexts/ModalContext";

export default function CardHeader() {
  const {
    selectedCardId, setSelectedCardId, setCards, cardData,
  } = useContext(CardContext);

  const { setShowInfoModal } = useContext(ModalContext);

  const [showForm, setShowForm] = useState(false);

  const handleDeleteClick = async (e, setShowDropdownMenu) => {
    setShowDropdownMenu(false);

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

  const handleEditClick = (e, setShowDropdownMenu) => {
    setShowDropdownMenu(false);
    setShowForm(true);
  };

  const handleEditCardForm = async (e, inputValues) => {
    const cardName = inputValues[1];
    const cardDate = new Date(inputValues[2]);

    if (!cardName || !cardDate) return setShowInfoModal([true, "Fill all fields"]);

    const cardDates = generateCardDates(cardDate);

    const newCardDates = cardData.cardDates.map((item, i) => {
      return { cardDate: cardDates[i], cardDateId: item.cardDate.Id };
    });

    try {
      const postRes = await editCard(selectedCardId, { cardName, cardDates });
      setSelectedCardId(postRes.data.card.cardId);

      const res = await getCards();
      setCards(res.data);
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card-header center-vertical">
      {showForm && (
      <Form
        headerText="Edit card"
        inputItems={[
          {
            id: 1,
            labelText: "Card Name",
            inputType: "text",
            inputValue: cardData.cardName,
          },
          {
            id: 2,
            labelText: "Card Date",
            inputType: "date",
            inputValue: cardData.cardDates[0].cardDate,
          },
        ]}
        submitBtnText="Edit card"
        onSubmit={handleEditCardForm}
        setShowForm={setShowForm}
      />
      )}

      <h2>{cardData.cardName}</h2>

      <DropdownMenu buttons={[
        {
          buttonName: "Delete",
          handler: handleDeleteClick,
        },
        {
          buttonName: "Edit",
          handler: handleEditClick,
        },
      ]}
      />
    </div>
  );
}
