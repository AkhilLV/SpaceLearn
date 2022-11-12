import { useState, useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { deleteCard, getCards, editCard, getCard } from "../../api";

import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";

import "./CardHeader.css";

import CardContext from "../../contexts/CardContext";

import Form from "../Form/Form";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import ModalContext from "../../contexts/ModalContext";

export default function CardHeader() {
  const { setCards, cardData, setCardData, selectedColor, setSelectedColor } =
    useContext(CardContext);
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

    if (!cardName) return setShowInfoModal("Fill all fields");

    // eslint-disable-next-line no-shadow

    try {
      await editCard(cardId, { cardName, cardColor: selectedColor });
      setSelectedColor("ffffff"); // reset to default value. any other way within the component?

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
              labelText: "Card Color",
              inputType: "ColorSelector",
            },
          ]}
          submitBtnText="Edit card"
          onSubmit={handleEditCardForm}
          setShowForm={setShowForm}
        />
      )}

      <h2>{cardData.data.cardName}</h2>

      <DropdownMenu
        buttons={[
          {
            buttonName: "Delete",
            buttonIcon: deleteIcon,
            handler: handleDeleteClick,
          },
          {
            buttonName: "Edit",
            buttonIcon: editIcon,
            handler: handleEditClick,
          },
        ]}
      />
    </div>
  );
}
