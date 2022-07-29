import { useState, useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  deleteCard, getCards, editCard, getCard,
} from "../../api";

import generateCardDates from "../../helpers/generateCardDates";

import "./CardHeader.css";

import CardContext from "../../contexts/CardContext";

import Form from "../Form/Form";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import ModalContext from "../../contexts/ModalContext";

export default function CardHeader() {
  const {
    setCards, cardData, setCardData,
  } = useContext(CardContext);
  const { cardId } = useParams();

  const navigate = useNavigate();

  const { setShowInfoModal } = useContext(ModalContext);

  const [showForm, setShowForm] = useState(false);

  const handleDeleteClick = async (e, setShowDropdownMenu) => {
    setShowDropdownMenu(false);

    try {
      await deleteCard(cardId);

      const res = await getCards();

      navigate("/dashboard");
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
    // maybe dont send a request at all if values have not changed
    const cardName = inputValues[1] || cardData.cardName;
    const cardDate = (inputValues[2] && new Date(inputValues[2])) || cardData.cardDates[0].cardDate;

    if (!cardName || !cardDate) return setShowInfoModal([true, "Fill all fields"]);

    const cardDates = generateCardDates(cardDate);

    const cardDatesWithIds = cardData.cardDates.map((cardDate, i) => ({ cardDate: cardDates[i], cardDateId: cardDate.cardDateId }));

    try {
      await editCard(cardId, { cardName, cardDates: cardDatesWithIds });

      const resCard = await getCard(cardId);
      setCardData(resCard.data);

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
